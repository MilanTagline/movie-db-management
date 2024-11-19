import React from "react";
import Grid from "@mui/material/Grid";

export default function CustomGrid({ children, ...props }) {
  return <Grid {...props}>{children}</Grid>;
}
