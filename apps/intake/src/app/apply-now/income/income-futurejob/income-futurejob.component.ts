import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IApplyNowState, PageQueue } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';
import { UtilService } from '../../../shared/services/util.service';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, IHouseHoldDetails, PageDirection } from '../../household/household-model';
import { ScreenQueueUtil } from '../income-gatepost/income-gatepost.path';
import IncomeFuturejobJson from './income-futurejob.json'
//import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';

@Component({
    selector: "compass-ui-income-futurejob",
    templateUrl: "./income-futurejob.component.html",
    styleUrls: ["./income-futurejob.component.scss"],
    //providers: [ApplyNowHouseholdBenefitsStrategy],
})
export class IncomeFutureJob implements OnInit {
    jsonData: any;
    incomeFutureJobForm: FormGroup | any;
    currentEmploymentDetailsMap: any[] = [];
    applyNowState!: IApplyNowState;
    householdPersons: IHouseHold[] = [];
    houseHoldDetails!: IHouseHoldDetails;
    fragment = "new";
    selectedData: string[] = [];
    displayError: boolean = false;
    
    constructor(
        private fb: FormBuilder,
        private service: ApplyNowStoreService,
        private cd: ChangeDetectorRef,
        private router: Router,
        private utilService: UtilService,
        private activatedRoute: ActivatedRoute,
        private queueService: ScreenQueueUtil
    ) { }
    
    ngOnInit(): void {
        this.buildInitialForm();
        this.service.getAppData().subscribe(d => {
            this.applyNowState = { ...d };
            this.houseHoldDetails = this.service.getHouseHoldDetails;
            this.householdPersons = this.applyNowState.houseHoldDetails?.houseHoldPersons || [];
            this.cd.detectChanges();
        });

        this.activatedRoute.fragment.subscribe((fragment) => {
            this.fragment = fragment || "";
            if (this.fragment == "new") {
                this.selectedData = [];
            }
            if (
                typeof this.houseHoldDetails.pageAction.currentEmploymentDetailsMap === "object" &&
                this.fragment !== "new"
            ) {
                this.selectedData = Object.keys(
                    this.houseHoldDetails.pageAction.currentEmploymentDetailsMap
                );
                this.setupCheckboxFromState();
            }
        });
        
    }

    private setupCheckboxFromState() {
        let checkedList = this.householdPersons;
        let houseHold = this.applyNowState.houseHoldDetails;
        checkedList.forEach((person: any) => {
            if (houseHold?.income?.currentEmployment?.individualNumbers?.find(ele => ele === +person.id)) {
                this.IdsWithCurrentEmployment.push(new FormControl(person.id))
            }
        });
    }

    get IdsWithCurrentEmployment(): FormArray {
        return <FormArray>this.incomeFutureJobForm.controls['IdsWithCurrentEmployment'];
    }

    getIndex(value: number): number {
        return this.IdsWithCurrentEmployment.controls.findIndex(ctrl => ctrl.value == value);
    }

    onCheckboxChange(personId: number, data: any) {
        if (data.checked) {
            this.IdsWithCurrentEmployment.push(new FormControl(personId));
            this.displayError = false;
        }
        else {
            let currentEmploymentIndex = this.getIndex(personId)
            if (currentEmploymentIndex > -1) {
                this.IdsWithCurrentEmployment.removeAt(currentEmploymentIndex);
            }
        }
    }

    private buildInitialForm(): void {
        this.incomeFutureJobForm = this.fb.group({
            IdsWithCurrentEmployment: this.fb.array([]),
        })
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

    isPersonHavingCurrentEmployment(personId: number) {
        let index = this.getIndex(personId)
        if (index > -1) {
            return true;
        } else {
            return false;
        }
    }

    goNext(): void {
        this.service.validateAllFormFields(this.incomeFutureJobForm);

        const houseHoldDetails = this.applyNowState.houseHoldDetails;
        const selectedUserIds: number[] = [];
        this.incomeFutureJobForm.value.IdsWithCurrentEmployment.forEach((person: any) => {
            selectedUserIds.push(person)
        })

        if (selectedUserIds.length === 0) {
            this.displayError = true;
            return;
        }

        const existingIncome = { ...houseHoldDetails?.income };
        const currentEmploymentInfo = { ...existingIncome?.currentEmployment };

        this.utilService.sortNames(selectedUserIds, this.householdPersons, 'id').forEach((ind) => {
            if (ind) {
                this.currentEmploymentDetailsMap[ind] = false;
            }
        });

        const updatedPageAction = {
            ...houseHoldDetails.pageAction,
            currentEmploymentDetailsMap: { ...this.currentEmploymentDetailsMap },
            serviceDirection: PageDirection.NEXT
        };

        if (houseHoldDetails) {
            if (selectedUserIds.length > 0) {
                currentEmploymentInfo.code = "Yes";
                currentEmploymentInfo.individualNumbers = selectedUserIds;
                currentEmploymentInfo.endDated = "";
            } else {
                currentEmploymentInfo.code = "No";
                currentEmploymentInfo.individualNumbers = [];
                currentEmploymentInfo.endDated = "";
            }
            const updatedIncome = {
                currentEmployment: currentEmploymentInfo
            }
            this.service.updateHouseHoldDetails(
                { ...houseHoldDetails, ...{ income: updatedIncome }, ...{ pageAction: updatedPageAction } }
            )
        }

        this.fragment = "new";
        this.router.navigate([RoutePath.APPLYNOW +
                                 "/" + RoutePath.APPLYNOW_INCOME +
                                 "/" + RoutePath.APPLYNOW_INCOME_JOBDETAILS], { fragment: this.fragment });
    }

    goBack(): void {
        this.router.navigate([RoutePath.APPLYNOW +
                                "/" + RoutePath.APPLYNOW_INCOME +
                                "/" + RoutePath.APPLYNOW_INCOME_INCOMEGATEPOST]);
    }

}