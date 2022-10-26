import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormControl,
    ReactiveFormsModule,
    FormBuilder,
    Validators,
    AbstractControl,
    FormArray
} from "@angular/forms";
import { NavigationEnd, Router } from "@angular/router";
import { RoutePath } from '../../../shared/route-strategies';
import { AppStoreService } from "../../../app-store-service";
import { ApplyNowStoreService } from "../../apply-now-store-service";


@Component({
    selector: "compass-ui-expenses-enrollment",
    templateUrl: "./expenses-enrollment.component.html",
    styleUrls: ["./expenses-enrollment.component.scss"],
})
export class ExpensesLandingComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private service: ApplyNowStoreService
    ) {}
    customerAssistanceProgramForm: FormGroup | any;
    routingStratagy: any;
    routePath: typeof RoutePath = RoutePath;
    displayError: boolean = false;
    housingAssistanceCode?: string | undefined;

    ngOnInit(): void {
        this.customerAssistanceProgramForm = this.fb.group({
            housingAssistanceCode: ["", Validators.required],
        });
    }

    previousRoute(): void {
        this.router.navigate([
            RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_EXPENSES,
        ]);
    }

    onSubmit(): boolean {
        this.service.validateAllFormFields(this.customerAssistanceProgramForm);
        if (this.customerAssistanceProgramForm.valid) {
            this.router.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_EXPENSES +
                    "/" +
                    RoutePath.APPLYNOW_EXPENSESHEATINGASSISTANCE,
            ]);
            return true;
        } else {
            this.displayError = true;
            return false;
        }
    }

    isFieldValid(field: string): boolean {
        const formField = this.customerAssistanceProgramForm.get(field);
        return (
            formField &&
            this.customerAssistanceProgramForm.get(field).status !== "VALID" &&
            this.customerAssistanceProgramForm.get(field).touched
        );
    }

    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }

        switch (field) {
            case "housingAssistanceCode":
                if (
                    this.customerAssistanceProgramForm.get(
                        "housingAssistanceCode"
                    ).errors.required
                ) {
                    return "The question is not answered.";
                }
                break;
            default:
                return "";
                break;
        }
        return "";
    }
}
