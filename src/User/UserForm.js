import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import  { TextField, FormHelperText } from "@mui/material";
import { Box, Button, Container  } from "@mui/material";


const UserForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const [globalError, setGlobalError] = useState(false);
    const errorMessageTempalate = "Please fill in the blanks ";
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [roleError, setRoleError] = useState("");

 //   const [user, setUser] = useState(null);
    const navigate = useNavigate();

/*
    useEffect(() => {
        const u = localStorage.getItem("user");
        if (u) {
            setUser(JSON.parse(u));
            setIsLogin(true);
        }
    }, [isLogin])
    */

    const save = async () => {
    
        if (username == '0' || password == '' || role == '') {
            setGlobalError("Please fill in the blanks.");
            return;
        }
        const new_user = {
            username: username,
            password: password
        };

        let response = await fetch("http://localhost:8080/api/v1/users", {
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
            <TextField
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
                    console.log(username)
                    if (e.target.value === "")
                        setUsernameError(
                            errorMessageTempalate+
                            "correct username."
                        );
                    else setUsernameError("");
                }}
            />
            <TextField
                sx={{ width: "100%" }}
                fullWidth
                required
                id="outlined-required"
                label="Password"
                placeholder="Password"
                error={passwordError}
                helperText= {passwordError}
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
            <TextField
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
                            errorMessageTempalate +
                            "correct role."
                        );
                    else setRoleError("");
                }}
            />
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