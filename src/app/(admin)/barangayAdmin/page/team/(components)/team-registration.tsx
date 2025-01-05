'use client'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export interface TeamMember {
    name: string
}

export interface TeamProps {
    teamName: string
    members: TeamMember[]
    teamCoach: string
    teamManager: string
    teamCaptain: string
    contactNumber: string
    contactEmail: string
}

export function TeamRegistration({
                                     teamName,
                                     members,
                                     teamCoach,
                                     teamManager,
                                     teamCaptain,
                                     contactNumber,
                                     contactEmail
                                 }: TeamProps) {
    const handlePrint = () => {
        window.print()
    }

    return (
        <Card className="w-full max-w-3xl mx-auto bg-white shadow-lg print:shadow-none">
            <CardContent className="p-8 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between print:justify-center gap-4 mb-6">
                    <Image
                        src="/placeholder.svg?height=80&width=80"
                        alt="CRMC Logo"
                        width={80}
                        height={80}
                        className="print:block"
                    />
                    <div className="text-center">
                        <h1 className="font-bold text-lg">CEBU ROOSEVELT MEMORIAL COLLEGES</h1>
                        <p className="text-sm">San Vicente St., Bogo City, Cebu</p>
                        <p className="font-semibold">COLLEGE OF COMPUTER STUDIES</p>
                    </div>
                    <Image
                        src="/placeholder.svg?height=80&width=80"
                        alt="CCS Logo"
                        width={80}
                        height={80}
                        className="print:block"
                    />
                </div>

                {/* Team Name */}
                <div className="space-y-2">
                    <div className="flex gap-2">
                        <span className="font-semibold">Team Name:</span>
                        <span>{teamName}</span>
                    </div>
                </div>

                {/* Members Table */}
                <div className="border rounded-lg p-4">
                    <table className="w-full">
                        <thead>
                        <tr>
                            <th className="text-left pb-2 font-semibold">Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {members.map((member, index) => (
                            <tr key={index}>
                                <td className="py-2 border-b last:border-b-0">
                                    {member.name}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="space-y-3">
                    <div className="flex gap-2">
                        <span className="font-semibold">Team Coach:</span>
                        <span>{teamCoach}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="font-semibold">Team Manager:</span>
                        <span>{teamManager}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="font-semibold">Team Captain:</span>
                        <span>{teamCaptain}</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex gap-2">
                        <span className="font-semibold">Contact Number:</span>
                        <span>{contactNumber}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="font-semibold">Contact Email:</span>
                        <span>{contactEmail}</span>
                    </div>
                </div>

                <div className="flex justify-end print:hidden">
                    <Button onClick={handlePrint}>Print Form</Button>
                </div>
            </CardContent>
        </Card>
    )
}

