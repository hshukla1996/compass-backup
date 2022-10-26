import { INDIVIDUAL_PROGRAMS } from "../../../shared/constants/Individual_Programs_Constants"
import { RoutePath } from "../../../shared/route-strategies"
import { InsuranceType } from "./insurance.model"
const BASEPATH = 'applynow'
export const OUTSIDE_HOUSEHOLD_ID='100'
export const COVERED_BY='coveredby'
export const POLICY_HOLDER='policy_holder'
export const POLICY_COVERAGE='policy_coverage'
export const POLICY_TYPE='policy_type'
export const ADDRESS='addres'
export const EMPLOYER_ADDIONAL_DETAIl='additional_detail'
export const POLICY_END='policy_end'
export const POLICY_COMPANY='company'
export const EMPLOYER_POLICY_INFORMATION='employer_policy_information'
export const EMPLOYER_CONTACT_INFORMAION='employer_contact_information'
export const COVERAGE_PROPERTY_NAME='coverage'
export const COVERED_BY_NAME = 'coveredby'
export const POLICY_HOLDER_PROPERTY_NAME='policyholder'
export const POLICY_TYPE_PROPERTY_NAME = 'policytype'
export const POLICY_ADDRESS_PROPERTY_NAME='policyAddress'
export const CURRENT_POLICY_EMPLOYER_NAME='employerName'
export const CURRENT_POLICY_END='currentpolicyend'
export const CURRENT_MAP_NAMES =
    [
        { mapName: 'currentPolicyCoveredBy', mapDirection: 'currentPolicyCoveredByDirection' },
        { mapName: 'currentPolicyCoveredBy', mapDirection: 'currentPolicyCoveredByDirection' },
        { mapName: 'currentPolicyCoverage', mapDirection: 'currentPolicyCoverageDirection' },
        { mapName: 'currentPolicyType', mapDirection: 'currentPolicyTypeDirection' },
        { mapName: 'currentPolicyEmployer', mapDirection: 'currentPolicyEmployerDirection' },
        { mapName: 'currentPolicyAddress', mapDirection: 'currentPolicyCoveredByDirection' },
        { mapName: 'currentPolicyEnd', mapDirection: 'currentPolicyEndDirection' },
        { mapName: 'currentPolicyInsuranceCompany', mapDirection: 'currentPolicyInsuranceCompanyDirection' }
    ]

export const PRIOR_MAP_NAMES=[
    { mapName: 'priorPolicyHolder', mapDirection: 'priorPolicyHolderDirection' },
    { mapName: 'priorPolicyCoveredBy', mapDirection: 'priorPolicyCoveredByDirection' },
    { mapName: 'priorPolicyCoverage', mapDirection: 'priorPolicyCoverageDirection' },
    { mapName: 'priorPolicyType', mapDirection: 'priorPolicyTypeDirection' },
    { mapName: 'priorPolicyAddress', mapDirection: 'priorPolicyEndDirection' },
    { mapName: 'priorPolicyEnd', mapDirection: 'priorPolicyEndDirection' },
    { mapName: 'priorPolicyInsuranceCompany', mapDirection: 'priorPolicyInsuranceCompanyDirection' }
]

export const EMP_MAP_NAMES=
[
    { mapName: 'employerPolicyHolder', mapDirection: 'employerPolicyHolderDirection' },
    { mapName: 'employerPolicyCoveredBy', mapDirection: 'employerPolicyCoveredByDirection' },
    { mapName: 'employerPolicyCoverage', mapDirection: 'employerPolicyCoverageDirection' },
    { mapName: 'employerPolicyType', mapDirection: 'employerPolicyTypeDirection' },
    { mapName: 'employerPolicyEnd', mapDirection: 'employerPolicyEndDirection' },
    { mapName: 'employerPolicyInformation', mapDirection: 'employerPolicyInformationDirection' },
    { mapName: 'employerPolicyContact', mapDirection: 'employerPolicyContactDirection' },
    { mapName: 'employerPolicyProviderAdditionalDetail', mapDirection: 'employerPolicyProviderAdditionalDetailDirection' }
]
//map name and map direction name must match with apply-now model's  PageAction Property names

