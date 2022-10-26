import { ApplyNowPageActions } from "../../+state/actions";
import { PageQueueName } from "../../+state/apply-now.models";
import { IConfigPageQueue } from "../../../shared/model/page-queue-state.model";
import { RoutePath } from "../../../shared/route-strategies";
import { Utility } from "../../../shared/utilities/Utility";

export const InsuranceGatePostOneDefaultPath = [];
export const InsuranceGatePostTwoDefaultPath = [];
export const CURREENT_INSURANCE_GATEPOST_VALUE = 'currentInsurance'
export const PRIOR_INSURANCE_GATEPOST_VALUE = 'priorInsurance'
export const EMPLOYER_INSURANCE_GATEPOST_VALUE = 'eoHealthInsurance'
export const EMPLOYER_CHILDREN_INSURANCE_GATEPOST_VALUE = 'eoChildrenInsurance'
const basePath = "insurance/"
export const InsuranceGatePostOneGetObject = (path: string) => {
    switch (path) {
        case CURREENT_INSURANCE_GATEPOST_VALUE:
            return [basePath + RoutePath.APPLYNOW_INSURANCE_CURRENTPOLICYHOLDER,
            basePath + RoutePath.APPLYNOW_INSURANCE_COVEREDBY,
            basePath + RoutePath.APPLYNOW_INSURANCE_INSURANCECOMPANY,
            basePath + RoutePath.APPLYNOW_INSURANCE_INSURANCEADDRESS,
            basePath + RoutePath.APPLYNOW_INSURANCE_COVERAGE,
            basePath + RoutePath.APPLYNOW_INSURANCE_TYPE_OF_POLICY,
            basePath + RoutePath.APPLYNOW_INSURANCE_CURRENTPOLICY_EMPLOYMENT,
            basePath + RoutePath.APPLYNOW_INSURANCE_CURRENTPOLICY_END,
            basePath + RoutePath.APPLYNOW_INSURANCE_INSURANCESUMMARY
            ];
        case PRIOR_INSURANCE_GATEPOST_VALUE:
            return [
                basePath + RoutePath.APPLYNOW_INSURANCE_PRIORPOLICY_HOLDER,
                basePath + RoutePath.APPLYNOW_INSURANCE_PRIOR_COVEREDBY,
                basePath + RoutePath.APPLYNOW_INSURANCE_PRIORPOLICY_COMAPNY,
                basePath + RoutePath.APPLYNOW_INSURANCE_PRIOR_INSURANCEADDRESS,
                basePath + RoutePath.APPLYNOW_INSURANCE_PCOVERAGE,
                basePath + RoutePath.APPLYNOW_INSURANCE_PRIOR_POLICYTYPES,
                basePath + RoutePath.APPLYNOW_INSURANCE_PRIORPOLICY_END,
                basePath + RoutePath.APPLYNOW_INSURANCE_PRIOR_INSURANCESUMMARY
            ];
    }
    return [];
}

