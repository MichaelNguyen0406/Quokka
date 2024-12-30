import Button from "@mui/material/Button";
import Input from "@mui/material/Input";

import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SyncIcon from "@mui/icons-material/Sync";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IosShareIcon from "@mui/icons-material/IosShare";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useState, useEffect } from "react";

import Post from "../../components/Post";
import { comments } from "../../apis/comment";
import useFireStore from "../../hooks/useFireStore";
import { getDocumentById } from "../../firebase/service";

import Header from "../../components/Header";

// Import React Router Dom
import { useParams } from "react-router-dom";

function DetailPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const postApi = new Promise((resole) => {
      getDocumentById("posts", id, (data) => {
        resole(data);
      });
    });

    postApi.then((data) => {
      getDocumentById("users", data.user_id, ({ displayName, photoURL }) => {
        setPost({ ...data, displayName, photoURL });
      });
    });
  }, []);

  return (
    <Box>
      <Header pageName="Post" />

      <Box padding="1rem">
        <Box>
          <Box display="flex" gap="5px">
            <Box>
              <AccountCircleIcon sx={{ fontSize: 45 }} />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: "15px",
                  mr: "6px",
                  fontWeight: 600,
                  textAlign: "start",
                }}
              >
                Nguyen Truong An
              </Typography>
              <Typography
                sx={{
                  fontSize: "15px",
                  mr: "6px",
                  color: "#555",
                  textAlign: "start",
                }}
              >
                @michael
              </Typography>
            </Box>
          </Box>
          <Typography
            sx={{
              fontSize: "15px",
              color: "#555",
              mb: 2,
              textAlign: "start",
            }}
          >
            Lorem
          </Typography>
          <Box sx={{ borderRadius: "10px", overflow: "hidden", mb: "1rem" }}>
            <ImageList>
              <ImageListItem>
                <img
                  srcSet={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format`}
                  loading="lazy"
                />
              </ImageListItem>
            </ImageList>
          </Box>
          <Typography
            sx={{
              fontSize: "15px",
              color: "#999",
              mb: "1rem",
              textAlign: "start",
            }}
          >
            4:17 . Dec 18, 2024
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            py: "1rem",
            borderTop: "1px solid #ccc",
          }}
        >
          <IconButton size="small">
            <ChatBubbleOutlineIcon fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <SyncIcon fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <FavoriteBorderIcon fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <IosShareIcon fontSize="small" />
          </IconButton>
        </Box>
        {/*Comment */}
        <Box display="flex" borderTop="1px solid #ccc" pt="1rem" gap={2}>
          <Box>
            <AccountCircleIcon sx={{ fontSize: 45 }} />
          </Box>
          <Box
            flex={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Input fullWidth placeholder="Post your comment" disableUnderline />
            <Box>
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{
                  borderRadius: "20px",
                  padding: "8px 20px",
                  textTransform: "capitalize",
                }}
              >
                Reply
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        {/* {comments.map((comment, index) => (
          <Post post={comment} key={index} />
        ))} */}
      </Box>
    </Box>
  );
}

export default DetailPost;
