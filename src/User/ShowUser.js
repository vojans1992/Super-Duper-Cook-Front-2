
import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Grid, IconButton, Tooltip } from "@mui/material";
import { CardMedia, CardActions, CardContent, Card, CardHeader, Stack } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";


const ShowUser = (user, onDelete) => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    //  const [user, setUser] = useState(null);
    //   const [password, setPassword] = useState(user.password);


    const logout = () => {
        localStorage.removeItem('user');
        setIsLogin(false);
        navigate('/')
    }
    const deleteUser = async () => {

        let response = await fetch(`http://localhost:8080/api/v1/users/${user.user.id}`, {
            method: "DELETE",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Authorization": JSON.parse(localStorage.getItem('user')).token,
                "Accept": "application/json"

            },
        });

        if (response.ok) {
            let d =  response;
            console.log("you have successfully deleted the user");
            alert("You have successfully deleted the user");
            navigate("/users");
        } else {
            console.log("an error occurred, the user was not deleted.");
        }
    };

    return (
        <Grid item xs={4}>
            <Card sx={{ maxWidth: 350 }} variant="outlined">
                <CardHeader
                    sx={{ display: "flex", textAlign: "center" }}
                    title={user.username}
                />
                <CardMedia
                    sx={{ height: 140 }}
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
                            {user.user.username}
                        </Grid>
                        <Grid item xs={6} >
                            Role:
                        </Grid>
                        <Grid item xs={6}>
                            {user.user.role.name}
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                    <Stack direction="row" spacing={2}>
                        <Tooltip title="Edit">
                            <IconButton onClick={e => {
                                navigate(`/users/${user.id}`, {state: {user: user.user}});
                            }}>
                                <Edit />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete">
                            <IconButton aria-label="delete" onClick={deleteUser}>
                                <Delete />
                            </IconButton>
                        </Tooltip>


                    </Stack>
                </CardActions>
            </Card>
        </Grid>
    );

};

export default ShowUser;