import {useEffect, useState} from "react";
import {Player} from "@/types/playerType";
import {User} from "@supabase/auth-js";
import {getPlayer} from "@/actions/playerActions";
import AppToolkit from "@/lib/app-toolkit";
import Coach from "@/types/coachType";
import {getCoach} from "@/actions/coachActions";
import RoleTypes from "@/types/roleTypes";
import {useRouter} from "next/navigation";
import {getBarangay} from "@/actions/barangayActions";
import Barangay from "@/types/barangayType";

export default function useEntity(){
    const router = useRouter();
    const [barangay, setBarangay] = useState<Barangay | null>(null);
    const [player, setPlayer] = useState<Player | null>(null);
    const [coach, setCoach] = useState<Coach | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [role, setRole] = useState<RoleTypes | null>(null);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const { player } = await getPlayer();
                const { coach } = await getCoach();
                const { barangay } = await getBarangay();
                setBarangay(barangay)
                setUser(user);
                setPlayer(player);
                setCoach(coach);
                if (player) {
                    setRole(RoleTypes.Player);
                } else if (coach) {
                    setRole(RoleTypes.Coach);
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
        } else if (role === RoleTypes.Coach) {
            router.push(`/${RoleTypes.Coach}`);
        } else if (role === RoleTypes.BarangayAdmin) {
            router.push(`/${RoleTypes.BarangayAdmin}`);
        }
    };

    const hasEntity = () => {
        return player !== null || coach !== null || barangay !== null;
    };

    return { user, player, coach, isLoading, error, role, redirectToRole, hasEntity };
}