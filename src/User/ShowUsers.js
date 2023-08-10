//import { useEffect } from "react";
import { useState } from "react";
import ShowUser from "./ShowUser";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Container, Stack, TextField, AppBar, Toolbar, Typography, IconButton, FormControl, Box } from "@mui/material";
import { Home } from "@mui/icons-material";


const ShowUsers = () => {
    //   const[search, setSearch] = useState ('');
    const allUsers = useLoaderData();
    const [users, setUsers] = useState(allUsers);

    const navigate = useNavigate();


    const search = (value) => {
        //pretraga usera
        if (value == "") {   //ako je u pretrazi vrednost null onda nam prikazuje sve usere
            setUsers(allUsers);
        } else {
            const u = allUsers.filter(u => u.username.toLowerCase().includes(value.toLowerCase())); //filtriramo po imenu prebacimo u mala slova i onda  includes value koja se unosi
            setUsers(u); //setujemo showUsers
        }
    }
    const handleDelete = (userId) => {
        const su = users.filter((u) => u.id !== userId);
        setUsers(su);
    };
    /*  useEffect (()=> {
          if (search === '') {
          } else {
              setUsers(allUsers.filter((u) => u.username.toUpperCase().includes(search.toUpperCase())));
          }
      },[search])
      */
    return (
        <Container>
            <AppBar position="static" color="transparent" sx={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <Toolbar>
                    <IconButton onClick={() => { navigate('/') }} color="inherit">
                        <Home />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Users
                    </Typography>

                    <FormControl sx={{ width: "75%", mr: 2 }}>
                        <TextField placeholder="Search..." onChange={e => search(e.target.value)} sx={{ width: "30%", flexGrow: 1 }} />
                    </FormControl>
                    {JSON.parse(localStorage.getItem('user')).role === "ROLE_ADMIN" ?
                        <Button variant="outlined" onClick={() => { navigate('/users/new_cook') }}>Add New Cook </Button> : <></>}
                </Toolbar>
            </AppBar>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    height: "100%",
                    width: '100%',
                    margin: 'auto',
                    marginTop: 3,
                }}
            >
                <Container sx={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gridAutoRows: "auto", gridGap: "20px" }}>
                    {users.map((u) => <ShowUser user={u} onDelete={handleDelete} />)}
                </Container>
            </Box>
        </Container>


    )


};

export default ShowUsers;