const currentPolicHolderMap = { mapName: 'currentPolicyCoveredBy', mapDirection: 'currentPolicyCoveredByDirection' }
const currentCoveredByMap = { mapName: 'currentPolicyCoveredBy', mapDirection: 'currentPolicyCoveredByDirection' }
const currentCoverage = { mapName: 'currentPolicyCoverage', mapDirection: 'currentPolicyCoverageDirection' }
const currentPolicyType = { mapName: 'currentPolicyType', mapDirection: 'currentPolicyTypeDirection' }
const currentEmployerPolicy = { mapName: 'currentPolicyEmployer', mapDirection: 'currentPolicyEmployerDirection' }
const currentPolicyAddress = { mapName: 'currentPolicyAddress', mapDirection: 'currentPolicyCoveredByDirection' }
const currentPolicyEnd = { mapName: 'currentPolicyEnd', mapDirection: 'currentPolicyEndDirection' }
const currentInsuranceCompany = { mapName: 'currentPolicyInsuranceCompany', mapDirection: 'currentPolicyInsuranceCompanyDirection' }
//prior
const priorPolicHolderMap = { mapName: 'priorPolicyHolder', mapDirection: 'priorPolicyHolderDirection' }
const priorCoveredByMap = { mapName: 'priorPolicyCoveredBy', mapDirection: 'priorPolicyCoveredByDirection' }
const priorCoverage = { mapName: 'priorPolicyCoverage', mapDirection: 'priorPolicyCoverageDirection' }
const priorPolicyType = { mapName: 'priorPolicyType', mapDirection: 'priorPolicyTypeDirection' }
const priorPolicyAddress = { mapName: 'priorPolicyAddress', mapDirection: 'priorPolicyAddressDirection' }
const priorPolicyEnd = { mapName: 'priorPolicyEnd', mapDirection: 'priorPolicyEndDirection' }
const priorInsuranceCompany = { mapName: 'priorPolicyInsuranceCompany', mapDirection: 'priorPolicyInsuranceCompanyDirection' }

//employer
const employerPolicHolderMap = { mapName: 'employerPolicyHolder', mapDirection: 'employerPolicyHolderDirection' }
const employerCoveredByMap = { mapName: 'employerPolicyCoveredBy', mapDirection: 'employerPolicyCoveredByDirection' }
const employerCoverage = { mapName: 'employerPolicyCoverage', mapDirection: 'employerPolicyCoverageDirection' }
const employerPolicyType = { mapName: 'employerPolicyType', mapDirection: 'employerPolicyTypeDirection' }
const employerPolicyEnd = { mapName: 'employerPolicyEnd', mapDirection: 'employerPolicyEndDirection' }
const employerPolicyInformation = { mapName: 'employerPolicyInformation', mapDirection: 'employerPolicyInformationDirection' }
const employerContactInformation = { mapName: 'employerPolicyContact', mapDirection: 'employerPolicyContactDirection' }
const employerAdditionalDetail = { mapName: 'employerPolicyProviderAdditionalDetail', mapDirection: 'employerPolicyProviderAdditionalDetailDirection' }
let _mapPropertyNames = {} as any
_mapPropertyNames[InsuranceType.Current]={}
_mapPropertyNames[InsuranceType.Current][POLICY_HOLDER] = currentPolicHolderMap
_mapPropertyNames[InsuranceType.Current][COVERED_BY] = currentCoveredByMap
_mapPropertyNames[InsuranceType.Current][POLICY_COVERAGE] = currentCoverage
_mapPropertyNames[InsuranceType.Current][POLICY_TYPE] = currentPolicyType
_mapPropertyNames[InsuranceType.Current][CURRENT_POLICY_EMPLOYER_NAME] = currentEmployerPolicy
_mapPropertyNames[InsuranceType.Current][ADDRESS] = currentPolicyAddress
_mapPropertyNames[InsuranceType.Current][POLICY_END] = currentPolicyEnd
_mapPropertyNames[InsuranceType.Current][POLICY_COMPANY] = currentInsuranceCompany

