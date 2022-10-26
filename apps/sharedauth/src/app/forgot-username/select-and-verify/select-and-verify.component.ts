import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
    selector: "compass-ui-select-and-verify",
    templateUrl: "./select-and-verify.component.html",
    styleUrls: ["./select-and-verify.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectAndVerifyComponent implements OnInit, OnDestroy {
    constructor(
        private fb: FormBuilder,
        private router: Router
    ) {}

    selectAndVerifyGroup!: FormGroup
    emailWrong = false
    eformWrong = false
    mciWrong = false
    ssnWrong = false
    ssnError = false
    largeImage1 = false;
    largeImage2 = false;
    emailMaxL = 60
    eformMinL = 7
    eformMaxL = 13
    mciMinL = 9
    mciMaxL = 10
    verifyMethods = [
        { id: 0, displayValue: "sa_forgotuserSAVlbl1"},
        { id: 1, displayValue: "sa_forgotuserSAVlbl2"},
        { id: 2, displayValue: "sa_forgotuserSAVlbl3"},
        { id: 3, displayValue: "sa_forgotuserSAVlbl4"}
    ]
    changeSub!: Subscription

    get entryEmail() {
        return parseInt(this.selectAndVerifyGroup.get("verifyMethod")?.value) == this.verifyMethods[0].id;
    }
    get entryEForm(): boolean {
        return this.selectAndVerifyGroup.get("verifyMethod")?.value == this.verifyMethods[1].id;
    }
    get entryMCI(): boolean {
        return this.selectAndVerifyGroup.get("verifyMethod")?.value == this.verifyMethods[2].id;
    }
    get entrySSN(): boolean {
        return this.selectAndVerifyGroup.get("verifyMethod")?.value == this.verifyMethods[3].id;
    }

    ngOnInit(): void {
        this.selectAndVerifyGroup = this.fb.group({
            verifyMethod: ["", Validators.required],
            email: ["", [Validators.required, Validators.email, Validators.maxLength(this.emailMaxL)]],
            eformNumber: ["", [Validators.required, Validators.minLength(this.eformMinL), Validators.maxLength(this.eformMaxL)]],
            mciMedEbt: ["", [Validators.required, Validators.minLength(this.mciMinL), Validators.maxLength(this.mciMaxL)]],
            ssn: ["", Validators.required]
        })
        this.changeSub = this.selectAndVerifyGroup.get("verifyMethod")!.valueChanges.subscribe(change => {
            this.changeConnectMethod()
        })
        this.selectAndVerifyGroup.get("email")?.disable()
        this.selectAndVerifyGroup.get("eformNumber")?.disable()
        this.selectAndVerifyGroup.get("mciMedEbt")?.disable()
        this.selectAndVerifyGroup.get("ssn")?.disable()

        // TODOAM8 load data (if needed)
    }
    ngOnDestroy(): void {
        this.changeSub.unsubscribe()
    }

    enlargeImage1() {
        if (this.largeImage1) {
          this.largeImage1 = false;
        }
        else {
          this.largeImage1 = true;
        }
    }
    
    enlargeImage2() {
    if (this.largeImage2) {
        this.largeImage2 = false;
    }
    else {
        this.largeImage2 = true;
    }
    }

    ssnValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value) {
                return (this.ssnError) ? { ssnError: true } : null
            }
            return null
        }
    }

    changeConnectMethod() {
        let value = this.selectAndVerifyGroup.get("verifyMethod")!.value
        switch(parseInt(value)) {
            case this.verifyMethods[0].id: {
                this.switchToEmail();
                break;
            }
            case this.verifyMethods[1].id: {
                this.switchToEForm();
                break;
            }
            case this.verifyMethods[2].id: {
                this.switchToMCI();
                break;
            }
            case this.verifyMethods[3].id: {
                this.switchToSSN();
                break;
            }
            default: {
                console.log("defaulted")
            }
        }
    }

    switchToEmail(): void {
        this.selectAndVerifyGroup.get("email")?.enable()
        this.selectAndVerifyGroup.get("eformNumber")?.disable()
        this.selectAndVerifyGroup.get("mciMedEbt")?.disable()
        this.selectAndVerifyGroup.get("ssn")?.disable()
    }

    switchToSSN(): void {
        this.selectAndVerifyGroup.get("email")?.disable()
        this.selectAndVerifyGroup.get("eformNumber")?.disable()
        this.selectAndVerifyGroup.get("mciMedEbt")?.disable()
        this.selectAndVerifyGroup.get("ssn")?.enable()
    }

    switchToMCI(): void {
        this.selectAndVerifyGroup.get("email")?.disable()
        this.selectAndVerifyGroup.get("eformNumber")?.disable()
        this.selectAndVerifyGroup.get("mciMedEbt")?.enable()
        this.selectAndVerifyGroup.get("ssn")?.disable()
    }

    switchToEForm(): void {
        this.selectAndVerifyGroup.get("email")?.disable()
        this.selectAndVerifyGroup.get("eformNumber")?.enable()
        this.selectAndVerifyGroup.get("mciMedEbt")?.disable()
        this.selectAndVerifyGroup.get("ssn")?.disable()
    }


    isFieldInvalid(field: string): boolean {
        let control = this.selectAndVerifyGroup.get(field)!
        switch (field) {
            case "ssn": if (this.ssnError || this.ssnWrong) return control.touched; break
            case "mciMedEbt": if (this.mciWrong) return control.touched; break
            case "email": if (this.emailWrong) return control.touched; break
            case "eformNumber": if (this.eformWrong) return control.touched; break
        }
        return !control.valid && control.touched
    }

    errorMap(field: string): string {
        let control = this.selectAndVerifyGroup.get(field)!
        switch(field) {
            case "email": {
                if (control.errors?.required) {
                    return "sa_ERRrequired"
                }
                if (control.errors?.email) {
                    return "sa_ERRinvalidEmail"
                }
                if (this.emailWrong) {
                    return "sa_ERRfieldWrong"
                }
                return ""
            }
            case "mciMedEbt": {
                if (control.errors?.required) {
                    return "sa_ERRrequired"
                }
                if (control.errors?.minlength) {
                    return "sa_ERRminLength"
                }
                if (this.mciWrong) {
                    return "sa_ERRfieldWrong"
                }
                return ""
            }
            case "ssn": {
                if (control.errors?.required) {
                    return "sa_ERRrequired"
                }
                if (control.errors?.ssnError) {
                    return control.errors?.ssnError
                }
                if (this.ssnWrong) {
                    return "sa_ERRfieldWrong"
                }
                return ""
            }
            case "eformNumber": {
                if (control.errors?.required) {
                    return "sa_ERRrequired"
                }
                if (control.errors?.minlength) {
                    return "sa_ERRminLength"
                }
                if (this.eformWrong) {
                    return "sa_ERRfieldWrong"
                }
                return ""
            }
            default: return ""
        }
    }

    back(): void {
        // navigate TODOAM8 go back to compass home page
    }

    submit(): void {
        // touch all fields
        this.selectAndVerifyGroup.markAllAsTouched()
        // check if valid
        if (!this.selectAndVerifyGroup.valid) return
        // prevent user from submitting input when shown as invalid
        if (this.entrySSN && this.ssnWrong) return 
        if (this.entryEmail && this.emailWrong) return
        if (this.entryMCI && this.mciWrong) return
        if (this.entryEForm && this.eformWrong) return
        
        // check if input is valid TODOAM8 mark either emailWrong = true, ssnWrong = true, mciWrong = true, or eformWrong = true depending on incorrect input
            // use the get entry###() methods to determine which is currently selected

        // navigate TODOAM8
    }
}
