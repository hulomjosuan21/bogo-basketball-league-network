import CreateNewAnnouncementComponent from "@/app/(admin)/barangayAdmin/page/announcement/createNewAnnouncement";
import AnnouncementCardOne from "@/components/announcement-card";
import getAllAnnouncementAction from "@/actions/announcementActions";
import {getBarangay} from "@/actions/barangayActions";

export default async function Page(){
    const { barangay } = await getBarangay()

    if(!barangay){
        throw new Error('Barangay not found')!
    }

    const { announcements } = await getAllAnnouncementAction(barangay.barangayId)

    return (
        <main className={'flex items-center flex-col gap-4'}>
            <div className={'w-[80%] pt-4'}>
                <CreateNewAnnouncementComponent/>

                <div className={'flex gap-4 flex-wrap mt-4 justify-center sm:justify-start'}>
                    {
                        announcements.map((announcement, index) => (
                            <AnnouncementCardOne key={index} announcement={announcement}/>
                        ))
                    }
                </div>
            </div>

        </main>
    )
}