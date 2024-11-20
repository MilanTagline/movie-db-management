"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React from "react";
import Logout from "../../public/assets/logout.svg";
import { Button } from "@mui/material";
import Image from "next/image";

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };
  return (
    <Button
      sx={{
        color: "#ffffff",
        textTransform: "none",
        fontWeight: "bold",
        gap: "10px",
        cursor: "pointer",
      }}
      onClick={handleLogout}
    >
      Logout <Image alt="logout icon" src={Logout.src} height={20} width={20} />
    </Button>
  );
};

export default LogoutButton;
