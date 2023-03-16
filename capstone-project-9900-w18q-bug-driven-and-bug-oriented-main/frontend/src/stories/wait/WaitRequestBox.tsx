// wait staff check request card
import { Box } from "@mui/system";
import React from "react";
import { Button, Card, IconButton, Modal, Typography } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


interface ListProps {
  table?: string
  requestId?: string
  startTime?: string
  nowTime?: string
  doSomething: (params: any) => any;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#FB6D3A',
      contrastText: '#fff',
    },
  },
});

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

// what time the loading bar fill
const waitTimeLimit = 2;

// update interval
const updateInt = 3;

// format time
const dateToStr = (d: Date) => {
  let year = d.getFullYear().toString();
  let mon = (d.getMonth() + 1).toString();
  if (mon.length === 1) { mon = '0' + mon; }
  let day = d.getDate().toString();
  if (day.length === 1) { day = '0' + day; }
  let hr = d.getHours().toString();
  if (hr.length === 1) { hr = '0' + hr; }
  let min = d.getMinutes().toString();
  if (min.length === 1) { min = '0' + min; }
  let sec = d.getSeconds().toString();
  if (sec.length === 1) { sec = '0' + sec; }
  return year + '-'
    + mon + '-'
    + day + '-'
    + hr + ':'
    + min + ':'
    + sec;
}

// address date
const strToDate = (s: string) => {
  return new Date(parseInt(s.substring(0, 4)), parseInt(s.substring(5, 7)) - 1, parseInt(s.substring(8, 10)), parseInt(s.substring(11, 13)),
    parseInt(s.substring(14, 16)), parseInt(s.substring(17, 19)));
}


export default function WaitRequestBox({
  table = '10',
  requestId = '654321',
  startTime = dateToStr(new Date()),
  nowTime = dateToStr(new Date()),
  doSomething,
  ...props
}: ListProps) {

  // pop up window display
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleComfirm = (e: any) => {
    setOpen(false);
    doSomething(e);
  };

  // count time part
  const countProgress = () => {
    let diff = (new Date()).getTime() - strToDate(startTime).getTime();
    return Math.min(diff / (1000 * 60 * waitTimeLimit) * 100, 100);
  };

  const countTime = () => {
    let diff = (new Date()).getTime() - strToDate(startTime).getTime();
    return Math.trunc(diff / (1000 * 60));
  };

  const [progress, setProgress] = React.useState(countProgress());
  const [waitTime, setWaitTime] = React.useState(countTime());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress(countProgress());
      setWaitTime(countTime());
    }, updateInt);
    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ backgroundColor: '#F7F7F7', width: 450, height: 170, borderRadius: 5 }}>
      <Box display='flex' justifyContent='space-between' sx={{ alignContent: 'center', m: 1, p: 2 }}>
        <Box display='flex' fontWeight={'bold'} >
          <Typography fontSize={20} sx={{ fontWeight: 'bold' }}>
            Table {table}
          </Typography>
        </Box>
        <Box display='flex' sx={{ color: '#626264' }}>
          <Typography sx={{}}>
            #{requestId}
          </Typography>
        </Box>
      </Box>

      <Box display='flex' justifyContent='space-between' sx={{ alignContent: 'center', mt: -1 }}>
        <Box display='flex'>
          <Box display='flex' sx={{ alignContent: 'center', m: 1, p: 1 }}>
            <AccessTimeIcon color="disabled" fontSize="large" />
          </Box>
          <Box >
            <Typography variant="h6" >
              Waiting time
            </Typography>
            <Typography variant="h5" fontWeight='bold'>
              {waitTime} min
            </Typography>
          </Box>
        </Box>

        <Box display='flex' sx={{ alignContent: 'center', m: 1, p: 1 }}>
          <Button variant="contained" onClick={handleOpen} sx={{
            height: 40, width: 130, backgroundColor: '#503E9D', borderRadius: 3,
            '&:hover': {
              backgroundColor: '#8475B0',
            }
          }}>
            <Typography variant="h6" >
              Finish
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

              <Box sx={{ justifyContent: 'center', alignContent: 'middle', display: 'flex', mt: 3, flexDirection: 'column' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}  >
                  Request confirm
                </Typography>
                <Typography sx={{ textAlign: 'center' }} >
                  Have you finished customer's request?
                </Typography>
                <Typography sx={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }} >
                  Table {table}
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
        </Box>
      </Box>

      <ThemeProvider theme={theme}>
        {progress !== 100 && (
          <Box sx={{ width: '90%', px: 3, py: 2 }}>
            <LinearProgress variant="determinate" value={progress} />
          </Box>)}
        {progress === 100 && (
          <Box sx={{ width: '90%', px: 3, py: 2 }}>
            <LinearProgress variant="determinate" color='error' value={progress} />
          </Box>)}
      </ThemeProvider>
    </Box>
  );
}