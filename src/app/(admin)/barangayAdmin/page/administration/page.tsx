'use client'
import {Button} from "@/components/ui/button";
import {deleteImage} from "@/utils/supabase/server";

export default function Page(){

    const handleDelete = async () => {
        const {error} = await deleteImage("https://fhqrhedvhaesfwytqxut.supabase.co/storage/v1/object/public/avatars/bogobasketballleaguenetwork-285d8926.jpg");

        if(error){
            alert('Image delete failed')
        }else{
            alert('Image deleted successfully')
        }
    }

    return (
        <main>
            <Button onClick={handleDelete}>Delete</Button>
        </main>
    )
}