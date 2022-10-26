import { ChangeDetectionStrategy, Component, DebugElement, EventEmitter, Input, ChangeDetectorRef, OnDestroy, OnInit, Output, } from '@angular/core';
import { MenuItemState } from '../../../shared/menu-item-state';
import { IApplyNowState } from '../../+state/apply-now.models';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { RoutePath } from '../../../shared/route-strategies';
import { HouseholdFormDataService } from '../services/household-form-data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IHouseHold } from '../../household/household-model';
import { HouseholdDetails, HouseholdMemberSituationGatepost, HouseholdMemberSituationGatepostOptions, PageQueue, Programs, ProgramSelection } from '../../+state/apply-now.models';
import { FormArray, FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ApplyNowHouseHoldMemberSituationGatepostStrategy } from '../../../shared/route-strategies/apply-now/householdMemberSituationGatepost';
import { UtilService } from '../../../shared/services/util.service';
import { ScreenQueueUtil, ScreenQueueRouteNameApplyNowHouseholdMemberSituation } from '../../../shared/services/screen_queue_util.service';

@Component({
  selector: 'compass-ui-household-member-situation-gatepost',
  templateUrl: './household-member-situation-gatepost.component.html',
  styleUrls: ['./household-member-situation-gatepost.component.scss'],
  providers: [ApplyNowHouseHoldMemberSituationGatepostStrategy]
})

export class HouseholdMemberSituationGatepostComponent implements OnInit {
  pageQueue!: PageQueue;
  public form!: FormGroup;
  householdDetails!: IHouseHold[];
  householdhead!: IHouseHold;
  householdPersons: IHouseHold[] = [];
  householdMembers: any[] = [];
  selectedValues!: any[];
  isValidated!: boolean;
  isDisabled = false;
  sevicesselected: any[] = [];
  householdMemberSituationGatepostForm!: FormGroup | any;
  benefits!: string[];
  applyNowState!: IApplyNowState;
  selectedOptions!: HouseholdMemberSituationGatepostOptions | null
  error: string = "A selection is required."
  showRequired = false;

  showReceivingUtilityAllowanceCheckRequired = false;
  showParentNotLiveOrDiedFor21OrYoungerRequired = false;
  showSpouseDiedOrNotLivingInTheHouseRequired = false;
  showNeedChildSupportOrHealthInsuranceRequired = false;
  showLivedInNursingFacilityRequired = false;
  showDisbledBlindIllOrNeedtoOvercomeDrugOrAlcoholRequired = false;
  showReceivingTreatmentForDrugOrAlcoholRequired = false;

