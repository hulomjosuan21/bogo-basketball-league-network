'use client'
import {Button} from "@/components/ui/button";
import {sendSmsAction} from "@/actions/sendSmsActions";
import Form from "next/form";
import {Input} from "@/components/ui/input";

export default function Page(){

    const handleSend = async (formData: FormData) => {
        const text = formData.get('text') as string
        const { errorMessage } = await sendSmsAction('639682006456',text)

        if (errorMessage) {
            alert(errorMessage)
        } else {
            alert('SMS sent')
        }
    }

    return (
        <main className={''}>
            <Form action={handleSend}>
                <div className={'flex items-center gap-4'}>
                    <Input placeholder={'Text'} name={'text'} />
                    <Button>
                        Send
                    </Button>
                </div>
            </Form>
        </main>
    )
}