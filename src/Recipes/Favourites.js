
import React from 'react';
import { Grid, Button, FormControl, TextField, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Menu from '../Menu';
import RecipeReviewCard from './RecipeReviewCard';
import './Recipe.css';
import { Home } from "@mui/icons-material";

const ShowRecipes = () => {
  const loadedUser = useLoaderData();
  const recipes = loadedUser.recipes;
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
  return (
    // <Container className="show-recipes-container container-center">
    <Container>
      <AppBar position="static" color="transparent" sx={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <Toolbar>
          <IconButton onClick={() => { navigate('/') }} color="inherit">
            <Home />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My cookbook
          </Typography>
          <FormControl sx={{ width: "75%", mr: 2 }}>
            <TextField
              placeholder="Search..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              sx={{ width: "30%", flexGrow: 1 }}
            />
          </FormControl>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
          width: '100%',
          margin: 'auto',
          marginTop: 3,
        }}
      >
        {/* <FormControl sx={{ width: "100%", marginBottom: "40px" }}>
          <TextField
            placeholder="Search..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
        </FormControl> */}
      </Box>
      <Grid container spacing={3}>
        {currentRecipes.map((r, index) => (
          <RecipeReviewCard
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
  );
}

export default ShowRecipes;