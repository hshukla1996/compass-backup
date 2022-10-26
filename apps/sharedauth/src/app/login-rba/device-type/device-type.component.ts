import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: "compass-ui-device-type",
    templateUrl: "./device-type.component.html",
    styleUrls: ["./device-type.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceTypeComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private router: Router
    ) {}

    deviceTypeGroup!: FormGroup

    ngOnInit(): void {
        this.deviceTypeGroup = this.fb.group({
            deviceType: ["", Validators.required]
        })
    }

    isFieldInvalid(field: string): boolean {
        let control = this.deviceTypeGroup.get(field)!
        return !control.valid && control.touched
    }

    errorMap(field: string): string {
        let control = this.deviceTypeGroup.get(field)!
        if (control.valid) return ""
        switch(field) {
            case "deviceType": {
                if (control.errors?.required) {
                    return "sa_ERRrequired"
                }
                return ""
            }
            default: return ""
        }
    }

    submit(): void {
        // touch all fields
        this.deviceTypeGroup.markAllAsTouched()
        // check if valid
        if (!this.deviceTypeGroup.valid) return
        
        // save data TODOAM3

        // navigate TODOAM3 go to terms and conditions if user doesn't have COMPASS citizen role. Otherwise, go to MCA dashbord
    }
}
