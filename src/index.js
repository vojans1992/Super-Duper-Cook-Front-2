import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Outlet, RouterProvider, createBrowserRouter, useRouteError } from 'react-router-dom';
import App from './App';
import Login from './Login';
import ShowRecipes from './Recipes/ShowRecipes'
import NewRecipe from './Recipes/NewRecipe'
import NewIngredient from './Ingredients/NewIngredient';
import IngredientEdit from './Ingredients/IngredientEdit';
import { Box, Container, Stack, Typography } from '@mui/material';
import ShowIngredients from './Ingredients/ShowIngredients';
import ShowUsers from './User/ShowUsers';
import EditUser from './User/EditUser';
import UserForm from './User/UserForm';

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

const API_BASE_URL = 'http://localhost:8080/api/v1';

const withAuthorization = (headers = {}) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  return {
    ...headers,
    'Content-Type': 'application/json',
    Authorization: token,
    Accept: 'application/json'
  };
};

const loadIngredients = async () => {
  const response = await fetch(`${API_BASE_URL}/ingredients`, {
    method: 'GET',
    headers: withAuthorization()
  });
  return response;
};

const loadAllergens = async () => {
  const response = await fetch(`${API_BASE_URL}/allergen`, {
    method: 'GET',
    headers: withAuthorization()
  });
  return response;
};

const loadUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'GET',
    headers: withAuthorization()
  });
  return response;
};

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
    path: '/login',
    element: <Login />,
  },
  {
    path: "users",
    element: <ShowUsers />,
    loader: async () => {
      return fetch("http://localhost:8080/api/v1/users");
    }
  },
  {
    path: "users/new_user",
    element: <UserForm />
  },
  {
    path: "users/:id",
    element: <EditUser />,
    loader: async ({ params }) => {
      return fetch(`http://localhost:8080/api/v1/users/${params.id}`), {
        method: 'GET',
        mode: 'cors'
      }
    }
  },
  {
    path: 'ingredients',
    element: <ShowIngredients />,
    errorElement: <ErrorDisplay entity="sastojaka." />,
    loader: loadIngredients
  },
  {
    path: 'ingredients/new_ingredient',
    element: <NewIngredient />,
    errorElement: <ErrorDisplay entity='sastojaka.' />,
    loader: async () => {

      const allergenResponse = await loadAllergens();
      const allergen = await Promise.all([
        allergenResponse.json()
      ]);
      return allergen;
    },
  },
  {
    path: "ingredients/:id",
    element: <IngredientEdit />,
    errorElement: <ErrorDisplay entity='sastojaka.' />,
    loader: async ({ params }) => {
      const ingredientResponse = await fetch(`${API_BASE_URL}/ingredients/${params.id}`, {
        method: 'GET',
        headers: withAuthorization()
      });
      const allergenResponse = await loadAllergens();
      const [ingredient, allergen] = await Promise.all([
        ingredientResponse.json(),
        allergenResponse.json()
      ]);
      return [ingredient, allergen];
    },
    action: async ({ params, request }) => {
      if (request.method === 'DELETE') {
        return fetch(`${API_BASE_URL}/ingredients/${params.id}`, {
          method: 'DELETE',
          mode: 'cors',
          headers: withAuthorization()
        });
      } else if (request.method === 'PUT') {
        let data = Object.fromEntries(await request.formData());
        console.log(JSON.stringify(data, null, 4));
        return fetch(`${API_BASE_URL}/ingredients/${params.id}`, {
          method: 'PUT',
          mode: 'cors',
          headers: withAuthorization(),
          body: JSON.stringify(data)
        });
      }
    }
  },
  {
    path: "users",
    element: <ShowUsers />,
    errorElement: <ErrorDisplay entity="korisnika." />,
    loader: loadUsers
  },
  {
    path: 'users/new_user',
    element: <UserForm />,
    errorElement: <ErrorDisplay entity='korisnika.' />,
    loader: async () => {

      const userResponse = await loadUsers();
      const user = await Promise.all([
        userResponse.json()
      ]);
      return user;
    },
  },
  {
    path: "users/:id",
    element: <EditUser />,
    errorElement: <ErrorDisplay entity='korisnika.' />,
    loader: async ({ params }) => {

      return fetch(`http://localhost:8080/api/v1/users/${params.id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
          "Authorization": JSON.parse(localStorage.getItem('user')).token,
          "Accept": "application/json"
        },

      });
    },
    action: async ({ params, request }) => {

      if (request.method === 'DELETE') {
        return fetch(`http://localhost:8080/api/v1/users/${params.id}`, {
          method: 'DELETE',
          mode: 'cors',
          headers: {
            "Content-Type": "application/json",
            "Authorization": JSON.parse(localStorage.getItem('user')).token,
            "Accept": "application/json"
          },
        }
        );
      } else if (request.method === 'PUT') {
         let data = Object.fromEntries(await request.formData());
         data.users = JSON.parse(data.users);
         console.log(JSON.stringify(data, null, 4));
        return fetch(`http://localhost:8080/api/v1/users/${params.id}`, {
          method: 'PUT',
          mode: 'cors',
          headers: {
            "Content-Type": "application/json",
            "Authorization": JSON.parse(localStorage.getItem('user')).token,
            "Accept": "application/json"
          },
        });
      }
    }
  },
  {
    path: '/myallergens',
    element: <ChooseAllergens></ChooseAllergens>,
    loader:
      async () => {
        return await fetch('http://localhost:8080/api/v1/allergens', {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        });

      }
  },
  {
    path: 'allergens/add_new_allergen',
    element: <AddNewAllergen />
  },
  {
    path: '/allergens',
    element: <ShowAllergens></ShowAllergens>,
    loader:
      async () => {
        return await fetch('http://localhost:8080/api/v1/allergens', {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        });

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