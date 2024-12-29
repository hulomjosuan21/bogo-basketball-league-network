import {ChangeEvent, useState} from "react";
import {uploadImage} from "@/utils/supabase/server";

export default function useUploadImage() {
    const [file, setFile] = useState<File | null>(null);
    const [displayImage, setImageUrl] = useState<string | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        setFile(selectedFile);
        if (selectedFile) {
            setImageUrl(URL.createObjectURL(selectedFile));
        } else {
            setImageUrl(null);
        }
    };

    const handleUploadImage = async (bucket = 'images') => {
        if (!file) {
            const errorMessage = "No file selected";
            return { imageUrl: null, errorMessage };
        }

        const { imageUrl, errorMessage } = await uploadImage({
            file,
            bucket: bucket,
        });

        return { imageUrl, errorMessage };
    }

    return {displayImage, handleFileChange, handleUploadImage}
}