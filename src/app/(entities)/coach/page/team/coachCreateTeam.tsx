'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {Button} from "@/components/ui/button";
import {useState, useTransition} from "react";
import Form from "next/form";
import {insertNewTeamDataAction} from "@/actions/teamActions";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import useAppToast from "@/hooks/use-appToast";
import useUploadImage from "@/hooks/use-uploadImage";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import Image from "next/image";
import fallBackImage from "@/assets/images/fallbackImage.png";

export default function CoachCreateTeamComponent(){
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isPending, startTransition] = useTransition()
    const { showToast } = useAppToast()
    const {displayImage, handleFileChange, handleUploadImage} = useUploadImage();

    const handleCreateTeam = async (formData: FormData) => {
        startTransition(async () => {
            const {imageUrl} = await handleUploadImage('team-images');
            formData.set('teamImage', imageUrl || 'no image');
            const {errorMessage} = await insertNewTeamDataAction(formData);
            if(errorMessage) {
                showToast("Failed to create team", errorMessage,'destructive')
            }else{
                showToast("Team created successfully",null,'default')
                setDialogOpen(false)
            }
        })
    }

    return (
        <main>
            <AlertDialog open={dialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Create Team</AlertDialogTitle>
                        </AlertDialogHeader>
                        <Form action={handleCreateTeam}>

                            <div className={'grid gap-4'}>

                                <div className={'flex flex-col items-center gap-4'}>
                                    <div className="w-[250px] overflow-hidden">
                                        <AspectRatio ratio={1}>
                                            <Image src={displayImage || fallBackImage} alt="Image"
                                                   className="rounded-md border object-cover"
                                                   fill={true}/>
                                        </AspectRatio>
                                    </div>
                                    <Input type="file" accept="image/*" onChange={handleFileChange} required={true}/>
                                </div>

                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="teamName">Team name</Label>
                                    <Input id="teamName" name="teamName" required={true}/>
                                </div>

                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="assistantCoach">Assistant coach</Label>
                                    <Input id="assistantCoach" name="assistantCoach" required={true}/>
                                </div>
                            </div>

                            <AlertDialogFooter className={'mt-4'}>
                                <AlertDialogCancel onClick={() => setDialogOpen(false)}>Cancel</AlertDialogCancel>
                                <AlertDialogAction type={'submit'} disabled={isPending}>{isPending ? 'Creating team...' : 'Create'}</AlertDialogAction>
                            </AlertDialogFooter>
                        </Form>
                    </AlertDialogContent>
            </AlertDialog>

            <Button onClick={() => setDialogOpen(true)} >Add</Button>
        </main>
    )
}