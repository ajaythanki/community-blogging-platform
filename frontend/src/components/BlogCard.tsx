import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Chip, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IBlogCard } from "../types";
import AlertDialog from "./Dialog";
import { useState } from "react";
import { useDeleteBlogMutation } from "../redux/features/blog/hooks/useBlog";

export default function BlogCard({
  title,
  description,
  thumbnail,
  author,
  createdAt,
  _id,
  isAuthor,
  category,
  tags,
}:IBlogCard&{isAuthor:boolean}) {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/blog-details/${_id}`);
  };
  const [open, setOpen] = useState(false);
  
  const {mutateAsync} = useDeleteBlogMutation();
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    setOpen(false);
    if(_id) mutateAsync(_id);
  };


  return (
    <>
    <Card
      sx={{
        width: "100%",
        margin: "auto",
        height: "100%",
        mt: 2,
        padding: 2,
        // minHeight:"518px",
        boxShadow: "5px 5px 10px #ccc",
        ":hover:": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>{category}</Typography>
      </Box>

      <CardMedia
        component="img"
        height="194"
        image={thumbnail.url}
        alt={title}
      />
      <CardContent sx={{ textAlign: "left", px:0 }}>
        <Typography
          variant="h4"
          color="text.primary"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: "2",
            overflow: "hidden",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            my: 1,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: "2",
            overflow: "hidden",
          }}
        >
          {description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection:"column",
            alignItems: "start",
          }}
        >
          <Typography sx={{ my: 1 }}>
            {Math.ceil(description.split(" ").length / 200)} min read
          </Typography>
          <Box sx={{ display: "flex", flexWrap:"wrap", gap: 1 }}>
            {tags.map((tag: string) => (
              <Chip size="small" label={tag} key={tag} />
            ))}
          </Box>
        </Box>
      </CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: red[500], p:0, mt:0.5 }}
                src={author.username}
                alt={author.username}
              ></Avatar>
            }
            title={author.username}
            subheader={new Date(createdAt).toLocaleDateString()}
          />
        </Box>

        {isAuthor && (
          <Box display={"flex"}>
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditIcon color="info" />
            </IconButton>
            <IconButton onClick={handleClickOpen}>
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        )}
      </Box>
    </Card>
      <AlertDialog open={open} handleDelete={handleDelete} handleClose={handleClose}/>
    </>
  );
}

