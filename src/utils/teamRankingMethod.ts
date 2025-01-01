import Team from "@/types/teamType";

export function calculateWinPercentage(team: Team): number {
    if (team.gamesPlayed === 0) {
        return 0;
    }
    return (team.gamesWon / team.gamesPlayed) * 100;
}


export function rankTeams(teams: Team[]): Team[] {
    return teams.sort((a, b) => {
        const winPercentageA = calculateWinPercentage(a);
        const winPercentageB = calculateWinPercentage(b);

        if (winPercentageB !== winPercentageA) {
            return winPercentageB - winPercentageA;
        }

        if (b.gamesWon !== a.gamesWon) {
            return b.gamesWon - a.gamesWon;
        }

        return a.teamName.localeCompare(b.teamName);
    });
}