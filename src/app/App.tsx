import { memo } from "react";
import { AntdConfigProvider } from "./Providers/AntdConfigProvider";
import { AppRouter } from "./Providers/AppRoutes";

function App() {
  return (
    <AntdConfigProvider>
      <AppRouter />
    </AntdConfigProvider>
  );
}

export default memo(App);
