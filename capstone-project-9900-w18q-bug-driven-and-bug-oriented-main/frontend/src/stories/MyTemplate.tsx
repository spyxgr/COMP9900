import { Box } from "@mui/system";
import { Button } from "@mui/material";


interface ListProps {
  props1?: string;
  props2?: string;
  props3?: boolean;
  doSomething?: (params: any) => any;
}


export default function MyTemplate({
  props1 = '',
  props2 = '',
  props3 = true,
  doSomething,
  ...props
}: ListProps) {
  return (
    <>
      <Box>{props1}</Box>
      <Button>{props2}</Button>
      <div>{props3}</div>
    </>
  );
}