'use client'
import {useState, useTransition} from "react";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Form from "next/form";
import { insertNewLeagueData} from "@/actions/leagueActions";
import useAppToast from "@/hooks/use-appToast";

type Props = {
    hasActive: boolean
}

export default function BarangayCreateNewLeague({hasActive}:Props){
    const [newLeagueDialogOpen, setNewLeagueDialogOpen] = useState(false)
    const { showToast } = useAppToast();
    const [isPending, startTransition] = useTransition()

    const handleCreateNewLeague = async (formData: FormData) => {
        startTransition(async () => {
            const leagueName = formData.get('leagueName') as string;
            const { errorMessage } = await insertNewLeagueData(formData)

            if(errorMessage){
                showToast("Failed to create new league", errorMessage, 'destructive')
            }else{
                showToast("New league created", `${leagueName} has been started successfully`, 'default')
                setNewLeagueDialogOpen(false)
            }
        })
    }

    const createNewLeagueDialog = (
        <AlertDialog open={newLeagueDialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Start new league</AlertDialogTitle>
                </AlertDialogHeader>

                <Form action={handleCreateNewLeague}>
                    <div className={'grid gap-4'}>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="leagueName">League name</Label>
                            <Input id="leagueName" name={'leagueName'} required={true}/>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="startDate">Start date</Label>
                            <Input id="startDate" name={'startDate'} type={'date'} required={true}/>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="leagueRegistrationFee">Registration fee</Label>
                            <Input id="leagueRegistrationFee" name={'leagueRegistrationFee'} type={'number'}/>
                        </div>
                    </div>

                    <AlertDialogFooter className={'mt-4'}>
                        <AlertDialogCancel onClick={() => setNewLeagueDialogOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction type={'submit'} disabled={isPending}>{isPending ? 'Starting...' : 'Start'}</AlertDialogAction>
                    </AlertDialogFooter>
                </Form>

            </AlertDialogContent>
        </AlertDialog>
    )

    return (
        <div>
            {createNewLeagueDialog}
            <Button variant={'outline'} onClick={() => setNewLeagueDialogOpen(true)} disabled={hasActive}>Start new</Button>
        </div>
    )
}