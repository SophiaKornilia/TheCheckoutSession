import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import CartProvider from "./context/CartContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <CartProvider>
        <RouterProvider router={router}></RouterProvider>
      </CartProvider>
    </UserProvider>
  </React.StrictMode>
);
