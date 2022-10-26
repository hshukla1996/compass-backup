export interface MyBenefits { 
    county?: string,
    caseNumber?: string,
    ufiNumber?: string,
    mciOrMedicaidIdOrEbtNumber?: string,
    socialSecurityNumber?: string,
    isPaperless?: string,
    emailAddress?: string,
    confirmEmailAddress?: string,
    termsConditions?: boolean,
    isCis?: boolean,
    isCaps?: boolean,
    casesInformationDetail?:any,
    linkCaseFlag?:string
}
 
 
export const initialState: MyBenefits = { 
    county: "",
    caseNumber: "",
    ufiNumber: "",
    mciOrMedicaidIdOrEbtNumber: "",
    socialSecurityNumber: "",
    isPaperless: "",
    emailAddress: "",
    confirmEmailAddress: "",
    termsConditions: false,
    isCis: false,
    isCaps: false,
    casesInformationDetail:null,
    linkCaseFlag: ""

}


 