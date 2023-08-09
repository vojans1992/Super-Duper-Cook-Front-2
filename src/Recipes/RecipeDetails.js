import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Menu from '../Menu';
import { Card, CardContent, Typography } from '@mui/material';


const RecipeDetails = () => {
  const recipe = useLoaderData()[0];
  const ingredients = useLoaderData()[1]


  
  const cardStyle = {
    maxWidth: 400,
    margin: '0 auto',
    marginTop: '40px',
    padding: '20px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    background: '#f2f2f2'
  };

  const headingStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '15px',
    textAlign: 'center',
  };

  const attributeStyle = {
    fontSize: '18px',
    marginBottom: '10px',
    textAlign: 'center',
  };

  const guideStyle = {
    fontSize: '20px',
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap',
    marginBottom: '20px',
    textAlign: 'center',
  };

  return (
    <>
      <Menu />
      {console.log(ingredients)}
      <Card style={cardStyle}>
        <CardContent>
          <Typography variant="h4" style={headingStyle}>
            {recipe.title}
          </Typography>
          <Typography variant="h6" style={headingStyle}>
            {recipe.description}
          </Typography>
          <Typography variant="body1" style={attributeStyle}>
            <strong>Autor:</strong> {recipe.author.username}
          </Typography>
          <Typography variant="body1" style={attributeStyle}>
            <strong>Vreme pripreme:</strong> {recipe.preparationTime} minuta
          </Typography>
          <Typography variant="body1" style={attributeStyle}>
            <strong>Količina:</strong> {recipe.quantity}
          </Typography>
          <Typography variant="body1" style={attributeStyle}>
            <strong>Masti:</strong> {recipe.fat}
          </Typography>
          <Typography variant="body1" style={attributeStyle}>
            <strong>Kalorije:</strong> {recipe.calories}
          </Typography>
          <Typography variant="body1" style={attributeStyle}>
            <strong>Ugljeni hidrati:</strong> {recipe.carboHydrate}
          </Typography>
          <Typography variant="body1" style={attributeStyle}>
            <strong>Proteini:</strong> {recipe.protein}
          </Typography>
          <Typography variant="body1" style={attributeStyle}>
            <strong>Zasićene masti:</strong> {recipe.saturatedFat}
          </Typography>
          <Typography variant="body1" style={attributeStyle}>
            <strong>Šećeri:</strong> {recipe.sugar}
          </Typography>

          <Typography variant="body1" style={attributeStyle}>
            <strong>Sastojci:</strong> {ingredients.map((e) => (e.ingredient.name) + " " + e.amount + ", " )}
          </Typography>

          <Typography variant="body1" style={guideStyle}>
            <strong>Guide:<br /></strong> {recipe.guide}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default RecipeDetails;