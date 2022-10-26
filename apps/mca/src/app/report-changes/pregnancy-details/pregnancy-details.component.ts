import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Utility } from "../../shared/utilities/Utility";
import { IIndividualInformation } from "../../+state/models/change-report/change-report.model";
import { ChangeReportStoreService } from "../../+state/store-service/change-report-store.service";
import { RoutePath } from "../../shared/route-strategies";
import { ReportChangesService } from "../report-changes.service";

@Component({
    selector: "compass-ui-pregnancy-details",
    templateUrl: "./pregnancy-details.component.html",
    styleUrls: ["./pregnancy-details.component.scss"],
})
export class PregnancyDetailsComponent implements OnInit {
    numbers = [1, 2, 3, 4,5];
    today = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
    individualInformations!: IIndividualInformation[] | any;
    formGroupObj: any = {};
    employeeCount = 0;
    constructor(private router: Router, private fb: FormBuilder,
        private reportChangesService: ReportChangesService, private storeService: ChangeReportStoreService) {}

    ngOnInit(): void {
        this.individualInformations = this.storeService.getIndividualInformation();
        this.individualInformations.forEach((element: IIndividualInformation, index: number) => {
            if(element.age > 9 && element.age < 60 && element.gender === 'F') {
                const formGroup = this.fb.group({
                    numberOfExpectedChildren: ['', [Validators.required]],
                    pregnancyDueDate: ['', [Validators.required]],
                });
                formGroup.get('numberOfExpectedChildren')?.setValue(element.pregnancy?.numberOfExpectedChildren);
                formGroup.get('pregnancyDueDate')?.patchValue(Utility.duetFormatDate(element.pregnancy?.pregnancyDueDate));
                this.formGroupObj[index] = formGroup;
                this.employeeCount += 1;
            }
        });
    }

    next() {
        let invalidGroups = 0;
        for (let formGroup in this.formGroupObj) {
            this.reportChangesService.validateAllFormFields(this.formGroupObj[formGroup]);
            if (!this.formGroupObj[formGroup].valid) {
                invalidGroups += 1;
            }
        }
        if (invalidGroups === 0) {
            const infos = this.individualInformations.map((indInfo: IIndividualInformation, index: number) => {
                return this.formGroupObj[index] ? {
                    ...indInfo,
                    pregnancy: {
                        pregnancyDueDate: this.formGroupObj[index].get('pregnancyDueDate').value,
                        numberOfExpectedChildren: this.formGroupObj[index].get('numberOfExpectedChildren').value,
                    }
                } : indInfo;
            });
            this.storeService.updateIndividualInformation(infos); 
            this.reportChangesService.navigateToNextHouseholdChange('PREGNANCY_DETAILS');
        }
    }

    back() {
        this.router.navigate([RoutePath.PREGNANCY_OTHER_HOUSEHOLD])
    }

    errorMap(field: string, index: number) {
        const form = this.formGroupObj[index];
        if (!this.isFieldValid(field, index)) {
            return ''

        }
        switch (field) {
            case "numberOfExpectedChildren":
                if (form.get(field).errors?.required) {
                    return "No option is selected from the dropdown";
                }
                break;
            case "pregnancyDueDate":
                if (form.get(field).errors?.required) {
                    return "No date is entered";
                }
                if (form.get(field).errors?.duetInvalidDate) {
                    return "duetInvalidDate"
                }
                break;
            }
        return "";
    }

    isFieldValid(field: string, index: number): boolean {
        return (this.formGroupObj[index]?.get(field).status !== 'VALID' && (this.formGroupObj[index]?.get(field).dirty || this.formGroupObj[index]?.get(field).touched));
    }
}
