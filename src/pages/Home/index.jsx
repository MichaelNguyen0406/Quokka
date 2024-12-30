import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AssistantIcon from "@mui/icons-material/Assistant";
import CircularProgress from "@mui/material/CircularProgress";

import AddPost from "../../components/AddPost";
import Post from "../../components/Post";

import useFireStore from "../../hooks/useFireStore";
import { getDocumentById } from "../../firebase/service";

import { useState, useEffect } from "react";
export default function Home() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const option = {
    orderBy: {
      field: "createdAt",
      value: "desc",
    },
  };
  const postsApi = useFireStore("posts", option);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsWithUserDetails = await Promise.all(
          postsApi.map(async (post) => {
            return new Promise((resolve) => {
              getDocumentById(
                "users",
                post.user_id,
                ({ displayName, photoURL }) => {
                  resolve({ displayName, photoURL, ...post });
                }
              );
            });
          })
        );

        setPosts(postsWithUserDetails);
      } catch (error) {
        console.log("Error fetching posts or user data: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (postsApi) {
      fetchPosts();
    }
  }, [postsApi]);

  return (
    <Box height="100vh">
      <Box borderBottom="1px solid #ccc" padding="8px 20px">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6" fontWeight="bold">
              Home
            </Typography>
          </Grid>
          <Grid item>
            <IconButton>
              <AssistantIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ height: "90vh", overflowY: "scroll" }}>
        <AddPost />
        {loading ? (
          <Box textAlign="center">
            <CircularProgress />
          </Box>
        ) : (
          <Box textAlign="center">
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
