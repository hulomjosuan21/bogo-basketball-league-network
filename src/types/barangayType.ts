
export default interface Barangay {
    id: string,
    userId: string,
    barangayId: string,
    barangayName: string,
    address: string,
    phoneNumber: string,
    role: string,
    barangayImage: string,
    createdAt: Date,
    updatedAt: Date,
    isAllowed: boolean
}