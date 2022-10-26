import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output, Input, ChangeDetectorRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplyNowResourcesLifeInsurancePoliciesStrategy } from '../../../shared/route-strategies/apply-now/life-insurance-policies';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';
import { IHouseHold, IHouseHoldDetails } from '../../household/household-model';
import { Utility } from '../../../shared/utilities/Utility';


@Component({
  selector: 'compass-ui-life-insurance-policies',
  templateUrl: './life-insurance-policies.component.html',
  styleUrls: ['./life-insurance-policies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApplyNowResourcesLifeInsurancePoliciesStrategy]
})
export class LifeInsurancePoliciesComponent implements OnInit {

  lifeInsurancePoliciesForm: FormGroup | any;
  showVehicleOutsideDesc: boolean | undefined;
  houseHoldDetails!: IHouseHoldDetails;
  houseHoldPersons: IHouseHold[] = [];
  fragment = "0";
  public selectedUserids: string[] = [];

  public lifeInsurancePoliciesJsonData = {
    "questionText": "You told us someone owns a life insurance policy. Tell us who.",
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
  public ownerName: string = '';

  constructor(private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private routingStrategy: ApplyNowResourcesLifeInsurancePoliciesStrategy,
    private router: Router,
    private screenQueueUtil: ScreenQueueUtil,
    private activatedRoute: ActivatedRoute,) { }


  ngOnInit() {
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
          this.houseHoldDetails.resources?.anyoneHaveLifeInsurancePolicy?.insurancePolicyCollection[+this.fragment].owner?.forEach((per) => {
            this.selectedUserids.push(per as unknown as string);
          });

          this.ownerName = this.houseHoldDetails.resources?.anyoneHaveLifeInsurancePolicy?.insurancePolicyCollection[+this.fragment].ownerName as string;
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
        isChecked: this.ownerName!== undefined && this.ownerName !== null && this.ownerName !== "",
        label: "Someone Outside of the Household",
        isDisplayTextbox: true
      });
    }
  }

  someoneoutsideselected() {
    this.showVehicleOutsideDesc = !this.showVehicleOutsideDesc;
  }

  goBack() {
    this.router.navigate([this.routingStrategy.previousRoute()], { fragment: this.fragment });
  }

  goNext(event: any): void {
    const existingHouseHoldDetails = this.houseHoldDetails;
    const resources = { ...existingHouseHoldDetails.resources };
    const anyoneHaveLifeInsurancePolicy = { ...resources.anyoneHaveLifeInsurancePolicy };

    if (anyoneHaveLifeInsurancePolicy.insurancePolicyCollection && anyoneHaveLifeInsurancePolicy.insurancePolicyCollection.length > 0) {
      const insurancePolicies = [...anyoneHaveLifeInsurancePolicy.insurancePolicyCollection];
      let recentAddedResource = { ...insurancePolicies[Number(this.fragment)] };

      recentAddedResource.owner = event.selectedUserId;
      recentAddedResource.ownerName = event.name;
      insurancePolicies[Number(this.fragment)] = recentAddedResource;

      const updatedCashCollection = [...insurancePolicies]
      const updatedAnyoneHaveCash = { ...anyoneHaveLifeInsurancePolicy, ...{ insurancePolicyCollection: [...updatedCashCollection] } };
      const updatedResources = { ...resources, ...{ anyoneHaveLifeInsurancePolicy: updatedAnyoneHaveCash } }

      if (existingHouseHoldDetails)
        this.service.updateHouseHoldDetails({
          ...existingHouseHoldDetails,
          ...{ resources: updatedResources },
        });
    }

    this.router.navigate([this.routingStrategy.nextRoute()]);

  }
}

