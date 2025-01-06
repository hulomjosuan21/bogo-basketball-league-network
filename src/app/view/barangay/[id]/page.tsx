import {getBarangayByIdAction} from "@/actions/barangayActions";
import Loading from "@/app/loading";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import Image from "next/image";
import AppToolkit from "@/lib/app-toolkit";
import {GoogleMapMarkArray} from "@/components/maps";
import HasLeagueComponent from "@/app/view/barangay/(components)/hasLeague";
import {getActiveLeagueAction} from "@/actions/leagueActions";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {getUser} from "@/utils/supabase/server";
import BarangayMatchScheduleComponent from "@/app/view/barangay/(components)/games-scheduleComponent";
import {getAllMatchByIds} from "@/actions/matchActions";
import getAllAnnouncementAction from "@/actions/announcementActions";
import AnnouncementCardOne from "@/components/announcement-card";
import Footer from "@/components/footer";

export default async function Page({params}:{params:{id:string}}){
    const { id } = await params;
    const { barangay, isLoading } = await getBarangayByIdAction('barangayId', id);

    if(isLoading) {
        return  <Loading text={'Getting barangay...'} height={'h-[calc(100vh-60px)]'}/>
    }

    if(!barangay) {
        throw new Error('Barangay not found!');
    }

    const { activeLeague } = await getActiveLeagueAction(barangay);

    const { user, userData, isLoading: userLoading } = await getUser();

    if(userLoading) {
        return  <Loading height={'h-[calc(100vh-60px)]'}/>
    }

    const isSignedIn = () => {
        if(user && userData && activeLeague){
            return (
                <div>
                    <HasLeagueComponent role={userData.role} league={activeLeague}/>
                </div>
            )
        }else{
            return (
                <div className={'flex flex-col items-center gap-2'}>
                    <span className={'text-xs'}>Join Bogo basketball league network now!</span>

                    <div className={'flex items-center gap-1'}>
                        <Button asChild={true} size={'sm'} variant={'outline'}>
                            <Link href={'/auth/signin'}>
                                Sign in
                            </Link>
                        </Button>
                        <Button asChild={true} size={'sm'}>
                            <Link href={'/auth/signup'}>
                                Sign up
                            </Link>
                        </Button>
                    </div>

                </div>
            )
        }
    }

    const { announcements } = await getAllAnnouncementAction()

    const { matches } = await getAllMatchByIds('leagueId', activeLeague?.leagueId as string);

    return (
        <main className={'flex flex-col items-center'}>
            <section className={'w-[90%] sm:w-[80%] max-w-4xl'}>
                <div className={'flex items-center justify-between gap-4'}>
                    <div className="w-[100px] sm:w-[200px]">
                        <AspectRatio ratio={1}>
                            <Image src={AppToolkit.ImageWithFallBack(barangay.barangayImage).toString()} alt="Image"
                                   className="rounded-md object-cover border" fill={true}/>
                        </AspectRatio>
                    </div>

                    <div className={'flex flex-col items-center gap-2 flex-1 bg-secondary p-4 rounded-lg'}>
                        <span
                            className={'text-lg font-semibold'}>{AppToolkit.TextWithFallBack(barangay.barangayName)}</span>
                        <span className={'text-xs font-medium'}>
                            {AppToolkit.TextWithFallBack(barangay.address)}
                        </span>
                    </div>
                </div>

                <div className={'flex mt-8 justify-between flex-col md:flex-row gap-4'}>
                    <div className={'flex-1'}>
                        <GoogleMapMarkArray barangays={[barangay]}
                                            className={'w-full min-h-[400px] rounded-lg border shadow-lg hover:border-orange-400 transition-all duration-300 ease-in-out'}/>
                    </div>

                    <div className={'flex-1 bg-secondary rounded-lg p-4 grid place-items-center'}>
                        {
                            isSignedIn()
                        }
                    </div>
                </div>

                {
                    (matches.length > 0) ? (

                        <div className={'mt-8'}>

                            <span className={'text-center font-semibold text-lg flex justify-center w-full mb-2'}>Match Schedule</span>

                            <div>
                                <BarangayMatchScheduleComponent matches={matches}/>
                            </div>
                        </div>
                    ) : (
                        <div className={'mt-8 text-center'}>
                            No schedule match
                        </div>
                    )
                }


                <div className={'flex gap-4 flex-wrap mt-2 justify-center'}>
                    {
                        announcements.map((announcement, index) => (
                            <AnnouncementCardOne key={index} announcement={announcement}/>
                        ))
                    }
                </div>
            </section>

            <Footer/>
        </main>
    )
}