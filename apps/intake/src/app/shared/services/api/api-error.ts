export class ApiError {
    httpStatus?: number;
    exception?: string;
    message!: string;

    constructor(obj: any) {
        Object.assign(this, obj);
    }
}