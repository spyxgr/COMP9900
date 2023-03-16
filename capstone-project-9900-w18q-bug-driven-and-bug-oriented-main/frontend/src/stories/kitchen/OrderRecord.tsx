// kitchen order list
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';



interface ListProps {
  orderTime?: string;
  table?: Number;
  status?: string;
  waitCount?: Number;
  doSomething?: (params: any) => any;
}


export default function OrderRecord({
  table = 1,
  orderTime = ' ',
  status = ' ',
  waitCount = 0,
  doSomething,
  ...props
}: ListProps) {
  const [color, setColor] = useState("#FF6D4D");
  const [backgroundColor, setBackgroundColor] = useState("#FFF1EE");

  // switch button's color
  const statusColor = (s: string) => {
    if (s === "Wait") {
      setColor("#FF6D4D")
      setBackgroundColor("#FFF1EE")
    }
    if (s === "Processing") {
      setColor("#2F4CDD")
      setBackgroundColor("#F7F8FE")
    }
    if (s === "Completed") {
      setColor("#2BC155")
      setBackgroundColor("#F4FCF6")
    }
  };

  // init
  useEffect(() => {
    statusColor(status);
  }, [status]);

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={1} >
          <Grid item xs={3}>
            <Typography sx={{ ml: 2 }} variant="subtitle1">{table.toString()}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ ml: 1.7 }} variant="subtitle1">{orderTime.split(' ')[4]}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ ml: 11 }} variant="subtitle1">{waitCount.toString()}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ height: 25, display: 'inline-block', zoom: 1, justifyContent: 'center', alignItems: 'center', py: 0.5, px: 1, borderRadius: 2, ml: 0.5, marginTop: -1, color: { color }, backgroundColor: { backgroundColor }, }}>
              <Typography sx={{}}>
                {status}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={doSomething} sx={{ marginTop: -0.3, }}><NavigateNextIcon /></IconButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}