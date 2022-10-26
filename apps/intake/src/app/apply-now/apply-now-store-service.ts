import { Injectable, } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MenuData } from '@compass-ui/data';
import { getApplyNow} from './+state/apply-now.selectors';
import * as menu from './menu';
import SaveContract from '../shared/services/afs_save_response.json';
import {
  HouseholdDetails,
  HouseholdMemberSituationGatepost,
  HouseholdMemberSituationGatepostOptions,
  IBenefitsNotReceviedDetails,
  IApplyNowState,
  IPregnancySummaryScreenDetails,
  IBenefitsNotRecevied,
  IPregnancyScreen,
  IFederalIncomeTaxReturn,
  ITaxDependents,
  ITaxDependentsDetails,
  IDomesticViolence,
  IFamilyPlanningServices,
  IHomelessness,
  IMigrantOrSeasonalFarmWorker,
  ICurrentSnapOrTanfBenefits,
  PageAction,
  IPriorTanfOrCashAssistance,
  ISocialSecurityDisability,
  IHouseholdHasAnyoneReceivedSSDInThePast,
  IHouseholdHasAnyoneReceivedSSIInThePast,
  ICurrentlyInPrison,
  ResourceSelections,
  IIndividualOwnesFines,
  IIndividualConvictedWelfareFraud,
  IIndividualCurrentlyOnProbation,
  IIndividualCurrentlyFleeing,
  IFromSummary,
  IncomeGatepostSelection,
  Programs
} from './+state/apply-now.models';
import { MenuItemState } from '../shared/menu-item-state';
import { RoutePath } from '../shared/route-strategies';
import { UtilService } from '../shared/services/util.service';
import { Store } from '@ngrx/store';
import { State } from '../+state';
import { ApplyNowPageActions } from './+state/actions';
import { BehaviorSubject } from 'rxjs';
import { IGeneralDetails, IHouseHoldGeneralDetails } from './individual-details/general-details/state/general-details-model';
import { FormControl, FormGroup } from "@angular/forms";
import { IInsurance, IWhoIsCovered } from './insurance/insurance.model';
import { IHouseHold, IAbsentRelative, IHouseholdBenefitsDetails, IHouseHoldDetails } from './household/household-model';
import { Router } from "@angular/router";
import {INDIVIDUAL_PROGRAMS} from "../shared/constants/Individual_Programs_Constants";
import { IVoterRegistrationState, VoterIndividual } from './voter-registration/voter-registration-model/voter-registration-model';
import { Utility } from '../shared/utilities/Utility';


@Injectable({
    providedIn: "root",
})
export class ApplyNowStoreService {
    routePath: typeof RoutePath = RoutePath;
    applyNow!: IApplyNowState;
    applyNow$!: Observable<IApplyNowState | null>;
    data: any;
    menuData: MenuData = menu.menuData;
    static submitEvent = new BehaviorSubject<string>("");
    submitEvent$ = ApplyNowStoreService.submitEvent.asObservable();
    static triggerNext = new BehaviorSubject<string>("");
    public gettingStarted$: Observable<any> =
        ApplyNowStoreService.triggerNext.asObservable();

    constructor(private store: Store<State>, private utilService: UtilService) {
        this.applyNow$ = this.store.select(getApplyNow);
        this.store.select(getApplyNow).subscribe((d) => {
            this.applyNow = { ...d };
        });
    }

    updateInsuranceDetails(updatedInsuranceDetails: IInsurance) {
        this.store.dispatch(
            ApplyNowPageActions.storeInsuranceDetails({
                insuranceDetails: updatedInsuranceDetails,
            })
        );
    }

    updateGeneralDetails(
        updatedHouseHoldGeneralDetails: IHouseHoldGeneralDetails
    ) {
        this.store.dispatch(
            ApplyNowPageActions.storeGeneralDetails({
                householdgeneralDetails: updatedHouseHoldGeneralDetails,
            })
        );
    }

    loadVoterData(){
        this.store.dispatch(
            ApplyNowPageActions.loadApplyNowVoter(
                this.applyNow.gettingStartedResponse?.id
            )
        )
    }

    updateResourceSelections(resourceSelections: ResourceSelections) {
        const updatedApplyNow = { ...this.applyNow, resourceSelections };
        this.store.dispatch(
            ApplyNowPageActions.storeResourceSelections({
                applyNow: updatedApplyNow,
            })
        );
    }

    updateWhoIsCoveredDetails(updatedWhoIsCoveredDetails: IWhoIsCovered[]) {
        this.store.dispatch(
            ApplyNowPageActions.storeWhoIsCoveredDetails({
                whoIsCoveredDetails: updatedWhoIsCoveredDetails,
            })
        );
    }
    get getApplyNow() {
        return this.applyNow;
    }
    get getHousehold() {
        return this.applyNow.household ?? [];
    }

    get gettingStartedResponseID() {
        return this.applyNow.gettingStartedResponse?.id;
    }
    updateBenefitsNotRecevied(benefitsNotRecevied: IBenefitsNotRecevied) {
        this.store.dispatch(
            ApplyNowPageActions.storeBenefitsNotReceived({
                benefitsNotRecevied: benefitsNotRecevied,
            })
        );
    }

    updateBenefitsNotReceviedDetailsUpdated(
        benefitsNotReceviedDetails: IBenefitsNotReceviedDetails
    ) {
        this.store.dispatch(
            ApplyNowPageActions.storeBenefitsNotReceivedDetails({
                benefitsNotReceviedDetails: benefitsNotReceviedDetails,
            })
        );
    }

