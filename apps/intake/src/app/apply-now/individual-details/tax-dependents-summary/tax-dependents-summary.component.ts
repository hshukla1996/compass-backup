import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IApplyNowState } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, PageDirection } from '../../household/household-model';
import { ScreenQueueUtil } from '../individuals-gatepost/individuals-gatepost.paths';

export class accordian {
  label!: string;
  value!: string;
  bold!: false
}

@Component({
  selector: 'compass-ui-tax-dependents-summary',
  templateUrl: './tax-dependents-summary.component.html',
  styleUrls: ['./tax-dependents-summary.component.scss']
})
export class TaxDependentsSummaryComponent implements OnInit {

  jsonData: any;
  applyNowState!: IApplyNowState;
  private taxDependentMap: any = {};
  private deleteUser: any;
  taxDependentSummaryData = {
    "questionText": "Tax dependents in the household.",
    "subHeading": "Look below to make sure all tax dependents are here.",
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
    "addtionalButton": "Add Tax Filer"
  }

  public modalData = {
    "modalTitle": "Are you sure you want to remove this record?",
    "modalContent": "If you remove this record you will need to re-enter the data to get it back.",
    "cancelButton": "Cancel",
    "continueButton": "Remove"
  }

  constructor(private router: Router,
    private queueService: ScreenQueueUtil,
    private service: ApplyNowStoreService) { }

  ngOnInit(): void {
    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      let houseHoldPersons = this.applyNowState.houseHoldDetails.houseHoldPersons;
      let taxDependentDetails = houseHoldPersons?.filter((person) => person.isTaxDependent) as IHouseHold[];
      this.taxDependentSummaryData['questionAnswers'] = [];

      taxDependentDetails.forEach((abrel, i) => {
        this.taxDependentSummaryData['questionAnswers'][i] = {

          accordionHeader: `${Utility.getLabelText(abrel)}` || '',
          accordionSubHeading: '',
          accordionRightHeading: '',
          accordionRightSubHeading: '',
          userId: abrel.id || 0,
          accordionData: this.getAccordianLabel(abrel, i),
          editButton: "Edit",
          deleteButton: "Delete"
        }

        this.jsonData = this.taxDependentSummaryData;
      })
    })
  }

  private getAccordianLabel(persons: IHouseHold, index: number): accordian[] {
    let accordingData: accordian[] = [];
    if (persons) {
      const accordianHeader = `Who will claim ${persons.firstName} as tax Dependent`;
      accordingData.push({
        "label": accordianHeader,
        "value": persons.taxClaimedPerson as string,
        "bold": false
      });
    }

    return accordingData;
  }

  public addTaxDependentDetails(): void {
    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_TAXDEPENDENTS]);
  }

  public next() {
    this.queueService.updateForwardPath();
    this.queueService.nextPath();
  }

  public back() {
    // if (this.jsonData.questionAnswers && this.jsonData.questionAnswers.length !== 0) {
    //   this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_TAXDEPENDENTSDETAILS]);
    // }
    // else {
    //   this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_TAXDEPENDENTS]);
    // }
    this.queueService.back();
  }

  public deleteClicked(user: any) {
    this.deleteUser = user;
  }

  public continueClicked() {
    const storedHouseholdDetails = this.applyNowState.houseHoldDetails;
    const clonedUpdatedPerson: IHouseHold[] = [];

    if (this.applyNowState && this.applyNowState.houseHoldDetails && this.applyNowState.houseHoldDetails.houseHoldPersons) {
      this.taxDependentMap = {};
      this.applyNowState.houseHoldDetails.houseHoldPersons.forEach((person: IHouseHold) => {
        const clonedPerson = { ...person };
        if (person.id === this.deleteUser) {
          clonedPerson.isTaxDependent = false;
          clonedPerson.taxClaimedPerson = undefined;
        }

        clonedUpdatedPerson.push(clonedPerson);
      });

      const taxDependentMap = { ...this.applyNowState.houseHoldDetails.pageAction.taxDependentMap };
      let taxDependentMapKeys = Object.keys(taxDependentMap)
      clonedUpdatedPerson.forEach((person) => {
        if (!person.isTaxDependent) {
          taxDependentMapKeys = this.filterMappingKeys(taxDependentMapKeys, person.id)
        }
      });

      taxDependentMapKeys.forEach((key) => {
        this.taxDependentMap[key] = true;
      });

      const updatedPageAction = {
        taxDependentMap: this.taxDependentMap,
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
      RoutePath.APPLYNOW_INDIVIDUALDETAILS_TAXDEPENDENTSDETAILS,
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
