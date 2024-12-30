export default async function Page({params}:{params:{id:string}}){
    const { id } = params;


    return (
        <main>Coach view page {id}</main>
    )
}