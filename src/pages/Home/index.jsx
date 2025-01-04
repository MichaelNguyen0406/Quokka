import Box from "@mui/material/Box";

import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import AddPost from "../../components/AddPost";
import Post from "../../components/Post";

import useFireStore from "../../hooks/useFireStore";
import { getDocumentById } from "../../firebase/service";

import { useState, useEffect } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#eee",
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "inherit",
  }),
  outline: "none",
  marginBottom: "1rem",
}));

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
      setLoading(true);
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
    <>
      {/* <Item>
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
      </Item> */}
      <Box>
        <Item>
          <AddPost />
        </Item>
        {loading ? (
          <Box textAlign="center" sx={{ height: "100px" }}>
            <CircularProgress sx={{ width: "40px", height: "40px" }} />
          </Box>
        ) : (
          <Box textAlign="center">
            {posts.map((post, index) => (
              <Item key={index}>
                <Post post={post} />
              </Item>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
}
