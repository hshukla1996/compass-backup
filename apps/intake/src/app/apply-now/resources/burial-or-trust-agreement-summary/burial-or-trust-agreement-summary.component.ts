import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DateFormatConstants } from '../../../shared/constants/Constants';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowResourcesBurialOrTrustAgreementStrategy } from '../../../shared/route-strategies/apply-now/burial-or-trust-agreement';
import { ApplyNowResourcesBurialOrTrustAgreementSummaryStrategy } from '../../../shared/route-strategies/apply-now/burial-or-trust-agreement-summary';
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, IHouseHoldDetails } from '../../household/household-model';
import { ScreenQueueUtil } from '../resources-gatepost/resources-gatepost.path';


@Component({
  selector: 'compass-ui-burial-or-trust-agreement-summary',
  templateUrl: './burial-or-trust-agreement-summary.component.html',
  styleUrls: ['./burial-or-trust-agreement-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApplyNowResourcesBurialOrTrustAgreementSummaryStrategy, ApplyNowResourcesBurialOrTrustAgreementStrategy]
})
export class BurialOrTrustAgreementSummaryComponent implements OnInit {

  burialOrTrustAgreementSummaryForm: FormGroup | any;
  jsonData: any;
  houseHoldPersons: IHouseHold[] = [];
  houseHoldDetails!: IHouseHoldDetails;
  personMap = new Map<string, string>();
  recordToBeOperated!: number;
  deletedUser!: any;
  public burialTrustAgreementSummaryDetails = {
    "questionText": "Your burial or trust Agreements",
    "subHeading": "Review the entries to make sure everything looks correct.",
    "toolTip": "",
    "questionAnswers": [
      {
        "accordionHeader": "{replace} Sample 65 (M)",
        "accordionSubHeading": "",
        "accordionRightHeading": "",
        "accordionRightSubHeading": "",
        "userId": 1,
        "accordionData": [{}

        ],
        "editButton": "Edit",
        "deleteButton": "Delete"
      },
    ],
    "addtionalButton": "Add Burial Or Trust Agreement"
  }

  public modalData = {
    "modalTitle": "Are you sure you want to remove this record?",
    "modalContent": "If you remove this record you will need to re-enter the data to get it back.",
    "cancelButton": "Cancel",
    "continueButton": "Remove"
  }

  constructor(private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private routingStrategy: ApplyNowResourcesBurialOrTrustAgreementSummaryStrategy,
    private addroutingStrategy: ApplyNowResourcesBurialOrTrustAgreementStrategy,
    private router: Router,
    private screenQueueUtil: ScreenQueueUtil) { }

  ngOnInit(): void {
    this.service.getAppData().subscribe(d => {
      this.houseHoldDetails = this.service.getHouseHoldDetails;
      this.houseHoldPersons = this.service.getHouseHoldDetails.houseHoldPersons as IHouseHold[];
      let burialTrustAgreementDetails = { ...this.service.getHouseHoldDetails.resources?.anyoneHaveBurialORTrustAgreementWithBankORFuneralHome };
      this.burialTrustAgreementSummaryDetails['questionAnswers'] = [];
      if (this.houseHoldDetails.resources?.anyoneHaveBurialORTrustAgreementWithBankORFuneralHome?.burialAgreementCollection) {

        this.houseHoldDetails.resources?.anyoneHaveBurialORTrustAgreementWithBankORFuneralHome?.burialAgreementCollection.forEach((resource, i) => {
          let listOwnerNames: string[] = [];
          if (resource.owner && resource.owner.length > 0) {
            listOwnerNames = resource.owner?.map(owner => {
              return this.personMap.get(owner.toString()) || "";
            });
          }

          if (resource.ownerName) {
            listOwnerNames.push("Someone outside of the household")
          }
          this.burialTrustAgreementSummaryDetails['questionAnswers'][i] = {
            accordionHeader: resource.bankOrFuneralHomeName as string,
            accordionSubHeading: "",
            accordionRightHeading: "",
            accordionRightSubHeading: "",
            userId: 0,
            accordionData: [
              {
                'label': "Bank or Funeral Home Name",
                'value': <string>resource.bankOrFuneralHomeName,
                "bold": false
              },
              {
                'label': "Street Address",
                'value': <string>resource.address?.addressLine1,
                "bold": false
              }, {
                'label': "Street Address (2)",
                'value': <string>resource.address?.addressline2,
                "bold": false
              }, {
                'label': "City",
                'value': <string>resource.address?.city,
                "bold": false
              }, {
                'label': "State",
                'value': <string>resource.address?.state,
                "bold": false
              }, {
                'label': "ZIP Code",
                'value': <string>resource.address?.zip,
                "bold": false
              }, {
                'label': "What date was the burial agreement set up?",
                'value': <string>Utility.getDateInFormat(new Date(resource.dateBurialAgreementEstablished as string), DateFormatConstants.MMDDYYYY),
                "bold": false
              }, {
                'label': "Account Number",
                'value': <string>resource.accountNumber,
                "bold": false
              }, {
                'label': "Estimated Trust or Agreement Value",
                'value': <string>resource.valueOfAccount,
                "bold": false
              }, {
                'label': "Can the household withdraw money from this agreement at any time?",
                'value': <string>resource.canMoneyWithDrawnBeforeDeathOfIndividual,
                "bold": false
              }, {
                'label': "Tell us who owns this burial or trust agreement.",
                'value': this.getOwnerNames(resource.owner),
                "bold": false
              }, {
                'label': "Tell us who outside of the household owns this burial or trust agreement.",
                'value': <string>resource.ownerName ? resource.ownerName : '-',
                "bold": false
              }
            ],
            editButton: "Edit",
            deleteButton: "Delete"
          }
        });
      }


      this.jsonData = this.burialTrustAgreementSummaryDetails;
    })
  }

  public getOwnerNames(owner: number[] | undefined): string {
    let ownerName = '';
    owner?.forEach((o) => {
      const houseHoldPerson = this.houseHoldPersons.find(x => x.id === o && o !== 0);
      if (houseHoldPerson) {
        ownerName = `${ownerName} ${houseHoldPerson.firstName} ${houseHoldPerson.midName ? houseHoldPerson.midName : ""} ${houseHoldPerson.lastName},`;
      }
    });

    return ownerName.indexOf(',') > -1 ? ownerName.trim().slice(0, -1) : ownerName;
  }

  goBack() {
    this.screenQueueUtil.back();
  }

  goNext() {
    this.service.validateAllFormFields(this.burialOrTrustAgreementSummaryForm);
    if (this.burialOrTrustAgreementSummaryForm.valid) {
      this.screenQueueUtil.next();
      return true;
    }
    else {
      return false;
    }
  }

  public addBurialTrustInfo(): void {
    this.router.navigate([RoutePath.APPLYNOW + '/' +
      RoutePath.APPLYNOW_RESOURCES + '/' +
      RoutePath.APPLYNOW_RESOURCES_BURIALORTRUSTAGREEMENTDETAILS], { fragment: "new" });
  }

  public continueClicked() {
    const storedHouseholdDetails = this.houseHoldDetails;

    const resources = { ...storedHouseholdDetails.resources };
    const anyoneHaveBurialORTrustAgreementWithBankORFuneralHome = { ...resources.anyoneHaveBurialORTrustAgreementWithBankORFuneralHome };

    if (anyoneHaveBurialORTrustAgreementWithBankORFuneralHome.burialAgreementCollection && anyoneHaveBurialORTrustAgreementWithBankORFuneralHome.burialAgreementCollection.length > 0) {
      let burialDetails = [...anyoneHaveBurialORTrustAgreementWithBankORFuneralHome.burialAgreementCollection];
      burialDetails.splice(this.recordToBeOperated, 1);
      const updatedBurialDetails = [...burialDetails]
      const updatedBurialData = { ...anyoneHaveBurialORTrustAgreementWithBankORFuneralHome, ...{ burialAgreementCollection: [...updatedBurialDetails] } };
      const updatedResources = { ...resources, ...{ anyoneHaveBurialORTrustAgreementWithBankORFuneralHome: updatedBurialData } }

      if (storedHouseholdDetails)
        this.service.updateHouseHoldDetails({
          ...storedHouseholdDetails,
          ...{ resources: updatedResources },
        });

      this.jsonData["questionAnswers"].forEach((element: any) => {
        if (element["accordionRecord"] === this.recordToBeOperated) {
          element["accordionHeader"] = '';
        }
      });
    }
  }

  recordIndexToOp(recordIndex: number) {
    this.recordToBeOperated = recordIndex;
  }

  deleteClicked(userId: any) {
    this.deletedUser = userId;
  }

  public editClicked(user: any) {
    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_RESOURCES +
      '/' + RoutePath.APPLYNOW_RESOURCES_BURIALORTRUSTAGREEMENTDETAILS],
      { fragment: this.recordToBeOperated.toString() });
  }
}
