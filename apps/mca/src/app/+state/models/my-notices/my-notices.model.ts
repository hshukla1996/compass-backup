export interface MyNotices {
    recordNumber?: string,
    generationDate?: string,
    readDate?: string,
    addressedTo?: string,
    noticeDescription?: string,
    guid?: string,
    reportType?: string,
    applicationNumber?: string,
    applicationStatus?: string,
    dueDate?: string,
}
export const initialState: MyNotices = {
    recordNumber: "",
    generationDate: "",
    readDate: "",
    addressedTo: "",
    noticeDescription: "",
    guid: "",
    reportType: "",
    applicationNumber: "",
    applicationStatus: "",
    dueDate: "",

}

export interface SearchNoticesRequest {
    beginDate?: string,
    endDate?: string,
    pageSize?: number,
    currentPage?: number
}

export interface SearchNoticesResponse {
    noticesList?: MyNotices[],
    totalPages?: number,
    isSuccessful?: boolean,
    unreadNoticesCount?: number,
    apiOperationContext?: string
}

export interface UserSubscription {
    mode?: number;
    noticeTypeCode?: number;
    deviceTypeCode?: number;
    email?: string;
    noticeType?: string;
    statusCode?: string;
    statusDescription?: string;
    submittedDate?: string;
}

export interface VerificationDetails {
    onetimeCode?: string;
    guid?: string;
    tokenExpired?: boolean;
    statusCode?: string;
    status?: string;
}

export interface UserPreference {
    accountEmail?: string;
    userSubscriptions?: UserSubscription[];
    verificationDetails?: VerificationDetails;
    allowedForSubscription?: boolean;
}

export interface GetEnrollment {
    accountDetail?: string;
    isSuccessful?: boolean;
    userPreference?: UserPreference;
    resendVerification?: boolean;
    isClosedCase?: boolean;
    apiOperationContext?: string;
}

export interface UpdateEnrollment {
    userPreference?: UserPreference;
    resendVerification?: boolean;
}