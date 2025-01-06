import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Match, MatchStatusType} from "@/types/matchType";
import AppToolkit from "@/lib/app-toolkit";
import { Badge } from "@/components/ui/badge";

export default function BarangayMatchScheduleComponent({matches}:{matches: Match[]}){

    const matchTable = () => {
        if(matches.length > 0){
            return (
                <Table>
                    <TableHeader>
                        <TableRow className={'bg-secondary'}>
                            <TableHead>Matched team</TableHead>
                            <TableHead>Bracket</TableHead>
                            <TableHead>Schedule date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            matches.filter(m => m.status !== MatchStatusType.CANCELLED).map((match,index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{match.matchedTeam[0].teamName} <span className={'text-orange-400'}>vs</span> {match.matchedTeam[1].teamName}</TableCell>
                                    <TableCell>
                                        <Badge variant={'secondary'} className={'text-xs text-center'}>
                                            {match.bracket.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {AppToolkit.dateFormatter(match.date,true)}
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            )
        }else{
            return (
                <div className={'text-center mt-4'}>
                    No match scheduled
                </div>
            )
        }
    }

    return (
        <div className={'border rounded-md'}>
            {matchTable()}
        </div>
    )
}