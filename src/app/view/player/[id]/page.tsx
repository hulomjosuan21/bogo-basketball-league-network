export default async function Page({params}:{params:{id:string}}){
    const { id } = params;


    return (
        <main>Player view page {id}</main>
    )
}