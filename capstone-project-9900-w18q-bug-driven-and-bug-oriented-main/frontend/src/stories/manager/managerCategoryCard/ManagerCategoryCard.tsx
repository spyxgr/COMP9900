// category list card
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


interface ListProps {
  categoryId?: number;
  categoryName?: string;
  lastModified?: string;
  canMove?: boolean;
  selected?: boolean;
  preFunc?: (params: any) => any;
  nextFunc?: (params: any) => any;
  fatherListener?: (params: any) => any;
}


export default function ManagerCategoryCard({
  categoryId = 0,
  categoryName = '',
  lastModified = '',
  canMove = false,
  selected = false,
  preFunc = () => { },
  nextFunc = () => { },
  fatherListener = () => { },
  ...props
}: ListProps) {

  const [move, setMove] = useState(false);

  useEffect(() => {
    setMove(canMove);
  }, [canMove])

  return (
    <>
      {!move && (
        <Paper elevation={0} sx={{
          width: '100%', height: 182, display: 'flex', bgcolor: '#F7F7F7', borderRadius: 5, flexDirection: 'column',
        }}>
          <Typography sx={{ ml: 5, mt: 5, fontWeight: 'bold' }} variant="h5">
            {categoryName}
          </Typography>
          <Box sx={{ m: 4, mt: 6, flexDirection: 'row', display: 'flex' }}>
            <Box sx={{ bgcolor: '#f8eae5', height: 25, width: 180, color: '#FB6D3A', borderRadius: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography sx={{ fontWeight: 'bold' }} variant="subtitle2">
                Last modified:
              </Typography>
            </Box>
            <Typography sx={{ ml: 5, mt: 0.2, fontWeight: 'bold', color: '#626264' }} variant="subtitle2">
              {lastModified}
            </Typography>
          </Box>
        </Paper>
      )}
      {move && (
        <Box sx={{ width: '100%', height: 182, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <ExpandLessIcon sx={{ color: '#503E9D' }} />
          <Paper elevation={0} sx={{
            width: '100%', height: 140, display: 'flex', bgcolor: '#F7F7F7', borderRadius: 5, flexDirection: 'column', '&:hover': {
              cursor: 'pointer'
            }, alignContent: 'space-between', border: selected ? '2px solid #503E9D' : '2px solid #ffffff'
          }}>
            <Typography sx={{ ml: 5, mt: 2, fontWeight: 'bold' }} variant="h5">
              {categoryName}
            </Typography>
            <Box sx={{ m: 4, mt: 6, flexDirection: 'row', display: 'flex' }}>
              <Box sx={{ bgcolor: '#f8eae5', height: 25, width: 180, color: '#FB6D3A', borderRadius: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 'bold' }} variant="subtitle2">
                  Last modified:
                </Typography>
              </Box>
              <Typography sx={{ ml: 5, mt: 0.2, fontWeight: 'bold', color: '#626264' }} variant="subtitle2">
                {lastModified}
              </Typography>
            </Box>
          </Paper>
          <ExpandMoreIcon sx={{ color: '#503E9D' }} />
        </Box>
      )}
    </>
  );
}