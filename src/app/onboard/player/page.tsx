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
import Link from "next/link";
import {cn, GenderTypes} from "@/lib/utils";
import DotPattern from "@/components/ui/dot-pattern";
import {LoadingButton} from "@/components/dynamic-button";
import {LoaderCircle} from "lucide-react";
import {useState, useTransition} from "react";
import useAppToast from "@/hooks/use-appToast";
import {Checkbox} from "@/components/ui/checkbox";
import {PLAYER_POSITION} from "@/types/playerType";
import {insertPlayerData} from "@/actions/playerActions";
import {useRouter} from "next/navigation";
import {Separator} from "@/components/ui/separator";

export default function Page(){
    const [isPending, startTransition] = useTransition()
    const { showToast } = useAppToast();
    const router = useRouter()

    const [isLater, setIsLater] = useState(false);
    const handleCheckboxChange = (checked: boolean) => {
        setIsLater(checked);
    };
    const handleFormAction = async (formData: FormData) => {
        startTransition(async () => {
            const {errorMessage} = await insertPlayerData(formData);
            if(errorMessage){
                showToast('Failed to set you onboard!', errorMessage, 'destructive');
            }else{
                showToast('Successfully onboard!', null, 'default');
                router.back();
            }
        });
    }

    const signupInputs = (
        <div className={'grid grid-cols-1 sm:grid-cols-2 gap-4'}>
            <div className={'grid items-center gap-4'}>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="nickname">Nickname</Label>
                    <Input id="nickname" name="nickname" required={true}/>
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="jerseyNumber">Primary jersey number</Label>
                    <Input id="jerseyNumber" name="jerseyNumber" type={'number'} required={true}/>
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="primaryPosition">Select</Label>
                    <Select name={'primaryPosition'} required={true}>
                        <SelectTrigger id="primaryPosition">
                            <SelectValue placeholder="Primary position"/>
                        </SelectTrigger>
                        <SelectContent position="popper">
                            {
                                Object.values(PLAYER_POSITION).map((role) => (
                                    <SelectItem key={role} value={role}>{role}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className={'grid items-center gap-4'}>
                <div className="flex items-center space-x-2">
                    <Checkbox id="later" onCheckedChange={handleCheckboxChange}/>
                    <label
                        htmlFor="later"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        I&#39;ll do this later
                    </label>
                </div>

                <div className={'flex gap-1 justify-center'}>
                    <div className="flex flex-col space-y-1.5 w-24">
                        <Label htmlFor="playerHeight">Height</Label>
                        <Input id="playerHeight" name="playerHeight" type={'number'} disabled={isLater}/>
                    </div>

                    <div className="flex flex-col space-y-1.5 w-24">
                        <Label htmlFor="playerWeight">Weight</Label>
                        <Input id="playerWeight" name="playerWeight" type={'number'} disabled={isLater}/>
                    </div>
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="secondaryPosition">Select</Label>
                    <Select name={'secondaryPosition'} disabled={isLater}>
                        <SelectTrigger id="secondaryPosition">
                            <SelectValue placeholder="Secondary position"/>
                        </SelectTrigger>
                        <SelectContent position="popper">
                            {
                                Object.values(PLAYER_POSITION).map((role) => (
                                    <SelectItem key={role} value={role}>{role}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>

                <Separator/>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="gender">Select</Label>
                    <Select name={'gender'} required={true}>
                        <SelectTrigger id="gender">
                            <SelectValue placeholder="Gender"/>
                        </SelectTrigger>
                        <SelectContent position="popper">
                            {
                                Object.values(GenderTypes).map((gender) => (
                                    <SelectItem key={gender} value={gender}>{gender}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
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
                        <CardTitle>Setup your player profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {signupInputs}
                    </CardContent>
                    <CardFooter className={'flex flex-col items-center gap-4'}>

                        <LoadingButton Icon={LoaderCircle} state={isPending} pendingText={'Signing up...'}
                                       type={'submit'}>
                            Continue
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