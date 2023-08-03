
import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import{CardMedia,CardActions,CardContent,Card,CardHeader,Stack} from"@mui/material";


const ShowUser = (user, onDelete) => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
//    const [user, setUser] = useState(user.username);
 //   const [password, setPassword] = useState(user.password);


    const logout = () => {
        localStorage.removeItem('user');
        setIsLogin(false);
        navigate('/')
    }
    const deleteUser = async () => {

        let response = await fetch("http://localhost:8080/api/v1/users/${user.id}", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",

            },
        });

        if (response.ok) {
            let d = await response;
            console.log("you have successfully deleted the user");
            onDelete(user.id);
            alert("You have successfully deleted the user");
            navigate("/users");
        } else {
            console.log("an error occurred, the user was not deleted.");
        }
    };

    return (
        <Grid item xs={4}>
            <Card sx={{ maxWidth: 345 }} variant="outlined">
                <CardHeader
                    sx={{ display: "flex", textAlign: "center" }}
                    title={user.username}
                />
                <CardMedia
                    sx={{ height: 240 }}
                    image="https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_960_720.png"
                    title={user.picture}
                />
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Grid container spacing={3} alignItems='center' justifyContent='space-between' sx={{ padding: '5px' }}>
                        <Grid item xs={6} >
                            Username:
                        </Grid>
                        <Grid item xs={6}>
                            {user.username}
                        </Grid>
                        <Grid item xs={6} >
                            Password:
                        </Grid>
                        <Grid item xs={6}>
                            {user.password}
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                    <Stack direction="row" spacing={2}>
                        <Button color="secondary" onClick={() => navigate(`edit_user/${user.id}`)} >Edit </Button>
                        <Button variant="outlined" color="error" onClick={deleteUser} >
                            Delete
                        </Button>
                    </Stack>
                </CardActions>
            </Card>
        </Grid>
    );   

};

export default ShowUser;