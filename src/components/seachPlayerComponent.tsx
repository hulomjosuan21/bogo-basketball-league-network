import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Search} from "lucide-react";

export default function SearchPlayerComponent(){
    return (
        <div className={'flex gap-2 items-center'}>
            <Input/>
            <Button><Search/></Button>
        </div>
    )
}