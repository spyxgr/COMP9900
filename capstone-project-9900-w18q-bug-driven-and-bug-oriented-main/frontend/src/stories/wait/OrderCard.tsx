// wait staff check card
import { Box } from "@mui/system";
import React from "react";
import { Button, Card, Collapse, IconButton, Modal, Paper, Typography } from "@mui/material";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ClearIcon from '@mui/icons-material/Clear';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


interface ListProps {
  orderId?: number;
  table?: number;
  time?: string;
  isRequest?: number;
  price?: number;
  itemList?: {
    dishName: string,
    price: number,
    status: string,
  }[];
  confirmFunc: (params: any) => any;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 280,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  pt: 2,
};


export default function OrderCard({
  orderId = 123,
  table = 5,
  time = '',
  isRequest = 1,
  price = 0,
  itemList = [],
  confirmFunc,
  ...props
}: ListProps) {

  const [checked, setChecked] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  // display pop up window
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleComfirm = (e: any) => {
    setOpen(false);
    confirmFunc(e);
  };

  // format the date
  const arr = time.split('-');
  const day = arr[2] + '/' + arr[1] + '/' + arr[0];
  const t = arr[3];


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
                      {item.status === 'Completed' && (
                        <Box sx={{ width: 100, height: 25, backgroundColor: '#ECF6EC', color: '#419D3E', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 0.5, fontWeight: 'bold', borderRadius: 2, mr: 2 }}>
                          <Typography sx={{ fontWeight: 'bold' }}>
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
          {isRequest === 1 && (
            <>
              <Button onClick={handleOpen} variant="contained" color='warning' sx={{ width: 190, borderRadius: 2, mr: 3 }}>
                <Typography sx={{}}>
                Receive Payment
                </Typography>

              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >

                <Card sx={style}>
                  <Box sx={{ display: 'flex', justifyContent: 'right', marginRight: -2 }}>
                    <IconButton onClick={handleClose} color="primary" sx={{ color: '#A3A3A4' }} aria-label="upload picture" component="label">
                      <ClearIcon />
                    </IconButton>
                  </Box>

                  <Box sx={{ justifyContent: 'center', display: 'flex', mt: 3 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }} >
                      Confirm to Receipt?
                    </Typography>

                  </Box>
                  <Box sx={{ justifyContent: 'center', display: 'flex', mt: 3 }}>
                    <Typography sx={{ color: '#626264' }} variant='subtitle2'>
                      Have you received the payment?
                    </Typography>
                  </Box>
                  <Box sx={{ justifyContent: 'center', display: 'flex', }}>
                    <Typography sx={{ color: '#626264' }} variant='h6'>
                      Table {table},   Total: ${price}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Button onClick={handleComfirm} sx={{
                      width: 150, '&:hover': {
                        backgroundColor: '#8475B0',
                      }, backgroundColor: '#503E9D', fontWeight: 'bold', height: 55, borderRadius: 3, mr: 5
                    }}>
                      <Typography variant="h6" sx={{ color: '#ffffff' }} >
                        Confirm
                      </Typography>
                    </Button>
                    <Button onClick={handleClose} sx={{
                      width: 150, '&:hover': {
                        backgroundColor: '#F1F1F1',
                      }, backgroundColor: '#F7F7F7', fontWeight: 'bold', height: 55, borderRadius: 3,
                    }}>
                      <Typography variant="h6" sx={{ color: '#000000', }} >
                        Cancel
                      </Typography>
                    </Button>
                  </Box>
                </Card>
              </Modal>
            </>
          )}
          {isRequest === 0 && (
            <Button variant="contained" color='warning' disabled sx={{ width: 190, borderRadius: 2, mr: 3 }}>
              <Typography sx={{}}>
                Pay
              </Typography>
            </Button>
          )}
          <Button onClick={handleChange} variant="contained" color='warning' sx={{ width: 190, borderRadius: 2 }}>
            <Typography sx={{}}>
              Details
            </Typography>
          </Button>
        </Box>
      </Card>
    </>
  );
}