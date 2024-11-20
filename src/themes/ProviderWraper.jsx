"use client";

import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { Toaster } from "react-hot-toast";

const ProviderWraper = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
      <Toaster position="top-right" reverseOrder={false} />
    </Provider>
  );
};

export default ProviderWraper;
