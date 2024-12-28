import {toast} from "@/hooks/use-toast";
import {ToastAction} from "@/components/ui/toast";

export default function useAppToast(){
    return {
        showToast: (title: string, description: string | null ,type: "default" | "destructive" | null | undefined) => {
            toast({
                title,
                description,
                variant: type,
                action: <ToastAction altText={type === 'default' ? 'Continue': 'Try again'}>{type === 'default' ? 'Continue': 'Try again'}</ToastAction>
            });
        }
    };
}