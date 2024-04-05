import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { NotFound } from "./components/NotFound";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />, 
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <Home />,
                index: true,
            },
            {
                path: "/Login",
                element: <LoginPage />,
                index: true,
            },
            {
                path: "/Register",
                element: <RegisterPage />,
                index: true,
            }
        ]
    }
])