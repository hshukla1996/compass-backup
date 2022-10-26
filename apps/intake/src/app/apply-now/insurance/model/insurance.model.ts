export interface InsuranceState
{
    doesAnyoneHaveHealthInsurance: string,
    didAnyoneApplyingForHaveHealthInsuranceInLast90Days: string,
    insurances:Insurances[]
    hasMemberCanGetInsuranceThroughJob: string,
    employerOfferedInsurances: EmployerOfferedInsurances[],
    individualHaveToPayForIt: string,
    employeeCostOfCoverage: string,
    frequencyOfPayForEmployerCoverage: string,
    fromSummaryType: IFromSummaryType | null,
    currentType:string,
    currentDirection:string
    healthInsuranceForChildrenFromWork: IHealthInsuranceForChildrenFromWork | null,
    employerStoppedCoverageChildrenLostInsurance:string

}
export interface Insurances
{
    type: string | InsuranceType.Null,
    isInsuranceEnd:string//added
    policyHolderIndividualNumber: string,
    otherPolicyHolder?: OutOfHouseholdPolicyHolder|null,
    coverage: string[] | null ,
    insuranceCompany: InsuranceCompany |null 
    benefits:string[] | null ,
    policyHolderAddress: IInsuranceAddress | null ,
    policyNumber: string | null,
    groupNumber: string | null ,
    premiumAmount: string | null ,
    howOftenThePremiumIsPaid: string | null ,
    policyStartDate: string | null,
    policyEndDate: string | null,
    reasonForFutureLossHealthInsurance: string | null,
    employerStoppedCoverageChildrenLostInsurance: string | null,
    reasonForLosingHealthInsurance: string | null,
    policyTypes:string[] | null,
    isPolicyAddressSame: string,
    employerName:string,
    didApplyUnemploymentCompensation:string|null
}
export interface EmployerOfferedInsurances
{
    individualNumber: string,
    sequenceNumber: string,
    otherEmployerName: string,
    employerName:string,//added new
    employerIdNumber: string,//added new
    address: IInsuranceAddress,
    employerPhone: string,
    otherIndividualFirstName: string,
    otherIndividualLastName: string,
    otherIndividualSocialSecurityNumber: string,
    employerContactInformation: EmployerContactInformation,
    eligibleThreeMonths: string,
    eligibleDate: string,
    coveredByEmployerInsuranceIndividuals: string[],
    employerPlanMinValueStandard: string,
    currentEmployeePremiumCostField: string,
    currentEmployeePremiumFrequency: string,
    employerPlanChangeSoon: string,
    whenWillEmployersPlanChange: string,
    whatWillChangeEmployerPlan: string,
    typesOfCoverage:string[],
    willHealthPlanChangeSoon:string,
    newEmployerPlanMinValueStandard:string,
    //added new
    newEmployerPlanPremium:string,
    howOftenNewPremiumPay:string

}
export interface OutOfHouseholdPolicyHolder
{
    firstName:string,
    lastName:string,
    isThisPolicyCourtOrdered:string
}
interface EmployerContactInformation
{
name:string,
phone:string,
phoneExtension:string,
email:string
}
export interface IInsuranceAddress
{
    addressLine1: string,
    addressline2: string,
    city: string,
    state: string,
    zip: string,
    zipExtension: string,
    county: string,
    isThisAddressEffectiveImmediately: true,
    addressEffectiveDate: string

}

export interface InsuranceCompany
{
    insuranceCompanyName: string,
    address: IInsuranceAddress | null
    phoneNumber: string,
    otherInsuranceCompanyName:string | null
}
export interface IFromSummary {
   
    userIds?: any[] | null,
    isFromEdit?: boolean,
    isFromAdd?: boolean,
    
}
export type IFromSummaryType =
    {
        [key in IFromSummaryTypeName]: 
        
        {
            fromSummary: IFromSummary
        }
    }
export enum IFromSummaryTypeName {
    //Give proper name for queue,below is example only

    CURENTPOLICY = 'CURRENTPOLICY',
    PASTPOLICY='PASTPOLICY',
    EMPLOYER='EMPLOYER'
}

export interface IHealthInsuranceForChildrenFromWork
{
    code?:string,
    individualNumbers?:string[] | null
}
export  enum InsuranceType{
    Current='C',
    PRIOR='P',
    Null='null',
    EMOPLOYEROFFERED='E'

} 



