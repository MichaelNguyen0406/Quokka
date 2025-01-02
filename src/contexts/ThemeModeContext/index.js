import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  cssVariables: { colorSchemeSelector: "class" },
  defaultColorScheme: "light",
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#0866ff", // Màu chính cho light mode
        },
        secondary: {
          main: "#1976D2", // Màu phụ cho light mode
        },
        background: {
          default: "#EDEDED", // Màu nền cho light mode
          paper: "#fff",
        },
        text: {
          primary: "#41463D",
          secondary: "#41463D",
        },
        iconHeader: { main: "#080809" },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#E87EA1", // Màu chính cho dark mode
        },
        secondary: {
          main: "#f48fb1", // Màu phụ cho dark mode
        },
        background: {
          default: "#1c1c1d", // Màu nền cho dark mode
          paper: "#1e1e1e",
        },
        text: {
          primary: "#ffffff",
          secondary: "#aaaaaa",
        },
      },
    },
  },
  typography: {
    button: {
      fontSize: "1rem",
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // Áp dụng cho tất cả các nút
          color: "blue",
        },
        contained: {
          // Áp dụng riêng cho variant "contained"
          color: "white",
        },
        outlined: {
          // Áp dụng riêng cho variant "text"
          color: "#0866ff",
        },
      },
    },
  },
});

export default theme;
