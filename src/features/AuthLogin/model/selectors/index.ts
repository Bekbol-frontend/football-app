import type { IStateSchema } from "@/app/Providers/StoreProvider";

export const getIsLoading = (state: IStateSchema) => state.login.isLoading;
export const getIsError = (state: IStateSchema) => state.login.error;
