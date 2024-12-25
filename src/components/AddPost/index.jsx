import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";

import { useAuth } from "../../contexts/authContext";

const ButtonPost = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    fontSize: "small",
  },
}));

export default function AddPost() {
  const { userDetail } = useAuth();

  return (
    <Box padding="1rem 1rem 0 1rem">
      <Grid container>
        <Grid item sx={{ paddingRight: "1rem" }}>
          <Avatar src={userDetail?.photoURL} />
        </Grid>
        <Grid item flexGrow="1">
          <Box padding=".5rem 0">
            <Input
              multiline
              disableUnderline
              type="text"
              placeholder="What's happening?"
              sx={{ width: "100%" }}
            />
          </Box>
          <Box
            textAlign="right"
            paddingBottom=".5rem"
            paddingTop=".5rem"
            borderTop="1px solid #ccc"
          >
            <ButtonPost variant="contained" color="primary">
              Post
            </ButtonPost>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
