import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { BrowserRouter } from "react-router-dom";
import "@ant-design/v5-patch-for-react-19";

// i18n
import "./shared/config/i18n";

// main-css
import "./app/styles/main.scss";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
