// nav bar button 
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import WhatshotIcon from '@mui/icons-material/Whatshot';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ChatIcon from '@mui/icons-material/Chat';
import KeyIcon from '@mui/icons-material/Key';
import FastfoodIcon from '@mui/icons-material/Fastfood';


interface ListProps {
  name?: string;
  id?: string;
  selected?: boolean;
  number?: number;
  item?: string;
  doSomething?: (params: any) => any;
}


export default function NavButton({
  name = '',
  number = 0,
  selected = true,
  id = '',
  item = "",
  doSomething,
  ...props
}: ListProps) {
  return (
    <>
      {(item === 'hot' && !selected) && (
        <Box onClick={doSomething} sx={{
          width: 270, height: 60, display: 'flex', flexDirection: 'row', alignItems: 'center', borderRadius: 3
          , '&:hover': {
            backgroundColor: '#F6F9FC',
            cursor: 'pointer'
          }
        }}>
          <WhatshotIcon sx={{ color: '#FB6D3A', height: 40, width: 40, marginLeft: 2 }} />
          <Typography variant="h6" sx={{ color: '#626264', margin: 0.5, marginLeft: 2 }}>
            Hot
          </Typography>
        </Box>
      )}

      {(item === 'hot' && selected) && (
        <Box sx={{
          width: 270, height: 60, display: 'flex', flexDirection: 'row', backgroundColor: '#503E9D', borderRadius: 3, alignItems: 'center',
          '&:hover': {

            cursor: 'pointer'
          },
        }}>
          <WhatshotIcon sx={{ color: '#ffffff', height: 40, width: 40, marginLeft: 2 }} />
          <Typography variant="h6" sx={{ color: '#ffffff', margin: 0.5, marginLeft: 2 }}>
            Hot
          </Typography>
        </Box>
      )}

      {(item === 'category' && !selected) && (
        <Box onClick={doSomething} sx={{
          width: 270, height: 60, display: 'flex', flexDirection: 'row', alignItems: 'center', borderRadius: 3
          , '&:hover': {
            backgroundColor: '#F6F9FC',
            cursor: 'pointer'
          }
        }}>
          <MenuIcon sx={{ color: '#626264', height: 40, width: 40, marginLeft: 2 }} />
          <Typography variant="h6" sx={{ color: '#626264', margin: 0.5, marginLeft: 2 }}>
            {name}
          </Typography>
        </Box>
      )}

      {(item === 'category' && selected) && (
        <Box sx={{
          width: 270, height: 60, display: 'flex', flexDirection: 'row', backgroundColor: '#503E9D', borderRadius: 3, alignItems: 'center',
          '&:hover': {

            cursor: 'pointer'
          },
        }}>
          <MenuOpenIcon sx={{ color: '#ffffff', height: 40, width: 40, marginLeft: 2 }} />
          <Typography variant="h6" sx={{ color: '#ffffff', margin: 0.5, marginLeft: 2 }}>
            {name}
          </Typography>
        </Box>
      )}

      {(item === 'dashboard' && !selected) && (
        <Box onClick={doSomething} sx={{
          width: 270, height: 60, display: 'flex', flexDirection: 'row', alignItems: 'center', borderRadius: 3
          , '&:hover': {
            backgroundColor: '#F6F9FC',
            cursor: 'pointer'
          }
        }}>
          <DashboardIcon sx={{ color: '#626264', height: 40, width: 40, marginLeft: 2 }} />
          <Typography variant="h6" sx={{ color: '#626264', margin: 0.5, marginLeft: 2 }}>
            Dashboard
          </Typography>
        </Box>
      )}

      {(item === 'dashboard' && selected) && (
        <Box sx={{
          width: 270, height: 60, display: 'flex', flexDirection: 'row', backgroundColor: '#503E9D', borderRadius: 3, alignItems: 'center',
          '&:hover': {

            cursor: 'pointer'
          },
        }}>
          <DashboardIcon sx={{ color: '#ffffff', height: 40, width: 40, marginLeft: 2 }} />
          <Typography variant="h6" sx={{ color: '#ffffff', margin: 0.5, marginLeft: 2 }}>
            Dashboard
          </Typography>
        </Box>
      )}

      {(item === 'menu' && !selected) && (
        <Box onClick={doSomething} sx={{
          width: 270, height: 60, display: 'flex', flexDirection: 'row', alignItems: 'center', borderRadius: 3
          , '&:hover': {
            backgroundColor: '#F6F9FC',
            cursor: 'pointer'
          }
        }}>
          <MenuBookIcon sx={{ color: '#626264', height: 40, width: 40, marginLeft: 2 }} />
          <Typography variant="h6" sx={{ color: '#626264', margin: 0.5, marginLeft: 2 }}>
            Menu Items
          </Typography>
        </Box>
      )}

      {(item === 'menu' && selected) && (
        <Box sx={{
          width: 270, height: 60, display: 'flex', flexDirection: 'row', backgroundColor: '#503E9D', borderRadius: 3, alignItems: 'center',
          '&:hover': {

            cursor: 'pointer'
          },
        }}>
          <MenuBookIcon sx={{ color: '#ffffff', height: 40, width: 40, marginLeft: 2 }} />
          <Typography variant="h6" sx={{ color: '#ffffff', margin: 0.5, marginLeft: 2 }}>
            Menu Items
          </Typography>
        </Box>
      )}

      {(item === 'order' && !selected) && (
        <Box onClick={doSomething} sx={{
          width: 270, height: 60, display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', borderRadius: 3
          , '&:hover': {
            backgroundColor: '#F6F9FC',
            cursor: 'pointer'
          }
        }}>
          <Box sx={{ display: 'flex' }}>
            <ListAltIcon sx={{ color: '#626264', height: 40, width: 40, marginLeft: 2 }} />
            <Typography variant="h6" sx={{ color: '#626264', margin: 0.5, marginLeft: 2 }}>
              Orders
            </Typography>
          </Box>

          {number !== 0 && (
            <Box sx={{ height: 30, width: 30, backgroundColor: '#503E9D', display: 'flex', color: '#ffffff', borderRadius: 10, justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginRight: 3 }}>
              {number}
            </Box>
          )}
        </Box>
      )}

      {(item === 'order' && selected) && (
        <Box onClick={doSomething} sx={{
          width: 270, height: 60, display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', borderRadius: 3, backgroundColor: '#503E9D'
          , '&:hover': {
            cursor: 'pointer'
          }
        }}>
          <Box sx={{ display: 'flex' }}>
            <ListAltIcon sx={{ color: '#ffffff', height: 40, width: 40, marginLeft: 2 }} />
            <Typography variant="h6" sx={{ color: '#ffffff', margin: 0.5, marginLeft: 2 }}>
              Orders
            </Typography>
          </Box>
          {number > 0 && (
            <Box sx={{ height: 30, width: 30, backgroundColor: '#ffffff', display: 'flex', color: '#503E9D', borderRadius: 10, justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginRight: 3 }}>
              {number}
            </Box>
          )}
        </Box>
      )}

      {(item === 'service' && !selected) && (
        <Box onClick={doSomething} sx={{
          width: 270, height: 60, display: 'flex', flexDirection: 'row', alignItems: 'center', borderRadius: 3
          , '&:hover': {
            backgroundColor: '#F6F9FC',
            cursor: 'pointer'
          }
        }}>
          <ChatIcon sx={{ color: '#626264', height: 40, width: 40, marginLeft: 2 }} />
          <Typography variant="h6" sx={{ color: '#626264', margin: 0.5, marginLeft: 2 }}>
            Services
          </Typography>
        </Box>
      )}

      {(item === 'service' && selected) && (
        <Box sx={{
          width: 270, height: 60, display: 'flex', flexDirection: 'row', backgroundColor: '#503E9D', borderRadius: 3, alignItems: 'center',
          '&:hover': {

            cursor: 'pointer'
          },
        }}>
          <ChatIcon sx={{ color: '#ffffff', height: 40, width: 40, marginLeft: 2 }} />
          <Typography variant="h6" sx={{ color: '#ffffff', margin: 0.5, marginLeft: 2 }}>
            Services
          </Typography>
        </Box>
      )}

      {(item === 'key' && !selected) && (
        <Box onClick={doSomething} sx={{
          width: 270, height: 60, display: 'flex', flexDirection: 'row', alignItems: 'center', borderRadius: 3
          , '&:hover': {
            backgroundColor: '#F6F9FC',
            cursor: 'pointer'
          }
        }}>
          <KeyIcon sx={{ color: '#626264', height: 40, width: 40, marginLeft: 2 }} />
          <Typography variant="h6" sx={{ color: '#626264', margin: 0.5, marginLeft: 2 }}>
            Key Management
          </Typography>
        </Box>
      )}

      {(item === 'key' && selected) && (
        <Box sx={{
          width: 270, height: 60, display: 'flex', flexDirection: 'row', backgroundColor: '#503E9D', borderRadius: 3, alignItems: 'center',
          '&:hover': {

            cursor: 'pointer'
          },
        }}>
          <KeyIcon sx={{ color: '#ffffff', height: 40, width: 40, marginLeft: 2 }} />
          <Typography variant="h6" sx={{ color: '#ffffff', margin: 0.5, marginLeft: 2 }}>
            Key Management
          </Typography>
        </Box>
      )}

      {(item === 'request' && !selected) && (
        <Box onClick={doSomething} sx={{
          width: 270, height: 60, display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', borderRadius: 3
          , '&:hover': {
            backgroundColor: '#F6F9FC',
            cursor: 'pointer'
          }
        }}>
          <Box sx={{ display: 'flex' }}>
            <ChatIcon sx={{ color: '#626264', height: 40, width: 40, marginLeft: 2 }} />
            <Typography variant="h6" sx={{ color: '#626264', margin: 0.5, marginLeft: 2 }}>
              Requests
            </Typography>
          </Box>
          {number > 0 && (
            <Box sx={{ height: 30, width: 30, backgroundColor: '#503E9D', display: 'flex', color: '#ffffff', borderRadius: 10, justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginRight: 3 }}>
              {number}
            </Box>
          )}
        </Box>
      )}

      {(item === 'request' && selected) && (
        <Box onClick={doSomething} sx={{
          width: 270, height: 60, display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', borderRadius: 3, backgroundColor: '#503E9D'
          , '&:hover': {
            cursor: 'pointer'
          }
        }}>
          <Box sx={{ display: 'flex' }}>
            <ChatIcon sx={{ color: '#ffffff', height: 40, width: 40, marginLeft: 2 }} />
            <Typography variant="h6" sx={{ color: '#ffffff', margin: 0.5, marginLeft: 2 }}>
              Requests
            </Typography>
          </Box>
          {number > 0 && (
            <Box sx={{ height: 30, width: 30, backgroundColor: '#ffffff', display: 'flex', color: '#503E9D', borderRadius: 10, justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginRight: 3 }}>
              {number}
            </Box>
          )}
        </Box>
      )}

      {(item === 'item' && !selected) && (
        <Box onClick={doSomething} sx={{
          width: 270, height: 60, display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', borderRadius: 3
          , '&:hover': {
            backgroundColor: '#F6F9FC',
            cursor: 'pointer'
          }
        }}>
          <Box sx={{ display: 'flex' }}>
            <FastfoodIcon sx={{ color: '#626264', height: 40, width: 40, marginLeft: 2 }} />
            <Typography variant="h6" sx={{ color: '#626264', margin: 0.5, marginLeft: 2 }}>
              Items
            </Typography>
          </Box>
          {number > 0 && (
            <Box sx={{ height: 30, width: 30, backgroundColor: '#503E9D', display: 'flex', color: '#ffffff', borderRadius: 10, justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginRight: 3 }}>
              {number}
            </Box>
          )}
        </Box>
      )}

      {(item === 'item' && selected) && (
        <Box onClick={doSomething} sx={{
          width: 270, height: 60, display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', borderRadius: 3, backgroundColor: '#503E9D'
          , '&:hover': {
            cursor: 'pointer'
          }
        }}>
          <Box sx={{ display: 'flex' }}>
            <FastfoodIcon sx={{ color: '#ffffff', height: 40, width: 40, marginLeft: 2 }} />
            <Typography variant="h6" sx={{ color: '#ffffff', margin: 0.5, marginLeft: 2 }}>
              Items
            </Typography>
          </Box>
          {number > 0 && (
            <Box sx={{ height: 30, width: 30, backgroundColor: '#ffffff', display: 'flex', color: '#503E9D', borderRadius: 10, justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginRight: 3 }}>
              {number}
            </Box>
          )}
        </Box>
      )}
    </>
  );
}