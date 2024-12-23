import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AssistantIcon from "@mui/icons-material/Assistant";

import AddPost from "../../components/AddPost";
import Post from "../../components/Post";

import useFireStore from "../../hooks/useFireStore";

export default function Home() {
  const posts = useFireStore("post");

  return (
    <Box minHeight="100vh">
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
      <Box sx={{ overflowY: "scroll" }}>
        <AddPost />
        <Box textAlign="center">
          {posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
