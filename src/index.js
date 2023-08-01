import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import IngredientList from './IngredientList';
import Login from './Login'; // Importujemo komponentu za stranicu za login

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
    path: '/login', // Putanja za stranicu za login
    element: <Login />, // Koristimo komponentu Login za ovu rutu
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();