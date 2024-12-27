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
}