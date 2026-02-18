import toast from "react-hot-toast";
import { IcSvgCheckCircle, IcSvgErrorCircle, IcSvgCancelCircle } from "@/shared/icons";

export const appToast = {
    default: (message: string) =>
        toast(message),

    success: (message: string) =>
        toast(message, {
            icon: <IcSvgCheckCircle width={20} height={20} className="text-status-positive" />
        }),

    error: (message: string) =>
        toast(message, {
            icon: <IcSvgErrorCircle width={20} height={20} className="text-status-destructive" />
        }),

    warning: (message: string) =>
        toast(message, {
            icon: <IcSvgCancelCircle width={20} height={20} className="text-status-cautionary" />
        }),
};