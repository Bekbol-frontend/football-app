import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser, IUserSchema } from "../types";
import {
  LOCAL_STORAGE_ACCESS_TOKEN,
  LOCAL_STORAGE_REFRESH_TOKEN,
  LOCAL_STORAGE_USER,
} from "@/shared/consts/localStorage";

function getUserLocalStorage() {
  const res = localStorage.getItem(LOCAL_STORAGE_USER);

  return res ? (JSON.parse(res) as IUser) : null;
}

function getAccessTokenLocalStorage() {
  return localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
}

function getRefreshTokenLocalStorage() {
  return localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN);
}

const initialState: IUserSchema = {
  user: getUserLocalStorage(),
  accessToken: getAccessTokenLocalStorage(),
  refreshToken: getRefreshTokenLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<IUser>) => {
      state.user = payload;
      state.accessToken = payload.tokens.access_token;
      state.refreshToken = payload.tokens.refresh_token;

      localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(payload));

      localStorage.setItem(
        LOCAL_STORAGE_ACCESS_TOKEN,
        payload.tokens.access_token
      );

      localStorage.setItem(
        LOCAL_STORAGE_REFRESH_TOKEN,
        payload.tokens.refresh_token
      );
    },
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
