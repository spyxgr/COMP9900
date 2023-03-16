// customer order bar icon
import { Box } from "@mui/system";
import { Button, } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

interface ListProps {
  number?: number;
  shown?: boolean;
  doSomething?: (params: any) => any;
}

export default function OrderIcon({
  number = 1,
  shown = false,
  doSomething,
  ...props
}: ListProps) {

  return (
    <>
      {shown && (
        <Box>
          {(number !== 0 && number) && (
            <Box sx={{
              height: 37,
              width: 37,
              backgroundColor: '#FB6D3A',
              borderRadius: 10,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#ffffff',
              fontSize: 20,
              zIndex: 25,
              position: 'relative',
              marginLeft: 9.5,
            }} >
              {number}
            </Box>
          )}

          {(number === 0 || !number) && (
            <Box sx={{
              height: 37,
              width: 37,
              borderRadius: 10,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#ffffff',
              fontSize: 20,
              zIndex: 25,
              position: 'relative',
              marginLeft: 9.5,
            }} >
            </Box>
          )}

          <Button variant="contained" sx={{
            height: 95, width: 95, backgroundColor: '#503E9D', borderRadius: 3, zIndex: 10, position: 'relative', marginTop: -2.5,
            '&:hover': {
              backgroundColor: '#8475B0',
            }
          }}
            onClick={doSomething}
          >
            <ShoppingCartIcon sx={{ color: '#ffffff', height: 70, width: 70 }} />
          </Button>
        </Box>
      )}

      {!shown && (
        <Box>
          <Box sx={{
            height: 37,
            width: 37,
            borderRadius: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#ffffff',
            fontSize: 20,
            zIndex: 15,
            position: 'relative',
            marginLeft: 9.5,
          }} >
          </Box>
          <Button disabled variant="contained" sx={{
            height: 95, width: 95, backgroundColor: '#503E9D', borderRadius: 3, zIndex: 10, position: 'relative', marginTop: -2.5,
            '&:hover': {
              backgroundColor: '#8475B0',
            }
          }}
          >
            <ShoppingCartIcon sx={{ color: '#ffffff', height: 70, width: 70 }} />
          </Button>
        </Box>
      )}
    </>
  );
}