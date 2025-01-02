export default interface AnnouncementType {
    id: string;
    title: string;
    barangayId: string;
    description: string;
    content: object;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
}
