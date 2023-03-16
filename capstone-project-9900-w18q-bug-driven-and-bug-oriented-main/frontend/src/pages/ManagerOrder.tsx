// manager order page
import React, { useState, useEffect } from "react";
import {
  Box,
  createTheme,
  Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";
import NavBar from "../stories/NavBar";
import { getWaitOrder } from "../api/wait";
import ManagerOrderCard from "../stories/manager/managerOrderCard/ManagerOrderCard";
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

const ManagerOrder: React.FC<{}> = () => {
  document.title = 'Manager';
  const [order, setOrder] = useState<orderInterface | any>() // total order list
  // loading
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
  }, []);

  // get and set total order
  const getOrder = async () => {
    const message = await getWaitOrder();
    setOrder(message);
    setLoading(false);
  };

  // init
  useEffect(() => {
    getOrder();
  }, []);

  // polling
  useEffect(() => {
    const timer = setInterval(getOrder, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'row', width: '100%' }}>
        {/* nav bar */}
        <Box>
          <NavBar role='manager' doSomething={() => { }} postRequest={() => { }} />
        </Box>
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
          <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', alignItems: 'center', mt: 10, flexDirection: 'column', width: '100%', overflowX: 'hidden' }}>
            <Box sx={{ display: 'flex', width: '100%', }}>
              <Typography sx={{ m: 5, ml: 15 }} variant='h3'>
                Now order:
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', overflow: "auto", ml: 15, flexGrow: 1, height: '100%', width: '100%', }}>
              <Grid container alignItems={!order ? 'cneter' : 'flex-start'} justifyContent="flex-start" spacing={{ xs: 2, sm: 3, md: 5, lg: 8 }} >
                {
                  order?.orderList.map((item: any) => {
                    return (
                      <Grid item xs={'auto'} key={'order' + item.orderId} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <ManagerOrderCard
                          orderId={item.orderId}
                          table={item.table}
                          time={item.orderTime ? item.orderTime : '2000-00-00-00:00:00'}
                          price={item.price}
                          itemList={item.itemList}
                        />
                      </Grid>
                    )
                  })
                }
                {order?.orderList.length === 0 && (
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 50 }}>
                    <Typography variant="h3">
                      No order now......
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default ManagerOrder;