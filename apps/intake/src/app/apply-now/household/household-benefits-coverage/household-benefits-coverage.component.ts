import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HouseholdFormDataService } from '../services/household-form-data.service';
import { HouseholdHead } from '../models/householdHead';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, FormArray } from '@angular/forms';
import { ApplyNowHouseholdBenefitsCoverageStrategy } from "../../../shared/route-strategies/apply-now/householdBenefitsCoverage";
import { Router } from "@angular/router";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { HouseholdBenefitCoverage } from "../models/householdBenefitCoverage";
import { IHouseHold } from '../household-model';
import { IApplyNowState } from '../../+state/apply-now.models';
import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';

@Component({
    selector: "p-coverage",
    templateUrl: "./household-benefits-coverage.component.html",
    styleUrls: ["./household-benefits-coverage.component.scss"],
    providers: [ApplyNowHouseholdBenefitsCoverageStrategy],
})
export class HouseholdBenefitsCoverageComponent implements OnInit {
    public age: any;
    public expanded = false;
    @Output() dataUpdated = new EventEmitter<HouseholdHead>();
    householdHead!: IHouseHold;
    householdPersons: IHouseHold[] = [];
    applyNowState!: IApplyNowState;
    indexExpanded = -1;
    displayError: boolean = false;
    selectedUserids: string[] = [];
    householdBenefitCoverage: HouseholdBenefitCoverage;
    householdBenefitCoveargeForm: FormGroup | any;
    householdMembers: any[] = [];
    currentUserIndex!: string;
    error = "Please select at least one person";
    constructor(
        public householdFormDataService: HouseholdFormDataService,
        private fb: FormBuilder,
        private service: ApplyNowStoreService,
        private router: Router,
        private cd: ChangeDetectorRef,
        private queueService: ScreenQueueUtil,
        private routingStratagy: ApplyNowHouseholdBenefitsCoverageStrategy
    ) {
        this.householdBenefitCoverage =
            householdFormDataService.householdBenefitCoverage;
    }

    ngOnInit(): void {
        this.householdBenefitCoveargeForm = this.fb.group({
            id: this.fb.array([]),
        });
        this.service.getAppData().subscribe((d) => {
            this.applyNowState = { ...d };
            this.householdHead =
                this.applyNowState.houseHoldDetails?.householdHead;
            this.householdPersons =
                this.applyNowState.houseHoldDetails?.houseHoldPersons || [];
            this.householdPersons = this.householdPersons.filter(
                (person) => person.IsThisIndividualOutsideHousehold !== "Y"
            );
            //    this.selectedUserids = this.applyNowState.houseHoldDetails.selectedForCoverage;
            this.cd.detectChanges();
        });
        
        this.currentUserIndex = sessionStorage.getItem("storageId") || "";

        if (this.applyNowState.houseHoldDetails) {
            this.householdMembers = this.householdPersons;
            if (this.selectedUserids.length === 0) {
                this.applyNowState.houseHoldDetails.selectedForCoverage.forEach(
                    (ind) => {
                        if (ind) {
                            this.selectedUserids.push(ind.toString());
                        }
                    }
                );
                this.addIndividualsToForm(this.householdMembers);
            }
        }
    }
    private addIndividualsToForm(data: any) {
        data?.forEach(() => {
            if (this.individualFormArray)
                return this.individualFormArray.push(new FormControl());
        });
    }
    get f() {
        return this.householdBenefitCoveargeForm.controls;
    }
    get individualFormArray(): FormArray {
        return this.f.id as FormArray;
    }

    onCheckboxChange(e: any) {
        if (e.target.checked) {
            this.selectedUserids = this.selectedUserids.concat([
                e.target.value,
            ]);
        } else {
            for (let i = 0; i < this.selectedUserids.length; i++) {
                if (this.selectedUserids[i] === e.target.value) {
                    this.selectedUserids.splice(i, 1);
                }
            }
        }
    }

    getAge(dateString: any): any {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    onSubmit(): boolean {
        if (this.selectedUserids.length > 0) {
            const storeHouseholdDetails = this.applyNowState.houseHoldDetails;
            const householdMembers =
                this.applyNowState.houseHoldDetails.houseHoldPersons;
            let child = false;
            let parent = false;
            householdMembers?.forEach((person) => {
                if (this.selectedUserids.includes(person.id!.toString())) {
                    if (this.getAge(person.dateOfBirth) < 19) {
                        child = true;
                    } else {
                        parent = true;
                    }
                }
            });
            let sevicesselected = [
                ...(this.applyNowState?.programSelection?.programs ?? []),
            ];
            if (parent && !child) {
                sevicesselected = sevicesselected.filter((e) => e !== "HC");
                if (!sevicesselected.includes("HA")) {
                    sevicesselected.push("HA");
                }
            }
            if (child && !parent) {
                sevicesselected = sevicesselected.filter((e) => e !== "HA");
                if (!sevicesselected.includes("HC")) {
                    sevicesselected.push("HC");
                }
            }
            if (parent && child) {
                if (!sevicesselected.includes("HC")) {
                    sevicesselected.push("HC");
                }
                if (!sevicesselected.includes("HA")) {
                    sevicesselected.push("HA");
                }
            }
            this.service.updateHouseholdServicesSelected(sevicesselected);
            const updatedHouseholddetails = {
                selectedForCoverage: this.selectedUserids,
            };

            this.service.updateHouseHoldDetails({
                ...storeHouseholdDetails,
                ...updatedHouseholddetails,
            });

            this.queueService.next();

            return true;
        } else {
            this.displayError = true;
            return false;
        }
    }

    previous() {
        this.queueService.back();
    }
}
