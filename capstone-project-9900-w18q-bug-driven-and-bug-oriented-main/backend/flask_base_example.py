import pymysql
import datetime
from flask import Flask, render_template, jsonify, request
from flask_restx import Resource, Api, reqparse, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
import json

app = Flask(__name__)

class Config(object):
    user = "root" # 改成自己的root
    password = "hyt135565" # 改成自己的password
    database = "wait_management_system" # 改成自己的数据库名
    # app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://admin:12345678@database-1.cysrs8uipk4l.ap-southeast-2.rds
    # .amazonaws.com:3306/COMP9900test"
    app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:hyt135565@localhost:3306/test_database" #连接数据库方式，上面是连云数据库的方式
    app.config['SQLALCHEMY_TRACK_MODIFICATION'] = True
    #app.config['SQLALCHEMY_ECHO'] = True
    app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = False

app.config.from_object(Config)
db = SQLAlchemy(app)

class Base(db.Model): # 基础格式
    __abstract__ = True
    id = db.Column(db.INT, primary_key=True, autoincrement=True)

    def save(self):
        db.session.add(self)
        db.session.commit()
    def update(self):
        db.session.commit()
    def delete(self):
        db.session.delete(self)
        db.session.commit()

class Category(Base):  # The structure of category table
    __tablename__="category"

    category_name = db.Column(db.String(255), nullable=False)
    menuitem = db.relationship("Menuitem", backref='category') # 关系属性
    last_modified = db.Column(db.DateTime, nullable=False)

class Menuitem(Base):
    __tablename__="menu_items"

    category_id = db.Column(db.Integer, db.ForeignKey("category.id"))
    category_name = db.Column(db.String(255))
    title = db.Column(db.String(255))
    description = db.Column(db.String(255))
    ingredient = db.Column(db.String(255))
    cost = db.Column(db.Float)
    last_modified = db.Column(db.DateTime, nullable=False)

# 数据库查询query转为字典格式
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
        print("model_to_dict: ", tmp)
        return tmp
    except BaseException as e:
        print(e.args)
        raise TypeError('Type error of parameter')


def update_function(origin_data, update_data): # 更新功能
    flag = 0
    for key, value in update_data.items():
        if getattr(origin_data, key) != value: # judge data whether changes
            if key == "category_id":
                update_category_name = Category.query.get_or_404(value).category_name
                print(update_category_name)
                flag = 1
                setattr(origin_data, "category_name", update_category_name)
            setattr(origin_data, key, value) # set new data
        if flag == 1:
            origin_data.last_modified = datetime.now()
    return origin_data

@app.route('/add_category', methods=["GET", "POST"]) # 添加新的类目
def add_category():
    if request.method == "GET":
        category_list = Category.query.all()
        print(category_list)
        category_dict = model_to_dict(category_list)
        print(category_dict)
        return jsonify(category_dict)
    else:
        post_data  = json.loads(json.dumps(request.get_json())) # json格式传过来
        Category_name = str(post_data["category_name"]).strip().replace(r'-_|\/?,><;:"}]{[+=)(*&^%$#@!`~', ' ')
        category = Category(category_name=Category_name, last_modified=datetime.now())
        category.save()
        return {"code": 0}

@app.route('/add_menuitem', methods=["GET", "POST"]) # 添加新的菜品
def add_menuitem():
    if request.method == "GET":
        items_list = Menuitem.query.all()
        items_dict = model_to_dict(items_list)
        return jsonify(items_dict)
    else:
        post_data = json.loads(json.dumps(request.get_json()))  # json格式传过来
        category_id_post = post_data["category_id"]
        print(category_id_post)
        category_name_post = Category.query.get_or_404(category_id_post).category_name
        print(category_name_post)
        title_post = str(post_data["title"]).strip().replace(r'-_|\/?,><;:"}]{[+=)(*&^%$#@!`~', ' ')
        description_post = str(post_data['description'])
        ingredient_post = str(post_data["ingredient"])
        cost_post = float(post_data["cost"])
        menu_item_post = Menuitem(category_id=category_id_post, category_name=category_name_post, title=title_post, description=description_post,
                                    ingredient=ingredient_post, cost=cost_post, last_modified=datetime.now())
        menu_item_post.save()
        return {"code": 0}

@app.route('/category_dishes', methods=["GET"]) # 找到某一类目下所有菜品
def category_dishes():
    if request.method == "GET":
        transfer_data = json.loads(json.dumps(request.get_json()))  # json格式传过来
        categoryID = transfer_data["category_id"]
        category_dishes = Category.query.get_or_404(categoryID).menuitem
        category_dishes_dict = model_to_dict(category_dishes)
        return jsonify({"item_list": category_dishes_dict})

@app.route('/delete_menuitem') # 删除某一菜品
def del_menuitem():
    transfer_data = json.loads(json.dumps(request.get_json()))  # json格式传过来
    menuitemID = transfer_data["menuitem_id"]
    del_item = Menuitem.query.get_or_404(menuitemID)
    db.session.delete(del_item)  # delete function
    db.session.commit()
    return {"code": 0}

@app.route("/update_menuitem/<int:item_id>") # 更新某一菜品
def update_menuitem(item_id):
    update_data = json.loads(json.dumps(request.get_json()))  # json格式传过来
    print(update_data)
    original_data = Menuitem.query.get_or_404(item_id)
    print(original_data)
    update_function(original_data, update_data)
    db.session.commit()
    return {"code": 0}

if __name__ == '__main__':
    db.create_all() # 创建数据表
    app.run(debug=True, host='127.0.0.1', port=8080, threaded=True)
    pass
