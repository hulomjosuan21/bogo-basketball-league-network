export default interface Coach {
    readonly id: string;
    readonly userId: string;
    fullName: string;
    coachId: string;
    coachImage: string | null;
    readonly createdAt: string;
    readonly updatedAt: string;
}