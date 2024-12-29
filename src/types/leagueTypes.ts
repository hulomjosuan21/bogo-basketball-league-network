export enum LEAGUE_STATUS {
    SCHEDULED = "Scheduled",
    ONGOING = "Ongoing",
    COMPLETED = "Completed",
    CANCELED = "Canceled"
}

export default interface League {
    readonly id: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly barangayId: string
    readonly leagueId: string,

    leagueName: string,
    status: LEAGUE_STATUS,
    startDate: Date,
    leagueRegistrationFee: number,
    leagueImageBanner: string
}