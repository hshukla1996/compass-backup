
//medical-condition-summary
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IApplyNowState } from '../../+state/apply-now.models';
import { AppStoreService } from '../../../app-store-service';
import { DateFormatConstants } from '../../../shared/constants/Constants';
import { RoutePath } from '../../../shared/route-strategies';
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, PageDirection } from '../../household/household-model';
import { ScreenQueueUtil } from '../individuals-medical-gatepost/individuals-medical-gatepost.path';

export class accordian {
  label!: string;
  value!: string;
  bold!: false
}

@Component({
  selector: 'compass-ui-medical-condition-summary',
  templateUrl: './medical-condition-summary.component.html',
  styleUrls: ['./medical-condition-summary.component.scss']
})
export class MedicalConditionSummaryComponent implements OnInit {

  ssiDisabilities=[] as any[];
  jsonData: any;
  applyNowState!: IApplyNowState;
  private medicalConditionMap: any = {};
  medicalSummaryData = {
    "questionText": "Your household's medical conditions.",
    "subHeading": "Look below to make sure all medical conditions are here. ",
    "toolTip": "",
    "questionAnswers": [
      {
        "accordionHeader": "{replace} Sample 65 (M)",
        "accordionSubHeading": "",
        "accordionRightHeading": "",
        "accordionRightSubHeading": "",
        "userId": 1,
        "accordionData": [{}],
        "editButton": "Edit",
        "deleteButton": "Delete"
      },
    ],
    "addtionalButton": "Add Medical Condition"
  }
  modalData = {
      "modalTitle": "Are you sure you want to remove this record?",
      "modalContent": "If you remove this record you will need to re-enter the data to get it back.",
      "cancelButton": "Cancel",
      "continueButton": "Remove"
  }
  deleteUser: any;

  constructor(private router: Router,
    private queueService: ScreenQueueUtil,
    private service: ApplyNowStoreService,private appService: AppStoreService) {
      this.appService.getDisabilitySsi().subscribe((s) => {
        
        this.ssiDisabilities = s;
       // this.cd.detectChanges();
    });
     }

  ngOnInit(): void {
    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      let houseHoldPersons = this.applyNowState.houseHoldDetails.houseHoldPersons;
      let medicalConditionDetails = houseHoldPersons?.filter((person) => person.isMedical) as IHouseHold[];
      this.medicalSummaryData['questionAnswers'] = [];

      medicalConditionDetails.forEach((abrel, i) => {
        this.medicalSummaryData['questionAnswers'][i] = {

          accordionHeader: `${abrel.firstName as string} ${abrel.midName ? abrel.midName as string : ''} ${abrel.lastName as string} ${Utility.getAge(abrel.dateOfBirth)}` || '',
          accordionSubHeading: this.getSubHeading(abrel),
          accordionRightHeading: '',
          accordionRightSubHeading: '',
          userId: abrel.id || 0,
          accordionData: this.getAccordianLabel(abrel, i),
          editButton: "Edit",
          deleteButton: "Delete"
        }

        this.jsonData = this.medicalSummaryData;
      })
    })
  }
