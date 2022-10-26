import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IApplyNowState } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowResourcesLifeInsurancePoliciesStrategy } from '../../../shared/route-strategies/apply-now/life-insurance-policies';
import { ApplyNowResourcesLifeInsurancePoliciesSummaryStrategy } from '../../../shared/route-strategies/apply-now/life-insurance-policies-summary';

import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, IHouseHoldDetails } from '../../household/household-model';
import { ScreenQueueUtil } from '../resources-gatepost/resources-gatepost.path';

@Component({
  selector: 'compass-ui-life-insurance-policies-summary',
  templateUrl: './life-insurance-policies-summary.component.html',
  styleUrls: ['./life-insurance-policies-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApplyNowResourcesLifeInsurancePoliciesSummaryStrategy, ApplyNowResourcesLifeInsurancePoliciesStrategy]
})
export class LifeInsurancePoliciesSummaryComponent implements OnInit {
  applyNowState!: IApplyNowState;
  jsonData: any;
  houseHoldDetails!: IHouseHoldDetails;
  howOften: any;
  recordToBeOperated!: number;
  deletedResource!: any;
  deletedUser!: any;
  houseHoldPersons: IHouseHold[] = [];
  personMap = new Map<string, string>();

  modalData = {
    modalTitle: "Are you sure you want to remove this record?",
    modalContent:
      "If you remove this record you will need to re-enter the data to get it back.",
    cancelButton: "Cancel",
    continueButton: "Remove",
  };
  financialHoldingsData = {
    "questionText": "Your Life Insurance policies.",
    "subHeading": "Review the entries to make sure everything looks correct.",
    "toolTip": "",
    "questionAnswers": [
      {
        "accordionHeader": "",
        "accordionSubHeading": "{replace} Sample 65 (M)",
        "accordionRightHeading": "",
        "accordionRightSubHeading": "",
        "accordionRecord": 1,
        "accordionData": [{}],
        "editButton": "Edit",
        "deleteButton": "Delete"
      },
    ],
    "addtionalButton": "Add Life Insurance Policy"
  }

  constructor(private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private routingStrategy: ApplyNowResourcesLifeInsurancePoliciesSummaryStrategy,
    private addroutingStrategy: ApplyNowResourcesLifeInsurancePoliciesStrategy,
    private router: Router,
    private screenQueueUtil: ScreenQueueUtil,
    private queueService: ScreenQueueUtil) { }

  ngOnInit(): void {
    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.houseHoldDetails = this.service.getHouseHoldDetails;
      if (this.houseHoldDetails.houseHoldPersons) {
        this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
        this.houseHoldPersons.forEach(person => {
          this.personMap.set(person.id?.toString() || "", person.firstName + " " + person.lastName);
        });
        if (this.houseHoldDetails.resources?.anyoneHaveLifeInsurancePolicy?.insurancePolicyCollection) {

          this.houseHoldDetails.resources?.anyoneHaveLifeInsurancePolicy?.insurancePolicyCollection.forEach((resource, i) => {

            let listOwnerNames: string[] = []; 
            let whoIsCoveredNames: string[] = [];

            if (resource.owner && resource.owner.length > 0) {
              listOwnerNames = resource.owner?.map(owner => {
                return  this.personMap.get(owner.toString()) || "";
              });
            }

            if (resource.individualsCovered && resource.individualsCovered.length > 0) {
              whoIsCoveredNames = resource.individualsCovered?.map(owner => {
                return this.personMap.get(owner.toString()) || "";
              });
            }

            if (resource.ownerName) {
              listOwnerNames.push("Someone outside of the household")
            }

            if (resource.otherPolicyHolderName) {
              whoIsCoveredNames.push("Someone outside of the household")
            }

            this.financialHoldingsData['questionAnswers'][i] = {
              accordionHeader: resource.companyName as string,
              accordionSubHeading: '',
              accordionRightHeading: '',
              accordionRightSubHeading: '',
              accordionRecord: i,
              accordionData: [
                {
                  'label': "Life Insurance Provider",
                  'value': resource.companyName,
                  "bold": false
                },
                {
                  'label': "Policy Number",
                  'value': <string>resource.policyNumber,
                  "bold": false
                },
                {
                  'label': "Policy Face Value",
                  'value': <string>resource.policyFaceValue,
                  "bold": false
                },
                {
                  'label': "Policy Current Cash Value",
                  'value': <string>resource.currentCashValue,
                  "bold": false
                },
                {
                  'label': "You told us someone owns a life insurance policy. Tell us who.",
                  'value': listOwnerNames.filter(x =>  x!== "").join(", "),
                  "bold": false
                },
                {
                  'label': "Tell us who outside of the household owns this life insurance policy.",
                  'value': resource.ownerName ? resource.ownerName : '-',
                  "bold": false
                },
                {
                  'label': "Who is covered by the policy?",
                  'value': whoIsCoveredNames.filter(x => x !== "").join(",  "),
                  "bold": false
                },
                {
                  'label': "Tell us who outside of the household who is covered by policy.",
                  'value': resource.otherPolicyHolderName ? resource.otherPolicyHolderName : '-',
                  "bold": false
                }
              ],
              editButton: "Edit",
              deleteButton: "Remove"
            }
          });

        }
        this.jsonData = this.financialHoldingsData;
      }
      this.cd.detectChanges();
    });
  }

  recordIndexToOp(recordIndex: number) {
    this.recordToBeOperated = recordIndex;
  }

  deleteClicked(userId: any) {
    this.deletedUser = userId;
  }

  continueClicked() {
    const storedHouseholdDetails = this.houseHoldDetails;

    const resources = { ...storedHouseholdDetails.resources };
    const anyoneHaveLifeInsurancePolicy = { ...resources.anyoneHaveLifeInsurancePolicy };

    if (anyoneHaveLifeInsurancePolicy.insurancePolicyCollection && anyoneHaveLifeInsurancePolicy.insurancePolicyCollection.length > 0) {
      let insurancePolicies = [...anyoneHaveLifeInsurancePolicy.insurancePolicyCollection];
      insurancePolicies.splice(this.recordToBeOperated, 1);
      const updatedLifeInsurancePolicyCollection = [...insurancePolicies]
      const updatedLifeInsurancePolicy = { ...anyoneHaveLifeInsurancePolicy, ...{ insurancePolicyCollection: [...updatedLifeInsurancePolicyCollection] } };
      const updatedResources = { ...resources, ...{ anyoneHaveLifeInsurancePolicy: updatedLifeInsurancePolicy } }

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

  addClicked() {
    this.router.navigate([RoutePath.APPLYNOW +
      "/" + RoutePath.APPLYNOW_RESOURCES +
      "/" + RoutePath.APPLYNOW_RESOURCES_LIFEINSURANCEPOLICYDETAILS
    ], { fragment: "new" });

  }

  editClicked(userId: any) {
    this.router.navigate([
      RoutePath.APPLYNOW +
      "/" + RoutePath.APPLYNOW_RESOURCES +
      "/" + RoutePath.APPLYNOW_RESOURCES_LIFEINSURANCEPOLICYDETAILS
    ],
      { fragment: this.recordToBeOperated.toString() });
  }

  back(): void {
    this.router.navigate([
      RoutePath.APPLYNOW +
      "/" + RoutePath.APPLYNOW_RESOURCES +
      "/" + RoutePath.APPLYNOW_RESOURCES_COVEREDINDIVIDUALS
    ]);
  }

  next(): void {
    this.queueService.next();
  }
}
