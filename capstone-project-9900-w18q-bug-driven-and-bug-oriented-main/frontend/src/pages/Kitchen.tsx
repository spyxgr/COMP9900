// kitchen page
import React, { useState, useEffect } from "react";
import {
  Box,
  createTheme,
  Divider,
  Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import StatusMenu from "../stories/kitchen/StatusMenu";
import PageButton from "../stories/kitchen/PageButton";
import OrderRecord from "../stories/kitchen/OrderRecord";
import NavBar from "../stories/NavBar";
import { getKitchenOrder, postKitchenOrder } from "../api/kitchen";
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
    orderId: number;
    orderTime: string;
    status: string;
    table: number;
    waitCount: number;
  }[]
}

const Kitchen: React.FC<{}> = () => {
  document.title = 'Kitchen staff';
  const navigate = useNavigate();
  const [status, setStatus] = useState('All Status'); //order method
  const [orderList, setOrderList] = useState<orderInterface | any>(); // total order list
  const [pageOrder, setPageOrder] = useState<orderInterface | any>(); // order of this page
  const [numPage, setNumPage] = useState(1); // total page number
  const [page, setPage] = useState(1); // current display page number

  // loading
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);

  // switch status display
  useEffect(() => {
    getOrder(status);
    setPage(1);
    // polling
    const timer = setInterval(() => getOrder(status), 3000);
    return () => clearInterval(timer);
  }, [status])

  // update data
  useEffect(() => {
    if (orderList) {
      // update number of page 
      const num = Math.ceil(orderList ? orderList?.orderList.length / 10 : 1);
      setNumPage(num);
      // update the order of each page
      const newOrder = { orderList: [...orderList?.orderList.slice((page - 1) * 10, (page - 1) * 10 + 10)] };
      setPageOrder(newOrder);
    }
  }, [orderList, page])

  // get and set total order 
  const getOrder = async (e: string) => {
    if (e !== 'All Status') {
      const message = await postKitchenOrder({ orderStatus: e });
      setOrderList(message);
    } else {
      const message = await getKitchenOrder();
      setOrderList(message);
    }
    setLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'row', width: '100%', minHeight: 1000 }}>
        {/* nav bar */}
        <Box>
          <NavBar role='kitchen' doSomething={() => { }} postRequest={() => { }} />
        </Box>
        {loading ? (
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <PacmanLoader size={100} color={"#503E9D"} loading={loading} />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', height: '100%', width: '100%', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'start', height: 300 }}>
              <Box sx={{ mt: 20, display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'start', }}>
                <Typography variant="h4" sx={{ display: 'flex', fontWeight: 'bold', ml: 20 }}>
                  Customer Order
                </Typography>
                {/* status button */}
                <Box sx={{ mr: 20 }}>
                  <StatusMenu doSomething={setStatus} />
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', height: '100%', flexGrow: 1, width: '100%', justifyContent: 'center', alignItems: 'start', }}>
              <Box sx={{ display: 'flex', mx: 20, my: 10, height: 800, width: '100%', flexDirection: 'column', }}>
                <Grid container spacing={1} >
                  <Grid item xs={3}>
                    <Typography variant="h6">Table</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="h6">Order time</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="h6">Number of wait items</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h6">Status</Typography>
                  </Grid>
                  <Grid item xs={1}>
                  </Grid>
                </Grid>
                <Divider sx={{ mt: 2 }} />
                <Box sx={{ height: '100%', width: '100%' }}>
                  {pageOrder?.orderList.map((item: { orderId: React.Key | null | undefined; table: Number | undefined; orderTime: string | undefined; status: string | undefined; waitCount: Number | undefined; }) => {
                    // order list
                    return (
                      <Box key={item.orderId} sx={{ my: 4 }}>
                        <OrderRecord table={item.table} orderTime={item.orderTime} status={item.status} waitCount={item.waitCount} doSomething={() => navigate(`/kitchen/${item.orderId}`)} />
                      </Box>
                    )
                  })}
                  {(!pageOrder || pageOrder?.orderList.length === 0) && (
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 50 }}>
                      <Typography variant="h3">
                        No order now......
                      </Typography>
                    </Grid>
                  )}
                </Box>
              </Box>
            </Box>
            {/* page swtich button */}
            <Box sx={{ height: 200, display: 'flex', alignItems: 'end', mb: 20, width: '100%', justifyContent: 'space-between' }}>
              <Typography variant="h6" sx={{ ml: 15, height: 55 }} >
                Showing {pageOrder?.orderList.length ? 10 * (page - 1) + 1 : 0}-{pageOrder?.orderList.length ? (pageOrder?.orderList.length + 10 * (page - 1)) : 0} from {orderList?.orderList.length} data
              </Typography>
              <Box sx={{ mr: 20 }}>
                <PageButton doSomething={setPage} numberOfPage={numPage} nowPage={page} />
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Kitchen;