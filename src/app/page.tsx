import {getUser} from "@/utils/supabase/server";

export default async function Home(){
    const {userData} = await getUser();

    return <pre>{JSON.stringify(userData, null, 2)}</pre>
}