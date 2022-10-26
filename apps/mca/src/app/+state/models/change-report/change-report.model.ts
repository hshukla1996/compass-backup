
export interface IChangeReportState {
    ticketNumber: number | 0,
    householdInformation: IHouseHoldInformation | null,
    individualInformation: IIndividualInformation[] | null
    headOfHouseholdNumber: string | null,
    headOfHousehold: string | null,
    caseId: 0,
    caseNumber: 0,
    caseStatus: string | null,
    languageDescription: string | null,
    county: string | null,
    countyContactNumber: string | null,
    schoolDistrict: string | null,
    errorCodeDescription: string | null,
    isCHIPCase: boolean | null,
    compassTicketNumber: string | null,
    selectedChanges?: string[],
    selectedIncomeChanges?: string[],
    selectedHouseholdChanges?: string[],
    liheapCrisis: ILiheapCrisis | null
}
export const initialState: IChangeReportState = {
    ticketNumber: 0,
    householdInformation:  null,
    individualInformation: null,
    headOfHouseholdNumber: '',
    headOfHousehold: '',
    caseId: 0,
    caseNumber: 0,
    caseStatus: '',
    languageDescription: '',
    county: '',
    countyContactNumber: '',
    schoolDistrict: '',
    errorCodeDescription: '',
    isCHIPCase: null,
    compassTicketNumber: '',
    liheapCrisis: null
}
export interface IHouseHoldInformation {
    residentAddress: IAddress | null,
    mailingAddress: IAddress | null,
    householdContactInformation: IHouseholdContactInformation | null,
    shelterAndUtilitiesExpense: IShelterAndUtilitiesExpense,
    otherIncomeDescription: string,
    otherHouseholdChanges: string,
    otherCommunications: string,
    resources: string,
    // otherCommunicationChanges?: string | null
}
export interface IAddress {
    streetAddressLine1: string | null,
    streetAddressLine2?: string | null,
    city?: string | null,
    state?: string | null,
    zip?: string | null,
    zipExt?: string | null,
    county?: string | null,
    schoolDistrict?: string | null,
    township?: string | null,
    isMailingAddress?: boolean | null
    isAddressGISValidated?: boolean | null

}
export interface IContactInformation {
    phoneNumber: string | null,
    isMobileNumber: boolean | null
}
export interface IHouseholdContactInformation {
    mainContactNumber: IContactInformation | null,
    secondContactNumber: IContactInformation | null,
    otherContactNumber: IContactInformation | null,
    emailAddress?: string | null | null,
    reEnterEmailAddress: string | null,
    bestTimeToContact: string | null
}
export interface IShelterAndUtilitiesExpense {
    mortgageOrRentAmount: 0,
    isHeatingAndCoolingType: boolean | null,
    isGasType: boolean | null,
    isElectricType: boolean | null,
    isPhoneAndInternetType: boolean | null,
    isOtherType: boolean | null,
    otherTypeComments: string | null,
    shelterAndUtilitiesExpensesCommentBox?: string | null
}

export interface ILiheapCrisis {
    caseId: string | null,
    caseNumber: string | null,
    caseStatus: string | null,
    county: string | null,
    schoolDistrict: string | null,
    paymentIndividualId: 0,
    hasHouseholdChanged: boolean | null,
    isAddressCorrect: boolean | null, 
    isEmergencySituation: boolean | null, 
    isLifeThreatening: boolean | null,
    bestWayToContact: string | null,
    residentAddress: IAddress,
    individualsInformation: IIndividualInformation[] | null,
    providers: IProviders,
}

export interface IIndividualInformation {
    firstName: string | null,
    lastName: string | null,
    middleName: string | null,
    age: 0,
    gender: string | null,
    citizenship: string | null,
    individualType: string | null,
    dateOfBirth: string | null,
    ssn: string | null,
    ssnEncrypted: string | null,
    individualNumber: 0,
    employersCount: 0,
    maritalStatus: string | null,
    releaseDate: string | null,
    pregnancy: IPregnancy,
    employmentInformation: IEmploymentInformation,
    indicators: IIndicators
}
export interface IEmploymentIncome
    {
        employerName: string | null,
        incomeFrequency: string | null,
        grossIncome: string | null,
        hoursWorked: string | null,
        dateOfChange: string | null
    }
export interface IEmploymentInformation{
    employmentIncomes: IEmploymentIncome[],
    unemploymentIncome:IIncome,
    socialSecurityIncome:IIncome,
    retirementSurvivorDisabilityIncome:IIncome,
    reportNewJob: string | null
}
export interface IIncome
{
    employerName: string | null,
    frequency: string | null,
    grossAmount: string | null
}
export interface IPregnancy
{
    pregnancyDueDate: string | null,
    numberOfExpectedChildren: string | null
}
export interface IIndicators
{
    allowPregnancyReporting: boolean | null |null,
    allowIncomeReporting: boolean | null |null
}
export interface IProviders
{
    providerId: 0,
    providerName: string | null,
    providerType: string | null,
    accountNumber: string | null,
    legalEntityId: string | null,
    serviceLocationId: string | null,
    isPrimary: boolean | null,
    isDirectPay: boolean | null,
    heatingSourceCode: string | null,
    heatingSource: string | null,
    individualIdLinkedToAccount: 0,
    paymentName: string | null,
    isShutOffOrRanOutOfFuel: boolean | null,
    haveShutOffNoticeOrWillRunOutOfFuel: boolean | null,
    heatingSourceNotWorking: boolean | null,
    shutOffNoticeDate: string | null,
    daysOfFuelLeft: 0,
    phoneNumber: string | null,
    bestWayToContact: string | null,
    description: string | null
}

