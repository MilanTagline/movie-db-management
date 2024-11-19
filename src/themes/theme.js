import { createTheme } from "@mui/material";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      xxs: 426,
      xsm: 500,
      sm: 600,
      tm: 767,
      md: 900,
      mdlg: 1024,
      lg: 1200,
      xlg: 1380,
      xxlg: 1440,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: "#2bd17e",
    },
    background: {
        main: "#0a3644"
    },
    input: {
        main: "#224957"
    },
    card: {
        main: "#304047"
    },
    white: {
        main: "#ffffff"
    },
    error: {
        main: "#eb5757"
    },
  },
  typography: {
    fontFamily: 'Montserrat',
  },
});

export default theme;