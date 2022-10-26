import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IApplyNowState } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowIndividualDetailsFederalIncomeTaxReturnSummaryStrategy } from '../../../shared/route-strategies/apply-now/individual-details-federal-income-tax-summary';
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
  selector: 'compass-ui-federal-income-tax-return',
  templateUrl: './federal-tax-return-summary.component.html',
  styleUrls: ['./federal-tax-return-summary.component.scss'],
  providers: [ApplyNowIndividualDetailsFederalIncomeTaxReturnSummaryStrategy]
})
export class FederalIncomeTaxReturnSummaryComponent implements OnInit {
  jsonData: any;
  applyNowState!: IApplyNowState;
  private deleteUser: any;
  private federalTaxReturnMap: any = {};
  private claimTaxDependentMap: any = {};
  private whoWillBeTaxClaimedMap: any = {};
  public isAddButtonDisabled = false;
  taxReturnSummaryData = {
    "questionText": "Tax Filers in the household",
    "subHeading": "Look below to make sure all people filing taxes are here. ",
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

  constructor(
    private routingStratagy: ApplyNowIndividualDetailsFederalIncomeTaxReturnSummaryStrategy,
    private router: Router,
    private queueService: ScreenQueueUtil,
    private service: ApplyNowStoreService
  ) { }

  ngOnInit(): void {
    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      let houseHoldPersons = this.applyNowState.houseHoldDetails.houseHoldPersons;
      let federalTaxDetails = houseHoldPersons?.filter((person) => person.isFederalTaxReturn && person.isFederalTaxReturn === 'Y') as IHouseHold[];
      // TODO:- Will go in next update  in PROD
      //this.isAddButtonDisabled = houseHoldPersons?.length === federalTaxDetails.length;

      this.taxReturnSummaryData['questionAnswers'] = [];

      federalTaxDetails.forEach((abrel, i) => {
        this.taxReturnSummaryData['questionAnswers'][i] = {

          accordionHeader: `${abrel.firstName as string
            } ${abrel.lastName as string} ${Utility.getAge(abrel.dateOfBirth)}` || '',
          accordionSubHeading: abrel.filingStatus?.toUpperCase() === "Y" ? 'Filing Jointly' : 'Not Filing Jointly',
          accordionRightHeading: `${abrel.claimTaxDependentPersons && abrel.claimTaxDependentPersons.length > 0 ? abrel.claimTaxDependentPersons.length : 0}`,
          accordionRightSubHeading: "Dependents",
          userId: abrel.id || 0,
          accordionData: this.getAccordianLabel(abrel.claimTaxDependentPersons, i),
          editButton: "Edit",
          deleteButton: "Delete"
        }

        this.jsonData = this.taxReturnSummaryData;
      })
    })
  }

  private getAccordianLabel(persons: number[] | undefined, index: number): accordian[] {
    let accordingData: accordian[] = [];
    if (persons && persons.length > 0) {
      persons.forEach((houseHoldPerson) => {
        const personDetails = this.applyNowState.houseHoldDetails.houseHoldPersons?.find(x => x.id === +houseHoldPerson);
        if (personDetails) {
          const accordianHeader = `${personDetails.firstName}(${Utility.getAge(personDetails.dateOfBirth)})`;
          accordingData.push({
            "label": accordianHeader,
            "value": '',
            "bold": false
          });
        }
      })

    }

    return accordingData;
  }

  public addTaxReturnDetails(): void {
    // TODO:- Commented code will go in prod in next updates
    //this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALINCOMETAXRETURN, {source : 'FederalSummary'}]);
    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALINCOMETAXRETURN]);
  }

  public next() {
    this.queueService.updateForwardPath();
    this.queueService.next();
    // this.router.navigate([this.routingStratagy.nextRoute()]);
  }

  public back() {
    // const countOfClaimAsDependentPerson = this.applyNowState.houseHoldDetails.houseHoldPersons?.filter((person) => {
    //   return !person.claimAsTaxDependent || person.claimAsTaxDependent === "N"
    // });

    // const test = this.applyNowState.houseHoldDetails.houseHoldPersons?.filter(x => !x.claimTaxDependentPersons 
    //   || x.claimTaxDependentPersons?.length === 0);
    
    // if (this.applyNowState.houseHoldDetails.houseHoldPersons?.length === 1) {
    //   const houseHoldObejct = this.applyNowState.houseHoldDetails.houseHoldPersons[0];
    //   if (houseHoldObejct.claimAsTaxDependent === "Y" && !houseHoldObejct.claimTaxDependentPersons || (houseHoldObejct.claimTaxDependentPersons && houseHoldObejct.claimTaxDependentPersons.length === 0)) {
    //     this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_CLAIMTAXDEPENDENT]);
    //   }
    //   else {
    //     this.router.navigate([this.routingStratagy.previousRoute()]);
    //   }
    // }
    // else {
    //   if (this.jsonData.questionAnswers.length === 0) {
    //     this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALINCOMETAXRETURN]);
    //   }
    //   else if (countOfClaimAsDependentPerson?.length === this.applyNowState.houseHoldDetails.houseHoldPersons?.length) {
    //     this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_CLAIMTAXDEPENDENT]);
    //   }
    //   else if (test?.length === this.applyNowState.houseHoldDetails.houseHoldPersons?.length){
    //     this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_CLAIMTAXDEPENDENT]);
    //   }
    //   else {
    //     this.router.navigate([this.routingStratagy.previousRoute()]);
    //   }
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
      this.federalTaxReturnMap = {};
      this.applyNowState.houseHoldDetails.houseHoldPersons.forEach((person: IHouseHold) => {
        const clonedPerson = { ...person };
        if (person.id === this.deleteUser) {
          clonedPerson.isFederalTaxReturn = 'N';
          clonedPerson.filingStatus = "N";
          clonedPerson.claimTaxDependentPersons = [];
          clonedPerson.claimAsTaxDependent = "N";
        }

        clonedUpdatedPerson.push(clonedPerson);
      });

      const federalTaxReturnMap = { ...this.applyNowState.houseHoldDetails.pageAction.federalTaxReturnMap };
      let federalTaxReturnKeys = Object.keys(federalTaxReturnMap)
      clonedUpdatedPerson.forEach((person) => {
        if (!person.isFederalTaxReturn || person.isFederalTaxReturn === 'N') {
          federalTaxReturnKeys = this.filterMappingKeys(federalTaxReturnKeys, person.id)
        }
      });

      const claimTaxDependentMap = { ...this.applyNowState.houseHoldDetails.pageAction.claimTaxDependentMap };
      let claimTaxDependentKeys = Object.keys(claimTaxDependentMap)
      clonedUpdatedPerson.forEach((person) => {
        if (person.id === this.deleteUser) {
          claimTaxDependentKeys = this.filterMappingKeys(claimTaxDependentKeys, person.id)
        }
      });

      const whoWillBeTaxClaimedMap = { ...this.applyNowState.houseHoldDetails.pageAction.whoWillBeTaxClaimedMap };
      let whoWillBeTaxClaimedKeys = Object.keys(whoWillBeTaxClaimedMap)
      clonedUpdatedPerson.forEach((person) => {
        if (person.id === this.deleteUser) {
          whoWillBeTaxClaimedKeys = this.filterMappingKeys(whoWillBeTaxClaimedKeys, person.id);
        }
      });

      federalTaxReturnKeys.forEach((key) => {
        this.federalTaxReturnMap[key] = true;
      });

      claimTaxDependentKeys.forEach((key) => {
        this.claimTaxDependentMap[key] = true;
      });


      whoWillBeTaxClaimedKeys.forEach((key) => {
        this.whoWillBeTaxClaimedMap[key] = true;
      });

      const updatedPageAction = {
        federalTaxReturnMap: this.federalTaxReturnMap,
        claimTaxDependentMap: this.claimTaxDependentMap,
        whoWillBeTaxClaimedMap: this.whoWillBeTaxClaimedMap,
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
      RoutePath.APPLYNOW_INDIVIDUALDETAILS_FilingStatus,
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
