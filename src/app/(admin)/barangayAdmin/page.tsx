'use client'
import useBarangay from "@/hooks/use-barangay";
import {Badge} from "@/components/ui/badge";

export default function Page(){
    const { barangay } = useBarangay();

    if(!barangay){
        return  null
    }

    return (
        <main className={'h-[400vh] flex justify-center'}>

            <section className={'w-[80%]'}>
                <div className={'mt-4'}>
                    <div className={'font-semibold text-lg sm:text-2xl flex items-center gap-2'}>Bogo Basketball League Network<Badge variant={'outline'}>{barangay.barangayName}</Badge></div>
                </div>
            </section>

        </main>
    )
}