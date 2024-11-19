import { makeStyles } from "@mui/styles";
import React from "react";
import CustomTypography from "./CustomTypography";

const useStyles = makeStyles((theme) => ({
  title: {
    "&.MuiTypography-root": {
      paddingBottom: 15,
      marginBottom: 40,
      color: theme.palette.secondary.main,
      fontSize: 26,
      fontFamily: "Desiger",
      position: "relative",
      textTransform: "uppercase",
      [theme.breakpoints.down("md")]: {
        fontSize: 20,
        marginBottom: 30,
        paddingBottom: 15,
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: 16,
        marginBottom: 20,
        paddingBottom: 10,
      },
      "&:before": {
        content: "''",
        position: "absolute",
        left: 0,
        bottom: 0,
        width: 65,
        height: 5,
        backgroundColor: theme.palette.primary.main,
        borderRadius: 20,
        [theme.breakpoints.down("sm")]: {
          height: 4,
        },
      },
      "&:after": {
        content: "''",
        position: "absolute",
        left: 72,
        bottom: 0,
        width: 18,
        height: 5,
        backgroundColor: theme.palette.primary.main,
        borderRadius: 20,
        [theme.breakpoints.down("sm")]: {
          height: 4,
        },
      },
    },
  },
}));

export default function CustomTitle({ children }) {
  const classes = useStyles();
  return (
    <CustomTypography variant="h5" component="h5" className={classes.title}>
      {children}
    </CustomTypography>
  );
}
