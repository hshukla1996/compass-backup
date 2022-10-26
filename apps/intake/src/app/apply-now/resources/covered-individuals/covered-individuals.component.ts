import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplyNowResourcesCoveredIndividualsStrategy } from '../../../shared/route-strategies/apply-now/resources-covered-individuals';
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, IHouseHoldDetails } from '../../household/household-model';

@Component({
  selector: 'compass-ui-covered-individuals',
  templateUrl: './covered-individuals.component.html',
  styleUrls: ['./covered-individuals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApplyNowResourcesCoveredIndividualsStrategy]
})
export class CoveredIndividualsComponent implements OnInit {
  coveredIndividualsForm: FormGroup | any;

  houseHoldDetails!: IHouseHoldDetails;
  houseHoldPersons: IHouseHold[] = [];
  fragment = "0";
  public selectedUserids: string[] = [];
  public lifeInsurancePoliciesJsonData = {
    "questionText": "Who is covered by the policy?",
    "subHeading": "Select all that apply.",
    "toolTip": "",
    "isRequired": true,
    "requiredText": "You must select an option.",
    "questionAnswers": [{
      "id": 1,
      "label": "",
      "isChecked": false,
      "isDisplayTextbox": false
    }]
  };
  public textboxValidators = [Validators.maxLength(26), Validators.pattern('^[a-zA-Z]*$')];
  public otherPolicyHolderName: string = '';


  constructor(private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private routingStrategy: ApplyNowResourcesCoveredIndividualsStrategy,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.service.getAppData().subscribe(d => {
      this.houseHoldDetails = this.service.getHouseHoldDetails;
      if (this.houseHoldDetails.houseHoldPersons) {
        this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
      }
    });

    this.activatedRoute.fragment.subscribe((fragment) => {
      const resourcesCnt = this.houseHoldDetails.resources?.anyoneHaveLifeInsurancePolicy?.insurancePolicyCollection?.length || 0
      this.fragment = fragment || (resourcesCnt > 0 ? (resourcesCnt - 1).toString() : "");
      if (this.fragment !== "" && this.fragment !== null) {
        if (this.houseHoldDetails.resources?.anyoneHaveLifeInsurancePolicy?.insurancePolicyCollection) {
          this.houseHoldDetails.resources?.anyoneHaveLifeInsurancePolicy?.insurancePolicyCollection[+this.fragment].individualsCovered?.forEach((per) => {
            this.selectedUserids.push(per as unknown as string);
          });

          this.otherPolicyHolderName = this.houseHoldDetails.resources?.anyoneHaveLifeInsurancePolicy?.insurancePolicyCollection[+this.fragment].otherPolicyHolderName as string;
          this.setFormValues();
        }
        else {
          this.setFormValues();
        }
      }
    });
  }

  private setFormValues() {
    this.lifeInsurancePoliciesJsonData.questionAnswers = [];
    this.houseHoldPersons.forEach((person) => {
      this.lifeInsurancePoliciesJsonData.questionAnswers.push({
        id: person.id as unknown as number,
        isChecked: this.selectedUserids && this.selectedUserids.length > 0 ? this.selectedUserids.findIndex(x => +x === person.id) > -1 : false,
        label: Utility.getLabelText(person),
        isDisplayTextbox: false
      })
    });

    const isDisplayTextboxExists = this.lifeInsurancePoliciesJsonData.questionAnswers.find(x => x.isDisplayTextbox === true);
    if (!isDisplayTextboxExists) {
      this.lifeInsurancePoliciesJsonData.questionAnswers.push({
        id: 0,
        isChecked: this.otherPolicyHolderName !== undefined && this.otherPolicyHolderName !== null && this.otherPolicyHolderName !== "",
        label: "Someone Outside of the Household",
        isDisplayTextbox: true
      });
    }
  }

  goBack() {
    this.router.navigate([this.routingStrategy.previousRoute()], { fragment: this.fragment });
  }

  goNext(event: any) {
    const existingHouseHoldDetails = this.houseHoldDetails;
    const resources = { ...existingHouseHoldDetails.resources };
    const anyoneHaveLifeInsurancePolicy = { ...resources.anyoneHaveLifeInsurancePolicy };

    if (anyoneHaveLifeInsurancePolicy.insurancePolicyCollection && anyoneHaveLifeInsurancePolicy.insurancePolicyCollection.length > 0) {
      const insurancePolicies = [...anyoneHaveLifeInsurancePolicy.insurancePolicyCollection];
      let recentAddedResource = { ...insurancePolicies[Number(this.fragment)] };

      recentAddedResource.individualsCovered = event.selectedUserId;
      recentAddedResource.otherPolicyHolderName = event.name;
      insurancePolicies[Number(this.fragment)] = recentAddedResource;

      const updatedInsurancePoliciesCollection = [...insurancePolicies]
      const updatedInsurancePolicies = { ...anyoneHaveLifeInsurancePolicy, ...{ insurancePolicyCollection: [...updatedInsurancePoliciesCollection] } };
      const updatedResources = { ...resources, ...{ anyoneHaveLifeInsurancePolicy: updatedInsurancePolicies } }

      if (existingHouseHoldDetails)
        this.service.updateHouseHoldDetails({
          ...existingHouseHoldDetails,
          ...{ resources: updatedResources },
        });
    }

    this.router.navigate([this.routingStrategy.nextRoute()]);
  }
}
