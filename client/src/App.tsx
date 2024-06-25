import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout/Layout";
import { GlobalStyle } from "./style/global";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./style/theme";

function App() {
  const routerList = [
    {
      path: "/",
      element: <Home />,
    },
  ];

  const newRouterList = routerList.map((route) => {
    return {
      ...route,
      element: <Layout>{route.element}</Layout>,
    };
  });

  const router = createBrowserRouter(newRouterList);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={defaultTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
