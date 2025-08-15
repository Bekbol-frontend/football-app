import type { IStateSchema } from "@/app/Providers/StoreProvider";

export const getAccessToken = (state: IStateSchema) => state.user.accessToken;
export const getRefreshToken = (state: IStateSchema) => state.user.refreshToken;
export const getUser = (state: IStateSchema) => state.user.user;
