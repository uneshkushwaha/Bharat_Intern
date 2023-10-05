const express = require("express");
const {
    getAllUsers,
    registerController,
    loginController,
} = require("../controllers/userController");

//router object
const router = express.Router();

// CREATE USER || POST
router.post("/register", registerController);

// GET ALL USERS || GET
router.get("/all-users", getAllUsers);


//LOGIN || POST
router.post("/login", loginController);

module.exports = router;