// login button
import { Button, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


interface ListProps {
  confirm?: boolean;
  isStaff?: boolean;
  doSomething?: (params: any) => any;
}


export default function OrderNowButton({
  confirm = true,
  isStaff = true,
  doSomething,
  ...props
}: ListProps) {

  return (
    <>
      {isStaff && (
        <Button onClick={doSomething} color='warning' sx={{ width: '100%', height: 60, borderRadius: 2, fontWeight: 'bold' }}>
          <Typography sx={{ fontWeight: 'bold' }}>
            I'm Staff
          </Typography>
        </Button>
      )}
      {(!confirm && !isStaff) && (
        <Button disabled sx={{ width: '100%', background: '#EEECF6', color: '#503E9D', fontWeight: 'bold', height: 60, borderRadius: 2 }}>
          <Typography sx={{ fontWeight: 'bold' }}>
            Order now
          </Typography>
          <ArrowForwardIcon />
        </Button>
      )}
      {(confirm && !isStaff) && (
        <Button onClick={doSomething} variant="contained" sx={{
          width: '100%', '&:hover': {
            backgroundColor: '#8475B0',
          }, backgroundColor: '#503E9D', fontWeight: 'bold', height: 60, borderRadius: 2
        }}>
          <Typography sx={{ fontWeight: 'bold' }}>
            Order now
          </Typography>
          <ArrowForwardIcon />
        </Button>
      )}
    </>
  );
}