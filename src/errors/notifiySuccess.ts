import { toast } from "react-toastify";

export const notifySuccess = (message: string) => {
  toast(message, {
    type: "success",
    position: "bottom-right",
    style: { bottom: 20 },
  });
};