private getDisabilityNameById(id:any){
  
  if(this.ssiDisabilities.length<0)return;
  const names=this.ssiDisabilities.filter((val:any)=>{
    return val.id==id;
  })
  if(names.length>0)
  {
    return names[0].displayValue;
  }
  return ''
}
  private getSubHeading(person: IHouseHold): string {
    if (Utility.getAge(person.dateOfBirth) < 19) {
      return person.medicalConditionDetails?.childDisability?.toUpperCase() === "BEH" ? "Behavioural" :
        person.medicalConditionDetails?.childDisability?.toUpperCase() === "DEV" ? "Developmental" : "Physical";
    }
    else {
      return person.medicalConditionDetails?.disability?.toUpperCase() === "PER" ? "Permanent" : "Temporary";
    }
  }

  private getAccordianLabel(persons: IHouseHold, index: number): accordian[] {
    
    let accordingData: accordian[] = [];
    if (persons) {
      accordingData.push({
        "label": 'Describe the medical condition',
        "value": persons.medicalConditionDetails?.medicalCondition ? persons.medicalConditionDetails?.medicalCondition : '',
        "bold": false
      });

      accordingData.push({
        "label": 'When did the condition begin ?',
        "value": persons.medicalConditionDetails?.beginDate ? Utility.formatDate(
         
            persons.medicalConditionDetails?.beginDate as string)
         
       : '',
        "bold": false
      });

      if (Utility.getAge(persons.dateOfBirth) < 19) {
        accordingData.push({
          "label": `What type of disability does ${persons.firstName} have ?`,
          "value": persons.medicalConditionDetails?.childDisability?.toUpperCase() === "BEH" ? "Behavioural" :
            persons.medicalConditionDetails?.childDisability?.toUpperCase() === "DEV" ? "Developmental" : "Physical",
          "bold": false
        });

        accordingData.push({
          "label": `What is ${persons.firstName}'s developement age (in months) ?`,
          "value": `${persons.medicalConditionDetails?.developmentAge as unknown as string } Months`,
          "bold": false
        });
      }
      else {      
        accordingData.push({
          "label": `Is ${persons.firstName}'s disability permanent or temporary?`,
          "value": persons.medicalConditionDetails?.disability?.toUpperCase() === "PER" ? "Permanent" : "Temporary",
          "bold": false
        });

        accordingData.push({
          "label": `Is ${persons.firstName} able to work ?`,
          "value":Utility.getYesNoValue(persons.medicalConditionDetails?.ableToWork as any),
          "bold": false
        });

        accordingData.push({
          "label": `Is ${persons.firstName} able to care for his or her child(ren)? `,
          "value": Utility.getYesNoValue(persons.medicalConditionDetails?.careChildren as any),
          "bold": false
        });

        accordingData.push({
          "label": `Does ${persons.firstName} get disability income (such as SSI)? `,
          "value": `${this.getDisabilityNameById(persons.medicalConditionDetails?.ssi as string)}`,
          "bold": false
        });
      }
    }

    return accordingData;
  }

  public addMedicalConditionsDetails(): void {
    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_MEDICALCONDITION]);
  }

  public next() {
    this.queueService.nextPath();
  }

  public back() {
    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_MEDICALCONDITIONDETAILS]);
  }

  deleteClicked(user: any) {
    this.deleteUser = user;
  }

  public continueClicked() {
    this.medicalSummaryData['questionAnswers'].forEach((element: any) => {
        if (element['userId'] === this.deleteUser) {
            element['accordionHeader'] = "";
        }
    });
    const storedHouseholdDetails = this.applyNowState.houseHoldDetails;
    const clonedUpdatedPerson: IHouseHold[] = [];

    if (this.applyNowState && this.applyNowState.houseHoldDetails && this.applyNowState.houseHoldDetails.houseHoldPersons) {
      this.medicalConditionMap = {};
      this.applyNowState.houseHoldDetails.houseHoldPersons.forEach((person: IHouseHold) => {
        const clonedPerson = { ...person };
        if (person.id === this.deleteUser) {
          clonedPerson.isMedical = false;
          clonedPerson.medicalConditionDetails = undefined;
        }

        clonedUpdatedPerson.push(clonedPerson);
      });

      const medicalConditionMap = { ...this.applyNowState.houseHoldDetails.pageAction.medicalConditionMap };
      let medicalConditionMapKeys = Object.keys(medicalConditionMap)
      clonedUpdatedPerson.forEach((person) => {
        if (!person.isTaxDependent) {
          medicalConditionMapKeys = this.filterMappingKeys(medicalConditionMapKeys, person.id)
        }
      });

      medicalConditionMapKeys.forEach((key) => {
        this.medicalConditionMap[key] = true;
      });

      const updatedPageAction = {
        medicalConditionMap: this.medicalConditionMap,
        serviceDirection: PageDirection.NEXT
      };

      if (storedHouseholdDetails) {
        this.service.updateHouseHoldDetails(
          { ...storedHouseholdDetails, ...{ houseHoldPersons: clonedUpdatedPerson, pageAction: updatedPageAction } }
        )
      }

      this.jsonData.questionAnswers = this.jsonData['questionAnswers'].filter((element: any) => {
        if (+element['userId'] === +this.deleteUser) {
          return false;
        }
        return true;
      });
    }
  }

  public editClicked(user: any) {
    this.router.navigate([
      RoutePath.APPLYNOW +
      "/" +
      RoutePath.APPLYNOW_INDIVIDUALDETAILS +
      "/" +
      RoutePath.APPLYNOW_INDIVIDUALDETAILS_MEDICALCONDITIONDETAILS,
      { userId: user },
    ]);
  }

  private filterMappingKeys(keys: string[], id: number | undefined): string[] {
    const removedKey = keys.find((key) => +key === id);
    if (removedKey) {
      keys = keys.filter((person) => {
        if (person === removedKey) {
          return false;
        }
        return true;
      })
    }

    return keys;
  }

}
