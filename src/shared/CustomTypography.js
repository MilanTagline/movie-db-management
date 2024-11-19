import { Typography } from "@mui/material";
import React from "react";

export default function CustomTypography({ children, ...props }) {
  return <Typography {...props}>{children}</Typography>;
}
