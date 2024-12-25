import SidebarLeft from "../../SidebarLeft";
import SidebarRight from "../../SidebarRight";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#f8f9fb",
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "inherit",
  }),
}));

const SidebarLayoutRight = styled(Box)(({ theme }) => ({
  width: "320px",
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
  [theme.breakpoints.down("lg")]: {
    flex: 1,
  },
}));

// eslint-disable-next-line react/prop-types
function LayoutDefault({ children }) {
  return (
    <Box
      maxWidth="1300px"
      sx={{
        m: "0 auto",
        bgcolor: "background.default",
        display: "flex",
        position: "relative",
      }}
    >
      <SidebarLayoutLeft position="fixed">
        <Item>
          <SidebarLeft />
        </Item>
      </SidebarLayoutLeft>
      <SidebarLayoutLeft />
      <HomeLayout flex={1}>
        <Item>{children}</Item>
      </HomeLayout>
      {/* <SidebarLayoutRight /> */}
      <SidebarLayoutRight>
        <Item>
          <SidebarRight />
        </Item>
      </SidebarLayoutRight>
    </Box>
  );
}

export default LayoutDefault;
