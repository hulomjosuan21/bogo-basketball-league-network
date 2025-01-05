import {useState, useEffect, useTransition} from "react";
import UserDataType from "@/types/userDataType";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import AppToolkit from "@/lib/app-toolkit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {updateUserDataAction} from "@/actions/userActions";
import useAppToast from "@/hooks/use-appToast";
import {signOutAction} from "@/actions/appActions";
import Loading from "@/app/loading";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {GenderTypes} from "@/lib/utils";

type Props = {
    userData: UserDataType;
    gender?: string;
};

export default function UserProfile({ userData, gender }: Props) {
    const [isPending, startTransition] = useTransition()
    const [isSigningOut, startTransitionIsSigningOut] = useTransition()
    const { showToast } = useAppToast()
    const [formData, setFormData] = useState({
        firstName: userData.firstName,
        lastName: userData.lastName,
        address: userData.address,
        dateOfBirth: userData.dateOfBirth,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
    });

    const handleSignOut = () => {
        startTransitionIsSigningOut(async () => {
            await signOutAction('/auth/signin')
        })
    }

    const [isChanged, setIsChanged] = useState(false);
    const handleSelectChange = (value: string) => {
    };

    useEffect(() => {
        const hasChanges =
            JSON.stringify(formData) !==
            JSON.stringify({
                firstName: userData.firstName,
                lastName: userData.lastName,
                address: userData.address,
                dateOfBirth: userData.dateOfBirth,
                email: userData.email,
                phoneNumber: userData.phoneNumber,
                gender: gender || "",
            });

        setIsChanged(hasChanges);
    }, [formData, userData, gender]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async () => {
        startTransition(async () => {
            const { errorMessage } = await updateUserDataAction(userData.id,formData)
            if(errorMessage) {
                showToast('Error',errorMessage,'destructive')
            }else{
                showToast('Successfully','Update Profile','default')
            }
        })
    };

    if(isSigningOut){
        return <Loading text={'Signing you out...'} height={'h-[calc(100vh-90px)]'}/>
    }

    return (
        <main>
            <div className={"flex justify-center items-center flex-col gap-4"}>
                <div className={""}>
                    <div className="w-[250px]">
                        <AspectRatio ratio={1}>
                            <Image
                                src={AppToolkit.ImageWithFallBack(userData.userImage)}
                                alt="Image"
                                className="rounded-md border shadow-md object-cover"
                                fill={true}
                            />
                        </AspectRatio>
                    </div>
                </div>

                <Card className={"w-[90%] sm:w-[60%] max-w-4xl"}>
                    <CardHeader className={"border-b"}>
                        <CardTitle>Personal info</CardTitle>
                    </CardHeader>
                    <CardContent className={"py-2"}>
                        <div className={"grid gap-4"}>
                            <div className={"grid grid-cols-2"}>
                <span className={"text-sm text-secondary-foreground"}>
                  First name
                </span>
                                <Input
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={"grid grid-cols-2"}>
                <span className={"text-sm text-secondary-foreground"}>
                  Last name
                </span>
                                <Input
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>

                            {gender && (
                                <div className={"grid grid-cols-2"}>
                                      <span className={"text-sm text-secondary-foreground"}>
                                        Gender
                                      </span>
                                    <Select onValueChange={handleSelectChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder={gender} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={GenderTypes.Male}>Male</SelectItem>
                                            <SelectItem value={GenderTypes.Female}>Female</SelectItem>
                                            <SelectItem value={GenderTypes.Other}>Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            <div className={"grid grid-cols-2"}>
                <span className={"text-sm text-secondary-foreground"}>
                  Address
                </span>
                                <Input
                                    id="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={"grid grid-cols-2"}>
                <span className={"text-sm text-secondary-foreground"}>
                  Date of birth
                </span>
                                <Input
                                    id="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className={"w-[90%] sm:w-[60%] max-w-4xl"}>
                    <CardHeader className={"border-b"}>
                        <CardTitle>Account info</CardTitle>
                    </CardHeader>
                    <CardContent className={"py-2"}>
                        <div className={"grid gap-4"}>
                            <div className={"grid grid-cols-2"}>
                                <span className={"text-sm text-secondary-foreground"}>Email</span>
                                <Input
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={"grid grid-cols-2"}>
                        <span className={"text-sm text-secondary-foreground"}>
                          Phone number
                        </span>
                                <Input
                                    id="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className={'flex items-center flex-col justify-end gap-4'}>
                    <Button onClick={handleSubmit} disabled={!isChanged}>
                        {isPending ? 'Updating...' : 'Save Changes'}
                    </Button>

                    <div className={'flex justify-center items-center flex-col gap-4 mt-4'}>
                        <Button onClick={handleSignOut}>Sign out</Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
