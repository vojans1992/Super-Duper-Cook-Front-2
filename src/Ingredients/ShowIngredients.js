import { useEffect, useState } from "react";
import { useLoaderData, useFetcher, useNavigate } from "react-router-dom";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem } from "@mui/material";
import { Container, Box, Button, TextField, FormControl, Stack } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const ShowIngredients = () => {

    const ingredients = useLoaderData();
    const navigation = useNavigate();
    const [currentIngredients, setCurrentIngredients] = useState([]);
    const [q, setQ] = useState("");
    const fetcher = useFetcher();

    useEffect(() => {
        setCurrentIngredients(ingredients.filter(v => {
            return v.name.toLowerCase().includes(q.toLocaleLowerCase()) 
            // || v.allergens.toLowerCase().includes(q.toLocaleLowerCase())
        }));
    }, [q, ingredients]);

    return <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>

            <FormControl sx={{ width: "30%" }}>
                <TextField placeholder="Search..." value={q} onChange={e => setQ(e.target.value)} sx={{ flexGrow: 1 }} />
            </FormControl>

            <Button variant="outlined" onClick={() => { navigation('new_ingredient') }}>Add New Ingredient</Button>
        </Box>
        <TableContainer component={Paper}>
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
                        <TableCell> {i.allergens.map((a) => <MenuItem value={a.id}> {a.name} </MenuItem> )} </TableCell>

                        <TableCell>
                            <Stack direction='row'>
                                <IconButton onClick={async (e) => {
                                    fetcher.submit({}, {
                                        method: 'delete',
                                        action: `/ingredients/${i.id}`
                                    });
                                    alert('Uspesno ste obrisali sastojak.');

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
    </Container>
    
}

export default ShowIngredients;