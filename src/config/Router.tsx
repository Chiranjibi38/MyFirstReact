import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "../pages/home/HomePage";
import ForgetPassword from "../components/auth/ForgetPassword";


export default function RouterConfig() {
    return ( <BrowserRouter>
<Routes>
    <Route path="/" element={<HomePage />}></Route>
    <Route path="/forget-password" Component={ForgetPassword} />
</Routes>

    </BrowserRouter>) 
}