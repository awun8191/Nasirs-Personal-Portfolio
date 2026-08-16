import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { initRouter, restorePendingRoute } from "./router";

// Restore a route saved by public/404.html (GitHub Pages deep links)
// before the app renders, then enable client-side navigation.
restorePendingRoute();
initRouter();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
