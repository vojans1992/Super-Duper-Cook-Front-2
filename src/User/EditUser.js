import { Box, Button, Container, FormControl, FormHelperText, InputLabel, MenuItem, Rating, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const EditUser = () => {

    const navigate = useNavigate();
    const user = useLoaderData();
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState(user.password);
    const [role, setRole] = useState(user.role);
    const [globalError, setGlobalError] = useState(false);
    const errorMessageTemplate = "Please fill ";
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [roleError, setRoleError] = useState("");


    const update = async () => {
        if (username == "" || password == "" || role == "") {
            setGlobalError("Please fill in the blanks.");
            return;
        }
        const new_user = {
            username: username,
            password: password,
            role: role
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
                    id="outlined-password-input"
                    label="Password:"
                    value={password}
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
                <TextField
                    sx={{ width: "100px" }}
                    fullWidth
                    required
                    id="outlined-role-input"
                    label="Role:"
                    value={role}
                    error={roleError}
                    helperText={roleError}
                    onChange={(e) => {
                        setRole(e.target.value);
                        if (e.target.value === "")
                            setRoleError(
                                errorMessageTemplate +
                                "correct role"
                            );
                        else setRoleError("");
                    }}
                />
                <Button variant="contained"
                    onClick={update}
                    disabled={
                        usernameError || passwordError || roleError
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