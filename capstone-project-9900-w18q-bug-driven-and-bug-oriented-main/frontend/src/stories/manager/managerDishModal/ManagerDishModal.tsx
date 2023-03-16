// pop up window of dish card
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';


interface ListProps {
  modalType?: string;
  editOpen?: boolean;
  categoryName?: string;
  dishName?: string;
  description?: string;
  ingredients?: string;
  calories?: string;
  price?: string;
  newPictureName?: string;
  // listener
  handleEditClose?: (params: any) => any;
  handleEditComfirm?: (params: any) => any;
  handleCategoryChange?: (params: any) => any;
  handleDishChange?: (params: any) => any;
  handleDescriptionChange?: (params: any) => any;
  handleIngredientsChange?: (params: any) => any;
  handleCaloriesChange?: (params: any) => any;
  handlePriceChange?: (params: any) => any;
  handleFileUpload?: (params: any) => any;
  // check input available
  haveCategoryName?: boolean;
  haveDishName?: boolean;
  haveDescription?: boolean;
  haveIngredients?: boolean;
  haveCalories?: boolean;
  havePrice?: boolean;
  haveNewPictureName?: boolean;
}

const editStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  pt: 2,
};

const ariaLabel = { 'aria-label': 'description' };

export default function ManagerDishModal({
  modalType = 'Add', //Add or Update
  editOpen = false,
  categoryName = 'Meat',
  dishName = 'Title name',
  description = 'Within 150 words',
  ingredients = 'Within 150 words',
  calories = '0',
  price = '0.00',
  newPictureName = '',
  handleEditClose = () => { },
  handleEditComfirm = () => { },
  handleCategoryChange = () => { },
  handleDishChange = () => { },
  handleDescriptionChange = () => { },
  handleIngredientsChange = () => { },
  handleCaloriesChange = () => { },
  handlePriceChange = () => { },
  handleFileUpload = () => { },
  haveCategoryName = true,
  haveDishName = true,
  haveDescription = true,
  haveIngredients = true,
  haveCalories = true,
  havePrice = true,
  haveNewPictureName = true,
  ...props
}: ListProps) {

  return (
    <>
      <Modal
        open={editOpen}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={editStyle}>
          <Box sx={{ display: 'flex', justifyContent: 'right', marginRight: -2 }}>
            <IconButton onClick={handleEditClose} color="primary" sx={{ color: '#A3A3A4' }} aria-label="upload picture" component="label">
              <ClearIcon />
            </IconButton>
          </Box>
          <Box sx={{ justifyContent: 'center', alignContent: 'middle', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}  >
              DISH NAME
            </Typography>
            <Input error={haveDishName ? false : true} placeholder={dishName} inputProps={ariaLabel} sx={{ mb: 5 }} onChange={handleDishChange} />

            <Typography variant="h6" sx={{ fontWeight: 'bold' }}  >
              DESCRIPTION
            </Typography>
            <Input error={haveDescription ? false : true} placeholder={description} inputProps={ariaLabel} sx={{ mb: 5 }} onChange={handleDescriptionChange} />

            <Typography variant="h6" sx={{ fontWeight: 'bold' }}  >
              INGREDIENTS
            </Typography>
            <Input error={haveIngredients ? false : true} placeholder={ingredients} inputProps={ariaLabel} sx={{ mb: 5 }} onChange={handleIngredientsChange} />

            <Typography variant="h6" sx={{ fontWeight: 'bold' }}  >
              CALORIES
            </Typography>
            <Box>
              <Input error={haveCalories ? false : true} placeholder={calories} inputProps={ariaLabel} sx={{ mb: 5, width: 50 }} onChange={handleCaloriesChange} />
              <Box display='inline' fontWeight='bold'>Cal</Box>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 'bold' }}  >
              PRICE
            </Typography>
            <Box>
              <Box display='inline' fontWeight='bold'>$</Box>
              <Input error={havePrice ? false : true} placeholder={price} inputProps={ariaLabel} sx={{ mb: 5, width: 70 }} onChange={handlePriceChange} />
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 'bold' }}  >
              PICTURE
            </Typography>
            <Box>
              <Input error={haveNewPictureName ? false : true} disabled placeholder={newPictureName} inputProps={ariaLabel} sx={{ mb: 5, width: 0.75, fontWeight: 'bold' }} />
              <Box display='inline'>
                <Button
                  component="label"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#8475B0',
                    }, backgroundColor: '#503E9D', fontWeight: 'bold', borderRadius: 3, mx: 1
                  }}>
                  <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 'bold' }} >
                    Upload
                  </Typography>
                  <input hidden accept="image/*" multiple type="file" onChange={handleFileUpload} />
                </Button>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
            <Button onClick={handleEditComfirm} sx={{
              width: 150, '&:hover': {
                backgroundColor: '#8475B0',
              }, backgroundColor: '#503E9D', fontWeight: 'bold', height: 55, borderRadius: 3, mr: 5
            }}>
              <Typography variant="h6" sx={{ color: '#ffffff' }} >
                {modalType}
              </Typography>
            </Button>
            <Button onClick={handleEditClose} sx={{
              width: 150, '&:hover': {
                backgroundColor: '#F1F1F1',
              }, backgroundColor: '#F7F7F7', fontWeight: 'bold', height: 55, borderRadius: 3,
            }}>
              <Typography variant="h6" sx={{ color: '#000000' }} >
                Cancel
              </Typography>
            </Button>
          </Box>
        </Card>
      </Modal>
    </>
  );
}