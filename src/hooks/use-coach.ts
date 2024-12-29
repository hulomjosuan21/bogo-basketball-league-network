import {useState,useEffect} from "react";
import {User} from "@supabase/auth-js";
import AppToolkit from "@/lib/app-toolkit";
import Coach from "@/types/coachType";
import {getCoach} from "@/actions/coachActions";

export default function useCoach() {
    const [coach, setCoach] = useState<Coach | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const { user, coach } = await getCoach();
                setUser(user);
                setCoach(coach);
            } catch (error) {
                setError(AppToolkit.getErrorMessage(error));
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    return { user, coach, isLoading, error };
}