import type { IUserSchema } from "@/entities/User";
import type { ILoginSchema } from "@/features/AuthLogin";
import type { AxiosInstance } from "axios";

export interface IStateSchema {
  user: IUserSchema;
  login: ILoginSchema;
}

export interface IExtraArg {
  API: AxiosInstance;
}

export interface IThunkConfig<T> {
  rejectValue: T;
  extra: IExtraArg;
  state: IStateSchema;
}
