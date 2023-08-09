import { Option } from "@mui/base";
import { Box, Container, TextField, FormHelperText, Button, Autocomplete, Stack, FormControl, Chip, Typography, MenuItem, InputLabel, Select, Grid, ListItem, ListItemText, List } from "@mui/material";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import DeleteIcon from '@mui/icons-material/Delete';

const NewRecipe = () => {



    const [title, setTitle] = useState('');
    const [description, setDesription] = useState('');
    const [guide, setGuide] = useState('');
    const [preparationTime, setPreparationTime] = useState(0);
    const [quantity, setQuantity] = useState('');
    const [selectedIngredientAndAmount, setSelectedIngredientAndAmount] = useState([]);
    const [ingredientsAndAmountsForDto, setIngredientsAndAmountsForDto] = useState([]);
    const [ingredientAmount, setIngredientAmount] = useState(0);
    const [ingredient, setIngredient] = useState({});

    const [globalError, setGlobalError] = useState(false);
    const errorMessageTemplate = "Please enter the ";
    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDesriptionError] = useState('');
    const [guideError, setGuideError] = useState('');
    const [preparationTimeError, setPreparationTimeError] = useState(0);
    const [quantityError, setQuantityError] = useState('');
    const [ingredientError, setIngredientError] = useState({});
    const [ingredientAmountError, setIngredientAmountError] = useState(0);

    const loader_data = useLoaderData();
    const [ingredients, setIngredients] = useState(loader_data[0]);

    const navigate = useNavigate();

    const save = async () => {

        if (title == '' || description == '' || guide == '' || preparationTime == 0 || quantity == '' || selectedIngredientAndAmount.size == 0) {
            setGlobalError('Please fill all fields in the form');
            return;
        }
        const new_recipe = {
            'title': title,
            'description': description,
            'guide': guide,
            'preparationTime': preparationTime,
            'quantity': quantity,
            'authorUsername': localStorage.getItem('user').username,
            'ingredientIds': ingredientsAndAmountsForDto
        };
        let response = await fetch('http://localhost:8080/api/v1/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(new_recipe)
        });
        console.log(response);
        if (response.ok) {
            let d = await response.json();
            console.log(JSON.stringify(d));
            alert('Successfully added new recipe!');
            navigate('/recipes');
        } else {
            console.log(response);
        }
    }
    const handleAddPair = () => {
        if (ingredient && ingredientAmount) {
            setSelectedIngredientAndAmount((prevPairs) => [...prevPairs, { ingredient: ingredient, amount: Number(ingredientAmount) }]);
            setIngredientsAndAmountsForDto((prevPairs) => [...prevPairs, { ingredientId: ingredient.id, amount: Number(ingredientAmount) }])
            console.log(ingredientsAndAmountsForDto)

            setIngredient('');
            setIngredientAmount('');
        }
    };

    const handleRemovePair = (index) => {
        setSelectedIngredientAndAmount((prev) => prev.filter((_, i) => i !== index));
        setIngredientsAndAmountsForDto((prev) => prev.filter((_, i) => i !== index));
    };

    return <>
        <Container maxWidth="md" sx={{ paddingTop: "15px" }}>
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '10px',
                                flexDirection: 'column',
                                alignItems: "center",
                            }}
                        >
                            <TextField
                                fullWidth
                                required
                                id="outlined-required"
                                label="Recipe title"
                                placeholder="Recipe title"
                                helperText={titleError}
                                error={titleError}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                    if (e.target.value !== "") setTitleError("");
                                    else setTitleError(errorMessageTemplate + " recipe title.");
                                }}
                            />

                            <TextField
                                fullWidth
                                required
                                type="number"
                                id="outlined-prepTime-input"
                                label="PreparationTime"
                                placeholder="PreparationTime"
                                error={preparationTimeError}
                                helperText={preparationTimeError}
                                onChange={(e) => {
                                    setPreparationTime(e.target.value);
                                    if (e.target.value !== '')
                                        setPreparationTimeError("");
                                    else setPreparationTimeError(errorMessageTemplate + " prep time.");
                                }}
                            />
                            <TextField
                                fullWidth
                                required
                                id="outlined-quantity-input"
                                label="Quantity"
                                placeholder="Quantity"
                                error={quantityError}
                                helperText={quantityError}
                                onChange={(e) => {
                                    setQuantity(e.target.value);
                                    if (e.target.value !== '')
                                        setQuantityError("");
                                    else setQuantityError(errorMessageTemplate + " quantity.");
                                }}
                            />

                            <Grid container alignItems="center" spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth error={ingredientError}>
                                        <InputLabel id="ingredient-select-label">Ingredient</InputLabel>
                                        <Select
                                            labelId="ingredient-select-label"
                                            id="ingredient-select"
                                            label="Ingredient"
                                            required
                                            onChange={(e) => {
                                                setIngredient(e.target.value);
                                                if (e.target.value !== 0) {
                                                    setIngredientError(false);
                                                } else {
                                                    setIngredientError(errorMessageTemplate + " ingredient.");
                                                }
                                            }}
                                            value={ingredient}
                                        >
                                            <MenuItem value={0}>
                                                <em>None</em>
                                            </MenuItem>
                                            {ingredients.map((a) => (
                                                <MenuItem key={a.id} value={a}>{a.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        error={ingredientAmountError}
                                        fullWidth
                                        type="number"
                                        value={ingredientAmount}
                                        onChange={(e) => {
                                            if (e.target.value < 0) e.target.value = 0;
                                            else if (e.target.value === 0) setIngredientAmountError(errorMessageTemplate + "ingredient amount.");
                                            else {
                                                setIngredientAmount(e.target.value)
                                                setIngredientAmountError(false);
                                            }
                                        }}
                                        placeholder="Amount"
                                    />
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <Button fullWidth onClick={handleAddPair}>Add</Button>
                                </Grid>
                            </Grid>

                            {selectedIngredientAndAmount.length > 0 && (
                                <Grid item xs={12} md={6}>
                                    <Box sx={{
                                        display: 'flex',
                                        gap: '10px',
                                        flexDirection: 'column',
                                        alignItems: "center",
                                    }}>
                                        <Typography variant="h6" gutterBottom>
                                            Selected ingredients:
                                        </Typography>
                                        <List sx={{ padding: 0 }}>
                                            {selectedIngredientAndAmount.map((pair, index) => (
                                                <Chip
                                                    key={index}
                                                    label={`${pair.ingredient.name}, Amount: ${pair.amount}`}
                                                    onDelete={() => handleRemovePair(index)}
                                                    deleteIcon={<DeleteIcon />}
                                                    variant="outlined"
                                                    sx={{ marginBottom: '5px' }}
                                                />
                                            ))}
                                        </List>
                                    </Box>
                                </Grid>
                            )}
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '10px',
                                flexDirection: 'column',
                                alignItems: "center",
                            }}
                        >
                            <TextField
                                multiline
                                minRows={5}
                                fullWidth
                                required
                                id="outlined-description-input"
                                label="Description"
                                placeholder="Description"
                                error={descriptionError}
                                helperText={descriptionError}
                                onChange={(e) => {
                                    setDesription(e.target.value);
                                    if (e.target.value !== "")
                                        setDesriptionError("");
                                    else setDesriptionError(errorMessageTemplate + " description.");
                                }}
                            />
                            <TextField
                                multiline
                                minRows={5}
                                fullWidth
                                required
                                id="outlined-guide-input"
                                label="Guide"
                                placeholder="Guide"
                                error={guideError}
                                helperText={guideError}
                                onChange={(e) => {
                                    setGuide(e.target.value);
                                    if (e.target.value !== "")
                                        setGuideError("");
                                    else setGuideError(errorMessageTemplate + " guide.");
                                }}
                            />
                        </Box>
                        <Button sx={{ marginTop: '15px' }} variant="contained" color="primary" onClick={save}>
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    </>

}

export default NewRecipe;