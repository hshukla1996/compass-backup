import { ChangeDetectorRef, Injectable, OnDestroy, } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MenuData } from '@compass-ui/data';
import { getDoIQualify, getHouseholdValue } from './+state/do-i-qualify.selectors';
import * as menu from './menu';
import { BasicDetails, DoIQualifyState, OtherHouseholdSituations, PageAction, ProgramSelection, TotalHouseHoldValue, OtherHouseholdSituationsOptions, YesNoValues, MaleFemaleRelationship,  } from './+state/do-i-qualify.models';
import { MenuItemState } from '../shared/menu-item-state';
import { RoutePath } from '../shared/route-strategies';
import { UtilService } from '../shared/services/util.service';
import { Store } from '@ngrx/store';
import { State } from '../+state';
import { DoIQualifyPageActions } from './+state/actions';
import { BehaviorSubject } from 'rxjs';

import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {clearDoIQualify} from "./+state/actions/do-i-qualify-page.actions";
import { Utility } from '../shared/utilities/Utility';
@Injectable({
    providedIn: 'root',
})
export class DoIQualifyStoreService implements OnDestroy {
    routePath: typeof RoutePath = RoutePath;
    doIQualifyState!: DoIQualifyState;
    doIQualifyState$!: Observable<DoIQualifyState | null>;
    private subscription!: Subscription
    private cd!: ChangeDetectorRef
    data: any;
    menuData: MenuData = menu.menuData;
    static submitEvent = new BehaviorSubject<string>("");
    submitEvent$ = DoIQualifyStoreService.submitEvent.asObservable();
    basePath = RoutePath.DOIQUALIFY;
    constructor(
        private store: Store<State>,
        private utilService: UtilService,
        private router: Router
    ) {
        this.doIQualifyState$ = this.store.select(getDoIQualify);
       this.subscription= this.store.select(getDoIQualify).subscribe(d => {
            this.doIQualifyState = { ...d };
            // this.cd.detectChanges();
        });
    }
 

    updateBasicDetails(basicDetails: BasicDetails) {
        const updatedBasicDetail = { ...this.doIQualifyState, ...{basicDetails}}

        this.store.dispatch(DoIQualifyPageActions.storeBasicDetails({ doIQualify: updatedBasicDetail }))
    }
    getAppData() {
        return this.store.select(getDoIQualify)
    }

    formStateUpdated(sender: RoutePath, state: MenuItemState) {
        const menu = this.utilService.getUpdatedMenu(this.doIQualifyState.menu as MenuData, sender, state);
        const updatedDoIQualify = { ...this.doIQualifyState, menu } as DoIQualifyState;
        this.store.dispatch(DoIQualifyPageActions.updateMenuState({ doIQualify: updatedDoIQualify }))
    }
    setFormSubmitEvent(path: string) {
        DoIQualifyStoreService.submitEvent.next(path)

    }
    clearStore(){
      this.store.dispatch(DoIQualifyPageActions.clearDoIQualify())
    }
    getBasicDetails(){

        return this.doIQualifyState.basicDetails?.basicDetails??[];
    }
    getBasicDetailsWithId(){
        return this.doIQualifyState.basicDetails;
    }

    validateAllFormFields(formGroup: FormGroup) {

        Object.keys(formGroup.controls).forEach(field => {  //{2}
            const control = formGroup.get(field);             //{3}
            if (control instanceof FormControl) {
                console.log(control)
                //	this.isFieldValid(field)
                control.markAsTouched({ onlySelf: true });

            } else if (control instanceof FormGroup) {        //{5}
                this.validateAllFormFields(control);            //{6}
            }
        });
    }

    get getCurrentMonthlyIncomeMap(){
        return this.doIQualifyState.pageAction?.currentIncomeMap ?? {};
    }
    get getPageAction(){
        return this.doIQualifyState.pageAction;
    }
   get getHouseHoldSituation(){
       return this.doIQualifyState.otherHouseholdSituations;
   }
    updatePageAction(pageAction:any){
        const updatePageAction = { ...this.doIQualifyState, pageAction } as DoIQualifyState;
        this.store.dispatch(DoIQualifyPageActions.updatePageAction({ doIQualify: updatePageAction }))
    }

    houseHoldValueUpdated(householdValue: TotalHouseHoldValue) {
        const updatedDoIQualify = { ...this.doIQualifyState, householdValue };
        this.store.dispatch(DoIQualifyPageActions.storeHouseholdValueActions({ doIQualify: updatedDoIQualify }));
    }


