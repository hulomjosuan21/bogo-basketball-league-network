import PlayerNumberStat from "@/components/player-statsCard";

export default function PlayersStatsSection(){
    return (
        <div>
            <PlayerNumberStat>
                <div className={'grid place-items-center w-full h-full'}>No Team Yet!</div>
            </PlayerNumberStat>
        </div>
    )
}