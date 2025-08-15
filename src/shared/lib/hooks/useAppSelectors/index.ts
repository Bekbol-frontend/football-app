import type { RootState } from "@/app/Providers/StoreProvider";
import { useSelector } from "react-redux";

export const useAppSelector = useSelector.withTypes<RootState>();
