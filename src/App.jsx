import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Home from "./screens/Home";
import Detail from "./screens/Detail";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
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

const DarkBtn = styled.button``;

function App() {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
