import {
  Box,
  Button,
  TextField,
  Container,
  FormHelperText,
  FormControl,
  InputLabel,
  MenuItem,
  Select, 
  AppBar, 
  Toolbar, 
  Typography,
  IconButton
} from "@mui/material";

import { allIcons } from "./Icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "@mui/icons-material";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const AddNewAllergen = () => {

  const navigate = useNavigate();

  const [icons, setIcons] = useState([]);

  const [name, setName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");


  const [nameError, setNameError] = useState("");
  const [globalError, setGlobalError] = useState(false);
  const errorMessageTemplate = "Please enter the ";


  const save = async () => {

    if (name === "" || selectedIcon === "") {
      setGlobalError("Please fill all fields in the form");
      return;
    }

    const new_allergen = {
      name: name,
      icon: selectedIcon
    };

    const result = await fetch("http://localhost:8080/api/v1/allergen", {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": JSON.parse(localStorage.getItem('user')).token
      },
      body: JSON.stringify(new_allergen),
    });


    if (result.ok) {
      let d = await result.json();
      console.log(JSON.stringify(d));
      alert("Allergen added successfully ");
      navigate("/allergens");
    } else {
      console.log("Failed to add new allergen");
    }
  };

  return ( 
    <Container maxWidth="sm">

      <AppBar position="static" color="transparent">
        <Toolbar>
       
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Add new allergen
          </Typography>  
          <IconButton onClick={() => { navigate('/allergens') }}>
            <ArrowBackRoundedIcon />
          </IconButton>        
        </Toolbar>
      </AppBar>
      <Box
        component="form"
        sx={{
          display: "flex",
          gap: "10px",
          marginTop: "10%",
          "flex-direction": "column",
          "align-items": "center",
          "& .MuiTextField-root": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >

        <TextField
          sx={{ width: "100%", input: { color: 'white' } }}
          fullWidth
          required
          label="Allergen name"
          placeholder="Allergen name"
          helperText={nameError}
          error={nameError === "" ? false : true}
          onChange={(e) => {
            setName(e.target.value);
            if (e.target.value !== "")
              setNameError("");
            else
              setNameError(errorMessageTemplate + " name of the allergen.");
          }}
        />


        <FormControl sx={{ width: '100%', marginBottom: 4, marginTop: 4 }}>
          <InputLabel id="demo-select-small-label">Allergen</InputLabel>

          <Select
            labelId="demo-select-small-label"
            label="Teacher"
            onChange={(e) => {
              setSelectedIcon(e.target.value);
            }
            }
          >
            {allIcons.map((g) => (

              <MenuItem value={g.name}>
                <Box
                  component="img"
                  label={g.name}
                  sx={{

                    marginRight: "5%",
                    height: 30,
                    width: 30,
                    maxHeight: { xs: 70, md: 70 },
                    maxWidth: { xs: 70, md: 70 },
                    "align-items": "right"

                  }}
                  alt="Allergen icon."
                  src={g.icon}
                />

                {
                  g.name.substring(5).toUpperCase()
                }
              </MenuItem>

            ))}
          </Select>
        </FormControl>

        <Button
          sx={{ color: "black", background: "#dcdcdc", width: '100%' }}
          onClick={save}
          disabled={
            nameError
          }
        >

          {" "}
          Save{" "}
        </Button>

        <FormHelperText error={globalError}>{globalError}</FormHelperText>
      </Box>
    </Container>
  );

};

export default AddNewAllergen;