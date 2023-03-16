// kitchen item list
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


interface ListProps {
  itemCategory?: string;
  itemName?: string;
  status?: string;
  itemIndex?: number;
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
    minWidth: 165,
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


export default function ItemRecord({
  itemCategory = ' ',
  itemName = ' ',
  status = ' ',
  itemIndex = 0,
  doSomething,
  ...props
}: ListProps) {

  const [color, setColor] = useState("#FF6D4D");
  const [backgroundColor, setBackgroundColor] = useState("#FFF1EE");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [method, setMethed] = useState(status);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // switch status function
  const handleClose = (e: string) => {
    setAnchorEl(null);
    setMethed(e);
    if (e === "Wait") {
      setColor("#FF6D4D")
      setBackgroundColor("#FFF1EE")
      doSomething({
        itemIndex: itemIndex,
        status: e,
      })
    }

    if (e === "Processing") {
      setColor("#2F4CDD")
      setBackgroundColor("#F7F8FE")
      doSomething({
        itemIndex: itemIndex,
        status: e,
      })
    }

    if (e === "Prepared") {
      setColor("#2BC155")
      setBackgroundColor("#F4FCF6")
      doSomething({
        itemIndex: itemIndex,
        status: e,
      })
    }
  };

  // status button's color
  const statusColor = (s: string) => {
    if (s === "Wait") {
      setColor("#FF6D4D")
      setBackgroundColor("#FFF1EE")
    }
    if (s === "Processing") {
      setColor("#2F4CDD")
      setBackgroundColor("#F7F8FE")
    }
    if (s === "Prepared") {
      setColor("#2BC155")
      setBackgroundColor("#F4FCF6")
    }
  };

  // init
  useEffect(() => {
    statusColor(status);
  }, [status]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={5}>
            <Box sx={{ marginTop: 1, }}>
              <Typography sx={{}}>
                {itemName}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box sx={{ marginTop: 1, }}>
              <Typography sx={{}}>
                {itemCategory}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <div>
              <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon sx={{ color: { color }, }} />}
                sx={{
                  height: 40,
                  width: 150,
                  backgroundColor: { backgroundColor },
                  borderRadius: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  verticalAlign: 'center',
                  '&:hover': {
                    backgroundColor: { backgroundColor },
                  },
                }}
              >
                <Typography variant="subtitle1" marginLeft={1.5} sx={{ color: { color }, }}>
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
                <MenuItem onClick={() => handleClose('Wait')} disableRipple sx={{
                  color: "#FF6D4D", display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  verticalAlign: 'center',
                }}>
                  <Typography variant="subtitle1">
                    Wait
                  </Typography>
                </MenuItem>
                <MenuItem onClick={() => handleClose('Processing')} disableRipple sx={{
                  color: "#2F4CDD", display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  verticalAlign: 'center',
                }}>
                  <Typography variant="subtitle1">
                    Processing
                  </Typography>
                </MenuItem>
                <MenuItem onClick={() => handleClose('Prepared')} disableRipple sx={{
                  color: "#2BC155", display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  verticalAlign: 'center',
                }}>
                  <Typography variant="subtitle1">
                    Prepared
                  </Typography>
                </MenuItem>
              </StyledMenu>
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}