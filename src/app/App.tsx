import { memo } from "react";
import { AppRouter } from "./Providers/AppRoutes";

function App() {
  return <AppRouter />;
}

export default memo(App);
