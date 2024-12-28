import LandingPage from "@/app/landingPage";
import {LandingPageNavbar} from "@/components/app-navbars";

export default function Page(){
    return (
        <main>
            <LandingPageNavbar/>
            <LandingPage/>
        </main>
    )
}