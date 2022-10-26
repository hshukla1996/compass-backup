import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, DebugElement, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BasicDetail, BasicDetails, OtherHouseholdSituations, OtherHouseholdSituationsOptions, PageQueue, Programs, ProgramSelection } from '../+state/do-i-qualify.models';
import { MenuItemState } from '../../shared/menu-item-state';
import { UtilService } from '../../shared/services/util.service';
import { Router } from '@angular/router';
import { DoIQualifyStoreService } from '../do-i-qualify-store-service';
import { RoutePath } from '../../shared/route-strategies';
import { ScreenQueueUtil, ScreenQueueRouteNameDIQ } from '../../shared/services/screen_queue_util.service';

@Component({
  selector: 'compass-ui-other-household-situations',
  templateUrl: './other-household-situations.component.html',
  styleUrls: ['./other-household-situations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class OtherHouseholdSituationsComponent implements OnInit {
  pageQueue!: PageQueue;
  public form!: FormGroup;
  basicDetails!: BasicDetail[]
  selectedValues!: any[];
  isValidated!: boolean;
  isDisabled =false;
  otherHouseholdSituationForm!: FormGroup | any;
  benefits!:string[];
  selectedOptions!: OtherHouseholdSituationsOptions | null
  public householdSituations: OtherHouseholdSituationsOptions  | any = {

    isPayingHeat: null,
    isTwentyOneOrYoungerAndNoParent: null,
    isSpouseAbsentee: null,
    isLostJobOrReducedHoursLastYear: null,
    isWantHelpPayingMedicalBillsForLastThreeMonths: null,
    isInMedicalOrLivingServices: null,
    isVictimOfDomesticAbuse: null,
    isInTreatmentOfDrugAndAlchoholAbuse: null,
    hasHealthConditionLimitation:null,
    childOfUnitedStatesVeteran:null,
    hasUndergoneOperation:null,
    onGoingMedication:null,
    hasIncome: null,
    hasOtherIncome: null,
    isCurrentlyEnrolled: null,
    isPregnant: null,
    noneOfAbove: null,
    isInFosterCare:null
  };
  
visibleHouseHoldOption={
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
  onGoingMedication: false,
  hasIncome: false,
  hasOtherIncome: false,
  isCurrentlyEnrolled: false,
  isPregnant: false,
  isInFosterCare:false
}
  constructor(private fb: FormBuilder, private utilService: UtilService,
    private router: Router, private storeService: DoIQualifyStoreService,
    private queueService: ScreenQueueUtil) {
    this.otherHouseholdSituationForm = this.fb.group({
      situation: this.fb.array([], [Validators.required])
    });
    this.selectedOptions = this.storeService.getSelectedhouseholdValue ?? null;
    this.benefits = this.storeService.getProgramSelection;
    this.householdSituations = (this.selectedOptions == null) ? { ...this.householdSituations } : this.selectedOptions;
    
  }
  get situations(): FormArray {
    return <FormArray>this.otherHouseholdSituationForm.controls['situation'];
  }

  ngOnInit(): void
   {
   
    this.basicDetails = this.storeService?.getBasicDetails() ?? [];
    this.selectedValues = this.queueService.initializeSelection(this.selectedOptions);
    this.setControlsFromState();
    this.setOptionForProgramRequiredCheck();
    this.isValidated = this.situations.valid ? true : false;
    this.otherHouseholdSituationForm.valueChanges.subscribe((d: any) => {
      this.isValidated = this.situations.valid ? true : false;

    });
    //this.isDisabled = this.isRadiobuttonDisable()
    this.storeService.formStateUpdated(RoutePath.DOIQUALIFY_OTHERHOUSEHOLDSITUATIONS, MenuItemState.INPROGRESS)
  }
setControlsFromState(){
 
  const entries = Object.entries(this.householdSituations);
  for (const [key, value] of entries) {
    if (value!=null) {
      this.situations.push(new FormControl(value));
    }
  }
 
}
  setOptionForProgramRequiredCheck(){
    const entries = Object.entries(this.visibleHouseHoldOption);
    let obj={...this.visibleHouseHoldOption} as any
    for (const [key, value] of entries) {
      obj[key]=this.isRequiredProgramSelected(key);
    }
     this.visibleHouseHoldOption={...obj};
  }
  resetRadioButton(value:any){
    
    let id = this.getIndex(value)
    if (id > -1) {
      this.situations.removeAt(id);
    }
    if(this.householdSituations[value]==null)return;
    const newSituations: OtherHouseholdSituations | any = { ...this.householdSituations }
    newSituations[value] = null;
    this.householdSituations = { ...newSituations };
    //this.isDisabled=this.isRadiobuttonDisable()
  }
  onRadioChecked(value:any,isChecked:boolean,event:any){
    
    const newSituations: OtherHouseholdSituations | any = { ...this.householdSituations }
    newSituations[value] = isChecked;
    this.householdSituations = { ...newSituations };

   
     this.selectedValues=this.selectedValues==null?[]:this.selectedValues;
    if(isChecked) this.selectedValues.push(value as any) 
    else this.selectedValues = this.selectedValues.filter((val) => val != value)
   
    let id = this.getIndex(value) as any
    if (id == -1) this.situations.push(new FormControl(value))
  this.isDisabled=false;
  }
isRadiobuttonDisable(){
 return this.householdSituations.noneOfAbove!=null?true:false
}

  initPathArray()
  {
    let arr = this.selectedValues == null ? [] : this.selectedValues;
    //if (arr.length == 0) return;
    // this.composeConditionalPath(arr);
    this.queueService.initDynamicRoutes(arr, RoutePath.DOIQUALIFY_RESULTS);

  }

  isFemaleOverEighteen() {
    if (this.basicDetails.length > 0)
    {
      const isFemaleOver18 = this.basicDetails.filter((val) => val.age > 9 && val.age<60 && val.gender == 'F').length > 0;
      if (isFemaleOver18) {
        
        const areProgramExist=this.areProgramsExist(this.benefits,[Programs.BL,Programs.CA,Programs.HA]);
        return areProgramExist?true:false;
      }
    }

    return false
  }



  back() {
      const hasHouseholdValue=this.areProgramsExist(this.benefits,[Programs.BL,Programs.HA]);
      if(hasHouseholdValue){
      this.router.navigate([RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_HOUSEHOLDVALUE]);
      }
      else
      {
        this.router.navigate([RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_PROGRAMSELECTION]);
      }

  }
  next() {

    this.otherHouseholdSituationForm.markAllAsTouched();
   // if (!this.otherHouseholdSituationForm.valid)return;
    this.initPathArray();
    this.removeStateForUncheckedOption(this.selectedValues)
    this.storeService.houseHoldSituationsOptionUpdated(this.householdSituations as OtherHouseholdSituationsOptions);
    this.storeService.updateBasicDetails({ basicDetails: this.basicDetails } as BasicDetails)
    this.queueService.navigateToPath();
  }

  composeConditionalPath(arr: any[]) {

    
  }


  isFieldValid(): boolean {
    return this.storeService.isFieldValid(this.otherHouseholdSituationForm, 'situation')
  }

  getIndex(value: any): number {
    return this.situations.controls.findIndex((val: any) => val.value == value);
  }


  removeStateForUncheckedOption(arr:string[])
  {
    const basicDetailsProperty = [ScreenQueueRouteNameDIQ.hasIncome, ScreenQueueRouteNameDIQ.hasOtherIncome, ScreenQueueRouteNameDIQ.isCurrentlyEnrolled,
      ScreenQueueRouteNameDIQ.isInFosterCare, ScreenQueueRouteNameDIQ.onGoingMedication, ScreenQueueRouteNameDIQ.childOfUnitedStatesVeteran]
    const otherHouseholdSituationsProperties=[
      ScreenQueueRouteNameDIQ.isPayingHeat
    ] as any
    basicDetailsProperty.forEach((property)=>{
      if(arr.indexOf(property)<0)
      {
        const obj = this.getProperties(property);
         this.removeStateFromBasicDetail(obj)
      }
    })
    otherHouseholdSituationsProperties.forEach((proprty:any)=>{
      if (arr.indexOf(proprty) < 0)
      {
        const obj = this.getProperties(proprty);
        this.removeStateFromOtherHouseHoldSituation(obj);
      }
    })
  }


  getProperties(property:string) {
    switch (property)
    {
      case ScreenQueueRouteNameDIQ.hasIncome:
        return {"isEmployed":null,
                "incomeFromJobs":0}

      case ScreenQueueRouteNameDIQ.hasOtherIncome:
         return{
           "hasOtherIncome":null,
           "incomeFromOtherJobs":0
         }
      case ScreenQueueRouteNameDIQ.isInFosterCare:
           return{
             "wasInFosterCareOnEighteenthBirthdayOrLater":null
           }
      case ScreenQueueRouteNameDIQ.isPregnant:
             return{
              "isPregnant":null
             }
      case ScreenQueueRouteNameDIQ.isCurrentlyEnrolled:
               return{
                 "hasEnrolledInSchool":null,
                 "schoolType":null
               }
      case ScreenQueueRouteNameDIQ.onGoingMedication:

        return {
          "isDisabled": null,

        }
      case ScreenQueueRouteNameDIQ.childOfUnitedStatesVeteran:

        return {
          "isRelatedToVeteran": null,

        }


    }
    return {};
  }
  removeStateFromBasicDetail(obj:{})
  {
    if(this.basicDetails.length>0 && !this.utilService.isEmptyObject(obj))
    {
      const copyOfItems = this.basicDetails.map(
        detail => ({ ...detail, ...obj })
      ); //
      this.basicDetails = copyOfItems;


    }

  }
  

  uncheckAll(noneofAboveRadioValue:boolean)
  {

    const copyOfOtherhouseHoldSituation = { ...this.householdSituations}
    Object.keys(copyOfOtherhouseHoldSituation).forEach(key => {

      copyOfOtherhouseHoldSituation[key] = null;

    });
    copyOfOtherhouseHoldSituation["noneOfAbove"] = noneofAboveRadioValue;
    this.householdSituations = { ...copyOfOtherhouseHoldSituation}
  }

  removeStateFromOtherHouseHoldSituation(obj:{}){
    if(!this.utilService.isEmptyObject(obj))
    {
      const copyOfOtherhouseHoldSituation = { ...this.householdSituations,...obj}
      this.householdSituations={...copyOfOtherhouseHoldSituation};

    }
  }
  hasOneOrMoreJob() {
    const programs = [Programs.CA, Programs.HA, Programs.FS, Programs.LH, Programs.CI, Programs.BL]
    return this.areProgramsExist(this.benefits, programs)

  }
  isFosterCare() {
    const isPersonBetween18And25=this.basicDetails.filter((person)=>person.age>=18 && person.age<=25).length>0;
    return isPersonBetween18And25 && this.isProgramExist(this.benefits, Programs.HA)
  }
  isEnrolledInSchool() {
    const programs = [Programs.CA, Programs.CI, Programs.BL]
    return this.areProgramsExist(this.benefits, programs)
  }
  hasOtherJob() {

    const programs = [Programs.CA, Programs.HA, Programs.FS, Programs.LH,Programs.CI,Programs.BL]
    return this.areProgramsExist(this.benefits, programs)
  }
  isPayingHeat()
  {
     return this.isProgramExist(this.benefits,Programs.LH)
  }
  isLostJobOrReducedHoursLastYear()
  {
    const programs = [Programs.CA, Programs.HA, Programs.FS,]
    return this.areProgramsExist(this.benefits, programs)
  }

isYoungerThanTwentyOne()
{

const programs=[Programs.CA,Programs.HA,Programs.FS,]

return this.areProgramsExist(this.benefits,programs)

}
  isSpouseAbsentee()
  {
    const programs = [Programs.CA, Programs.HA, Programs.FS]
    return this.areProgramsExist(this.benefits, programs)

  }

  isWantHelpPayingMedicalBillsForLastThreeMonths(){
    const programs = [Programs.CA, Programs.HA]
    return this.areProgramsExist(this.benefits, programs)
  }
  isInMedicalOrLivingServices(){
    const programs = [Programs.CA, Programs.HA]
    return this.areProgramsExist(this.benefits, programs)
  }
  hasHealthConditionLimitation(){
    return this.areProgramsExist(this.benefits, [Programs.HA,Programs.CA]);
  }
  isVictimOfDomesticAbuse(){
    return this.isProgramExist(this.benefits, Programs.CA)
  }
  isInTreatmentOfDrugAndAlchoholAbuse(){
    return this.isProgramExist(this.benefits, Programs.CA)
  }
  onGoingMedication()
  {
    const programs = [Programs.CA, Programs.HA, Programs.FS,Programs.CI,Programs.BL]
    return this.areProgramsExist(this.benefits, programs)

  }

  childOfUnitedStatesVeteran(){
    const programs = [Programs.CA, Programs.HA]
    return this.areProgramsExist(this.benefits, programs)
  }

  isRequiredProgramSelected(property:string)
{
    let obj = { ...this.householdSituations} as any
  let isExist=true;
  switch(property)
  {
    case "isTwentyOneOrYoungerAndNoParent":
         isExist =this.isYoungerThanTwentyOne();
         break;
    case "isPayingHeat":
          isExist=this.isPayingHeat()
          break;
    case "isLostJobOrReducedHoursLastYear":
      isExist = this.isLostJobOrReducedHoursLastYear();
         break;
    case "isSpouseAbsentee":
      isExist = this.isSpouseAbsentee();;
      break;
    case "isWantHelpPayingMedicalBillsForLastThreeMonths":
      isExist = this.isWantHelpPayingMedicalBillsForLastThreeMonths();;
      break;
    case "isInMedicalOrLivingServices":
      isExist = this.isInMedicalOrLivingServices();
      break;
    case "hasHealthConditionLimitation":
      isExist = this.hasHealthConditionLimitation();
      break;
    case "isVictimOfDomesticAbuse":
      isExist = this.isVictimOfDomesticAbuse();
      break;
    case "isInTreatmentOfDrugAndAlchoholAbuse":
      isExist = this.isInTreatmentOfDrugAndAlchoholAbuse();
      break;
    case "hasIncome":
      isExist = this.hasOneOrMoreJob();
      break;
    case "hasOtherIncome":
      isExist = this.hasOtherJob();
      break;
    case "isCurrentlyEnrolled":
      isExist=this.isEnrolledInSchool();
      break;
    case "onGoingMedication":
      isExist = this.onGoingMedication();
      break;
    case "isPregnant":
      isExist = this.isFemaleOverEighteen();
      break;
    case "childOfUnitedStatesVeteran":
      isExist = this.childOfUnitedStatesVeteran();
      break;
    case "isInFosterCare":
      isExist=this.isFosterCare();
      break;
    default:
      isExist=false
      break;

  }

    if (!isExist)
    {
      obj[property] = null;
      if(this.selectedValues.length>0)
      {
        this.selectedValues=this.selectedValues.filter(val=>val!==property);
        
        
      }
      const index = this.getIndex(property);
      if (index >= 0) this.situations.removeAt(index);
      this.householdSituations = { ...obj } as OtherHouseholdSituationsOptions;
    }

  return isExist;
}


  areProgramsExist(selectedPrograms: string[], conditionalPrograms: string[])
  {
    if(selectedPrograms.length==0)return false;
    return conditionalPrograms.some(value => {
      return selectedPrograms.indexOf(value) !== -1;
    });
  }


isProgramExist(arr:string[],program:string)
{

    return (arr.length==0)?false: arr.indexOf(program) >=0;
}




}
