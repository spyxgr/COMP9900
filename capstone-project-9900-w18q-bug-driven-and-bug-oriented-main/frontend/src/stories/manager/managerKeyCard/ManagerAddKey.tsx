// add key button
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Alert, Button, Card, FormControl, IconButton, Input, Modal, Snackbar, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


interface ListProps {
  addFunc?: (params: any) => any;
}

const ariaLabel = { 'aria-label': 'description' };

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 600,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  pt: 2,
};

const roleList = [{ name: 'Manager', role: 'manager' }, { name: 'Wait staff', role: 'wait' }, { name: 'Kitchen staff', role: 'kitchen' }]


export default function ManagerAddKey({
  addFunc = () => { },
  ...props
}: ListProps) {

  const [open, setOpen] = React.useState(false);
  const [openNoticeWin, setOpenNoticeWin] = React.useState(false);

  // display pop up window
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setRoleName('');
    setStaffName('');
    setKey('');
    setHaveRoleName(true);
    setHaveStaffName(true);
    setHaveKey(true);
  }

  const [roleName, setRoleName] = React.useState('');
  const handleRoleNameSelectChange = (event: SelectChangeEvent) => {
    setRoleName(event.target.value);
  };

  const [staffName, setStaffName] = React.useState('');
  const handleStaffNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStaffName(event.target.value);
  };

  const [key, setKey] = React.useState('');
  const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
  };

  const [haveRoleName, setHaveRoleName] = useState(true);
  const [haveStaffName, setHaveStaffName] = useState(true);
  const [haveKey, setHaveKey] = useState(true);

  // check data and submit
  const subF = (e: any) => {
    if (roleName === '') setHaveRoleName(false)
    else setHaveRoleName(true);

    if (staffName === '') setHaveStaffName(false)
    else setHaveStaffName(true);

    if (key === '') setHaveKey(false)
    else setHaveKey(true);

    if (roleName === '' || staffName === '' || key === '') return;

    const obj = {
      role: roleName,
      name: staffName,
      key: key,
    };
    addFunc(obj)
      .then((res: any) => {
        if (res === 'success') {
          handleClose();
        } else {
          setOpenNoticeWin(true);
          setHaveKey(false);
        }
      });
  }

  const handleCloseNoticeWin = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenNoticeWin(false);
  };

  return (
    <>
      <Snackbar open={openNoticeWin}
        autoHideDuration={5000}
        onClose={handleCloseNoticeWin}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNoticeWin} severity="info" sx={{ width: '100%' }}>
          Duplicate key, please try again.
        </Alert>
      </Snackbar>
      <Button onClick={handleOpen} variant="contained" sx={{
        height: 40, width: 130, backgroundColor: '#503E9D', borderRadius: 3, '&:hover': {
          backgroundColor: '#8475B0',
        }
      }}>
        <Box sx={{ display: 'flex', ml: -2 }}>
          <AddIcon sx={{ color: '#ffffff' }} />
          <Typography variant="inherit" sx={{ color: '#ffffff', marginLeft: 1, fontSize: 16 }}>
            Add
          </Typography>
        </Box>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          <Box sx={{ display: 'flex', justifyContent: 'right', marginRight: -2 }}>
            <IconButton onClick={handleClose} color="primary" sx={{ color: '#A3A3A4' }} aria-label="upload picture" component="label">
              <ClearIcon />
            </IconButton>
          </Box>

          <Box sx={{ justifyContent: 'center', display: 'flex', mt: 5, ml: 4, flexDirection: 'column', width: 300 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}  >
              ROLE NAME
            </Typography>
            <FormControl error={!haveRoleName}>
              <Select
                value={roleName}
                onChange={handleRoleNameSelectChange}
                sx={{ height: 35, mb: 2 }}
              >
                {roleList.map((role) => {
                  return (
                    <MenuItem key={'name' + role.name} value={role.role}>{role.name}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ justifyContent: 'center', display: 'flex', mt: 5, ml: 4, flexDirection: 'column', width: 300 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}  >
              STAFF NAME
            </Typography>
            <Input error={!haveStaffName} fullWidth inputProps={ariaLabel} sx={{ mb: 2 }} onChange={handleStaffNameChange} />
          </Box>

          <Box sx={{ justifyContent: 'center', display: 'flex', mt: 5, ml: 4, flexDirection: 'column', width: 300 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}  >
              KEY
            </Typography>
            <Input error={!haveKey} fullWidth inputProps={ariaLabel} sx={{ mb: 2 }} onChange={handleKeyChange} />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 7 }}>
            <Button onClick={subF} sx={{
              width: 150, '&:hover': {
                backgroundColor: '#8475B0',
              }, backgroundColor: '#503E9D', fontWeight: 'bold', height: 55, borderRadius: 3, mr: 5
            }}>
              <Typography variant="h6" sx={{ color: '#ffffff' }} >
                Add
              </Typography>
            </Button>
            <Button onClick={handleClose} sx={{
              width: 150, '&:hover': {
                backgroundColor: '#F1F1F1',
              }, backgroundColor: '#F7F7F7', fontWeight: 'bold', height: 55, borderRadius: 3,
            }}>
              <Typography variant="h6" sx={{ color: '#000000', }} >
                Cancel
              </Typography>
            </Button>
          </Box>
        </Card>
      </Modal>
    </>
  );
}