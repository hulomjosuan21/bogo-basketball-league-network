
export default interface Barangay {
    readonly id: string,
    readonly userId: string,
    barangayId: string,
    barangayName: string,
    address: string,
    phoneNumber: string,
    role: string,
    barangayImage: string,
    readonly createdAt: string;
    readonly updatedAt: string;
    isAllowed: boolean
}