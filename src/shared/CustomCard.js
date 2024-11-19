import React from "react";
import { Card } from "@mui/material";
import styled from "@emotion/styled";

const StyledCard = styled(Card)(({ theme }) => ({
  "&.MuiPaper-root": {
    borderRadius: 12,
    padding: 8,
    border: "1px solid #EEEEEE",
    flex: 1,
    "& .MuiCardMedia-root": {
      borderRadius: 8,
    },
    "& .MuiTypography-root": {
      marginBottom: 0,
      [theme.breakpoints.down("sm")]: {
        fontSize: 14,
      },
    },
  },
}));

export default function CustomCard({ children, ...props }) {
  return (
    <StyledCard elevation={0} {...props}>
      {children}
    </StyledCard>
  );
}
