import React, { useState, useEffect } from 'react';
import { Button, Card, Grid, Typography } from '@mui/material';
import { useLocation, Link, useLoaderData } from 'react-router-dom';

const IngredientList = () => {
    const sastojci = useLoaderData();
    const [data, setData] = useState(sastojci);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/ingredients', {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setData(data);
                    console.log('Fetched data:', data);
                } else {
                    console.log('Error: ', response.status);
                }
            } catch (error) {
                console.log('Error: ', error);
            }
        };

        fetchData();
    }, []);

    // Kada želite da izvezete (export) komponentu, to mora biti na ovom mestu, na vrhu nivoa modula
    return (
        <h1>EEEEE</h1>
        
    );
};

export default IngredientList;