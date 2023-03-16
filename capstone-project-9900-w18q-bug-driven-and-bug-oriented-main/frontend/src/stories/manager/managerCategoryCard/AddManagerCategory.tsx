// add dish button
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { Alert, Button, Card, IconButton, Input, Modal, Snackbar, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';


interface ListProps {
  changeFunc?: (params: any) => any;
  submitFunc?: (params: any) => any;
}

const ariaLabel = { 'aria-label': 'description' };

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 280,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  pt: 2,
};


export default function AddManagerCategory({
  changeFunc = () => { },
  submitFunc = () => { },
  ...props
}: ListProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => { setOpen(false); setErrorFlag(false); setNewCategoryName('') };
  const [errorFlag, setErrorFlag] = React.useState(false);
  const [openNoticeWin, setOpenNoticeWin] = React.useState(false);
  const [newCategoryName, setNewCategoryName] = React.useState('');

  // pop up window
  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryName(event.target.value);
  };

  const handleCloseNoticeWin = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenNoticeWin(false);
  };

  // submit confirm function
  const subF = () => {
    if (newCategoryName) {
      submitFunc(newCategoryName)
        .then((res: any) => {
          if (res) {
            setOpenNoticeWin(true);
            setErrorFlag(true);
          } else {
            setNewCategoryName('');
            handleClose();
          }
        });
    } else {
      setErrorFlag(true);
    }
  }

  // init
  useEffect(() => {
    const keyDownHandler = (e: any) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (open) {
          subF();
        }
      }
    }
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newCategoryName, open])

  return (
    <>
      <Snackbar open={openNoticeWin}
        autoHideDuration={5000}
        onClose={handleCloseNoticeWin}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNoticeWin} severity="info" sx={{ width: '100%' }}>
          Duplicate category, please try again.
        </Alert>
      </Snackbar>
      <Button onClick={handleOpen} variant="contained" sx={{
        height: 45, width: 250, backgroundColor: '#503E9D', borderRadius: 3, '&:hover': {
          backgroundColor: '#8475B0',
        }
      }}>
        <Box sx={{ display: 'flex', ml: -2 }}>
          <AddIcon sx={{ color: '#ffffff' }} />
          <Typography variant="inherit" sx={{ color: '#ffffff', marginLeft: 1, fontSize: 16 }}>
            Add new category
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
              CATEGORY NAME
            </Typography>
            <Input error={errorFlag ? true : false} fullWidth inputProps={ariaLabel} sx={{ mb: 2 }} onChange={handleCategoryChange} />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 7 }}>
            <Button onClick={subF} sx={{
              width: 150, '&:hover': {
                backgroundColor: '#8475B0',
              }, backgroundColor: '#503E9D', fontWeight: 'bold', height: 55, borderRadius: 3, mr: 5
            }}>
              <Typography variant="h6" sx={{ color: '#ffffff' }} >
                ADD
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