export const REPORT_DATA: any = {
    "ticketNumber": 0,
    "householdInformation": {
        "residentAddress": {
            "streetAddressLine1": "757 E Warrington Ave",
            "streetAddressLine2": "Apt 4",
            "city": "Pittsburg",
            "state": "Pennsylvania",
            "zip": "15210",
            "zipExt": "string",
            "county": "Allegheny",
            "schoolDistrict": "Pittsburg",
            "township": "Forest Hills",
            "isMailingAddress": true
        },
        "mailingAddress": {
            "streetAddressLine1": "757 E Warrington Ave",
            "streetAddressLine2": "Apt 4",
            "city": "Pittsburg",
            "state": "string",
            "zip": "15210",
            "zipExt": "string",
            "county": "Allegheny",
            "schoolDistrict": "Pittsburg",
            "township": "string",
            "isMailingAddress": true
        },
        "householdContactInformation": {
            "mainContactNumber": {
                "phoneNumber": "412-253-3098",
                "isMobileNumber": true
            },
            "secondContactNumber": {
                "phoneNumber": "123-423-2222",
                "isMobileNumber": false
            },
            "otherContactNumber": {
                "phoneNumber": "123-423-2222",
                "isMobileNumber": false
            },
            "emailAddress": "jsample@example.com",
            "reEnterEmailAddress": "",
            "bestTimeToContact": "string"
        },
        "otherHouseholdChanges": "string",
        "otherCommunications": "string",
        "shelterAndUtilitiesExpense": {
            "mortgageOrRentAmount": 0,
            "isHeatingAndCoolingType":true,
            "isGasType": true,
            "isElectricType": true,
            "isPhoneAndInternetType": true,
            "isOtherType": true,
            "otherTypeComments": " "
        },
        "resources": " ",
        "otherIncomeDescription": " "
    },
    "individualInformation": [
        {
            "firstName": "John",
            "lastName": "Sample",
            "middleName": "",
            "age": 45,
            "gender": "Male",
            "pregnancy": {
                "pregnancyDueDate": "2022-08-09T14:28:52.632Z",
                "numberOfExpectedChildren": ""
            },
            "employmentInformation": {
                "employmentIncomes": [
                    {
                        "employerName": "Walmart",
                        "incomeFrequency": "Weekly",
                        "grossIncome": "400",
                        "hoursWorked": "8",
                        "dateOfChange": " "
                    }
                ],
                "unemploymentIncome": {
                    "frequency": "string",
                    "grossAmount": "string"
                },
                "socialSecurityIncome": {
                    "frequency": "string",
                    "grossAmount": "string"
                },
                "retirementSurvivorDisabilityIncome": {
                    "frequency": "string",
                    "grossAmount": "string"
                },
                "reportNewJob": "string"
            },
            "indicators": {
                "allowPregnancyReporting": true,
                "allowIncomeReporting": true
            }
        }
    ],
    "liheapCrisis": {
        "caseId": 0,
        "caseNumber": 0,
        "caseStatus": "string",
        "county": "string",
        "schoolDistrict": "string",
        "paymentIndividualId": 0,
        "hasHouseholdChanged": true,
        "isAddressCorrect": true,
        "isEmergencySituation": true,
        "isLifeThreatening": true,
        "bestWayToContact": "string",
        "residentAddress": {
            "streetAddressLine1": "string",
            "streetAddressLine2": "string",
            "city": "string",
            "state": "string",
            "zip": "string",
            "zipExt": "string",
            "county": "string",
            "schoolDistrict": "string",
            "township": "string",
            "isMailingAddress": true
        },
        "individualInformation": [
            {
                "firstName": "string",
                "lastName": "string",
                "middleName": "string",
                "age": 0,
                "gender": "string",
                "pregnancy": {
                    "pregnancyDueDate": "2022-08-09T14:28:52.632Z",
                    "numberOfExpectedChildren": "string"
                },
                "employmentInformation": {
                    "employmentIncomes": [
                        {
                            "employerName": "string",
                            "incomeFrequency": "string",
                            "grossIncome": "string",
                            "hoursWorked": "string",
                            "dateOfChange": "string"
                        }
                    ],
                    "unemploymentIncome": {
                        "frequency": "string",
                        "grossAmount": "string"
                    },
                    "socialSecurityIncome": {
                        "frequency": "string",
                        "grossAmount": "string"
                    },
                    "retirementSurvivorDisabilityIncome": {
                        "frequency": "string",
                        "grossAmount": "string"
                    },
                    "reportNewJob": "string"
                },
                "indicators": {
                    "allowPregnancyReporting": true,
                    "allowIncomeReporting": true
                }
            }
        ],
        "providers": [
            {
                "providerId": 0,
                "providerName": "string",
                "providerType": "string",
                "accountNumber": "string",
                "legalEntityId": "string",
                "serviceLocationId": "string",
                "isPrimary": true,
                "isDirectPay": true,
                "heatingSourceCode": "string",
                "heatingSource": "string",
                "individualIdLinkedToAccount": 0,
                "paymentName": "string",
                "isShutOffOrRanOutOfFuel": true,
                "haveShutOffNoticeOrWillRunOutOfFuel": true,
                "heatingSourceNotWorking": true,
                "shutOffNoticeDate": "2022-08-09T14:28:52.632Z",
                "daysOfFuelLeft": 0,
                "phoneNumber": "string",
                "bestWayToContact": "string",
                "description": "string"
            }
        ]
    },
    "headOfHouseholdNumber": "string",
    "headOfHousehold": "string",
    "caseId": 0,
    "caseNumber": 0,
    "caseStatus": "string",
    "languageDescription": "string",
    "county": "string",
    "countyContactNumber": "string",
    "schoolDistrict": "string",
    "errorCodeDescription": "string",
    "isCHIPCase": true,
    "compassTicketNumber": "string"
}