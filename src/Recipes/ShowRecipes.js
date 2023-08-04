import { Grid, Button, FormControl, TextField } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router"
import './Recipe.css';
import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '../Menu';
  
const ShowRecipes = () => {
    const recipes = useLoaderData();
    const navigate = useNavigate();
    const [currentRecipes, setCurrentRecipes] = useState([recipes]);
    const [q, setQ] = useState("");

    useEffect(() => {
        setCurrentRecipes(recipes.filter(r => {
            return r.title.toLowerCase().includes(q.toLocaleLowerCase())
            // || v.allergens.toLowerCase().includes(q.toLocaleLowerCase())
        }));
    }, [q, recipes]);

    const handleDelete = (recipeId) => {
        const fb = currentRecipes.filter((r) => r.id != recipeId);
        setCurrentRecipes(fb);
    };
    return (
      <>
      <Menu />
        <Container className="show-recipes-container">
          
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 3,
            }}
          >
            <FormControl sx={{ width: "80%" }}>
              <TextField
                placeholder="Search..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                sx={{ flexGrow: 1 }}
              />
            </FormControl>
            <Button
              variant="outlined"
              onClick={() =>
                navigate("new_recipe", { state: { recipes: recipes } })
              }
            >
              Add new recipe
            </Button>
          </Box>
          <Grid container spacing={3}>
            {currentRecipes.map((r) => (
              <h3 key={r.id}>{r.title}</h3>
            ))}
          </Grid>
        </Container>
      </>
    );

}

export default ShowRecipes;