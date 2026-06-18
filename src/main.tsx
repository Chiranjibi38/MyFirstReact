import {createRoot} from "react-dom/client"

import { StrictMode} from "react"
import HomePage from "./pages/home/HomePage";
import "./assets/css/global.css";



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HomePage></HomePage>
  </StrictMode>,

);
