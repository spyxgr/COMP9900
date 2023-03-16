// category edit page
import React, { useState, useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  createTheme,
  Divider,
  Snackbar,
  ThemeProvider,
  Typography,
} from "@mui/material";
import NavBar from "../stories/NavBar";
import AddManagerCategory from "../stories/manager/managerCategoryCard/AddManagerCategory";
import { getManagerCategory, postManagerCategory, postManagerCategoryOrder } from "../api/manager";
import ManagerCategoryCard from "../stories/manager/managerCategoryCard/ManagerCategoryCard";
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

interface categoryInterface {
  categoryList: {
    categoryName: string;
    categoryId: number,
    lastModified: string,
  }[]
}

const ManagerCategory: React.FC<{}> = () => {
  document.title = 'Manager';
  const [categoryList, setCategoryList] = useState<categoryInterface>(); // total category list
  const [move, setMove] = useState(false); // if sort model
  const [source, setSource] = useState<null | number>(null); // drag source item
  const [target, setTarget] = useState<null | number>(null); // drag target item
  const [hide, setHide] = useState(false); // if drag trigger region hidden 
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

  // switch sort model
  const sortFunc = () => {
    if (move) {
      setMove(false);
      if (categoryList) {
        let newList = new Array<any>();
        for (let i = 0; i < categoryList.categoryList.length; i++) {
          if (categoryList.categoryList[i].categoryId !== 0)
            newList.push(categoryList.categoryList[i]);
        }
        // post new order if sort finished
        postList({ categoryList: newList });
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
    setHide(true)
  }

  // drag leave region trigger function
  const onDragLeave = (id: number) => (e: any) => {
    e.preventDefault();
    setTarget(null)
    setTimeout(() => setHide(false), 0);
  }

  // drag action function
  const onDrop = () => {
    // init and reset coordinates
    setSource(null);
    setTarget(null);
    setHide(false);
    // update data of target region
    if ((categoryList) && (target !== null) && (source !== null)) {
      if (categoryList.categoryList[target].categoryId !== 0) {
        categoryList.categoryList[target - 1] = categoryList.categoryList[source]
      } else {
        categoryList.categoryList[target] = categoryList.categoryList[source]
      }
      // update data of source region
      categoryList.categoryList[source] = {
        categoryId: 0,
        categoryName: '',
        lastModified: ''
      }
      // update total category list
      let newList = new Array<any>();
      for (let i = 0; i < categoryList.categoryList.length; i++) {
        if (categoryList.categoryList[i].categoryId !== 0)
          newList.push(categoryList.categoryList[i]);
      }
      setCategoryList(modifyList({ categoryList: newList }));
    }
  }

  // post new order of list
  const postList = async (input: {
    categoryList: {
      categoryName: string;
      lastModified: string;
      categoryId: number;
    }[]
  }) => {
    const message = await postManagerCategoryOrder(input);
    setCategoryList(modifyList(message));
    handleSuccessSubmit("New category list order has been stored!");
  }

  // reset list order by edit
  const modifyList = (input: categoryInterface): categoryInterface => {
    let newList = new Array<any>();
    for (let i = 0; i < input.categoryList.length; i++) {
      newList.push(
        {
          categoryId: 0,
          categoryName: '',
          lastModified: ''
        });
      newList.push(input.categoryList[i]);
    }
    if (newList.length !== 0) {
      newList.push({
        categoryId: 0,
        categoryName: '',
        lastModified: ''
      });
    }
    return { categoryList: newList };
  }

  // get total category list
  const getCategory = async () => {
    const message = await getManagerCategory();
    setCategoryList(modifyList(message));
    setLoading(false);
  }

  // add new category
  const postCategory = async (input: string) => {
    const message = await postManagerCategory({ categoryName: input });
    if (message.message) {
      return (message.message);
    } else {
      setCategoryList(modifyList(message));
      handleSuccessSubmit("New category has been added!");
    }
  }

  // init
  useEffect(() => {
    getCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'row' }}>
        {/* nav bar  */}
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
            <Box sx={{ alignItems: 'end', justifyContent: 'right', height: 200, width: '100%', display: 'flex', flexDirection: 'row' }}>
              {/* sort and add button */}
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
              <Box sx={{ mr: 15 }}>
                <AddManagerCategory
                  submitFunc={(e) => postCategory(e)}
                />
              </Box>
            </Box>
            <Box justifyContent={'center'} alignItems={'flex-start'} sx={{ height: '100%', width: '100%', overflow: "auto", mt: 5, mb: 5 }}>
              {
                // drag trigger region extension
                categoryList?.categoryList.map((item, index) => {
                  let zValue;
                  if (item.categoryId !== 0) {
                    zValue = 10;
                  }
                  if (item.categoryId === 0 && !hide) {
                    zValue = 5;
                  }
                  if (item.categoryId === 0 && hide) {
                    zValue = 15;
                  }
                  return (
                    <Box key={item.categoryId + 'cate' + index} sx={{ mt: -8, mb: -12, mx: 10, display: 'flex', alignItems: 'center' }}>
                      {/* drag card container */}
                      <Box sx={{
                        width: '100%',
                        display: 'flex', alignItems: 'center'
                      }}
                        onDragOver={onDragOver(index)}
                        onDragLeave={onDragLeave(index)}
                      >
                        {/* drag item element */}
                        <Box sx={{
                          width: '100%',
                          position: 'relative',
                          display: 'flex', alignItems: 'center',
                        }}
                          height={item.categoryId === 0 ? 210 : 185}
                          zIndex={zValue}
                          draggable={(item.categoryId !== 0 && move) ? true : false}
                          onDragStart={onDragStart(index)}
                          onDrop={onDrop}
                        >
                          {item.categoryId !== 0 &&
                            <ManagerCategoryCard
                              categoryId={item.categoryId}
                              categoryName={item.categoryName}
                              lastModified={item.lastModified}
                              canMove={move}
                              selected={source === index}
                              fatherListener={setMove}
                            />}
                          {
                            (item.categoryId === 0) &&
                            <Divider sx={{
                              width: '100%',
                              "&::before, &::after": {
                                borderColor: target === index ? '#503E9D' : '#ffffff',
                              },
                              color: target === index ? '#503E9D' : '#ffffff',
                            }}> Move to here
                            </Divider>
                          }
                        </Box>
                      </Box>
                    </Box>
                  )
                })
              }
              {((categoryList?.categoryList.length === 0) || (!categoryList)) && (
                <Box sx={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography variant="h3">
                    No category now......
                  </Typography>
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
      </Box>

    </ThemeProvider>
  );
};

export default ManagerCategory;