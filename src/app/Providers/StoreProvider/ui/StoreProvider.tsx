import type { ReactNode } from "react";
import { createReduxStore } from "../config";
import { Provider } from "react-redux";

interface IProps {
  children: ReactNode;
}

function StoreProvider({ children }: IProps) {
  const store = createReduxStore();

  return <Provider store={store}>{children}</Provider>;
}

export default StoreProvider;
