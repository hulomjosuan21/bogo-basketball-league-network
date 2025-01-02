'use client'
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import Image from "next/image";
import AppToolkit from "@/lib/app-toolkit";
import useSearchPlayer from "@/hooks/use-searchPlayer";
import {Button} from "@/components/ui/button";
import {LoaderCircle, Search} from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {useEffect, useState} from "react";
import {ScrollArea} from "@/components/ui/scroll-area";
import {
    Table,
    TableBody, TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Form from "next/form";

export default function Page(){
    const { handleSearchPlayer, handleSetNameInputChange, isLoading,foundPlayers } = useSearchPlayer();
    const [dialogOpen, setDialogOpen] = useState(false)
    const [addedPlayers, setAddedPlayers] = useState<{fullName: string,playerId: string}[]>([])

    const handleSearchPlayerClick = async () => {
        await handleSearchPlayer()
    }

    const handleAddPlayerClick = (fullName: string,playerId: string) => {
        setAddedPlayers([...addedPlayers,{fullName,playerId}])
    }

    const handleCreateTeamClick = async (formData: FormData) => {
        console.log(` ${formData.get('teamName')} ${formData.get('assistantCoach')} ${formData.get('teamCaptain')} ${formData.get('teamManager')} ${formData.get('contactNumber')} ${formData.get('contactEmail')}`);
    }

    useEffect(() => {
        if(foundPlayers.length > 0){
            setDialogOpen(true)
        }
    },[foundPlayers])

    const foundPlayerDialog = (
        <AlertDialog open={dialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                </AlertDialogHeader>

                <div>
                    <ScrollArea className="h-[400px] px-4 py-1">
                        {
                            foundPlayers.map((player, index) => (
                                <div key={index} className={'flex items-center gap-2 justify-between mb-2'}>
                                    <Input value={player.fullName} disabled={true} className={''}/>
                                    <Button
                                        size={'sm'}
                                        onClick={() => handleAddPlayerClick(player.fullName,player.playerId)}
                                        >
                                        {'Add'}
                                    </Button>
                                </div>
                            ))
                        }
                    </ScrollArea>
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setDialogOpen(false)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => setDialogOpen(false)}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )

    return (
        <Form action={handleCreateTeamClick}>
            <main className={'flex items-center flex-col pb-8'}>
                {foundPlayerDialog}
                <div className={'w-[80%] max-w-4xl'}>

                    <div className={'flex justify-center font-semibold text-lg p-4'}>Create team</div>

                    <div>
                        <div className={'flex flex-col items-center gap-4'}>
                            <Label htmlFor="logo">Team Logo/Banner</Label>

                            <div className="w-[250px] overflow-hidden">
                                <AspectRatio ratio={1}>
                                    <Image src={AppToolkit.ImageWithFallBack('')} alt="Image"
                                           className="rounded-md border object-cover"
                                           fill={true}/>
                                </AspectRatio>

                                <Input type="file" id={'logo'} accept="image/*" required={true} className={'mt-4'}/>

                            </div>
                        </div>
                    </div>

                    <div className={'flex flex-wrap gap-2 m-4 justify-center sm:justify-start p-2'}>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="teamName">Team name</Label>
                            <Input id="teamName" name="teamName" required={true}/>
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="assistantCoach">Assistant coach</Label>
                            <Input id="assistantCoach" name="assistantCoach" required={true}/>
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="teamCaptain">Team captain</Label>
                            <Input id="teamCaptain" name="teamCaptain" required={true}/>
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="teamManager">Team manager</Label>
                            <Input id="teamManager" name="teamManager" required={true}/>
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="contactNumber">Contact number</Label>
                            <Input id="contactNumber" name="contactNumber" required={true} type={'tel'}/>
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="contactEmail">Contact email</Label>
                            <Input id="contactEmail" name="contactEmail" type={'email'}/>
                        </div>
                    </div>

                    <div className={'flex justify-center font-semibold text-lg p-4 border-t'}>Add Player</div>

                    <div className={'flex items-center justify-center gap-2 '}>
                        <div className="flex items-center gap-2 space-y-1.5">
                            <Input onChange={handleSetNameInputChange} placeholder={'Search Player name'}/>
                            <Button onClick={handleSearchPlayerClick} disabled={isLoading}>{isLoading ?
                                <LoaderCircle className={'animate-spin transition ease-in'}/> : <Search/>}</Button>
                        </div>
                    </div>

                    <div className={'border rounded-md mt-4'}>
                        <Table>
                            {
                                addedPlayers.length > 0 || <TableCaption>No added player</TableCaption>
                            }
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    addedPlayers.map((temp, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{temp.fullName}</TableCell>
                                        </TableRow>
                                    ))
                                }
                                <TableRow>
                                    <TableCell className="font-medium">{}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    <div className={'flex justify-center font-semibold text-lg p-4'}>
                        <Button type={'submit'}>Create Team</Button>
                    </div>
                </div>
            </main>
        </Form>
    )
}