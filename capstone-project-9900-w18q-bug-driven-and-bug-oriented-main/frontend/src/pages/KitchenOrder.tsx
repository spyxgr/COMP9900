// kitchen order page
import React, { useState, useEffect } from "react";
import {
  Box,
  createTheme,
  Divider,
  Grid,
  IconButton,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PageButton from "../stories/kitchen/PageButton";
import NavBar from "../stories/NavBar";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { getKitchenEachOrder, postKitchenEachOrder } from "../api/kitchen";
import ItemRecord from "../stories/kitchen/ItemRecord";
import PacmanLoader from "react-spinners/PacmanLoader";


const theme = createTheme({
  typography: {
    fontFamily: "Quicksand",
    button: {
      textTransform: 'none'
    }
  }
});

interface itemListInterface {
  itemList: {
    itemCategory: string;
    itemIndex: number;
    itemName: string;
    status: string;
  }[],
  orderTime: string,
  tableNumber: number
}

interface newStatusInterface {
  itemIndex: number;
  status: string;
}

const KitchenOrder: React.FC<{}> = () => {
  document.title = 'Kitchen staff';
  const navigate = useNavigate();
  const [itemList, setItemList] = useState<itemListInterface | any>(); //  total item list of each order
  const [pageOrder, setPageOrder] = useState<itemListInterface | any>(); // item list of each order
  const [nowTime, setNowTime] = useState(''); // order time
  const [table, setTable] = useState(0); // table number
  const [numPage, setNumPage] = useState(1); // total number of pages
  const [page, setPage] = useState(1); // current display page number
  const [newStatus, setNewStatus] = useState<newStatusInterface>(); // item's status

  // loading
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);

  // get total item list of order
  const getList = async () => {
    const orderId = location.pathname.split('/')[2];
    const message = await getKitchenEachOrder(orderId);
    if (message && (!nowTime || !table)) {
      setNowTime(message.orderTime.split(' ')[4]);
      setTable(message.tableNumber);
    }
    setItemList(message);
    setLoading(false);
  };

  // post current status of items
  const postItem = async (iIndex: number, iStatus: string) => {
    const orderId = location.pathname.split('/')[2];
    const message = await postKitchenEachOrder(
      {
        itemIndex: iIndex,
        itemStatus: iStatus
      }, orderId);
    if (message.orderId)
      console.log('success change to', iStatus);
  }

  // update status of items
  useEffect(() => {
    if (newStatus)
      postItem(newStatus.itemIndex, newStatus?.status);
  }, [newStatus])

  // update page number and item list of each page
  useEffect(() => {
    if (itemList) {
      const num = Math.ceil(itemList ? itemList?.itemList.length / 10 : 1);
      setNumPage(num);
      const newOrder = { itemList: [...itemList?.itemList.slice((page - 1) * 10, (page - 1) * 10 + 10)] };
      setPageOrder(newOrder);
    }
  }, [itemList, page])

  // polling
  useEffect(() => {
    getList();
    const timer = setInterval(() => getList(), 5000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'left', alignItems: 'start', height: 300, flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', width: '100%', justifyContent: 'left', alignItems: 'start', mt: 20, mb: 2, }}>
                <IconButton aria-label="delete" color='inherit' size="large" sx={{ ml: 20, mt: -0.5 }} onClick={() => navigate(-1)}>
                  <ArrowBackIosIcon />
                </IconButton>
                <Typography variant="h4" sx={{ display: 'flex', fontWeight: 'bold', height: 60 }}>
                  Order Items
                </Typography>
              </Box>
              <Box sx={{ width: '100%', justifyContent: 'left', alignItems: 'start' }}>
                <Typography variant="h5" sx={{ ml: 26, display: 'flex', color: '#626264' }} >
                  Table:&nbsp;{table} &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;  Order time: {nowTime}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', height: '100%', flexGrow: 1, width: '100%', justifyContent: 'center', alignItems: 'start' }}>
              <Box sx={{ display: 'flex', mx: 20, my: 7, height: 800, width: '100%', flexDirection: 'column' }}>
                <Grid container spacing={1} >
                  <Grid item xs={5}>
                    <Typography variant="h6" sx={{ ml: 2 }} >Item name</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h6">Category</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h6" sx={{ ml: 6 }} >Status</Typography>
                  </Grid>
                </Grid>
                <Divider sx={{ mt: 2 }} />
                <Box sx={{ height: '100%', width: '100%' }}>
                  {pageOrder?.itemList.map((item: { itemCategory: string | undefined; itemName: string | undefined; itemIndex: number | undefined; status: string | undefined; }) => {
                    return (
                      // item list
                      <Box key={item.itemIndex} sx={{ my: 4 }}>
                        <ItemRecord
                          doSomething={setNewStatus}
                          itemCategory={item.itemCategory}
                          itemName={item.itemName}
                          itemIndex={item.itemIndex}
                          status={item.status}
                        />
                      </Box>
                    )
                  })}
                  {(!pageOrder || pageOrder?.itemList.length === 0) && (
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 50 }}>
                      <Typography variant="h3">
                        No item now......
                      </Typography>
                    </Grid>
                  )}
                </Box>
              </Box>
            </Box>
            {/* page button  */}
            <Box sx={{ height: 200, display: 'flex', alignItems: 'end', mb: 20, width: '100%', justifyContent: 'space-between' }}>
              <Typography variant="h6" sx={{ ml: 15, height: 55 }} >
                Showing {pageOrder?.itemList.length ? 10 * (page - 1) + 1 : 0}-{pageOrder?.itemList.length ? (pageOrder?.itemList.length + 10 * (page - 1)) : 0} from {itemList?.itemList.length} data
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

export default KitchenOrder;