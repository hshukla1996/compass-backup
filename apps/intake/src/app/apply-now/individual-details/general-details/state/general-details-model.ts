
interface DrivingLicence {
    licenseStatus?:string;
    licenseID: string,
    stateID: string;
}
export enum PageDirection {
    BACK = "BACK",
    NEXT = "NEXT",
}
//{id1:vistedStatus, id2:visitedStaa}
export interface PageAction {
    currentIncomeMap: any;
    incomePageDirection: any;
}
export interface IGeneralDetails {
    id?: string;
    citizenship?: string | undefined;
    maritalStatus?: string | undefined;
    qualification?: string | undefined;
    runaway?: string | undefined;
    raceDetails?: string[] | undefined;
    ssn?: string;
    voteRegistration?: string;
    drivingLicenceNum?: DrivingLicence;
   
}
export interface IHouseHoldGeneralDetails {
    houseHoldHead: IGeneralDetails;
    houseHoldPersons?: IGeneralDetails[];
    pageAction?: PageAction | null;
}

export const InitialGeneralDetails = {
    houseHoldHead: {
        id: "11",
        citizenship: "",
        maritalStatus: "",
        qualification: "",
        runaway: "",
        raceDetails: [],
        ssn: "",
        voteRegistration: "",
        drivingLicenceNum: {
            licenseID: "",
            stateID: "",
        },
    },
    houseHoldPersons: [
        {
            id: "23",
            citizenship: "",
            maritalStatus: "",
            qualification: "",
            runaway: "",
            raceDetails: [],
            ssn: "",
            voteRegistration: "",
            drivingLicenceNum: {
                licenseID: "",
                stateID: "",
            },
        },
    ],
    pageAction:null,
};