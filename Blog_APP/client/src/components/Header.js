import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    AppBar,
    Toolbar,
    Button,
    Typography,
    Tabs,
    Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//useSelector is used to get the state from the store and useDispatch is used to dispatch the action to the store
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Header = () => {
    // global state from redux store using useSelector so that we can use it in our component to check whether the user is logged in or not.ONly the logged in user can see the blogs
    let isLogin = useSelector((state) => state.isLogin);
    isLogin = isLogin || localStorage.getItem("userId");
    const dispatch = useDispatch();//in simple words it is used to dispatch the action to the store eg: login,logout.when we login the other components displays eg: blogs,create blog,my blogs
    const navigate = useNavigate();
    //state
    const [value, setValue] = useState(0);

    //logout
    const handleLogout = () => {
        try {
            dispatch(authActions.logout());
            toast.success("Logout Successfully");
            navigate("/login");
            localStorage.clear();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h4">My Blog APP</Typography>
                    {/* if the user is logged in then only show the tabs */}
                    {isLogin && (
                        <Box display={"flex"} marginLeft="auto" marginRight={"auto"}>
                            <Tabs
                                textColor="inherit"
                                value={value}
                                onChange={(e, val) => setValue(val)}
                            >
                                <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                                <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                                <Tab label="Create Blog" LinkComponent={Link} to="/create-blog" />




                            </Tabs>
                        </Box>
                    )}
                    <Box display={"flex"} marginLeft="auto">
                        {!isLogin && (
                            <>
                                <Button
                                    sx={{ margin: 1, color: "white" }}
                                    LinkComponent={Link}
                                    to="/login"
                                >
                                    Login
                                </Button>
                                <Button
                                    sx={{ margin: 1, color: "white" }}
                                    LinkComponent={Link}
                                    to="/register"
                                >
                                    Register
                                </Button>
                            </>
                        )}
                        {isLogin && (
                            // if the user is logged in then show the logout button
                            <Button onClick={handleLogout} sx={{ margin: 1, color: "white" }}>
                                Logout
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;