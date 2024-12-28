import {useState,useEffect} from "react";
import {getPlayer} from "@/actions/playerActions";
import {User} from "@supabase/auth-js";
import {Player} from "@/types/playerType";
import AppToolkit from "@/lib/app-toolkit";

export default function usePlayer() {
    const [player, setPlayer] = useState<Player | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const { user, player } = await getPlayer();
                setUser(user);
                setPlayer(player);
            } catch (error) {
                setError(AppToolkit.getErrorMessage(error));
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    return { user, player, isLoading, error };
}