// customer page
import React, { useState, useEffect } from "react";
import {
  Alert,
  Box,
  createTheme,
  Grid,
  Snackbar,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../stories/NavBar";
import OrderBar from "../stories/customer/orderBar/OrderBar";
import { getCustomerCategory, getCustomerInit, getCustomerOrder, postCustomerOrder, postCustomerRecommend, postCustomerRequest } from "../api/customer";
import DishCard from "../stories/customer/dishCard/DishCard";
import PacmanLoader from "react-spinners/PacmanLoader";
import RecommendationCard from "../stories/customer/recommendationCard/RecommendationCard";

const theme = createTheme({
  typography: {
    fontFamily: "Quicksand",
    button: {
      textTransform: 'none'
    }
  }
});

const Customer: React.FC<{}> = () => {
  document.title = 'Customer';
  const navigate = useNavigate();
  const [id, setId] = useState(''); // customer order id
  const [nav, setNav] = useState<any>([]); // category list to nav bar
  const [menu, setMenu] = useState<any>([]); // menu list
  const [oldOrder, setOldOrder] = useState<any>([]); // order has been submit
  const [newOrder, setNewOrder] = useState<any>([]); // order not submit
  const [totalOrder, setTotalOrder] = useState<any>([]); // whole order include new and old
  const [numberOfItem, setNumberOfItem] = useState(0); // number of items
  const [price, setPrice] = useState(0); // total price
  const [countOfCal, setCountOfCal] = useState(0); // total calorie
  const [ceilingOfCal, setCeilingOfCal] = useState(0); // recommend calorie
  const [recommendList, setRecommendList] = useState<any>(); // recommend items list  
  const [newEdit, setNewEdit] = useState<any>({ // temp data of new added item
    dishId: -999,
    title: '',
    calorie: 0,
    cost: 0,
    dishNumber: 0,
    picture: '',
  });
  const [checked, setChecked] = useState(false); // if display cart
  const [successOpen, setSuccessOpen] = React.useState(false); // if display toast

  // loading page
  const [loading, setLoading] = useState(false);
  const [recommendLoading, setRecommendLoading] = useState(false);

  // toast display
  const handleSucessSubmit = () => {
    setSuccessOpen(true);
  };
  const handleSuccessClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessOpen(false);
  };


  // get data of init
  const getInit = async (e: any) => {
    const message = await getCustomerInit(e);
    setNav(message.categoryList);
    setCeilingOfCal(message.diner * 2000);
  };


  // request service 
  const askHelp = async () => {
    const message = await postCustomerRequest(id);
    console.log('request service', message.message)
  };


  // get menu's category
  const getCategory = async () => {
    setLoading(true);
    const arr = location.pathname.split('/');
    if (arr[3] !== 'hot') {
      const message = await getCustomerCategory(arr[2], arr[3]);
      resetMenu(newOrder, message.itemList);
    } else {
      const message = await getCustomerInit(arr[2]);
      resetMenu(newOrder, message.itemList);
    }
    setTimeout(() => setLoading(false), 200);
  };


  // get order has been submit
  const getOrder = async (e: any) => {
    const message = await getCustomerOrder(e);
    const orderList: {
      dishId: any;
      title: any;
      calorie: any;
      cost: any;
      dishNumber: any;
    }[] = [];
    message.itemList.forEach((e: any) => {
      const item = {
        dishId: e.dishId,
        title: e.title,
        calorie: e.calorie,
        cost: e.cost,
        dishNumber: e.dishNumber,
        picture: e.picture,
      };
      orderList.push(item);
    });
    setOldOrder(orderList);
  }


  // submit order
  const postOrder = async () => {
    const order = {
      'orderList': new Array<any>()
    }
    newOrder.forEach((item: any) => {
      if (item.dishNumber !== 0) {
        const e =
        {
          "dishId": item.dishId,
          "title": item.title,
          "dishNumber": item.dishNumber
        }
        order.orderList.push(e);
      }
    });
    const message = await postCustomerOrder(order, id);
    console.log('submit order', message);
    handleSucessSubmit();
    setTimeout(() => {
      // reload page
      navigate(0);
    }, 1000);
  }


  // get recommend items list
  const postRecommend = async () => {
    setRecommendLoading(true);
    const order = {
      'orderList': new Array<any>()
    }
    totalOrder.forEach((item: any) => {
      if (item.dishNumber !== 0) {
        const e =
        {
          "dishId": item.dishId,
          "title": item.title,
          "dishNumber": item.dishNumber
        }
        order.orderList.push(e);
      }
    });
    if (order.orderList.length) {
      const message = await postCustomerRecommend(order, id);
      setRecommendList(message);
      setRecommendLoading(false);
    }
  }


  // reload menu by the order's items
  const resetMenu = (input1:
    {
      dishId: number;
      title: string;
      calorie: number;
      cost: number;
      dishNumber: number;
      picture: string;
    }[], input2?:
      {
        dishId: number;
        title: string;
        calorie: number;
        cost: number;
        dishNumber: number;
        picture: string;
      }[]) => {
    if (input2) {
      const newMenu = [...input2];
      input1.forEach((e) => {
        newMenu.forEach((o) => {
          if (e?.dishId === o?.dishId) {
            o.dishNumber = e?.dishNumber;
          }
        });
      });
      setMenu(newMenu);
    } else {
      const newMenu = [...menu];
      input1.forEach((e) => {
        newMenu.forEach((o) => {
          if (e?.dishId === o?.dishId) {
            o.dishNumber = e?.dishNumber;
          }
        });
      });
      setMenu(newMenu);
    }
  };


  // update item's number if select a item multiple times
  const editItem = (input:
    {
      dishId: number;
      title: string;
      calorie: number;
      cost: number;
      dishNumber: number;
      picture: string;
    }) => {
    const order = [...newOrder];
    let flag = true;
    let index = 0;
    let i = 0;
    order.forEach((element) => {
      if (element?.dishId === input?.dishId) {
        i = index;
        flag = false;
      }
      index += 1;
    });
    if (flag) {
      order.push(input);
    } else {
      order[i].dishNumber = input?.dishNumber;
    };
    // reset the number of dish card
    resetMenu(order);
    // delete duplicate items
    order.forEach((element, index) => {
      if (element?.dishNumber === 0 && index !== 0) {
        order.splice(index, 1);
      };
    });
    setNewOrder(order);
  };


  // set loading
  useEffect(() => {
    setLoading(true);
    setRecommendLoading(true);
  }, []);


  //init page data
  useEffect(() => {
    const arr = location.pathname.split('/');
    setId(arr[2]);
    getInit(arr[2]);
    getOrder(arr[2]);
    getCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  // update total order if order is change
  useEffect(() => {
    const order = [...oldOrder, ...newOrder];
    setTotalOrder(order);
    let n = 0
    newOrder.forEach((e: any) => {
      n += e?.dishNumber
    });
    setNumberOfItem(n);
  }, [newOrder, oldOrder]);


  // update new item
  useEffect(() => {
    editItem(newEdit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newEdit]);


  // update price and cal and recommend
  useEffect(() => {
    let tempcost = 0;
    let tempCal = 0;
    totalOrder.forEach((e: {
      dishId: string;
      title: string;
      calorie: number;
      cost: number;
      dishNumber: number;
      picture: string;
    }) => {
      tempcost = tempcost + e?.cost * e?.dishNumber;
      tempCal = tempCal + e?.calorie * e?.dishNumber;
    });
    setPrice(tempcost);
    setCountOfCal(tempCal);
    postRecommend();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalOrder]);


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'row', minWidth: 800 }}>
        {/* nav bar */}
        <Box>
          <NavBar canBack={oldOrder.length === 0 ? true : false} role='customer' id={id} obj={nav} doSomething={() => getCategory()} postRequest={() => askHelp()} />
        </Box>
        <Box sx={{
          height:
            '100%',
          width: '100%',
          maxWidth: 'calc(100vw - 316.6px)',
          display: 'flex',
          flexDirection: 'column'
        }} >
          <Box sx={{
            display: 'flex',
            height: '100%',
            flexGrow: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'start',
            backgroundImage: 'url(../../Background4.png)',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "right",
            flexDirection: 'column'
          }} >
            <Box sx={{ backdropFilter: "blur(1px)", flexGrow: 1, height: 'calc(100%)', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', overflow: 'hidden' }}>
              {/* loading page */}
              {loading ? (
                <Box
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    backgroundColor: '#ffffff',
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    flexGrow: 1,
                    mb: -1.5
                  }}
                >
                  <PacmanLoader size={100} color={"#503E9D"} loading={loading} />
                </Box>
              ) : (
                <Box sx={{ height: 'calc(100vh - 115px)', width: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1, position: 'relative', justifyContent: 'center' }}>
                  <Box sx={{ ml: 7, overflow: "auto", flexGrow: 1, mt: 5, width: '100%', height: '100%', mb: 1 }}>
                    <Grid container rowSpacing={{ xs: 2, sm: 3, md: 5, lg: 1 }} sx={{}} columnSpacing={{ xs: 2, sm: 3, md: 5, lg: 8 }} justifyContent='flex-start' alignItems='flex-start' >
                      {menu?.map((item: any) => {
                        return (
                          // dish card
                          <Grid item xs={'auto'} key={item.dishId} sx={{ width: 500, height: 350 }}>
                            <DishCard
                              dishId={item.dishId}
                              dishName={item.title}
                              description={item.description}
                              ingredients={item.ingredient}
                              calories={item.calorie}
                              price={item.cost}
                              picture={item.picture}
                              initDishNum={item.dishNumber}
                              passObj={setNewEdit}
                            />
                          </Grid>
                        )
                      })}

                      {menu.length === 0 && (
                        // no dish now
                        <Grid item sx={{ height: 'calc(100vh - 200px)', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
                          <Typography variant="h3" sx={{ color: '#ffffff' }}>
                            Upcoming......
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                  {/* recommend bar */}
                  {(numberOfItem >= 1 && !checked && !recommendLoading) &&
                    <Box sx={{ height: 255, bgcolor: '#F3F2F7', mb: -5, borderRadius: 3, display: 'flex', flexDirection: 'column', ml: 1, mr: 1, flexGrow: 1 }}>
                      <Typography variant="h6" sx={{ m: 1, ml: 3, fontWeight: 'bold' }}>
                        You may also like:
                      </Typography>
                      <Box sx={{ height: '100%', ml: 5, mr: 5, display: 'flex', flexDirection: 'row', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                        {recommendList?.itemList.map((item: any, index: any) => {
                          return (
                            // recommend system
                            <Box key={'recom' + index} sx={{ height: 130, ml: 3, display: 'inline-block', width: 500, }}>
                              <RecommendationCard
                                dishId={item.dishId.toString()}
                                dishName={item.title}
                                description={item.description}
                                ingredients={item.ingredient}
                                calories={item.calorie.toString()}
                                price={item.cost.toString()}
                                picture={item.picture}
                                initDishNum={item.dishNumber}
                                passObj={setNewEdit}
                              />
                            </Box>
                          )
                        })}
                      </Box>
                    </Box>
                  }

                  {(numberOfItem >= 1 && !checked && recommendLoading) &&
                    <Box sx={{ height: 255, bgcolor: '#F3F2F7', mb: -5, borderRadius: 3, display: 'flex', flexDirection: 'column', ml: 1, mr: 1, flexGrow: 1 }}>
                      <Box
                        sx={{
                          textAlign: "center",
                          display: "flex",
                          backgroundColor: '#F3F2F7',
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                          height: "100%",
                          flexGrow: 1,
                          mb: 8
                        }}
                      >
                        <PacmanLoader size={50} color={"#503E9D"} loading={recommendLoading} />
                      </Box>
                    </Box>
                  }
                </Box>
              )}
              {/* cart bar */}
              <Box sx={{ display: 'flex', alignItems: 'end', width: '100%', position: 'relative', zIndex: 50, height: 115 }}>
                <OrderBar
                  haveItem={(numberOfItem >= 1 || oldOrder.length !== 0) ? true : false}
                  canSubmit={(numberOfItem >= 1) ? true : false}
                  number={numberOfItem}
                  price={Number(price.toFixed(2))}
                  ceilingOfCal={ceilingOfCal}
                  countOfCal={countOfCal}
                  submitFunc={() => postOrder()}
                  newOrder={newOrder}
                  oldOrder={oldOrder}
                  orderFunc={setNewEdit}
                  ifCheck={(e) => setChecked(e)}
                />
                <Snackbar
                  open={successOpen}
                  autoHideDuration={3000}
                  onClose={handleSuccessClose}
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                  <Alert onClose={handleSuccessClose} sx={{ width: 600 }}>
                    Your order has been submitted!
                  </Alert>
                </Snackbar>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Customer;