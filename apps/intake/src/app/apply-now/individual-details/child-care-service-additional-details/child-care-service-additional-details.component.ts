import { Component, OnInit  } from "@angular/core";
import { FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {Router} from '@angular/router';
import { Store } from "@ngrx/store";
import { RoutePath } from "../../../shared/route-strategies";
@Component({
    selector: "ui-compass-child-care-service-additional-details",
    templateUrl: "./child-care-service-additional-details.component.html",
    styleUrls: ["./child-care-service-additional-details.component.css"],
})
export class ChildCareServiceAdditionalDetailsComponent implements OnInit {
    childCareAddDetailsServiceForm: FormGroup | any | null;
    data: any;
    constructor(
        private fb: FormBuilder,
        private route: Router,
        private store: Store<any>
    ) {
        this.data = this.getData();
    }
    ngOnInit() {
        this.childCareAddDetailsServiceForm = this.fb.group({
            parentOrGuardian: ["", Validators.required],
            secondParent: ["", Validators.required],
            daysNeedChildCare: ["", Validators.required],
            hrsNeedChildCare: ["", Validators.required],
            immunizations: ["", Validators.required],
        });
    }

    get f() {
        return this.childCareAddDetailsServiceForm.controls;
    }
    getData() {
        return {
            parentOrGuardian: [
                {
                    key: "parent",
                    value: "Parent",
                },
                {
                    key: "grandparent",
                    value: "Grandparent",
                },
                {
                    key: "guardian",
                    value: "Guardian",
                },
            ],

        };
    }
    onSubmit(): void {
       // console.log(this.childCareAddDetailsServiceForm.value);
      this.route.navigate([
        RoutePath.APPLYNOW +
        "/" +
        RoutePath.APPLYNOW_INDIVIDUALDETAILS +
        "/" +
        RoutePath.APPLYNOW_DEMOGRAPHIC_SUMMARY,
      ]);
    }
    previous(): void {
        this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_CITIZENSHIP,
        ]);
    }
}
