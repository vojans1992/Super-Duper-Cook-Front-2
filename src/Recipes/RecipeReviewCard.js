import React, { useState } from 'react';
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
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/recipes/${recipe.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
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
        <Button size="small" onClick={handleDelete}>Delete</Button>
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