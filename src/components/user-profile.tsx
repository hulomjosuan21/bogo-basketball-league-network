import UserDataType from "@/types/userDataType";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import Image from "next/image";
import AppToolkit from "@/lib/app-toolkit";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";

type Props = {
    userData: UserDataType,
    gender?: string
}

export default function UserProfile({userData,gender}:Props){
    return (
        <main>
            <div className={'flex justify-center items-center flex-col gap-4'}>

                <div className={''}>
                    <div className="w-[250px]">
                        <AspectRatio ratio={1}>
                            <Image src={AppToolkit.ImageWithFallBack(userData.userImage)} alt="Image" className="rounded-md border shadow-md object-cover" fill={true}/>
                        </AspectRatio>
                    </div>
                </div>

                <Card className={'w-[90%] sm:w-[60%] max-w-4xl'}>
                    <CardHeader className={'border-b'}>
                        <CardTitle>Personal info</CardTitle>
                    </CardHeader>
                    <CardContent className={'py-2'}>
                        <div className={'grid gap-4'}>

                            <div className={'grid grid-cols-2'}>
                                <span className={'text-sm text-secondary-foreground'}>First name</span>
                                <Input value={userData.firstName as string} disabled={true}/>
                            </div>

                            <div className={'grid grid-cols-2'}>
                                <span className={'text-sm text-secondary-foreground'}>Last name</span>
                                <Input value={userData.lastName as string} disabled={true}/>
                            </div>

                            {
                                gender && (
                                    <div className={'grid grid-cols-2'}>
                                        <span className={'text-sm text-secondary-foreground'}>Gender</span>
                                        <Input value={gender} disabled={true}/>
                                    </div>
                                )
                            }

                            <div className={'grid grid-cols-2'}>
                                <span className={'text-sm text-secondary-foreground'}>Address</span>
                                <Input value={userData.address as string} disabled={true}/>
                            </div>

                            <div className={'grid grid-cols-2'}>
                                <span className={'text-sm text-secondary-foreground'}>Date of birth</span>
                                <Input value={userData.dateOfBirth as string} disabled={true}/>
                            </div>

                        </div>
                    </CardContent>
                </Card>

                <Card className={'w-[90%] sm:w-[60%] max-w-4xl'}>
                    <CardHeader className={'border-b'}>
                        <CardTitle>Account info</CardTitle>
                    </CardHeader>
                    <CardContent className={'py-2'}>
                        <div className={'grid gap-4'}>

                            <div className={'grid grid-cols-2'}>
                                <span className={'text-sm text-secondary-foreground'}>Email</span>
                                <Input value={userData.email as string} disabled={true}/>
                            </div>

                            <div className={'grid grid-cols-2'}>
                                <span className={'text-sm text-secondary-foreground'}>Phone number</span>
                                <Input value={userData.phoneNumber as string} disabled={true}/>
                            </div>

                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}