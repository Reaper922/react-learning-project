import {createTheme} from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Raleway', sans-serif",
  },
  palette: {
    primary: {
      main: "#b71c1c", // z.B. dunkles Rot für Buttons, Icons etc.
    },
    secondary: {
      main: "#f8bbd0", // z.B. Sakura-Rosa
    },
    background: {
      default: "#ffffff", // Weißer Hintergrund als Fallback
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
