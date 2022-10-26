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
import { ApplyNowService } from '../../../shared/services/apply-now.service';
import { Router } from '@angular/router';


@Component({
    selector: "compass-ui-right-and-responsibilities",
    templateUrl: "./right-and-responsibilities.component.html",
    styleUrls: ["./right-and-responsibilities.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RightAndResponsibilitiesComponent implements OnInit {
    serviceData!: any;
    reviewForm: FormGroup | any | null;
    applyNowState!: IApplyNowState;
    termsChecked: any;
    displayError: boolean = false;
    loading = false;
    error = "Please select the option";
    showPrintButton: boolean = false;
    constructor(private fb: FormBuilder,
        private service: ApplyNowStoreService,
        private applyNowService: ApplyNowService,
        private cd: ChangeDetectorRef,
        private router: Router) { }

    ngOnInit(): void {
        this.reviewForm = this.fb.group({
            tandc: [""],
        });
        this.service.getAppData().subscribe((d) => {
            this.applyNowState = { ...d };
            this.serviceData = this.applyNowState.gettingStartedResponse;
        });
    }

    checkTerms(value: { checked: any; }) {
        if (value.checked) {
            this.displayError = false;
            this.termsChecked = 'Y';
        } else {
            this.termsChecked = null
        }
    }

    onNext() {
        if (!this.termsChecked) {
            this.displayError = true;
            return;
        }
        let serviceData = { ...this.serviceData };
        if (serviceData.applicationInformation) {
            serviceData.applicationInformation = {
                ...serviceData.applicationInformation,
                agreedToRightsAndResponsibilities: true
            }
        } else {
            serviceData.applicationInformation = {};
            serviceData.applicationInformation.agreedToRightsAndResponsibilities = true;
        }
        this.loading = true;
        this.applyNowService
            .postSaveApplyNow(serviceData)
            .subscribe((data: any) => {
                this.loading = false;
                if (data) {
                    this.showPrintButton = true;
                }
                this.cd.detectChanges();
            });
    }

    onBack() {

    }

    print(): void {
        window.print();
    }

}