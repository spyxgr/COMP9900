import os
import datetime
import random
import pymysql
import sqlalchemy.orm.exc
from flask import Flask, request, Response
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json
from flask_cors import CORS
from itertools import groupby
from sqlalchemy import create_engine, func
import pandas as pd
from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import apriori
from mlxtend.frequent_patterns import association_rules

app = Flask(__name__)
CORS(app, resources=r'/*')  # solve the problem of cross-domain


class Config(object):
    # connect to the local database for test
    # app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:hyt135565@localhost:3306/test_database"
    # connect to the cloud database
    app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://admin:z12345678@bug-team.cmucxb4zjleo.ap-southeast-2.rds.amazonaws.com:3306/wait_management"  # 连接数据库方式，连云数据库的方式
    app.config['SQLALCHEMY_TRACK_MODIFICATION'] = True
    app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = False


app.config.from_object(Config)
db = SQLAlchemy(app)  # start the sqlalchemy


class Base(db.Model):  # basic operations, including add data, update data and delete data
    __abstract__ = True

    def save(self):  # add data
        db.session.add(self)
        db.session.commit()

    def update(self):  # update data
        db.session.commit()

    def delete(self):  # delete data
        db.session.delete(self)
        db.session.commit()


class Key(Base):  # The structure of key table
    __tablename__ = "key"

    id = db.Column(db.INT, primary_key=True, autoincrement=True)
    role = db.Column(db.String(255))
    name = db.Column(db.String(255))
    password = db.Column(db.String(255))


class Services(Base):  # The structure of service table
    __tablename__ = "service"

    id = db.Column(db.INT, primary_key=True, autoincrement=True)
    table = db.Column(db.Integer, nullable=False)
    startTime = db.Column(db.DateTime, nullable=False)
    endTime = db.Column(db.DateTime)
    status = db.Column(db.INT, nullable=False, default=0)


class Category(Base):  # The structure of category table
    __tablename__ = "category"

    id = db.Column(db.INT, primary_key=True, autoincrement=True)
    categoryId = db.Column(db.INT, nullable=False)
    categoryName = db.Column(db.String(255), nullable=False)
    lastModified = db.Column(db.DateTime, nullable=False)


class Menuitem(Base):  # The structure of menu item table
    __tablename__ = "menuItems"

    id = db.Column(db.INT, primary_key=True, autoincrement=True)
    dishId = db.Column(db.INT, nullable=False)
    categoryId = db.Column(db.Integer)
    categoryName = db.Column(db.String(255))
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255))
    ingredient = db.Column(db.String(255))
    cost = db.Column(db.Float, default=0)
    picture = db.Column(db.String(255))
    calorie = db.Column(db.Float, default=0)
    orderTimes = db.Column(db.INT, default=0)
    lastModified = db.Column(db.DateTime, nullable=False)


class Orders(Base):  # The structure of order table
    __tablename__ = "orders"

    orderId = db.Column(db.INT, primary_key=True, autoincrement=True)
    orderTime = db.Column(db.DateTime)
    table = db.Column(db.INT, nullable=False)
    diner = db.Column(db.INT, nullable=False)
    status = db.Column(db.String(45), nullable=False, default="Wait")
    isRequest = db.Column(db.Integer, nullable=False, default=0)
    isPay = db.Column(db.Integer, nullable=False, default=0)
    payTime = db.Column(db.DateTime)
    orderitems = db.relationship("Orderitem", backref='orders')
    startTime = db.Column(db.DateTime)


class Orderitem(Base):  # The structure of order item table
    __tablename__ = "orderItems"

    itemIndex = db.Column(db.INT, primary_key=True, autoincrement=True)
    dishId = db.Column(db.INT, nullable=False)
    orderId = db.Column(db.INT, db.ForeignKey("orders.orderId"))
    itemTime = db.Column(db.DateTime)
    status = db.Column(db.String(45), nullable=False, default="Wait")
    finish = db.Column(db.INT, nullable=False, default=0)


# transfer query result to dictionary format
def model_to_dict(result):
    from collections.abc import Iterable
    try:
        if isinstance(result, Iterable):
            tmp = [dict(zip(res.__dict__.keys(), res.__dict__.values())) for res in result]
            for t in tmp:
                t.pop('_sa_instance_state')
        else:
            tmp = dict(zip(result.__dict__.keys(), result.__dict__.values()))
            tmp.pop('_sa_instance_state')
        # print("model_to_dict: ", tmp)
        return tmp
    except BaseException as e:
        print(e.args)
        raise TypeError('Type error of parameter')


engine = create_engine(
    'mysql+pymysql://admin:z12345678@bug-team.cmucxb4zjleo.ap-southeast-2.rds.amazonaws.com:3306/wait_management')


