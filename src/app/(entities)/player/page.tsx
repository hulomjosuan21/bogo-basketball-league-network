import SearchComponent from "@/components/searchComponent";


export default function Page(){

    return (
        <main className={'flex justify-center'}>
            <div className={'w-[80%]'}>
                <div className={'flex justify-start'}>
                    <SearchComponent/>
                </div>
            </div>
        </main>
    )
}