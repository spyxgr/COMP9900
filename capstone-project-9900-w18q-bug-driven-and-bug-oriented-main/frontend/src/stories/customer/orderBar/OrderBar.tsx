// customer order bar
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { Alert, Collapse, Divider, Paper, Snackbar, Typography } from "@mui/material";
import OrderIcon from "./OrderIcon";
import PriceTag from "./PriceTag";
import CalorieTag from "./CalorieTag";
import SubmitButton from "./SubmitButton";
import OrderDetailBox from "../orderDetailBox/OrderDetailBox";
import CheckBillButton from "./CheckBillButton";
import { useNavigate } from "react-router-dom";


interface ListProps {
  number?: number;
  price?: number;
  haveItem?: boolean;
  canSubmit?: boolean;
  ceilingOfCal?: number;
  countOfCal?: number;
  orderFunc?: (params: any) => any;
  submitFunc: (params: any) => any;
  editFunc?: (params: any) => any;
  ifCheck?: (params: any) => any;
  oldOrder?:
  {
    dishId: number,
    title: string,
    calorie: number,
    cost: number,
    dishNumber: number,
    picture: string
  }[];
  newOrder?: {
    dishId: number,
    title: string,
    calorie: number,
    cost: number,
    dishNumber: number,
    picture: string
  }[];
}


export default function OrderBar({
  number = 0,
  price = 0,
  haveItem = true,
  canSubmit = true,
  ceilingOfCal = 0,
  countOfCal = 0,
  orderFunc,
  submitFunc,
  editFunc,
  ifCheck = () => { },
  oldOrder,
  newOrder,
  ...props
}: ListProps) {

  const navigate = useNavigate();
  const [checked, setChecked] = React.useState(false);
  const handleChange = () => {
    if (checked) {
      setChecked(false);
    } else {
      setChecked(true);
    };
  };

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

  // submit order
  const toBill = () => {
    const arr = location.pathname.split('/');
    handleSuccessSubmit("Your order has been checked!");
    setTimeout(() => {
      navigate(`/customer/${arr[2]}/bill`);
    }, 1000);
  };

  useEffect(() => {
    if (!haveItem) {
      setChecked(false);
    }
  }, [haveItem])

  useEffect(() => {
    ifCheck(checked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked])

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Collapse in={haveItem ? checked : false}>
        <Paper elevation={3} sx={{ width: '100%', height: 'calc(100vh - 135px)', display: 'flex', flexDirection: 'column', overflow: "auto", borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
          <Box sx={{ m: 5, mt: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 7, mt: 5 }} >
              <Typography sx={{ p: 2, fontWeight: 'bold' }} variant='h3'>
                Your Order
              </Typography>
            </Box>
            {(oldOrder?.length !== 0 && newOrder?.length !== 1) && (
              <>
                {oldOrder?.map((item, index) => {
                  return (
                    <React.Fragment key={item.dishId}>
                      <Box sx={{ mx: 5 }}>
                        <OrderDetailBox
                          dishId={item.dishId}
                          dishName={item.title}
                          price={item.cost}
                          calories={item.calorie}
                          picture={item.picture}
                          status='submit'
                          initDishNum={item.dishNumber}
                        />
                      </Box>

                      {(index !== oldOrder.length - 1) && (
                        <Divider sx={{ my: 2, mx: 4 }} />
                      )}
                    </React.Fragment>
                  )
                })}
                <Divider sx={{
                  my: 5, "&::before, &::after": {
                    borderColor: "#000000",
                  },
                  mx: 5
                }}>
                  <Typography variant="h6" sx={{ p: 2, fontWeight: 'bold' }} >
                    Add dishes
                  </Typography>
                </Divider>
                {newOrder?.map((item, index) => {
                  return (
                    <React.Fragment key={item.dishId}>
                      {item.dishNumber !== 0 && (
                        <>
                          <Box sx={{ mx: 5 }}>
                            <OrderDetailBox
                              dishId={item.dishId}
                              dishName={item.title}
                              price={item.cost}
                              calories={item.calorie}
                              picture={item.picture}
                              status='check'
                              initDishNum={item.dishNumber}
                              passObj={orderFunc}
                            />
                            {(index !== newOrder.length - 1) && (
                              <Divider sx={{ my: 2, mx: 4 }} />
                            )}
                          </Box>
                        </>
                      )}
                    </React.Fragment>
                  )
                })}
              </>
            )}

            {(oldOrder?.length !== 0 && newOrder?.length === 1) && (
              <>
                {oldOrder?.map((item, index) => {
                  return (
                    <React.Fragment key={item.dishId}>
                      <Box sx={{ mx: 5 }}>
                        <OrderDetailBox
                          dishId={item.dishId}
                          dishName={item.title}
                          price={item.cost}
                          calories={item.calorie}
                          picture={item.picture}
                          status='submit'
                          initDishNum={item.dishNumber}
                        />
                        {(index !== oldOrder.length - 1) && (
                          <Divider sx={{ my: 2, mx: 4 }} />
                        )}
                      </Box>
                    </React.Fragment>
                  )
                })}
                <Divider sx={{
                  mt: 5, backgroundColor: '#000000',
                  mx: 5
                }}>
                </Divider>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                      <Typography variant="h6" sx={{ display: 'flex', p: 2, color: '#626264' }} >
                        Thanks for your order!
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                      <Typography variant="h6" sx={{ display: 'flex', color: '#626264' }} >
                        Check now? Click here:
                      </Typography>
                      <Box sx={{ mx: 1 }}>
                        <CheckBillButton doSomething={() => toBill()} />
                      </Box>
                    </Box>
                  </Box>
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
              </>
            )}
            {(oldOrder?.length === 0 && newOrder?.length !== 1) && (
              <>
                {newOrder?.map((item, index) => {
                  return (
                    <React.Fragment key={item.dishId}>
                      {item.dishNumber !== 0 && (
                        <React.Fragment key={item.dishId + 100}>
                          <Box sx={{ mx: 5 }}>
                            <OrderDetailBox
                              dishId={item.dishId}
                              dishName={item.title}
                              price={item.cost}
                              calories={item.calorie}
                              picture={item.picture}
                              status='check'
                              initDishNum={item.dishNumber}
                              passObj={orderFunc}
                            />
                            {(index !== newOrder.length - 1) && (
                              <Divider sx={{ my: 2, mx: 4 }} />
                            )}
                          </Box>
                        </React.Fragment>
                      )}
                    </React.Fragment>
                  )
                })}
              </>
            )}
          </Box>
        </Paper>

      </Collapse>
      <Paper elevation={5} sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'end', height: 95, borderRadius: 3 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'end' }}>
          <OrderIcon number={number} shown={haveItem} doSomething={handleChange} />
          <PriceTag price={price} />
          <Box sx={{ margin: 2.5 }}>
            <CalorieTag ceiling={ceilingOfCal} count={countOfCal} />
          </Box>
        </Box>
        <SubmitButton shown={canSubmit} doSomething={submitFunc} />
      </Paper>
    </Box>
  );
}