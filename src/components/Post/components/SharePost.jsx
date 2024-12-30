import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { NavLink } from "react-router-dom";

import postTime from "../../helper/postTime";
import AvatarPost from "./components/AvatarPost";
import ImageShow from "./components/ImageShow";

// eslint-disable-next-line react/prop-types
function SharePost({ sharePost = [] }) {
  return (
    <NavLink
      to={`/detail-post/${sharePost?.id}`}
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
        {sharePost?.imageURL && <ImageShow imageURLs={sharePost.imageURL} />}
        <Box display="flex" alignItems="center">
          <AvatarPost
            photoURL={sharePost?.photoURL}
            userId={sharePost?.user_id}
          />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
                overflow: "hidden",
                textAlign: "start",
              }}
            >
              <Typography sx={{ fontSize: "15px", mr: "6px", fontWeight: 600 }}>
                {sharePost?.displayName}
              </Typography>
              <Typography sx={{ fontSize: "13px", mr: "6px", color: "#555" }}>
                {postTime(sharePost.createdAt.toDate())}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </NavLink>
  );
}

export default SharePost;
