import React from "react";
import { Box } from "@mui/material";
import CustomTypography from "./CustomTypography";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  productDetailWrapper: {},
  cardTitle: {
    "&.MuiTypography-root": {
      fontWeight: 500,
      fontSize: 16,
      lineHeight: "20px",
      color: theme.palette.secondary.main,
    },
  },
  productCardBody: {
    padding: [[15, 0, 15]],
    borderBottom: "1px solid rgba(0, 0, 0, 0.09)",
    marginBottom: 20,
  },
}));

export default function CustomCard({ children, title, className, ...props }) {
  const classes = useStyles();
  return (
    <Box className={`${classes.productDetailWrapper} ${className}`} {...props}>
      <CustomTypography variant="h4" className={classes.cardTitle}>
        {title}
      </CustomTypography>
      <Box className={classes.productCardBody}>{children}</Box>
    </Box>
  );
}
