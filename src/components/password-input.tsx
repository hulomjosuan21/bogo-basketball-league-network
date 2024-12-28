'use client'
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Eye, EyeOff} from "lucide-react";

type Props = {
    placeholder?: string;
    name?: string;
    id?: string;
    value?: string;
    required?: boolean;
    disabled?: boolean;
}

export default function PasswordInput({placeholder,name,id,value,required,disabled}:Props){
    const [view, setView] = useState(false);

    return (
        <div className={'flex relative items-center'}>
            <Input
                type={view ? 'text' : 'password'}
                value={value}
                id={id}
                name={name}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                className={'pr-10'} // Add padding to the right to avoid overlap with the button
            />
            <Button
                type="button"
                onClick={() => setView(!view)}
                className={'absolute right-2 w-6 h-6'}
                variant={'ghost'}
                size={'icon'}
            >
                {view ? <EyeOff className={'icon-sm'}/> : <Eye className={'icon-sm'}/>}
            </Button>
        </div>
    )
}