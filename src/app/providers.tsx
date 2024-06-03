// app/providers.tsx
"use client";
import { ToastContainer } from "react-toastify";
import { AppContextProvider } from "@/context/AppContext";
import "react-toastify/dist/ReactToastify.css";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppContextProvider>
        {children}
        <ToastContainer />
      </AppContextProvider>
    </>
  );
}
