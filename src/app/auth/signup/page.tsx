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
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import RoleTypes from "@/types/roleTypes";
import {userSignupAction} from "@/app/auth/signup/actions";
import Link from "next/link";
import {cn} from "@/lib/utils";
import DotPattern from "@/components/ui/dot-pattern";
import {LoadingButton} from "@/components/dynamic-button";
import {LoaderCircle} from "lucide-react";
import {useTransition} from "react";
import PasswordInput from "@/components/password-input";
import useAppToast from "@/hooks/use-appToast";

export default function Page(){
    const [isPending, startTransition] = useTransition()
    const { showToast } = useAppToast();

    const handleFormAction = async (formData: FormData) => {
        startTransition(async () => {
            const {errorMessage} = await userSignupAction(formData);
            if(errorMessage){
                showToast("Account error", errorMessage as string, "destructive");
            }else {
                showToast("Account", "Created successfully", "default");
            }
        });
    }

    const signupInputs = (
        <div className={'grid grid-cols-1 sm:grid-cols-2 gap-4'}>
            <div className={'grid items-center gap-4'}>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type={'email'} required={true}/>
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <PasswordInput id="password" name="password" required={true}/>
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="role">Select</Label>
                    <Select name={'role'} required={true}>
                        <SelectTrigger id="role">
                            <SelectValue placeholder="Role"/>
                        </SelectTrigger>
                        <SelectContent position="popper">
                            <SelectItem value={RoleTypes.Player}>Player</SelectItem>
                            <SelectItem value={RoleTypes.TeamManager}>Team manager</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" name="firstName" required={true}/>
                </div>
            </div>

            <div className={'grid items-center gap-4'}>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" name="lastName" required={true}/>
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" name="address" required={true}/>
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="phoneNumber">Phone number</Label>
                    <Input id="phoneNumber" name="phoneNumber" type={'tel'} required={true}/>
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="dateOfBirth">Date of birth</Label>
                    <Input id="dateOfBirth" name="dateOfBirth" type={'date'} required={true}/>
                </div>
            </div>
        </div>
    )

    return (
        <main className={'h-[calc(100svh-58px)] grid place-items-center mt-[58px] pb-[58px] relative'}>
            <NavbarOne/>
            <Form action={handleFormAction}>
                <Card className={'relative m-4 motion-preset-compress z-10 border-b-4 border-b-orange-400 rounded-lg'}>
                    <CardHeader>
                        <CardTitle>Create Account</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {signupInputs}
                    </CardContent>
                    <CardFooter className={'flex flex-col items-center gap-4'}>

                        <span className={'text-xs'}>Already have an account? <Link href={'/auth/signin'} className={'font-bold text-orange-400'}>Sign in</Link></span>

                        <LoadingButton Icon={LoaderCircle} state={isPending} pendingText={'Signing up...'} type={'submit'}>
                            Sign up
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