    updateCurrentSnapOrTanfBenefits(receivingTANF: ICurrentSnapOrTanfBenefits) {
        this.store.dispatch(
            ApplyNowPageActions.storeCurrentSnapOrTanfBenefits({
                receivingTANF: receivingTANF,
            })
        );
    }

    updatePriorTanfOrCashAssistance(
        receivedTANFInPasts6Months: IPriorTanfOrCashAssistance
    ) {
        this.store.dispatch(
            ApplyNowPageActions.storePriorTanfOrCashAssistance({
                receivedTANFInPasts6Months: receivedTANFInPasts6Months,
            })
        );
    }

    updateSocialSecurityDisability(
        socialSecurityDisability: ISocialSecurityDisability[]
    ) {
        this.store.dispatch(
            ApplyNowPageActions.storeSocialSecurityDisability({
                socialSecurityDisability: socialSecurityDisability,
            })
        );
    }

    updateCurrentlyInPrison(isAnyoneCurrentlyIncarcerated: ICurrentlyInPrison) {
        this.store.dispatch(
            ApplyNowPageActions.storeCurrentlyInPrison({
                isAnyoneCurrentlyIncarcerated: isAnyoneCurrentlyIncarcerated,
            })
        );
    }

    updatePregnancyScreen(pregnancyScreenDetails: IPregnancyScreen) {
        this.store.dispatch(
            ApplyNowPageActions.storePregnancyScreen({
                pregnancyScreenDetails: pregnancyScreenDetails,
            })
        );
    }

    updateDomesticViolenceData(domesticViolenceData: IDomesticViolence) {
        this.store.dispatch(
            ApplyNowPageActions.storeDomesticViolence({
                domesticViolenceDetails: domesticViolenceData,
            })
        );
    }

    updateMigrantSeasonalFarmWorkerData(
        migrantSeasonalFarmWorkerData: IMigrantOrSeasonalFarmWorker
    ) {
        this.store.dispatch(
            ApplyNowPageActions.storeMigrantSeasonalFarmWorkerData({
                migrantSeasonalFarmWorkerDetails: migrantSeasonalFarmWorkerData,
            })
        );
    }

    updateHomeLessNessData(homeLessNessData: IHomelessness) {
        this.store.dispatch(
            ApplyNowPageActions.storeHomeLessNess({
                homeLessNessDetails: homeLessNessData,
            })
        );
    }

    updateFamilyServicesData(familyServicesData: IFamilyPlanningServices) {
        this.store.dispatch(
            ApplyNowPageActions.storeFamilyPlanningServices({
                familyPlanningServicesDetails: familyServicesData,
            })
        );
    }

    updatePregnancySummaryScreenDetails(
        pregnancySummaryScreenDetails: IPregnancySummaryScreenDetails
    ) {
        this.store.dispatch(
            ApplyNowPageActions.storePregnancySummaryScreen({
                pregnancySummaryScreenDetails: pregnancySummaryScreenDetails,
            })
        );
    }

    updateFederalIncomeTaxReturnDetails(
        federalIncometaxReturnDetails: IFederalIncomeTaxReturn
    ) {
        this.store.dispatch(
            ApplyNowPageActions.storeFederalIncomeTaxReturn({
                federalIncomeTaxReturnDetails: federalIncometaxReturnDetails,
            })
        );
    }

    updateTaxDependentDetails(taxDependents: ITaxDependents) {
        this.store.dispatch(
            ApplyNowPageActions.storeTaxDependentDetails({
                taxDependentDetails: taxDependents,
            })
        );
    }

    updateTaxDependentDetailsData(
        taxDependentDetailsData: ITaxDependentsDetails
    ) {
        this.store.dispatch(
            ApplyNowPageActions.storeTaxDependentDetailsData({
                taxDependentDetailsData: taxDependentDetailsData,
            })
        );
    }
    updateHouseHoldDetails(updatedHouseholdDetails: IHouseHoldDetails) {
        this.store.dispatch(
            ApplyNowPageActions.storeHouseholdDetails({
                houseHoldDetails: updatedHouseholdDetails,
            })
        );
    }

    updateHouseHoldElectricProvider(
        updatedElectricProviders: IHouseHoldDetails
    ) {
        this.store.dispatch(
            ApplyNowPageActions.storeHouseholdElectricProvider({
                houseHoldDetails: updatedElectricProviders,
            })
        );
    }

    //waterQuestions
    updateHouseHoldWaterQuestions(updatedWaterQuestions: IHouseHoldDetails) {
        this.store.dispatch(
            ApplyNowPageActions.storeHouseholdWaterQuestions({
                houseHoldDetails: updatedWaterQuestions,
            })
        );
    }

    // updateBasicDetails(householdBasicDetails: IHouseHoldDetails) {
    //     const updatedBasicDetail = { ...this.applyNow, ...{ householdBasicDetails } }

    //     this.store.dispatch(ApplyNowPageActions.storeHouseholdBasicDetails({ houseHoldDetails: updatedBasicDetail }))
    // }
    //Inverse Relation

    updateHouseHoldBasicDetails(houseHoldPersons: IHouseHoldDetails) {
        this.store.dispatch(
            ApplyNowPageActions.storeHouseholdPersonBasicDetails({
                houseHoldDetails: houseHoldPersons,
            })
        );
    }

