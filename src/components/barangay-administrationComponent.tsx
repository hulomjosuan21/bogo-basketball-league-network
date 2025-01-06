'use client'
import {useState, useEffect, useTransition, ChangeEvent} from "react";
import Barangay from "@/types/barangayType";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import AppToolkit from "@/lib/app-toolkit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useAppToast from "@/hooks/use-appToast";
import {updateBarangayDataAction} from "@/actions/adminActions";
import {InsertAdminDataType} from "@/db/schemas/adminDataTable";

type Props = {
    barangayData: Barangay;
};

export default function BarangayAdministrationComponent({ barangayData }: Props) {
    const [isPending, startTransition] = useTransition();
    const { showToast } = useAppToast();
    const [formData, setFormData] = useState<Partial<InsertAdminDataType>>({
        barangayName: barangayData.barangayName,
        address: barangayData.address,
        phoneNumber: barangayData.phoneNumber,
    });

    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        const hasChanges =
            JSON.stringify(formData) !==
            JSON.stringify({
                barangayName: barangayData.barangayName,
                address: barangayData.address,
                phoneNumber: barangayData.phoneNumber,
            });

        setIsChanged(hasChanges);
    }, [formData, barangayData]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async () => {
        startTransition(async () => {
            const { errorMessage } = await updateBarangayDataAction(formData);
            if (!errorMessage) {
                showToast('Error', errorMessage, 'destructive');
            } else {
                showToast('Successfully', 'Update Barangay', 'default');
            }
        });
    };

    return (
        <div className={'mt-4'}>
            <div className={"flex justify-center items-center flex-col gap-4"}>
                <div className={""}>
                    <div className="w-[250px]">
                        <AspectRatio ratio={1}>
                            <Image
                                src={AppToolkit.ImageWithFallBack(barangayData.barangayImage)}
                                alt="Image"
                                className="rounded-md border shadow-md object-cover"
                                fill={true}
                            />
                        </AspectRatio>
                    </div>
                </div>

                <Card className={"w-[90%] sm:w-[60%] max-w-4xl"}>
                    <CardHeader className={"border-b"}>
                        <CardTitle>Barangay info</CardTitle>
                    </CardHeader>
                    <CardContent className={"py-2"}>
                        <div className={"grid gap-4"}>

                            <div className={"grid grid-cols-2"}>
                                <span className={"text-sm text-secondary-foreground"}>Barangay Name</span>
                                <Input
                                    id="barangayName"
                                    value={formData.barangayName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={"grid grid-cols-2"}>
                                <span className={"text-sm text-secondary-foreground"}>Address</span>
                                <Input
                                    id="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={"grid grid-cols-2"}>
                                <span className={"text-sm text-secondary-foreground"}>Phone Number</span>
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
                </div>
            </div>
        </div>
    );
}