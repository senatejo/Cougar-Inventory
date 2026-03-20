import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "@/styles/globals.css";

import { ModalProvider } from "@/contexts/ModalContext";

import { invokeEvent } from '@/utils/EventController.ts';
window.invokeEvent = invokeEvent;

// Extend the Window interface
declare global {
  interface Window {
    invokeEvent: (eventName: string, args: string) => void;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ModalProvider>
      <App />
    </ModalProvider>
  </React.StrictMode>,
);