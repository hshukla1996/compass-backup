import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ca } from "date-fns/locale";
import { Subscription } from "rxjs";

@Component({
    selector: "compass-ui-connect-case",
    templateUrl: "./connect-case.component.html",
    styleUrls: ["./connect-case.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectCaseComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private router: Router
    ) {}

    connectCaseGroup!: FormGroup
    recordControls!: FormGroup
    ufiControls!: FormGroup
    eformControls!: FormGroup
    connectMethods = [
        { id: 1, displayValue: "sa_registerCCoption1"},
        { id: 2, displayValue: "sa_registerCCoption2"},
        { id: 3, displayValue: "sa_registerCCoption3"},
    ]
    counties = [{ id: 1, displayValue: "test"}]
    crMaxL = 7
    ssnMinMaxL = 11
    chipMinMaxL = 9
    mciMaxL = 10
    mciMinL = 9
    eformMinL = 7
    eformMaxL = 13
    passwordMinL = 8
    passwordMaxL = 14
    ssnError: boolean = true
    changeSub!: Subscription
    largeImage1 = false;
    largeImage2 = false;

    get entrySSN(): boolean {
        return this.connectCaseGroup.get("connectMethod")?.value == this.connectMethods[0].id;
    }
    get entryUFI(): boolean {
        return this.connectCaseGroup.get("connectMethod")?.value == this.connectMethods[1].id;
    }
    get entryEForm(): boolean {
        return this.connectCaseGroup.get("connectMethod")?.value == this.connectMethods[2].id;
    }

    ngOnInit(): void {
        this.recordControls = this.fb.group({
            county: ["", Validators.required],
            caseRecord: ["", [Validators.required, Validators.maxLength(this.crMaxL)]],
            ssn: ["", [Validators.required, this.ssnValidator()]]
        })
        this.ufiControls = this.fb.group({
            chipIdUfi: ["", [Validators.required, Validators.minLength(this.chipMinMaxL), Validators.maxLength(this.chipMinMaxL)]],
            mciMedEbt: ["", [Validators.required, Validators.minLength(this.mciMinL), Validators.maxLength(this.mciMaxL)]],
        })
        this.eformControls = this.fb.group({
            eformNumber: ["", [Validators.required, Validators.minLength(this.eformMinL), Validators.maxLength(this.eformMaxL)]],
            password: ["", Validators.required]
        })
        let recordControls = this.recordControls
        let ufiControls = this.ufiControls
        let eformControls = this.eformControls
        this.connectCaseGroup = this.fb.group({
            connectMethod: ["", Validators.required],
            recordControls,
            ufiControls,
            eformControls
        })
        this.changeSub = this.connectCaseGroup.get("connectMethod")!.valueChanges.subscribe(change => {
            this.changeConnectMethod()
        })

        this.connectCaseGroup.get("recordControls")?.disable()
        this.connectCaseGroup.get("ufiControls")?.disable()
        this.connectCaseGroup.get("eformControls")?.disable()

        // TODOAM load data and counties
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
            if (!!control.value) {
                return (this.ssnError) ? { ssnError: true } : null
            }
            return null
        }
    }

    changeConnectMethod() {
        let value = this.connectCaseGroup.get("connectMethod")!.value
        switch(parseInt(value)) {
            case this.connectMethods[0].id: {
                this.switchToSSN();
                break;
            }
            case this.connectMethods[1].id: {
                this.switchToUFI();
                break;
            }
            case this.connectMethods[2].id: {
                this.switchToEForm();
                break;
            }
            default: {
                console.log("defaulted")
            }
        }
    }

    changeToSSN(): void {
        this.connectCaseGroup.get("connectMethod")!.patchValue(this.connectMethods[0].id)
    }
    changeToUFI(): void {
        this.connectCaseGroup.get("connectMethod")!.patchValue(this.connectMethods[1].id)
    }

    switchToSSN(): void {
        this.connectCaseGroup.get("recordControls")?.enable()
        this.connectCaseGroup.get("ufiControls")?.disable()
        this.connectCaseGroup.get("eformControls")?.disable()
    }

    switchToUFI(): void {
        this.connectCaseGroup.get("recordControls")?.disable()
        this.connectCaseGroup.get("ufiControls")?.enable()
        this.connectCaseGroup.get("eformControls")?.disable()
    }

    switchToEForm(): void {
        this.connectCaseGroup.get("recordControls")?.disable()
        this.connectCaseGroup.get("ufiControls")?.disable()
        this.connectCaseGroup.get("eformControls")?.enable()
    }

    isFieldInvalid(field: string): boolean {
        let control : AbstractControl;
        switch(field) {
            case "caseRecord":
            case "county":
            case "ssn" : {
                control = this.recordControls.get(field)!
                break;
            }
            case "chipIdUfi":
            case "mciMedEbt" : {
                control = this.ufiControls.get(field)!
                break;
            }
            case "eformNumber":
            case "password" : {
                control = this.eformControls.get(field)!
                break;
            }
            case "connectMethod": {
                control = this.connectCaseGroup.get(field)!
            }
        }
        if (field == "ssn") return (this.ssnError || !control!.valid) && control!.touched;
        else return !control!.valid && control!.touched;
    }

    errorMap(field: string): string {
        switch (field) {
            case "connectMethod": {
                if (this.connectCaseGroup.get(field)?.errors?.required) {
                    return "sa_ERRrequired"
                }
                return ""
            }
            case "county": {
                if (this.recordControls.get(field)?.errors?.required) {
                    return "sa_ERRrequired"
                }
                return ""
            }
            case "caseRecord": {
                if (this.recordControls.get(field)?.errors?.required) {
                    return "sa_ERRrequired"
                }
                return ""
            }
            case "ssn": {
                if (this.recordControls.get(field)?.errors?.required) {
                    return "sa_ERRrequired"
                }
                return ""
            }

            case "chipIdUfi": {
                if (this.ufiControls.get(field)?.errors?.required) {
                    return "sa_ERRrequired"
                }
                if (this.ufiControls.get(field)?.errors?.minlength) {
                    return "sa_ERRminLength"
                }
                return ""
            }
            case "mciMedEbt": {
                if (this.ufiControls.get(field)?.errors?.required) {
                    return "sa_ERRrequired"
                }
                if (this.ufiControls.get(field)?.errors?.minlength) {
                    return "sa_ERRminLength"
                }
                return ""
            }

            case "eformNumber": {
                if (this.eformControls.get(field)?.errors?.required) {
                    return "sa_ERRrequired"
                }
                if (this.eformControls.get(field)?.errors?.minlength) {
                    return "sa_ERRminLength"
                }
                return ""
            }
            case "password": {
                if (this.eformControls.get(field)?.errors?.required) {
                    return "sa_ERRrequired"
                }
                if (this.eformControls.get(field)?.errors?.pattern) {
                    if (this.eformControls.get(field)?.value.length < this.passwordMinL) return "sa_ERRminLength"
                    else return "sa_ERRinvalidPassword";
                }
                return ""
            }
            default: return "";
        }
    }

    back(): void {
        // navigate TODOAM go back to security questions probably
    }

    next(): void {
        // touch all fields
        this.connectCaseGroup.markAllAsTouched();
        // check if valid
        if (!this.connectCaseGroup.valid) return;
        // submit data TODOAM

        // navigate TODOAM
    }

    toLogin(): void {
        this.router.navigate(["/"]) // TODOAM go to login
    }
}
