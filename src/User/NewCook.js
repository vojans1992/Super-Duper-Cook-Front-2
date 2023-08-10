import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, FormHelperText, Box, Button, Container, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';


const UserForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [globalError, setGlobalError] = useState(false);
    const errorMessageTempalate = "Please fill in the blanks ";
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();


    const save = async () => {

        if (username == '0' || password == '') {
            setGlobalError("Please fill in the blanks.");
            return;
        }
        const new_user = {
            username: username,
            password: password
        };

        let response = await fetch("http://localhost:8080/api/v1/cook", {
            method: "POST",
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
            alert("You have successfully registered");
            navigate("/users");
        } else {
            console.log("Adding user failed.");
        }
    };

    return (<Container maxWidth="sm">


        <AppBar position="static" color="transparent">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Add new cook
                </Typography>
                <IconButton onClick={() => { navigate('/users') }}>
                    <ArrowBackRoundedIcon />
                </IconButton>
            </Toolbar>
        </AppBar>

        <Box
            component="form"
            sx={{
                display: "flex",
                marginTop: 3,
                gap: "10px",
                "flex-direction": "column",
                "align-items": "center",
                "& .MuiTextField-root": { m: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off">
            <TextField
                sx={{ width: "100%" }}
                fullWidth
                required
                id="outlined-required"
                label="Username"
                placeholder="Username"
                error={usernameError}
                helperText={usernameError}
                onChange={(e) => {
                    setUsername(e.target.value);
                    if (e.target.value === "")
                        setUsernameError(
                            errorMessageTempalate +
                            "correct username."
                        );
                    else setUsernameError("");
                }}
            />
            <TextField
                sx={{ width: "100%" }}
                fullWidth
                required
                type="password"
                id="outlined-required"
                label="Password"
                placeholder="Password"
                error={passwordError}
                helperText={passwordError}
                onChange={(e) => {
                    setPassword(e.target.value);
                    if (e.target.value === "")
                        setPasswordError(
                            errorMessageTempalate +
                            "correct password."
                        );
                    else setPasswordError("");
                }}
            />
            <Button variant="contained"
                onClick={save}
                disabled={
                    usernameError || passwordError
                }
            >
                {" "}
                Add new cook{" "}
            </Button>
            <FormHelperText error={globalError}>{globalError}</FormHelperText>
        </Box>
    </Container>

    );
};

export default UserForm;