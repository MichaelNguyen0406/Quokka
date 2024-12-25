/* eslint-disable react/prop-types */
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";

import { NavLink } from "react-router-dom";
import ActionButton from "./components/ActionButton";

import postTime from "../../helper/postTime";
import PostInteraction from "./components/PostInteraction";

import { getDocumentById } from "../../firebase/service";
import { useEffect, useState } from "react";

function Post({ post }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userRef = await getDocumentById("users", post.user_id);
        setUser(userRef);
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.user_id]);

  return loading ? (
    <Box sx={{ width: "100%" }}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  ) : (
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
          <Avatar src={user?.photoURL} />
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
                {user?.displayName}
              </Typography>
              <Typography sx={{ fontSize: "15px", mr: "6px", color: "#555" }}>
                {postTime(post.createdAt.toDate())}
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
          <PostInteraction
            commentCount={post.commentCount}
            likeCount={post.likeCount}
            shareCount={post.shareCount}
            postId={post.id}
          />
        </Box>
      </Box>
    </NavLink>
  );
}

export default Post;
