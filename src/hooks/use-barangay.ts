import {useState,useEffect} from "react";
import {User} from "@supabase/auth-js";
import AppToolkit from "@/lib/app-toolkit";
import {getBarangay} from "@/actions/barangayActions";
import Barangay from "@/types/barangayType";

export default function useBarangay() {
    const [barangay, setBarangay] = useState<Barangay | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const { user, barangay } = await getBarangay();
                setUser(user);
                setBarangay(barangay);
            } catch (error) {
                setError(AppToolkit.getErrorMessage(error));
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    return { user, barangay, isLoading, error };
}