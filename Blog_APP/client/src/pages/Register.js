import React, { useState } from "react";
//useState is used to hold the state value  so that we can send it to the backend
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();
    //state
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
    });

    //handle input change
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,//spread operator is used to copy the previous state or make it as it is
            [e.target.name]: e.target.value,
        }));
    };

    //form handle
    const handleSubmit = async (e) => {
        e.preventDefault();
        //we are using axios to send the data to the backend i.e network request
        try {

            const { data } = await axios.post("/api/v1/user/register", {
                username: inputs.name,
                email: inputs.email,
                password: inputs.password,
            });
            if (data.success) {
                toast.success("User Register Successfully");
                navigate("/login");
            }

        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box
                    maxWidth={450}
                    display="flex"
                    flexDirection={"column"}
                    alignItems="center"
                    justifyContent={"center"}
                    margin="auto"
                    marginTop={5}
                    boxShadow="10px 10px 20px #ccc"
                    padding={3}
                    borderRadius={5}
                >
                    <Typography
                        variant="h4"
                        sx={{ textTransform: "uppercase" }}
                        padding={3}
                        textAlign="center"
                    >
                        Register
                    </Typography>
                    <TextField
                        placeholder="name"
                        value={inputs.name}//from inputs state
                        onChange={handleChange}//use to change the value of the state or write the value in the state
                        name="name"
                        margin="normal"
                        type={"text"}
                        required
                    />
                    <TextField
                        placeholder="email"
                        value={inputs.email}
                        name="email"
                        margin="normal"
                        type={"email"}
                        required
                        onChange={handleChange}
                    />
                    <TextField
                        placeholder="password"
                        value={inputs.password}
                        name="password"
                        margin="normal"
                        type={"password"}
                        required
                        onChange={handleChange}
                    />

                    <Button
                        type="submit"
                        sx={{ borderRadius: 3, marginTop: 3 }}
                        variant="contained"
                        color="primary"
                    >
                        Submit
                    </Button>
                    <Button
                        onClick={() => navigate("/login")}
                        sx={{ borderRadius: 3, marginTop: 3 }}
                    >
                        Already Registerd ? Please Login
                    </Button>
                </Box>
            </form>
        </>
    );
};

export default Register;