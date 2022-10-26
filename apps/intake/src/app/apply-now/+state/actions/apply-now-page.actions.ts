import { createAction, props } from '@ngrx/store';
import { IGeneralDetails, IHouseHoldGeneralDetails } from '../../individual-details/general-details/state/general-details-model';
import { IInsurance, IWhoIsCovered } from '../../insurance/insurance.model';
import { IBenefitsNotReceviedDetails, IApplyNowState, IPregnancySummaryScreenDetails, IBenefitsNotRecevied, IPregnancyScreen, IFederalIncomeTaxReturn, ITaxDependents, ITaxDependentsDetails, IDomesticViolence, IFamilyPlanningServices, IHomelessness, IMigrantOrSeasonalFarmWorker, ICurrentSnapOrTanfBenefits, IPriorTanfOrCashAssistance, ISocialSecurityDisability, IHouseholdHasAnyoneReceivedSSDInThePast, IHouseholdHasAnyoneReceivedSSIInThePast, ICurrentlyInPrison, IIndividualOwnesFines, IIndividualConvictedWelfareFraud, IIndividualCurrentlyOnProbation, IIndividualCurrentlyFleeing, IFromSummary } from '../apply-now.models';
// import { IResourcesDetails } from '../../resources/state/resources-state-model';
import { IResourcesDetails } from '../../resources/state/resources-state-model';
import { IAbsentRelative, IHouseHold, IHouseholdAddress, IHouseholdBenefitsDetails, IHouseHoldDetails } from '../../household/household-model';
import { IVoterRegistrationState } from '../../voter-registration/voter-registration-model/voter-registration-model';


export const loadApplyNow = createAction('[ApplyNow Page] Load ApplyNow');
export const loadApplyNowMetaData = createAction('[ApplyNow Page] Load ApplyNowMetaData');



export const clearApplyNow = createAction(
  '[ApplyNow Page] Clear ApplyNow'
);

export const storeGettingStartedEnding = createAction(
  '[ApplyNow Page] Store GettingStarted',
  props<{ gettingStarted: any }>()
);

export const storeVoterRegistration = createAction(
  '[ApplyNow Page] Store VoterRegistration',
  props<{ voterInfo: IVoterRegistrationState }>()
);

export const storeMAProviderInfo = createAction(
  '[ApplyNow Page] Store MAProviderInfo',
  props<{ maProviderInfo: any }>()
);

export const storeGeneralDetails = createAction(
  '[ApplyNow Page] Store GeneralDetails',
  props<{ householdgeneralDetails: IHouseHoldGeneralDetails }>()
);

export const storeInsuranceDetails = createAction(
  '[ApplyNow Page] Store insuranceDetails',
  props<{ insuranceDetails: IInsurance }>()
);

export const storeWhoIsCoveredDetails = createAction(
  '[ApplyNow Page] Store WhoIsCoveredDetails',
  props<{ whoIsCoveredDetails: IWhoIsCovered[] }>()
);

export const storeBenefitsNotReceivedDetails = createAction(
  '[ApplyNow Page] Store Individual Details',
  props<{ benefitsNotReceviedDetails: IBenefitsNotReceviedDetails }>()
);

export const storeCurrentSnapOrTanfBenefits = createAction(
  '[ApplyNow Page] Store Individual Details',
  props<{ receivingTANF: ICurrentSnapOrTanfBenefits }>()
);

export const storePriorTanfOrCashAssistance = createAction(
  '[ApplyNow Page] Store Individual Details',
  props<{ receivedTANFInPasts6Months: IPriorTanfOrCashAssistance }>()
);

export const storeSocialSecurityDisability = createAction(
  '[ApplyNow Page] Store Individual Details',
  props<{ socialSecurityDisability: ISocialSecurityDisability[] }>()
);

export const storeCurrentlyInPrison = createAction(
  '[ApplyNow Page] Store Individual Details',
  props<{ isAnyoneCurrentlyIncarcerated: ICurrentlyInPrison }>()
);

export const storeBenefitsNotReceived = createAction(
  '[ApplyNow Page] Store Individual Details',
  props<{ benefitsNotRecevied: IBenefitsNotRecevied }>()
);

export const storePregnancySummaryScreen = createAction(
  '[ApplyNow Page] Store Individual Details ',
  props<{ pregnancySummaryScreenDetails: IPregnancySummaryScreenDetails}>()
);