export const InsuranceGatePostTwoGetObject = (path: string) => {
    switch (path) {
        case EMPLOYER_INSURANCE_GATEPOST_VALUE:
            return [
                basePath + RoutePath.APPLYNOW_INSURANCE_EMPLOYER_POLICY_HOLDER,
                basePath + RoutePath.APPLYNOW_INSURANCE_EMPLOYER_POLICY_PROVIDER,
                basePath + RoutePath.APPLYNOW_INSURANCE_EMPLOYER_CONTACT,
                basePath + RoutePath.APPLYNOW_INSURANCE_EMPLOYER_POLICY_COVEREDBY,
                basePath + RoutePath.APPLYNOW_INSURANCE_EMPLOYER_COVERAGE_SELECTION,
                basePath + RoutePath.APPLYNOW_INSURANCE_EMPLOYER_ADDTIONALDETAIL,
                basePath + RoutePath.APPLYNOW_INSURANCE_EMPLOYER_MAINSUMMARY,
              
            ];
        case '':
            return [];
    }
    return [];
}
export const INSURANCE_GATEPOST_ONE_DEFAULT_PATH = [
    basePath + RoutePath.APPLYNOW_INSURANCE_CURRENTPOLICYHOLDER,
    basePath + RoutePath.APPLYNOW_INSURANCE_COVEREDBY,
    basePath + RoutePath.APPLYNOW_INSURANCE_INSURANCECOMPANY,
    basePath + RoutePath.APPLYNOW_INSURANCE_INSURANCEADDRESS,
    basePath + RoutePath.APPLYNOW_INSURANCE_COVERAGE,
    basePath + RoutePath.APPLYNOW_INSURANCE_POLICYTYPES,
    basePath + RoutePath.APPLYNOW_INSURANCE_CURRENTPOLICY_EMPLOYMENT,
    basePath + RoutePath.APPLYNOW_INSURANCE_CURRENTPOLICY_END,
    basePath + RoutePath.APPLYNOW_INSURANCE_INSURANCESUMMARY,
    basePath + RoutePath.APPLYNOW_INSURANCE_PRIORPOLICY_HOLDER,
    basePath + RoutePath.APPLYNOW_INSURANCE_PRIOR_COVEREDBY,
    basePath + RoutePath.APPLYNOW_INSURANCE_PRIORPOLICY_COMAPNY,
    basePath + RoutePath.APPLYNOW_INSURANCE_PRIOR_INSURANCEADDRESS,
    basePath + RoutePath.APPLYNOW_INSURANCE_PCOVERAGE,
    basePath + RoutePath.APPLYNOW_INSURANCE_PRIOR_POLICYTYPES,
    basePath + RoutePath.APPLYNOW_INSURANCE_PRIORPOLICY_END,
    basePath + RoutePath.APPLYNOW_INSURANCE_PRIOR_INSURANCESUMMARY
];
export const INSURANCE_GATEPOST_TWO_DEFAULT_PATH = [
    basePath + RoutePath.APPLYNOW_INSURANCE_EMPLOYER_POLICY_HOLDER,
    basePath + RoutePath.APPLYNOW_INSURANCE_EMPLOYER_POLICY_PROVIDER,
    basePath + RoutePath.APPLYNOW_INSURANCE_EMPLOYER_CONTACT,
    basePath + RoutePath.APPLYNOW_INSURANCE_EMPLOYER_POLICY_COVEREDBY,
    basePath + RoutePath.APPLYNOW_INSURANCE_EMPLOYER_COVERAGE_SELECTION,
    basePath + RoutePath.APPLYNOW_INSURANCE_EMPLOYER_ADDTIONALDETAIL,
    basePath + RoutePath.APPLYNOW_INSURANCE_EMPLOYER_MAINSUMMARY,
  
];
export const PageQueueOneConfig = {
    defaultPath: INSURANCE_GATEPOST_ONE_DEFAULT_PATH, pageQueueName: PageQueueName.GATEPOSTONE, actionName: ApplyNowPageActions.updatePageQueueData,
    gateWaypathName: `insurance/${RoutePath.APPLYNOW_INSURANCE_INSURANCE_GATEPOST}`,
    currentModule: RoutePath.APPLYNOW,
    getPathNameFunction: InsuranceGatePostOneGetObject,
    reducerObjectType: 'applyNow',
    lastPath: `insurance/${RoutePath.APPLYNOW_INSURANCE_EMPLOYER_OFFEREDINSURANCE_GATEPOST}`,
    
} as IConfigPageQueue
export const PageQueueTWOConfig = {
    defaultPath: INSURANCE_GATEPOST_TWO_DEFAULT_PATH, pageQueueName: PageQueueName.GATEPOSTTWO, actionName: ApplyNowPageActions.updatePageQueueData,
    gateWaypathName: `insurance/${RoutePath.APPLYNOW_INSURANCE_EMPLOYER_OFFEREDINSURANCE_GATEPOST}`,
    currentModule: RoutePath.APPLYNOW,
    getPathNameFunction: InsuranceGatePostTwoGetObject,
    reducerObjectType: 'applyNow',
    lastPath: `insurance/${RoutePath.APPLYNOW_INSURANCE_INSURANCEENDING}`,
} as IConfigPageQueue


