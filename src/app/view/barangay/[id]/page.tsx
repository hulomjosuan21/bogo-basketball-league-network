export default async function Page({params}:{params:{id:string}}){
    const { id } = params;


    return (
        <main>Barangay view page {id}</main>
    )
}