########################################################################################################################
######################################### Login Module #################################################################
@app.route('/', methods=["GET"])
def get_table():
    #  Delete orders that have not been paid for more than 6 hours after they were placed
    safe_sql = 'SET SQL_SAFE_UPDATES=0;'
    update_sql = """update orders set status='Completed',isPay=1,payTime=now()where date_sub(now(),interval 6 hour)>orderTime and isPay=0"""
    #  Delete orders that have not been placed within one hour of entering the order page
    delte_sql = """delete from orders where date_sub(now(),interval 1 hour)>startTime and orderTime is null"""
    table_sql = """select orders.`table`,orders.isPay from(select`table`,max(orderId)as orderId from orders group by`table`)temp join orders on temp.orderId=orders.orderId order by`table`"""
    return_josn = {}
    with engine.connect() as conn:
        conn.execute(safe_sql)
        conn.execute(update_sql)
        conn.execute(delte_sql)
        result_proxy = conn.execute(table_sql)  # The return value is of the ResultProxy type
        table_result = result_proxy.fetchall()  # The return value is the tuple list, with each tuple being one record
        res = pd.DataFrame(list(table_result), columns=['number', 'status'])
        return_josn = {"tableList": res.to_dict(orient='records')}
    return Response(json.dumps(return_josn), mimetype="application/json")


@app.route('/staff', methods=["POST"])  # login interface
def login():
    return_json = {}
    transfer_data = json.loads(json.dumps(request.get_json()))  # receive the data from frontend
    if (transfer_data["staff"] is not None) and (transfer_data["key"] is not None):
        role_information = db.session.query(Key).all()  # get all key data and role data in the database
        role_information = model_to_dict(role_information)
        role = transfer_data["staff"]
        pwd = transfer_data["key"]
        flag = 0
        for line in role_information:
            if role == line["role"] and pwd == line["password"]:  # both of key and role must match, and login success
                flag = 1
                return_json = {"staff": role, "orderId": None, "message": "Login success"}
        if flag == 0:  # if role or password is wrong, login fail
            return_json = {"role": None, "orderId": None, "message": "Login fail"}
    elif (transfer_data["staff"] is not None) and (transfer_data["key"] is None):  # if key is null, login fail
        return_json = {"role": None, "orderId": None, "message": "Login fail"}
    else:  # the role is customer
        table_post = int(transfer_data["table"])
        diner_post = int(transfer_data["diner"])
        order_post = Orders(table=table_post, diner=diner_post, startTime=datetime.now())
        order_post.save()  # add data to order table
        last_order = Orders.query.order_by(Orders.orderId.desc()).first()  # get newly added data and return to frontend
        # print(model_to_dict(last_order))
        return_json = {"role": "customer", "orderId": model_to_dict(last_order)["orderId"], "message": "success"}
    return Response(json.dumps(return_json), mimetype="application/json")


########################################################################################################################
############################################   Login Module   ##########################################################


########################################################################################################################
##########################################   Customer Module   #########################################################
@app.route('/customer/<int:order_id>', methods=["POST"])  # order submit interface
def order_submit(order_id):
    objects = []
    transfer_data = json.loads(json.dumps(request.get_json()))  # receive the data from frontend
    target_order = Orders.query.get_or_404(order_id)  # get target order by orderId
    return_json = {"orderId": order_id}  # the format of returned json
    if target_order.orderTime is None:  # if orderTime is null, update it, if it is not null, not change
        Orders.query.filter_by(orderId=order_id).update({Orders.orderTime: datetime.now()})
        db.session.commit()
    if target_order.status == "Completed":  # if the status of target order shows "Completed", change it to "Processing"
        Orders.query.filter_by(orderId=order_id).update({Orders.status: "Processing"})
        for dish in transfer_data["orderList"]:
            if int(dish["dishNumber"]) > 1:  # if the dishNumber of the dish over 1
                for i in range(0, int(dish["dishNumber"])):
                    item_post = Orderitem(dishId=dish["dishId"], orderId=order_id, itemTime=datetime.now())
                    objects.append(item_post)
                    Menuitem.query.filter_by(dishId=dish["dishId"]).update(  # the OrderTimes should add 1
                        {Menuitem.orderTimes: Menuitem.orderTimes + 1})
            else:  # if the dishNumber of the dish equals to one, then just add one data to orderItem table
                item_post = Orderitem(dishId=dish["dishId"], orderId=order_id, itemTime=datetime.now())
                objects.append(item_post)
                Menuitem.query.filter_by(dishId=dish["dishId"]).update(
                    {Menuitem.orderTimes: Menuitem.orderTimes + 1})  # the OrderTimes should add 1
        db.session.add_all(objects)  # add several data to the table at the same time
        db.session.commit()
    else:  # the below logic is the same as the above from line 181 to 194
        for dish in transfer_data["orderList"]:
            if int(dish["dishNumber"]) > 1:
                for i in range(0, int(dish["dishNumber"])):
                    item_post = Orderitem(dishId=dish["dishId"], orderId=order_id, itemTime=datetime.now())
                    objects.append(item_post)
                    Menuitem.query.filter_by(dishId=dish["dishId"]).update(
                        {Menuitem.orderTimes: Menuitem.orderTimes + 1})
            else:
                item_post = Orderitem(dishId=dish["dishId"], orderId=order_id, itemTime=datetime.now())
                objects.append(item_post)
                Menuitem.query.filter_by(dishId=dish["dishId"]).update({Menuitem.orderTimes: Menuitem.orderTimes + 1})
        db.session.add_all(objects)
        db.session.commit()
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/customer/<int:order_id>', methods=["GET"])  # get corresponding order detail interface
def get_order_detail(order_id):
    return_json = []
    target_order = Orders.query.get_or_404(order_id).orderitems  # get all the dishes ordered under this OrderId
    target_order = model_to_dict(target_order)
    # sort the dishes according to dishId and status
    dish_sort = sorted(target_order, key=lambda x: (x["dishId"], x["status"]))
    # group by the dishes according to dishId
    dish_group = groupby(dish_sort, key=lambda x: x["dishId"])
    current_dish_id = []  # get all the available dishes in the menuItem table
    for line in model_to_dict(Menuitem.query.all()):
        current_dish_id.append(int(line["dishId"]))
    for key, group in dish_group:
        if key in current_dish_id:
            dish_info = model_to_dict(Menuitem.query.filter_by(dishId=key).all())
            dish_info[0].pop("id")  # modify the output format according to the requirements of frontend
            dish_info[0].pop("lastModified")
            dish_info[0]["dishNumber"] = len(list(group))
            return_json.append(dish_info[0])
        else:
            pass
    return Response(json.dumps({"itemList": return_json}), mimetype="application/json")


