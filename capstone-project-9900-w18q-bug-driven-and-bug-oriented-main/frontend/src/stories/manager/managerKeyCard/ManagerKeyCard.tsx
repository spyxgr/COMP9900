// key list 
import { Box } from "@mui/system";
import { useState } from "react";
import { Button, Card, Paper, Typography, IconButton, Modal } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';


interface ListProps {
  role?: string;
  name?: string;
  keyValue?: string;
  lastModified?: string;
  deleteFunc?: (params: any) => any;
}

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


export default function ManagerKeyCard({
  role = 'Manager',
  name = 'Tony',
  keyValue = '',
  lastModified = '2022-09-24 19:07:33',
  deleteFunc = () => { },
  ...props
}: ListProps) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleComfirm = (e: any) => {
    setOpen(false);
    deleteFunc(e);
  };

  return (
    <>
      <Paper elevation={0}
        sx={{
          width: '100%', height: 182, display: 'flex', bgcolor: '#F7F7F7', borderRadius: 5, flexDirection: 'column',
        }}>
        <Box display='flex' justifyContent='space-between'>
          <Box>
            <Box display='flex' flexDirection='row'>
              <Box>
                <Box sx={{ ml: 5, mt: 5 }}>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ fontWeight: 'bold' }} variant="h5">
                      Role: &nbsp;
                    </Typography>
                    <Typography sx={{}} variant="h5">
                      {role}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ fontWeight: 'bold' }} variant="h5">
                      Name: &nbsp;
                    </Typography>
                    <Typography sx={{}} variant="h5">
                      {name}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ m: 5, mt: 1, flexDirection: 'row', display: 'flex' }}>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ fontWeight: 'bold' }} variant="h5">
                      Key: &nbsp;
                    </Typography>
                    <Typography sx={{}} variant="h5">
                      {keyValue}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box>
              </Box>
            </Box>
          </Box>

          <Box sx={{ mr: 5, mt: 8 }}>
            <Button onClick={handleOpen} variant="contained" sx={{
              height: 45, width: 90, backgroundColor: '#503E9D', borderRadius: 3, '&:hover': {
                backgroundColor: '#8475B0',
              }
            }}>
              <Box sx={{ display: 'flex' }}>
                <Typography variant="inherit" sx={{ color: '#ffffff', fontSize: 16, }}>
                  Delete
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

                <Box sx={{ justifyContent: 'center', alignContent: 'middle', display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}  >
                    Delete confirm
                  </Typography>
                  <Typography sx={{ fontSize: 20, textAlign: 'center' }} >
                    Do you want to delete this key?
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'left', ml: 15 }}>
                    <Typography sx={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }} >
                      Role:
                    </Typography>
                    <Typography sx={{ fontSize: 20, textAlign: 'center' }} >
                      {role}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'left', ml: 15 }}>
                    <Typography sx={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }} >
                      Name:
                    </Typography>
                    <Typography sx={{ fontSize: 20, textAlign: 'center' }} >
                      {name}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'left', ml: 15 }}>
                    <Typography sx={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }} >
                      Key:
                    </Typography>
                    <Typography sx={{ fontSize: 20, textAlign: 'center' }} >
                      {keyValue}
                    </Typography>
                  </Box>

                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Button onClick={handleComfirm} sx={{
                    width: 150, '&:hover': {
                      backgroundColor: '#8475B0',
                    }, backgroundColor: '#503E9D', fontWeight: 'bold', height: 55, borderRadius: 3, mr: 5
                  }}>
                    <Typography variant="h6" sx={{ color: '#ffffff' }} >
                      Confirm
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
          </Box>
        </Box>
      </Paper>
    </>
  );
}