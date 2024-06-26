import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./components/Layout/Layout"
import { GlobalStyle } from "./style/global"
import { ThemeProvider } from "styled-components"
import { defaultTheme } from "./style/theme"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App() {
  const routerList = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]

  const newRouterList = routerList.map((route) => {
    return {
      ...route,
      element: <Layout>{route.element}</Layout>,
    }
  })

  const router = createBrowserRouter(newRouterList)

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={defaultTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  )
}

export default App
