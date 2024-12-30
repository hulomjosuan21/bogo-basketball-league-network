'use client'
import useBarangay from "@/hooks/use-barangay";
import {Badge} from "@/components/ui/badge";
import LeagueCard from "@/components/leagueDashboardCard";
import {useEffect, useState} from "react";
import {getActiveLeagueAction} from "@/actions/leagueActions";
import League from "@/types/leagueTypes";
import Loading from "@/app/loading";

export default function Page(){
    const { barangay, error ,isLoading: gettingBarangaLoading } = useBarangay();
    const [_activeLeague, set_activeLeague] = useState<League | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        (async () => {
            if(barangay){
                setIsLoading(true);
                const { activeLeague } = await getActiveLeagueAction(barangay);
                set_activeLeague(activeLeague);
                setIsLoading(false);
            }
        })()
    }, [barangay])

    if(gettingBarangaLoading){
        return <Loading text={'Getting barangay ready...'} height={'h-[calc(100vh-45px)]'}/>
    }

    if (isLoading){
        return <Loading text={'Getting barangay data ready...'} height={'h-[calc(100vh-45px)]'}/>
    }

    if(!barangay){
        throw new Error("Barangay not found")!
    }

    if(error){
        throw new Error(error)
    }

    return (
        <main className={'flex justify-center'}>

            <section className={'w-[80%]'}>
                <div className={'mt-[8vh]'}>
                    <div className={'font-semibold text-lg sm:text-2xl flex items-center gap-2'}>Bogo Basketball League Network<Badge variant={'outline'}>{barangay.barangayName}</Badge></div>
                </div>


                <div className={'mt-[6vh]'}>
                    {
                        _activeLeague && (
                            <LeagueCard league={_activeLeague}/>
                        )
                    }
                </div>
            </section>

        </main>
    )
}