import {getOneCoachByIdAction} from "@/actions/coachActions";
import Loading from "@/app/loading";

export default async function Page({params}:{params:{id:string}}){
    const { id } = params;
    const { coach, isLoading } = await getOneCoachByIdAction('coachId', id);

    if(isLoading) {
        return  <Loading text={'Getting coach ready...'}/>
    }

    if(!coach) {
        throw new Error('Coach not found!');
    }

    const _coach = JSON.stringify(coach,null,2);

    return (
        <main>
            <pre>
                {_coach}
            </pre>
        </main>
    )
}