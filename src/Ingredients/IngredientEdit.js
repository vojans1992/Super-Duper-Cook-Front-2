import { useLoaderData, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, TextField, Container, FormControl, InputLabel, Select, MenuItem, FormHelperText, Button} from "@mui/material";


const IngredientEdit = () => {

   
    const data = useLoaderData();
    const ingredient = data[0];
    const allergen = data[1];

    console.log(ingredient);
    console.log(allergen);

    const navigate = useNavigate();

    const [name, setName] = useState(ingredient.name);
    const [munit, setMunit] = useState(ingredient.measurementUnit);
    const [calories, setCalories] = useState(ingredient.calories);
    const [chydrate, setChydrate] = useState(ingredient.carboHydrate);
    const [sugar, setSugar] = useState(ingredient.sugar);
    const [fat, setFat] = useState(ingredient.fat);
    const [saturatedFat, setSaturatedFat] = useState(ingredient.saturatedFat);
    const [protein, setProtein] = useState(ingredient.protein);
    const [allergens, setAllergens] = useState(ingredient.allergens);
 

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

    
    
    const updateIngredient = async () => {

        if (name == '' || munit == '' || calories == '' || chydrate == '' || sugar == '' || fat == '' || saturatedFat == '' || protein == '') {
            setGlobalError('Please fill all fields in the form');
            return;
        }
        console.log(name);
        console.log(allergens);

        const new_ingredient = {
            'name': name,
            'measurementUnit': munit,
            'calories': calories,
            'carboHydrate': chydrate,
            'sugar': sugar,
            'fat': fat,
            'saturatedFat': saturatedFat,
            'protein': protein,
            'allergens': [allergens]
        };
        let response = await fetch(`http://localhost:8080/api/v1/ingredients/dto/${ingredient.id}`, {
            method: "PUT",
            //mode: 'cors',
            headers: {
                "Content-Type": "application/json"
                //  "Authorization": JSON.parse(localStorage.getItem('user')).token,
                //  "Accept": "application/json"
            },
             body: JSON.stringify(new_ingredient),
        });
        console.log(response);
        if (response.ok) {
            let d = await response.json();
            console.log(JSON.stringify(d, null, 4));
            alert("Uspesno ste izmenili sastojak.");
            navigate("/ingredients");
        } else {
            console.log("Izmena sastojka nije uspela");
            console.log(await response.text()); // Log the response body
            console.log(response.statusText); // Log the status text
        }
    }

    return <>
        <Container maxWidth="sm">
            <Box
                component="form"
                sx={{
                    display: "flex",
                    gap: "10px",
                    "flex-direction": "column",
                    "align-items": "center",
                    "& .MuiTextField-root": { m: 1, width: "100%" },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    sx={{ width: "100%" }}
                    fullWidth
                    required
                    id="outlined-required"
                    value={name}
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
                    value={munit}
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
                    value={calories}
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
                    value={chydrate}
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
                    value={sugar}
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
                    value={fat}
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
                    value={saturatedFat}
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
                    value={protein}
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

                <FormControl sx={{ width: "100%" }} >
                    <InputLabel id="select-allergen-label">Allergens</InputLabel>
                    <Select
                        labelId="select-allergen-label"
                        id="allergen-select"
                        label="Allergens"
                        // value={allergens}
                        required
                        onChange={(e) => {
                            setAllergens(e.target.value);
                            if (e.target.value == 0) {
                                setAllergenError("Please select the allergen");
                            } else {
                                setAllergenError("");
                            }
                        }}
                    >
                        <MenuItem value="0">
                            <em>None</em>
                        </MenuItem>
                        {allergen.map((a) => (
                            <MenuItem value={a.name}> {a.name} </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{allergenError}</FormHelperText>
                </FormControl>

                <Button
                    onClick={updateIngredient}
                   
                >
                  
                    Save
                </Button>
                <FormHelperText error={globalError}>{globalError}</FormHelperText>


            </Box>
        </Container>
    </>













}
export default IngredientEdit;