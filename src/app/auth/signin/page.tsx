'use client'
import {NavbarOne} from "@/components/app-navbars";
import Form from "next/form";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import DotPattern from "@/components/ui/dot-pattern";
import {cn} from "@/lib/utils";
import {signinUserAction} from "@/app/auth/signin/actions";
import {useTransition} from "react";
import {LoadingButton} from "@/components/dynamic-button";
import {LoaderCircle} from "lucide-react";
import PasswordInput from "@/components/password-input";
import useAppToast from "@/hooks/use-appToast";

export default function Page(){
    const [isPending, startTransition] = useTransition()
    const { showToast } = useAppToast()

    const handleFormAction = async (formData: FormData) => {
        startTransition(async () => {
            const {errorMessage} = await signinUserAction(formData);
            if(!errorMessage){
                showToast("Account", "Signed in successfully", "default");
            }else {
                showToast("Account error", errorMessage.message, "destructive");
            }
        });
    }

    const signinInputs = (
        <div className={'grid items-center gap-4'}>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type={'email'} required={true}/>
            </div>

            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <PasswordInput id="password" name="password" required={true}/>
            </div>
        </div>
    )

    return (
        <main className={'h-[calc(100svh-58px)] grid place-items-center mt-[58px] pb-[58px] relative'}>
            <NavbarOne/>
            <Form action={handleFormAction}>
                <Card className={'relative m-4 motion-preset-compress z-10 border-b-4 border-b-orange-400 rounded-lg'}>
                    <CardHeader>
                        <CardTitle>Sign in</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {signinInputs}
                    </CardContent>
                    <CardFooter className={'flex flex-col items-center gap-4'}>

                        <span className={'text-xs'}>Don&#39;t have an account? <Link href={'/auth/signup'}
                                                                                     className={'font-bold text-orange-400'}>Sign up</Link></span>

                        <LoadingButton Icon={LoaderCircle} state={isPending} pendingText={'Signing in...'} type={'submit'}>
                            Sign in
                        </LoadingButton>
                    </CardFooter>
                </Card>
            </Form>
            <DotPattern
                className={cn(
                    "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
                )}
            />
        </main>
    )
}