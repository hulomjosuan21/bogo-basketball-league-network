import Link from "next/link";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import Image from "next/image";
import favicon from "@/assets/favicon.svg";
import {ToggleTheme} from "@/components/toggle-theme";

export default function NavbarOne(){
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