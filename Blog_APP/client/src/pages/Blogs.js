import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    //get blogs
    const getAllBlogs = async () => {
        try {
            const { data } = await axios.get("/api/v1/blog/all-blog");
            if (data?.success) {//if the data is successfully fetched then only set the blogs
                setBlogs(data?.blogs);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {// it is used to call the function when the component is loaded
        getAllBlogs();
    }, []);
    return (
        <div>
            {blogs &&
                blogs.map((blog) => (
                    <BlogCard
                        key={blog?._id} // Using a unique identifier as the key (e.g., blog.id)

                        id={blog?._id}
                        isUser={localStorage.getItem("userId") === blog?.user?._id}//if the user is logged in then only show the edit and delete button
                        title={blog?.title}
                        description={blog?.description}
                        image={blog?.image}
                        username={blog?.user?.username}
                        time={blog.createdAt}
                    />
                ))}
        </div>
    );
};

export default Blogs;