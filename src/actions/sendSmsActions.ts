'use server'
import AppToolkit from "@/lib/app-toolkit";

import { NextResponse } from 'next/server';

const infobipApiKey = process.env.NEXT_PUBLIC_INFODIP_API_KEY!;

if(!infobipApiKey){
    throw new Error('Infodip apy key is mission')
}

export async function SendMessageRequest(request:NextResponse) {
    const { to, text } = await request.json();

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `App ${infobipApiKey}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    const raw = JSON.stringify({
        "messages": [
            {
                "destinations": [{"to": to}],
                "from": "Bogo Basketball League Network",
                "text": text
            }
        ]
    });

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    try {
        const response = await fetch("https://4e29r8.api.infobip.com/sms/2/text/advanced", requestOptions);
        const result = await response.json();
        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to send SMS" }, { status: 500 });
    }
}


export async function sendSmsAction(to: string, text: string) {
    const sendSms = false;
    if(sendSms) {
        const request = {
            json: async () => ({ to , text })
        } as never;

        try {
            const response = await SendMessageRequest(request);
            const result = await response.json();

            if (response.status !== 200) {
                return { errorMessage: result.message || 'Failed to send SMS' };
            }

            return { errorMessage: null };
        } catch (error) {
            return { errorMessage: AppToolkit.getErrorMessage(error,'Failed to send SMS') };
        }
    }
}