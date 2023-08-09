import { Box, Container} from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { DataGrid  } from "@mui/x-data-grid";
import { CardActions, Tooltip, IconButton, Button} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { allIcons } from "./Icons";
import { useState } from "react";


const ShowAllergens = () => {

  const allergens = useLoaderData();
  const [showAllergens, setShowAllergens] = useState(allergens);

  const rows = [...showAllergens];

  const handleDelete = (allergenId) => {

    console.log("handle delete" + allergenId);

    const filterAllergen = showAllergens.filter((a) => a.id !== allergenId);
    setShowAllergens(filterAllergen);
  };

  const navigate = useNavigate();

  const deleteAllergen = async (e, params) => {

    console.log("za brisanje " + params.id);

    let response = await fetch(`http://localhost:8080/api/v1/allergens/${params.id}`, {
      method: "DELETE",
      headers: {
        //Authorization: user.token,
        "Content-Type": "application/json",
      },
    });

    console.log(response);

    if (response.ok) {
      console.log("uspesno obrisan allergen");
      alert("Allergen successfully deleted");
      handleDelete(params.id);
    } else {
      console.log("greska prilikom brisanja");
    }
  };

const columns = [

    { field: "id", headerName: "Id", width: 200 },
    {
      field: "name", 
      headerName: "Allergen name", 
      width: 250, 
      editable: false,
    },
    {
       field: "icon",
       headerName: "Allergen icon",
       width: 250,
       editable: false,
    },
    {
        width: 250, 
        editable: false,
        renderCell: (params) => {

            return (
              <CardActions sx={{justifyContent: "center" }}>

          <Tooltip title="Delete">
            <IconButton aria-label="delete"  onClick={(e) => deleteAllergen(e, params.row)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip> 
          </CardActions>
          
            )
          }
      }

    ];
  
  
    return (
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "100%",
            width: '100%',
            margin: 'auto',
            marginTop: 10,
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            rowHeight={48}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
          />
        </Box>

        
        <Button sx={{color: "black", background: "#dcdcdc", marginTop: "15px"}} variant="contained" onClick={() => navigate("add_new_allergen")}>
                    {" "}
                    ADD NEW ALLERGEN{" "}
                </Button>
      </Container>
    );
  };

  export default ShowAllergens;