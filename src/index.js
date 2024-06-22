import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Home from "./screens/Home";
import Detail from "./screens/Detail";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";

const defaultTheme = {
  bgColor: "#ededed",
  fontColor: "#222",
  linkColor: "#4286f4",
};

const GlobalStyle = createGlobalStyle`
  ${reset}
  body * {
    box-sizing: border-box;
  }
`;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "character/:id",
        element: <Detail />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
