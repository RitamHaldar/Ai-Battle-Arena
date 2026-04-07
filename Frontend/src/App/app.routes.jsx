import { createBrowserRouter } from "react-router";
import Homepage from "../Features/Home/Pages/Homapage";
import Login from "../Features/Auth/Pages/Login";
import Register from "../Features/Auth/Pages/Register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
])