@app.route('/customer/<int:order_id>/bill', methods=["GET"])  # get bill detail interface
def get_bill(order_id):
    return_json = []
    Orders.query.filter_by(orderId=order_id).update({Orders.isRequest: 1})  # update the isRequest from 0 to 1
    db.session.commit()
    target_order = Orders.query.get_or_404(order_id).orderitems
    target_order = model_to_dict(target_order)
    dish_sort = sorted(target_order, key=lambda x: (x["dishId"], x["status"]))
    dish_group = groupby(dish_sort, key=lambda x: x["dishId"])
    current_dish_id = []  # get all the available dishes in the menuItem table
    for line in model_to_dict(Menuitem.query.all()):
        current_dish_id.append(int(line["dishId"]))
    for key, group in dish_group:
        if key in current_dish_id:
            dish_info = model_to_dict(Menuitem.query.filter_by(dishId=key).all())
            dish_info[0].pop("id")  # modify the output format according to the requirements of frontend
            dish_info[0].pop("lastModified")
            dish_info[0]["dishNumber"] = len(list(group))
            return_json.append(dish_info[0])
        else:
            pass
    return Response(json.dumps({"itemList": return_json}), mimetype="application/json")


@app.route('/customer/<int:order_id>/hot', methods=["GET"])  # get hot dishes interface
def hot_dishes(order_id):
    order_id_post = int(order_id)
    diner_post = Orders.query.get_or_404(order_id_post).diner
    hot_dish_dict = Menuitem.query.order_by(Menuitem.orderTimes.desc()).limit(9)  # get 9 dishes with the most orders
    hot_dish_dict = model_to_dict(hot_dish_dict)  # transfer query result to dictionary format
    for line in hot_dish_dict:  # modify the output format according to the requirements of frontend
        line.pop("lastModified")
        line.pop("id")
        line["dishNumber"] = 0
    category_post = Category.query.all()
    category_post = model_to_dict(category_post)
    for line in category_post:
        line.pop("id")
        line.pop("lastModified")
    return_json = {"orderId": order_id_post, "diner": diner_post, "itemList": hot_dish_dict,
                   "categoryList": category_post}
    return Response(json.dumps(return_json), mimetype="application/json")


# get all the dishes according to categoryId interface
@app.route('/customer/<int:order_id>/<int:category_id>', methods=["GET"])
def category_dishes(order_id, category_id):
    order_id_post = int(order_id)
    category_id_post = int(category_id)
    # get all the dishes according to categoryId
    dishes_dict = Menuitem.query.filter_by(categoryId=category_id_post).all()
    dishes_dict = model_to_dict(dishes_dict)
    for line in dishes_dict:  # modify the output format according to the requirements of frontend
        line.pop("id")
        line.pop("lastModified")
        line["dishNumber"] = 0
    return_json = {"itemList": dishes_dict}
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/customer/<int:order_id>/help', methods=["POST"])  # customer asks help interface
def ask_help(order_id):
    table_no = Orders.query.get_or_404(order_id).table  # get table number according to OrderId
    service_info = Services(table=table_no, startTime=datetime.now())  # add new data to services table
    service_info.save()
    return_json = {"message": "success"}
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/customer/<int:order_id>/recommend', methods=["POST"])
def recommend_items(order_id):
    # Conduct correlation analysis for all items in historical and current orders
    res = db.session.query(Orderitem.dishId, Orderitem.orderId).join(Menuitem,
                                                                     Menuitem.dishId == Orderitem.dishId).order_by(
        Orderitem.dishId).distinct().all()

    orderItemsDict = {}
    for dishId, orderId in res:
        if orderId in orderItemsDict:
            orderItemsDict[orderId].append(dishId)
        else:
            orderItemsDict[orderId] = [dishId]

    orderItemsList = list(orderItemsDict.values())

    itemDf = pd.DataFrame(orderItemsList)

    te = TransactionEncoder()
    dfTf = te.fit_transform(orderItemsList)
    df = pd.DataFrame(dfTf, columns=te.columns_)

    # use_colnames=True means use the element name. The default False uses the column name for the element and sets the minimum support level min_support
    frequentItemsets = apriori(df, min_support=0.05, use_colnames=True)
    frequentItemsets.sort_values(by='support', ascending=False, inplace=True)

    # There are many metric options available, and the returned table column name can be used as an argument
    associationRule = association_rules(frequentItemsets, metric='confidence', min_threshold=0.9)
    # Association rules can enhance degree sorting
    associationRule.sort_values(by='lift', ascending=False, inplace=True)
    associationRule  # 规则是：antecedents->consequents

    # Select 2-item frequent setS
    frequentItem2sets = frequentItemsets[frequentItemsets.itemsets.apply(lambda x: len(x)) == 2]

    currentItems = []
    get_data = json.loads(json.dumps(request.get_json()))
    for i in get_data["orderList"]:
        currentItems.append(int(i["dishId"]))

    recommendItems = []

    # Traversal. 2-item frequent setS ranked from highest to lowest support
    for i in frequentItem2sets.itemsets:
        for j in reversed(currentItems):
            if j in i:
                temp = list(i)
                if j == temp[0] and temp[1] not in currentItems and temp[1] not in recommendItems:
                    recommendItems.append(temp[1])
                    print(i)
                elif j == temp[1] and temp[0] not in currentItems and temp[0] not in recommendItems:
                    recommendItems.append(temp[0])
                    print(i)
                else:
                    break
        if len(recommendItems) == 5:
            break

    # When the count is less than 5, the items not in the shopping car are randomly selected
    if (len(recommendItems)) < 5:
        menuRes = db.session.query(Menuitem.dishId).distinct().all()
        unselectedItems = []
        for i in menuRes:
            if (i[0] not in currentItems) and (i[0] not in recommendItems):
                unselectedItems.append(i[0])
        while len(recommendItems) < 5 and len(unselectedItems) > 0:
            randomItem = random.choice(unselectedItems)
            recommendItems.append(randomItem)
            unselectedItems.remove(randomItem)

    return_json = {"itemList": []}
    for i in recommendItems:
        rest = model_to_dict(Menuitem.query.filter_by(dishId=i).all())
        rest[0].pop("id")
        rest[0].pop("lastModified")
        if i not in currentItems:
            rest[0]["dishNumber"] = 0
        else:
            for j in get_data["orderList"]:
                if i == int(j["dishId"]):
                    rest[0]["dishNumber"] = j["dishNumber"]
        return_json["itemList"].append(rest[0])

    return Response(json.dumps(return_json), mimetype="application/json")


