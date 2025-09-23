import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/router.jsx";
import "aos/dist/aos.css";
import Aos from "aos";
import AuthProvider from "./contexts/AuthProvider.jsx";

Aos.init({ duration: 2000 });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <div className="font-urbanist">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </AuthProvider>
  </StrictMode>
);
