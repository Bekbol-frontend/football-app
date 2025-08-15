import type { AppDispatch } from "@/app/Providers/StoreProvider";
import { useDispatch } from "react-redux";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
