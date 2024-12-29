import {useState,useEffect} from "react";
import {User} from "@supabase/auth-js";
import AppToolkit from "@/lib/app-toolkit";
import UserDataType from "@/types/userDataType";
import {getUser} from "@/utils/supabase/server";

export default function useUserData() {
    const [userData, setUserData] = useState<UserDataType | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const { user, userData, errorMessage } = await getUser();
                setError(errorMessage)
                setUser(user);
                setUserData(userData);
            } catch (error) {
                setError(AppToolkit.getErrorMessage(error));
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    return { user, userData, isLoading, error };
}