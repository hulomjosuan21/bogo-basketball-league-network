import {ReactNode} from "react";
import {NavbarOne} from "@/components/app-navbars";

export default function Layout({children}:{children: ReactNode}){
    return (
        <article>
            <NavbarOne/>
            <section className={'mt-[80px] pb-[58px]'}>
                {children}
            </section>
        </article>
    )
}