export const storeFederalIncomeTaxReturn = createAction(
  '[ApplyNow Page] Store Individual Details ',
  props<{ federalIncomeTaxReturnDetails: IFederalIncomeTaxReturn }>()
);

export const storeTaxDependentDetails = createAction(
  '[ApplyNow Page] Store Individual Details ',
  props<{ taxDependentDetails: ITaxDependents }>()
);

export const storeTaxDependentDetailsData = createAction(
  '[ApplyNow Page] Store Individual Details',
  props<{ taxDependentDetailsData: ITaxDependentsDetails }>()
);

export const storePregnancyScreen = createAction(
  '[ApplyNow Page] Store Individual Details ',
  props<{ pregnancyScreenDetails: IPregnancyScreen }>()
);

export const storeDomesticViolence = createAction(
  '[ApplyNow Page] Store Individual Details ',
  props<{ domesticViolenceDetails: IDomesticViolence }>()
);


export const storeMigrantSeasonalFarmWorkerData = createAction(
  '[ApplyNow Page] Store Individual Details ',
  props<{ migrantSeasonalFarmWorkerDetails: IMigrantOrSeasonalFarmWorker }>()
);

export const storeHomeLessNess = createAction(
  '[ApplyNow Page] Store Individual Details ',
  props<{ homeLessNessDetails: IHomelessness }>()
);

export const storeFamilyPlanningServices = createAction(
  '[ApplyNow Page] Store Individual Details ',
  props<{ familyPlanningServicesDetails: IFamilyPlanningServices }>()
);

export const storeHouseholdDetails = createAction(
  '[ApplyNow Page] Store HouseHoldDetails',
  props<{ houseHoldDetails: IHouseHoldDetails }>()
);

//Electric Provider
export const storeHouseholdElectricProvider = createAction(
  '[ApplyNow Page] Store HouseHoldElectricProviders',
  props<{ houseHoldDetails: IHouseHoldDetails }>()
);
//Inverse Relation
export const storeHouseholdPersonBasicDetails = createAction(
  '[ApplyNow Page] Store HouseholdPersonBasicDetails',
  props<{ houseHoldDetails: IHouseHoldDetails }>()
);

export const storeHouseholdBasicDetails = createAction(
  '[ApplyNow Page] Store HouseholdBasicDetails',
  props<{ houseHoldDetails: IHouseHoldDetails }>()
);

//WaterQuestions
export const storeHouseholdWaterQuestions = createAction(
  '[ApplyNow Page] Store HouseHoldWaterQuestions',
  props<{ houseHoldDetails: IHouseHoldDetails }>()
);

export const storeHouseholdFacility = createAction(
  '[ApplyNow Page] Store HouseHoldFacility',
  props<{ houseHoldDetails: IHouseHoldDetails }>()
);

//household address
export const storeHouseholdAddress = createAction(
  '[ApplyNow Page] Store HouseholdAddress',
  props<{ houseHoldDetails: IHouseHoldDetails }>()
);

export const storeHouseholdBenefitsDetails = createAction(
  '[ApplyNow Page] Store HouseHoldBenefitsDetails',
  props<{ houseHoldBenefitsDetails: IHouseholdBenefitsDetails }>()
);

export const storeAbsentRelativeDetails = createAction(
  '[ApplyNow Page] Store AbsentRelativeDetails',
  props<{ absentRelative: IAbsentRelative }>()
);

export const storeHouseholdServicesSelected = createAction(
  '[Referrals Page] Store ServicesSelected',
  props<{ services: string[] }>()
);


export const storeResourceSelections = createAction(
  '[ApplyNow Page] Store Resource selections',
  
  props<{ applyNow: IApplyNowState }>()
)

export const loadApplyNowMenu = createAction('[ApplyNow Page] Load Menu');

export const loadApplyNowVoter = createAction('[ApplyNow Page] Load Voter', 
  (appId: any) => ({ appId })
  // props<{ appId: any }>()
  );

export const loadItems = createAction(
  '[ApplyNow Page] Load Voter', props<{ appId: string }>());

export const updateMenuState = createAction(
  '[ApplyNow Page] Update Menu Item Status',
  props<{ applyNow: IApplyNowState }>()
);

export const updatePageAction = createAction(
  '[ApplyNow Page] Update Page Action Detail',
  props<{ applyNow: IApplyNowState }>()
);
export const updateScreenQueueAction = createAction(
  '[ApplyNow Page] Update Page Queue Detail',
  props<{ applyNow: any }>()
);

