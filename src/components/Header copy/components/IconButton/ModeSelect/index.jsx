import { useColorScheme } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// eslint-disable-next-line react/prop-types
function ModeSelect() {
  const { mode, setMode } = useColorScheme();

  console.log(mode);

  if (!mode) {
    return null;
  }

  const handleChange = (event) => {
    setMode(event.target.value);
  };

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      mx={1}
      // border="1px solid #c4c4c4"
      borderRadius="5px"
    >
      <Button
        variant="outlined"
        sx={{
          display: "flex",
          alignItems: "canter",

          // borderRight: "1px solid #c4c4c4",
          p: 2,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <LightModeIcon fontSize="small" />
        <Typography fontWeight="bold" ml={1}>
          Sáng
        </Typography>
      </Button>
      <Box
        sx={{
          display: "flex",
          alignItems: "canter",

          borderRight: "1px solid #c4c4c4",
          p: 2,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <SettingsBrightnessIcon fontSize="small" />
        <Typography fontWeight="bold" ml={1}>
          Hệ thống
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "canter",

          p: 2,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <DarkModeIcon fontSize="small" />
        <Typography fontWeight="bold" ml={1}>
          Tối
        </Typography>
      </Box>
    </Box>
  );
}

export default ModeSelect;
