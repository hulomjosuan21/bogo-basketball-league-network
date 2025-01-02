'use client'
import {
    Card,
    CardContent, CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {AspectRatio} from "@/components/ui/aspect-ratio";
import Image from "next/image";
import {ScrollArea} from "@/components/ui/scroll-area";
import AnnouncementType from "@/types/announcementType";
import Link from "next/link";
import AppToolkit from "@/lib/app-toolkit";
import Head from "next/head";
import {Button} from "@/components/ui/button";
import {shareToFacebook} from "@/utils/functions";

type Props = {
    announcement: AnnouncementType
}

export default function AnnouncementCardOne({announcement}:Props){
    return (
        <>


            <Card className={'w-[298px]'}>
                <CardHeader className={'pb-1'}>
                    <CardTitle className={'text-md'}>{announcement.title}</CardTitle>
                    <ScrollArea className="h-[60px] p-2 text-xs">
                        {announcement.description}
                    </ScrollArea>
                </CardHeader>
                <CardContent>
                    <div className="w-[250px]">
                        <AspectRatio ratio={1}>
                            <Link href={AppToolkit.ImageWithFallBack(announcement.image).toString()} target={'_blank'}>
                                <Image src={AppToolkit.ImageWithFallBack(announcement.image)} alt="Image" className="rounded-md object-cover" fill={true}/>
                            </Link>
                        </AspectRatio>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button size={'sm'} onClick={() => shareToFacebook(`https://localhost:3000/view/announcement/${announcement.id}`)}>
                        Share
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}