//import { useEffect } from "react";
import { useState } from "react";
import ShowUser from "./ShowUser";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {Button,Container,Stack,TextField}from"@mui/material";


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
    return(
        <Container>
           <Stack direction="column">
                <Stack direction="row" sx={{ padding: "30px" }}>
                    <TextField
                        sx={{ width: "80%" }}
                        fullWidth
                        required
                        id="outlined-required"
                        label="Username"
                        placeholder="Username"
                        onChange={(e) => {
                            search(e.target.value);
                        }}
                    />

                    {JSON.parse(localStorage.getItem('user')).role === "ROLE_ADMIN" ? <Button variant="outlined" onClick={() => { navigate('/users/new_cook') }}>Add New Cook </Button> : <></>}

                </Stack>

                <Container sx={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gridAutoRows: "auto", gridGap: "20px" }}>
                    {users.map((u) => <ShowUser user={u} onDelete={handleDelete} />)}
                </Container>
            </Stack>
        </Container>
    )


};

export default ShowUsers;