########################################################################################################################
############################################  Customer Module  #########################################################


########################################################################################################################
############################################   Wait Staff Module  ######################################################
@app.route('/wait/request', methods=["GET"])  # get all uncompleted services interface
def init_request():
    uncompleted_services = Services.query.filter_by(status=0).all()  # get all uncompleted services
    uncompleted_services = model_to_dict(uncompleted_services)
    for line in uncompleted_services:  # modify the output format according to the requirements of frontend
        line.pop("endTime")
        line.pop("status")
        if line["startTime"] is not None:
            line["startTime"] = line["startTime"].strftime("%Y-%m-%d-%H:%M:%S")  # transfer the format of datetime
    return_json = {"requestsList": uncompleted_services}
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/wait/request/<int:request_id>', methods=["POST"])  # make target service finished interface
def request_finish(request_id):
    # update the status of target service
    Services.query.filter_by(id=request_id).update({Services.endTime: datetime.now(), Services.status: 1})
    db.session.commit()
    return_json = {"message": "success"}
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/wait/item', methods=["GET"])  # get all uncompleted orders interface
def get_uncompleted_order_item():
    # get all uncompleted orders
    uncompleted_order_item = model_to_dict(Orderitem.query.filter(Orderitem.status == "Prepared", Orderitem.finish == 0)
                                           .order_by(Orderitem.itemTime.asc()).all())
    current_dish_id = []
    for line in model_to_dict(Menuitem.query.all()):  # get all the available dishes in the menuItem table
        current_dish_id.append(int(line["dishId"]))
    for line in uncompleted_order_item:  # modify the output format according to the requirements of frontend
        line["table"] = Orders.query.get_or_404(line["orderId"]).table
        line.pop("orderId")
        line.pop("status")
        line.pop("finish")
        # line.pop("itemTime")
        if line["itemTime"] is not None:
            line["itemTime"] = line["itemTime"].strftime("%Y-%m-%d-%H:%M:%S")  # transfer the format of datetime
        if line["dishId"] in current_dish_id:
            # get dishName according to dishId
            line["dishName"] = model_to_dict(Menuitem.query.filter_by(dishId=line["dishId"]).all())[0]["title"]
        else:
            line["dishName"] = "Dish deleted"
        line.pop("dishId")
    return_json = {"itemsList": uncompleted_order_item}
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/wait/item/<int:item_index>', methods=["POST"])  # update items' status interface
def item_complete(item_index):
    Orderitem.query.filter_by(itemIndex=item_index).update({Orderitem.finish: 1})  # update items' status
    db.session.commit()
    return_json = {"message": "success"}
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/wait/order', methods=["GET"])  # get all unpaid orders interface
def get_unpayed_order():
    current_dish_id = []
    for line in model_to_dict(Menuitem.query.all()):  # get all the available dishes in the menuItem table
        current_dish_id.append(int(line["dishId"]))
    # get all unpaid orders
    unpayed_order = model_to_dict(
        Orders.query.filter(Orders.orderTime.isnot(None), Orders.isPay == 0).order_by(Orders.orderTime.asc()).all())
    for line in unpayed_order:
        total_cost = 0
        # get all dishes according to corresponding orderId
        order_items = model_to_dict(Orders.query.get_or_404(line["orderId"]).orderitems)
        for each_item in order_items:
            if each_item["dishId"] in current_dish_id:
                menu_item = model_to_dict(Menuitem.query.filter_by(dishId=each_item["dishId"]).first())
                total_cost += menu_item["cost"]  # calculate the total cost of this order
                # modify the output format according to the requirements of frontend
                each_item["price"] = menu_item["cost"]
                each_item["dishName"] = menu_item["title"]
                each_item.pop("itemTime")
                each_item.pop("itemIndex")
                each_item.pop("dishId")
                each_item.pop("finish")
                # each_item.pop("lastModified")
                # each_item.pop("orderId")
            else:
                each_item.pop("itemTime")  # modify the output format according to the requirements of frontend
                each_item.pop("finish")
                each_item.pop("dishId")
                each_item.pop("itemIndex")
                each_item["dishName"] = "Dish deleted"
                each_item["price"] = 0
        line["price"] = round(total_cost, 1)
        line["itemList"] = order_items
        line.pop("startTime")
        line.pop("diner")
        line.pop("payTime")
        line.pop('status')
        line.pop("isPay")
        # line.pop("orderTime")
        if line["orderTime"] is not None:
            line["orderTime"] = line["orderTime"].strftime("%Y-%m-%d-%H:%M:%S")  # transfer the format of datetime
    return_json = {"orderList": unpayed_order}
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/wait/order/<int:order_id>', methods=["POST"])  # update the payment status of corresponding order interface
def confirm_pay_order(order_id):
    # update the payment status of corresponding order and update the payment time
    Orders.query.filter_by(orderId=order_id).update({Orders.isPay: 1, Orders.payTime: datetime.now()})
    db.session.commit()
    return_json = {"message": "success"}
    return Response(json.dumps(return_json), mimetype="application/json")



