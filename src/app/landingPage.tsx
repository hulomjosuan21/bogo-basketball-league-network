'use client'
import {cn} from "@/lib/utils";
import DotPattern from "@/components/ui/dot-pattern";
import Safari from "@/components/ui/safari";
import femalePlayerImage from "@/assets/images/female-player.png"
import malePlayerImage from "@/assets/images/male-player.jpg"
import {AspectRatio} from "@/components/ui/aspect-ratio";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import useEntity from "@/hooks/use-entity";
import {MarqueeComponent} from "@/components/marguee";
import useDriver from "@/hooks/use-driver";
import {Info} from "lucide-react";
import Barangay from "@/types/barangayType";
import {GoogleMapMarkArray} from "@/components/maps";

type Props = {
    images: string[],
    barangays: Barangay[]
}

export default function LandingPage({images,barangays}:Props){
    const { hasEntity, redirectToRole } = useEntity();
    const { start } = useDriver()

    const handleDriver = () => {
        const steps = [
            {
                element: '#one',
                popover: {
                    title: 'This is test player woman!',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, rem!',
                },
            },
            {
                element: '#two',
                popover: {
                    title: 'This is TestWoman!',
                    description: 'Lorem ipsum dolor sit amet.',
                },
            },
            {
                element: '#three',
                popover: {
                    title: 'Test',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, rem!',
                },
            }
        ];
        start(steps)
    }

    return (
        <section className={'mt-[58px] grid place-items-center'}>
            {
                hasEntity() && (
                    <Button className={'motion-preset-compress fixed bottom-2 right-2 z-50'} variant={'secondary'}
                            onClick={redirectToRole}>
                        Back
                    </Button>
                )
            }
            <div className={'flex flex-wrap items-center justify-center gap-4'}>
                <div>
                    <article className={'h-[60vh] flex items-center relative'}>
                        <div className={'flex flex-col items-center gap-4 z-10'}>
                            <span
                                className={'motion-preset-compress mx-4 font-semibold text-2xl sm:text-4xl break-words text-center'}>Bogo Basketball League Network</span>
                            <div className={'flex justify-center items-center gap-4'}>
                                <Button className={'motion-preset-compress '} asChild={true}>
                                    <Link href={'/auth/signup'}>Get started</Link>
                                </Button>
                                <Button variant={'ghost'} size={'icon'} onClick={handleDriver}><Info
                                    className={'icon-sm'}/></Button>
                            </div>
                        </div>

                        <DotPattern
                            className={cn(
                                "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
                            )}
                        />
                    </article>
                </div>

                <div className={'flex justify-center items-center m-4'}>
                    <div className="motion-preset-compress w-[340px] md:w-[440px] border rounded-lg overflow-hidden">
                        <AspectRatio ratio={1}>
                            <Image src={femalePlayerImage.src} alt="Image" className="object-cover" fill={true}
                                   id={'one'}/>
                        </AspectRatio>
                    </div>
                </div>
            </div>


            <div className="relative m-4">
                <Safari url="bogobasketballleaguenetwork.com" className="size-full relative motion-preset-fade"
                        imageSrc={malePlayerImage.src} id={'two'}/>
            </div>

            {
                images.length > 2 && (
                    <div className={'m-8 w-full overflow-hidden'} id={'three'}>
                        <MarqueeComponent images={images}/>
                    </div>
                )
            }

            <section className="flex w-full p-4" id={'map'}>
                <GoogleMapMarkArray barangays={barangays} className={'w-full min-h-[60vh] rounded-lg border shadow-lg hover:border-orange-400 transition-all duration-300 ease-in-out'}/>
            </section>

        </section>
    )
}