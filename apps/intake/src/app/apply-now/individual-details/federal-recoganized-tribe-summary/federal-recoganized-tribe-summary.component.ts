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
  selector: 'compass-ui-federal-recoganized-tribe-summary',
  templateUrl: './federal-recoganized-tribe-summary.component.html',
  styleUrls: ['./federal-recoganized-tribe-summary.component.scss'],
  providers: [ApplyNowIndividualDetailsFederalIncomeTaxReturnSummaryStrategy]
})
export class FederalRecoganizedTribeSummaryComponent implements OnInit {
  jsonData: any;
  applyNowState!: IApplyNowState;
  private federalRecoganizedMap: any = {};
  private deleteUser: any;
  federalRecoganizedSummaryData = {
    "questionText": "People who are members of a federally recognized tribe. ",
    "subHeading": "Look below to make sure all the federally recognized tribe members are here. ",
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
    "addtionalButton": "Add Federally Recoganized Tribe"
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
      let federalTaxDetails = houseHoldPersons?.filter((person) => person.isFederalTribe) as IHouseHold[];
      this.federalRecoganizedSummaryData['questionAnswers'] = [];

      federalTaxDetails.forEach((abrel, i) => {
        this.federalRecoganizedSummaryData['questionAnswers'][i] = {

          accordionHeader: Utility.getLabelText(abrel) || '',
          accordionSubHeading: '',
          accordionRightHeading: '',
          accordionRightSubHeading: '',
          userId: abrel.id || 0,
          accordionData: this.getAccordianLabel(abrel),
          editButton: "Edit",
          deleteButton: "Delete"
        }

        this.jsonData = this.federalRecoganizedSummaryData;
      })
    })
  }

  private getAccordianLabel(persons: IHouseHold): accordian[] {
    let accordingData: accordian[] = [];
    accordingData.push({
      "label": 'Tribe Name:',
      "value": persons.federalTribeInformation ? persons.federalTribeInformation.tribeName as string : '',
      "bold": false
    });

    accordingData.push({
      "label": 'State:',
      "value": persons.federalTribeInformation ? persons.federalTribeInformation.tribeState as string : '',
      "bold": false
    });

    accordingData.push({
      "label": 'Has this person ever received a service from the Indian Health Service, a tribal health program or urban Indian health program, or through a referral from one of these programs?',
      "value": persons.federalTribeInformation ? persons.federalTribeInformation.receivedIndianHealthService as string : '',
      "bold": false
    });

    accordingData.push({
      "label": 'Is this person allowed to receive services from the Indian Health Service, tribal health program or urban Indian health program, or through a referral from one of these programs?',
      "value": persons.federalTribeInformation && persons.federalTribeInformation.receivedIndianHealthService?.toUpperCase() === 'YES' ? '-' : persons.federalTribeInformation?.allowedIndianHelathService as string,
      "bold": false
    });

    accordingData.push({
      "label": 'Per capita payments from a tribe that come from natural resources, usage rights, leases, or royalties?',
      "value": persons.federalTribeIncomeInformation ? persons.federalTribeIncomeInformation?.perCapitaPayments as string : '',
      "bold": false
    });

    accordingData.push({
      "label": 'Amount:',
      "value": persons.federalTribeIncomeInformation && persons.federalTribeIncomeInformation?.perCapitaPayments.toUpperCase() === 'YES' ? persons.federalTribeIncomeInformation.perCapitaPaymentAmount as string : '-',
      "bold": false
    });

    accordingData.push({
      "label": 'How Often:',
      "value": persons.federalTribeIncomeInformation && persons.federalTribeIncomeInformation?.perCapitaPayments.toUpperCase() === 'YES' ? persons.federalTribeIncomeInformation.perCapitaPaymentFrequency as string : '-',
      "bold": false
    });

    accordingData.push({
      "label": 'Payments from natural resources, farming, ranching, fishing, leases, or royalties from land designated as Indian trust land by the Department of the Interior (including reservations and former reservations)?',
      "value": persons.federalTribeIncomeInformation ? persons.federalTribeIncomeInformation?.indianTrustLandPayments as string : '',
      "bold": false
    });

    accordingData.push({
      "label": 'Amount:',
      "value": persons.federalTribeIncomeInformation && persons.federalTribeIncomeInformation?.indianTrustLandPayments.toUpperCase() === 'YES' ? persons.federalTribeIncomeInformation.indiantTrustLandPaymentAmount as string : '-',
      "bold": false
    });

    accordingData.push({
      "label": 'How Often:',
      "value": persons.federalTribeIncomeInformation && persons.federalTribeIncomeInformation?.indianTrustLandPayments.toUpperCase() === 'YES' ? persons.federalTribeIncomeInformation.indiantTrustLandPaymentFrequency as string : '-',
      "bold": false
    });

    accordingData.push({
      "label": 'Money from selling things that have cultural significance?',
      "value": persons.federalTribeIncomeInformation ? persons.federalTribeIncomeInformation?.culturalSignificance as string : '',
      "bold": false
    });

    accordingData.push({
      "label": 'Amount:',
      "value": persons.federalTribeIncomeInformation && persons.federalTribeIncomeInformation?.culturalSignificance.toUpperCase() === 'YES' ? persons.federalTribeIncomeInformation.culturalSignificanceAmount as string : '-',
      "bold": false
    });

    accordingData.push({
      "label": 'How Often:',
      "value": persons.federalTribeIncomeInformation && persons.federalTribeIncomeInformation?.culturalSignificance.toUpperCase() === 'YES' ? persons.federalTribeIncomeInformation.culturalSignificanceFrequency as string : '-',
      "bold": false
    });

    return accordingData;
  }

  public addFederalTribeDetails(): void {
    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALRECOGANIZEDTRIBE]);
  }

  public next() {
    this.queueService.next();
    // this.router.navigate([this.routingStratagy.nextRoute()]);
  }

  public back() {
    if (this.jsonData.questionAnswers && this.jsonData.questionAnswers.length !== 0) {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALRECOGANIZEDTRIBEINCOME]);
    }
    else {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALRECOGANIZEDTRIBE]);
    }

  }

  public deleteClicked(user: any) {
    this.deleteUser = user;
  }

  public continueClicked() {
    const storedHouseholdDetails = this.applyNowState.houseHoldDetails;
    const clonedUpdatedPerson: IHouseHold[] = [];

    if (this.applyNowState && this.applyNowState.houseHoldDetails && this.applyNowState.houseHoldDetails.houseHoldPersons) {
      this.federalRecoganizedMap = {};
      this.applyNowState.houseHoldDetails.houseHoldPersons.forEach((person: IHouseHold) => {
        const clonedPerson = { ...person };
        if (person.id === this.deleteUser) {
          clonedPerson.isFederalTribe = false;
          clonedPerson.federalTribeInformation = undefined;
          clonedPerson.federalTribeIncomeInformation = undefined;
        }

        clonedUpdatedPerson.push(clonedPerson);
      });

      const federalRecoganizedMap = { ...this.applyNowState.houseHoldDetails.pageAction.federalRecoganizedMap };
      let federalRecoganizedKeys = Object.keys(federalRecoganizedMap)
      clonedUpdatedPerson.forEach((person) => {
        if (!person.isFederalTribe) {
          federalRecoganizedKeys = this.filterMappingKeys(federalRecoganizedKeys, person.id)
        }
      });

      federalRecoganizedKeys.forEach((key) => {
        this.federalRecoganizedMap[key] = true;
      });

      const updatedPageAction = {
        federalRecoganizedMap: this.federalRecoganizedMap,
        federalTaxIncomeMap: this.federalRecoganizedMap,
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
      RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALRECOGANIZEDTRIBEINFORMATION,
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
