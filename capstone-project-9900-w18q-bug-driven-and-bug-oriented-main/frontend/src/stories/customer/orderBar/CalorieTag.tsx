// display calorie tag
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

interface ListProps {
  ceiling?: number;
  count?: number;
  doSomething?: (params: any) => any;
}

export default function CalorieTag({
  ceiling = 0,
  count = 0,
  doSomething,
  ...props
}: ListProps) {
  
  return (
    <>
      {Number(count) < Number(ceiling) && (
        <Box sx={{ backgroundColor: '#FFF1EC', color: '#FB6D3A', height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', width: 'fit-content', borderRadius: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', marginLeft: 1.5, marginRight: 1.5 }} >
            Calorie Deficit:&nbsp;{Number(ceiling) - Number(count)}Cal
          </Typography>
        </Box>
      )}
      {Number(count) >= Number(ceiling) && (
        <Box sx={{ backgroundColor: '#FFF1EC', color: '#FB6D3A', height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', width: 'fit-content', borderRadius: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', marginLeft: 1.5, marginRight: 1.5 }} >
            Calorie Enough
          </Typography>
        </Box>
      )}
    </>
  );
}