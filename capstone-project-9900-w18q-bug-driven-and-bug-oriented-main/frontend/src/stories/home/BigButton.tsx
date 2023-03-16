// home login button
import { Button, Typography } from "@mui/material";


interface ListProps {
  name?: string;
  confirm?: boolean;
  doSomething?: (params: any) => any;
}


export default function BigButton({
  name = '',
  confirm = true,
  doSomething,
  ...props
}: ListProps) {

  return (
    <>
      {!confirm && (
        <Button disabled sx={{ width: '100%', background: '#EEECF6', color: '#503E9D', fontWeight: 'bold', height: 60, borderRadius: 2 }}>
          <Typography sx={{ fontWeight: 'bold' }}>
            {name}
          </Typography>
        </Button>
      )}
      {confirm && (
        <Button onClick={doSomething} variant="contained" sx={{
          width: '100%', '&:hover': {
            backgroundColor: '#8475B0',
          }, backgroundColor: '#503E9D', fontWeight: 'bold', height: 60, borderRadius: 2
        }}>
          <Typography variant="subtitle1" sx={{}}>
            {name}
          </Typography>
        </Button>
      )}
    </>
  );
}