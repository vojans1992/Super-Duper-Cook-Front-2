import { useState } from "react";
import { useLoaderData, useFetcher, useNavigate } from "react-router-dom";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem } from "@mui/material";
import { Container, Box, Button, TextField, FormControl, Stack } from "@mui/material";
import { Delete, Edit, Home } from "@mui/icons-material";
import Pagination from '@mui/material/Pagination';
import './Ingredient.css';


const ShowIngredients = () => {

    const ingredients = useLoaderData();
    const navigation = useNavigate();
    const [q, setQ] = useState("");
    const fetcher = useFetcher();
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);

    const filteredIngredients = ingredients.filter(v => {
        return v.name.toLowerCase().includes(q.toLowerCase())
    });

    const totalItems = filteredIngredients.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentIngredients = filteredIngredients.slice(startIndex, endIndex);


    return <div className="ingredient-container">     
        <Container>
            <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton onClick={() => { navigation('/') }}>
                            <Home />
                        </IconButton>
                <FormControl sx={{ width: "100%" }}>
                    <TextField placeholder="Search..." value={q} onChange={e => setQ(e.target.value)} sx={{ flexGrow: 1 }} />
                </FormControl>
                </Box>

                <Button variant="contained" onClick={() => { navigation('new_ingredient') }}>Add New Ingredient</Button>
            </Box>
            <TableContainer component={Paper}  sx={{ width: "100%", backgroundColor: "lightcyan" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Ime</TableCell>
                            <TableCell>Measurement Unit</TableCell>
                            <TableCell>Calories</TableCell>
                            <TableCell>CarboHydrate</TableCell>
                            <TableCell>Sugar</TableCell>
                            <TableCell>Fat</TableCell>
                            <TableCell>SaturatedFat</TableCell>
                            <TableCell>Protein</TableCell>
                            <TableCell>Allergens</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentIngredients.map(i => <TableRow>
                            <TableCell>{i.id}</TableCell>
                            <TableCell>{i.name}</TableCell>
                            <TableCell>{i.measurementUnit}</TableCell>
                            <TableCell>{i.calories}</TableCell>
                            <TableCell>{i.carboHydrate}</TableCell>
                            <TableCell>{i.sugar}</TableCell>
                            <TableCell>{i.fat}</TableCell>
                            <TableCell>{i.saturatedFat}</TableCell>
                            <TableCell>{i.protein}</TableCell>
                            <TableCell> {i.allergens.map((a) => <MenuItem value={a.name}> {a.name} </MenuItem>)} </TableCell>

                            <TableCell>
                                <Stack direction='row'>
                                    <IconButton onClick={async (e) => {
                                        fetcher.submit({}, {
                                            method: 'delete',
                                            action: `/ingredients/${i.id}`
                                        });
                                        alert('Successfully deleted ingredient.');

                                    }}>
                                        <Delete />
                                    </IconButton>
                                    <IconButton onClick={e => {
                                        navigation(`/ingredients/${i.id}`);
                                    }}>
                                        <Edit />
                                    </IconButton>
                                </Stack>
                            </TableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                sx={{ marginTop: 3 }}
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
            />
        </Container>
    </div>
}
export default ShowIngredients;