########################################################################################################################
############################################   kitchen Staff Module  ###################################################


@app.route('/kitchen', methods=["GET", "POST"])
def get_orders():
    # Get today's order. The upper part of the order list are Wait or Processing orders in order of order time. The lowwer part is the orders whose status is Completed, in order of order time.
    order_sql = """select allItem.orderId,allItem.`table`,allItem.orderTime,ifnull(waitItem.waitCount,0)as waitCount,allItem.`status`from(select wait_management.orders.orderId,wait_management.orders.`table`,wait_management.orders.orderTime,count(wait_management.orderItems.dishId)as allCount,wait_management.orders.`status`,(case when wait_management.orders.`status`='Wait'or wait_management.orders.`status`='Processing'then 0 when wait_management.orders.`status`='Completed'then 1 end)as srank from wait_management.orders join wait_management.orderItems on wait_management.orders.orderId=wait_management.orderItems.orderId where DATE_FORMAT(wait_management.orders.orderTime,'%%Y-%%m-%%d')=DATE_FORMAT(now(),'%%Y-%%m-%%d')group by wait_management.orders.orderId)as allItem left join(select wait_management.orders.orderId,count(wait_management.orderItems.dishId)as waitCount from wait_management.orders join wait_management.orderItems on wait_management.orders.orderId=wait_management.orderItems.orderId where DATE_FORMAT(wait_management.orders.orderTime,'%%Y-%%m-%%d')=DATE_FORMAT(now(),'%%Y-%%m-%%d')and wait_management.orderItems.`status`='Wait'group by wait_management.orders.orderId)as waitItem on allItem.orderId=waitItem.orderId order by allItem.srank,allItem.orderTime"""
    with engine.connect() as conn:
        result_proxy = conn.execute(order_sql)  # The return value is of the ResultProxy type
        result = result_proxy.fetchall()  # The return value is the tuple list, with each tuple being one record
        res = pd.DataFrame(list(result), columns=['orderId', 'table', 'orderTime', 'waitCount', 'status'])  # Save the result as DF

    if request.method == "GET":  # By default, the sorted order list is returned
        return {"orderList": res.to_dict(orient='records')}

    else:
        post_data = json.loads(json.dumps(request.get_json()))  # Get the status
        status_post = str(post_data["orderStatus"])
        filter_res = res[res['status'] == status_post]
        return {"orderList": filter_res.to_dict(orient='records')}


@app.route('/kitchen/<int:order_id>', methods=["GET"])
def get_items(order_id):
    # Get the items in this order. The upper part of the item list are Wait or Processing orders in order of order time. The lowwer part is the orders whose status is Prepared, in order of order time.
    table_time_sql = """select`table`,orderTime from wait_management.orders where orderId=""" + str(order_id)
    item_sql = """select itemIndex,title,categoryName,`status`from(select wait_management.orderItems.itemIndex,wait_management.orderItems.`status`,wait_management.menuItems.title,wait_management.menuItems.categoryName,(case when wait_management.orderItems.`status`='Wait'then 0 when wait_management.orderItems.`status`='Processing'then 1 when wait_management.orderItems.`status`='Prepared'then 2 end)as srank,rank()over(order by wait_management.orderItems.itemTime)as trank from wait_management.orders join wait_management.orderItems on wait_management.orders.orderId=wait_management.orderItems.orderId join wait_management.menuItems on wait_management.orderItems.dishId=wait_management.menuItems.dishId where wait_management.orders.orderId=""" + str(
        order_id) + """)as items order by srank,trank"""
    with engine.connect() as conn:
        result_proxy = conn.execute(table_time_sql)  # The return value is of the ResultProxy type
        table_time_result = result_proxy.fetchall()  # The return value is the tuple list, with each tuple being one record
        result_proxy = conn.execute(item_sql)
        item_result = result_proxy.fetchall()
        item_res = pd.DataFrame(list(item_result), columns=['itemIndex', 'itemName', 'itemCategory', 'status'])
    return {"tableNumber": table_time_result[0][0], "orderTime": table_time_result[0][1],
            "itemList": item_res.to_dict(orient='records')}


