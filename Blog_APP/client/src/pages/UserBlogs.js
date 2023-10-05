import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
const UserBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    //get user blogs
    const getUserBlogs = async () => {
        try {
            //only those blogs which match with the user id will be displayed
            const id = localStorage.getItem("userId");
            const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
            if (data?.success) {
                setBlogs(data?.userBlog.blogs);//we are setting the blogs in the state so that we can display the blogs in the user blogs page
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserBlogs();
    }, []);
    console.log(blogs);
    return (
        <div>
            {blogs && blogs.length > 0 ? (
                blogs.map((blog) => (
                    <BlogCard
                        key={blog._id}
                        id={blog._id}
                        isUser={true}
                        title={blog.title}
                        description={blog.description}
                        image={blog.image}
                        username={blog.user.username}
                        time={blog.createdAt}
                    />
                ))
            ) : (
                <h1>You Havent Created a blog</h1>
            )}
        </div>
    );
};

export default UserBlogs;