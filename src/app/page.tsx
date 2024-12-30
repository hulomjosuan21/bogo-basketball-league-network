import LandingPage from "@/app/landingPage";
import {LandingPageNavbar} from "@/components/app-navbars";
import {getAllImageUrls} from "@/utils/supabase/server";
import {getAllBarangay} from "@/actions/barangayActions";
import Footer from "@/components/footer";

export default async function Page(){
    const images = await getAllImageUrls('marguee-images');
    const { barangays } = await getAllBarangay();
    return (
        <main>
            <LandingPageNavbar/>
            <LandingPage images={images} barangays={barangays}/>
            <Footer/>
        </main>
    )
}