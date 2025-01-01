import { v4 as uuidv4 } from 'uuid';
import {StaticImageData} from "next/image";
import fallBackImage from "@/assets/images/fallbackImage.png";

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

    static dateFormatter(date: Date | string, includeTime: boolean = true, format: string = 'mm-dd-yy hh:mm'): string {
        const d = new Date(date);
        const pad = (n: number) => n.toString().padStart(2, '0');

        const mm = pad(d.getMonth() + 1);
        const dd = pad(d.getDate());
        const yy = d.getFullYear().toString().slice(-2);
        let hh = d.getHours();
        const min = pad(d.getMinutes());
        const ampm = hh >= 12 ? 'PM' : 'AM';
        hh = hh % 12;
        hh = hh ? hh : 12;
        const paddedHh = pad(hh);

        if (includeTime) {
            return format.replace('mm', mm).replace('dd', dd).replace('yy', yy).replace('hh', paddedHh).replace('mm', min).replace('a', ampm);
        } else {
            return format.replace('mm', mm).replace('dd', dd).replace('yy', yy).replace(' hh:mm a', '');
        }
    }
}