    // updateBasicDetails(houseHoldPersons: IHouseHold) {
    //     console.log("names----",houseHoldPersons)
    //     // const updatedBasicDetail = { ...this.applyNow,  houseHoldDetails:{...this.applyNow.houseHoldDetails,  houseHoldPersons  }}

    //     this.store.dispatch(ApplyNowPageActions.storeHouseHoldPersonAction({ houseHoldPersons: houseHoldPersons as IHouseHold[]}))
    // }

    getBasicDetails() {
        return this.applyNow?.houseHoldDetails?.houseHoldPersons ?? [];
    }
    //end Inverse Relation
    //TypeofFacility

    get getSelectedhouseholdValue() {
        return this.applyNow.householdMemberSituationGatepostSelection;
    }

    updatehouseHoldSituations(
        otherHouseholdSituations: HouseholdMemberSituationGatepost
    ) {
        const updatedApplyNow = { ...this.applyNow, otherHouseholdSituations };
        this.store.dispatch(
            ApplyNowPageActions.storeHouseholdSituationsActions({
                applyNow: updatedApplyNow,
            })
        );
    }

    houseHoldSituationsOptionUpdated(
        householdMemberSituationGatepostSelection: HouseholdMemberSituationGatepostOptions
    ) {
        const otherHouseholdSituations = this.mapwithOtherhouseHoldSituation(
            householdMemberSituationGatepostSelection
        ) as HouseholdMemberSituationGatepost;
        const updatedApplyNow = {
            ...this.applyNow,
            householdMemberSituationGatepostSelection,
            otherHouseholdSituations,
        };
        this.store.dispatch(
            ApplyNowPageActions.storeHouseholdsituationSelectionActions({
                applyNow: updatedApplyNow,
            })
        );
        /*  this.store.dispatch(
            ApplyNowPageActions.storeHouseholdsituationSelectionActions({
                householdMemberSituation: householdMemberSituationSelection,
            })
        ); */
    }
    mapwithOtherhouseHoldSituation(
        obj: HouseholdMemberSituationGatepostOptions
    ) {
        const householdObj = {
            ...(otherHouseholdSituation as HouseholdMemberSituationGatepostOptions),
        } as any;
        const ob = { ...obj } as any;
        Object.keys(householdObj as any).forEach((key: string) => {
            if ((key in ob) as any) {
                householdObj[key] = ob[key];
            }
        });
        return householdObj;
    }

    /*  updateBasicDetails(basicDetails: BasicDetails) {
        const updatedBasicDetail = { ...this.doIQualifyState, ...{ basicDetails } }

        this.store.dispatch(DoIQualifyPageActions.storeBasicDetails({ doIQualify: updatedBasicDetail }))
    } */

    updatedHouseHoldDetails(householdDetails: HouseholdDetails) {
        const updatedHouseHoldDetail = {
            ...this.applyNow,
            ...{ householdDetails },
        };

        this.store.dispatch(
            ApplyNowPageActions.storeHouseHoldDetails({
                applyNow: updatedHouseHoldDetail,
            })
        );
    }

    updateHouseHoldFacility(updatedHouseholdFacility: IHouseHoldDetails) {
        this.store.dispatch(
            ApplyNowPageActions.storeHouseholdFacility({
                houseHoldDetails: updatedHouseholdFacility,
            })
        );
    }
    //new added
    updateHouseHoldSNAPDetails(updatedHouseholdSNAPDetails: IHouseHoldDetails) {
        this.store.dispatch(
            ApplyNowPageActions.storeHouseholdDetails({
                houseHoldDetails: updatedHouseholdSNAPDetails,
            })
        );
    }

    updateHouseHoldCashAssistance(
        updatedHouseholdCashAssistance: IHouseHoldDetails
    ) {
        this.store.dispatch(
            ApplyNowPageActions.storeHouseholdDetails({
                houseHoldDetails: updatedHouseholdCashAssistance,
            })
        );
    }

    updateHouseHoldChildCareCost(
        updatedHouseholdChildCareCost: IHouseHoldDetails
    ) {
        this.store.dispatch(
            ApplyNowPageActions.storeHouseholdDetails({
                houseHoldDetails: updatedHouseholdChildCareCost,
            })
        );
    }

    updateHouseHoldSchoolMeals(updatedHouseholdSchoolMeals: IHouseHoldDetails) {
        this.store.dispatch(
            ApplyNowPageActions.storeHouseholdDetails({
                houseHoldDetails: updatedHouseholdSchoolMeals,
            })
        );
    }

    updateHouseHoldLongtermLivingServices(
        updatedHouseholdLongtermLivingServices: IHouseHoldDetails
    ) {
        this.store.dispatch(
            ApplyNowPageActions.storeHouseholdDetails({
                houseHoldDetails: updatedHouseholdLongtermLivingServices,
            })
        );
    }

    updateHouseHoldSNAPDisability(
        updatedHouseholdSNAPDisability: IHouseHoldDetails
    ) {
        this.store.dispatch(
            ApplyNowPageActions.storeHouseholdDetails({
                houseHoldDetails: updatedHouseholdSNAPDisability,
            })
        );
    }

    updateAbsentRelativeDetails(updatedAbsentRelative: IAbsentRelative) {
        this.store.dispatch(
            ApplyNowPageActions.storeAbsentRelativeDetails({
                absentRelative: updatedAbsentRelative,
            })
        );
    }
    //

