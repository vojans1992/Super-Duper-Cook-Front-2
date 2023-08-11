
import React from 'react';
import { Grid, Button, FormControl, TextField, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Menu from '../Menu';
import RecipeReviewCard from './RecipeReviewCard';
import './Recipe.css';
import { Home } from "@mui/icons-material";

const ShowRecipes = () => {
  const recipes = useLoaderData()[0];
  const loggedUser = useLoaderData()[1];
  const recipeIngredientRatios = useLoaderData()[2];
  console.log(loggedUser)
  const loggedUserRecipes = loggedUser.recipes;
  const loggedUserAllergens = loggedUser.allergens;
  console.log(loggedUserAllergens)

  const navigate = useNavigate();
  const [currentRecipes, setCurrentRecipes] = useState(recipes);
  const [q, setQ] = useState("");

  const [user, setUser] = useState({});
  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) {
      setUser(JSON.parse(u));
    }
  }, [])

  useEffect(() => {
    setCurrentRecipes(recipes.filter(r => {
      return r.title.toLowerCase().includes(q.toLowerCase())
    }));
  }, [q, recipes]);

  const handleDelete = (recipeId) => {
    const filteredRecipes = currentRecipes.filter((r) => r.id !== recipeId);
    setCurrentRecipes(filteredRecipes);
  };

  const handleLearnMore = (recipeId) => {
    navigate(`/recipes/${recipeId}`); // Navigacija na rutu za prikaz detalja recepta
  };

  const checkIfContainsAllergens = (recipe) => {
    let containedAllergens = [];
    recipeIngredientRatios.forEach(element => {
      if (element.recipe.id === recipe.id) {
        element.ingredient.allergens.forEach(allergen => {
          console.log(loggedUserAllergens)
          if (loggedUserAllergens.some(obj => obj.id === allergen.id)) {
            containedAllergens.push(allergen)
          }
        });
      }
    })
    return containedAllergens;
  }

  const checkIfFav = (recipe) => {
    let isFav = false;
    if(loggedUser === null) return isFav;
    console.log(loggedUser)
    loggedUserRecipes.forEach(element => {
      if (element.id === recipe.id) {
        isFav = true;
      }
    });
    return isFav;
  }
  return (
    // <>
    //   <Menu />
    //   <Container className="show-recipes-container container-center">

    //  NOVO
    <Container>
      <AppBar position="static" color="transparent" sx={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <Toolbar>
          <IconButton onClick={() => { navigate('/') }} color="inherit">
            <Home />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Recipes
          </Typography>
          <FormControl sx={{ width: "65%", mr: 2 }}>
            <TextField
              placeholder="Search..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              sx={{ width: "30%", flexGrow: 1 }}
            />
          </FormControl>
          {(user.role === "ROLE_COOK") ? <Button
            variant="contained"
            onClick={() =>
              navigate("new_recipe", { state: { recipes: recipes } })
            }
            sx={{ ml: 2 }}> Add new recipe </Button> : <></>}
        </Toolbar>
      </AppBar>
      {/* NOVO */}


      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 3,
        }}
      >
        {/* <FormControl sx={{ width: "80%", marginBottom: "40px" }}>
            <TextField
              placeholder="Search..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              sx={{ flexGrow: 1 }}
            />
          </FormControl>
          {(user.role === "ROLE_ADMIN") ? <Button
            variant="outlined"
            onClick={() =>
              navigate("new_recipe", { state: { recipes: recipes } })
            }
            sx={{
              width: "160px",// Prilagodite širinu sadržaju
              height: "70px", //Prilagodite visinu
              color: "black",

            }}
          >
            Add new recipe            
          </Button> : <></>} */}
      </Box>
      <Grid container spacing={3}>
        {currentRecipes.map((r, index) => (
          <RecipeReviewCard
            allergens={checkIfContainsAllergens(r)}
            isFav={checkIfFav(r)}
            img={r.imageUrl}
            key={r.id}
            recipe={r}
            //image={getImageForIndex(index)}
            className="recipe-card"
            onDelete={() => handleDelete(r.id)} // Dodajemo funkciju za brisanje
            onLearnMore={() => handleLearnMore(r.id)} // Dodajemo funkciju za prikaz detalja recepta
          />
        ))}
      </Grid>
    </Container>
    // </>
  );
}

export default ShowRecipes;