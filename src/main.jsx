import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/router.jsx";
import "aos/dist/aos.css";
import Aos from "aos";

Aos.init({duration: 2000});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="font-urbanist">
      <RouterProvider router={router}></RouterProvider>
    </div>
  </StrictMode>
);
