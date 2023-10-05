import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();//in simple words it is used to dispatch the action to the store eg: login,logout.when we login the other components displays eg: blogs,create blog,my blogs
    //state
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    //handle input change
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    //form handle
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/user/login", {
                email: inputs.email,
                password: inputs.password,
            });
            if (data.success) {
                localStorage.setItem("userId", data?.user._id);//we are storing the user id in the local storage so that we can use it in the other components eg: while creating the blog we need the user id to store the blog in the database so that it can be blog is created by which user
                dispatch(authActions.login());//in simple words it is used to dispatch the action to the store eg: login,logout.when we login the other components displays eg: blogs,create blog,my blogs
                toast.success("User login Successfully");
                navigate("/");
            }
            else {
                toast.error("Please Register first.");
            }
        } catch (error) {
            console.log(error);

        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box
                    maxWidth={650}
                    display="flex"
                    flexDirection={"column"}
                    alignItems="center"
                    justifyContent={"center"}
                    margin="auto"
                    marginTop={8}
                    boxShadow="12px 12px 20px #ccc"
                    padding={3}
                    borderRadius={5}
                    height="500px"
                >
                    <Typography
                        variant="h3"
                        sx={{ textTransform: "uppercase" }}
                        padding={3}
                        textAlign="center"
                    >
                        Login
                    </Typography>

                    <TextField

                        placeholder="email"
                        value={inputs.email}
                        name="email"
                        margin="normal"
                        type={"email"}
                        required
                        onChange={handleChange}
                        sx={{ width: 350 }} />
                    <TextField
                        placeholder="password"
                        value={inputs.password}
                        name="password"
                        margin="normal"
                        type={"password"}
                        required
                        onChange={handleChange}
                        sx={{ width: 350 }}
                    />

                    <Button
                        type="submit"
                        sx={{ width: 250, borderRadius: 3, marginTop: 3 }}
                        variant="contained"
                        color="primary"
                    >
                        Submit
                    </Button>
                    <Button
                        onClick={() => navigate("/register")}
                        sx={{ borderRadius: 3, marginTop: 3 }}
                    >
                        Not a user ? Please Register
                    </Button>
                </Box>
            </form>
        </>
    );
};

export default Login;