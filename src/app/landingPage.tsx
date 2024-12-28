import {cn} from "@/lib/utils";
import DotPattern from "@/components/ui/dot-pattern";
import Safari from "@/components/ui/safari";
import femalePlayerImage from "@/assets/images/female-player.png"
import malePlayerImage from "@/assets/images/male-player.png"
import {AspectRatio} from "@/components/ui/aspect-ratio";
import Image from "next/image";
import {Button} from "@/components/ui/button";

export default function LandingPage(){
    return (
        <section className={'mt-[58px] grid place-items-center'}>
            <div className={'flex flex-wrap items-center justify-center gap-4'}>
                <div>
                    <article className={'h-[60vh] flex items-center relative'}>
                        <div className={'flex flex-col items-center gap-4'}>
                            <span className={'motion-preset-compress mx-4 font-semibold text-2xl sm:text-4xl break-words text-center'}>Bogo Basketball League Network</span>
                            <Button className={'motion-preset-compress '}>Get started</Button>
                        </div>

                        <DotPattern
                            className={cn(
                                "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
                            )}
                        />
                    </article>
                </div>

                <div className={'flex justify-center items-center m-43'}>
                    <div className="motion-preset-compress w-[340px] md:w-[440px] border rounded-lg overflow-hidden">
                        <AspectRatio ratio={1}>
                            <Image src={malePlayerImage} alt="Image" className="object-cover" fill={true}/>
                        </AspectRatio>
                    </div>
                </div>
            </div>


            <div className="relative m-4">
                <Safari url="bogobasketballleaguenetwork.com" className="size-full relative motion-preset-fade"
                        imageSrc={femalePlayerImage.src}/>
            </div>
        </section>
    )
}