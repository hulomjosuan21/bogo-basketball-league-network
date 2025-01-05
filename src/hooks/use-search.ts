import {useState} from "react";
import RoleTypes from "@/types/roleTypes";
import {getPlayerByFullNameAction} from "@/actions/playerActions";
import {getBarangayByNameAction} from "@/actions/barangayActions";
import {Player} from "@/types/playerType";
import Barangay from "@/types/barangayType";

export default function useSearch(){
    const [entity, setEntity] = useState<string>(RoleTypes.Player)
    const [name,setName] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)


    const handleSearch = async () => {
        if(!name){
            return { entity, players: [], barangays: [], empty: true }
        }
        let players: Player[] = [];
        let barangays: Barangay[] = [];

        setIsLoading(true)
        if(entity === RoleTypes.Player){
            const { players: foundPlayers } = await getPlayerByFullNameAction(name)
            players = foundPlayers
        }else if(entity === RoleTypes.BarangayAdmin){
            const { barangays: foundBarangays} = await getBarangayByNameAction(name);
            barangays = foundBarangays
        }
        setIsLoading(false)
        return { entity, players, barangays, empty: false }
    }

    return { handleSearch, setEntity, setName, isLoading }
}