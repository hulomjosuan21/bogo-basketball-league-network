import MapDialog from "@/components/map-dialog";
import SearchComponent from "@/components/searchComponent";
import AnnouncementCardOne from "@/components/announcement-card";
import getAllAnnouncementAction from "@/actions/announcementActions";

export default async function Page(){

    const { announcements } = await getAllAnnouncementAction()

    return (
        <main className={'flex justify-center pb-8'}>
            <div className={'w-[90%] sm:w-[80%] max-w-4xl mt-4'}>
                <div className={'flex justify-between items-end sm:items-center gap-4 sm:gap-8'}>
                    <SearchComponent/>

                    <div className={''}>
                        <MapDialog/>
                    </div>
                </div>

                <div className={'flex gap-4 flex-wrap mt-4 justify-center'}>
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