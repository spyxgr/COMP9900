// dish card
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddNumberBox from "./AddNumberBox";
import { useEffect } from 'react';


interface ListProps {
  doSomething?: (params: any) => any;
  dishId?: string;
  dishName?: string;
  description?: string;
  ingredients?: string;
  calories?: string;
  price?: string;
  picture?: string;
  initDishNum?: number;
  passObj?: (params: any) => any;
}

const theme = createTheme({
  palette: {
    neutral: {
      main: '#503E9D',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: "Quicksand",
    button: {
      textTransform: 'none'
    }
  }
});

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}


export default function DishCard({
  dishId = '123',
  dishName = 'Chicken Grill',
  description = 'It is one of the mot iconic and well-recognized fast food out there.',
  ingredients = 'Meat, vegetable',
  calories = '20',
  price = '16.66',
  picture = '/dishImg/chickenGrill.jpg',
  initDishNum = 0,
  passObj = () => { },
  ...props
}: ListProps) {

  const [open, setOpen] = React.useState(false);
  const [dishNum, setDishNum] = React.useState(0);
  const [dishTryNum, setDishTryNum] = React.useState(0);

  // pop window
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // select number
  const selectDishNum = () => {
    setDishNum(dishTryNum);
    const obj = {
      dishId: dishId,
      title: dishName,
      calorie: calories,
      cost: price,
      dishNumber: dishTryNum,
      picture: picture,
    };
    // let father commponent read
    passObj(obj);
    setOpen(false);
  };

  // init
  useEffect(() => {
    setDishNum(0);
  }, [initDishNum]);

  return (
    <>
      {((dishNum !== 0) || (initDishNum !== 0 && initDishNum)) && (
        <Box sx={{
          height: 50,
          width: 50,
          backgroundColor: '#FB6D3A',
          color: '#fff',
          borderRadius: 10,
          fontWeight: 'bold',
          fontSize: 20,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          position: 'relative',
          zIndex: 15,
          ml: 55,
        }}>
          {((initDishNum !== 0) && (dishNum === 0)) ? initDishNum : dishNum}
        </Box>
      )}

      {((dishNum === 0) && (initDishNum === 0)) && (
        <Box sx={{
          height: 50,
          width: 50,
          color: '#fff',
          borderRadius: 10,
          fontWeight: 'bold',
          fontSize: 20,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          position: 'relative',
          zIndex: 5,
          ml: 55,
        }}>
        </Box>
      )}

      <Card sx={{ width: 465, borderRadius: 5, border: 0, zIndex: 10, position: 'relative', mt: -2.5 }}>
        <CardMedia
          component="img"
          height="180"
          sx={{ width: '100%', borderRadius: 5 }}
          image={picture}
          alt={dishName}
        />

        <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', height: 50 }}>
            <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              {dishName}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Box
              sx={{
                minWidth: 50,
                height: 23,
                borderRadius: 2,
                backgroundColor: '#EEECF5',
                color: '#503E9D',
                textAlign: 'center',
                p: 0.5,
                m: 0.5,
              }}
            >
              <Typography sx={{ fontWeight: 'bold' }}>
                {calories}Cal
              </Typography>
            </Box>

            <Box
              sx={{
                minWidth: 50,
                height: 23,
                borderRadius: 2,
                backgroundColor: '#EEECF5',
                color: '#503E9D',
                textAlign: 'center',
                p: 0.5,
                m: 0.5,
                fontWeight: 'bold',
              }}
            >
              <Typography sx={{ fontWeight: 'bold' }}>
                $ {price}
              </Typography>
            </Box>
          </Box>
        </CardContent>

        <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', mx: 1, mt: -2, mb: 2 }}>
              <Button
                size="small"
                variant="contained"
                color='neutral'
                onClick={handleOpen}
                sx={{ borderRadius: 2 }}
              >
                <Typography sx={{}}>
                  Select
                </Typography>
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
              >
                <Box sx={{
                  position: 'absolute' as 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }} >
                  <IconButton
                    style={{ position: "absolute", top: "0", right: "0", color: 'grey' }}
                    onClick={handleClose}
                  >
                    <CloseIcon fontSize="large" />
                  </IconButton>
                  <Card sx={{ maxWidth: 720, borderRadius: 5 }}>
                    <CardMedia
                      component="img"
                      height="420"
                      image={picture}
                      alt="chicken grill"
                      sx={{ width: '100%', borderRadius: 5 }}
                    />
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

                        <Box sx={{ display: 'flex' }}>
                          <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                            {dishName}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: 'flex',
                            minWidth: 30,
                            borderRadius: 2,
                            height: 23,
                            backgroundColor: '#EEECF5',
                            color: '#503E9D',
                            textAlign: 'center',
                            p: 0.5,
                            m: 0.5,
                            fontWeight: 'bold',
                          }}>
                          <Typography sx={{ fontWeight: 'bold' }}>
                            {calories}Cal
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ my: 0.2, flexDirection: 'row', display: 'flex' }}>
                        <Typography variant="body1" component="div" >
                          $
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ mt: -0.7 }} >
                          {price}
                        </Typography>
                      </Box>

                      <Box sx={{ my: 0.5, display: 'inline' }}>
                        <Typography variant="body1" component="div" >
                          <span style={{ fontWeight: "bold" }}>Ingredient:</span >
                          <span > {ingredients} </span >
                        </Typography>
                      </Box>

                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body1" component="div" >
                          {description}
                        </Typography>
                      </Box>
                    </CardContent>

                    <CardActions sx={{ display: 'flex', justifyContent: 'space-between', ml: 1 }}>
                      <ThemeProvider theme={theme}>
                        <AddNumberBox passNum={setDishTryNum} initialNum={((initDishNum !== 0) && (dishNum === 0)) ? initDishNum : 1} />
                        <Box sx={{ display: 'flex', mx: 1 }}>
                          <Button
                            size="small"
                            variant="contained"
                            color='neutral'
                            onClick={selectDishNum}
                            sx={{ borderRadius: 2, px: 3, }}
                          >
                            <Typography sx={{}}>
                              Select
                            </Typography>
                          </Button>
                        </Box>
                      </ThemeProvider>
                    </CardActions>
                  </Card>
                </Box>
              </Modal>
            </Box>
          </ThemeProvider>
        </CardActions>
      </Card>
    </>
  );
}
