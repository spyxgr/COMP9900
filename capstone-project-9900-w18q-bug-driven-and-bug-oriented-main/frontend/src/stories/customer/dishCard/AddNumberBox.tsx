// customer add number button
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { Typography } from "@mui/material";


interface ListProps {
  doSomething?: (params: any) => any;
  initialNum?: number;
  passNum?: (params: any) => any;
}

export default function AddNumberBox({
  initialNum = 0,
  passNum = () => { },
  ...props
}: ListProps) {

  const [dishTryNum, setDishTryNum] = React.useState(initialNum);
  const addTryDish = () => { passNum(dishTryNum + 1); setDishTryNum(dishTryNum + 1); };
  const delTryDish = () => { if (dishTryNum >= 1) { passNum(dishTryNum - 1); setDishTryNum(dishTryNum - 1); } };

  // init input number
  useEffect(() => {
    passNum(dishTryNum);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F7F7F7', fontWeight: 'bold', borderRadius: 3 }}>
        <Box
          onClick={delTryDish}
          sx={{ m: 1, fontSize: 22, ":hover": { cursor: 'pointer' } }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>
            -
          </Typography>
        </Box>
        <Box
          sx={{ m: 1, fontSize: 16 }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>
            {dishTryNum}
          </Typography>
        </Box>
        <Box
          onClick={addTryDish}
          sx={{ m: 1, fontSize: 22, ":hover": { cursor: 'pointer' } }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>
            +
          </Typography>
        </Box>
      </Box>
    </>
  );
}