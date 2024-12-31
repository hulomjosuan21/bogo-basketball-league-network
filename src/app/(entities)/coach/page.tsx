import SearchComponent from "@/components/searchComponent";
import MapDialog from "@/components/map-dialog";

export default function Page(){
    return (
        <main className={'flex justify-center'}>
            <div className={'w-[90%] sm:w-[80%] max-w-4xl mt-4'}>
                <div className={'flex justify-between items-end sm:items-center gap-4 sm:gap-8'}>
                    <SearchComponent/>

                    <div className={''}>
                        <MapDialog/>
                    </div>
                </div>
            </div>
        </main>
    )
}