    updateHouseHoldBenefitDetails(
        updatedHouseholdBenefitDetails: IHouseholdBenefitsDetails
    ) {
        this.store.dispatch(
            ApplyNowPageActions.storeHouseholdBenefitsDetails({
                houseHoldBenefitsDetails: updatedHouseholdBenefitDetails,
            })
        );
    }

    updateHouseholdServicesSelected(servicesSelected: string[]) {
        this.store.dispatch(
            ApplyNowPageActions.storeHouseholdServicesSelected({
                services: servicesSelected,
            })
        );
    }

    updateIndividualOwnesFines(
        whoHasBeenConvictedAFelony: IIndividualOwnesFines
    ) {
        this.store.dispatch(
            ApplyNowPageActions.storeIndividualOwnesFines({
                whoHasBeenConvictedAFelony: whoHasBeenConvictedAFelony,
            })
        );
    }

    updateIndividualConvictedWelfareFraud(
        whoWasConvictedForWelfareFraud: IIndividualConvictedWelfareFraud
    ) {
        this.store.dispatch(
            ApplyNowPageActions.storeIndividualConvictedWelfareFraud({
                whoWasConvictedForWelfareFraud: whoWasConvictedForWelfareFraud,
            })
        );
    }

    updateIndividualCurrentlyOnProbation(
        whoIsOnProbationOrParole: IIndividualCurrentlyOnProbation
    ) {
        this.store.dispatch(
            ApplyNowPageActions.storeIndividualCurrentlyOnProbation({
                whoIsOnProbationOrParole: whoIsOnProbationOrParole,
            })
        );
    }
    updateIndividualCurrentlyFleeing(
        whoIsCurrentlyFleeingFromLawEnforcementOfficials: IIndividualCurrentlyFleeing
    ) {
        this.store.dispatch(
            ApplyNowPageActions.storeIndividualCurrentlyFleeing({
                whoIsCurrentlyFleeingFromLawEnforcementOfficials:
                    whoIsCurrentlyFleeingFromLawEnforcementOfficials,
            })
        );
    }

    getAppData() {
        return this.store.select(getApplyNow);
    }

    // getResourcesAppData() {
    //     return this.store.select(getResourcesDetails)
    // }

    formStateUpdated(sender: RoutePath, state: MenuItemState) {
        const menu = this.utilService.getUpdatedMenu(
            this.applyNow.menu as MenuData,
            sender,
            state
        );
        const updatedApplyNow = { ...this.applyNow, menu } as IApplyNowState;
        this.store.dispatch(
            ApplyNowPageActions.updateMenuState({ applyNow: updatedApplyNow })
        );
    }
    setFormSubmitEvent(path: string) {
        ApplyNowStoreService.submitEvent.next(path);
    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach((field) => {
            //{2}
            const control = formGroup.get(field); //{3}
            if (control instanceof FormControl) {
                // console.log(control);
                //	this.isFieldValid(field)
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                //{5}
                this.validateAllFormFields(control); //{6}
            }
        });
    }
    isFieldValid(formGroup: FormGroup | any, formContolName: string) {
        return (
            formGroup.get(formContolName).status !== "VALID" &&
            (formGroup.get(formContolName).dirty ||
                formGroup.get(formContolName).touched)
        );
    }
    get getHouseHoldDetails() {
        return this.applyNow.houseHoldDetails ?? [];
    }
    get getProgramSelection() {
       return this.applyNow.programSelection?.programs ?? [];
     /*  return [
         INDIVIDUAL_PROGRAMS.HC,
         INDIVIDUAL_PROGRAMS.HA,
         INDIVIDUAL_PROGRAMS.CA,
         INDIVIDUAL_PROGRAMS.FS,
         INDIVIDUAL_PROGRAMS.FSR,
         INDIVIDUAL_PROGRAMS.CAR,
         INDIVIDUAL_PROGRAMS.CHR,
         INDIVIDUAL_PROGRAMS.ABR,
         INDIVIDUAL_PROGRAMS.BL,
         INDIVIDUAL_PROGRAMS.MAR,
         INDIVIDUAL_PROGRAMS.MCR,
         INDIVIDUAL_PROGRAMS.MI,
         INDIVIDUAL_PROGRAMS.CI,
         INDIVIDUAL_PROGRAMS.CIR,
         INDIVIDUAL_PROGRAMS.ES,
         INDIVIDUAL_PROGRAMS.ESR,
         INDIVIDUAL_PROGRAMS.FP,
         INDIVIDUAL_PROGRAMS.FPR,
         INDIVIDUAL_PROGRAMS.PE,
         INDIVIDUAL_PROGRAMS.ECA,
         INDIVIDUAL_PROGRAMS.WN,
         INDIVIDUAL_PROGRAMS.WNR,
         INDIVIDUAL_PROGRAMS.LI,
         INDIVIDUAL_PROGRAMS.LIR,
         INDIVIDUAL_PROGRAMS.LN,
         INDIVIDUAL_PROGRAMS.LNR,
         INDIVIDUAL_PROGRAMS.WAR,
         INDIVIDUAL_PROGRAMS.SMA,
         INDIVIDUAL_PROGRAMS.LW,
         INDIVIDUAL_PROGRAMS.LH,
       ];*/
    }
    get getAbsentRelatives() {
        return this.applyNow.houseHoldDetails.absentRelative ?? [];
    }

