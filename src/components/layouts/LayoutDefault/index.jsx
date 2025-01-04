import SidebarLeft from "../../SidebarLeft";
import SidebarRight from "../../SidebarRight";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#eee",
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "inherit",
  }),
  outline: "none",
}));

const SidebarLayoutRight = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  width: "280px",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const SidebarLayoutLeft = styled(Box)(({ theme }) => ({
  width: "280px",

  [theme.breakpoints.down("lg")]: {
    width: "70px",
  },
}));

const HomeLayout = styled(Box)(({ theme }) => ({
  // flex: 1,
  width: "700px",
  minHeight: "90vh",
  [theme.breakpoints.down("xl")]: {
    flex: 1,
  },
}));

import Header from "../../Header copy";

// eslint-disable-next-line react/prop-types
function LayoutDefault({ children }) {
  return (
    <>
      <Header />
      <Toolbar />
      <Box
        // maxWidth="1300px"
        sx={{
          m: "0 auto",
          bgcolor: "background.default",
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <SidebarLayoutLeft position="fixed" left={0}>
          {/* <Item> */}
          <SidebarLeft />
          {/* </Item> */}
        </SidebarLayoutLeft>
        <SidebarLayoutLeft />
        <HomeLayout>{children}</HomeLayout>
        <SidebarLayoutRight />
        <SidebarLayoutRight position="fixed" right={0}>
          {/* <Item> */}
          <SidebarRight />
          {/* </Item> */}
        </SidebarLayoutRight>
      </Box>
    </>
  );
}

export default LayoutDefault;
