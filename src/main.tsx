import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./contexts/ToastProvider.tsx";
import "./i18n";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/innoject-pro-interface">
    <ToastProvider>
      <App />
    </ToastProvider>
  </BrowserRouter>
);
