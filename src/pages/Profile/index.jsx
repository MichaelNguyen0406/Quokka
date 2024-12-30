import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import CircularProgress from "@mui/material/CircularProgress";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import DateRangeIcon from "@mui/icons-material/DateRange";

import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import useFireStore from "../../hooks/useFireStore";
import Post from "../../components/Post";

import { useState, useEffect } from "react";
import { getDocumentById } from "../../firebase/service";

import Header from "../../components/Header";

export default function Profile() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userDetail } = useAuth();
  const { id } = useParams();
  const option = {
    condition: {
      field: "user_id",
      operator: "==",
      value: id,
    },
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
        console.log("Error fetching posts or user data:: ", error);
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
      <Header
        pageName={userDetail?.displayName}
        postCount={userDetail?.listPost}
      />
      <Box sx={{ overflowY: "scroll", height: "92vh" }}>
        <Box position="relative" height="195px" sx={{ bgcolor: "#eee" }}>
          {userDetail?.backgroundURL && (
            <img
              style={{ objectFit: "cover" }}
              width="100%"
              height="100%"
              src={userDetail?.backgroundURL}
              alt="background"
            />
          )}
          <Box
            sx={{
              position: "absolute",
              top: 120,
              left: 15,
              background: "#eee",
              padding: "3px",
              borderRadius: "50%",
            }}
          >
            <Avatar
              sx={{ width: "150px", height: "150px" }}
              src={userDetail?.photoURL}
              alt="profile"
            />
          </Box>
        </Box>
        <Box textAlign="right" padding="10px 20px">
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
          <IconButton>
            <MailOutlineIcon />
          </IconButton>

          <Button
            size="small"
            sx={{
              textTransform: "capitalize",
              padding: "6px 20px",
              background: "black",
              "&:hover": {
                background: "#333",
              },
            }}
            variant="contained"
          >
            Follow
          </Button>
        </Box>
        <Box padding="20px 20px" textAlign="start">
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {userDetail?.displayName}
          </Typography>
          <Typography sx={{ fontSize: "14px", color: "#555" }}>
            @michael
          </Typography>
          <Typography fontSize="16px" color="#333" padding="10px 0">
            Keep your dream alive
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            padding="6px 0"
            flexWrap="wrap"
          >
            <Box display="flex">
              <LocationOnIcon htmlColor="#555" />
              <Typography sx={{ ml: "6px", color: "#555" }}>aaa</Typography>
            </Box>
            <Box display="flex" marginLeft="1rem">
              <InsertLinkIcon htmlColor="#555" />
              <Link sx={{ textDecoration: "none", marginLeft: "6px" }}>
                www
              </Link>
            </Box>
            <Box display="flex" marginLeft="1rem">
              <DateRangeIcon htmlColor="#555" />
              <Typography sx={{ ml: "6px", color: "#555" }}>aaa</Typography>
            </Box>
          </Box>
          <Box display="flex">
            <Typography color="#555" marginRight="1rem">
              <strong style={{ color: "black" }}>23 </strong>
              Following
            </Typography>
            <Typography color="#555" marginRight="1rem">
              <strong style={{ color: "black" }}>23 </strong>
              Followers
            </Typography>
          </Box>
        </Box>

        {loading ? (
          <Box>
            <CircularProgress />
          </Box>
        ) : (
          <Box borderBottom="1px solid #ccc">
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
