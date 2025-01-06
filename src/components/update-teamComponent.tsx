'use client'
import {useState, useEffect, useTransition, ChangeEvent} from "react";
import Team from "@/types/teamType";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import AppToolkit from "@/lib/app-toolkit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useAppToast from "@/hooks/use-appToast";
import {updateTeamAction, updateTeamPlayersAction} from "@/actions/teamActions";
import {useRouter} from "next/navigation";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

type Props = {
    teamData: Team
};

export default function UpdateTeamDataComponent({ teamData }: Props) {
    const [isPending, startTransition] = useTransition();
    const {showToast} = useAppToast();
    const router = useRouter()
    const [formData, setFormData] = useState({
        teamName: teamData.teamName,
        coach: teamData.teamMetaData.coach,
        assistantCoach: teamData.teamMetaData.assistantCoach,
        teamCaptain: teamData.teamMetaData.teamCaptain,
        teamManager: teamData.teamMetaData.teamManager,
        contactNumber: teamData.teamMetaData.contactNumber,
        contactEmail: teamData.teamMetaData.contactEmail,
    });

    const [players, setPlayers] = useState(teamData.players);
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        const hasChanges =
            JSON.stringify(formData) !==
            JSON.stringify({
                teamName: teamData.teamName,
                coach: teamData.teamMetaData.coach,
                assistantCoach: teamData.teamMetaData.assistantCoach,
                teamCaptain: teamData.teamMetaData.teamCaptain,
                teamManager: teamData.teamMetaData.teamManager,
                contactNumber: teamData.teamMetaData.contactNumber,
                contactEmail: teamData.teamMetaData.contactEmail,
            });

        setIsChanged(hasChanges);
    }, [formData, teamData]);

    const handleRemovePlayer = async (index: number) => {
        const updatedPlayers = players.filter((_, i) => i !== index);
        setPlayers(updatedPlayers);
        setIsChanged(true)
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setFormData({...formData, [id]: value});
    };

    const handleSubmit = async () => {
        startTransition(async () => {
            const { errorMessage } = await updateTeamAction(teamData.id, formData);
            const {errorMessage:playerError} = await updateTeamPlayersAction(teamData.teamId,players)
            if (errorMessage) {
                showToast('Error', errorMessage, 'destructive');
            } else {
                showToast('Successfully', 'Update Team data', 'default');
            }
            if (playerError) {
                showToast('Error', playerError, 'destructive');
            } else {
                showToast('Successfully', 'Update Team Data', 'default');
            }
        });
    };

    const playerTable = (
        <Table className={''}>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Jersey Number</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    players.map((player,index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{player.fullName}</TableCell>
                            <TableCell>{player.jerseyNumber}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleRemovePlayer(index)}>Remove</Button>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>

    )

    return (
        <main>
            <div className={"flex justify-center items-center flex-col gap-4"}>
                <div className={""}>
                    <div className="w-[250px]">
                        <AspectRatio ratio={1}>
                            <Image
                                src={AppToolkit.ImageWithFallBack(teamData.teamImage)}
                                alt="Image"
                                className="rounded-md border shadow-md object-cover"
                                fill={true}
                            />
                        </AspectRatio>
                    </div>
                </div>

                <Card className={"w-[90%] sm:w-[60%] max-w-4xl"}>
                    <CardHeader className={"border-b"}>
                        <CardTitle>Team info</CardTitle>
                    </CardHeader>
                    <CardContent className={"py-2"}>
                        <div className={"grid gap-4"}>
                            <div className={"grid grid-cols-2"}>
                                <span className={"text-sm text-secondary-foreground"}>Team Name</span>
                                <Input
                                    id="teamName"
                                    value={formData.teamName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={"grid grid-cols-2"}>
                                <span className={"text-sm text-secondary-foreground"}>Coach</span>
                                <Input
                                    id="coach"
                                    value={formData.coach}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={"grid grid-cols-2"}>
                                <span className={"text-sm text-secondary-foreground"}>Assistant Coach</span>
                                <Input
                                    id="assistantCoach"
                                    value={formData.assistantCoach || ""}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={"grid grid-cols-2"}>
                                <span className={"text-sm text-secondary-foreground"}>Team Captain</span>
                                <Input
                                    id="teamCaptain"
                                    value={formData.teamCaptain}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={"grid grid-cols-2"}>
                                <span className={"text-sm text-secondary-foreground"}>Team Manager</span>
                                <Input
                                    id="teamManager"
                                    value={formData.teamManager}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={"grid grid-cols-2"}>
                                <span className={"text-sm text-secondary-foreground"}>Contact Number</span>
                                <Input
                                    id="contactNumber"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={"grid grid-cols-2"}>
                                <span className={"text-sm text-secondary-foreground"}>Contact Email</span>
                                <Input
                                    id="contactEmail"
                                    value={formData.contactEmail}
                                    onChange={handleChange}
                                />
                            </div>

                            {
                                (teamData.players.length > 0) && (
                                    <div className={'border rounded-md'}>
                                        {playerTable}
                                    </div>
                                )
                            }
                        </div>
                    </CardContent>
                </Card>

                <div className={'flex items-center justify-end gap-4'}>
                    <Button onClick={() => router.back()} variant={'secondary'}>Back</Button>

                    <Button onClick={handleSubmit} disabled={!isChanged}>
                        {isPending ? 'Updating...' : 'Save Changes'}
                    </Button>
                </div>
            </div>
        </main>
    )
}