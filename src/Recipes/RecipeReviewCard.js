import React, { useEffect, useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import GradeIcon from '@mui/icons-material/Grade';


const RecipeCard = styled(Card)({
  maxWidth: 345,
  marginBottom: 20,
});

const FavoriteButton = styled(Button)({
  marginLeft: 'auto', // Pomeranje u desno
  color: 'black', // Početna boja ikonice
  '&.active': {
    color: 'orangered', // Boja ikonice kad je aktivirana
  },
});

const RecipeReviewCard = ({ recipe, img, onDelete, onLearnMore }) => {

  const [user, setUser] = useState({});
  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) {
      setUser(JSON.parse(u));
    }
  }, [])

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/recipes/${recipe.id}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : JSON.parse(localStorage.getItem('user')).token
          // Dodajte potrebne headere za autorizaciju ili autentifikaciju
        },
      });
  
      if (response.ok) {
        onDelete(recipe.id);
      } else {
        console.error('Error deleting recipe:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const handleLearnMore = () => {
    onLearnMore(recipe.id);
  };

  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    if(isFavorite === false) setAsFav();
    if(isFavorite === true) removeAsFav();
  };

  const removeAsFav = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/recipes/removeAsFav?recipeId=${recipe.id}&username=${JSON.parse(localStorage.getItem('user')).user}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : JSON.parse(localStorage.getItem('user')).token
          // Dodajte potrebne headere za autorizaciju ili autentifikaciju
        },
      });
    }catch (error) {
      console.error('Error removing from favourites:', error);
    }
  }

  const setAsFav = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/recipes/addToFav?recipeId=${recipe.id}&username=${JSON.parse(localStorage.getItem('user')).user}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : JSON.parse(localStorage.getItem('user')).token
          // Dodajte potrebne headere za autorizaciju ili autentifikaciju
        },
      });
    }catch (error) {
      console.error('Error adding to favourites:', error);
    }
  }

  const FetchIngredients = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/ratios/byRecipeId/${recipe.id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : JSON.parse(localStorage.getItem('user')).token
          // Dodajte potrebne headere za autorizaciju ili autentifikaciju
        },
      });

    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <RecipeCard>
      <CardMedia
        component="img"
        height="194"
        image={img}
        alt={recipe.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {recipe.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {recipe.description}
        </Typography>
      </CardContent>
      <CardActions>
        {((user.role) === "ROLE_ADMIN") ? <Button size="small" onClick={handleDelete}>Delete</Button> : <></>}
        <Button size="small" onClick={handleLearnMore}>Learn More</Button>
        <FavoriteButton
          size="small"
          onClick={handleFavoriteClick}
          className={isFavorite ? 'active' : ''}
        >
          <GradeIcon />
        </FavoriteButton>
      </CardActions>
    </RecipeCard>
  );
};

export default RecipeReviewCard;