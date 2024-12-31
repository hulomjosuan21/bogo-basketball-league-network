import {getOnePlayerByIdAction} from "@/actions/playerActions";
import Loading from "@/app/loading";

export default async function Page({params}:{params:{id:string}}){
    const { id } = params;

    const {player, isLoading} = await getOnePlayerByIdAction('playerId', id);

    if(isLoading) {
        return  <Loading text={'Getting player ready...'}/>
    }

    if(!player) {
        throw new Error('Coach not found!');
    }

    const _player = JSON.stringify(player,null,2);

    return (
        <main>
            <pre>
                {_player}
            </pre>
        </main>
    )
}