import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { BrowserRouter } from "react-router-dom";

// antd react@19+
import "@ant-design/v5-patch-for-react-19";

// i18n
import "./shared/config/i18n";

// main-css
import "./app/styles/main.scss";
import { AntdConfigProvider } from "./app/Providers/AntdConfigProvider/index.ts";
import { ErrorBoundary } from "./app/Providers/ErrorBoundary/index.ts";
import { StoreProvider } from "./app/Providers/StoreProvider/index.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AntdConfigProvider>
      <ErrorBoundary>
        <StoreProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </StoreProvider>
      </ErrorBoundary>
    </AntdConfigProvider>
  </BrowserRouter>
);
