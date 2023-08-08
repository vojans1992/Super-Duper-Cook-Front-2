import * as React from 'react';
import { useState } from "react";
import { useLoaderData} from "react-router-dom";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Button, Checkbox} from "@mui/material";

import { allIcons } from "./Icons";


export default function ChooseAllergens() {

    const allergens = useLoaderData();

    const [selectedAllergens, setSelectedAllergens] = useState([]);

    const handleToggle = (value) => () => {

        const currentIndex = selectedAllergens.indexOf(value);
        const newChecked = [...selectedAllergens];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setSelectedAllergens(newChecked);

    };

    const getIconByName = (name) => {

      var result = allIcons.filter( item => {
        return item.name === name
      })

      return result[0].icon
    }

    
    //to do: ovaj poziv prosledjivati kao parametar u ChooseAllergens
    //da bi se ista forma koristila za dodavanje alergena sastojku i useru 
    const handleClick = async () => {

        console.log("za slanje " + JSON.stringify(selectedAllergens));

        const result = await fetch("http://localhost:8080/api/v1/users/19/allergens", {

        method: "POST",
        mode : "cors",
        credentials: "same-origin",
          headers: { 
            Accept:"application/json",
            "Content-Type": "application/json",
          },
        body: JSON.stringify(selectedAllergens),

      });

      if (result.ok) {
        let d = await result.json();
        console.log(JSON.stringify(d));
        alert("Allergens added succesfully");
      } else {
        console.log("Failed to add allergens");
      }

    }


    return (
       
      <Box sx={{
          display: "flex",
          gap: "10px",
          "flex-direction": "column",
          "align-items": "center",
          "& .MuiTextField-root": { m: 1, width: "100%" },
        }}>


      <List sx={{ width: '100%', maxWidth: 200, bgcolor: 'background.paper' }}>

       
        {allergens.map((allergen) => {

            const labelId = `checkbox-list-label-${allergen}`;

            return (
            <ListItem
                key={allergen}
                secondaryAction={
                    
                    <Box 
                        component="img"
                        label={allergen.name}
                        sx={{
                    
                          height: 30,
                          width: 30,
                          maxHeight: { xs: 70, md: 70 },
                          maxWidth: { xs: 70, md: 70 },
                          "align-items": "right"
                      
                        }}
                        alt="Allergen icon."
                        src={getIconByName(allergen.icon)}
                    />

                }
                disablePadding>

        <ListItemButton role={undefined} onClick={handleToggle(allergen)} dense>
                  
          <ListItemIcon>
              <Checkbox
              edge="start"
              checked={selectedAllergens.indexOf(allergen) !== -1}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': labelId }}
              />
          </ListItemIcon>

          <ListItemText id={labelId} primary={`${allergen.name}`} />

        </ListItemButton>
      </ListItem>

            );

        })}
      
      </List>

      <Button sx= {{color: "black", background: "#dcdcdc"}} variant='text' onClick={handleClick}> Submit </Button> 
       
    </Box>
       
    );
}