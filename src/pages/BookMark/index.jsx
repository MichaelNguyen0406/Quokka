import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/material/Input";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import { useState, useEffect } from "react";

import Post from "../../components/Post";
import Header from "../../components/Header";

import { getDocumentById } from "../../firebase/service";
import { useAuth } from "../../contexts/authContext";

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

function BookMark() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userDetail } = useAuth();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const displayName = userDetail.displayName;
        const photoURL = userDetail.photoURL;
        const postBookMark = await Promise.all(
          userDetail.listBookmark.map(async (postId) => {
            return new Promise((resolve) => {
              getDocumentById("posts", postId, (post) => {
                resolve({ ...post, displayName, photoURL });
              });
            });
          })
        );
        setPosts(postBookMark);
      };

      if (userDetail?.listBookmark.length > 0) {
        fetchData();
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log("Error fetching posts bookmarks: ", error);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetail?.listBookmark]);

  return (
    <Box height="100vh">
      {/* <Item>
        <Header pageName="Bookmarks" />
      </Item> */}
      <Box sx={{ height: "90vh" }}>
        <Item>
          <Box
            width="100%"
            borderRadius="28px"
            border="1px solid #eee"
            sx={{
              background: "#eee",
            }}
          >
            <Input
              type="text"
              inputProps={{
                style: { padding: "10px" },
              }}
              disableUnderline
              fullWidth
              placeholder="Tìm kiếm bài viết"
              startAdornment={
                <SearchIcon
                  sx={{
                    paddingLeft: "20px",
                    color: "#777",
                  }}
                />
              }
            />
          </Box>
        </Item>
        {userDetail?.listPost.length > 0 && loading ? (
          <Box textAlign="center">
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            {Array.isArray(posts) && posts.length > 0 ? (
              posts.map((post) => (
                <Item key={post.id}>
                  <Post post={post} />
                </Item>
              ))
            ) : (
              <Typography variant="h4">No bookmarks found</Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default BookMark;
