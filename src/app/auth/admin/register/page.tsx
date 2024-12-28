'use client'
import {NavbarOne} from "@/components/app-navbars";
import Form from "next/form";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {cn} from "@/lib/utils";
import DotPattern from "@/components/ui/dot-pattern";
import {LoadingButton} from "@/components/dynamic-button";
import {LoaderCircle} from "lucide-react";
import {useTransition} from "react";
import PasswordInput from "@/components/password-input";
import {createBarangayAccountAction} from "@/app/auth/admin/register/actions";
import useAppToast from "@/hooks/use-appToast";

export default function Page(){
    const [isPending, startTransition] = useTransition()
    const { showToast } = useAppToast()

    const handleFormAction = async (formData: FormData) => {
        startTransition(async () => {
            const { errorMessage } = await createBarangayAccountAction(formData);

            if(!errorMessage){
                showToast("Barangay account", "Created successfully wait for super admin to approve the barangay registration", "default");
            }else{
                showToast("Barangay account error", errorMessage as string, "destructive");
            }
        });
    }

    const signupInputs = (
        <div className={'grid gap-4'}>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type={'email'} required={true}/>
            </div>

            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <PasswordInput id="password" name="password" required={true}/>
            </div>

            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="barangayName">Barangay name</Label>
                <Input id="barangayName" name="barangayName" required={true}/>
            </div>

            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="address">Barangay address</Label>
                <Input id="address" name="address" required={true}/>
            </div>

            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="phoneNumber">Phone number</Label>
                <Input id="phoneNumber" name="phoneNumber" required={true} type={'tel'}/>
            </div>
        </div>
    )

    return (
        <main className={'h-[calc(100svh-58px)] grid place-items-center mt-[58px] pb-[58px] relative'}>
            <NavbarOne/>
            <Form action={handleFormAction}>
            <Card className={'relative m-4 motion-preset-compress z-10 border-b-4 border-b-orange-400 rounded-lg'}>
                    <CardHeader>
                        <CardTitle>Create Barangay account</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {signupInputs}
                    </CardContent>
                    <CardFooter className={'flex flex-col items-center gap-4'}>

                        <LoadingButton Icon={LoaderCircle} state={isPending} pendingText={'Registering...'} type={'submit'}>
                            Register
                        </LoadingButton>
                    </CardFooter>
                </Card>
            </Form>

            <DotPattern
                className={cn(
                    "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
                )}
            />
        </main>
    )
}