      programSelectionUpdated(programSelection: ProgramSelection){
        const updatedDoIQualify = { ...this.doIQualifyState, programSelection } ;
        this.store.dispatch(DoIQualifyPageActions.storeProgramSelections({doIQualify: updatedDoIQualify}));
      }

 
    get getSelectedhouseholdValue(){
        return this.doIQualifyState.otherHouseholdSituationSelection
    }

      houseHoldSituationsUpdated(otherHouseholdSituations: OtherHouseholdSituations){
        const updatedDoIQualify = { ...this.doIQualifyState, otherHouseholdSituations } ;
        this.store.dispatch(DoIQualifyPageActions.storeHouseholdSituationsActions({doIQualify: updatedDoIQualify}));
      }

    houseHoldSituationsOptionUpdated(otherHouseholdSituationSelection: OtherHouseholdSituationsOptions) {

        const otherHouseholdSituations=this.mapwithOtherhouseHoldSituation(otherHouseholdSituationSelection) as OtherHouseholdSituations
        const updatedDoIQualify = { ...this.doIQualifyState, otherHouseholdSituationSelection, otherHouseholdSituations }; 
        this.store.dispatch(DoIQualifyPageActions.storeHouseholdsituationSelectionActions({ doIQualify: updatedDoIQualify }));
    }

    mapwithOtherhouseHoldSituation(obj:OtherHouseholdSituationsOptions){
        const householdObj={...otherHouseholdSituation as OtherHouseholdSituations} as any
        const ob={...obj} as any
        Object.keys(householdObj as any).forEach((key:string)=>{
            if(key in ob as any)
            {
                householdObj[key]=ob[key]
            }
        });
return householdObj;

    }
    get getCurrentOtherMonthlyIncomeMap() {
        return this.doIQualifyState.pageAction?.currentOtherIncomeMap ?? {};
    }
    get getCurrentCurrentlyEnrolledMap() {
        return this.doIQualifyState.pageAction?.currentlyEnrolledMap ?? {};
    }
   get getProgramSelection(){
       return this.doIQualifyState.programSelection?.programs??[];
   }
    isFieldValid(formGroup:FormGroup |any,formContolName:string){
        return (formGroup.get(formContolName).status !== 'VALID' && (formGroup.get(formContolName).dirty || formGroup.get(formContolName).touched))

    }
    getHouseHoldValue(){
        return this.doIQualifyState.householdValue?.totalvalue
    }
    updateYesNoValue(yesNoValues: YesNoValues){
       
        const updatedDoIQualify = { ...this.doIQualifyState, yesNoValues };
        this.store.dispatch(DoIQualifyPageActions.updateYesNoValues({ doIQualify: updatedDoIQualify }));
        
    }
    getYesNoValues(){
        return this.doIQualifyState.yesNoValues;
    }
    storeMaleFemaleRelationship(maleFemaleRelationship: MaleFemaleRelationship)
    {
     
        const updatedDoIQualify = { ...this.doIQualifyState, maleFemaleRelationship };
        this.store.dispatch(DoIQualifyPageActions.storeMaleFemaleRelationships({ doIQualify: updatedDoIQualify }));
    }
    menuStateDisabled() 
    {
        const menu = Utility.getDisabledMenuForNav(this.doIQualifyState.menu as MenuData);
        const updatedDoIQualify = { ...this.doIQualifyState, menu } as DoIQualifyState;
        this.store.dispatch(DoIQualifyPageActions.updateMenuState({ doIQualify: updatedDoIQualify }))
    }
    getRelationship(gender:string){
        const _gender=gender.charAt(0).toUpperCase();
        let relationships=[] as any[]
        switch(_gender)
        {
            case "M":
                relationships=this.doIQualifyState.maleFemaleRelationship?.male as any[];
                break;
            case "F":
               relationships= this.doIQualifyState.maleFemaleRelationship?.female as any[];
        }
        return relationships;

    }
    getState(){
        return this.doIQualifyState;
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
const otherHouseholdSituation = {

    totalValueOfResources: 0,
    isPayingHeat: false,
    isTwentyOneOrYoungerAndNoParent: false,
    isSpouseAbsentee: false,
    isLostJobOrReducedHoursLastYear: false,
    isWantHelpPayingMedicalBillsForLastThreeMonths: false,
    isInMedicalOrLivingServices: false,
    isVictimOfDomesticAbuse: false,
    isInTreatmentOfDrugAndAlchoholAbuse: false,
    hasHealthConditionLimitation: false,
    childOfUnitedStatesVeteran: false,
    hasUndergoneOperation: false,
    onGoingMedication: false
}