@app.route('/kitchen/<int:order_id>', methods=["POST"])
def update_items(order_id):
    post_data = json.loads(json.dumps(request.get_json()))  # Get the status
    index_post = int(post_data["itemIndex"])
    status_post = str(post_data["itemStatus"])
    db.session.query(Orderitem).filter(Orderitem.itemIndex == index_post).update({"status": status_post})
    db.session.commit()  # Update the status of the item

    # Update the status of the order
    res_all = \
        db.session.query(func.count(Orderitem.itemIndex)).join(Orders).filter(Orders.orderId == order_id).all()[0][0]
    res_prepared = \
        db.session.query(func.count(Orderitem.itemIndex)).join(Orders).filter(Orders.orderId == order_id).filter(
            Orderitem.status == "Prepared").all()[0][0]
    res_processing = \
        db.session.query(func.count(Orderitem.itemIndex)).join(Orders).filter(Orders.orderId == order_id).filter(
            Orderitem.status == "Processing").all()[0][0]
    res_wait = db.session.query(func.count(Orderitem.itemIndex)).join(Orders).filter(Orders.orderId == order_id).filter(
        Orderitem.status == "Wait").all()[0][0]

    if res_all == res_prepared:
        db.session.query(Orders).filter(Orders.orderId == order_id).update({"status": "Completed"})
        db.session.commit()

    if res_all == res_wait:
        db.session.query(Orders).filter(Orders.orderId == order_id).update({"status": "Wait"})
        db.session.commit()

    if res_processing > 0 and res_prepared < res_all:
        db.session.query(Orders).filter(Orders.orderId == order_id).update({"status": "Processing"})
        db.session.commit()

    return {"orderId": order_id}


########################################################################################################################
############################################   kitchen Staff Module  ###################################################

########################################################################################################################
###############################################   Manager Module  ######################################################


def update_function(original_data, update_data):  # update function for the menu item
    flag = 0
    for key, value in update_data.items():
        if getattr(original_data, key) != value:  # judge data whether changes
            if key == "categoryName":  # if category name changes
                update_category_id = Category.query.filter_by(categoryName=value).first().categoryId
                setattr(original_data, "categoryId", update_category_id)  # update the categoryId
                flag = 1
            if key == "picture":  # if picture changes
                # original_data_address = original_data.picture
                # delete_picture(original_data_address)
                if update_data["picture"][0:3] != "../":
                    update_data["picture"] = ".." + update_data["picture"]
                # update the picture address in the menuItem table
                new_img_address = upload_picture(update_data["picture"])
                setattr(original_data, "picture", new_img_address)
                flag = 1
            else:
                setattr(original_data, key, value)  # update other data
                flag = 1
        if flag == 1:
            original_data.lastModified = datetime.now()  # update lastModified time
    return original_data


def upload_picture(original_local_picture_address):  # upload picture function
    root = "../frontend/public/dishImg"
    upload_picture_address = "../frontend/public" + str(original_local_picture_address[2:])
    print(upload_picture_address)
    end_name = original_local_picture_address.rsplit('.')[-1]
    print(end_name)
    if end_name not in ["jpg", "png", "jpeg"]:  # judge the file type
        return {"msg": "the format is not a valid picture"}
    # all_files = os.listdir(root)  # get all files under the address
    filename = str(original_local_picture_address[11:])  # create new filename
    # print(filename)
    img_path = os.path.join(root, filename)  # montage the address and filename
    # print("img_path: ", img_path)
    # shutil.copy(upload_picture_address, img_path)  # copy the new picture to target folder
    img_path_post = img_path[18:]
    # handle the format of new picture address under the Windows environment
    img_path_post = str(img_path_post).replace("\\", "/")
    return img_path_post


def delete_picture(picture_address_in_database):  # delete target picture function
    root = "../frontend/public/dishImg"
    all_pictures = os.listdir(root)  # get all files under the address and find target picture
    for picture_name in all_pictures:
        if picture_name == picture_address_in_database[9:]:
            os.remove(os.path.join(root, picture_name))  # delete this picture
    return 0


def get_category_list(time_flag):  # get all categories in the category table function
    category_list = model_to_dict(Category.query.all())
    if time_flag == 0:  # mode judgement signal
        for line in category_list:  # modify the output format according to the requirements of frontend
            line.pop("id")
            line["lastModified"] = line["lastModified"].strftime("%Y-%m-%d-%H:%M:%S")
        return_json = {"categoryList": category_list}
    else:
        for line in category_list:  # modify the output format according to the requirements of frontend
            line.pop("id")
            line.pop("lastModified")
        return_json = {"categoryList": category_list}
    return return_json


