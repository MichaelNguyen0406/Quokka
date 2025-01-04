import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import { useAuth } from "../../contexts/authContext";
import { useState } from "react";

import PostModals from "../Modals/PostModals";

const ButtonPost = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    fontSize: "small",
  },
}));

export default function AddPost() {
  const { userDetail } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <Box p={1}>
      <Box display="flex" gap={2}>
        <Avatar src={userDetail?.photoURL} />
        <IconButton
          onClick={handleOpenModal}
          sx={{
            borderRadius: "20px",
            display: "flex",
            justifyContent: "flex-start",
            padding: ".5rem 1rem",
            mb: 2,
            flex: "1",
          }}
        >
          <Typography sx={{ color: "#999" }}>Bạn đang nghĩ gì?</Typography>
        </IconButton>
      </Box>
      <hr />
      <Box
        textAlign="right"
        paddingTop=".5rem"
        // width="30px"
      >
        <ButtonPost
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
        >
          Post
        </ButtonPost>
        <PostModals openModal={openModal} setOpenModal={setOpenModal} />
      </Box>
    </Box>
    // <Box padding="1rem 1rem 0 1rem">
    //   <Grid container>
    //     <Grid item sx={{ paddingRight: "1rem" }}>
    //       <Avatar src={userDetail?.photoURL} />
    //     </Grid>
    //     <Grid item flexGrow="1">
    //       <IconButton
    //         sx={{
    //           borderRadius: "20px",
    //           display: "flex",
    //           justifyContent: "flex-start",
    //           padding: ".5rem 1rem",
    //           mb: 2,
    //           width: "100%",
    //         }}
    //       >
    //         <Typography sx={{ color: "#999" }}>Bạn đang nghĩ gì?</Typography>
    //       </IconButton>

    //     </Grid>
    //   </Grid>
    // </Box>
  );
}
