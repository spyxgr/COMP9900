// switch page button's commponent
import { Button, Typography } from "@mui/material";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';


interface ListProps {
  type?: string;
  doSomething?: (params: any) => any;
}


export default function PreNextButton({
  type = '1',
  doSomething,
  ...props
}: ListProps) {

  return (
    <>
      {type === '0' && (
        <Button variant="contained"
          sx={{
            height: 55,
            width: 115,
            backgroundColor: '#503E9D',
            '&:hover': {
              backgroundColor: '#6A5BAB',
            },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2
          }}
          endIcon={<KeyboardDoubleArrowRightIcon />}
          onClick={doSomething}
        >
          <Typography variant="subtitle1">
            Next
          </Typography>
        </Button>
      )}
      
      {type === '1' && (
        <Button variant="contained"
          sx={{
            height: 55,
            width: 135,
            backgroundColor: '#EEECF6',
            color:"#503E9D",
            '&:hover': {
              backgroundColor: '#F6F4FA',
            },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2
          }}
          startIcon={<KeyboardDoubleArrowLeftIcon />}
          onClick={doSomething}
        >
          <Typography variant="subtitle1">
            Previous
          </Typography>
        </Button>
      )}
    </>
  );
}