import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import League from "@/types/leagueTypes";
import AppToolkit from "@/lib/app-toolkit";
import Image from "next/image";
import {Separator} from "@/components/ui/separator";
import {AspectRatio} from "@/components/ui/aspect-ratio";

type Props = {
    league: League | null
}

export default function LeagueCard({ league }: Props) {
    return (
        <Card className="w-full max-w-sm bg-secondary border-none shadow-none">
            <CardHeader className="flex flex-row items-center gap-2">
                <h2 className="text-lg font-semibold">{AppToolkit.TextWithFallBack(league?.leagueName)}</h2>
                <Badge variant='outline'>
                    Active
                </Badge>
            </CardHeader>
            <CardContent>
                <div className={'flex justify-center p-1 flex-row items-center m-4'}>
                    <div className="w-[150px]">
                        <AspectRatio ratio={1}>
                            <Image src={AppToolkit.ImageWithFallBack(league?.leagueImageBanner)} alt="Image"
                                   className="rounded-md object-cover" fill={true}/>
                        </AspectRatio>
                    </div>
                </div>
                <Separator/>
            </CardContent>
        </Card>
    )
}

