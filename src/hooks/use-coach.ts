import {useState,useEffect} from "react";
import {User} from "@supabase/auth-js";
import AppToolkit from "@/lib/app-toolkit";
import Coach from "@/types/coachType";
import {getCoach} from "@/actions/coachActions";
import Team from "@/types/teamType";
import {getAllTeamAction} from "@/actions/teamActions";

export default function useCoach() {
    const [coach, setCoach] = useState<Coach | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [coachTeam, setCurrentCoachTeam] = useState<Team[] | null>(null);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const { user, coach } = await getCoach();
                const teams = await getAllTeamAction(true);
                setCurrentCoachTeam(teams);
                setUser(user);
                setCoach(coach);
            } catch (error) {
                setError(AppToolkit.getErrorMessage(error));
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    return { user, coach, isLoading, coachTeam, error };
}