def get_menu_item_list():  # get all dishes in the menuItem table function
    category_id_list = []
    item_list = []
    all_category = get_category_list(1)
    for each_category in all_category["categoryList"]:  # get all categoryId
        category_id_list.append(each_category["categoryId"])
    for category_id in category_id_list:  # get all dishes under corresponding category
        menu_item = model_to_dict(Menuitem.query.filter_by(categoryId=category_id).all())
        for line in menu_item:  # modify the output format according to the requirements of frontend
            line["dishName"] = line["title"]
            line["price"] = line["cost"]
            line.pop("cost")
            line.pop("title")
            line.pop("id")
            line.pop("lastModified")
            line.pop("categoryId")
            line.pop("orderTimes")
        item_list.append({"categoryId": category_id, "itemList": menu_item})
    return_json = {"itemList": item_list, "categoryList": all_category["categoryList"]}
    return return_json


@app.route('/manager/category', methods=["GET"])  # get all categories interface
def get_category():
    return_json = get_category_list(0)
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/manager/category/add', methods=["POST"])  # add new category interface
def add_category():
    category_id_list = []
    category_name_list = []
    category_dict = model_to_dict(Category.query.all())
    # get the max categoryId in the category table and create new categoryId
    if not category_dict:  # if category table is null
        category_id_max_cur = 1
    else:
        for line in category_dict:
            category_id_list.append(int(line["categoryId"]))
            category_name_list.append(str(line["categoryName"]).lower())
        category_id_max_cur = max(category_id_list) + 1  # create new categoryId
    post_data = json.loads(json.dumps(request.get_json()))  # receive the data from frontend
    # handle the format of new categoryName
    category_name = str(post_data["categoryName"]).strip().replace(r'-_|\/?,><;:"}]{[+=)(*&^%$#@!`~', ' ')
    if category_name.lower() in category_name_list:  # judge whether exists the same category name
        return_json = {"message": "Duplicated category name"}
    else:
        # add new category to the category table
        category = Category(categoryId=category_id_max_cur, categoryName=category_name, lastModified=datetime.now())
        category.save()
        return_json = get_category_list(0)
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/manager/item', methods=["GET"])  # get all dishes interface
def get_menu_item():
    return_json = get_menu_item_list()
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/manager/item/add', methods=["POST"])  # add new dish interface
def add_menu_item():
    post_data = json.loads(json.dumps(request.get_json()))  # receive the data from frontend
    # handle the format of new dish tile
    title_post = str(post_data["title"]).strip().replace(r'-_|\/?,><;:"}]{[+=)(*&^%$#@!`~', ' ')
    try:  # in case some data from the frontend is null
        category_name_post = post_data["categoryName"]
        category_line = Category.query.filter_by(categoryName=category_name_post).first()
        category_line = model_to_dict(category_line)
        category_id_post = int(category_line["categoryId"])
    except KeyError:
        category_name_post = None
        category_id_post = None
    try:
        description_post = str(post_data['description'])
    except KeyError:
        description_post = None
    try:
        ingredient_post = str(post_data["ingredient"])
    except KeyError:
        ingredient_post = None
    try:
        cost_post = float(post_data["cost"])
    except KeyError:
        cost_post = 0
    try:
        calorie_post = float(post_data["calorie"])
    except KeyError:
        calorie_post = 0

    try:
        picture_post = str(post_data["picture"])  # the local address of picture
        if picture_post[0:3] != "../":
            picture_post = ".." + picture_post
        picture_post_address = upload_picture(picture_post)  # return the address as same as the database
        # print("img_path_post: ", picture_post_address)
    except KeyError:
        picture_post = None

    dish_id_list = []
    dish_dict = model_to_dict(Menuitem.query.all())
    if not dish_dict:  # if the menuItem table is null
        dish_id_max_cur = 1
    else:  # create new dishId
        for line in dish_dict:
            dish_id_list.append(line["dishId"])
        dish_id_max_cur = max(dish_id_list) + 1
    # add new dish data to the menuItem table
    menu_item_post = Menuitem(dishId=dish_id_max_cur, categoryId=category_id_post,
                              categoryName=category_name_post, title=title_post, description=description_post,
                              ingredient=ingredient_post, cost=cost_post, picture=picture_post_address,
                              calorie=calorie_post, lastModified=datetime.now())
    menu_item_post.save()
    return_json = get_menu_item_list()
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/manager/item/<int:dish_id>', methods=["POST"])  # delete existed dish interface
def delete_menu_item(dish_id):
    menu_item_delete = Menuitem.query.filter_by(dishId=dish_id).first()  # get target dish information
    # menu_item_delete_dict = model_to_dict(menu_item_delete)
    # if menu_item_delete_dict["picture"] is not None:
    # delete_picture(str(menu_item_delete_dict["picture"]))
    db.session.delete(menu_item_delete)  # delete this dish
    db.session.commit()
    return_json = get_menu_item_list()
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/manager/item/<int:dish_id>', methods=["PUT"])  # update existed dish interface
def edit_menu_item(dish_id):
    update_data = json.loads(json.dumps(request.get_json()))  # receive the data from frontend
    original_data = Menuitem.query.filter_by(dishId=dish_id).first()  # get target dish information

    update_function(original_data, update_data)  # call the update function(from line 502 to 524)
    db.session.commit()
    return_json = get_menu_item_list()
    return Response(json.dumps(return_json), mimetype="application/json")


