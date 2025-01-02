import {ChangeEvent, useState} from "react";
import {getPlayerByFullNameAction} from "@/actions/playerActions";
import {Player} from "@/types/playerType";
import useAppToast from "@/hooks/use-appToast";

export default function useSearchPlayer() {
    const [name, setName] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)
    const [foundPlayers, setFoundPlayers] = useState<Player[]>([])
    const { showToast } = useAppToast()
    const handleSetNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    async function handleSearchPlayer() {

        if(!name){
            showToast('Please enter a name','to search','destructive')
            return
        }

        setIsLoading(true)
        const { players: foundPlayers } = await getPlayerByFullNameAction(name)

        if(!(foundPlayers.length > 0)){
            showToast('No player found','with that names','destructive')
        }

        setIsLoading(false)
        setFoundPlayers(foundPlayers)
    }

    return { handleSearchPlayer, handleSetNameInputChange, isLoading, foundPlayers }
}