import {getAllPlayersSubmitLeague} from "@/actions/playerActions";
import {getActiveLeagueAction} from "@/actions/leagueActions";
import {getBarangay} from "@/actions/barangayActions";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import IncludedPlayerButton from "@/app/(admin)/barangayAdmin/page/players/actionComponent";

export default async function Page(){
    const { barangay } = await getBarangay();

    if(!barangay) {
        throw new Error('No found barangay!')
    }

    const { activeLeague } = await getActiveLeagueAction(barangay);

    if(!activeLeague){
        return (
            <div className={'h-[calc(100vh-80px)] grid place-items-center font-semibold'}>
                No active league yet!
            </div>
        )
    }

    const { players } = await getAllPlayersSubmitLeague(activeLeague.leagueId,true);

    const approvedPlayersTable = (
        <Table className={'border-y'}>
            <TableHeader>
                <TableRow className={'bg-secondary'}>
                    <TableHead>Name</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    players.map((player,index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{player.fullName}</TableCell>
                            <TableCell>
                                <div className={'flex items-center justify-end'}>
                                    <IncludedPlayerButton player={player}/>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>

    )

    return (
        <main>
            <div className={'p-2'}>
                <Button asChild={true} size={'sm'}>
                    <Link href={'/barangayAdmin/page/players/pending'}>
                        Player Requests
                    </Link>
                </Button>
            </div>

            <div>
                {
                    players.length > 0 ? (
                        approvedPlayersTable
                    ): (
                        <div className={'h-[calc(100vh-100px)] grid place-items-center font-semibold'}>
                            No Player!
                        </div>
                    )
                }
            </div>
        </main>
    )
}