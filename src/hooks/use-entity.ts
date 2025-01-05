import {useEffect, useState} from "react";
import {Player} from "@/types/playerType";
import {User} from "@supabase/auth-js";
import {getPlayer} from "@/actions/playerActions";
import AppToolkit from "@/lib/app-toolkit";
import RoleTypes from "@/types/roleTypes";
import {useRouter} from "next/navigation";
import {getBarangay} from "@/actions/barangayActions";
import Barangay from "@/types/barangayType";
import {getTeamManager} from "@/actions/teamManagerActions";
import TeamManagerType from "@/types/managerType";

export default function useEntity(){
    const router = useRouter();
    const [barangay, setBarangay] = useState<Barangay | null>(null);
    const [player, setPlayer] = useState<Player | null>(null);
    const [teamManager, setTeamManager] = useState<TeamManagerType | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [role, setRole] = useState<RoleTypes | null>(null);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const { player } = await getPlayer();
                const { teamManager } = await getTeamManager();
                const { barangay } = await getBarangay();
                setBarangay(barangay)
                setUser(user);
                setPlayer(player);
                setTeamManager(teamManager);
                if (player) {
                    setRole(RoleTypes.Player);
                } else if (teamManager) {
                    setRole(RoleTypes.TeamManager);
                }else if (barangay){
                    setRole(RoleTypes.BarangayAdmin)
                }
            } catch (error) {
                setError(AppToolkit.getErrorMessage(error));
            } finally {
                setIsLoading(false);
            }
        })();
    }, [user]);

    const redirectToRole = () => {
        if (role === RoleTypes.Player) {
            router.push(`/${RoleTypes.Player}`);
        } else if (role === RoleTypes.TeamManager) {
            router.push(`/${RoleTypes.TeamManager}`);
        } else if (role === RoleTypes.BarangayAdmin) {
            router.push(`/${RoleTypes.BarangayAdmin}`);
        }
    };

    const hasEntity = () => {
        return player !== null || teamManager !== null || barangay !== null;
    };

    return { user, player, teamManager, isLoading, error, role, redirectToRole, hasEntity };
}