    get getResourceSelections() {
        return this.applyNow.resourceSelections?.resources ?? [];
    }

    extractUser(persons: any, userId: any) {
        const currentUser = persons.filter((person: any) => {

            return person.id && person.id.toString() === userId?.toString();

        })[0];
        return currentUser;
    }
    filterIndividualsBasedOnMap(map: any, householdPersons: IHouseHold[]) {
        // this.selectedData = Object.keys(
        //     this.applyNowState?.houseHoldDetails.pageAction.studentsMap
        // );

        return (
            householdPersons?.filter(
                (ind: any) =>
                    ind.id && Object.keys(map).indexOf(ind.id?.toString()) > -1
            ) || []
        );
    }
    getHouseholdDetails() {
        return this.applyNow.householdDetails?.householdDetails ?? [];
    }
    updatedGettingStarted(gettingStarted: any) {
        this.store.dispatch(
            ApplyNowPageActions.storeGettingStartedEnding({ gettingStarted })
        );
    }

    updatedVoterRegistrationDetails(voterRegistration: IVoterRegistrationState){
        this.store.dispatch(
            ApplyNowPageActions.storeVoterRegistration({ voterInfo: voterRegistration})
        );
    }
    storeHouseholdHasAnyoneReceivedSSDInThePast(
        householdHasAnyoneReceivedSSDInThePast: IHouseholdHasAnyoneReceivedSSDInThePast
    ) {
        this.store.dispatch(
            ApplyNowPageActions.storeHouseholdHasAnyoneReceivedSSDInThePast({
                householdHasAnyoneReceivedSSDInThePast:
                    householdHasAnyoneReceivedSSDInThePast,
            })
        );
    }
    storeHouseholdHasAnyoneReceivedSSIInThePast(
        householdHasAnyoneReceivedSSIInThePast: IHouseholdHasAnyoneReceivedSSIInThePast
    ) {
        this.store.dispatch(
            ApplyNowPageActions.storeHouseholdHasAnyoneReceivedSSIInThePast({
                householdHasAnyoneReceivedSSIInThePast:
                    householdHasAnyoneReceivedSSIInThePast,
            })
        );
    }
    getHouseholdPersons() {
        return this.applyNow?.houseHoldDetails?.houseHoldPersons ?? [];
    }
    getHouseholdHasAnyoneReceivedSSIInThePast() {
        return this.applyNow.householdHasAnyoneReceivedSSIInThePast;
    }
    getHouseholdHasAnyoneReceivedSSDInThePast() {
        return this.applyNow.householdHasAnyoneReceivedSSDInThePast;
    }
    getAppliedBenefitsForIndividual(ind:IHouseHold) {
       let benefitsForIndividual = [];
        if(ind.id) {
          if (this.applyNow?.houseHoldDetails?.selectedForCashAssitance.indexOf(ind.id.toString())>-1) {
            benefitsForIndividual.push(INDIVIDUAL_PROGRAMS.CA)
          }
          if (this.applyNow?.houseHoldDetails?.selectedForChildCareCost.indexOf(ind.id.toString())>-1) {
            benefitsForIndividual.push(INDIVIDUAL_PROGRAMS.CI);
          }
          //HC age < 19 selected, HA age > 19 selected
          if (this.applyNow?.houseHoldDetails?.selectedForCoverage.indexOf(ind.id.toString())>-1 && Utility.getAge(ind.dateOfBirth) < 19) {
            benefitsForIndividual.push(INDIVIDUAL_PROGRAMS.HC);

          }
          if (this.applyNow?.houseHoldDetails?.selectedForCoverage.indexOf(ind.id.toString())>-1  && Utility.getAge(ind.dateOfBirth) >= 19) {
            benefitsForIndividual.push(INDIVIDUAL_PROGRAMS.HA);
          }
          if (this.applyNow?.houseHoldDetails?.selectedForSnapScreen.indexOf(ind.id.toString())>-1 &&  Utility.getAge(ind.dateOfBirth) < 60) {
              benefitsForIndividual.push(INDIVIDUAL_PROGRAMS.FS);
          }
          if (this.applyNow?.houseHoldDetails?.selectedForSnapScreen.indexOf(ind.id.toString())>-1 &&  Utility.getAge(ind.dateOfBirth) >= 60) {
              benefitsForIndividual.push(INDIVIDUAL_PROGRAMS.ES);
          }
          if (this.applyNow?.houseHoldDetails?.selectedForSchoolMeals.indexOf(ind.id.toString())>-1) {
              benefitsForIndividual.push(INDIVIDUAL_PROGRAMS.BL);
          }
            if (
                this.applyNow?.houseHoldDetails?.selectedForLongtermLivingServices.indexOf(
                    ind.id.toString()
                )>-1
            ) {
                benefitsForIndividual.push(INDIVIDUAL_PROGRAMS.LI);
            }

        }

     /* benefitsForIndividual = [
            INDIVIDUAL_PROGRAMS.FS,
            INDIVIDUAL_PROGRAMS.HC,
            INDIVIDUAL_PROGRAMS.BL,
            INDIVIDUAL_PROGRAMS.CHR,
            INDIVIDUAL_PROGRAMS.MAR,
            INDIVIDUAL_PROGRAMS.MCR,
            INDIVIDUAL_PROGRAMS.CA,
            INDIVIDUAL_PROGRAMS.CAR,
            INDIVIDUAL_PROGRAMS.FP,
            INDIVIDUAL_PROGRAMS.FPR,
            INDIVIDUAL_PROGRAMS.PE,
            INDIVIDUAL_PROGRAMS.MI,
            INDIVIDUAL_PROGRAMS.CI,
            INDIVIDUAL_PROGRAMS.CIR,
            INDIVIDUAL_PROGRAMS.ABR,
            INDIVIDUAL_PROGRAMS.LN,
            INDIVIDUAL_PROGRAMS.LI,
            INDIVIDUAL_PROGRAMS.WN,
            INDIVIDUAL_PROGRAMS.WNR,
        ];*/
    return benefitsForIndividual;
    }
    getBenefits() {
      //  console.log(this.applyNow.programSelection?.programs)
      return this.applyNow.programSelection?.programs;
      /*  return [
          INDIVIDUAL_PROGRAMS.HC,
          INDIVIDUAL_PROGRAMS.HA,
          INDIVIDUAL_PROGRAMS.CA,
          INDIVIDUAL_PROGRAMS.FS,
          INDIVIDUAL_PROGRAMS.FSR,
          INDIVIDUAL_PROGRAMS.CAR,
          INDIVIDUAL_PROGRAMS.CHR,
          INDIVIDUAL_PROGRAMS.ABR,
          INDIVIDUAL_PROGRAMS.BL,
          INDIVIDUAL_PROGRAMS.MAR,
          INDIVIDUAL_PROGRAMS.MCR,
          INDIVIDUAL_PROGRAMS.MI,
          INDIVIDUAL_PROGRAMS.CI,
          INDIVIDUAL_PROGRAMS.CIR,
          INDIVIDUAL_PROGRAMS.ES,
          INDIVIDUAL_PROGRAMS.ESR,
          INDIVIDUAL_PROGRAMS.FP,
          INDIVIDUAL_PROGRAMS.FPR,
          INDIVIDUAL_PROGRAMS.PE,
          INDIVIDUAL_PROGRAMS.ECA,
          INDIVIDUAL_PROGRAMS.WN,
          INDIVIDUAL_PROGRAMS.WNR,
          INDIVIDUAL_PROGRAMS.LI,
          INDIVIDUAL_PROGRAMS.LIR,
          INDIVIDUAL_PROGRAMS.LN,
          INDIVIDUAL_PROGRAMS.LNR,
          INDIVIDUAL_PROGRAMS.WAR,
          INDIVIDUAL_PROGRAMS.SMA,
          INDIVIDUAL_PROGRAMS.LW,
          INDIVIDUAL_PROGRAMS.LH,
        ]*/
    }
    areProgramsExist(
        selectedPrograms: string[],
        conditionalPrograms: string[]
    ) {
        if (selectedPrograms.length == 0) return false;

        return conditionalPrograms.some((value) => {
            return selectedPrograms.indexOf(value) !== -1;
        });
    }
    isProgramExist(arr: string[], program: string) {
        return arr.length == 0 ? false : arr.indexOf(program) >= 0;
    }
    getUncheckedPropertyOfIndividual(
        houseHoldPersons: IHouseHold[],
        selectedUserIds: number[],
        obj: any
    ) {
        let personIds = houseHoldPersons.map((person: any) =>
            parseInt(person.id)
        );

        const deletedIds = new Set(selectedUserIds);
        let deletedIdArr = [];
        for (let elem of personIds) {
            if (!deletedIds.has(elem)) {
                deletedIdArr.push(elem);
            }
        }
        let persons = [...houseHoldPersons] as any;
        if (deletedIdArr.length == 0) return [];

        deletedIdArr.forEach((id: any) => {
            const index = persons.findIndex((idx: any) => idx.id == id);
            if (index >= 0) {
                persons = persons.map((item: any, ind: any) =>
                    ind == index
                        ? {
                              ...item,
                              ...obj,
                          }
                        : { ...item }
                );
            }
        });

        return persons;
    }

