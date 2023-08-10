import { Navigation } from "@mui/icons-material";
import { Box, Button, Container, FormControl, FormHelperText, InputLabel, MenuItem, Rating, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const EditUser = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state.user;
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState(user.password);
    const [globalError, setGlobalError] = useState(false);
    const errorMessageTemplate = "Please fill ";
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");


    const update = async () => {
        if (username == "" || password == "") {
            setGlobalError("Please fill in the blanks.");
            return;
        }
        const new_user = {
            username: username,
            password: password
        };
        let response = await fetch(`http://localhost:8080/api/v1/users/${user.id}`, {
            method: "PUT",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Authorization": JSON.parse(localStorage.getItem('user')).token,
                "Accept": "application/json"
            },
            body: JSON.stringify(new_user),
        });
        console.log(response);
        if (response.ok) {
            let u = await response.json();
            console.log(JSON.stringify(u));
            alert("Successfull made the change");
            navigate("/users");
        } else {
            console.log("Changes are unsuccessful.");

        }
    };
    return (
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
                    sx={{ width: "100px" }}
                    fullWidth
                    required
                    id="outlined-username-input"
                    label="Username:"
                    value={username}
                    error={usernameError}
                    helperText={usernameError}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        if (e.target.value === "")
                            setUsernameError(
                                errorMessageTemplate +
                                "correct username."
                            );
                        else setUsernameError("");
                    }}
                />
                <TextField
                    sx={{ width: "100px" }}
                    fullWidth
                    required
                    type="password"
                    id="outlined-password-input"
                    label="New password:"
                    //value={password}
                    error={passwordError}
                    helperText={passwordError}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        if (e.target.value === "")
                            setPasswordError(
                                errorMessageTemplate +
                                "correct password"
                            );
                        else setPasswordError("");
                    }}
                />
                <Button variant="contained"
                    onClick={update}
                    disabled={
                        usernameError || passwordError
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

export default EditUser;