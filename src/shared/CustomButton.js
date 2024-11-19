import React from "react";
import { Button } from "@mui/material";
import styled from "@emotion/styled";

const StyledButton = styled(Button)(({ theme }) => ({
  "&.MuiButtonBase-root": {
    padding: "13px 15px",
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 700,
    color: theme.palette.white.main,
    "&:hover": {
      boxShadow: "none",
    },
  },
}));

export default function CustomButton({ children, ...rest }) {
  return (
    <StyledButton {...rest} disableElevation>
      {children}
    </StyledButton>
  );
}
