import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RoutePath } from '../shared/route-strategies';
import { GetEnrollment, MyNotices } from '../+state/models/my-notices/my-notices.model';
import { GetEnrollmentServices } from '../shared/services/my-notices/my-notices-get-enrollment.service';
// declare var $:any;

export function ConfirmEmailValidator(confirmEmailInput: string) {
    let confirmEmailControl: FormControl;
    let emailControl: FormControl;

    return (control: FormControl) => {
        if (!control.parent) {
            return null;
        }

        if (!confirmEmailControl) {
            confirmEmailControl = control;
            emailControl = control.parent.get(confirmEmailInput) as FormControl;
            emailControl.valueChanges.subscribe(() => {
                confirmEmailControl.updateValueAndValidity();
            });
        }

        if (
            emailControl.value?.toLocaleLowerCase() !==
            confirmEmailControl.value?.toLocaleLowerCase()
        ) {
            return { notMatch: true };
        }

        return null;
    };
}

@Component({
    selector: "compass-ui-my-notices",
    templateUrl: "./my-notices.component.html",
    styleUrls: ["./my-notices.component.scss"],
})
export class MyNoticesComponent implements OnInit {
    myNoticesForm: FormGroup | any;
    maxDateRange: any;
    priorDate: any;
    serviceData!: any;
    goPaperlessYes = false;
    getEmail = "";
    confirm = "";
    //myNoticesState: MyNotices | undefined;
    unEnrolledSection = false;
    enrolledSection = false;
    confirmEmailSent = false;
    display ='none';

    enrolled: any;

    service = {
        data: { test: null },
        validateAllFormFields: (form: any) => true
    } // TODO temp data
  
    constructor(
        private fb: FormBuilder,
        private route: Router,
        private services: GetEnrollmentServices
    ) {}

    ngOnInit() {
        this.services.getIsEnrolled().subscribe((response) => {
            console.warn(response);
            this.enrolled = { ...this.service.data };
            if (this.enrolled.isSuccessful === "false") {
                alert("enrolled");
                this.unEnrolledSection = false;
                this.enrolledSection = true;
            } else {
                alert("not enrolled");
                this.unEnrolledSection = true;
                this.enrolledSection = false;
            }
        });
        
        this.myNoticesForm = this.fb.group({
            isPaperless: ["", Validators.required],
            emailAddress: ["", [Validators.email]],
            confirmEmailAddress: [
                "",
                [Validators.email, ConfirmEmailValidator("emailAddress")],
            ],
        });
    }

    enableUnenroll(data:any){
        // console.log("--",data)
        this.unEnrolledSection = true;
        if (data === "unenroll"){
            document.getElementById("openModalButton")?.click();
        }
       

    }

    backToDashboard() {
        this.route.navigate([RoutePath.DASHBOARD]);
    }

    showGoPaperless() {
        this.goPaperlessYes = true;
    }
    removeGoPaperless() {
        this.goPaperlessYes = false;
    }

    GetEmail(value: string) {
        this.getEmail = value;
    }
    getConfirmEmail(value: string) {
        this.confirm = value;
    }


    isFieldValid(field: string): boolean {
        const formField = this.myNoticesForm.get(field);
        return (formField && this.myNoticesForm.get(field).status !== "VALID" && this.myNoticesForm.get(field).touched);
    }

    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }

        switch (field) {
            case "isPaperless":
                if (this.myNoticesForm.get("isPaperless").errors.required) {
                    return "Please select Notice Preference ";
                }
                break;
            case "confirmEmailAddress":
                if (this.getEmail !== this.confirm) {
                    return "Email and Confirm email should match";
                } else {
                    return "This is required";
                }
                break;
            default:
                return "";
                break;
        }
        return "";
    }

    sendEmail() {
        if (!this.goPaperlessYes) {
            this.myNoticesForm.get("emailAddress")?.setErrors(null);
            this.myNoticesForm.get("confirmEmailAddress")?.setErrors(null);
            this.myNoticesForm.patchValue({
                emailAddress: "",
                confirmEmailAddress: "",
            });
            this.myNoticesForm.updateValueAndValidity();
        }

        this.service.validateAllFormFields(this.myNoticesForm);
        if ( this.myNoticesForm.status.toLowerCase() === "valid" && this.myNoticesForm.controls.isPaperless.value === "Y") {
            alert("success email");
            this.unEnrolledSection = false;
            this.confirmEmailSent = true;
            return true;
        } else if (this.myNoticesForm.status.toLowerCase() === "valid" && this.myNoticesForm.controls.isPaperless.value === "N") {
            alert("success but no email");
            this.unEnrolledSection = true;
            this.confirmEmailSent = false;
            return true;
        } else {
            alert("Un - success email");
            this.unEnrolledSection = true;
            this.confirmEmailSent = false;
            return false;
        }
    }
}
