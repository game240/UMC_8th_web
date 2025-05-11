import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AuthProvider } from "./contexts/AuthContext.tsx";
import { SideBarProvider } from "./contexts/SideBarContext.tsx";

import App from "./App.tsx";

import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SideBarProvider>
          <App />
        </SideBarProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
