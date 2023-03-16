// menu item edit page
import React, { useState, useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  createTheme,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  ThemeProvider,
  Typography,
} from "@mui/material";
import NavBar from "../stories/NavBar";
import { addManagerItem, deleteManagerItem, editManagerItem, getManagerItem, postManagerItemOrder } from "../api/manager";
import ManagerAddDishButton from "../stories/manager/managerAddDishButton/ManagerAddDishButton";
import ManagerDishCard from "../stories/manager/managerDishCard/ManagerDishCard";
import PacmanLoader from "react-spinners/PacmanLoader";
import BorderColorIcon from '@mui/icons-material/BorderColor';


const theme = createTheme({
  typography: {
    fontFamily: "Quicksand",
    button: {
      textTransform: 'none'
    }
  }
});

interface categoryListInterface {
  [index: number]: {
    categoryName: string;
    categoryId: number;
  }
}

interface itemListInterface {
  itemList: {
    ingredient: string;
    picture: string;
    categoryName: string;
    dishId: number;
    description: string;
    calorie: number;
    dishName: string;
    price: number;
  }[]
}

interface totalInterface {
  [index: number]: {
    categoryId: number;
    itemList: {
      ingredient: string;
      picture: string;
      categoryName: string;
      dishId: number;
      description: string;
      calorie: number;
      dishName: string;
      price: number;
    }[]
  }
}


