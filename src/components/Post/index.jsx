/* eslint-disable react/prop-types */
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SyncIcon from "@mui/icons-material/Sync";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IosShareIcon from "@mui/icons-material/IosShare";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { NavLink } from "react-router-dom";
import { useState } from "react";
import ActionButton from "./components/ActionButton";

function Post({ post }) {
  const [favorite, setFavorite] = useState(false);

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorite(!favorite);
  };

  return (
    <NavLink
      to="/detail-post"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Box
        padding="1rem"
        borderTop="1px solid #ccc"
        sx={{
          display: "flex",
          "&:hover": {
            backgroundColor: "#eee",
          },
        }}
      >
        <Box sx={{ pr: 1 }}>
          <AccountCircleIcon sx={{ fontSize: 45 }} />
        </Box>
        <Box flexGrow="1">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", flexWrap: "wrap", overflow: "hidden" }}>
              <Typography sx={{ fontSize: "15px", mr: "6px", fontWeight: 600 }}>
                Nguyen Truong An
              </Typography>
              <Typography sx={{ fontSize: "15px", mr: "6px", color: "#555" }}>
                @michael
              </Typography>
              <Typography sx={{ fontSize: "15px", mr: "6px", color: "#555" }}>
                . now
              </Typography>
            </Box>
            <ActionButton name="post" id={post.id} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "15px",
                color: "#555",
                mb: 2,
                textAlign: "start",
              }}
            >
              {post.caption}
            </Typography>
          </Box>
          {post.imageURL.length > 0 && (
            <Box sx={{ borderRadius: "10px", overflow: "hidden" }}>
              <ImageList cols={post.imageURL.length > 1 ? 2 : 1}>
                {post.imageURL.slice(0, 3).map((item, index) => (
                  <ImageListItem key={index}>
                    <img
                      srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      src={`${item}?w=164&h=164&fit=crop&auto=format`}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
                {post.imageURL.slice(3, 4).map((item, index) => (
                  <ImageListItem
                    key={index}
                    sx={{
                      position: "relative",
                    }}
                  >
                    <img
                      srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      src={`${item}?w=164&h=164&fit=crop&auto=format`}
                      loading="lazy"
                    />
                    {post.imageURL.length > 4 && (
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: "50%",
                          left: "50%",
                          transform: "translate(-50%, 50%)",
                          display: "flex",
                          alignItems: "center",
                          color: "white",
                        }}
                      >
                        <AddIcon sx={{ fontSize: 40 }} />{" "}
                        <Typography fontSize={40}>
                          {post.imageURL.length - 4}
                        </Typography>
                      </Box>
                    )}
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              mt: ".8rem",
            }}
          >
            <IconButton size="small">
              <ChatBubbleOutlineIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <SyncIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={handleFavorite}>
              {favorite ? (
                <FavoriteIcon fontSize="small" />
              ) : (
                <FavoriteBorderIcon fontSize="small" />
              )}
            </IconButton>
            <IconButton size="small">
              <IosShareIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </NavLink>
  );
}

export default Post;
