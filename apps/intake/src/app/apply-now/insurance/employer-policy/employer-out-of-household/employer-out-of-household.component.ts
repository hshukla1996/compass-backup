import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { PageQueueService } from "apps/intake/src/app/shared/services/page-queue.service";
import { PageQueueName } from "../../../+state/apply-now.models";
import { PageQueueOneConfig, PageQueueTWOConfig } from "../../model/insurance-page-queue.util";
import { InsuranceStoreService } from "../../model/insurance-store.service";

@Component({
    selector: "compass-ui-employer-out-of-household",
    templateUrl: "./employer-out-of-household.component.html",
    styleUrls: ["./employer-out-of-household.component.scss"],
})
export class EmployerOutOfHouseholdComponent implements OnInit {
    outofHouseholdOnformationForm: FormGroup | any;
    validationObj = {} as any
    keys = {} as any
    constructor(private fb: FormBuilder, private storeService: InsuranceStoreService,private pq:PageQueueService) { }

    ngOnInit(): void {
        const controls = this.outofHouseholdOnformationForm.controls
        this.keys = Object.keys(controls);
        this.pq.configQueue(PageQueueTWOConfig)
    }
    next() {
        this.outofHouseholdOnformationForm.markAllAsTouched();
        const isValid = this.outofHouseholdOnformationForm.valid;
      
        if (!isValid) {
            return;
        }
        let user =
            {
                otherIndividualFirstName: '',
                otherIndividualLastName: '',
                otherIndividualSocialSecurityNumber: ''
            } as any
        this.keys.forEach((key: string) => {
            user[key.toString()] = this.outofHouseholdOnformationForm.controls[key].value;

        });

        this.storeService.updateEmployerOutsideOfHousehold(user);
        this.pq.next();

    }
    back() {
        this.pq.back();
    }
}
