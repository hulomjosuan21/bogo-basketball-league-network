import getTeamById from "@/actions/teamActions";
import UpdateTeamDataComponent from "@/components/update-teamComponent";

export default async function Page({params}:{params:{id:string}}){
    const { id } = await params;
    const { team } = await getTeamById(id)

    return (
        <main>
            <UpdateTeamDataComponent teamData={team} />
        </main>
    )
}