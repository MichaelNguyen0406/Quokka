import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import Button from "@mui/material/Button";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { styled } from "@mui/material/styles";

import PostModals from "../Modals/PostModals/index.jsx";
// import ProfileMore from "./components/ProfileMore.jsx";
import NavLinkTo from "./components/NavLinkTo.jsx";
import { useAuth } from "../../contexts/authContext/index.jsx";

import { useState } from "react";

const Navbar = styled(List)(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    alignItems: "center",
  },
}));

function SidebarLeft() {
  const { userDetail } = useAuth();

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "#eee",
      }}
    >
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Navbar
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <NavLinkTo to="/" Icon={HolidayVillageIcon} text="Trang Chủ" />
          <NavLinkTo
            to={`/profile/${userDetail?.id}`}
            Icon={SwitchAccountIcon}
            text="Trang cá nhân"
          />
          <NavLinkTo
            to="/bookmarks"
            Icon={CollectionsBookmarkIcon}
            text="Đã đánh dấu"
          />
          <NavLinkTo to="/list-friend" Icon={Diversity2Icon} text="Bạn bè" />
          <NavLinkTo to="/liked" Icon={Diversity1Icon} text="Đã thích" />
        </Navbar>
        <Divider sx={{ width: "100%", mb: 2 }} />
        <Box width="90%">
          <PostModals setOpenModal={setOpenModal} openModal={openModal} />
          <Box onClick={handleOpenModal} minWidth="100%">
            <Hidden lgDown>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  borderRadius: "28px",
                  padding: "10px",
                  textTransform: "capitalize",
                }}
              >
                Post
              </Button>
            </Hidden>
            <Hidden lgUp>
              <IconButton
                variant="contained"
                color="primary"
                style={{
                  borderRadius: "28px",
                  textAlign: "center",
                  p: 0,
                }}
              >
                <AddCircleOutlineIcon
                  sx={{ width: "1.5em", height: "1.5em" }}
                />
              </IconButton>
            </Hidden>
          </Box>
        </Box>
        <Divider sx={{ width: "100%", mt: 2 }} />
      </Box>
      {/* <ProfileMore /> */}
    </Box>
  );
}

export default SidebarLeft;
