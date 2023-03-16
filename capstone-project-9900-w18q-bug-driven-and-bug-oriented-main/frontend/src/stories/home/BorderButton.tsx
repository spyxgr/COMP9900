// select table and diner button
import { Button, Typography } from "@mui/material";

interface ListProps {
  number?: string;
  selected?: boolean;
  doSomething?: (params: any) => any;
}

export default function BorderButton({
  number = '1',
  selected = false,
  doSomething,
  ...props
}: ListProps) {

  return (
    <>
      {!selected && (
        <Button disableRipple onClick={doSomething} sx={{ backgroundColor: '#F5F5F5', fontWeight: 'bold', color: '#000000', borderRadius: 2, width: 40, border: 4, borderColor: '#F5F5F5' }}>
          <Typography sx={{ fontWeight: 'bold' }}>
            {number}
          </Typography>
        </Button>
      )}
      {selected && (
        <Button disableRipple onClick={doSomething} sx={{ backgroundColor: '#F5F5F5', fontWeight: 'bold', color: '#000000', borderRadius: 2, width: 40, border: 4, borderColor: '#503E9D' }}>
          <Typography sx={{ fontWeight: 'bold' }}>
            {number}
          </Typography>
        </Button>
      )}
    </>
  );
}