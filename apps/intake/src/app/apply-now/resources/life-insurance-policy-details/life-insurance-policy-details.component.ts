import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output, Input, ChangeDetectorRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { ApplyNowResourcesLifeInsurancePolicyDetailsStrategy } from '../../../shared/route-strategies/apply-now/life-insurance-policy-details';
import { of, delay } from 'rxjs';
import { ScreenQueueUtil } from '../resources-gatepost/resources-gatepost.path';
import { IHouseHold, IHouseHoldDetails, ILifeInsurancePolicy, ILifeInsurancePolicyDetails, IResources } from '../../household/household-model';
import { IApplyNowState } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';


@Component({
    selector: "compass-ui-life-insurance-policy-details",
    templateUrl: "./life-insurance-policy-details.component.html",
    styleUrls: ["./life-insurance-policy-details.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ApplyNowResourcesLifeInsurancePolicyDetailsStrategy],
})
export class LifeInsurancePolicyDetailsComponent implements OnInit {
    householdPersons: IHouseHold[] = [];
    applyNowState!: IApplyNowState;
    houseHoldDetails!: IHouseHoldDetails;

    submitted = false;
    fragment = "new";

    lifeInsuranceDetailsForm: FormGroup = this.fb.group({
        anyotherowners: new FormControl(""),
        insurancecompanyname: new FormControl(""),
        policynumber: new FormControl(""),
        policyfacevalue: new FormControl(""),
        currentcashvalue: new FormControl(""),
    });

    constructor(
        private fb: FormBuilder,
        private service: ApplyNowStoreService,
        private cd: ChangeDetectorRef,
        private routingStrategy: ApplyNowResourcesLifeInsurancePolicyDetailsStrategy,
        private screenQueueUtil: ScreenQueueUtil,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.lifeInsuranceDetailsForm = this.fb.group({
            anyotherowners: ["", [Validators.maxLength(120)]],
            policynumber: ["", [Validators.maxLength(12)]],
            policyfacevalue: ["", [Validators.maxLength(9)]],
            currentcashvalue: ["", [Validators.maxLength(9)]],
        });

        this.service.getAppData().subscribe((d) => {
            this.applyNowState = { ...d };
            this.houseHoldDetails = this.service.getHouseHoldDetails;
            this.householdPersons = this.applyNowState.houseHoldDetails?.houseHoldPersons || [];
            this.cd.detectChanges();
        });

        this.activatedRoute.fragment.subscribe((fragment) => {
            this.fragment = fragment || "new";
            if (this.fragment !== "new") {
                of(true).pipe(delay(10)).subscribe(() => {
                    let cashResources = this.houseHoldDetails.resources?.anyoneHaveLifeInsurancePolicy?.insurancePolicyCollection
                    if (cashResources && cashResources.length > 0) {
                        this.lifeInsuranceDetailsForm.patchValue({
                            anyotherowners: cashResources[parseInt(this.fragment)].companyName,
                            policynumber: cashResources[parseInt(this.fragment)].policyNumber,
                            policyfacevalue: cashResources[parseInt(this.fragment)].policyFaceValue,
                            currentcashvalue: cashResources[parseInt(this.fragment)].currentCashValue,
                        });
                    }
                });
            }
        });
    }

    goBack() {
        this.screenQueueUtil.back();
    }

    goNext() {
        if (this.lifeInsuranceDetailsForm.valid) {
            let fragmentToAddDetails = 0;
            const existingLifeInsuranceResourceDetails = { ...this.houseHoldDetails.resources?.anyoneHaveLifeInsurancePolicy };

            let updatedLifeInsuranceResource: ILifeInsurancePolicy;
            let updatedResources: IResources;

            if (this.fragment === "new") {
                const listOfInsurancePolicy = [] as ILifeInsurancePolicyDetails[]
                let cash: ILifeInsurancePolicyDetails = {};
                cash.companyName = this.lifeInsuranceDetailsForm.get('anyotherowners')?.value;
                cash.policyFaceValue = this.lifeInsuranceDetailsForm.get('policyfacevalue')?.value;
                cash.currentCashValue = this.lifeInsuranceDetailsForm.get('currentcashvalue')?.value;
                cash.policyNumber = this.lifeInsuranceDetailsForm.get('policynumber')?.value;
                listOfInsurancePolicy.push(cash);

                updatedLifeInsuranceResource = {
                    ...existingLifeInsuranceResourceDetails,
                    ...{ code: "Yes" },
                    ...{ insurancePolicyCollection: [...existingLifeInsuranceResourceDetails.insurancePolicyCollection || [], ...listOfInsurancePolicy] }
                };

                updatedResources = { ...this.houseHoldDetails.resources, ...{ anyoneHaveLifeInsurancePolicy: updatedLifeInsuranceResource } };

                fragmentToAddDetails = updatedResources.anyoneHaveLifeInsurancePolicy?.insurancePolicyCollection ?
                    (updatedResources.anyoneHaveLifeInsurancePolicy.insurancePolicyCollection.length) - 1 : 0

            } else {

                let existingResources = [] as ILifeInsurancePolicyDetails[];
                if (existingLifeInsuranceResourceDetails && existingLifeInsuranceResourceDetails.insurancePolicyCollection && existingLifeInsuranceResourceDetails.insurancePolicyCollection.length > 0) {
                    existingResources = [...existingLifeInsuranceResourceDetails.insurancePolicyCollection];
                    existingLifeInsuranceResourceDetails.insurancePolicyCollection.forEach((resource, i) => {
                        if (i === parseInt(this.fragment)) {
                            resource = {
                                ...resource, ...{
                                    companyName: this.lifeInsuranceDetailsForm.get('anyotherowners')?.value,
                                    policyFaceValue: this.lifeInsuranceDetailsForm.get('policyfacevalue')?.value,
                                    currentCashValue: this.lifeInsuranceDetailsForm.get('currentcashvalue')?.value,
                                    policyNumber: this.lifeInsuranceDetailsForm.get('policynumber')?.value
                                }
                            };

                            existingResources.splice(parseInt(this.fragment), 1, resource);
                        }
                    })
                }

                updatedLifeInsuranceResource = { ...existingLifeInsuranceResourceDetails, ...{ insurancePolicyCollection: [...existingResources] } };

                updatedResources = { ...this.houseHoldDetails.resources, ...{ anyoneHaveLifeInsurancePolicy: updatedLifeInsuranceResource } };
                fragmentToAddDetails = parseInt(this.fragment);

            }

            if (this.houseHoldDetails) {
                this.service.updateHouseHoldDetails(
                    { ...this.houseHoldDetails, ...{ resources: updatedResources } }
                )
            }

            this.router.navigate([RoutePath.APPLYNOW +
                '/' + RoutePath.APPLYNOW_RESOURCES +
                '/' + RoutePath.APPLYNOW_RESOURCES_LIFEINSURANCEPOLICIES],
                { fragment: fragmentToAddDetails.toString() });
        }
    }
}