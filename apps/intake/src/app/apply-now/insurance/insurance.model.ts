/* export interface IInsurance {
    houseHoldInsuraceSituations: string[],
    noJobMedicalInsurance: string[],
    usersPolicy: Object,
}


export const insuranceInitialState:IInsurance = {
    houseHoldInsuraceSituations: ["ownInsurance","jobinsurance","LostInsurace90days"],
    noJobMedicalInsurance:["userId1"],
    usersPolicy:{
        "userId1":{
            InsuranceCompanyName:""
        }
    }


} */

export interface IInsurance {
    houseHoldInsuraceSituations:string[],
    noJobMedicalInsurance: string[],
    whoIsCovered: string[],
    userId1?:number,
    insuranceCompanyName?: string | undefined,
    policyNbr?: string | undefined,
    address?: string | undefined,
    address2?: string | undefined,
    city?: string | undefined,
    state?: string | undefined,
    zip?: string | undefined,
    phoneNbr?: string | undefined,
    groupNbr?: string | undefined,
    startPolicyDate:string,
    endPolicyDate:string,
    address_diff?: string | undefined,
    address2_diff?: string | undefined,
    city_diff?: string | undefined,
    state_diff?: string | undefined,
    zip_diff?: string | undefined
   // validState: Boolean
   // usersPolicy:string[]=[]
}

/* export interface usersPolicy
{
    userId1?:number,
    insuranceCompanyName?: string | undefined,
    policyNumber?: string | undefined,
    address?: string | undefined,
    address2?: string | undefined,
    city?: string | undefined,
    state?: string | undefined,
    zip?: string | undefined,
    phoneNbr?: string | undefined,
    groupNumber?: string | undefined,
    differentAddress?: string | undefined,
    startPolicyDate:string,
    endPolicyDate:string,
    validState: Boolean
} */

export interface insuranceGateposts {
    id?: number,
    name?: string,
    situation?: string,
    description?: string,
    isReceived?: boolean
}

 export const insuranceInitialState = {
    houseHoldInsuraceSituations:[],
    noJobMedicalInsurance:[],
    whoIsCovered:[],
            Id:-1,
            insuranceCompanyName:"",
            policyNbr:"",
            address:"",
            address2:"",
            city:"",
            state:"",
            zip:"",
            phoneNbr:"",
            groupNbr:"",
            startPolicyDate:"",
            endPolicyDate:"",
            address_diff: "",
            address2_diff: "",
            city_diff: "",
            state_diff: "",
            zip_diff: "",
            validState: false
        }

export interface IWhoIsCovered {
    id: number
    firstName: string,
    lastName: string,
    gender: string,
    age: number,
    isReceived: boolean | false,
}

/* export const InitialWhoIsCoveredDetails = [{
    id: 1,
    firstName: "John",
    lastName: "Sample",
    gender: "M",
    age: 65,
    isReceived: false,
},
    {
        id: 2,
        firstName: "Jane",
        lastName: "Sample",
        gender: "F",
        age: 57,
        isReceived: false,
    },
]
 */
export class WhoHealthOrMedicalCon {
    constructor(
        public chkOne: any,
        public chkTwo: any
    ) { }
}

export class WhoIsCoveredCon {
    constructor(
        public chkOne: any,
        public chkTwo: any
    ) { }

}

export class InsuranceGatepostOn {
    constructor(
        public chkOne: any,
        public chkTwo: any,
        public chkThree: any
    ) { }
}
