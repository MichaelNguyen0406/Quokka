import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IosShareIcon from "@mui/icons-material/IosShare";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState, useEffect } from "react";

import { updateCollectionFieldById } from "../../../firebase/service";
import { useAuth } from "../../../contexts/authContext";
import { arrayUnion, arrayRemove } from "firebase/firestore";

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

  const handleFavorite = async () => {
    setFavorite(!favorite);
    if (favorite) {
      await updateCollectionFieldById(
        "users",
        userDetail.id,
        "listLike",
        arrayRemove(postId)
      );
    } else {
      await updateCollectionFieldById(
        "users",
        userDetail.id,
        "listLike",
        arrayUnion(postId)
      );
    }
  };

  const handleBookmark = () => {
    setBookmark(!bookmark);
  };

  const handleStopPropagation = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <Box
      onClick={handleStopPropagation}
      sx={{
        display: "flex",
        justifyContent: "space-around",
        mt: ".8rem",
      }}
    >
      <IconButton
        size="small"
        sx={{
          display: "flex",
          alignItems: "center",
          fontSize: "14px",
          gap: "5px",
        }}
      >
        <ChatBubbleOutlineIcon fontSize="small" />
        {commentCount != 0 && commentCount}
      </IconButton>
      <IconButton
        size="small"
        sx={{
          display: "flex",
          alignItems: "center",
          fontSize: "14px",
          gap: "5px",
        }}
      >
        <IosShareIcon fontSize="small" />
        {shareCount != 0 && shareCount}
      </IconButton>
      <IconButton
        size="small"
        onClick={handleFavorite}
        sx={{
          display: "flex",
          alignItems: "center",
          fontSize: "14px",
          gap: "5px",
        }}
      >
        {favorite ? (
          <FavoriteIcon fontSize="small" />
        ) : (
          <FavoriteBorderIcon fontSize="small" />
        )}
        {likeCount != 0 && likeCount}
      </IconButton>
      <IconButton size="small" onClick={handleBookmark}>
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
