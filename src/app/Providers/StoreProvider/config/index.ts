import { configureStore, type ReducersMapObject } from "@reduxjs/toolkit";
import type { IStateSchema } from "../types";
import { userReducer } from "@/entities/User";
import { loginReducer } from "@/features/AuthLogin";
import API from "@/shared/api";

export function createReduxStore() {
  const rootReducer: ReducersMapObject<IStateSchema> = {
    user: userReducer,
    login: loginReducer,
  };

  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: { API },
        },
      }),
  });
}

export type RootState = ReturnType<typeof createReduxStore>["getState"];
export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
