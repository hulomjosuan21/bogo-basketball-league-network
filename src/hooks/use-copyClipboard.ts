import useAppToast from "@/hooks/use-appToast";

export default function useCopyClipboard() {
    const { showToast } = useAppToast();

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            showToast('Text copied to clipboard!', null, 'default');
        } catch (error) {
            console.error('Failed to copy: ', error);
            showToast('Failed to copy text to clipboard!', null, 'destructive');
        }
    };

    return { copyToClipboard };
}