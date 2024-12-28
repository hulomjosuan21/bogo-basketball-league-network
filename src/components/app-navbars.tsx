import Link from "next/link";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import Image from "next/image";
import favicon from "@/assets/favicon.svg";
import {ToggleTheme} from "@/components/toggle-theme";
import {Button} from "@/components/ui/button";

export function NavbarOne(){
    return (
        <header className={'fixed top-0 left-0 w-full items-center flex justify-between z-50 py-4 px-8 h-[58px] bg-background'}>
            <div>
                <Link
                    href={'/'}
                    aria-label={'landing page'}
                >
                    <div className="w-6">
                        <AspectRatio ratio={1}>
                            <Image src={favicon} alt="Image" className="object-cover"/>
                        </AspectRatio>
                    </div>
                </Link>
            </div>

            <div>
                <ToggleTheme btnVariant={'ghost'}/>
            </div>
        </header>
    )
}

export function LandingPageNavbar(){
    return (
        <header className={'motion-preset-fade motion-duration-1000 h-[58px] top-0 left-0 w-full flex fixed bg-background z-50 justify-center'}>
            <div className={'w-[80%] sm:w-[60%] h-full flex items-center justify-between'}>
                <div>
                    <div className="size-8">
                        <AspectRatio ratio={1}>
                            <Image src={favicon} alt="Image" className="object-contain" fill={true}/>
                        </AspectRatio>
                    </div>
                </div>

                <div className={'flex gap-4 items-center'}>
                    <Button variant={'outline'} size={'sm'} asChild={true}>
                        <Link href="/auth/signin">Sign in</Link>
                    </Button>
                    <Button size={'sm'} asChild={true}>
                        <Link href="/auth/signup">Sign up</Link>
                    </Button>
                    <ToggleTheme btnVariant={'ghost'} btnSize={'sm'}/>
                </div>
            </div>
        </header>
    )
}