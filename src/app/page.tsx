import LandingPage from "@/app/landingPage";
import {LandingPageNavbar} from "@/components/app-navbars";
import {getAllImageUrls} from "@/utils/supabase/server";
import {getAllBarangay} from "@/actions/barangayActions";
import Footer from "@/components/footer";
import getAllAnnouncementAction from "@/actions/announcementActions";

export default async function Page(){
    const images = await getAllImageUrls('marguee-images');
    const { barangays } = await getAllBarangay();
    const { announcements } = await getAllAnnouncementAction()

    return (
        <main>
            <LandingPageNavbar/>
            <LandingPage images={images} barangays={barangays} announcements={announcements}/>
            <Footer/>
        </main>
    )
}