import AnnouncementCardOne from "@/components/announcement-card";
import {getAnnouncementById} from "@/actions/announcementActions";
import Head from "next/head";

export default async function Page({params}:{params:{id:string}}){
    const {id} = await params;

    const { announcement, errorMessage } = await getAnnouncementById(id);

    if(!announcement){
        throw new Error(errorMessage);
    }

    return (
        <>
            <Head>
                <title>{announcement.title}</title>
                <meta property="og:title" content={announcement.title}/>
                <meta property="og:description" content={announcement.description}/>
                <meta property="og:image" content={announcement.image?.toString()}/>
                <meta property="og:url" content={`https://your-domain.com/announcement/${announcement.id}`}/>
                <meta property="og:type" content="website"/>
            </Head>

            <div className={'h-screen grid place-items-center'}>
                <AnnouncementCardOne announcement={announcement}/>
            </div>
        </>
    )
}