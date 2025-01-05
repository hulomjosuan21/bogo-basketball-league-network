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

export function useValidDocsImage() {
    const [file1, setFile1] = useState<File | null>(null);
    const [file2, setFile2] = useState<File | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>, fileIndex: number) => {
        const selectedFile = event.target.files?.[0] || null;
        if (fileIndex === 1) {
            setFile1(selectedFile);
        } else if (fileIndex === 2) {
            setFile2(selectedFile);
        }
    };

    const handleUploadImage = async (bucket = 'league-docs') => {
        if (!file1 || !file2) {
            const errorMessage = "Both files must be selected";
            return { imageUrl1: null, imageUrl2: null, errorMessage };
        }

        const upload1 = uploadImage({ file: file1, bucket });
        const upload2 = uploadImage({ file: file2, bucket });

        const [{ imageUrl: imageUrl1, errorMessage: errorMessage1 }, { imageUrl: imageUrl2, errorMessage: errorMessage2 }] = await Promise.all([upload1, upload2]);

        const errorMessage = errorMessage1 || errorMessage2;
        return { imageUrl1, imageUrl2, errorMessage };
    };

    return { handleFileChange, handleUploadImage };
}