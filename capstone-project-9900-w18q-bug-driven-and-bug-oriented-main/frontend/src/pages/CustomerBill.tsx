//customer bill page
import React, { useState, useEffect } from "react";
import {
  Box,
  createTheme,
  Divider,
  ThemeProvider,
  Typography,
} from "@mui/material";
import NavBar from "../stories/NavBar";
import { getCustomerBill } from "../api/customer";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import OrderDetailBox from "../stories/customer/orderDetailBox/OrderDetailBox";
import PacmanLoader from "react-spinners/PacmanLoader";


const theme = createTheme({
  typography: {
    fontFamily: "Quicksand",
    button: {
      textTransform: 'none'
    }
  }
});

const CustomerBill: React.FC<{}> = () => {
  document.title = 'Your bill';
  const [bill, setBill] = useState<any>(); // bill list
  const [price, setPrice] = useState(0); // total price

  // loading page
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);

  // get init data
  const getInit = async (e: any) => {
    const message = await getCustomerBill(e);
    setBill(message.itemList);
    let cost = 0;
    message.itemList.forEach((item: { cost: number; dishNumber: number; }) => {
      cost = cost + item.cost * item.dishNumber;
    });
    setPrice(cost);
    setLoading(false);
  };

  // init page
  useEffect(() => {
    const arr = location.pathname.split('/');
    getInit(arr[2]);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {/* loading page  */}
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
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'row' }}>
          <Box>
            {/* nav bar  */}
            <NavBar role='bill' doSomething={() => { }} postRequest={() => { }} />
          </Box>
          <Box sx={{ display: 'flex', height: '100%', width: '100%', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', m: 10, flexDirection: 'column', width: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
                <Typography sx={{ p: 2, fontWeight: 'bold' }} variant='h3'>
                  Your Order
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', height: '100%', flexDirection: 'column', overflow: "auto", width: '100%' }}>
                {/* bill list */}
                {bill?.map((item: any, index: number) => {
                  return (
                    <React.Fragment key={'key' + index}>
                      <OrderDetailBox
                        dishId={item.dishId}
                        dishName={item.title}
                        price={item.cost}
                        calories={item.calorie}
                        picture={item.picture}
                        status='bill'
                        initDishNum={item.dishNumber}
                      />
                      {(index !== bill.length - 1) && (
                        <Divider sx={{ my: 2 }} />
                      )}
                    </React.Fragment>
                  )
                })}
                <Divider sx={{
                  mt: 5, backgroundColor: '#000000',
                  mx: 5, mb: 3
                }}>
                </Divider>
                {/* calculate price */}
                <Typography variant="h6" sx={{ display: 'flex', color: '#626264' }} >
                  Thanks for your coming! Please go to the front counter to pay. <SentimentSatisfiedAltIcon sx={{ m: 0.7, color: '#FB6D3A' }} />
                </Typography>
                <Typography variant="h4" sx={{ display: 'flex', color: '#626264', justifyContent: 'right', m: 3 }} >
                  Total:
                  <Box sx={{ display: 'flex', ml: 2 }} >
                    <Typography variant="h5" sx={{ display: 'flex', color: '#000000', mt: 1 }} >
                      $
                    </Typography>
                    <Typography variant="h3" sx={{ display: 'flex', color: '#000000', mt: -1 }} >
                      {Number(price.toFixed(2))}
                    </Typography>
                  </Box>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </ThemeProvider>
  );
};

export default CustomerBill;