import { Option } from "@mui/base";
import { Box, Container, TextField, FormHelperText, Button, Autocomplete, Stack, FormControl, Chip, Typography, MenuItem, InputLabel, Select, Grid } from "@mui/material";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import Menu from '../Menu';

const NewRecipe = () => {



    const [title, setTitle] = useState('');
    const [description, setDesription] = useState('');
    const [guide, setGuide] = useState('');
    const [preparationTime, setPreparationTime] = useState(0);
    const [quantity, setQuantity] = useState('');
    const [authorId, setAuthorId] = useState(0);
    const [ingredientIds, setIngredientIds] = useState([]);
    const [selectedIngredientIdAndAmount, setSelectedIngredientIdAndAmount] = useState([]);
    const [ingredientAmount, setIngredientAmount] = useState(0);
    const [ingredientId, setIngredientId] = useState(0);

    const [globalError, setGlobalError] = useState(false);
    const errorMessageTemplate = "Please enter the ";
    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDesriptionError] = useState('');
    const [guideError, setGuideError] = useState('');
    const [preparationTimeError, setPreparationTimeError] = useState(0);
    const [quantityError, setQuantityError] = useState('');
    const [authorIdError, setAuthorIdError] = useState(0);
    const [ingredientIdError, setIngredientIdError] = useState(0);
    const [ingredientAmountError, setIngredientAmountError] = useState(0);

    const loader_data = useLoaderData();
    const [ingredients, setIngredients] = useState(loader_data[0]);
    const [authors, setAuthors] = useState(loader_data[1]);

    const navigate = useNavigate();

    const save = async () => {

        if (title == '' || description == '' || guide == '' || preparationTime == 0 || quantity == '' || authorId == 0 || ingredientIds.size == 0) {
            setGlobalError('Please fill all fields in the form');
            return;
        }
        const new_recipe = {
            'title': title,
            'description': description,
            'guide': guide,
            'preparationTime': preparationTime,
            'quantity': quantity,
            'authorId': authorId,
            'ingredientIds': ingredientIds
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
        if (ingredientId && ingredientAmount) {
            setSelectedIngredientIdAndAmount((prevPairs) => [...prevPairs, { ingredientId: ingredientId, amount: Number(ingredientAmount) }]);


            setIngredientId('');
            setIngredientAmount('');
        }
    };

    return <>
    <Menu/>
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
                            {/* <Typography variant="h6">
                                Please enter the values of the new recipe.
                            </Typography> */}

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

                            <FormControl
                                sx={{ width: "100%", marginBottom: "15px" }}
                                error={authorIdError}
                            >
                                <InputLabel id="demo-select-small-label">Author</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="author-select"
                                    label="Author"
                                    required
                                    onChange={(e) => {
                                        setAuthorId(e.target.value);
                                        if (e.target.value == 0) {
                                            setAuthorIdError(true);
                                        } else {
                                            setAuthorIdError(false);
                                        }
                                    }}
                                    value={authorId}
                                >
                                    <MenuItem value={0}>
                                        <em>None</em>
                                    </MenuItem>
                                    {authors.map((a) => (
                                        <MenuItem value={a.id}> {a.username}</MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{authorIdError}</FormHelperText>
                            </FormControl>

                            {/* <FormControl sx={{ width: "100%" }} error={ingredientIdsError}>
                                <Stack direction='column'>
                                     <Typography> Ingredients</Typography> 

                                    <Stack direction='row'>
                                        {ingredientIds.map((a, ii) => (
                                            <Chip
                                                label={a}
                                                onDelete={() => {
                                                    const a = ingredientIds.filter((v, i) => i !== ii);
                                                    setIngredientIds(a);
                                                }}
                                            />
                                        ))}
                                    </Stack>

                                    <Stack direction='row' sx={{ width: '110%' }}>
                                        <Autocomplete
                                            options={ingredients.filter((a) =>
                                                ingredientIds.every((vv) => vv !== a.name)
                                            )}
                                            getOptionLabel={(a) => a.name}
                                            renderInput={(params) => <TextField {...params} />}
                                            sx={{ width: "90%" }}
                                            value={selectedIngredientId}
                                            onChange={(e, v) => setSelectedIngredientId(v)}
                                        />
                                    </Stack>
                                    <Stack direction='row' sx={{ width: '100%' }}>
                                        <Button
                                            disabled={selectedIngredientId === null}
                                            onClick={() => {
                                                if (selectedIngredientId != null) {
                                                    let a = ingredientIds;
                                                    a.push(selectedIngredientId.id);
                                                    setIngredientIds(a);
                                                    setSelectedIngredientId(null);
                                                }
                                            }}
                                        >
                                            Add ingredient
                                        </Button>
                                    </Stack>
                                </Stack>
                            </FormControl> 

                            <Button
                                onClick={save}
                                disabled={
                                    titleError ||
                                    quantityError ||
                                    authorIdError ||
                                    ingredientIdsError
                                }
                            >
                                Save
                            </Button>
                            <FormHelperText error={globalError}>{globalError}</FormHelperText> */}
                            <Grid>
                                <Select
                                    sx={{ width: '80%' }}
                                    value={ingredientId}
                                    error={ingredientIdError}
                                    onChange={
                                        (e) => {
                                            setIngredientId(e.target.value);
                                            if (e.target.value !== 0) {
                                                setIngredientIdError(0);
                                            } else {
                                                setIngredientIdError(errorMessageTemplate + " ingredient id.")
                                            }
                                        }
                                    }
                                >
                                    <MenuItem value={0}>
                                        <em>None</em>
                                    </MenuItem>
                                    {ingredients.map((a) => (
                                        <MenuItem value={a.id}> {a.name}</MenuItem>
                                    ))}
                                </Select>
                                <TextField
                                    sx={{ width: '20%' }}
                                    type="number"
                                    value={ingredientAmount}
                                    onChange={(e) => setIngredientAmount(e.target.value)}
                                    placeholder="Amount"
                                />
                                <Button onClick={handleAddPair}>Add ingredient</Button>
                            </Grid>
                            <Grid>
                                <h3>Selected ingredients:</h3>
                                <ul>
                                    {selectedIngredientIdAndAmount.map((pair, index) => (
                                        <li key={index}>
                                            IngredientId: {pair.ingredientId}, Amount: {pair.amount}
                                        </li>
                                    ))}
                                </ul>
                            </Grid>
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
                                minRows='5'
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
                                minRows='5'
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
                    </Grid>
                </Grid>
            </form>
        </Container>
    </>

}

export default NewRecipe;