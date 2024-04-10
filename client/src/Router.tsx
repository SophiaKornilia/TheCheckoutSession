import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { NotFound } from "./components/NotFound";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ConfirmedPayment } from "./pages/ConfirmedPayment";



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
            
            },
            {
                path: "/Register",
                element: <RegisterPage />,
                
            },
            {
                path: "/Confirmed",
                element: <ConfirmedPayment /> 
                
            }
        ]
    }
])