  public householdMemberSituations: HouseholdMemberSituationGatepostOptions | any = {
    isLess150BeforeTaxesAreTakenOut: null,
    isLessEqual100InCashCheckingSaving: null,
    isUtilityMoreThanAsset: null,
    isReceivingUtilityAllowanceCheck: null,
    isParentNotLiveOrDiedFor21OrYounger: null,
    isSpouseDiedOrNotLivingInTheHouse: null,
    isNeedChildSupportOrHealthInsurance: null,
    hasLivedInNursingFacility: null,
    isLivingInCertifiedShelter: null,
    isLostJobReducedHoursWithNoFaultInLastYr: null,
    isDisbledBlindIllOrNeedtoOvercomeDrugOrAlcohol: null,
    isReceivingTreatmentForDrugOrAlcohol: null
  };
  visibleHouseHoldOption = {
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
  constructor(private fb: FormBuilder, private utilService: UtilService,
    private router: Router, private storeService: ApplyNowStoreService, private cd: ChangeDetectorRef,
    private routingStrategy: ApplyNowHouseHoldMemberSituationGatepostStrategy,
    private queueService: ScreenQueueUtil) {
    this.householdMemberSituationGatepostForm = this.fb.group({
      situation: this.fb.array([], [Validators.required])
    });
    this.selectedOptions = this.storeService.getSelectedhouseholdValue ?? null;
    this.benefits = this.storeService.getProgramSelection;
    //this.benefits =[Programs.ES, Programs.FS, Programs.CA];
    //this.benefits =["CA","HS", "FS", "BL","LH","CI","HA","ES","CAR","ECA","LHP","LN","LI","WN","WNR","HC","MAR","MCR","MI"]
    this.householdMemberSituations = (this.selectedOptions == null) ? { ...this.householdMemberSituations } : this.selectedOptions;
  }
  get situations(): FormArray {
    return <FormArray>this.householdMemberSituationGatepostForm.controls['situation'];
  }

  ngOnInit(): void {
    this.storeService.getAppData().subscribe((d) => {
      this.applyNowState = { ...d };
      this.sevicesselected = [...this.applyNowState?.programSelection?.programs ?? []];
    })

    this.householdDetails = this.storeService?.getHouseholdDetails() ?? [];

    this.selectedValues = this.queueService.initializeSelection(this.selectedOptions);
    this.setControlsFromState();
    this.setOptionForProgramRequiredCheck();
    this.isValidated = this.situations.valid ? true : false;
    this.householdMemberSituationGatepostForm.valueChanges.subscribe((d: any) => {
      this.isValidated = this.situations.valid ? true : false;

    });
    //this.isDisabled = this.isRadiobuttonDisable()
    //this.storeService.formStateUpdated(RoutePath.DOIQUALIFY_OTHERHOUSEHOLDSITUATIONS, MenuItemState.INPROGRESS)
  }
  setControlsFromState() {

    const entries = Object.entries(this.householdMemberSituations);
    for (const [key, value] of entries) {
      if (value != null) {
        this.situations.push(new FormControl(value));
      }
    }

  }
  setOptionForProgramRequiredCheck() {
    const entries = Object.entries(this.visibleHouseHoldOption);
    let obj = { ...this.visibleHouseHoldOption } as any
    for (const [key, value] of entries) {
      obj[key] = this.isRequiredProgramSelected(key);
    }
    this.visibleHouseHoldOption = { ...obj };
  }
  resetRadioButton(value: any) {

    let id = this.getIndex(value)
    if (id > -1) {
      this.situations.removeAt(id);
    }
    if (this.householdMemberSituations[value] == null) return;
    const newSituations: HouseholdMemberSituationGatepost | any = { ...this.householdMemberSituations }
    newSituations[value] = null;
    this.householdMemberSituations = { ...newSituations };

    this.selectedValues = this.selectedValues == null ? [] : this.selectedValues;
    this.selectedValues = this.selectedValues.filter((val) => val != value)

    let id1 = this.getIndex(value) as any
    if (id1 == -1) this.situations.push(new FormControl(value))
    this.isDisabled = false;
  }

  onRadioChecked(value: any, isChecked: boolean, event: any) {
    const newSituations: HouseholdMemberSituationGatepost | any = { ...this.householdMemberSituations }
    newSituations[value] = isChecked;
    this.householdMemberSituations = { ...newSituations };
    if ((value == "noneOfAbove" as any)) {
      this.selectedValues = [];
      this.situations.clear()
      this.situations.push(new FormControl("noneOfAbove"));
      this.uncheckAll(isChecked);
      // this.isDisabled=true;
      return;
    }

    this.selectedValues = this.selectedValues == null ? [] : this.selectedValues;
    if (isChecked) this.selectedValues.push(value as any)
    else this.selectedValues = this.selectedValues.filter((val) => val != value)

    let id = this.getIndex(value) as any
    if (id == -1) this.situations.push(new FormControl(value))
    this.isDisabled = false;
  }
  isRadiobuttonDisable() {
    return this.householdMemberSituations.noneOfAbove != null ? true : false
  }

  initPathArray() {
    let arr = this.selectedValues == null ? [] : this.selectedValues;
    //if (arr.length == 0) return;
    this.composeConditionalPath(arr);
    this.queueService.initDynamicRoutes(arr, RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSUMMARY);
  }

  isFieldValid(): boolean {
    return this.storeService.isFieldValid(this.householdMemberSituationGatepostForm, 'situation')
  }

  composeConditionalPath(arr: any[]) {

    /* if (this.isFosterCare()) {
      arr.push(ScreenQueueRouteNameApplyNowHouseholdMemberSituation.isInFosterCare)
    } */
  }


  uncheckAll(noneofAboveRadioValue: boolean) {

    const copyOfOtherhouseHoldSituation = { ...this.householdMemberSituations }
    Object.keys(copyOfOtherhouseHoldSituation).forEach(key => {
      //alert(copyOfOtherhouseHoldSituation[key] + 'key');
      copyOfOtherhouseHoldSituation[key] = null;

    });
    copyOfOtherhouseHoldSituation["noneOfAbove"] = noneofAboveRadioValue;
    this.householdMemberSituations = { ...copyOfOtherhouseHoldSituation }
  }


  getIndex(value: any): number {
    return this.situations.controls.findIndex((val: any) => val.value == value);
  }

  isLess$150() {
    const programs = [Programs.ES, Programs.FS]
    return this.areProgramsExist(this.benefits, programs)

  }

  isLessEqual100InCashCheckingSaving() {
    const programs = [Programs.ES, Programs.FS]
    return this.areProgramsExist(this.benefits, programs)
  }

  isYoungerThanTwentyOne() {

    const programs = [Programs.CA, Programs.CAR, Programs.ECA]
    return this.areProgramsExist(this.benefits, programs)

  }

  isUtilityMoreThanAsset() {

    const programs = [Programs.FS, Programs.ES]
    return this.areProgramsExist(this.benefits, programs)

  }

  isReceivingUtilityAllowanceCheck() {

    const programs = [Programs.LH, Programs.LHP]
    return this.areProgramsExist(this.benefits, programs)
  }

  isSpouseDiedOrNotLivingInTheHouse() {

    const programs = [Programs.CA, Programs.CAR, Programs.ECA]
    return this.areProgramsExist(this.benefits, programs)
  }

  isNeedChildSupportOrHealthInsurance() {
    const programs = [Programs.CA, Programs.CAR, Programs.ECA]
    return this.areProgramsExist(this.benefits, programs)
  }
  hasLivedInNursingFacility() {

    const programs = [Programs.LN, Programs.LI, Programs.WN, Programs.WNR]
    return this.areProgramsExist(this.benefits, programs)
  }

  isLivingInCertifiedShelter() {

    const programs = [Programs.FS, Programs.ES]
    return this.areProgramsExist(this.benefits, programs)
  }

  isLostJobReducedHoursWithNoFaultInLastYr() {

    const programs = [Programs.HC, Programs.HA, Programs.MAR, Programs.MCR, Programs.CA, Programs.CAR, Programs.ECA]
    return this.areProgramsExist(this.benefits, programs)
  }
  isDisbledBlindIllOrNeedtoOvercomeDrugOrAlcohol() {
    const programs = [Programs.CA, Programs.CAR]
    return this.areProgramsExist(this.benefits, programs)
  }
  isReceivingTreatmentForDrugOrAlcohol() {
    const programs = [Programs.CA, Programs.CAR, Programs.MI]
    return this.areProgramsExist(this.benefits, programs)
  }

  isRequiredProgramSelected(property: string) {

    let obj = { ...this.householdMemberSituations } as any
    let isExist = true;
    switch (property) {
      case "isLess150BeforeTaxesAreTakenOut":
        isExist = this.isLess$150();
        break;
      case "isLessEqual100InCashCheckingSaving":
        isExist = this.isLessEqual100InCashCheckingSaving();
        break;

      case "isUtilityMoreThanAsset":
        isExist = this.isUtilityMoreThanAsset();
        break;

      case "isReceivingUtilityAllowanceCheck":
        isExist = this.isReceivingUtilityAllowanceCheck();
        break;

      case "isParentNotLiveOrDiedFor21OrYounger":
        isExist = this.isYoungerThanTwentyOne();
        break;
      case "isSpouseDiedOrNotLivingInTheHouse":
        isExist = this.isSpouseDiedOrNotLivingInTheHouse();
        break;
      case "isNeedChildSupportOrHealthInsurance":
        isExist = this.isNeedChildSupportOrHealthInsurance();
        break;
      case "hasLivedInNursingFacility":
        isExist = this.hasLivedInNursingFacility();
        break;
      case "isLivingInCertifiedShelter":
        isExist = this.isLivingInCertifiedShelter();
        break;
      case "isLostJobReducedHoursWithNoFaultInLastYr":
        isExist = this.isLostJobReducedHoursWithNoFaultInLastYr();
        break;
      case "isDisbledBlindIllOrNeedtoOvercomeDrugOrAlcohol":
        isExist = this.isDisbledBlindIllOrNeedtoOvercomeDrugOrAlcohol();
        break;
      case "isReceivingTreatmentForDrugOrAlcohol":
        isExist = this.isReceivingTreatmentForDrugOrAlcohol();
        break;
    }

    if (!isExist) {
      obj[property] = null;
      if (this.selectedValues.length > 0) {
        this.selectedValues = this.selectedValues.filter(val => val !== property);
      }
      const index = this.getIndex(property);
      if (index >= 0) this.situations.removeAt(index);
      this.householdMemberSituations = { ...obj } as HouseholdMemberSituationGatepostOptions;
    }
    return isExist;
  }

  areProgramsExist(selectedPrograms: string[], conditionalPrograms: string[]) {
    if (selectedPrograms.length == 0) return false;
    return conditionalPrograms.some(value => {
      return selectedPrograms.indexOf(value) !== -1;
    });
  }

  isProgramExist(arr: string[], program: string) {
    return (arr.length == 0) ? false : arr.indexOf(program) >= 0;
  }

  back() {
    if (this.sevicesselected.indexOf(Programs.LH) > -1 && this.sevicesselected.indexOf(Programs.LW) > -1) {
      this.router.navigate([RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDWATERQUES])
    } else if (this.sevicesselected.indexOf(Programs.LH) > -1) {
      this.router.navigate([RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDELECTRICPROVIDER])
    }
    else if (this.sevicesselected.indexOf(Programs.HC) > -1) {
      this.router.navigate([
        RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_HOUSEHOLD +
            "/" +
            RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDCONTACTINFO,
      ]);
    }
    else {
      this.queueService.back();
      const x = sessionStorage.getItem("routingPath");
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + x]);
    }
  }

  next() {
    // var x = "householdMemberSituationGatepost";
    // sessionStorage.setItem("routingPath", x);

    var y = "householdMemberSituationGatepost";
    sessionStorage.setItem("routingPathEnd", y);

    if (this.visibleHouseHoldOption.isReceivingUtilityAllowanceCheck) {
      this.showReceivingUtilityAllowanceCheckRequired = true;
    }
    else {
      this.showReceivingUtilityAllowanceCheckRequired = false;
    }
    if (this.visibleHouseHoldOption.isParentNotLiveOrDiedFor21OrYounger) {
      this.showParentNotLiveOrDiedFor21OrYoungerRequired = true;
    }
    else {
      this.showParentNotLiveOrDiedFor21OrYoungerRequired = false;
    }
    if (this.visibleHouseHoldOption.isSpouseDiedOrNotLivingInTheHouse) {
      this.showSpouseDiedOrNotLivingInTheHouseRequired = true;
    }
    else {
      this.showSpouseDiedOrNotLivingInTheHouseRequired = false;
    }
    if (this.visibleHouseHoldOption.isNeedChildSupportOrHealthInsurance) {
      this.showNeedChildSupportOrHealthInsuranceRequired = true;
    }
    else {
      this.showNeedChildSupportOrHealthInsuranceRequired = false;
    }
    if (this.visibleHouseHoldOption.hasLivedInNursingFacility) {
      this.showLivedInNursingFacilityRequired = true;
    }
    else {
      this.showLivedInNursingFacilityRequired = false;
    }
    if (this.visibleHouseHoldOption.isDisbledBlindIllOrNeedtoOvercomeDrugOrAlcohol) {
      this.showDisbledBlindIllOrNeedtoOvercomeDrugOrAlcoholRequired = true;
    }
    else {
      this.showDisbledBlindIllOrNeedtoOvercomeDrugOrAlcoholRequired = false;
    }
    if (this.visibleHouseHoldOption.isReceivingTreatmentForDrugOrAlcohol) {
      this.showReceivingTreatmentForDrugOrAlcoholRequired = true;
    }
    else {
      this.showReceivingTreatmentForDrugOrAlcoholRequired = false;
    }

    this.showRequired = (this.showReceivingUtilityAllowanceCheckRequired && this.householdMemberSituations.isReceivingUtilityAllowanceCheck == null) ||
                        (this.showParentNotLiveOrDiedFor21OrYoungerRequired && this.householdMemberSituations.isParentNotLiveOrDiedFor21OrYounger == null ) ||
                        (this.showSpouseDiedOrNotLivingInTheHouseRequired && this.householdMemberSituations.isSpouseDiedOrNotLivingInTheHouse == null) ||
                        (this.showNeedChildSupportOrHealthInsuranceRequired && this.householdMemberSituations.isNeedChildSupportOrHealthInsurance == null ) ||
                        (this.showLivedInNursingFacilityRequired && this.householdMemberSituations.hasLivedInNursingFacility == null ) ||
                        (this.showDisbledBlindIllOrNeedtoOvercomeDrugOrAlcoholRequired && this.householdMemberSituations.isDisbledBlindIllOrNeedtoOvercomeDrugOrAlcohol == null) ||
                        (this.showReceivingTreatmentForDrugOrAlcoholRequired && this.householdMemberSituations.isReceivingTreatmentForDrugOrAlcohol == null)

    this.householdMemberSituationGatepostForm.markAllAsTouched();
    if (this.showRequired) return;
    this.initPathArray();
    this.removeStateForUncheckedOption(this.selectedValues)
    this.storeService.houseHoldSituationsOptionUpdated(this.householdMemberSituations as HouseholdMemberSituationGatepostOptions);
    this.storeService.updatedHouseHoldDetails({ householdDetails: this.householdDetails } as HouseholdDetails)

      this.queueService.navigateToPath();
  }

  removeStateForUncheckedOption(arr: string[]) {
    const householdDetailsProperty = [ScreenQueueRouteNameApplyNowHouseholdMemberSituation.isLess150BeforeTaxesAreTakenOut, ScreenQueueRouteNameApplyNowHouseholdMemberSituation.isLessEqual100InCashCheckingSaving, ScreenQueueRouteNameApplyNowHouseholdMemberSituation.isNeedChildSupportOrHealthInsurance, ScreenQueueRouteNameApplyNowHouseholdMemberSituation, ScreenQueueRouteNameApplyNowHouseholdMemberSituation.hasLivedInNursingFacility, ScreenQueueRouteNameApplyNowHouseholdMemberSituation.isUtilityMoreThanAsset,
    ScreenQueueRouteNameApplyNowHouseholdMemberSituation.isUtilityMoreThanAsset, ScreenQueueRouteNameApplyNowHouseholdMemberSituation.isUtilityMoreThanAsset, ScreenQueueRouteNameApplyNowHouseholdMemberSituation.isSpouseDiedOrNotLivingInTheHouse, ScreenQueueRouteNameApplyNowHouseholdMemberSituation.isNeedChildSupportOrHealthInsurance, ScreenQueueRouteNameApplyNowHouseholdMemberSituation, ScreenQueueRouteNameApplyNowHouseholdMemberSituation.hasLivedInNursingFacility, ScreenQueueRouteNameApplyNowHouseholdMemberSituation.isLivingInCertifiedShelter,
    ScreenQueueRouteNameApplyNowHouseholdMemberSituation.isLostJobReducedHoursWithNoFaultInLastYr, ScreenQueueRouteNameApplyNowHouseholdMemberSituation.isDisbledBlindIllOrNeedtoOvercomeDrugOrAlcohol, ScreenQueueRouteNameApplyNowHouseholdMemberSituation.isReceivingTreatmentForDrugOrAlcohol
    ]
    /*   const otherHouseholdSituationsProperties = [
        ScreenQueueRouteNameApplyNowHouseholdMemberSituation.isLess150BeforeTaxesAreTakenOut
      ] as any
      householdDetailsProperty.forEach((property) => {
        if (arr.indexOf(property) < 0) {
          const obj = this.getProperties(property);
          this.removeStateFromMembersDetail(obj)
        }
      }) */
    /*   otherHouseholdSituationsProperties.forEach((proprty: any) => {
        if (arr.indexOf(proprty) < 0) {
          const obj = this.getProperties(proprty);
          this.removeStateFromHouseHoldMemberSituationGatepost(obj);
        }
      }) */
  }
  /*  getProperties(property: string) {
     switch (property) {
       case ScreenQueueRouteNameApplyNowHouseholdMemberSituation.isLess150BeforeTaxesAreTakenOut:
         return {
         }
       case ScreenQueueRouteNameApplyNowHouseholdMemberSituation.isLessEqual100InCashCheckingSaving:
         return {
         }
       case ScreenQueueRouteNameApplyNowHouseholdMemberSituation.isUtilityMoreThanAsset:
         return {
         }
       case ScreenQueueRouteNameApplyNowHouseholdMemberSituation.isReceivingUtilityAllowanceCheck:
         return {
         }
       case ScreenQueueRouteNameApplyNowHouseholdMemberSituation.isParentNotLiveOrDiedFor21OrYounger:
         return {
         }
       case ScreenQueueRouteNameApplyNowHouseholdMemberSituation.isSpouseDiedOrNotLivingInTheHouse:
         return {
         }
       case ScreenQueueRouteNameApplyNowHouseholdMemberSituation.isNeedChildSupportOrHealthInsurance:
         return {
         }
       case ScreenQueueRouteNameApplyNowHouseholdMemberSituation.hasLivedInNursingFacility:
        return {
         }
       case ScreenQueueRouteNameApplyNowHouseholdMemberSituation.isLivingInCertifiedShelter:
        return {
         }
       case ScreenQueueRouteNameApplyNowHouseholdMemberSituation.isLostJobReducedHoursWithNoFaultInLastYr:
        return {
         }
       case ScreenQueueRouteNameApplyNowHouseholdMemberSituation.isDisbledBlindIllOrNeedtoOvercomeDrugOrAlcohol:
         return {
         }
       case ScreenQueueRouteNameApplyNowHouseholdMemberSituation.isReceivingTreatmentForDrugOrAlcohol:
         return {
         }
     }
     return {};
   }
  */
  removeStateFromMembersDetail(obj: {}) {
    if (this.householdMembers.length > 0 && !this.utilService.isEmptyObject(obj)) {
      const copyOfItems = this.householdMembers.map(
        detail => ({ ...detail, ...obj })
      ); //
      this.householdMembers = copyOfItems;
    }
  }

  removeStateFromHouseHoldMemberSituationGatepost(obj: {}) {
    if (!this.utilService.isEmptyObject(obj)) {
      const copyOfOtherhouseHoldSituation = { ...this.householdMemberSituations, ...obj }
      this.householdMemberSituations = { ...copyOfOtherhouseHoldSituation };
    }
  }

}

