import { Button } from "@/components/ui/button";
import Link from "next/link";
import TeamCard from "./(components)/teamCard";

export default async function Page(){


    return (
        <main className={'flex flex-col items-center'}>
            <div className="w-[80%] max-w-4xl">
                <Button asChild={true} size={'sm'}>
                    <Link href={'/team_manager/page/team/create'}>
                        New team
                    </Link>
                </Button>

                <div className={'flex flex-wrap gap-4'}>
                    <TeamCard/>
                </div>
            </div>

        </main>
    )
}