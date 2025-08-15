import { memo } from "react";
import { AppRouter } from "./Providers/AppRoutes";
import { MessageProvider } from "./Providers/MessageProvider";

function App() {
  return (
    <MessageProvider>
      <AppRouter />
    </MessageProvider>
  );
}

export default memo(App);
