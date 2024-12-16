import SidebarLeft from "../../SidebarLeft";
import SidebarRight from "../../SidebarRight";

import Grid from "@mui/material/Grid";
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

const SidebarLayoutRight = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const SidebarLayoutLeft = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    width: "90px",
  },
}));

const HomeLayout = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    flex: 1,
  },
}));

// eslint-disable-next-line react/prop-types
function LayoutDefault({ children }) {
  return (
    <Box maxWidth="1300px" sx={{ m: "0 auto", bgcolor: "background.default" }}>
      <Grid container>
        <SidebarLayoutLeft item lg={2.5}>
          <Item>
            <SidebarLeft />
          </Item>
        </SidebarLayoutLeft>
        <HomeLayout item lg={6}>
          <Item>{children}</Item>
        </HomeLayout>
        <SidebarLayoutRight item md={3.5}>
          <Item>
            <SidebarRight />
          </Item>
        </SidebarLayoutRight>
      </Grid>
    </Box>
  );
}

export default LayoutDefault;
