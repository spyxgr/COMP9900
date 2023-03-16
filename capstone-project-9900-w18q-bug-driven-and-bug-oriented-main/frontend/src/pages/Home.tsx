// home page
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  createTheme,
  Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ButtonIcon from "../stories/home/ButtonIcon";
import BorderButton from "../stories/home/BorderButton";
import OrderNowButton from "../stories/home/OrderNowButton";
import { checkLogin, getCustomerTable } from "../api/login";
import PacmanLoader from "react-spinners/PacmanLoader";


const theme = createTheme({
  typography: {
    fontFamily: "Quicksand",
    button: {
      textTransform: 'none'
    }
  }
});

// diner's number
const dinerList = [
  { number: '1' },
  { number: '2' },
  { number: '3' },
  { number: '4' },
  { number: '5' },
  { number: '6' },
];

interface tableInterface {
  tableList: {
    number: number,
    status: number,
  }[]
}

const Home: React.FC<{}> = () => {
  document.title = 'Home';
  const navigate = useNavigate();
  const [table, setTable] = useState(''); // table number
  const [diner, setDiner] = useState(''); // diner number
  const [tableList, setTableList] = useState<tableInterface>(); // table available list

  // loading
  const [loading, setLoading] = useState(true);


  // switch to customer page
  const goToOrder = async () => {
    const message = await checkLogin({
      staff: null,
      key: null,
      table: table,
      diner: diner
    });
    if (message.data.message === 'success') {
      navigate(`/customer/${message.data.orderId}/hot`)
    }
  };

  // get current available list
  const getTable = async () => {
    setLoading(true);
    const message = await getCustomerTable();
    setTableList(message);
    setTimeout(() => setLoading(false), 200);
  }

  // select table number
  const selectTable = (e: any) => {
    if (table === e) {
      setTable('')
    } else {
      setTable(e)
    }
  };

  // select diner number
  const selectDiner = (e: any) => {
    if (diner === e) {
      setDiner('')
    } else {
      setDiner(e)
    }
  };

  // keydown listener
  useEffect(() => {
    const keyDownHandler = (e: any) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (table !== '' && diner !== '') {
          goToOrder();
        }
      }
    }
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, diner])

  // init page
  useEffect(() => {
    getTable();
  }, [])

  return (
    <ThemeProvider theme={theme}>
      {/* loading page */}
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
        <Grid container component="main" sx={{ height: "100vh", minWidth: 1100, minHeight: 1000 }}>
          {/* background picture */}
          <Grid
            item
            xs={3}
            sx={{
              height: '100%',
              backgroundImage:
                `url(../../homeImg.jpg)`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              display: 'flex',
              justifyContent: 'right',
              alignItems: 'end'
            }}
          >
            <Typography variant="h4" sx={{ m: 3, fontWeight: 'bold', color: '#ABA89E' }}>
              New Bee
            </Typography>
          </Grid>
          <Grid item xs={9} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ height: 800, width: 900 }}>
              <Typography variant="h4" gutterBottom >
                Welcome!
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#626264' }}>
                Enjoy your meal
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', height: 900, marginTop: 10 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <ButtonIcon name="table" />
                  <Typography variant="h5" sx={{ margin: 1, marginLeft: 2, fontWeight: 'bold' }}>
                    TABLE
                  </Typography>
                </Box>
                {/* table list */}
                <Grid container spacing={3} sx={{ marginLeft: 7, marginBottom: 10, marginTop: 1 }}>
                  {tableList?.tableList.map((item, index) => {
                    if (item.status === 1)
                      return (
                        <Grid item xs={2} key={'table' + index}>
                          {
                            item.number === Number(table) && (
                              <BorderButton doSomething={() => selectTable(item.number.toString())}
                                number={item.number.toString()}
                                selected={true}
                              />
                            )
                          }
                          {
                            item.number.toString() !== table && (
                              <BorderButton doSomething={() => selectTable(item.number.toString())}
                                number={item.number.toString()}
                                selected={false}
                              />
                            )}
                        </Grid>
                      )

                    if (item.status === 0)
                      return (
                        <Grid item xs={2} key={'table' + index}>
                          <Button disableRipple disabled sx={{ backgroundColor: '#F5F5F5', fontWeight: 'bold', color: '#000000', borderRadius: 2, width: 40, border: 4, borderColor: '#F5F5F5' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>
                              {item.number}
                            </Typography>

                          </Button>
                        </Grid>
                      )

                    else
                      return (
                        <React.Fragment key={'no' + index}>
                        </React.Fragment>
                      )
                  })}
                </Grid>

                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <ButtonIcon name="diner" />
                  <Typography variant="h5" sx={{ margin: 1, marginLeft: 2, fontWeight: 'bold' }}>
                    DINER
                  </Typography>
                </Box>
                <Grid container spacing={3} sx={{ marginLeft: 7, marginBottom: 10, marginTop: 1 }}>
                  {dinerList.map((dinerList, index) => {
                    return (
                      <Grid item xs={2} key={'diner' + index}>
                        {
                          dinerList.number === diner && (
                            <BorderButton doSomething={() => selectDiner(dinerList.number)}
                              number={dinerList.number}
                              selected={true}
                            />
                          )}
                        {
                          dinerList.number !== diner && (
                            <BorderButton doSomething={() => selectDiner(dinerList.number)}
                              number={dinerList.number}
                              selected={false}
                            />
                          )}
                      </Grid>
                    )
                  })}
                </Grid>

                <Box>
                  <Box sx={{ marginBottom: 2 }}>
                    {(diner && table) && (
                      <OrderNowButton doSomething={() => goToOrder()} isStaff={false} confirm={true} />
                    )}
                    {(!diner || !table) && (
                      <OrderNowButton isStaff={false} confirm={false} />
                    )}
                  </Box>
                  <Box>
                    <OrderNowButton doSomething={() => navigate('/staff')} isStaff={true} />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </ThemeProvider>
  );
};

export default Home;
