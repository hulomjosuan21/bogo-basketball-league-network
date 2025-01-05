import { v4 as uuidv4 } from 'uuid';
import {StaticImageData} from "next/image";
import fallBackImage from "@/assets/images/fallbackImage.png";
import {format} from "date-fns";

export default class AppToolkit {
    static getErrorMessage(error: unknown,defaultErrorMessage = 'An error occurred'): string {
        if (error instanceof Error) {
            return error.message;
        } else if (typeof error === 'string') {
            return error;
        } else {
            return defaultErrorMessage
        }
    }

    static fixPhoneNumber(phoneNumber: string): string {
        if (phoneNumber.startsWith('63')) {
            return phoneNumber;
        }
        return '63' + phoneNumber.slice(1);
    }

    static generateUid(base?: string): string {
        base = base ? base.toLowerCase() : "bogobasketballleaguenetwork";
        const cleanedBase = base.replace(/\s+/g, '');
        const uuid = uuidv4().split('-')[0];
        return `${cleanedBase}-${uuid}`;
    }

    static TextWithLimit(text: string, limit: number = 50,etc = '...'): string {
        return text.length > limit ? text.slice(0, limit) + etc : text;
    }

    static ImageWithFallBack = (image: string | undefined | null | StaticImageData) => {
        return image === 'no image' ? 'no image' : (image || fallBackImage.src);
    }

    static TextWithFallBack = (text: string | number | null | undefined) => {
        return text || 'Text here';
    }

    static dateFormatter(date: Date | string, includeTime: boolean = true, formatString: string = 'MM-dd-yyyy hh:mm a'): string {
        const d = new Date(date);
        const formatWithTime = 'MM-dd-yyyy hh:mm a';
        const formatWithoutTime = 'MM-dd-yyyy';

        return format(d, includeTime ? formatWithTime : formatWithoutTime);
    }
}