// manager service check card
import { Box } from "@mui/system";
import React from "react";
import { Card, createTheme, LinearProgress, ThemeProvider, Typography } from "@mui/material";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


interface ListProps {
  table?: number;
  startTime?: string;
  requestId?: string
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#FB6D3A',
      contrastText: '#fff',
    },
  },
});


// what time the loading bar fill
const waitTimeLimit = 2;

// update interval
const updateInt = 3;

const strToDate = (s: string) => {
  return new Date(parseInt(s.substring(0, 4)), parseInt(s.substring(5, 7)) - 1, parseInt(s.substring(8, 10)), parseInt(s.substring(11, 13)),
    parseInt(s.substring(14, 16)), parseInt(s.substring(17, 19)));
}

export default function ShowService({
  table = 5,
  startTime = '',
  requestId = '222',
  ...props
}: ListProps) {

  // count the time part
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

  // init polling
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

  // format date
  const arr_start = startTime.split('-');
  const startYMD = arr_start[2] + '/' + arr_start[1] + '/' + arr_start[0];
  const startHMS = arr_start[3];

  return (
    <>
      <Card sx={{ minHeight: 275, width: 450, backgroundColor: '#F7F7F7', borderRadius: 5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography sx={{ m: 2, ml: 4, fontWeight: 'bold' }} variant='h6'>
            Table {table}
          </Typography>
          <Box display='flex' sx={{ color: '#626264', m: 2.5, mr: 4, }}>
            <Typography sx={{}} >
              #{requestId}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', mb: 5, mt: 2 }}>
          <Typography sx={{ ml: 4, color: '#626264' }} variant='subtitle1'>
            <CalendarTodayIcon sx={{ mr: 0.5, mb: -0.5 }} />{startYMD}
          </Typography>
          <Typography sx={{ ml: 5, color: '#626264' }} variant='subtitle1'>
            <AccessTimeIcon sx={{ mr: 0.5, mb: -0.7 }} />{startHMS}
          </Typography>
        </Box>
        <Box display='flex' justifyContent='space-between' sx={{ alignContent: 'center', mt: -1 }}>
          <Box display='flex'>
            <Box sx={{ ml: 4 }} >
              <Typography variant="h6" >
                Waiting time
              </Typography>
              <Typography variant="h5" fontWeight='bold'>
                {waitTime} min
              </Typography>
            </Box>
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
      </Card>
    </>
  );
}