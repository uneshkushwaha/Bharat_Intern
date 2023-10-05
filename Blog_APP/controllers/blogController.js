const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");//this is for the user



//Create Blog
exports.createBlogController = async (req, res) => {
    try {
        const { title, description, image, user } = req.body;
        //validation
        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: "Please Provide ALl Fields",
            });
        }
        const exisitingUser = await userModel.findById(user);
        //validaton
        if (!exisitingUser) {
            return res.status(404).send({
                success: false,
                message: "unable to find user",
            });
        }

        const newBlog = new blogModel({ title, description, image, user });
        /*you are performing two separate operations within a single transaction: creating a new blog and updating the user's blogs array. If either operation fails, the changes are rolled back. This is the reason to use mongodb session*/

        const session = await mongoose.startSession();//In simple words, a session allows you to define a series of steps in which some data is going to be modified. If any of the steps fails, the data is rolled back to the previous state.
        session.startTransaction();//start the transaction
        await newBlog.save({ session });// Save the new blog within the session
        exisitingUser.blogs.push(newBlog);  // Push the new blog into the user's 'blogs' array
        await exisitingUser.save({ session });//saving the user or// Push the new blog into the user's 'blogs' array
        await session.commitTransaction();//it means that the transaction is completed or changes are saved

        await newBlog.save();
        return res.status(201).send({
            success: true,
            message: "Blog Created!",
            newBlog,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error WHile Creting blog",
            error,
        });
    }
};

//GET ALL BLOGS
exports.getAllBlogsController = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate("user");
        if (!blogs) {
            return res.status(200).send({
                success: false,
                message: "No Blogs Found",
            });
        }
        return res.status(200).send({
            success: true,
            BlogCount: blogs.length,
            message: "All Blogs lists",
            blogs,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error WHile Getting Blogs",
            error,
        });
    }
};

//Update Blog
exports.updateBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image } = req.body;
        const blog = await blogModel.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true }
        );
        return res.status(200).send({
            success: true,
            message: "Blog Updated!",
            blog,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error WHile Updating Blog",
            error,
        });
    }
};

//SIngle Blog
exports.getBlogByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id);
        if (!blog) {
            return res.status(404).send({
                success: false,
                message: "blog not found with this is",
            });
        }
        return res.status(200).send({
            success: true,
            message: "fetch single blog",
            blog,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "error while getting single blog",
            error,
        });
    }
};

//Delete Blog
exports.deleteBlogController = async (req, res) => {
    try {
        const blog = await blogModel
            // .findOneAndDelete(req.params.id)//for deleting a blog based on some other criteria (e.g., title, author, etc.
            .findByIdAndDelete(req.params.id)//findByIdAndDelete is used to find the blog and delete it exactly by id
            .populate("user");//populate is used to get the data from the other collection eg: here we are getting the data from the user collection
        await blog.user.blogs.pull(blog);//pull is used to remove the blog from the user
        await blog.user.save();
        return res.status(200).send({
            success: true,
            message: "Blog Deleted!",
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Erorr WHile Deleteing BLog",
            error,
        });
    }
};

//GET USER BLOG
exports.userBlogControlller = async (req, res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate("blogs");//populate is used to get the data from the other collection eg: here we are getting the data from the blog collection


        if (!userBlog) {
            return res.status(404).send({
                success: false,
                message: "blogs not found with this id",
            });
        }
        return res.status(200).send({
            success: true,
            message: "user blogs",
            userBlog,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "error in user blog",
            error,
        });
    }
};