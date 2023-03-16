// manager order check card 
import { Box } from "@mui/system";
import React from "react";
import { Button, Card, Collapse, Paper, Typography } from "@mui/material";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


interface ListProps {
  orderId?: string;
  table?: string;
  time?: string;
  price?: string;
  itemList?: {
    dishName: string,
    price: string,
    status: string,
  }[];
  confirmFunc?: (params: any) => any;
}


export default function ManagerOrderCard({
  orderId = '',
  table = '',
  time = '',
  price = '',
  itemList = [],
  confirmFunc = () => { },
  ...props
}: ListProps) {

  // format date
  const arr = time.split('-');
  const day = arr[2] + '/' + arr[1] + '/' + arr[0];
  const t = arr[3];

  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    if (checked) {
      setChecked(false);
    } else {
      setChecked(true);
    };
  };

  return (
    <>
      <Card sx={{ minHeight: 275, width: 450, backgroundColor: '#F7F7F7', borderRadius: 5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography sx={{ m: 2, ml: 4, fontWeight: 'bold' }} variant='h6'>
            Table {table}
          </Typography>
          <Typography sx={{ color: '#626264', m: 2, mr: 4 }} variant='subtitle1'>
            #{orderId}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', mb: 2 }}>
          <Typography sx={{ ml: 4, color: '#626264' }} variant='subtitle1'>
            <CalendarTodayIcon sx={{ mr: 0.5, mb: -0.5 }} />{day}
          </Typography>
          <Typography sx={{ ml: 5, color: '#626264' }} variant='subtitle1'>
            <AccessTimeIcon sx={{ mr: 0.5, mb: -0.7 }} />{t}
          </Typography>
        </Box>

        <Collapse in={checked}>
          <Paper elevation={0} sx={{ width: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#F7F7F7', overflow: "auto", maxHeight: 400 }}>
            <Box sx={{ m: 4, mt: 4 }}>
              {itemList.map((item, index) => {
                return (
                  <Box key={Math.random()} sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }} >
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ width: 35, height: 35, backgroundColor: '#E7E7E7', color: '#626264', fontWeight: 'bold', justifyContent: 'center', alignItems: 'center', display: 'flex', borderRadius: 2 }}>
                        {index + 1}
                      </Box>
                      <Typography sx={{ ml: 1, fontWeight: 'bold' }} variant='h6'>
                        {item.dishName}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', width: 170, justifyContent: 'end' }}>
                      {item.status === 'yes' && (
                        <Box sx={{ width: 100, height: 25, backgroundColor: '#ECF6EC', color: '#419D3E', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 0.5, fontWeight: 'bold', borderRadius: 2, mr: 2 }}>
                          <Typography sx={{ fontWeight: 'bold' }} >
                            Completed
                          </Typography>
                        </Box>
                      )}
                      <Box sx={{ display: 'flex', width: 40, justifyContent: 'end' }} >
                        <Typography sx={{ ml: 2, color: '#626264' }} variant='h6'>
                          ${item.price}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                )
              })}
            </Box>
          </Paper>
        </Collapse>
        <Typography sx={{ p: 4, }} variant='h4'>
          Total: ${price}
        </Typography>
        <Box sx={{ width: '100%', justifyContent: 'center', display: 'flex', mt: 5, mb: 5 }}>
          <Button onClick={handleChange} variant="contained" color='warning' sx={{ width: 400, borderRadius: 2 }}>
            <Typography >
              Details
            </Typography>
          </Button>
        </Box>
      </Card>
    </>
  );
}