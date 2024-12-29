
export default interface UserDataType {
    readonly id: string,
    readonly userId: string,

    email: string,
    firstName: string,
    lastName: string,
    address: string,
    phoneNumber: string,
    dateOfBirth: string,
    userImage: string | null,
    role: string,

    readonly createdAt: string,
    readonly updatedAt: string,
}