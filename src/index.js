import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { App } from "./components/App";
import { theme, GlobalStyle } from "./components/constants";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
