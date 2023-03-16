// wait staff
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
import NavButton from "../stories/NavButton";
import Logout from "../stories/Logout";
import { getWaitItem, getWaitOrder, getWaitRequest, postWaitItem, postWaitOrder, postWaitRequest } from "../api/wait";
import OrderCard from "../stories/wait/OrderCard";
import WaitItemBox from "../stories/wait/WaitItemBox";
import WaitRequestBox from "../stories/wait/WaitRequestBox";
import PacmanLoader from "react-spinners/PacmanLoader";


const theme = createTheme({
  typography: {
    fontFamily: "Quicksand",
    button: {
      textTransform: 'none'
    }
  }
});

interface orderInterface {
  orderList: {
    orderId?: number;
    isRequest?: number;
    table?: number;
    time?: string;
    price?: number;
    itemList?: [
      {
        dishName?: string;
        price?: number;
        status?: string;
      }]
    }[]
  };
  
  interface itemInterface {
    itemsList: {
      itemIndex?: number;
      table?: number;
      itemTime?: string;
      dishName?: string;
    }[]
  };
  
  interface requestInterface {
    requestsList: {
      id?: number;
      table?: number;
      startTime?: string;
    }[]
  };
  
  const Waiter: React.FC<{}> = () => {
    document.title = 'Wait staff';
    const [show, setShow] = useState('request'); // which page to display
    const [numOfRequest, setNumOfRequest] = useState(0); // total number of request
  const [numOfItem, setNumOfItem] = useState(0); // total number of item
  const [numOfOrder, setNumOfOrder] = useState(0); // total number of order
  const [items, setItem] = useState<(itemInterface | any)>(); // item list
  const [order, setOrder] = useState<orderInterface | any>(); // order list
  const [request, setRequest] = useState<requestInterface | any>(); // request list
  // loading
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
  }, []);

  //for alert information when making a successful operation
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [alertInformation, setAlertInformation] = React.useState('');
  const handleSuccessSubmit = (message: string) => {
    setAlertInformation(message);
    setSuccessOpen(true);
  };
  const handleSuccessClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessOpen(false);
  };

  // get and set request list
  const getRequest = async () => {
    const message = await getWaitRequest();
    setNumOfRequest(message.requestsList.length);
    setRequest(message);
  };

  // get and set item list
  const getItem = async () => {
    const message = await getWaitItem();
    setNumOfItem(message.itemsList.length);
    setItem(message);
  };

  // get and set order list
  const getOrder = async () => {
    const message = await getWaitOrder();
    setNumOfOrder(message.orderList.length);
    setOrder(message);
    setLoading(false);
  };

  // get and set total data
  const getAll = () => {
    getRequest();
    getItem();
    getOrder();
  }

  // confirm order
  const postOrder = async (id: number) => {
    const message = await postWaitOrder(id.toString());
    console.log('confirm order', message.message);
    setNumOfOrder(numOfOrder - 1);
    const newOrder = { ...order };
    newOrder?.orderList?.forEach((item: { orderId: number; }, index: any) => {
      if (item.orderId === id) {
        newOrder?.orderList?.splice(index, 1);
      }
    })
    setOrder(newOrder);
    handleSuccessSubmit("Order has been payed!");
  };

  // confirm item
  const postItem = async (id: number) => {
    const message = await postWaitItem(id.toString());
    setNumOfItem(numOfItem - 1);
    const newItems = { ...items };
    newItems?.itemsList?.forEach((item: { itemIndex: number; }, index: number) => {
      if (item.itemIndex === id) {
        newItems?.itemsList?.splice(index, 1);
      }
    })
    setItem(newItems);
    console.log('confirm item', message.message);
    handleSuccessSubmit("Item has been served!");
  };

  // confirm request
  const postRequest = async (id: number) => {
    const message = await postWaitRequest(id.toString());
    console.log('confirm request', message.message);
    setNumOfRequest(numOfRequest - 1);
    const newRequest = { ...request };
    newRequest?.requestsList?.forEach((item: { id: number; }, index: any) => {
      if (item.id === id) {
        newRequest?.requestsList?.splice(index, 1);
      }
    })
    setRequest(newRequest);
    handleSuccessSubmit("Quest has been finished!");
  };

  // polling
  useEffect(() => {
    getAll();
    const timer = setInterval(getAll, 8000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <PacmanLoader size={100} color={"#503E9D"} loading={loading} />
        </Box>
      ) : (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'row', width: '100%' }}>
          <Box>
            {/* nav bar */}
            <Box sx={{ display: 'flex', width: 300, height: '100%', backgroundColor: '#F7F7F7', borderTopRightRadius: 10, borderBottomRightRadius: 10, flexDirection: 'column' }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', margin: 5 }}>
                Wait Staff
              </Typography>
              <Box sx={{ marginTop: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {show !== 'request' && (
                  <NavButton item='request' selected={false} doSomething={() => setShow('request')} number={numOfRequest} />
                )}
                {show === 'request' && (
                  <NavButton item='request' selected number={numOfRequest} />
                )}

                {show !== 'item' && (
                  <NavButton item='item' selected={false} doSomething={() => setShow('item')} number={numOfItem} />
                )}
                {show === 'item' && (
                  <NavButton item='item' selected number={numOfItem} />
                )}

                {show !== 'order' && (
                  <NavButton item='order' selected={false} doSomething={() => setShow('order')} number={numOfOrder} />
                )}
                {show === 'order' && (
                  <NavButton item='order' selected number={numOfOrder} />
                )}
              </Box>
              <Box sx={{ display: 'flex', height: '100%', }}></Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'end', mb: 5 }}>
                <Logout status="logout" />
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 50px)', width: '100%' }}>
            {/* request page */}
            {show === 'request' && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', height: '100%', width: '100%', overflow: "auto", ml: 15, mt: 10 }}>
                <Grid container justifyContent="flex-start" alignItems="flex-start" spacing={{ xs: 2, sm: 3, md: 5, lg: 8 }} >
                  {request?.requestsList.map((item: any) => {
                    return (
                      <Grid item xs={'auto'} key={'request' + item.id} >
                        <WaitRequestBox
                          doSomething={() => postRequest(item.id)}
                          requestId={item.id}
                          table={item.table}
                          startTime={item.startTime}
                        />
                      </Grid>
                    )
                  })}
                  {(request?.requestsList.length === 0 || !request) && (
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 50 }}>
                      <Typography variant="h3">
                        No request now......
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Box>
            )}

            {/* item page */}
            {show === 'item' && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', height: '100%', width: '100%', overflow: "auto", ml: 15, mt: 10 }}>
                <Grid container justifyContent="flex-start" alignItems="flex-start" spacing={{ xs: 2, sm: 3, md: 5, lg: 8 }} >
                  {items?.itemsList.map((item: any) => {
                    return (
                      <Grid item xs={'auto'} key={'item' + item.itemIndex} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <WaitItemBox
                          doSomething={() => postItem(item.itemIndex)}
                          itemIndex={item.itemIndex}
                          table={item.table}
                          dishName={item.dishName}
                        />
                      </Grid>
                    )
                  })}
                  {(!items || items?.itemsList.length === 0) && (
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 50 }}>
                      <Typography variant="h3">
                        No item now......
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Box>
            )}
            {/* order page */}
            {show === 'order' && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', height: '100%', width: '100%', overflow: "auto", ml: 15, mt: 10 }}>
                <Grid container justifyContent="flex-start" alignItems="flex-start" spacing={{ xs: 2, sm: 3, md: 5, lg: 8 }} >
                  {order?.orderList.map((item: any) => {
                    return (
                      <Grid item xs={'auto'} key={'order' + item.orderId} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <OrderCard
                          confirmFunc={() => postOrder(item.orderId)}
                          orderId={item.orderId}
                          table={item.table}
                          time={item.orderTime ? item.orderTime : '2000-00-00-00:00:00'}
                          isRequest={item.isRequest}
                          price={item.price}
                          itemList={item.itemList}
                        />
                      </Grid>
                    )
                  })}
                  {(!order || order?.orderList.length === 0) && (
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 50 }}>
                      <Typography variant="h3">
                        No order now......
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Box>
            )}
          </Box>
          <Snackbar
            open={successOpen}
            autoHideDuration={3000}
            onClose={handleSuccessClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert onClose={handleSuccessClose} sx={{ width: 600 }}>
              {alertInformation}
            </Alert>
          </Snackbar>
        </Box>
      )}
    </ThemeProvider>
  );
};

export default Waiter;