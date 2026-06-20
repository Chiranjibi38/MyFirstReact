import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "../pages/home/HomePage";
import ForgetPassword from "../components/auth/ForgetPassword";
import NotFound from "../pages/error/NotFound";
import AdminDashboard from "../pages/admin/Dashboard";

const routerData = createBrowserRouter([
    { path: "/", Component: AdminDashboard },
    { path: "/login", element: <HomePage /> },
    { path: "/forget-password", Component: ForgetPassword },
    {path: "/admin", Component:AdminDashboard },
    { path: "*", Component: NotFound },
])

export default function RouterConfig() {
    return ( 
    <RouterProvider router={routerData} />

    );
}
