import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IApplyNowState, PageQueue } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';
import { UtilService } from '../../../shared/services/util.service';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, IHouseHoldDetails, PageDirection } from '../../household/household-model';
import  IncomePastJobData from '../../income/income-pastjob/income-pastjob.json';
import { ScreenQueueUtil } from '../income-gatepost/income-gatepost.path';
//import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';


@Component({
    selector: "compass-ui-income-pastjob",
    templateUrl: "./income-pastjob.component.html",
    styleUrls: ["./income-pastjob.component.scss"],
    //providers: [ApplyNowHouseholdBenefitsStrategy],
})
export class IncomePastJob implements OnInit {
    jsonData: any;
    incomePastJobForm: FormGroup | any;
    pastEmploymentDetailsMap: any[] = [];
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
                typeof this.houseHoldDetails.pageAction.pastEmploymentDetailsMap === "object" &&
                this.fragment !== "new"
            ) {
                this.selectedData = Object.keys(
                    this.houseHoldDetails.pageAction.pastEmploymentDetailsMap
                );
                this.setupCheckboxFromState();
            }
        });
    }

    private setupCheckboxFromState() {
        let checkedList = this.householdPersons;
        let houseHold = this.applyNowState.houseHoldDetails;
        checkedList.forEach((person: any) => {
            if (houseHold?.income?.pastEmployment?.individualNumbers?.find(ele => ele === +person.id)) {
                this.IdsWithPastEmployment.push(new FormControl(person.id))
            }
        });
    }

    get IdsWithPastEmployment(): FormArray {
        return <FormArray>this.incomePastJobForm.controls['IdsWithPastEmployment'];
    }

    getIndex(value: number): number {
        return this.IdsWithPastEmployment.controls.findIndex(ctrl => ctrl.value == value);
    }

    onCheckboxChange(personId: number, data: any) {
        if (data.checked) {
            this.IdsWithPastEmployment.push(new FormControl(personId));
            this.displayError = false;
        }
        else {
            let pastEmploymentIndex = this.getIndex(personId)
            if (pastEmploymentIndex > -1) {
                this.IdsWithPastEmployment.removeAt(pastEmploymentIndex);
            }
        }
    }

    private buildInitialForm(): void {
        this.incomePastJobForm = this.fb.group({
            IdsWithPastEmployment: this.fb.array([]),
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

    isPersonHavingPastEmployment(personId: number) {
        let index = this.getIndex(personId)
        if (index > -1) {
            return true;
        } else {
            return false;
        }
    }

    goNext(): void {
        this.service.validateAllFormFields(this.incomePastJobForm);

        const houseHoldDetails = this.applyNowState.houseHoldDetails;
        const selectedUserIds: number[] = [];
        this.incomePastJobForm.value.IdsWithPastEmployment.forEach((person: any) => {
            selectedUserIds.push(person)
        })

        if (selectedUserIds.length === 0) {
            this.displayError = true;
            return;
        }

        const existingIncome = { ...houseHoldDetails?.income };
        const pastEmploymentInfo = { ...existingIncome?.pastEmployment };

        this.utilService.sortNames(selectedUserIds, this.householdPersons, 'id').forEach((ind) => {
            if (ind) {
                this.pastEmploymentDetailsMap[ind] = false;
            }
        });

        const updatedPageAction = {
            ...houseHoldDetails.pageAction,
            pastEmploymentDetailsMap: { ...this.pastEmploymentDetailsMap },
            serviceDirection: PageDirection.NEXT
        };

        if (houseHoldDetails) {
            if (selectedUserIds.length > 0) {
                pastEmploymentInfo.code = "Yes";
                pastEmploymentInfo.individualNumbers = selectedUserIds;
                pastEmploymentInfo.endDated = "";
            } else {
                pastEmploymentInfo.code = "No";
                pastEmploymentInfo.individualNumbers = [];
                pastEmploymentInfo.endDated = "";
            }
            const updatedIncome = { ...existingIncome, ...{ pastEmployment: pastEmploymentInfo } }
            this.service.updateHouseHoldDetails(
                { ...houseHoldDetails, ...{ income: updatedIncome }, ...{ pageAction: updatedPageAction } }
            )
        }

        this.fragment = "new";
        this.router.navigate([RoutePath.APPLYNOW +
            "/" + RoutePath.APPLYNOW_INCOME +
            "/" + RoutePath.APPLYNOW_INCOME_PASTJOBDETAILS], { fragment: this.fragment });
    }

    goBack(): void {
        //this.queueService.backPath();
        this.router.navigate([RoutePath.APPLYNOW +
            "/" + RoutePath.APPLYNOW_INCOME +
            "/" + RoutePath.APPLYNOW_INCOME_INCOMEGATEPOST]);
    }

}