const ManagerMenu: React.FC<{}> = () => {
  document.title = 'Manager';
  const [categoryList, setCategoryList] = useState<categoryListInterface>(); // total category list
  const [move, setMove] = useState(false); // if sort model
  const [itemList, setItemList] = useState<totalInterface>(); // total item list
  const [nowItemList, setNowItemList] = useState<itemListInterface>(); // item list of each category
  const [nowCategoryId, setNowCategoryId] = useState<string>(''); // id of current category
  const [nowCategoryName, setNowCategoryName] = useState<string | undefined>(''); // name of current category
  const [mapList, setMapList] = useState<Map<string, string>>(); // map of name and id
  const [source, setSource] = useState<null | number>(null); // drag source item
  const [target, setTarget] = useState<null | number>(null); // drag target item
  const [hide, setHide] = useState(false); // if drag trigger region hidden 

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

  //loading
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
  }, []);

  // switch sort model
  const sortFunc = () => {
    if (move) {
      setMove(false);
      if (nowItemList) {
        let newList = new Array<any>();
        for (let i = 0; i < nowItemList.itemList.length; i++) {
          if (nowItemList.itemList[i].dishId !== 0)
            newList.push(nowItemList.itemList[i]);
        }
        postOrder({ itemList: newList });
      }
    } else {
      setMove(true);
    }
  }

  // drag start trigger function
  const onDragStart = (id: number) => (e: any) => {
    setSource(id);
    setTimeout(() => setHide(true), 50);
  }

  // drag cover trigger function
  const onDragOver = (id: number) => (e: any) => {
    e.preventDefault();
    setTarget(id);
    setHide(true);
  }

  // drag leave region trigger function
  const onDragLeave = (id: number) => (e: any) => {
    e.preventDefault();
    setTarget(null)
    setTimeout(() => setHide(false), 0);
  }

  // reset list order by edit
  const modifyList = (input: itemListInterface): itemListInterface => {
    if (input.itemList) {
      let newList = new Array<any>();
      for (let i = 0; i < input.itemList.length; i++) {
        newList.push(
          {
            ingredient: '',
            picture: '',
            categoryName: '',
            dishId: 0,
            description: '',
            calorie: 0,
            dishName: '',
            price: 0,
          });
        newList.push(input.itemList[i]);
        newList.push(
          {
            ingredient: '',
            picture: '',
            categoryName: '',
            dishId: 0,
            description: '',
            calorie: 0,
            dishName: '',
            price: 0,
          });
      }
      return { itemList: newList };
    } else {
      return { itemList: [] };
    }
  }

  // drag action function
  const onDrop = () => {
    // init and reset coordinates
    setSource(null);
    setTarget(null);
    setHide(false);
    // update data of target region
    if ((nowItemList) && (target !== null) && (source !== null)) {
      if (nowItemList.itemList[target].dishId !== 0) {
        nowItemList.itemList[target - 1] = nowItemList.itemList[source]
      } else {
        nowItemList.itemList[target] = nowItemList.itemList[source]
      }
      // update data of source region
      nowItemList.itemList[source] = {
        ingredient: '',
        picture: '',
        categoryName: '',
        dishId: 0,
        description: '',
        calorie: 0,
        dishName: '',
        price: 0,
      }
      // update total category list
      let newList = new Array<any>();
      for (let i = 0; i < nowItemList.itemList.length; i++) {
        if (nowItemList.itemList[i].dishId !== 0)
          newList.push(nowItemList.itemList[i]);
      }
      setNowItemList(modifyList({ itemList: newList }));
    }
  }

  // init
  const init = async () => {
    const message = await getManagerItem();
    if (message) {
      setCategoryList(message?.categoryList);
      // set map between id and name
      var map1 = new Map<any, any>();
      message?.categoryList.forEach((item: any) => {
        map1.set(item.categoryId.toString(), item.categoryName);
      });
      setMapList(map1);
      setItemList(message?.itemList);
      setNowItemList(modifyList(message?.itemList[0].itemList));
      setNowCategoryId(message?.categoryList[0].categoryId.toString());
      setNowCategoryName(message?.categoryList[0].categoryName);
      setLoading(false);
    }
  }

  // post new order of item list
  const postOrder = async (input: {
    itemList: {
      ingredient: string;
      picture: string;
      categoryName: string;
      dishId: number;
      description: string;
      calorie: number;
      dishName: string;
      price: number;
    }[]
  }) => {
    const message = await postManagerItemOrder(input);
    setItemList(message.itemList);
    handleSuccessSubmit("New item list order has been stored!");
  }

  // add new item
  const addItem = async (
    input:
      {
        ingredient: string;
        picture: string;
        categoryName: string;
        description: string;
        calorie: number;
        title: string;
        cost: number;
      }) => {
    const message = await addManagerItem(input);
    if (message) {
      setItemList(message?.itemList);
      handleSuccessSubmit("New item has been added!");
    }
  }

  // delete item
  const deleteItem = async (
    input: number
  ) => {
    const message = await deleteManagerItem(input.toString());
    if (message) {
      setItemList(message?.itemList);
      handleSuccessSubmit("Item has been deleted!");
    }
  }

  // edit item
  const editItem = async (
    id: number,
    input: {
      categoryName: string;
      title: string;
      description: string;
      ingredient: string;
      cost: number;
      calorie: number;
      picture: string;
    },
  ) => {
    const message = await editManagerItem(id.toString(), input);
    if (message) {
      setItemList(message?.itemList);
    }
  }

  // init
  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // reload item list
  useEffect(() => {
    if (itemList) {
      setNowCategoryName(mapList?.get(nowCategoryId));
      Array.isArray(itemList) && itemList.forEach((item: any) => {
        if (item.categoryId.toString() === nowCategoryId) {
          setNowItemList(modifyList({ itemList: item.itemList }));
        }
      });
    }
    setMove(false);
  }, [nowCategoryId, itemList, mapList])

  // switch category
  const handleCategorySelectChange = (event: SelectChangeEvent) => {
    setNowCategoryId(event.target.value);
  };


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'row' }}>
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
          <Box sx={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ alignItems: 'end', justifyContent: 'space-between', height: 300, width: '100%', display: 'flex' }}>
              {/* sort and add button  */}
              <Box sx={{ ml: 20 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}  >
                  CATEGORY NAME:
                </Typography>
                {
                  nowCategoryId && (
                    <Select
                      value={nowCategoryId ? nowCategoryId : ""}
                      onChange={handleCategorySelectChange}
                      sx={{ height: 35, mb: 5 }}
                    >
                      {
                        Array.isArray(categoryList) && categoryList?.map((item: any) => {
                          return (
                            // category switch menu
                            <MenuItem key={'cate' + item.categoryId} value={item.categoryId.toString()}>
                              {item.categoryName}
                            </MenuItem>
                          )
                        })
                      }
                    </Select>
                  )
                }
              </Box>
              <Box sx={{ mr: 20, mb: 5, display: 'flex' }}>
                <Box sx={{ mr: 5 }}>
                  <Button variant="contained" onClick={sortFunc} sx={{
                    height: 45, width: 120, backgroundColor: '#503E9D', borderRadius: 3, '&:hover': {
                      backgroundColor: '#8475B0'
                    }
                  }}>
                    <Box sx={{ display: 'flex' }}>
                      <BorderColorIcon sx={{ color: '#ffffff' }} />
                      <Typography variant="inherit" sx={{ color: '#ffffff', marginLeft: 1, fontSize: 16 }}>
                        Sort
                      </Typography>
                    </Box>
                  </Button>
                </Box>
                <ManagerAddDishButton
                  categoryName={nowCategoryName}
                  addCard={(obj) => { addItem(obj) }}
                />
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1, height: '100%', overflow: "auto", mt: 5, ml: 10, }}>
              <Grid container spacing={{}} justifyContent='start' >
                {
                  Array.isArray(nowItemList?.itemList) && nowItemList?.itemList?.map((item: any, index) => {
                    if (index % 3 === 1)
                      return (
                        <Grid item container xs={'auto'} key={'dishname' + index}>
                          {/* null value padding */}
                          <Box sx={{
                            mt: 3,
                            width: 280,
                            mr: -31.25,
                            position: 'relative',
                            zIndex: hide ? 15 : 5,
                            display: 'flex',
                            justifyContent: 'start',
                            borderLeft: (index - 1 === target) ? '3px solid #503E9D' : '3px solid #ffffff',
                            mb: 3
                          }}
                            onDragOver={onDragOver(index - 1)}
                            onDragLeave={onDragLeave(index)}
                            onDragStart={onDragStart(index - 1)}
                            onDrop={onDrop}
                          >
                          </Box>
                          {/* drag card container */}
                          <Box
                            sx={{
                              mt: 5,
                              height: '100%'
                            }}
                            onDragOver={onDragOver(index)}
                            onDragLeave={onDragLeave(index)}
                          >
                            {/* drag item element */}
                            <Box sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              height: '100%',
                              width: '100%',
                              alignItems: 'center',
                              position: 'relative',
                              zIndex: 10,
                            }}
                              draggable={(item.dishId !== 0 && move) ? true : false}
                              onDragStart={onDragStart(index)}
                              onDrop={onDrop}
                            >
                              {
                                item.dishId !== 0 && (
                                  <ManagerDishCard
                                    dishId={item.dishId}
                                    dishName={item.dishName}
                                    categoryName={item.categoryName}
                                    description={item.description}
                                    ingredients={item.ingredient}
                                    calories={item.calorie}
                                    price={item.price}
                                    picture={item.picture}
                                    removeCard={(e) => deleteItem(e)}
                                    editCard={(obj) => { editItem(item.dishId, obj) }}
                                    canMove={move}
                                    selected={source === index}
                                  />
                                )}
                            </Box>
                          </Box>
                          <Box sx={{
                            mt: 3,
                            width: 280,
                            ml: -31.25,
                            position: 'relative',
                            zIndex: hide ? 15 : 5,
                            borderRight: (index + 1 === target) ? '3px solid #503E9D' : '3px solid #ffffff',
                            mb: 3
                          }}
                            onDragOver={onDragOver(index + 1)}
                            onDragLeave={onDragLeave(index)}
                            onDragStart={onDragStart(index + 1)}
                            onDrop={onDrop}
                          >
                          </Box>
                        </Grid>
                      )
                    else
                      return (
                        <React.Fragment key={'menu' + index}>
                        </React.Fragment>
                      )
                  })}
                {
                  Array.isArray(nowItemList?.itemList) && nowItemList?.itemList.length === 0 && (
                    <Grid item xs={12} sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 30 }}>
                      <Typography variant="h3">
                        Please add new item......
                      </Typography>
                    </Grid>
                  )
                }
              </Grid>
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
      </Box>
    </ThemeProvider>
  );
};

export default ManagerMenu;