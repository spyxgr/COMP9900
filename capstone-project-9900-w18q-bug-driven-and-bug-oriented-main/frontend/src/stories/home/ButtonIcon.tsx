// home page icon
import { Box } from "@mui/system";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import KeyIcon from '@mui/icons-material/Key';

interface ListProps {
  name?: string;
}


export default function ButtonIcon({
  name = '',
  ...props
}: ListProps) {

  return (
    <>
      {name === 'table' && (
        <Box sx={{ display: 'flex', backgroundColor: '#EEECF6', fontWeight: 'bold', color: '#503E9D', width: 60, height: 60, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
          <RestaurantIcon sx={{ width: 30, height: 30 }} />
        </Box>
      )}
      {name === 'diner' && (
        <Box sx={{ display: 'flex', backgroundColor: '#EEECF6', fontWeight: 'bold', color: '#503E9D', width: 60, height: 60, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
          <PermIdentityIcon sx={{ width: 35, height: 35 }} />
        </Box>
      )}
      {name === 'key' && (
        <Box sx={{ display: 'flex', backgroundColor: '#EEECF6', fontWeight: 'bold', color: '#503E9D', width: 60, height: 60, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
          <KeyIcon sx={{ width: 35, height: 35 }} />
        </Box>
      )}
    </>
  );
}