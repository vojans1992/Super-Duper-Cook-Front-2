import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Outlet, RouterProvider, createBrowserRouter, useRouteError } from 'react-router-dom';
import App from './App';
import Login from './Login'; // Importujemo komponentu za stranicu za login
import ShowRecipes from './Recipes/ShowRecipes'
import NewRecipe from './Recipes/NewRecipe'
import NewIngredient from './Ingredients/NewIngredient';
import IngredientEdit from './Ingredients/IngredientEdit';
import { Box, Container, Stack, Typography } from '@mui/material';
import ShowIngredients from './Ingredients/ShowIngredients';
import RecipeDetails from './Recipes/RecipeDetails';

const ErrorDisplay = ({ entity }) => {
  const error = useRouteError();


  return <Container>
    <Stack direction={'column'} spacing={1}>
      <Typography variant='h4'>Desila se greška u učitavanju {entity}</Typography>
      <Typography>
        Jako nam je žao. Da li ste pokrenuli back-end server, možda?
      </Typography>
      <Typography variant='h6'>Interna greška je: </Typography>
      <Box>
        <pre>
          {error.message}
        </pre>
      </Box>
    </Stack>
  </Container>
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },

  {
    path: "recipes",
    element: <ShowRecipes />,
    loader: async () => {
      return fetch('http://localhost:8080/api/v1/recipes');
    },
  },
  {
    path: "recipes/new_recipe",
    element: <NewRecipe />,
    loader: async () => {
      const ingredients_a = await fetch('http://localhost:8080/api/v1/ingredients');
      const ingredients = await ingredients_a.json();

      const authors_a = await fetch('http://localhost:8080/api/v1/cook');
      const authors = await authors_a.json();

      return [ingredients, authors];
    },
  },
  {
    path: '/login', // Putanja za stranicu za login
    element: <Login />, // Koristimo komponentu Login za ovu rutu
  },
  {
    path: "ingredients",
    element: <ShowIngredients/>,
    errorElement: <ErrorDisplay entity='sastojaka.'/>,
    loader: async () => { 
      return fetch('http://localhost:8080/api/v1/ingredients');
    },
    // action: async () => {
    //   return fetch ('http://localhost:8080/api/v1/ingredients', {
    //     method: 'GET',
    //     headers: {
    //       "Content-Type": "application/json"
    //       // "Authorization": JSON.parse(localStorage.getItem('user')).token,
    //       //"Accept": "application/json"              
    //     },
                  
    //   });
    // }
  },
  {
    path: "recipes/:id",
    element: <RecipeDetails />, // Koristićemo novu komponentu za prikaz detalja recepta
    loader: async ({ params }) => {
      const response = await fetch(`http://localhost:8080/api/v1/recipes/${params.id}`);
      const recipe = await response.json();
      return recipe;
    },
  },


  {
    path: 'ingredients/new_ingredient',
    element: <NewIngredient/>,
    errorElement: <ErrorDisplay entity='sastojaka.' />,
    loader: async () => {
      
      const allergens_a = await fetch('http://localhost:8080/api/v1/allergen');
      const allergens = await allergens_a.json();

      return [allergens];
    }
  }, 
  
  {
    path: "ingredients/:id",
    element: <IngredientEdit/>,
    errorElement: <ErrorDisplay entity='sastojaka.'/>,    
    loader: async ({ params }) => {

      const ingredient_i = await fetch(`http://localhost:8080/api/v1/ingredients/${params.id}`);
      const ingredient = await ingredient_i.json();        
      const allergen_a = await fetch("http://localhost:8080/api/v1/allergen");
      const allergen = await allergen_a.json(); 

      return [ingredient, allergen];
    },
    action: async ({ params, request }) => {
      if (request.method === 'DELETE') {
        return fetch(`http://localhost:8080/api/v1/ingredients/${params.id}`, {
          method: 'DELETE',
          //mode: 'cors',
          headers: {
            "Content-Type": "application/json",
            // "Authorization": JSON.parse(localStorage.getItem('user')).token,
            // "Accept": "application/json"
          },
        }
        );
      } else if (request.method === 'PUT') {
        let data = Object.fromEntries(await request.formData());
        //data.teachers = JSON.parse(data.teachers);    
        console.log(JSON.stringify(data, null, 4));       
        return fetch(`http://localhost:8080/api/v1/ingredients/${params.id}`, {
          method: 'PUT',
          mode: 'cors',
          headers: {
            "Content-Type": "application/json",
            // "Authorization": JSON.parse(localStorage.getItem('user')).token,
            // "Accept": "application/json"
          },
          body: JSON.stringify(data)
        });
      }
    }
  },


]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();