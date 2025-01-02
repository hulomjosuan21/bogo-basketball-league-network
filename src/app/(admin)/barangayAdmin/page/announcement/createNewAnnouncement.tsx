'use client'
import {Button} from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Form from "next/form";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useState, useTransition} from "react";
import {Textarea} from "@/components/ui/textarea";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import Image from "next/image";
import fallBackImage from "@/assets/images/fallbackImage.png";
import useUploadImage from "@/hooks/use-uploadImage";
import useAppToast from "@/hooks/use-appToast";
import {insertNewAnnouncementAction} from "@/actions/announcementActions";

export default function CreateNewAnnouncementComponent(){
    const [dialogOpen, setDialogOpen] = useState(false)
    const [isPending, startTransition] = useTransition()
    const {displayImage, handleFileChange, handleUploadImage} = useUploadImage();
    const { showToast } = useAppToast()

    async function handleAddNewAnnouncement(formData: FormData) {

        startTransition(async () => {
            const {imageUrl} = await handleUploadImage('team-images');
            formData.set('image', imageUrl || 'no image');

            const { errorMessage } = await insertNewAnnouncementAction(formData);

            if(errorMessage){
                showToast("Error",errorMessage,'destructive')
            }else{
                showToast("Success","New announcement added successfully",'default')
                setDialogOpen(false)
            }
        })
    }

    const addNewAnnouncementDialog = (
        <AlertDialog open={dialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Add new announcement</AlertDialogTitle>
                </AlertDialogHeader>

                <Form action={handleAddNewAnnouncement}>
                    <div className={'grid gap-4'}>
                        <div className="flex flex-col space-y-1.5 items-center">
                            <div className="w-[250px] overflow-hidden">
                                <AspectRatio ratio={1}>
                                    <Image src={displayImage || fallBackImage} alt="Image"
                                           className="rounded-md border object-cover"
                                           fill={true}/>
                                </AspectRatio>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" required={true}/>
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" required={true}/>
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="image">Upload image</Label>
                            <Input type="file" accept="image/*" id="image" onChange={handleFileChange} required={true}/>
                        </div>

                    </div>
                    <AlertDialogFooter className={'mt-4'}>
                        <AlertDialogCancel onClick={() => setDialogOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction type={'submit'} disabled={isPending}>{isPending ? 'Uploading...' : 'Upload'}</AlertDialogAction>
                    </AlertDialogFooter>
                </Form>

            </AlertDialogContent>
        </AlertDialog>
    )


    return (
        <div>
            {addNewAnnouncementDialog}
            <Button size={'sm'} onClick={() => setDialogOpen(true)}>
                New announcement
            </Button>
        </div>
    )
}