import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "../pages/home/HomePage";
import ForgetPassword from "../components/auth/ForgetPassword";

const routerData = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/forget-password", element: <ForgetPassword /> },
]);

export default function RouterConfig() {
    return <RouterProvider router={routerData} />;
}
