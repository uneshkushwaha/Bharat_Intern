const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');//for hashing the password

//create user register user
exports.registerController = async (req, res) => {

    try {
        const { username, email, password } = req.body;
        //validation
        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please Fill all fields",
            });
        }

        //exisiting user
        const exisitingUser = await userModel.findOne({ email });// check if the user is already exisits
        if (exisitingUser) {
            return res.status(401).send({
                success: false,
                message: "user already exists",
            });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        //save new user
        const user = new userModel({ username, email, password: hashedPassword });
        await user.save();
        return res.status(201).send({
            success: true,
            message: "New User Created",
            user,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error In Register callback",
            success: false,
            error,
        });
    }
};



// get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        return res.status(200).send({
            userCount: users.length,//count of the users
            success: true,
            message: "all users data",
            users,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In Get ALl Users",
            error,
        });
    }
};

//login
exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: "Please provide email or password",
            });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(200).send({
                success: false,
                message: "email is not registerd",
            });
        }
        //password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: "Invlid username or password",
            });
        }
        return res.status(200).send({
            success: true,
            messgae: "login successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In Login Callcback",
            error,
        });
    }
};