//prior
_mapPropertyNames[InsuranceType.PRIOR] = {}
_mapPropertyNames[InsuranceType.PRIOR][POLICY_HOLDER] = priorPolicHolderMap
_mapPropertyNames[InsuranceType.PRIOR][COVERED_BY] = priorCoveredByMap
_mapPropertyNames[InsuranceType.PRIOR][POLICY_COVERAGE] = priorCoverage
_mapPropertyNames[InsuranceType.PRIOR][POLICY_TYPE] = priorPolicyType
_mapPropertyNames[InsuranceType.PRIOR][ADDRESS] = priorPolicyAddress
_mapPropertyNames[InsuranceType.PRIOR][POLICY_END] = priorPolicyEnd
_mapPropertyNames[InsuranceType.PRIOR][POLICY_COMPANY] = priorInsuranceCompany

//employee offered

_mapPropertyNames[InsuranceType.EMOPLOYEROFFERED] = {}
_mapPropertyNames[InsuranceType.EMOPLOYEROFFERED][POLICY_HOLDER] = employerPolicHolderMap
_mapPropertyNames[InsuranceType.EMOPLOYEROFFERED][COVERED_BY] = employerCoveredByMap
_mapPropertyNames[InsuranceType.EMOPLOYEROFFERED][POLICY_COVERAGE] = employerCoverage
_mapPropertyNames[InsuranceType.EMOPLOYEROFFERED][POLICY_TYPE] = employerPolicyType
_mapPropertyNames[InsuranceType.EMOPLOYEROFFERED][EMPLOYER_POLICY_INFORMATION] = employerPolicyInformation
_mapPropertyNames[InsuranceType.EMOPLOYEROFFERED][EMPLOYER_CONTACT_INFORMAION] = employerContactInformation
_mapPropertyNames[InsuranceType.EMOPLOYEROFFERED][POLICY_END] = employerPolicyEnd
_mapPropertyNames[InsuranceType.EMOPLOYEROFFERED][EMPLOYER_ADDIONAL_DETAIl] = employerAdditionalDetail



export const MAPPEDPROPETYNAMES={..._mapPropertyNames};

export const CURRENT_POLICY_OUTSIDE_HOUSEHOLD_FIRSTNAME_PROGRAMS=[INDIVIDUAL_PROGRAMS.HC,INDIVIDUAL_PROGRAMS.HA,INDIVIDUAL_PROGRAMS.MCR,INDIVIDUAL_PROGRAMS.MAR,INDIVIDUAL_PROGRAMS.CA,
    INDIVIDUAL_PROGRAMS.CAR,INDIVIDUAL_PROGRAMS.LN,INDIVIDUAL_PROGRAMS.LI,INDIVIDUAL_PROGRAMS.LIR,INDIVIDUAL_PROGRAMS.WN,INDIVIDUAL_PROGRAMS.WNR] 
export const CURRENT_POLICY_OUTSIDE_HOUSEHOLD_LASTNAME_PROGRAMS=[INDIVIDUAL_PROGRAMS.HC,INDIVIDUAL_PROGRAMS.HA,INDIVIDUAL_PROGRAMS.MCR,INDIVIDUAL_PROGRAMS.MAR,INDIVIDUAL_PROGRAMS.CA,
        INDIVIDUAL_PROGRAMS.CAR,INDIVIDUAL_PROGRAMS.LN,INDIVIDUAL_PROGRAMS.LI,INDIVIDUAL_PROGRAMS.LIR,INDIVIDUAL_PROGRAMS.WN,INDIVIDUAL_PROGRAMS.WNR]
export const CURRENT_POLICY_OUTSIDE_HOUSEHOLD_COURT_ORDERED_PROGRAMS=[INDIVIDUAL_PROGRAMS.HA,INDIVIDUAL_PROGRAMS.MAR,INDIVIDUAL_PROGRAMS.CA,
        INDIVIDUAL_PROGRAMS.CAR,INDIVIDUAL_PROGRAMS.ABR]
        
