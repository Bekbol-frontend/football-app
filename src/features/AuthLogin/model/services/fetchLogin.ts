import type { IThunkConfig } from "@/app/Providers/StoreProvider";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginFormType } from "../types";
import { userActions, type IUser } from "@/entities/User";
import type { AxiosError } from "axios";

export const fetchLogin = createAsyncThunk<
  void,
  LoginFormType,
  IThunkConfig<string>
>("login/fetchLogin", async (data, { rejectWithValue, extra, dispatch }) => {
  try {
    const response = await extra.API.post<IUser>(
      "/api/v1/admin/auth/signin",
      data
    );

    if (!response.data) throw new Error("error");

    dispatch(userActions.setUser(response.data));
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.message);
  }
});
