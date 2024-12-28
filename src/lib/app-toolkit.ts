import { v4 as uuidv4 } from 'uuid';

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
}