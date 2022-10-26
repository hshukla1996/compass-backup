import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { State as AppState } from './../../../+state';
import { AppPageActions } from "../../../+state/actions";
import { Observable } from "rxjs";
import * as AppSelectors from './../../../+state/app.selectors';
import { ActivatedRoute, Router } from "@angular/router";
import { AppStoreService } from "../../../app-store-service";
import { UtilService } from "../../../shared/services/util.service";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { IApplyNowState } from "../../+state/apply-now.models";
import { IHouseHoldDetails, IHouseHold, ICash } from "../../household/household-model";
import { RoutePath } from "../../../shared/route-strategies";
import { ApplyNowFinancialHoldingsDetailsStrategy } from "../../../shared/route-strategies/apply-now/financialholdings-details";
import { ScreenQueueUtil } from "../resources-gatepost/resources-gatepost.path";


@Component({
    selector: "compass-ui-financial-holdings-details",
    templateUrl: "./financial-holdings-details.component.html",
    styleUrls: ["./financial-holdings-details.component.scss"],
    providers: [ApplyNowFinancialHoldingsDetailsStrategy],
})
export class FinancialHoldingsDetailsComponent implements OnInit {

    resourceTypes$: Observable<any> | undefined;
    resourceTypes: any;
    financialHoldingsDetailsForm: FormGroup | any | null;
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    applyNowState: IApplyNowState | undefined;
    fragment = "new";

    constructor(
        private service: ApplyNowStoreService,
        private route: Router,
        private appService: AppStoreService,
        private activatedRoute: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private utilService: UtilService,
        private appstore: Store<AppState>,
        private fb: FormBuilder,
        private routingStrategy: ApplyNowFinancialHoldingsDetailsStrategy,
        private queueService: ScreenQueueUtil,
        private router: Router,

    ) {

    }

    ngOnInit(): void {
        this.financialHoldingsDetailsForm = this.fb.group({
            resourceType: [""],
            otherResource: [""],
            location: [""],
            accountNumber: [""],
            value: [""],
        });

        this.appstore.dispatch(AppPageActions.getResourceTypes());
        this.resourceTypes$ = this.appstore.select(AppSelectors.getResourceTypes);
        this.resourceTypes$?.subscribe((s) => {
            this.resourceTypes = s;
            this.cd.detectChanges();
        });

        this.service.getAppData().subscribe(d => {
            this.applyNowState = { ...d };
            this.houseHoldDetails = this.service.getHouseHoldDetails;
            if (this.houseHoldDetails.houseHoldPersons) {
                this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
            }
        });

        this.activatedRoute.fragment.subscribe((fragment) => {
            this.fragment = fragment || "new";
            if (this.fragment !== "new") {
                this.setFormValues(this.fragment);
            }
        }); 
        


    }

    setFormValues(fragment: any) {

        if (
            this.houseHoldDetails?.resources?.anyoneHaveCash &&
            this.houseHoldDetails?.resources.anyoneHaveCash.cashCollection
            && this.houseHoldDetails?.resources.anyoneHaveCash.cashCollection[fragment]
        ) {
            this.financialHoldingsDetailsForm.patchValue(
                this.houseHoldDetails.resources.anyoneHaveCash.cashCollection[fragment]
            );
        }
    }
    private updateCashDetail(recentCashDetail: ICash): ICash {
        recentCashDetail.resourceType = this.financialHoldingsDetailsForm.get("resourceType").value;
        recentCashDetail.otherResource = this.financialHoldingsDetailsForm.get("otherResource").value;
        recentCashDetail.location = this.financialHoldingsDetailsForm.get("location").value.toString();
        recentCashDetail.value = this.financialHoldingsDetailsForm.get("value").value;
        recentCashDetail.accountNumber = this.financialHoldingsDetailsForm.get("accountNumber").value;
        return recentCashDetail;
    }


    goBack(): void {
        this.queueService.back();
    }

    goNext(): boolean {
        this.service.validateAllFormFields(this.financialHoldingsDetailsForm);

        if (this.financialHoldingsDetailsForm.valid) {

            let nextPageFragment = "0";
            const existingHouseHoldDetails = this.houseHoldDetails;
            const resources = { ...existingHouseHoldDetails.resources };
            let anyoneHaveCash = { ...resources.anyoneHaveCash };
            let cashDetails = anyoneHaveCash.cashCollection || [];
            let recentCashDetail: ICash;
            let updatedResources;

            if (this.fragment === "new") {
                recentCashDetail = {};
                recentCashDetail = this.updateCashDetail(recentCashDetail);
                cashDetails = [...cashDetails, ...[recentCashDetail]]
            } else {
                cashDetails = cashDetails.map((detail, i) => {
                    if (i === parseInt(this.fragment)) {
                        recentCashDetail = { ...detail };
                        recentCashDetail = this.updateCashDetail(recentCashDetail);
                        return { ...recentCashDetail };
                    } else {
                        return { ...detail }
                    }
                });
            }

            anyoneHaveCash = { ...anyoneHaveCash, ...{ code: "Yes" }, ...{ cashCollection: [...cashDetails] } }
            updatedResources = { ...resources, ...{ anyoneHaveCash: anyoneHaveCash } }

            if (existingHouseHoldDetails)
                this.service.updateHouseHoldDetails({
                    ...existingHouseHoldDetails,
                    ...{ resources: updatedResources },
                });

            if (this.fragment === "new" && cashDetails.length > 0) {
                nextPageFragment = (cashDetails.length - 1).toString();
            } else {
                nextPageFragment = this.fragment;
            }

            this.router.navigate([this.routingStrategy.nextRoute()], { fragment: nextPageFragment });

            return true;
        }
        else {
            return false;
        }

    }
}