def get_all_key():  # get all key in the Key table function
    key_list = model_to_dict(Key.query.order_by(Key.role.asc()).all())  # get all key
    for line in key_list:  # modify the output format according to the requirements of frontend
        line["key"] = line["password"]
        line.pop("password")
        line.pop("id")
    return {"keyList": key_list}


@app.route('/manager/key', methods=["GET"])  # get all key interface
def get_key():
    return_json = get_all_key()
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/manager/key', methods=["POST"])  # add new key interface
def add_key():
    return_json = {}
    manager_all_key = []
    kitchen_all_key = []
    wait_all_key = []
    post_data = json.loads(json.dumps(request.get_json()))  # receive the data from frontend
    key_dict = model_to_dict(Key.query.all())
    for line in key_dict:  # get all keys according to different roles
        if line["role"] == "manager":
            manager_all_key.append(line["password"])
        elif line["role"] == "wait":
            wait_all_key.append(line["password"])
        else:
            kitchen_all_key.append(line["password"])
    if post_data["role"] == "manager":
        if post_data["key"] in manager_all_key:  # if new key already in the table
            return_json = {"message": "Duplicated Key"}
        else:  # add new key
            key_post = Key(role=post_data["role"], name=post_data["name"], password=post_data["key"])
            key_post.save()
            return_json = {"message": "success", "keyList": get_all_key()["keyList"]}
    elif post_data["role"] == "wait":  # the logic is as the same as the above, but the role changed
        if post_data["key"] in wait_all_key:
            return_json = {"message": "Duplicated Key"}
        else:
            key_post = Key(role=post_data["role"], name=post_data["name"], password=post_data["key"])
            key_post.save()
            return_json = {"message": "success", "keyList": get_all_key()["keyList"]}
    elif post_data["role"] == "kitchen":  # the logic is as the same as the above, but the role changed
        if post_data["key"] in kitchen_all_key:
            return_json = {"message": "Duplicated Key"}
        else:
            key_post = Key(role=post_data["role"], name=post_data["name"], password=post_data["key"])
            key_post.save()
            return_json = {"message": "success", "keyList": get_all_key()["keyList"]}
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/manager/key', methods=["DELETE"])  # delete target key interface
def delete_key():
    post_data = json.loads(json.dumps(request.get_json()))  # receive the data from frontend
    try:
        # delete target key
        key_delete = Key.query.filter(Key.role == post_data["role"], Key.password == post_data["key"]).first()
        db.session.delete(key_delete)
        db.session.commit()
        return_json = get_all_key()
    except sqlalchemy.orm.exc.UnmappedInstanceError:
        return_json = {"message": "Invalid role and key"}
    return Response(json.dumps(return_json), mimetype="application/json")


@app.route('/manager/category', methods=["POST"])  # category sort interface
def category_sort():
    insert_id = 1
    new_sorted_category_list = []
    sort_data = json.loads(json.dumps(request.get_json()))  # receive the data from frontend
    for line in sort_data["categoryList"]:  # delete all existed categories in the table
        category_delete = Category.query.filter_by(categoryId=line["categoryId"]).first()
        db.session.delete(category_delete)
        # add all original categories information to the original table according the new order
        new_sorted_category_list.append(Category(id=insert_id, categoryId=line["categoryId"],
                                                 categoryName=line["categoryName"], lastModified=datetime.now()))
        insert_id += 1
    db.session.add_all(new_sorted_category_list)
    db.session.commit()
    return Response(json.dumps(get_category_list(0)), mimetype="application/json")


@app.route('/manager/item', methods=["POST"])  # menu item sort interface
def sort_menu_item():
    sort_data = json.loads(json.dumps(request.get_json()))  # receive the data from frontend
    new_sorted_menu_item_list = []
    for line in sort_data["itemList"]:
        # delete all existed target dishes in the table
        each_category_id = Menuitem.query.filter_by(categoryName=line["categoryName"]).first().categoryId
        each_item_order_times = Menuitem.query.filter_by(dishId=line["dishId"]).first().orderTimes
        menu_item_delete = Menuitem.query.filter_by(dishId=line["dishId"]).first()
        # add all partly original dishes information to the original table according the new order
        new_sorted_menu_item_list.append(Menuitem(dishId=line["dishId"], categoryId=each_category_id,
                                                  categoryName=line["categoryName"], title=line["dishName"],
                                                  description=line["description"],
                                                  ingredient=line["ingredient"], cost=line["price"],
                                                  picture=line["picture"],
                                                  calorie=line["calorie"], orderTimes=each_item_order_times,
                                                  lastModified=datetime.now()))
        db.session.delete(menu_item_delete)
    db.session.add_all(new_sorted_menu_item_list)
    db.session.commit()
    return_json = get_menu_item_list()
    return Response(json.dumps(return_json), mimetype="application/json")


########################################################################################################################
###############################################   Manager Module  ######################################################

if __name__ == '__main__':  # main module of program
    # port_number = int(sys.argv[1])
    # print(port_number)
    db.create_all()  # create all table in the database
    app.run(debug=True, host='127.0.0.1', port=8080, threaded=True)  # start the flask
    pass
