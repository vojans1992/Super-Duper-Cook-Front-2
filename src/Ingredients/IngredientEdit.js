import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container, Box, TextField, Typography, Chip, Autocomplete, Stack, Button, FormControl, FormHelperText, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const InputField = ({
    label,
    placeholder,
    fieldName,
    value,
    error,
    onChange,
}) => (
    <TextField
        sx={{ width: "100%", backgroundColor: "lightcyan" }}
        fullWidth
        required
        id={`outlined-${fieldName}-input`}
        value={value}
        label={label}
        placeholder={placeholder}
        error={!!error}
        helperText={error}
        onChange={(e) => onChange(fieldName, e.target.value)}
    />
);

const IngredientEdit = () => {

    const data = useLoaderData();
    const ingredient = data[0];
    const allergens = data[1];
    const navigate = useNavigate();

    console.log(ingredient);
    console.log(allergens);

    const [selectedAllergens, setSelectedAllergens] = useState([]);
    const [selectedAllergen, setSelectedAllergen] = useState(null);

    const [formFields, setFormFields] = useState({
        name: ingredient.name,
        munit: ingredient.measurementUnit,
        calories: ingredient.calories,
        chydrate: ingredient.carboHydrate,
        sugar: ingredient.sugar,
        fat: ingredient.fat,
        saturatedFat: ingredient.saturatedFat,
        protein: ingredient.protein,
        allergens: ingredient.allergens,
    });

    const [formErrors, setFormErrors] = useState({
        name: "",
        munit: "",
        calories: "",
        chydrate: "",
        sugar: "",
        fat: "",
        saturatedFat: "",
        protein: "",
        allergens: "",
        global: "",
    });

    const validateDecimal = (value, fieldName) => {
        const isValid = /^\d+(\.\d{1,2})?$/.test(value);
        return isValid
            ? ""
            : `Please enter a valid ${fieldName.toLowerCase()} value. It is compulsory to have a dot ('. ') in a text for a decimal value.`;
    };

    const handleFieldChange = (fieldName, value) => {
        setFormFields((prevFields) => ({
            ...prevFields,
            [fieldName]: value,
        }));

        if (value !== "") {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                [fieldName]: "",
            }));
        } else {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                [fieldName]: `Please enter the ${fieldName.toLowerCase()}.`,
            }));
        }

        if (fieldName === "munit") {
            const isValidMeasurement = /\b\d+(?:\.\d+)?[A-Z]*(?:\/[A-Z]+)?\b/.test(value);
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                munit: isValidMeasurement
                    ? ""
                    : "Please enter a valid measurement unit. A measurement unit is valid if it has at least one digit and letter for measurement unit. Example: 100 g, 100 ml, 200 g...",
            }));
        } else if (fieldName === "calories") {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                calories: validateDecimal(value, "Calories"),
            }));
        } else if (fieldName === "chydrate") {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                chydrate: validateDecimal(value, "Carbo Hydrate"),
            }));
        } else if (fieldName === "sugar") {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                sugar: validateDecimal(value, "Sugar"),
            }));
        } else if (fieldName === "fat") {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                fat: validateDecimal(value, "fat"),
            }));
        } else if (fieldName === "saturatedFat") {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                saturatedFat: validateDecimal(value, "saturatedFat"),
            }));
        } else if (fieldName === "protein") {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                protein: validateDecimal(value, "protein"),
            }));
        }
    };

    const handleAllergenChange = (selectedAllergens) => {
        setSelectedAllergens(selectedAllergens);

        if (selectedAllergens.length === 0) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                allergens: "Please select at least one allergen",
            }));
        } else {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                allergens: "",
            }));
        }
    };

    const updateIngredient = async () => {

        const { name, munit, calories, chydrate, sugar, fat, saturatedFat, protein, allergens } = formFields;

        if (!name || !munit || !calories || !chydrate || !sugar || !fat || !saturatedFat || !protein || selectedAllergens.length === 0) {
            setFormErrors({ ...formErrors, global: "Please fill all fields in the form" });
            return;
        }

        setFormErrors({ ...formErrors, global: "" });

        const newIngredient = {
            name,
            measurementUnit: munit,
            calories,
            carboHydrate: chydrate,
            sugar,
            fat,
            saturatedFat,
            protein,
            allergens: selectedAllergens
        };
        console.log("Payload:", JSON.stringify(newIngredient));

        try {
            const response = await fetch(`http://localhost:8080/api/v1/ingredients/dto/${ingredient.id}`, {
                method: "PUT",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": JSON.parse(localStorage.getItem('user')).token,
                    "Accept": "application/json"
                },
                body: JSON.stringify(newIngredient),
            });

            if (response.ok) {
                const d = await response.json();
                console.log(JSON.stringify(d, null, 4));
                alert("Successfully updated ingredient.");
                navigate('/ingredients');
            } else {
                console.log("Failed to update ingredient");
                console.log(await response.text());
                console.log(response.statusText);
            }
        } catch (error) {
            console.error("An error occurred:", error);
            console.log("Response Status:", error.response.status);
            console.log("Response Data:", error.response.data);
        }
    };

    const isFormValid = () => {
        const errors = Object.values(formErrors);
        return errors.every((error) => !error);
    };

    return <div className="ingredient-container">
        <Container maxWidth="sm">

            <Box sx={{ display: "flex", alignItems: "left" }}>
                <IconButton onClick={() => { navigate('/ingredients') }}>
                    <ArrowBackRoundedIcon />
                </IconButton>
                <Typography variant="h6">Please edit the values of the selected ingredient:</Typography>
            </Box>

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
                <InputField
                    label="Ingredient name"
                    placeholder="Ingredient name"
                    fieldName="name"
                    value={formFields.name}
                    error={formErrors.name}
                    onChange={handleFieldChange}
                />
                <InputField
                    label="Measurement Unit"
                    placeholder="Measurement Unit"
                    fieldName="munit"
                    value={formFields.munit}
                    error={formErrors.munit}
                    onChange={handleFieldChange}
                />
                <InputField
                    label="Calories"
                    placeholder="Calories"
                    fieldName="calories"
                    value={formFields.calories}
                    error={formErrors.calories}
                    onChange={handleFieldChange}
                />
                <InputField
                    label="CarboHydrate"
                    placeholder="CarboHydrate"
                    fieldName="chydrate"
                    value={formFields.chydrate}
                    error={formErrors.chydrate}
                    onChange={handleFieldChange}
                />
                <InputField
                    label="Sugar"
                    placeholder="Sugar"
                    fieldName="sugar"
                    value={formFields.sugar}
                    error={formErrors.sugar}
                    onChange={handleFieldChange}
                />

                <InputField
                    label="Fat"
                    placeholder="Fat"
                    fieldName="fat"
                    value={formFields.fat}
                    error={formErrors.fat}
                    onChange={handleFieldChange}
                />
                <InputField
                    label="SaturatedFat"
                    placeholder="SaturatedFat"
                    fieldName="saturatedFat"
                    value={formFields.saturatedFat}
                    error={formErrors.saturatedFat}
                    onChange={handleFieldChange}
                />
                <InputField
                    label="Protein"
                    placeholder="Protein"
                    fieldName="protein"
                    value={formFields.protein}
                    error={formErrors.protein}
                    onChange={handleFieldChange}
                />

                <FormControl sx={{ width: "100%" }} error={!!formErrors.allergens}>

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

                <Button
                    variant="contained"
                    onClick={updateIngredient}
                    disabled={!isFormValid()}
                >
                    Save
                </Button>
                <FormHelperText error={!!formErrors.global}>{formErrors.global}</FormHelperText>

            </Box>
        </Container>
    </div>
}
export default IngredientEdit;