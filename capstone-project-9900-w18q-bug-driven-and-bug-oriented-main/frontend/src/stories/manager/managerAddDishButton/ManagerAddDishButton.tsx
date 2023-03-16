// add dish button
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Typography from '@mui/material/Typography';
import ManagerDishModal from "../managerDishModal/ManagerDishModal";
import AddIcon from '@mui/icons-material/Add';


interface ListProps {
  doSomething?: (params: any) => any;
  categoryName?: string;
  addCard?: (params: any) => any;
}


export default function ManagerAddDishButton({
  doSomething,
  categoryName,
  addCard = () => { },
  ...props
}: ListProps) {

  const [editOpen, setEditOpen] = React.useState(false);
  const [haveDishName, setHaveDishName] = useState(true);
  const [haveCalories, setHaveCalories] = useState(true);
  const [havePrice, setHavePrice] = useState(true);
  const [havePicture, setHavePicture] = useState(true);
  const [haveCategory, setHaveCategory] = useState(true);
  const [haveDescription, setHaveDescription] = useState(true);
  const [haveIngredients, setHaveIngredients] = useState(true);
  const [canError, setCanError] = useState(false);

  // switch pop up window
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => {
    setEditOpen(false);
    setNewDishName('');
    setNewCalories('');
    setNewPrice('');
    setNewPictureName('');
    setNewDescription('');
    setNewIngredients('');
    // check input
    setCanError(false);
    setHaveDishName(true);
    setHaveCalories(true);
    setHavePrice(true);
    setHavePicture(true);
    setHaveCategory(true);
    setHaveDescription(true);
    setHaveIngredients(true);
  }

  // check input function & submit
  const handleEditComfirm = (e: any) => {
    if (!newDishName) setHaveDishName(false)
    else setHaveDishName(true);
    if (!newCalories || isNaN(Number(newCalories))) setHaveCalories(false)
    else setHaveCalories(true);
    if (!newPrice || isNaN(Number(newPrice))) setHavePrice(false)
    else setHavePrice(true);
    if (!newPictureName) setHavePicture(false)
    else setHavePicture(true);
    if (!newCategoryName) setHaveCategory(false)
    else setHaveCategory(true);
    if (!newDescription) setHaveDescription(false)
    else setHaveDescription(true);
    if (!newIngredients) setHaveIngredients(false)
    else setHaveIngredients(true);
    const obj = {
      title: newDishName,
      calorie: Number(newCalories),
      cost: Number(newPrice),
      picture: newPictureName,
      categoryName: categoryName,
      description: newDescription,
      ingredient: newIngredients,
    };
    // check input format
    if (obj.title && obj.calorie && obj.cost && obj.picture
      && obj.categoryName && obj.description && obj.ingredient) {
      addCard(obj);
      setNewDishName('');
      setNewCalories('');
      setNewPrice('');
      setNewPictureName('');
      setNewDescription('');
      setNewIngredients('');
      setCanError(false);
      setEditOpen(false);
    } else {
      setCanError(true);
    }
  };

  // data listener from child commponent
  const [newCategoryName, setNewCategoryName] = React.useState('');
  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryName(event.target.value);
  };

  const [newDishName, setNewDishName] = React.useState('');
  const handleDishChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDishName(event.target.value);
  };

  const [newDescription, setNewDescription] = React.useState('');
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDescription(event.target.value);
  };

  const [newIngredients, setNewIngredients] = React.useState('');
  const handleIngredientsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewIngredients(event.target.value);
  };

  const [newCalories, setNewCalories] = React.useState('');
  const handleCaloriesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCalories(event.target.value);
  };

  const [newPrice, setNewPrice] = React.useState('');
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPrice(event.target.value);
  };

  const [newPictureName, setNewPictureName] = React.useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];
    setNewPictureName('/dishImg/' + file.name);
  };

  // init input
  useEffect(() => {
    if (canError) {
      if (!newDishName) setHaveDishName(false)
      else setHaveDishName(true);
      if (!newCalories) setHaveCalories(false)
      else setHaveCalories(true);
      if (!newPrice) setHavePrice(false)
      else setHavePrice(true);
      if (!newPictureName) setHavePicture(false)
      else setHavePicture(true);
      if (!newCategoryName) setHaveCategory(false)
      else setHaveCategory(true);
      if (!newDescription) setHaveDescription(false)
      else setHaveDescription(true);
      if (!newIngredients) setHaveIngredients(false)
      else setHaveIngredients(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newDishName, newCalories, newPrice, newPictureName, newCategoryName, newDescription, newIngredients])

  useEffect(() => {
  }, [newCategoryName])

  // key down listener
  useEffect(() => {
    const keyDownHandler = (e: any) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (editOpen) {
          handleEditComfirm('');
        }
      }
    }
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newDishName, newCalories, newPrice, newPictureName, newCategoryName, newDescription, newIngredients, editOpen])


  return (
    <>
      <Button variant="contained" onClick={handleEditOpen} sx={{
        height: 45, width: 205, backgroundColor: '#503E9D', borderRadius: 3,
        '&:hover': {
          backgroundColor: '#8475B0',
        }
      }}
        startIcon={<AddIcon fontSize="large" />} >
        <Typography variant="body1" >
          Add new dishes
        </Typography>
      </Button>
      <ManagerDishModal
        editOpen={editOpen}
        handleEditClose={handleEditClose}
        handleEditComfirm={handleEditComfirm}
        handleCategoryChange={handleCategoryChange}
        handleDishChange={handleDishChange}
        handleDescriptionChange={handleDescriptionChange}
        handleIngredientsChange={handleIngredientsChange}
        handleCaloriesChange={handleCaloriesChange}
        handlePriceChange={handlePriceChange}
        handleFileUpload={handleFileUpload}
        // input available flag
        newPictureName={newPictureName}
        haveCalories={haveCalories}
        haveCategoryName={haveCategory}
        haveDescription={haveDescription}
        haveDishName={haveDishName}
        haveIngredients={haveIngredients}
        haveNewPictureName={havePicture}
        havePrice={havePrice}
      />
    </>
  );
}