//new
export const storeHouseholdSNAPDisability = createAction(
  '[ApplyNow Page] Store HouseholdSNAPDisability',
  props<{ applyNow: IApplyNowState }>()
);
export const storeHouseholdSNAPDetails = createAction(
  '[ApplyNow Page] Store HouseholdSNAPDetails',
  props<{ applyNow: IApplyNowState }>()
);

export const storeHouseholdCashAssistance = createAction(
  '[ApplyNow Page] Store HouseholdCashAssistance',
  props<{ applyNow: IApplyNowState }>()
);

export const storeHouseholdChildCareCost = createAction(
  '[ApplyNow Page] Store HouseholdChildCareCost',
  props<{ applyNow: IApplyNowState }>()
);

export const storeHouseholdSchoolMeals = createAction(
  '[ApplyNow Page] Store HouseholdSchoolMeals',
  props<{ applyNow: IApplyNowState }>()
);

export const storeHouseholdLongtermLivingServices = createAction(
  '[AppleyNow Pag] Store HouseholdLongtermLivingServices',
  props<{ applyNow: IApplyNowState }>()
);

export const storeHouseholdSituationsActions = createAction(
  '[ApplyNow Page] Store House Situations Value',
  props<{ applyNow: IApplyNowState }>()
)

export const storeHouseholdsituationSelectionActions = createAction(
  '[ApplyNow Page] Store House Situations Options Value',
  props<{ applyNow: IApplyNowState }>()
)


export const storeHouseHoldDetails = createAction(
  '[ApplyNow Page] Store HouseHold Details',
  props<{ applyNow: IApplyNowState }>()
);
export const storeGettingStarted = createAction(
  '[ApplyNow Page] Store Getting Started',
  props<{ gettingstarted: IApplyNowState }>()
);

export const storeHouseholdHasAnyoneReceivedSSDInThePast = createAction(
  '[ApplyNow Page] Store HasAnyone ReceivedSSD',
  props<{ householdHasAnyoneReceivedSSDInThePast: IHouseholdHasAnyoneReceivedSSDInThePast }>()
);
export const storeHouseholdHasAnyoneReceivedSSIInThePast = createAction(
  '[ApplyNow Page] Store HasAnyone ReceivedSSI',
  props<{ householdHasAnyoneReceivedSSIInThePast: IHouseholdHasAnyoneReceivedSSIInThePast }>()
);

// export const storeHouseHoldPersonAction = createAction(
//   '[ApplyNow Page] Store HouseHoldRelationshipDetails',
//   props<{ houseHoldPersons: IHouseHold[] }>()
// );

export const storeIndividualOwnesFines = createAction(
  '[ApplyNow Page] Store Individual Details',
  props<{ whoHasBeenConvictedAFelony: IIndividualOwnesFines }>()
);

export const storeIndividualConvictedWelfareFraud = createAction(
  '[ApplyNow Page] Store Individual Details',
  props<{ whoWasConvictedForWelfareFraud: IIndividualConvictedWelfareFraud }>()
);

export const storeIndividualCurrentlyOnProbation = createAction(
  '[ApplyNow Page] Store Individual Details',
  props<{ whoIsOnProbationOrParole: IIndividualCurrentlyOnProbation }>()
);

export const storeIndividualCurrentlyFleeing = createAction(
  '[ApplyNow Page] Store Individual Details',
  props<{ whoIsCurrentlyFleeingFromLawEnforcementOfficials: IIndividualCurrentlyFleeing }>()
);

//Income

//IncomeGatepost
export const storeIncomeGatepostSelections = createAction(
  '[ApplyNow Income] Gatepost selections',
  props<{ applyNow: IApplyNowState }>()
);

//IncomeGatepost
export const storeIncomeFutureJobSelected = createAction(
  '[Referrals Page] Store Future Job Selected',
  props<{ gateposts: string[] }>()
);

//IncomeGatepost
export const storeIncomePastJobSelected = createAction(
  '[Referrals Page] Store Past Job Selected',
  props<{ gateposts: string[] }>()
);
export const storeIsFromSummary = createAction(
  '[Apply Now] Store Is Added From Summary',
  props<{ fromSummary: IFromSummary }>()
);


export const updatePageQueueData = createAction(
  '[Apply Now] Update Page Queue',
  props<{ applyNow: IApplyNowState }>()
);
