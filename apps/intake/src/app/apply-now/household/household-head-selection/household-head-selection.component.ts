import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from "@angular/core";
import { HouseholdFormDataService } from "../services/household-form-data.service";

import {
    FormGroup,
    FormControl,
    ReactiveFormsModule,
    FormBuilder,
    FormArray,
} from "@angular/forms";
import { ApplyNowHouseholdHeadSelectionStrategy } from "../../../shared/route-strategies/apply-now/householdHeadSelection";
import { Router } from "@angular/router";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { HouseholdBenefitCoverage } from "../models/householdBenefitCoverage";
import { IHouseHold } from "../household-model";
import { IApplyNowState } from "../../+state/apply-now.models";
import HouseholdHeadSelectionData from '../../household/household-head-selection/household-head-selection.json';
import { RoutePath } from '../../../shared/route-strategies';

@Component({
    selector: "compass-ui-household-head-selection",
    templateUrl: "./household-head-selection.component.html",
    styleUrls: ["./household-head-selection.component.scss"],
    providers: [ApplyNowHouseholdHeadSelectionStrategy],
})
export class HouseholdHeadSelectionComponent implements OnInit {
    public age: any;
    public expanded = false;
    householdHead!: IHouseHold;
    householdPersons: IHouseHold[] = [];
    applyNowState!: IApplyNowState;
    indexExpanded = -1;
    displayError: boolean = false;
    selectedUserids: string = "";
    // householdBenefitCoverage: HouseholdBenefitCoverage;
    householdHeadSelectionForm: FormGroup | any;
    householdMembers: any[] = [];
    error = "Please select at least one person";
    memberCount!: number;
    householdHeadonly: boolean = false;
    householdHeadSelectionJsonData: any;
    selectedHouseholdId: any;
    constructor(
        public householdFormDataService: HouseholdFormDataService,
        private fb: FormBuilder,
        private service: ApplyNowStoreService,
        private router: Router,
        private cd: ChangeDetectorRef,
        private routingStrategy: ApplyNowHouseholdHeadSelectionStrategy
    ) {
        /*  this.householdBenefitCoverage =
             householdFormDataService.householdBenefitCoverage; */
    }
    ngOnInit(): void {
        this.householdHeadSelectionForm = this.fb.group({
            id: this.fb.array([]),
            householdHeadSelection: "",
        });
        this.service.getAppData().subscribe(d => {
            this.applyNowState = { ...d };
            this.householdHead = this.applyNowState.houseHoldDetails?.householdHead;
            this.householdPersons = this.applyNowState.houseHoldDetails?.houseHoldPersons || [];

            this.cd.detectChanges();
        });
        if (this.applyNowState.houseHoldDetails) {
            this.householdMembers = this.householdPersons;
            //     console.log("householdmembers",this.householdMembers)
            //     console.log("headof household", this.applyNowState.houseHoldDetails)
            //   this.selectedUserids = this.applyNowState.houseHoldDetails.Household.HeadofHousehold || ""

            this.selectedUserids = this.applyNowState.houseHoldDetails.HeadofHousehold;
            this.addIndividualsToForm(this.householdMembers)
        }
        this.memberCount = 0;
        for (let data of this.householdPersons) {
            this.memberCount = this.memberCount + 1
        }
        this.cd.detectChanges();
        if (this.memberCount <= 1) {
            this.householdHeadonly = true;
            this.selectedUserids = this.householdMembers[0].id.toString();
        }
        else {
            this.householdHeadonly = false;
        }
    }

    private addIndividualsToForm(data: any) {
        data?.forEach(() => {
            if (this.individualFormArray)
                return this.individualFormArray.push(new FormControl());
        });
    }
    get f() {
        return this.householdHeadSelectionForm.controls;
    }
    get individualFormArray(): FormArray {
        return this.f.id as FormArray;
    }

    onCheckboxChange(e: any) {
        this.selectedHouseholdId = e.target.value;
        this.selectedUserids = e.target.value;
        if (e.target.checked) {
            this.selectedUserids = e.target.value
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

    public showNextPage(selectedUserids: any) {
        this.selectedUserids = selectedUserids;
        console.log(this.selectedUserids)
        this.router.navigate([this.routingStrategy.nextRoute()]);
    }

    public showPreviousPage() {
        this.router.navigate([this.routingStrategy.previousRoute()]);
    }

    onSubmit(): boolean {
        if (this.selectedUserids.length > 0) {
          
            if (this.memberCount >= 1) {

                const storeHouseholdDetails = this.applyNowState.houseHoldDetails;
                const updatedHouseholddetails = {
                    householdHeadSelection: this.selectedUserids,
                };
                const storedHouseHold = storeHouseholdDetails.Household;
                const updatedHouseholdHead = {
                    ...storedHouseHold, HeadofHousehold: this.selectedUserids,
                };
                this.selectedHouseholdId = this.selectedUserids;
                const updatedHouseholdPersons = storeHouseholdDetails.houseHoldPersons?.map((person: IHouseHold) => {
                    const updatedPerson = { ...person }
                    if (updatedPerson.id === parseInt(this.selectedHouseholdId)) {
                        updatedPerson.isThisIndividualHeadOfHousehold = 'Y'
                        return updatedPerson;
                    }
                    else {
                        return person;
                    }
                });
                if (storeHouseholdDetails) {
                    this.service.updateHouseHoldDetails(
                        { ...storeHouseholdDetails, ...{ houseHoldPersons: updatedHouseholdPersons }, ...updatedHouseholdHead, ...updatedHouseholddetails }
                    )
                }

                if (this.memberCount === 1) {
                    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDLTCNURSING])
                }
                else {

                    this.router.navigate([this.routingStrategy.nextRoute()]);

                }
                return true;
            }
            else {
                if (this.memberCount === 1) {
                    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDLTCNURSING])
                }
                else {

                    this.router.navigate([this.routingStrategy.nextRoute()]);

                }
                return true;
            }
        }
        else {
            this.displayError = true;
            return false;
        }

    }

    previous() {
        this.router.navigate([this.routingStrategy.previousRoute()]);
    }
}
