import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";

import { useState, useEffect } from "react";

import { updateCollectionFieldById } from "../../firebase/service";
import { useAuth } from "../../contexts/authContext";
import { arrayUnion, arrayRemove } from "firebase/firestore";

import ShareButton from "./components/ShareButton";

// eslint-disable-next-line react/prop-types
function PostInteraction({ commentCount, likeCount, shareCount, postId }) {
  const [favorite, setFavorite] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const { userDetail } = useAuth();

  useEffect(() => {
    if (userDetail?.listLike?.includes(postId)) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }, [userDetail, postId]);

  useEffect(() => {
    if (userDetail?.listBookmark?.includes(postId)) {
      setBookmark(true);
    } else {
      setBookmark(false);
    }
  }, [userDetail, postId]);

  const handleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newFavorite = !favorite;
    setFavorite(newFavorite);
    if (newFavorite) {
      await updateCollectionFieldById(
        "posts",
        postId,
        "likeCount",
        likeCount + 1
      );
      await updateCollectionFieldById(
        "users",
        userDetail.id,
        "listLike",
        arrayUnion(postId)
      );
    } else {
      await updateCollectionFieldById(
        "posts",
        postId,
        "likeCount",
        likeCount - 1
      );
      await updateCollectionFieldById(
        "users",
        userDetail.id,
        "listLike",
        arrayRemove(postId)
      );
    }
  };

  const handleBookmark = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newBookmark = !bookmark;
    setBookmark(newBookmark);
    if (newBookmark) {
      await updateCollectionFieldById(
        "users",
        userDetail.id,
        "listBookmark",
        arrayUnion(postId)
      );
    } else {
      await updateCollectionFieldById(
        "users",
        userDetail.id,
        "listBookmark",
        arrayRemove(postId)
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        mt: ".8rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <IconButton size="small">
          <ChatBubbleOutlineIcon fontSize="small" />
        </IconButton>
        <Typography
          sx={{
            fontSize: "14px",
            gap: "5px",
            opacity: commentCount ? "1" : "0",
          }}
        >
          {commentCount}
        </Typography>
      </Box>
      <ShareButton post={shareCount} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <IconButton
          size="small"
          sx={{ color: favorite ? "red" : "inherit" }}
          onClick={handleFavorite}
        >
          {favorite ? (
            <FavoriteIcon fontSize="small" />
          ) : (
            <FavoriteBorderIcon fontSize="small" />
          )}
        </IconButton>
        <Typography
          sx={{
            fontSize: "14px",
            gap: "5px",
            color: favorite ? "red" : "inherit",
            opacity: likeCount ? "1" : "0",
          }}
        >
          {likeCount}
        </Typography>
      </Box>
      <IconButton
        size="small"
        sx={{
          display: "flex",
          alignItems: "center",
          fontSize: "14px",
          gap: "5px",
          color: bookmark ? "yellow" : "inherit",
        }}
        onClick={handleBookmark}
      >
        {bookmark ? (
          <BookmarkIcon fontSize="small" />
        ) : (
          <BookmarkBorderIcon fontSize="small" />
        )}
      </IconButton>
    </Box>
  );
}

export default PostInteraction;
