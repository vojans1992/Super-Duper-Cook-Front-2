import { useEffect } from "react";
import { useState } from "react";
import ShowUser from "./ShowUser";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {Box,Button,Container,Grid,TextField}from"@mui/material";


const ShowUsers = () => {
    const[search, setSearch] = useState ('');
    const allUsers = useLoaderData();
    const [users, setUsers] = useState(allUsers);


    const navigate = useNavigate();
    const handleDelete = (userId) => {
        const su = users.filter((u) => u.id !== userId);
        setUsers(su);
    };
    useEffect (()=> {
        if (search === '') {
        } else {
            setUsers(allUsers.filter((u) => u.nsername.toUpperCase().includes(search.toUpperCase())));
        }
    },[search])
    return(
        <Container>
            <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 3,}}>   
            </Box>

            <TextField
                    sx={{ width: "100%" }}
                    fullWidth
                    required
                    id="outlined-required"
                    label="Username"
                    placeholder="Username"
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />
                
                <Button variant="contained" onClick={() => navigate("new_user")}>
                    {" "}
                    Add new user{" "}
                </Button>

                <Grid conteiner specing={3}>
                    {users.map((u)=> (
                        <ShowUser user={u} onDelete={handleDelete}/>
                    ))}
                </Grid>
        </Container>
    )


};

export default ShowUsers;