    //Income
    //Income Gatepost
    updateIncomeGatepostSelections(
        incomeGatepostSelection: IncomeGatepostSelection
    ) {
        const updatedApplyNow = { ...this.applyNow, incomeGatepostSelection };
        this.store.dispatch(
            ApplyNowPageActions.storeIncomeGatepostSelections({
                applyNow: updatedApplyNow,
            })
        );
    }

    //Income FutureJob
    updateIncomeFutureJobSelected(selectedGateposts: string[]) {
        this.store.dispatch(
            ApplyNowPageActions.storeIncomeFutureJobSelected({
                gateposts: selectedGateposts,
            })
        );
    }

    //Income PastJob
    updateIncomePastJobSelected(selectedGateposts: string[]) {
        this.store.dispatch(
            ApplyNowPageActions.storeIncomePastJobSelected({
                gateposts: selectedGateposts,
            })
        );
    }
    updateFromSummary(fromSummary: IFromSummary) {
        this.store.dispatch(
            ApplyNowPageActions.storeIsFromSummary({ fromSummary: fromSummary })
        );
    }
    updateMAProviderInfo(maProviderInfo: any) {
        this.store.dispatch(
            ApplyNowPageActions.storeMAProviderInfo({ maProviderInfo })
        );
    }
    getFromSummaryData() {
        return this.applyNow.fromSummary;
    }
    get getproviderInfoFromState() {
        return this.applyNow;
    }

    get getVoterInfoFromState(){
        return this.applyNow;

    }

