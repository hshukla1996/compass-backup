 
export interface IVoterRegistrationState {
    voterIndividual?: VoterIndividual;
    previousAddress?: IAddressState;
    assistanceAddress?: IAddressState; 
    applicationNumber?:string;
    voterRegistrationId?: number;
    votingApplicationType?: string[]; 
    previousRegistrationNumber?: string;
    previousRegistrationYear?: string;
    previousFirstName?: string;
    previousLastName?: string;
    otherPartyComment?: string;
    politicalParty?: string;
    agreedTermsAndConditions?: boolean;
    assistedBySomeone?:string
    assistanceFirstName?: string;
    assistanceLastName?: string;
    assistancePhoneNumber?: string;
    assistanceAgreedTermsAndConditions?: boolean;
    signatureImageData?:string;
}
export const initialVoterData: IVoterRegistrationState = {
    voterIndividual :{
        individualNumber:0,
        firstName: "Alekhya",
        lastName: "Surya",
        middleInitial:"S",
        suffix: "VI",
        birthDate: "1990-01-01",
        gender: "F",
        emailAddress: "test#gmail.com",
        phoneNumber: "3254552444",
        race: [],
        isUsCitizen: "Y",
        willBeEighteenYears: "Y",
        doYouPreferSeperateMailingAddress: "Y",
        residentialAddress:  {
            addressLine1: " ",
            addressline2: "",
            unitType: "",
            unitnumber: "",
            city: "",
            state: "",
            zip: "",
            zipExtension: "",
            county: "",
            isAddressGISValidated: false,
        },
        mailingAddress:  {
            addressLine1: " ",
            addressline2: "",
            unitType: "",
            unitnumber: "",
            city: "",
            state: "",
            zip: "",
            zipExtension: "",
            county: "",
            isAddressGISValidated: false,
        }, 
        drivingLicenseOrStateId: "",
        lastFourSsnDigits: "",
        doNotHaveDriverLicensOrSsnIndicator: "",
    },
    previousAddress :{
        addressLine1: " ",
        addressline2: "",
        unitType: "",
        unitnumber: "",
        city: "",
        state: "",
        zip: "",
        zipExtension: "",
        county: "",
        isAddressGISValidated: false,
    },
    assistanceAddress:{
        addressLine1: " ",
        addressline2: "",
        unitType: "",
        unitnumber: "",
        city: "",
        state: "",
        zip: "",
        zipExtension: "",
        county: "",
        isAddressGISValidated: false,
    },
    applicationNumber: "",
    voterRegistrationId: 25,
    votingApplicationType: [],
    previousRegistrationNumber: "",
    previousRegistrationYear: "",
    previousFirstName: "",
    previousLastName: "",
    otherPartyComment: "",
    politicalParty: "",
    agreedTermsAndConditions: false,
    assistedBySomeone: "",
    assistanceFirstName: "",
    assistanceLastName: "",
    assistancePhoneNumber: "",
    assistanceAgreedTermsAndConditions: false,
    signatureImageData: "",
}
export interface VoterIndividual {
    individualNumber?:number;
    firstName?: string;
    lastName?: string;
    middleInitial?: string;
    suffix?: string;
    birthDate?: string;
    gender?: string;
    emailAddress?: string;
    phoneNumber?: string;
    race?: string[];
    isUsCitizen?: string;
    willBeEighteenYears?: string;
    doYouPreferSeperateMailingAddress?:string
    residentialAddress?: IAddressState;
    mailingAddress?: IAddressState;
    drivingLicenseOrStateId?: string;
    lastFourSsnDigits?: string;
    doNotHaveDriverLicensOrSsnIndicator?: string;
}

    export interface IAddressState {
        addressLine1?: string;
        addressline2?: string;
        unitType?: string;
        unitnumber?: string;
        city?: string;
        state?: string;
        zip?: string;
        zipExtension?: string;
        county?: string;
        isAddressGISValidated?: boolean;
    }

     

    
 

