import { Container, Box, TextField, Typography, Chip, Autocomplete, Stack, Button, FormControl, FormHelperText } from "@mui/material";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const NewIngredient = () => {

    const [name, setName] = useState('');
    const [munit, setMunit] = useState('');
    const [calories, setCalories] = useState('');
    const [chydrate, setChydrate] = useState('');
    const [sugar, setSugar] = useState('');
    const [fat, setFat] = useState('');
    const [saturatedFat, setSaturatedFat] = useState('');
    const [protein, setProtein] = useState('');
    const [selectedAllergens, setSelectedAllergens] = useState([]);
    const [selectedAllergen, setSelectedAllergen] = useState(null);

    const [globalError, setGlobalError] = useState(false);
    const errorMessageTemplate = "Please enter the ";
    const [nameError, setNameError] = useState("");
    const [munitError, setMunitError] = useState("");
    const [caloriesError, setCaloriesError] = useState("");
    const [chydrateError, setChydrateError] = useState("");
    const [sugarError, setSugarError] = useState("");
    const [fatError, setFatError] = useState("");
    const [saturatedFatError, setSaturatedFatError] = useState("");
    const [proteinError, setProteinError] = useState("");
    const [allergenError, setAllergenError] = useState("");

    const loader_data = useLoaderData();
    const [allergens, setAllergens] = useState(loader_data[0]);

    const navigate = useNavigate();

    const save = async () => {

        if (name == '' || munit == '' || calories == '' || chydrate == '' || sugar == '' || fat == '' || saturatedFat == '' || protein == '' || selectedAllergens.size == 0) {
            setGlobalError('Please fill all fields in the form');
            return;
        }
        const new_ingredient = {
            'name': name,
            'measurementUnit': munit,
            'calories': calories,
            'carboHydrate': chydrate,
            'sugar': sugar,
            'fat': fat,
            'saturatedFat': saturatedFat,
            'protein': protein,
            'allergens': selectedAllergens
        };
        let response = await fetch('http://localhost:8080/api/v1/ingredients/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(new_ingredient)
        });
        console.log(response);
        if (response.ok) {
            let d = await response.json();
            console.log(JSON.stringify(d));
            alert('Uspesno ste dodali novi sastojak');
            navigate('/ingredients');
        } else {
            console.log('Dodavanje novog sastojka nije uspelo')
            console.log(response);
        }
    }

    return <>

        <Container maxWidth="sm" sx={{ paddingTop: "15px" }}>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    gap: '10px',
                    flexDirection: 'column',    //slozeni mogu da se pisu i ovako - "flex-direction":'column',
                    alignItems: "center",

                    "& .MuiTextField-root": { m: 1, width: "100%" },
                }}
                noValidate
                autoComplete="off">
                <Typography variant="h6">Please enter the values of the new ingredient.</Typography>

                <TextField
                    sx={{ width: "100%" }}
                    fullWidth
                    required
                    id="outlined-required"
                    label="Ingredient name"
                    placeholder="Ingredient name"
                    helperText={nameError}
                    error={nameError === "" ? false : true}
                    onChange={(e) => {
                        setName(e.target.value);
                        if (e.target.value !== "") setNameError("");
                        else setNameError(errorMessageTemplate + " ingredient name.");
                    }}
                />
                <TextField
                    sx={{ width: "100px" }}
                    fullWidth
                    required
                    id="outlined-munit-input"
                    label="Measurement Unit"
                    placeholder="Measurement Unit"
                    error={munitError}
                    helperText={munitError ? munitError : "Example: 100 g, 100 ml, 200 g..."}
                    // aria-aria-errormessage='ISBN is required'
                    onChange={(e) => {
                        setMunit(e.target.value);
                        console.log(JSON.stringify(e.target.value.match(/\b\d+(?:\.\d+)?[A-Z]*(?:\/[A-Z]+)?\b/)));
                        if (e.target.value.match(/\b\d+(?:\.\d+)?[A-Z]*(?:\/[A-Z]+)?\b/) == null)
                            setMunitError(
                                errorMessageTemplate +
                                "valid measurement unit. A measurement unit is valid if it has at least one digit and letter for measurement unit."
                            );
                        else setMunitError("");
                    }}
                />
                <TextField
                    sx={{ width: "100px" }}
                    fullWidth
                    required
                    id="outlined-calories-input"
                    label="Calories"
                    placeholder="Calories"
                    error={caloriesError}
                    helperText={caloriesError}
                    onChange={(e) => {
                        setCalories(e.target.value);
                        console.log(JSON.stringify(e.target.value.match(/^\d+(\.\d{1,2})?$/)));
                        if (e.target.value.match(/^\d+(\.\d{1,2})?$/) == null)
                            setCaloriesError(
                                errorMessageTemplate +
                                " a calories value. It is compulsory to have a dot ('. ') in a text for a decimal value."
                            );
                        else setCaloriesError("");
                    }}
                />
                <TextField
                    sx={{ width: "100px" }}
                    fullWidth
                    required
                    id="outlined-CarboHydrate-input"
                    label="CarboHydrate"
                    placeholder="CarboHydrate"
                    error={chydrateError}
                    helperText={chydrateError}
                    onChange={(e) => {
                        setChydrate(e.target.value);
                        console.log(JSON.stringify(e.target.value.match(/^\d+(\.\d{1,2})?$/)));
                        if (e.target.value.match(/^\d+(\.\d{1,2})?$/) == null)
                            setChydrateError(
                                errorMessageTemplate +
                                " a Carbo Hydrate value. It is compulsory to have a dot ('. ') in a text for a decimal value."
                            );
                        else setChydrateError("");
                    }}
                />

                <TextField
                    sx={{ width: "100px" }}
                    fullWidth
                    required
                    id="outlined-Sugar-input"
                    label="Sugar"
                    placeholder="Sugar"
                    error={sugarError}
                    helperText={sugarError}
                    onChange={(e) => {
                        setSugar(e.target.value);
                        console.log(JSON.stringify(e.target.value.match(/^\d+(\.\d{1,2})?$/)));
                        if (e.target.value.match(/^\d+(\.\d{1,2})?$/) == null)
                            setSugarError(
                                errorMessageTemplate +
                                " a sugar value. It is compulsory to have a dot ('. ') in a text for a decimal value."
                            );
                        else setSugarError("");
                    }}
                />

                <TextField
                    sx={{ width: "100px" }}
                    fullWidth
                    required
                    id="outlined-Fat-input"
                    label="Fat"
                    placeholder="Fat"
                    error={fatError}
                    helperText={fatError}
                    onChange={(e) => {
                        setFat(e.target.value);
                        console.log(JSON.stringify(e.target.value.match(/^\d+(\.\d{1,2})?$/)));
                        if (e.target.value.match(/^\d+(\.\d{1,2})?$/) == null)
                            setFatError(
                                errorMessageTemplate +
                                " a fat value. It is compulsory to have a dot ('. ') in a text for a decimal value."
                            );
                        else setFatError("");
                    }}
                />

                <TextField
                    sx={{ width: "100px" }}
                    fullWidth
                    required
                    id="outlined-SaturatedFat-input"
                    label="SaturatedFat"
                    placeholder="SaturatedFat"
                    error={saturatedFatError}
                    helperText={saturatedFatError}
                    onChange={(e) => {
                        setSaturatedFat(e.target.value);
                        console.log(JSON.stringify(e.target.value.match(/^\d+(\.\d{1,2})?$/)));
                        if (e.target.value.match(/^\d+(\.\d{1,2})?$/) == null)
                            setSaturatedFatError(
                                errorMessageTemplate +
                                " a saturated fat value. It is compulsory to have a dot ('. ') in a text for a decimal value."
                            );
                        else setSaturatedFatError("");
                    }}
                />
                <TextField
                    sx={{ width: "100px" }}
                    fullWidth
                    required
                    id="outlined-Protein-input"
                    label="Protein"
                    placeholder="Protein"
                    error={proteinError}
                    helperText={proteinError}
                    onChange={(e) => {
                        setProtein(e.target.value);
                        console.log(JSON.stringify(e.target.value.match(/^\d+(\.\d{1,2})?$/)));
                        if (e.target.value.match(/^\d+(\.\d{1,2})?$/) == null)
                            setProteinError(
                                errorMessageTemplate +
                                " a protein value. It is compulsory to have a dot ('. ') in a text for a decimal value."
                            );
                        else setProteinError("");
                    }}
                />

                <FormControl sx={{ width: "100%" }} error={allergenError}>

                    <Stack direction='column'>
                        <Typography> Allergens</Typography>

                        <Stack direction='row'>
                            {
                                selectedAllergens.map((a, ii) => <Chip
                                    label={a} onDelete={() => {
                                        const a = selectedAllergens.filter((v, i) => i != ii);
                                        setSelectedAllergens(a);
                                    }}
                                />)
                            }
                        </Stack>

                        <Stack direction='row' sx={{ width: '100%' }}>
                            <Autocomplete options={
                                allergens.filter(a => selectedAllergens.every(vv => vv != a.name))}
                                getOptionLabel={a => a.name}
                                renderInput={(params) => <TextField {...params} />} sx={{ width: "90%" }}
                                value={selectedAllergen} onChange={(e, v) => setSelectedAllergen(v)} />

                            <Button disabled={selectedAllergen === null}
                                onClick={() => {

                                    if (selectedAllergen != null) {
                                        let a = selectedAllergens;
                                        a.push(selectedAllergen.name);
                                        setSelectedAllergens(a);
                                        setSelectedAllergen(null);
                                    }
                                }}
                            > Add allergen</Button>
                        </Stack>
                    </Stack>
                </FormControl>

                <Button onClick={save} disabled={nameError || munitError || caloriesError || chydrateError || sugarError
                    || fatError || saturatedFatError || proteinError || allergenError}>
                    {" "}
                    Save{" "}
                </Button>
                <FormHelperText error={globalError}>{globalError}</FormHelperText>
            </Box>
        </Container>
    </>
}

export default NewIngredient;