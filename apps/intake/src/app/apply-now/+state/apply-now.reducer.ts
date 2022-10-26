import { createReducer, on } from "@ngrx/store";
import { ApplyNowApiActions, ApplyNowPageActions } from "./actions";
import { IApplyNowState, initialState } from "./apply-now.models";
import { ApplyNowMetaData } from '../../../../../../data/db'
import * as InsuranceActions from '../insurance/model/insurace-page-actions'
import { initialVoterData } from "../voter-registration/voter-registration-model/voter-registration-model";
import * as menu from "./../menu";
export const applyNowReducer = createReducer<IApplyNowState>(
    initialState,
    on(ApplyNowPageActions.updateMenuState, (state, action): IApplyNowState => {
        return {
            ...state,
            menu: action.applyNow.menu
        }
    }),
    on(ApplyNowPageActions.loadApplyNow, (state): IApplyNowState => {

        return {
            ...state
        }
    }
    ),
  on(ApplyNowPageActions.clearApplyNow, (state): IApplyNowState => {
      return {...initialState}
    }
  ),

    on(ApplyNowApiActions.loadVoterSuccess, (state, action): any => {

        return {
            ...state,
            voterRegistration:action.voterRegistration
        }
    }
    ),
    on(ApplyNowApiActions.loadMetaDataSuccess, (state, action): any => {


        return {
            ...state,
            metaData: ApplyNowMetaData
        }
    }
    ),
    on(ApplyNowPageActions.storeGeneralDetails, (state, action): IApplyNowState => {
        return {
            ...state,
            householdgeneralDetails: action.householdgeneralDetails
        };
    }
    ),
    on(ApplyNowPageActions.storeInsuranceDetails, (state, action): IApplyNowState => {
        return {
            ...state,
            insuranceDetails: action.insuranceDetails
        };
    }
    ),

    //
    on(ApplyNowPageActions.storeBenefitsNotReceived, (state, action): IApplyNowState => {
        return {
            ...state,
            benefitsNotRecevied: action.benefitsNotRecevied ? action.benefitsNotRecevied : state.benefitsNotRecevied
        };
    }
    ),
    on(ApplyNowPageActions.storeBenefitsNotReceivedDetails, (state, action): IApplyNowState => {
        return {
            ...state,
            benefitsNotReceviedDetails: action.benefitsNotReceviedDetails ? action.benefitsNotReceviedDetails : state.benefitsNotReceviedDetails
        };
    }
    ),
    on(ApplyNowPageActions.storePregnancyScreen, (state, action): IApplyNowState => {
        return {
            ...state,
            pregnancyScreenData: action.pregnancyScreenDetails ? action.pregnancyScreenDetails : state.pregnancyScreenData
        };
    }
    ),
    on(ApplyNowPageActions.storePregnancySummaryScreen, (state, action): IApplyNowState => {
        return {
            ...state,
            pregnancySummaryScreenDetails: action.pregnancySummaryScreenDetails ? action.pregnancySummaryScreenDetails
                : state.pregnancySummaryScreenDetails
        };
    }
    ),

    on(ApplyNowPageActions.storeFederalIncomeTaxReturn, (state, action): IApplyNowState => {
        return {
            ...state,
            federalInComeTaxReturnDetails: action.federalIncomeTaxReturnDetails ? action.federalIncomeTaxReturnDetails :
                state.federalInComeTaxReturnDetails
        };
    }
    ),
    on(ApplyNowPageActions.storeTaxDependentDetails, (state, action): IApplyNowState => {
        return {
            ...state,
            taxDependentDetails: action.taxDependentDetails ? action.taxDependentDetails :
                state.taxDependentDetails
        };
    }
    ),
    on(ApplyNowPageActions.storeTaxDependentDetailsData, (state, action): IApplyNowState => {
        return {
            ...state,
            taxDependentDetailsData: action.taxDependentDetailsData ? action.taxDependentDetailsData :
                state.taxDependentDetailsData
        };
    }
    ),
    on(ApplyNowPageActions.storeDomesticViolence, (state, action): IApplyNowState => {
        return {
            ...state,
            domesticViolenceDetails: action.domesticViolenceDetails ? action.domesticViolenceDetails :
                state.domesticViolenceDetails
        };
    }
    ),
    on(ApplyNowPageActions.storeFamilyPlanningServices, (state, action): IApplyNowState => {
        return {
            ...state,
            familPlanningServicesDetails: action.familyPlanningServicesDetails ? action.familyPlanningServicesDetails :
                state.familPlanningServicesDetails
        };
    }
    ),
    on(ApplyNowPageActions.storeHomeLessNess, (state, action): IApplyNowState => {
        return {
            ...state,
            homeLesssNessDetails: action.homeLessNessDetails ? action.homeLessNessDetails :
                state.homeLesssNessDetails
        };
    }
    ),
    on(ApplyNowPageActions.storeMigrantSeasonalFarmWorkerData, (state, action): IApplyNowState => {
        return {
            ...state,
            migrantOrSeasonalFarmWorkerDetails: action.migrantSeasonalFarmWorkerDetails ? action.migrantSeasonalFarmWorkerDetails :
                state.migrantOrSeasonalFarmWorkerDetails
        };
    }
    ),
    on(ApplyNowPageActions.storeCurrentSnapOrTanfBenefits, (state, action): IApplyNowState => {
        return {
            ...state,
            receivingTANF: action.receivingTANF ? action.receivingTANF :
                state.receivingTANF
        };
    }
    ),
    on(ApplyNowPageActions.storePriorTanfOrCashAssistance, (state, action): IApplyNowState => {
        return {
            ...state,
            receivedTANFInPasts6Months: action.receivedTANFInPasts6Months
        };
    }
    ),
    on(ApplyNowPageActions.storeSocialSecurityDisability, (state, action): IApplyNowState => {
        return {
            ...state,
            socialSecurityDisability: action.socialSecurityDisability ? action.socialSecurityDisability :
                state.socialSecurityDisability
        };
    }
    ),
    on(ApplyNowPageActions.storeCurrentlyInPrison, (state, action): IApplyNowState => {
        return {
            ...state,
            isAnyoneCurrentlyIncarcerated: action.isAnyoneCurrentlyIncarcerated
        };
    }
    ),
    on(ApplyNowPageActions.storeHouseholdDetails, (state, action): IApplyNowState => {
        return {
            ...state,
            houseHoldDetails: action.houseHoldDetails
        };
    }
    ),

    // on(ApplyNowPageActions.storeHouseHoldPersonAction, (state, action): IApplyNowState => {
    //     console.log("action", action)
    //     return {
    //         ...state,
    //         houseHoldDetails: {
    //             ...state.houseHoldDetails,
    //             houseHoldPersons: action.houseHoldPersons
    //         }
    //     };
    // }
    // ),

    on(ApplyNowPageActions.storeHouseholdFacility, (state, action): IApplyNowState => {
        return {
            ...state,
            houseHoldDetails: action.houseHoldDetails
        };
    }
    ),

    //Electric Provider
    on(ApplyNowPageActions.storeHouseholdElectricProvider, (state, action): IApplyNowState => {
        return {
            ...state,
            houseHoldDetails: action.houseHoldDetails
        };
    }
    ),

    //Inverse Relation
    on(ApplyNowPageActions.storeHouseholdPersonBasicDetails, (state, action): IApplyNowState => {
        return {
            ...state,
            houseHoldDetails: action.houseHoldDetails
        };
    }
    ),

    //Water Questions
    on(ApplyNowPageActions.storeHouseholdWaterQuestions, (state, action): IApplyNowState => {
        return {
            ...state,
            houseHoldDetails: action.houseHoldDetails
        };
    }
    ),

    // on(ApplyNowPageActions.storeAbsentRelativeDetails, (state, action): IApplyNowState => {
    //     return {
    //         ...state,
    //         absentRelative: action.absentRelative
    //     };
    // }
    // ),

    //household address
    on(ApplyNowPageActions.storeHouseholdAddress, (state, action): IApplyNowState => {
        return {
            ...state,
            houseHoldDetails: action.houseHoldDetails
        };
    }
    ),

    on(ApplyNowPageActions.storeResourceSelections, (state, action): IApplyNowState => {
        return {
            ...state,
            resourceSelections: action.applyNow.resourceSelections
        };
    }
    ),

	on(ApplyNowPageActions.storeIncomeGatepostSelections, (state, action): IApplyNowState => {
        return {
            ...state,
            incomeGatepostSelection: action.applyNow.incomeGatepostSelection
        };
    }
    ),


    on(ApplyNowPageActions.storeHouseholdServicesSelected, (state, action): IApplyNowState => {
        return {
            ...state,
            programSelection: {
                programs: action.services || [],
            }
        };
    }
    ),



    on(ApplyNowPageActions.updateScreenQueueAction, (state, action): IApplyNowState => {
        return {
            ...state,
            pageQueue: action.applyNow.pageQueue
        };
    }
    ),
    on(ApplyNowPageActions.storeHouseholdsituationSelectionActions, (state, action): IApplyNowState => {
        return {
            ...state,
            householdMemberSituationGatepostSelection: action.applyNow.householdMemberSituationGatepostSelection,
            otherHouseholdSituations: action.applyNow.otherHouseholdSituations
        };
    }
    ),
    on(ApplyNowPageActions.storeHouseholdSituationsActions, (state, action): IApplyNowState => {
        return {
            ...state,
            otherHouseholdSituations: action.applyNow.otherHouseholdSituations
        };
    }
    ),
    on(ApplyNowPageActions.storeHouseholdHasAnyoneReceivedSSDInThePast, (state, action): IApplyNowState => {
        return {
            ...state,
            householdHasAnyoneReceivedSSDInThePast: action.householdHasAnyoneReceivedSSDInThePast
        };
    }
    ),
    on(ApplyNowPageActions.storeHouseholdHasAnyoneReceivedSSIInThePast, (state, action): IApplyNowState => {
        return {
            ...state,
            householdHasAnyoneReceivedSSIInThePast: action.householdHasAnyoneReceivedSSIInThePast
        };
    }
    ),
    on(ApplyNowPageActions.updatePageAction, (state, action): IApplyNowState => {
        return {
            ...state,
            pageAction: action.applyNow.pageAction
        };
    }
    ),
    on(ApplyNowPageActions.storeIndividualOwnesFines, (state, action): IApplyNowState => {
        return {
            ...state,
            whoHasBeenConvictedAFelony: action.whoHasBeenConvictedAFelony ? action.whoHasBeenConvictedAFelony :
                state.whoHasBeenConvictedAFelony
        };
    }
    ),
    on(ApplyNowPageActions.storeIndividualConvictedWelfareFraud, (state, action): IApplyNowState => {
        return {
            ...state,
            whoWasConvictedForWelfareFraud: action.whoWasConvictedForWelfareFraud ? action.whoWasConvictedForWelfareFraud :
                state.whoWasConvictedForWelfareFraud
        };
    }
    ),
    on(ApplyNowPageActions.storeIndividualCurrentlyOnProbation, (state, action): IApplyNowState => {
        return {
            ...state,
            whoIsOnProbationOrParole: action.whoIsOnProbationOrParole ? action.whoIsOnProbationOrParole :
                state.whoIsOnProbationOrParole
        };
    }
    ),
    on(ApplyNowPageActions.storeIndividualCurrentlyFleeing, (state, action): IApplyNowState => {
        return {
            ...state,
            whoIsCurrentlyFleeingFromLawEnforcementOfficials: action.whoIsCurrentlyFleeingFromLawEnforcementOfficials ? action.whoIsCurrentlyFleeingFromLawEnforcementOfficials :
                state.whoIsCurrentlyFleeingFromLawEnforcementOfficials
        };
    }
    ),
    on(ApplyNowPageActions.storeGettingStartedEnding, (state, action): IApplyNowState => {
        return {
            ...state,
            gettingStartedResponse: action.gettingStarted
        };
    }
    ),
    on(ApplyNowPageActions.storeVoterRegistration, (state, action): IApplyNowState => {
        return {
            ...state,
            voterRegistration: action.voterInfo
        };
    }
    ),

    on(ApplyNowPageActions.storeIsFromSummary, (state, action): IApplyNowState => {
        return {
            ...state,
            fromSummary: action.fromSummary
        };
    }
    ),
    on(ApplyNowPageActions.storeMAProviderInfo, (state, action): IApplyNowState => {
        return {
            ...state,
            gettingStarted: action.maProviderInfo
        };
    }
    ),
    on(ApplyNowPageActions.updatePageQueueData, (state, action): IApplyNowState => {
        return {
            ...state,
            pageQueueData: action.applyNow.pageQueueData
        };
    }
    ),
    on(InsuranceActions.storeInsurance, InsuranceActions.storeInsuranceFn),

)



