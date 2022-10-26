import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AppStoreService } from "../../../app-store-service";
import { MenuItemState } from '../../../shared/menu-item-state';
import { RoutePath } from '../../../shared/route-strategies';
import { delay, first, of, Subscription } from "rxjs";
import { Utility } from '../../../shared/utilities/Utility';
import { IApplyNowState } from '../../+state/apply-now.models';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";


@Component({
    selector: "compass-ui-notification-preferences",
    templateUrl: "./notification-preferences.component.html",
    styleUrls: ["./notification-preferences.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationPreferencesComponent implements OnInit {
    notificationPreferencesForm: FormGroup | any | null;
    applyNowState!: IApplyNowState;
    langPreference = "1";
    applicationLanguages!: any[];
    displayError = false;
    displayError1 = false;
    haveRead: any;
    renewal: any;
    verification: any;
    childcare: any;
    maincontact: any;
    updateemail: any;
    applicationNumber: any;
    textMessage = "N";
    emailMessage = "N";
    afsNotificationPreferences = {
        "applicationNumber": "12345",
        "caseNumber": "0",
        "languageCode": "2",
        "optInIndicator": "Y",
        "renewalNoticeOptInIndicator": "Y",
        "verificationNoticeOptInIndicator": "Y",
        "childCareSmsOptInIndicator": "Y",
        "childCareEmailOptInIndicator": "Y",
        "mobileNumber": "7327634572",
        "updateMainContact": true,
        "emailAddress": "test2@gmail.com",
        "updateEmail": null,
        "consentIndicator": true
    };

    constructor(
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private appService: AppStoreService,
        private service: ApplyNowStoreService,
        private http: HttpClient
        ) {}

    ngOnInit(): void {
        this.notificationPreferencesForm = this.fb.group({
            language: [""],
            receiveText: [""],
            renewal: [""],
            verification: [""],
            childcare: [""],
            mobileNumber: ["", Utility.phoneNumberValidator()],
            haveRead: [""],
            mainContact: [""],
            recieveEmail: [""],
            email: [""],
            updateEmail: [""]
        });
        this.appService.getApplicationLanguage().subscribe((c) => {
            this.applicationLanguages = c;
            this.cd.detectChanges();
        });
        this.service.getAppData().subscribe(d => {
            this.applyNowState = { ...d };
            this.applicationNumber = this.applyNowState.gettingStartedResponse.id;
            this.applicationNumber = this.applicationNumber.toString();
        });
        this.http.post<any>('/api/myaccount/notificationpreference/getnotificationpreference', 
            {"applicationNumber": this.applicationNumber, "caseNumber": ""}).subscribe({
            next: data => {
                this.afsNotificationPreferences = data;
                this.notificationPreferencesForm.patchValue({
                    language: this.afsNotificationPreferences.languageCode,
                    receiveText: this.afsNotificationPreferences.optInIndicator,
                    mobileNumber: this.afsNotificationPreferences.mobileNumber,
                    recieveEmail: this.afsNotificationPreferences.childCareEmailOptInIndicator,
                    email: this.afsNotificationPreferences.emailAddress
                });
                this.textMessage = this.afsNotificationPreferences.optInIndicator;
                this.emailMessage = this.afsNotificationPreferences.childCareEmailOptInIndicator;
                this.cd.detectChanges();
                console.log("get data", data)
            },
            error: error => {
                console.log("get error " + error.message);
            }
        });

        this.notificationPreferencesForm.get('language').valueChanges.subscribe((drop: any) => {
            this.langPreference = drop;
        });

        this.notificationPreferencesForm.get('receiveText').valueChanges.subscribe((text: any) => {
            this.textMessage = text;
        });

        this.notificationPreferencesForm.get('recieveEmail').valueChanges.subscribe((email: any) => {
            this.emailMessage = email;
        });
        
        this.haveRead = this.afsNotificationPreferences.consentIndicator ? "Y" : "N";
        this.renewal = this.afsNotificationPreferences.renewalNoticeOptInIndicator ? "Y" : "N";
        this.verification = this.afsNotificationPreferences.verificationNoticeOptInIndicator ? "Y" : "N";
        this.childcare = this.afsNotificationPreferences.childCareEmailOptInIndicator ? "Y" : "N";
        this.maincontact = this.afsNotificationPreferences.updateMainContact ? "Y" : "N";
        this.updateemail = this.afsNotificationPreferences.updateEmail ? "Y" : "N";
    }

    isFieldValid(field: string): boolean {
        return (
            this.notificationPreferencesForm.get(field).status !== "VALID" &&
            (this.notificationPreferencesForm.get(field).dirty ||
                this.notificationPreferencesForm.get(field).touched)
        );
    }

    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }
        switch (field) {
            case "language":
                if (
                    this.notificationPreferencesForm.get("language").errors.required
                ) {
                    return "This is required";
                }
                break;
            case "mobileNumber":
                if (this.notificationPreferencesForm.get("mobileNumber").errors.required) {
                    return "This is required";
                }
                if (this.notificationPreferencesForm.get("mobileNumber").errors.invalidNumber) {
                    return "Please enter 10 digit phone number";
                }
                break;
            default:
                return "";
                break;
        }
        return "";
    }

    OnlyNumberAllowed(event: { which: any; keyCode: any }): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    checkRead(value: { checked: any; }) {
        if (value.checked) {
            this.haveRead = 'Y';
            this.displayError = false;
        } else {
            this.haveRead = null
            this.displayError = true;
        }
    }

    checkContact(value: { checked: any; }) {
        if (value.checked) {
            this.maincontact = 'Y';
        } else {
            this.maincontact = null
        }
    }

    checkEmail(value: { checked: any; }) {
        if (value.checked) {
            this.updateemail = 'Y';
        } else {
            this.updateemail = null
        }
    }

    onEventChange(check: any) {
        if (check.checked) {
            if (check.id === 'renewal') {
                this.renewal = "Y";
            }
            if (check.id === 'verification') {
                this.verification = "Y";
            }
            if (check.id === 'childcare') {
                this.childcare = "Y";
            }
            this.displayError1 = false;
        }
        else {
            if (check.id === 'renewal') {
                this.renewal = null;
            }
            if (check.id === 'verification') {
                this.verification = null;
            }
            if (check.id === 'childcare') {
                this.childcare = null;
            }
            if (!(this.renewal || this.verification ||  this.childcare)) {
                this.displayError1 = true;
            }
        }
    }

    back() {

    }

    next() {
        this.service.validateAllFormFields(this.notificationPreferencesForm);
        if (!this.haveRead && !(this.renewal || this.verification || this.childcare)) {
            this.displayError = true;
            this.displayError1 = true;
            return;
        }
        else if (!this.haveRead) {
            this.displayError = true;
            this.displayError1 = false;
            return;
        }
        else if (!(this.renewal || this.verification || this.childcare)) {
            this.displayError1 = true;
            this.displayError = false;
            return;
        }
        if (!this.notificationPreferencesForm.valid) return;
        let updatedNotificationPreferences = {
            "applicationNumber": this.applicationNumber,
            "caseNumber": null,
            "languageCode": this.notificationPreferencesForm.get('language').value,
            "optInIndicator": this.notificationPreferencesForm.get('receiveText').value,
            "renewalNoticeOptInIndicator": this.renewal,
            "verificationNoticeOptInIndicator": this.verification,
            "childCareSmsOptInIndicator":  this.childcare,
            "childCareEmailOptInIndicator": this.notificationPreferencesForm.get('recieveEmail').value,
            "mobileNumber": this.notificationPreferencesForm.get('mobileNumber').value,
            "updateMainContact": (this.maincontact === 'Y') ? true : false,
            "emailAddress": this.notificationPreferencesForm.get('email').value,
            "updateEmail": (this.updateemail === 'Y') ? true : false,
            "consentIndicator": (this.haveRead === 'Y') ? true : false
        }
        this.http.post<any>('/api/myaccount/notificationpreference/submitnotificationpreference', 
            updatedNotificationPreferences).subscribe({
            next: data => {
                console.log("submit data", data)
            },
            error: error => {
                console.log("submit error " + error.message);
            }
        });
    }
}