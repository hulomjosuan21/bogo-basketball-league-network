export enum LEAGUE_STATUS {
    SCHEDULED = "Scheduled",
    ONGOING = "Ongoing",
    COMPLETED = "Completed",
    CANCELED = "Canceled"
}

export default interface League {
    readonly id: string,
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly barangayId: string
    readonly leagueId: string,

    leagueName: string,
    status: LEAGUE_STATUS,
    startDate: Date,
    leagueRegistrationFee: string,
    leagueImageBanner: string
}