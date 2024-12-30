/* eslint-disable react/prop-types */
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { NavLink } from "react-router-dom";
import ActionButton from "./components/ActionButton";

import postTime from "../../helper/postTime";
import PostInteraction from "../PostInteration";
import AvatarPost from "./components/AvatarPost";
import ImageShow from "./components/ImageShow";

function Post({ post }) {
  return (
    <NavLink
      to={`/detail-post/${post?.id}`}
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
        <AvatarPost photoURL={post?.photoURL} userId={post?.user_id} />
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
                {post?.displayName}
              </Typography>
              <Typography sx={{ fontSize: "15px", mr: "6px", color: "#555" }}>
                {postTime(post.createdAt.toDate())}
              </Typography>
            </Box>
            <ActionButton name="posts" id={post?.id} />
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
              {post?.caption}
            </Typography>
          </Box>
          {post?.imageURL?.length > 0 && (
            <ImageShow imageURLs={post.imageURL} />
          )}
          <PostInteraction
            commentCount={post?.commentCount}
            likeCount={post?.likeCount}
            shareCount={post}
            postId={post?.id}
          />
        </Box>
      </Box>
    </NavLink>
  );
}

export default Post;
