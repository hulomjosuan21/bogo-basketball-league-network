export default interface Coach {
    readonly id: string;
    readonly userId: string;
    fullName: string;
    coachId: string;
    teamId: string;

    readonly createdAt: string;
    readonly updatedAt: string;
}