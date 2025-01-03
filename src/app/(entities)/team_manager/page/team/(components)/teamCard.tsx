import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AppToolkit from "@/lib/app-toolkit";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";

export default function TeamCard(){
    return (
        <Card className="w-[250px]">
            <CardHeader>
                <CardTitle/>
            </CardHeader>
            <CardContent>
                <div>
                <div className="w-full">
                    <AspectRatio ratio={1}>
                        <Image src={AppToolkit.ImageWithFallBack('')} alt="Image" className="rounded-md object-cover" fill={true} />
                    </AspectRatio>
                </div>

                </div>
            </CardContent>
            <CardFooter>
                <p className={'break-work'}>Card Footer Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit, voluptate?</p>
            </CardFooter>
        </Card>
    )
}