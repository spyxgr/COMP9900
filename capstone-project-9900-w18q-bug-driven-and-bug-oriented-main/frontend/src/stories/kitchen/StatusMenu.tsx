// switch status button
import React, { useState } from "react";
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import BoltIcon from '@mui/icons-material/Bolt';
import Typography from "@mui/material/Typography";


interface ListProps {
  doSomething: (params: any) => any;
}

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));


export default function StatusMenu({
  doSomething,
}: ListProps) {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [method, setMethed] = useState('All Status');

  // select change function
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e: string) => {
    setAnchorEl(null);
    setMethed(e);
    doSomething(e);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        startIcon={<BoltIcon
          sx={{
            height: 60,
            width: 30,
          }}
        />
        }
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          height: 60,
          width: 200,
          backgroundColor: '#503E9D',
          borderRadius: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          verticalAlign: 'center',
          '&:hover': {
            backgroundColor: '#6A5BAB',
          },
        }}
      >
        <Typography variant="subtitle1" marginLeft={-0.9}>
          {method}
        </Typography>
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(method)}
      >
        <MenuItem onClick={() => handleClose('All Status')} disableRipple>
          <Typography variant="h6">
            All Status
          </Typography>
        </MenuItem>

        <MenuItem onClick={() => handleClose('Wait')} disableRipple>
          <Typography variant="h6">
            Wait
          </Typography>
        </MenuItem>

        <MenuItem onClick={() => handleClose('Processing')} disableRipple>
          <Typography variant="h6">
            Processing
          </Typography>
        </MenuItem>

        <MenuItem onClick={() => handleClose('Completed')} disableRipple>
          <Typography variant="h6">
            Completed
          </Typography>
        </MenuItem>
      </StyledMenu>
    </div>
  );
}