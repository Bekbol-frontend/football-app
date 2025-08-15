import { useContext } from "react";
import { MessageContext } from "../config";

export const useMessageApi = () => useContext(MessageContext);
