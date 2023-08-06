import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material";
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import Container from "@mui/material";

const UserForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const [globalError, setGlobalError] = useState(false);
    const errorMessageTempalte = "Please fill in the blanks ";
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [roleError, setRoleError] = useState("");

    const [user, setUser] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const u = localStorage.getItem("user");
        if (u) {
            setUser(JSON.parse(u));
            setIsLogin(true);
        }
    }, [isLogin])

    const save = async () => {
        if (username == '0' || password == '' || role == '') {
            setGlobalError("Please fill in the blanks.");
            return;
        }
        const new_user = {
            username: username,
            password: password,
            role: role
        };

        let respons = await fetch("http://localhost:8080/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(new_user),
        });
        console.log(respons);
        if (respons.ok) {
            let u = await respons.json();
            alert("You have successfully registered");
            navigate("/user");
        } else {
            console.log("Adding user failed.");
        }

    };

    return (<Container maxWidth="sm">
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
            autoComplete="off">
            <TextField>
                sx={{ width: "100%" }}
                fullWidth
                required
                id="outlined-required"
                label="Username"
                placeholder="Username"
                error={usernameError}
                helperText= {usernameError}
                onChange={(e) => {
                    setUsername(e.target.value);
                    if (e.target.value === "")
                        setUsernameError(
                            errorMessageTemplate +
                            "correct username."
                        );
                    else setUsernameError("");
                }}
            </TextField>
            <TextField>
                sx={{ width: "100%" }}
                fullWidth
                required
                id="outlined-required"
                label="Password"
                placeholder="Password"
                error={passwordErrorError}
                helperText= {passwordError}
                onChange={(e) => {
                    setPassword(e.target.value);
                    if (e.target.value === "")
                        setPasswordError(
                            errorMessageTemplate +
                            "correct password."
                        );
                    else setPasswordError("");
                }}
            </TextField>
            <TextField>
                sx={{ width: "100%" }}
                fullWidth
                required
                id="outlined-required"
                label="Role"
                placeholder="Role"
                error={roleError}
                helperText= {roleError}
                onChange={(e) => {
                    setRole(e.target.value);
                    if (e.target.value === "")
                        setRoleError(
                            errorMessageTemplate +
                            "correct role."
                        );
                    else setRoleError("");
                }}
            </TextField>
            <Button variant="contained"
                onClick={save}
                disabled={
                    usernameError || passwordError || roleError
                }

            >
                {" "}
                Add new user{" "}
            </Button>
            <FormHelperText error={globalError}>{globalError}</FormHelperText>
        </Box>
    </Container>

    );
};

export default UserForm;