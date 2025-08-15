import type { RoleEnum } from "@/shared/types/role";

interface ITokens {
  access_token: string;
  refresh_token: string;
}

export interface IUser {
  id: number;
  avatar?: string;
  email: string;
  name: string;
  permissions: [];
  roles: [RoleEnum.ADMIN, RoleEnum.ADMIN_SUPER];
  tokens: ITokens;
}

export interface IUserSchema {
  user: IUser | null;
  accessToken: string | null;
  refreshToken: string | null;
}
