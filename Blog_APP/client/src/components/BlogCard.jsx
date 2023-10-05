import * as React from 'react';
import { useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";







export default function BlogCard({
    title,
    description,
    image,
    username,
    time,
    id,
    isUser,
}) {


    //edit and delete icon of the card if the user is the owner of the post
    const navigate = useNavigate();
    const handleEdit = () => {
        navigate(`/blog-details/${id}`);
    };

    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
            // console.log(data);
            if (data?.success) {
                alert("Blog Deleted");
                window.location.reload();//refresh the page or redirect to the home page i.e blogs
            }
        } catch (error) {
            console.log(error);
        }
    };



    // Step 1: Add a state variable for tracking favorite status
    const [isFavorite, setIsFavorite] = useState(false);

    // Step 2: Toggle favorite status when clicking on the heart icon
    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
    };


    return (
        <Card
            sx={{
                width: "40%",
                margin: "auto",
                mt: 2,
                padding: 2,
                boxShadow: "5px 5px 10px #ccc",
                ":hover:": {
                    boxShadow: "10px 10px 20px #ccc",
                },
            }}
        >
            {/* //edit and delete icon of the card if the user is the owner of the post */}
            {isUser && (
                <Box display={"flex"}>

                    <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
                        <ModeEditIcon color="info" />
                    </IconButton>

                    <IconButton onClick={handleDelete}>
                        <DeleteIcon color="error" />
                    </IconButton>
                </Box>
            )}

            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {username}
                    </Avatar>

                }

                title={username}
                subheader={time}
            />
            {/* //media of the card */}
            <CardMedia
                component="img"
                height="400"
                image={image}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="h6" color='#ff8c00'>
                    Title : {title}
                </Typography>
                <Typography variant="body2" color="black">
                    Description : {description}
                </Typography>
            </CardContent>

            {/* //like and share icon of the card */}
            <CardActions disableSpacing>

                <IconButton aria-label="add to favorites" onClick={handleFavoriteClick}>
                    {/* Toggle between filled and outline heart icons */}
                    {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>



            </CardActions>





        </Card>
    );
}
