// customer bill list
import { Box } from "@mui/system";
import * as React from 'react';
import { Typography } from "@mui/material";
import AddNumberBox from "../dishCard/AddNumberBox";


interface ListProps {
  dishId?: number;
  dishName?: string;
  description?: string;
  ingredients?: string;
  calories?: number;
  price?: number;
  picture?: string;
  initDishNum?: number;
  status?: string;
  passObj?: (params: any) => any;
}


export default function OrderDetailBox({
  dishId = 123,
  dishName = 'Chicken Grill',
  description = 'It is one of the mot iconic and well-recognized fast food out there.',
  ingredients = 'Meat, vegetable',
  calories = 20,
  price = 16.66,
  picture = '/dishImg/chickenGrill.jpg',
  initDishNum = 0,
  passObj = () => { },
  status = 'check', //check, submit, bill
  ...props
}: ListProps) {

  const [dishNum, setDishNum] = React.useState(initDishNum);

  const changeDishNum = (newDishNum: number) => {
    setDishNum(newDishNum);
    const obj = {
      dishId: dishId,
      title: dishName,
      calorie: calories,
      cost: price,
      dishNumber: newDishNum,
      picture: picture,
    };
    passObj(obj);
  };

  return (
    <>
      <Box display='flex' justifyContent='space-between' sx={{ width: '100%', height: 110, alignContent: 'center' }}>
        <Box display='flex' >
          <Box>
            <img alt={dishName} src={picture} style={{ width: 370, height: 100, objectFit: 'cover', borderRadius: 8 }} />
          </Box>
          <Box>
            <Box sx={{ fontSize: 20, fontWeight: 'bold', m: 2 }}>
              <Typography sx={{ fontWeight: 'bold' }}>
                {dishName}
              </Typography>
            </Box>
            <Box display='flex' sx={{ m: 2 }}>
              <Box sx={{ px: 0.5, py: 0.5 }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ color: '#626264' }}>
                  ${price}
                </Typography>
              </Box>

              {status !== 'bill' && (
                <Box sx={{ display: 'flex', backgroundColor: '#FFF1EC', color: '#fb7140', mx: 2, px: 1, py: 0.5, height: 23, borderRadius: 2, fontWeight: 'bold', mt: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', }} >
                    {calories}Cal
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        {status === 'check' && (
          <Box sx={{ mt: 4 }}>
            <AddNumberBox passNum={changeDishNum} initialNum={dishNum} />
          </Box>
        )}

        {status === 'submit' && (
          <Box display='flex' sx={{ mt: 4, mx: 4, fontSize: 16, fontWeight: 'bold' }}>
            <Typography gutterBottom variant="h5" component="div" sx={{ color: '#626264' }}>
              &times; {initDishNum}
            </Typography>
          </Box>
        )}

        {status === 'bill' && (
          <Box display='flex' sx={{ mt: 4, mx: 4, }}>
            <Typography gutterBottom variant="h5" component="div" sx={{ color: '#626264' }}>
              ${price} &times; {initDishNum}
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
}