import {Button} from "@/components/ui/button";
import {MapPinned} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {getAllBarangay} from "@/actions/barangayActions";
import {GoogleMapMarkArray} from "@/components/maps";

export default async function MapDialog(){
    const { barangays } = await getAllBarangay()

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild={true}>
                    <Button variant={'ghost'} size={'sm'}><MapPinned /></Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader className={'hidden'}>
                        <DialogTitle/>
                    </DialogHeader>

                    <div className={'mt-8'}>
                        <GoogleMapMarkArray barangays={barangays} className={'aspect-square rounded-md'}/>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}