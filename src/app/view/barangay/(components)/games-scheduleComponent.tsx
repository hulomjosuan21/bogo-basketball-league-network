'use client'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Match, MatchStatusType} from "@/types/matchType";
import {Badge} from "@/components/ui/badge";
import AppToolkit from "@/lib/app-toolkit";
import {useEffect, useState} from "react";
import {createClient} from "@/utils/supabase/server";

export default function BarangayMatchScheduleComponent(){
    const [matches, setMatches] = useState<Match[]>([]);

    useEffect(() => {

        const setupSupabase = async () => {
            const supabase = await createClient(); // Create the Supabase client

            const fetchMatches = async () => {
                const { data, error } = await supabase
                    .from("matchesTable")
                    .select("*");

                if (error) {
                    console.error("Error fetching matches:", error);
                } else {
                    setMatches(data);
                }
            };

            await fetchMatches();

            supabase
                .channel("realtime:matchesTable")
                .on(
                    "postgres_changes",
                    { event: "*", schema: "public", table: "matchesTable" },
                    (payload) => {
                        console.log("Change received!", payload);
                        fetchMatches(); // Re-fetch matches after an update
                    }
                )
                .subscribe();
        };

        setupSupabase();
    }, []);

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