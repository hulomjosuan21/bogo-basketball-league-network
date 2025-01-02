export default interface TeamManagerType {
    readonly id: string;
    readonly userId: string;
    fullName: string;
    teamManagerId: string;
    teamId: string;
    readonly createdAt: string;
    readonly updatedAt: string;
}