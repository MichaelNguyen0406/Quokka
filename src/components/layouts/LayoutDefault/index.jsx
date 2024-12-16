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

const SidebarLayout = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
}));

const HomeLayout = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    width: "100%",
  },
}));

// eslint-disable-next-line react/prop-types
function LayoutDefault({ children }) {
  return (
    <Box maxWidth="1400px" sx={{ m: "0 auto" }}>
      <Grid container>
        <SidebarLayout item lg={2.5}>
          <Item>
            <SidebarLeft />
          </Item>
        </SidebarLayout>
        <HomeLayout item md={12} lg={6}>
          <Item>{children}</Item>
        </HomeLayout>
        <SidebarLayout item lg={3.5}>
          <Item>
            <SidebarRight />
          </Item>
        </SidebarLayout>
      </Grid>
    </Box>
  );
}

export default LayoutDefault;