export const PRIOR_POLICY_OUTSIDE_HOUSEHOLD_FIRSTNAME_PROGRAMS=[INDIVIDUAL_PROGRAMS.HC,INDIVIDUAL_PROGRAMS.HA,INDIVIDUAL_PROGRAMS.MCR,INDIVIDUAL_PROGRAMS.MAR,INDIVIDUAL_PROGRAMS.CA,
            INDIVIDUAL_PROGRAMS.CAR,INDIVIDUAL_PROGRAMS.LN,INDIVIDUAL_PROGRAMS.LI,INDIVIDUAL_PROGRAMS.LIR,INDIVIDUAL_PROGRAMS.WN,INDIVIDUAL_PROGRAMS.WNR] 
export const PRIOR_POLICY_OUTSIDE_HOUSEHOLD_LASTNAME_PROGRAMS=[INDIVIDUAL_PROGRAMS.HC,INDIVIDUAL_PROGRAMS.HA,INDIVIDUAL_PROGRAMS.MCR,INDIVIDUAL_PROGRAMS.MAR,INDIVIDUAL_PROGRAMS.CA,
                INDIVIDUAL_PROGRAMS.CAR,INDIVIDUAL_PROGRAMS.LN,INDIVIDUAL_PROGRAMS.LI,INDIVIDUAL_PROGRAMS.LIR,INDIVIDUAL_PROGRAMS.WN,INDIVIDUAL_PROGRAMS.WNR]
export const PRIOR_POLICY_OUTSIDE_HOUSEHOLD_COURT_ORDERED_PROGRAMS=[INDIVIDUAL_PROGRAMS.HA,INDIVIDUAL_PROGRAMS.MAR,INDIVIDUAL_PROGRAMS.CA,
                INDIVIDUAL_PROGRAMS.CAR,INDIVIDUAL_PROGRAMS.ABR]

export const CURRENT_POLICY_COVEREDBY_PROGRAMS=[INDIVIDUAL_PROGRAMS.HC,INDIVIDUAL_PROGRAMS.HA,INDIVIDUAL_PROGRAMS.ABR,INDIVIDUAL_PROGRAMS.CHR]
export const PRIOR_POLICY_COVEREDBY_PROGRAMS=[INDIVIDUAL_PROGRAMS.HC,INDIVIDUAL_PROGRAMS.MAR,INDIVIDUAL_PROGRAMS.MCR,INDIVIDUAL_PROGRAMS.CHR]
export const CURRENTPOLICYCOMPANY_COMPANYNAME_PROGRAMS=[]
export const CURRENTPOLICYCOMPANY_OTHERCOMAPNY_PROGRAMS=[]
export const CURRENTPOLICYCOMPANY_PLOICYNUMBER_PROGRAMS=[]
export const CURRENTPOLICYCOMPANY_GROUPNUMBER_PROGRAMS=[]
export const CURRENTPOLICYCOMPANY_POLICYSTART_PROGRAMS=[]
export const CURRENTPOLICYCOMPANY_PREMIUM_PROGRAMS=[]
export const CURRENTPOLICYCOMPANY_HOWOFTEN_PROGRAMS=[]
export const PRIORPOLICYCOMPANY_COMPANYNAME_PROGRAMS=[]
export const PRIORPOLICYCOMPANY_OTHERCOMAPNY_PROGRAMS=[]
export const PRIORPOLICYCOMPANY_PLOICYNUMBER_PROGRAMS=[]
export const PRIORPOLICYCOMPANY_GROUPNUMBER_PROGRAMS=[]
export const PRIORPOLICYCOMPANY_POLICYSTART_PROGRAMS=[]
export const PRIORPOLICYCOMPANY_PREMIUM_PROGRAMS=[]
export const PRIORPOLICYCOMPANY_HOWOFTEN_PROGRAMS=[]



export const INSURANCE_DIVIDER_PATH = `${BASEPATH}/${RoutePath.APPLYNOW_INSURANCE}`
export const CURRENT_POLICY_HOLDER_PATH=`${BASEPATH}/${RoutePath.APPLYNOW_INSURANCE}/${RoutePath.APPLYNOW_INSURANCE_INSURANCE_GATEPOST}`
export const OUTSIDEHOUSEHOLD_PATH = `${BASEPATH}/${RoutePath.APPLYNOW_INSURANCE}/${RoutePath.APPLYNOW_INSURANCE_OUTOFHOUSEPOLICYHOLDER}`

