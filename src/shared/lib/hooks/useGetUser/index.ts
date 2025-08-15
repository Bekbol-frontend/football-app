import { getUser } from "@/entities/User";
import { useSelector } from "react-redux";

export const useGetUser = () => {
  return useSelector(getUser);
};
