'use client'
import {AspectRatio} from "@/components/ui/aspect-ratio";
import Image from "next/image";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import useUploadImage from "@/hooks/use-uploadImage";
import useAppToast from "@/hooks/use-appToast";
import fallBackImage from "@/assets/images/fallbackImage.png"
import {Dispatch, SetStateAction} from "react";

type Props = {
    setImageUrlAction?: Dispatch<SetStateAction<string | null>>,
    bucket?: string;
}

export default function ImageInputButton({setImageUrlAction,bucket}:Props){
    const { showToast } = useAppToast()

    const {displayImage,handleFileChange,handleUploadImage} = useUploadImage()
    const handleUploadElement = async () => {
        const {imageUrl,errorMessage} = await handleUploadImage(bucket);
        if(errorMessage){
            showToast('Image upload failed', errorMessage, 'destructive');
        }else{
            showToast('Image uploaded successfully', null, 'default');
            if(imageUrl && setImageUrlAction){
                setImageUrlAction(imageUrl);
            }
        }
    }

    return (
        <div className={'flex items-center flex-col gap-4'}>
            <div className="w-[250px] overflow-hidden">
                <AspectRatio ratio={1}>
                    <Image src={displayImage || fallBackImage} alt="Image" className="rounded-md border object-cover"
                           fill={true}/>
                </AspectRatio>
            </div>
            <div className={'flex gap-4 items-center'}>
                <Input type="file" accept="image/*" onChange={handleFileChange} required={true}/>
                <Button onClick={handleUploadElement}>Upload</Button>
            </div>
        </div>
    )
}