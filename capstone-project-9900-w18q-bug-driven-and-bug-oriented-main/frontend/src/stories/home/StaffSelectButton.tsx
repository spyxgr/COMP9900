// staff select role button
import { Button, Typography } from "@mui/material";


interface ListProps {
  role?: string;
  selected?: boolean;
  doSomething?: (params: any) => any;
}


export default function StaffSelectButton({
  role = '',
  selected = false,
  doSomething,
  ...props
}: ListProps) {

  return (
    <>
      {!selected && (
        <Button disableRipple onClick={doSomething} sx={{ backgroundColor: '#EEECF6', fontWeight: 'bold', color: '#503E9D', borderRadius: 2, width: 320, border: 4, borderColor: '#EEECF6' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {role}
          </Typography>
        </Button>
      )}
      {selected && (
        <Button disableRipple onClick={doSomething} sx={{ backgroundColor: '#EEECF6', fontWeight: 'bold', color: '#503E9D', borderRadius: 2, width: 320, border: 4, borderColor: '#503E9D' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {role}
          </Typography>
        </Button>
      )}
    </>
  );
}