//this is for the blog not for the user that's why blogModel.js is created
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: [true, "title is required"],
        },
        description: {
            type: String,
            required: [true, "description is require"],
        },
        image: {
            type: String,
            required: [true, "image is require"],
        },
        user: {
            type: mongoose.Types.ObjectId,//this is the id of the user
            ref: "User",//this is the reference of the user entity
            require: [true, "user id is required"],
        },
    },
    { timestamps: true }//this is for the time stamp eg: created at and updated at
);

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;