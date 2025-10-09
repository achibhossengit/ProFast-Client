import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/router.jsx";
import "aos/dist/aos.css";
import Aos from "aos";
import AuthProvider from "./contexts/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

Aos.init({ duration: 2000 });
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="font-urbanist">
          <Toaster />
          <RouterProvider router={router}></RouterProvider>
        </div>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
