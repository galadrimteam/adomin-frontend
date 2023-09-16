import { toast } from "react-toastify";
import { getErrorMessage } from "./getErrorMessage";

export const notifyApiError = (error: unknown, backupMessage?: string) => {
  const text = getErrorMessage(error, backupMessage);

  toast(text, {
    type: "error",
    position: "bottom-right",
    style: { bottom: 20 },
  });
};