    checkPropertyForString(isString: string) {
        const checkProperty = JSON.stringify(SaveContract);
        if(checkProperty.indexOf(isString) > -1) {
            let objKey = checkProperty[checkProperty.search(isString) + isString.length + 3] === "s" &&
            checkProperty[checkProperty.search(isString) + isString.length + 4] === "t" &&
            checkProperty[checkProperty.search(isString) + isString.length + 5] === "r" &&
            checkProperty[checkProperty.search(isString) + isString.length + 6] === "i" &&
            checkProperty[checkProperty.search(isString) + isString.length + 7] === "n" &&
            checkProperty[checkProperty.search(isString) + isString.length + 8] === "g";
            return objKey
        }
        return false;
    }

    //Get Household Contracts
    getHouseholdContracts() {
        return {
            applicantAddress: this.getHouseHoldDetails.Household.applicantAddress,
        currentLivingSituation: this.getHouseHoldDetails.livSituation,
        currentHousingSituation: this.getHouseHoldDetails.houSituation,
        otherCurrentHousingSituation: this.getHouseHoldDetails.othHouSituation,
        electricityProviderInformation: {
            "electricityProviderName": this.getHouseHoldDetails.householdElectricProvider.electricCompany === "" ? null : this.getHouseHoldDetails.householdElectricProvider.electricCompany,
            "accountNumberWithElectricityProvider": this.getHouseHoldDetails.householdElectricProvider.acconumber,
        },
        appliedBenefitsWithDifferentNameOrSSN: this.getApplyNow.gettingStartedResponse?.household?.appliedBenefitsWithDifferentNameOrSSN?.charAt(0) || 'N',
        doYouReceiveUtilityAllowanceCheck: this.getApplyNow.gettingStartedResponse?.household?.doYouReceiveUtilityAllowanceCheck?.charAt(0),
        howMuchAllowanceCheck: this.getApplyNow.gettingStartedResponse?.household?.howMuchAllowanceCheck,
        disqualifiedForAssistance: this.getApplyNow.gettingStartedResponse?.household?.disqualifiedForAssistance?.charAt(0),
        foodStamps: this.getApplyNow.gettingStartedResponse?.household?.foodStamps,
        "foodStampRepresentativeInformation":{
            "foodStampsRepresentativeAvailable": null,
            "foodStampRepresentativeName": this.applyNow.houseHoldDetails.householdFoodStamps.name,
            "socialSecurityNumber": this.applyNow.houseHoldDetails.householdFoodStamps.ssn,
            "foodStampRepresentativeAddress": {
                "addressLine1": this.applyNow.houseHoldDetails.householdFoodStamps.address,
                "addressline2": this.applyNow.houseHoldDetails.householdFoodStamps.address2,
                "city": this.applyNow.houseHoldDetails.householdFoodStamps.city,
                "state": this.applyNow.houseHoldDetails.householdFoodStamps.state === "" ? null : this.applyNow.houseHoldDetails.householdFoodStamps.state,
                "zip": this.applyNow.houseHoldDetails.householdFoodStamps.zip,
                "zipExtension": "",
                "county": "04",
                "isThisAddressEffectiveImmediately": true,
                "addressEffectiveDate": "",
            },
            "phoneNumber": "string"

        },
        "additionalInformation": this.getApplyNow.gettingStartedResponse?.household.additionalInformation,
        "additionalDetails": this.getApplyNow.gettingStartedResponse?.additionalDetails,
        "fromHowManyYearsAtThisAddress": this.applyNow.houseHoldDetails.Household.fromHowManyYearsAtThisAddress,
        "fromHowManyMonthsAtThisAddress": this.applyNow.houseHoldDetails.Household.fromHowManyMonthsAtThisAddress,
        "mainContactNumber": {
            "phoneNumber": this.applyNow.houseHoldDetails.householdContactInfo.mainContact,
            "isMobileNumber": this.applyNow.houseHoldDetails.householdContactInfo.mainContactRad === "Y",
        },
        "secondContactNumber": {
            "phoneNumber": this.applyNow.houseHoldDetails.householdContactInfo.secContact,
            "isMobileNumber": this.applyNow.houseHoldDetails.householdContactInfo.secContactRad === "Y",
        },
        "otherContactNumber": {
            "phoneNumber": this.applyNow.houseHoldDetails.householdContactInfo.othContact,
            "isMobileNumber": this.applyNow.houseHoldDetails.householdContactInfo.othContactRad === "Y",
        },
        "waterInformation": {
            "isDrinkingWaterIncludedInRent": this.applyNow.houseHoldDetails.householdWaterQuestions.waterRent ==="Y" ? true : false,
            "isWasteWaterIncludedInRent": this.applyNow.houseHoldDetails.householdWaterQuestions.wasteRent ==="Y" ? true : false,
            "whatWaterSourceToBePaid": this.applyNow.houseHoldDetails.householdWaterQuestions.payingForDrinkingWater,
        },
        "emailAddress": this.applyNow.houseHoldDetails.householdContactInfo.email,
        "bestTimeToCall": "",
        "howToContact": this.applyNow.houseHoldDetails.householdContactInfo.contact,
        "previousPhoneNumber": "",
        "previousAddress": { ...this.applyNow.houseHoldDetails.householdPreviousAddress, "zipExtension": "string", "isThisAddressEffectiveImmediately": true, "addressEffectiveDate": "string" },
        "numberOfYearsInPA": this.applyNow.houseHoldDetails.householdLivedInPA.years,
        "numberOfMonthsInPA": this.applyNow.houseHoldDetails.householdLivedInPA.months,
        "haveYouReceivedBenefitsInPA": this.getApplyNow.gettingStartedResponse?.household.haveYouReceivedBenefitsInPA?.charAt(0),
        "previousCaseRecordNumber": this.getApplyNow.gettingStartedResponse?.household.previousCaseRecordNumber,
        "previousBenefitsInformation": this.getApplyNow.gettingStartedResponse?.household.previousBenefitsInformation,
        "mailingAddress": {
            "addressLine1": this.applyNow.houseHoldDetails.Household.mailingAddress?.addressLine1,
            "addressline2": this.applyNow.houseHoldDetails.Household.mailingAddress?.addressLine2,
            "city": this.applyNow.houseHoldDetails.Household.mailingAddress?.city,
            "state": "PA",
            "zip": this.applyNow.houseHoldDetails.Household.mailingAddress?.zip,
            "zipExtension": this.applyNow.houseHoldDetails.Household.mailingAddress?.zipExtension,
            "county": "03",
            "isThisAddressEffectiveImmediately": this.applyNow.houseHoldDetails.Household.mailingAddress?.isThisAddressEffectiveImmediately,
            "addressEffectiveDate": this.applyNow.houseHoldDetails.Household.mailingAddress?.addressEffectiveDate
        },


        "doYouPreferSeperateMailingAddress": this.getHouseHoldDetails.Household.doYouPreferSeperateMailingAddress?.charAt(0),
        "isEveryoneApplyingForLI": this.getApplyNow.gettingStartedResponse?.household.isEveryoneApplyingForLI,
        "nursingHomeInformation": {
            "previouslyLivedInNursingFacility": null,
            "nursingFacilityName": "",
            "address": {
                "addressLine1": this.applyNow.houseHoldDetails.nursingFacility.NursingFacilityDetails?.AddressLine1,
                "addressline2": this.applyNow.houseHoldDetails.nursingFacility.NursingFacilityDetails?.AddressLine2,
                "city": this.applyNow.houseHoldDetails.nursingFacility.NursingFacilityDetails?.City,
                "state": this.applyNow.houseHoldDetails.nursingFacility.NursingFacilityDetails?.State,
                "zip": this.applyNow.houseHoldDetails.nursingFacility.NursingFacilityDetails?.Zip,
                "zipExtension": "",
                "county": "05",
                "isThisAddressEffectiveImmediately": true,
                "addressEffectiveDate": ""
            },
            "nursingFacilityStartDate": this.applyNow.houseHoldDetails.nursingFacility.NursingFacilityDetails?.nursingFacilityStartDate,
            "nursingFacilityEndDate": this.applyNow.houseHoldDetails.nursingFacility.NursingFacilityDetails?.nursingFacilityEndDate,
        },
        "whoHasBeenConvictedAFelony": this.getApplyNow.gettingStartedResponse?.household.whoHasBeenConvictedAFelony,
        "whoWasConvictedForWelfareFraud": this.getApplyNow.gettingStartedResponse?.household.whoWasConvictedForWelfareFraud,
        "whoIsOnProbationOrParole": this.getApplyNow.gettingStartedResponse?.household.whoIsOnProbationOrParole,
        "whoIsCurrentlyFleeingFromLawEnforcementOfficials": this.getApplyNow.gettingStartedResponse?.household.WhoIsCurrentlyFleeingFromLawEnforcementOfficials,
        "isAnyoneCurrentlyIncarcerated": this.getApplyNow.gettingStartedResponse?.household.isAnyoneCurrentlyIncarcerated?.charAt(0),
        "resources": {
            anyoneHaveCash: null,
            anyoneBuyingNonResidentProperty: null,
            anyoneOwnAHome: null,
            anyoneExpectingAnyResources: null,
            anyOwnORBuyingVehicle: null,
            anyoneOwnBurialSpaceORPlot: null,
            anyoneHaveBurialORTrustAgreementWithBankORFuneralHome: null,
            hasMemberSoldTransferedProperty: null,
            anyoneHaveLifeInsurancePolicy: null,
            hasMemberReceivedLongTermCare: null,
        },
        "income": this.getApplyNow.gettingStartedResponse?.household.income,
        expenses: this.getApplyNow.gettingStartedResponse?.household.expenses,

        }
    }

    /*   getabsentRelative() {


           // return this.doIQualifyState.basicDetails?.basicDetails ?? [];


        return this.applyNow.houseHoldDetails.absentRelative[0]?.firstName?? [];
    } */
}
    const otherHouseholdSituation = {

        isLess150BeforeTaxesAreTakenOut: false,
        isLessEqual100InCashCheckingSaving: false,
        isUtilityMoreThanAsset: false,
        isReceivingUtilityAllowanceCheck: false,
        isParentNotLiveOrDiedFor21OrYounger: false,
        isSpouseDiedOrNotLivingInTheHouse: false,
        isNeedChildSupportOrHealthInsurance: false,
        hasLivedInNursingFacility: false,
        isLivingInCertifiedShelter: false,
        isLostJobReducedHoursWithNoFaultInLastYr: false,
        isDisbledBlindIllOrNeedtoOvercomeDrugOrAlcohol: false,
        isReceivingTreatmentForDrugOrAlcohol: false
    }
