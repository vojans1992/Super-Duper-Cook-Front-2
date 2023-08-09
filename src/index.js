import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import IngredientList from './IngredientList';
import Login from './Login'; // Importujemo komponentu za stranicu za login
import ShowRecipes from './Recipes/ShowRecipes'
import NewRecipe from './Recipes/NewRecipe'
import ShowUsers from './User/ShowUsers';
import UserForm from './User/UserForm';
import EditUser from './User/EditUser';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/ingredients', // Ažurirana putanja da se poklapa sa putanjom u App.js
    element: <IngredientList />,
    loader: async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/ingredients", {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
          }
        });

        if (!response.ok) {
          throw new Error("Neuspešno dohvatanje podataka");
        }

        return await response.json();
      } catch (error) {
        // Obradite grešku ovde, možete je zabeležiti ili prikazati korisniku prijateljsku poruku
        console.error(error);
        return [];
      }
    }
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




]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();