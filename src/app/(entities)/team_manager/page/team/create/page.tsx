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
import {useEffect, useState, useTransition} from "react";
import {ScrollArea} from "@/components/ui/scroll-area";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Form from "next/form";
import {insertNewTeamDataAction} from "@/actions/teamActions";
import {PartialPlayer} from "@/types/playerType";
import useAppToast from "@/hooks/use-appToast";
import Loading from "@/app/loading";
import useUploadImage from "@/hooks/use-uploadImage";
import SmallBackButton from "@/components/small-backbutton";

const partialPlayers: PartialPlayer[] = [
    { fullName: "Juan Carlos Reyes", playerId: "P001", jerseyNumber: 1 },
    { fullName: "Mark Anthony Dela Cruz", playerId: "P002", jerseyNumber: 2 },
    { fullName: "Jose Miguel Santos", playerId: "P003", jerseyNumber: 3 },
    { fullName: "Christian Paul Mendoza", playerId: "P004", jerseyNumber: 4 },
    { fullName: "Gabriel Luis Ramos", playerId: "P005", jerseyNumber: 5 },
    { fullName: "Andrew Francis Villanueva", playerId: "P006", jerseyNumber: 6 },
    { fullName: "Michael John Garcia", playerId: "P007", jerseyNumber: 7 },
    { fullName: "Rafael Antonio Bautista", playerId: "P008", jerseyNumber: 8 },
    { fullName: "John Vincent Alonzo", playerId: "P009", jerseyNumber: 9 },
    { fullName: "Patrick James Perez", playerId: "P010", jerseyNumber: 10 },
    { fullName: "Benjamin Emmanuel Castillo", playerId: "P011", jerseyNumber: 11 },
    { fullName: "Daniel Joseph Soriano", playerId: "P012", jerseyNumber: 12 },
    { fullName: "Vincent Karl Enriquez", playerId: "P013", jerseyNumber: 13 },
    { fullName: "Matthew Ryan Tolentino", playerId: "P014", jerseyNumber: 14 },
    { fullName: "Noel Adrian Fernandez", playerId: "P015", jerseyNumber: 15 },
];

export default function Page(){
    const { handleSearchPlayer, handleSetNameInputChange, isLoading,foundPlayers } = useSearchPlayer();
    const [dialogOpen, setDialogOpen] = useState(false)
    const [teamCaptain, setTeamCaptain] = useState<PartialPlayer | null>(null)
    const { showToast } = useAppToast()
    const [isInsertingTeam, startTransitionIsInsertingTeam] = useTransition()
    const { displayImage, handleFileChange, handleUploadImage } = useUploadImage()
    const handleSearchPlayerClick = async () => {
        await handleSearchPlayer()
    }

    const [addedPlayers, setAddedPlayers] = useState<PartialPlayer[]>(partialPlayers);

    const handleAddPlayerClick = (newPlayer: PartialPlayer) => {
        setAddedPlayers((prevPlayers) => {
            if (prevPlayers.some(player => player.playerId === newPlayer.playerId)) {
                showToast('Player already added!', null, 'default');
                return prevPlayers;
            }
            return [...prevPlayers, newPlayer];
        });
    };

    const handleCreateTeamClick = async (formData: FormData) => {
        if(!teamCaptain){
            showToast("Please set a team captain!",null,'default')
            return
        }
        formData.set('teamCaptain',teamCaptain.fullName)

        startTransitionIsInsertingTeam(async () => {
            const { imageUrl } = await handleUploadImage('team-images')

            if(!imageUrl){
                showToast('Please upload an image!',null,'default')
                return
            }
            formData.set('teamImage',imageUrl)
            const { errorMessage } = await insertNewTeamDataAction(formData,addedPlayers)

            if(errorMessage){
                showToast('Failed to create team!',errorMessage,'destructive')
            }else{
                showToast('Successfully created team!',null,'default')
            }
        })
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
                                        onClick={() => handleAddPlayerClick({fullName: player.fullName, playerId: player.playerId, jerseyNumber: player.jerseyNumber})}
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

    if(isInsertingTeam){
        return <Loading text={'Creating team...'} height={'h-[calc(100vh-90px)]'}/>
    }

    return (
        <Form action={handleCreateTeamClick}>
            <main className={'flex items-center flex-col pb-8'}>
                {foundPlayerDialog}
                <div className={'w-[80%] max-w-4xl'}>
                    <div>
                        <SmallBackButton btnClassName={'w-7 w-7'} btnVariant={'secondary'}/>
                    </div>
                    <div className={'flex justify-center font-semibold text-lg p-4'}>Create team</div>

                    <div>
                        <div className={'flex flex-col items-center gap-4'}>
                            <Label htmlFor="logo">Team Logo/Banner</Label>

                            <div className="w-[250px] overflow-hidden">
                                <AspectRatio ratio={1}>
                                    <Image src={AppToolkit.ImageWithFallBack(displayImage)} alt="Image"
                                           className="rounded-md border object-cover"
                                           fill={true}/>
                                </AspectRatio>

                                <Input type="file" id={'logo'} accept="image/*" required={true} className={'mt-4'} onChange={handleFileChange}/>

                            </div>
                        </div>
                    </div>

                    <div className={'flex flex-wrap gap-2 m-4 justify-center sm:justify-start p-2'}>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="teamName">Team name</Label>
                            <Input id="teamName" name="teamName" required={true}/>
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="coach">Team Coach</Label>
                            <Input id="coach" name="coach" required={true}/>
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="assistantCoach">Assistant coach <span
                                className={'text-xs font-thin'}>(Optional)</span></Label>
                            <Input id="assistantCoach" name="assistantCoach"/>
                        </div>

                        {
                            teamCaptain && (
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="teamCaptain">Team Captain</Label>
                                    <Input id="teamCaptain" disabled={true} value={teamCaptain.fullName}/>
                                </div>
                            )
                        }

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

                    {
                        addedPlayers.length > 0 && (
                            <div className={'border rounded-md mt-4'}>
                                <Table>

                                    <TableHeader>

                                        <TableRow>
                                            <TableHead>Full name</TableHead>
                                            {
                                                !!teamCaptain || <TableHead></TableHead>
                                            }
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            addedPlayers.map((temp, index) => (
                                                <TableRow key={index}>
                                                    <TableCell className="font-medium">{temp.fullName}</TableCell>
                                                    {
                                                        !!teamCaptain || (
                                                            <TableCell>
                                                                <Button size={'sm'} onClick={() => setTeamCaptain({
                                                                    fullName: temp.fullName,
                                                                    playerId: temp.playerId,
                                                                    jerseyNumber: temp.jerseyNumber
                                                                })}>
                                                                    Set Team Captain
                                                                </Button>
                                                            </TableCell>
                                                        )
                                                    }

                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </div>
                        )
                    }


                    <div className={'flex justify-center font-semibold text-lg p-4'}>
                        <Button type={'submit'} disabled={!(addedPlayers.length > 0)}>Create Team</Button>
                    </div>
                </div>
            </main>
        </Form>
    )
}