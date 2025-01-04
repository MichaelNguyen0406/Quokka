import { SvgIcon } from "@mui/material";

// eslint-disable-next-line react/prop-types
function CustomIcon({ icon }) {
  return (
    <SvgIcon
      color="iconHeader"
      component={icon}
      sx={{
        fontSize: 30,
        padding: "7.5px",
        bgcolor: "#e2e5e9",
        borderRadius: "50%",
      }}
    />
  );
}

export default CustomIcon;
