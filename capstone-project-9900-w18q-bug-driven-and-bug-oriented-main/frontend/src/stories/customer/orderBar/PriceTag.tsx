// customer order bar price tag
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

interface ListProps {
  price?: number;
  doSomething?: (params: any) => any;
}

export default function PriceTag({
  price = 0,
  doSomething,
  ...props
}: ListProps) {
  return (

    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Typography variant="h4" sx={{ marginTop: 2.5 }} >
        $
      </Typography>
      <Typography variant="h2"  >
        {price}
      </Typography>
    </Box>
  );
}