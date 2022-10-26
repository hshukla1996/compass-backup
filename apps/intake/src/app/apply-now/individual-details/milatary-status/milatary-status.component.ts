import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
} from "@angular/core";

import {
    FormGroup,
    FormControl,
    FormBuilder,
    FormArray,
    Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { IApplyNowState } from "../../+state/apply-now.models";
import { AppStoreService } from "../../../app-store-service";
import { RoutePath } from "../../../shared/route-strategies";
import { UtilService } from "../../../shared/services/util.service";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { ScreenQueueUtil } from "../individuals-gatepost/individuals-gatepost.paths";
import {
    IHouseHold,
    PageDirection,
    IHouseHoldDetails,
} from "../../household/household-model";
import { Observable } from 'rxjs';


@Component({
    selector: "compass-ui-milatary-status",
    templateUrl: "./milatary-status.component.html",
    styleUrls: ["./milatary-status.component.scss"],
})
export class MilataryStatusComponent implements OnInit {
    displayError: boolean = false;
    selectedUserids!: string;
    showError = false;
    milataryStatusForm: FormGroup | any;
    milataryMembertData: any[] = [];
    currentUser: IHouseHold = {};
    currentUserIndex!: string;
    militaryMap!: any;
    applyNowState: IApplyNowState | undefined;
    houseHoldPersons: IHouseHold[] = [];
    houseHoldDetails!: IHouseHoldDetails;
    veteranStatus$: Observable<any> | undefined;
    veteranStatus: any;

    constructor(
        private fb: FormBuilder,
        private route: Router,
        private service: ApplyNowStoreService,
        private activedRoute: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private utilService: UtilService,
        private appService: AppStoreService,
        private queueService: ScreenQueueUtil
    ) {
        /*  this.householdBenefitCoverage =
            householdFormDataService.householdBenefitCoverage; */
    }
    ngOnInit(): void {
        this.milataryStatusForm = this.fb.group({
            id: this.fb.array([], [Validators.required]),
        });
        this.queueService.updateForwardPath();
        this.veteranStatus$ = this.appService.getVeteranStatus();
        this.milataryStatusForm.reset();
        this.veteranStatus$?.subscribe((s) => {
            this.veteranStatus = s;
            this.cd.detectChanges();
        });

        this.milataryMembertData = this.veteranStatus;
        this.addMilataryMemberStatuToForm();

        this.houseHoldDetails = this.service.getHouseHoldDetails;
        if (this.houseHoldDetails.houseHoldPersons) {
            this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
        }
        this.militaryMap =
            {
                ...this.houseHoldDetails.pageAction?.militaryMap,
            } || {};

        this.activedRoute.params.subscribe((p) => {
            if (Object.keys(p).length == 0) {
                this.currentUserIndex =
                    this.utilService.getCurrentUserIdOnNoParams(
                        this.militaryMap
                    );
            } else {
                this.currentUserIndex = p.userId || "";
            }
            if (this.houseHoldPersons.length > 0)
                this.currentUser =
                    this.service.extractUser(
                        this.houseHoldPersons,
                        this.currentUserIndex
                    ) || "";
            this.selectedUserids = this.currentUser.veteran?.status || "";
            this.cd.detectChanges();
        });
    }
    private addMilataryMemberStatuToForm() {
        // data?.forEach(() => {
        //     if (this.individualFormArray)
        //         return this.individualFormArray.push(new FormControl());
        // });
        console.log(this.milataryMembertData);
        this.milataryMembertData.forEach(() =>
            this.milataryMemberStatusFormArray.push(new FormControl(false))
        );
    }
    get f() {
        return this.milataryStatusForm.controls;
    }
    get milataryMemberStatusFormArray(): FormArray {
        //return this.f.id as FormArray;
        return this.milataryStatusForm.controls.id as FormArray;
    }

    onCheckboxChange(e: any) {
        this.selectedUserids = e.target.value;
        this.showError = false;
        if (e.target.checked) {
            this.selectedUserids = e.target.value;
        }
    }

    onSubmit(): void {
        if (!this.selectedUserids) {
            this.showError = true;
            return;
        }
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        const storedHouseholdDetails = this.houseHoldDetails;
        const updatedHouseholdPersons =
            this.houseHoldDetails.houseHoldPersons?.map(
                (person: IHouseHold) => {
                    if (person.id === this.currentUser.id) {
                        const personToBeUpdated = { ...person };
                        if (this.selectedUserids != "1") {
                            personToBeUpdated.veteran = {
                                status: this.selectedUserids,
                            };
                        } else {
                            personToBeUpdated.veteran = {
                                ...personToBeUpdated.veteran,
                                status: this.selectedUserids,
                            };
                        }

                        return personToBeUpdated;
                    } else {
                        return person;
                    }
                }
            );
        if (storedHouseholdDetails)
            this.service.updateHouseHoldDetails({
                ...storedHouseholdDetails,
                ...{ houseHoldPersons: updatedHouseholdPersons },
            });
        if (this.selectedUserids === "1") {
            this.route.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                    "/" +
                    RoutePath.APPLYNOW_INDIVIDUAL_MILATARY_DETAILS,
                { userId: this.currentUserIndex },
            ]);
        } else {
            let isNextPage = false;
            this.militaryMap[this.currentUserIndex] = true;
            const updatedPageAction = {
                ...storedHouseholdDetails?.pageAction,
                militaryMap: {
                    ...storedHouseholdDetails?.pageAction?.militaryMap,
                    ...this.militaryMap,
                },
                militartDirection: PageDirection.NEXT,
            };
            if (storedHouseholdDetails)
                this.service.updateHouseHoldDetails({
                    ...storedHouseholdDetails,
                    ...{ pageAction: updatedPageAction },
                    ...{ houseHoldPersons: updatedHouseholdPersons },
                });
            if (this.militaryMap != null) {
                isNextPage = this.utilService.isNextPage(this.militaryMap);
            }
            if (isNextPage) {
                this.utilService

                    .getCurrentUserIdPageAction(
                        this.militaryMap,
                        PageDirection.NEXT
                    )

                    .subscribe((id: any) => {
                        this.currentUserIndex = id.toString();
                        this.milataryStatusForm.reset();
                        this.route.navigate([
                            RoutePath.APPLYNOW +
                                "/" +
                                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                                "/" +
                                RoutePath.APPLYNOW_MILATARY_STATUS,
                            { userId: this.currentUserIndex },
                        ]);
                    });

                // this.init();
            } else {
                this.route.navigate([
                    RoutePath.APPLYNOW +
                        "/" +
                        RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                        "/" +
                        RoutePath.APPLYNOW_MILATARY_SUMMARY,
                ]);
            }
        }
        // }
    }

    previous() {
        //this.router.navigate([this.routingStrategy.previousRoute()]);

        this.militaryMap[this.currentUserIndex] = false;
        const storeHouseholdDetails = this.service.getHouseHoldDetails;
        const updatedPageAction = {
            militaryMap: {
                ...storeHouseholdDetails.pageAction?.militaryMap,
                ...this.militaryMap,
            },
            militartDirection: PageDirection.NEXT,
        };

        this.service.updateHouseHoldDetails({
            ...storeHouseholdDetails,
            ...{ pageAction: updatedPageAction },
        });

        if (
            Object.keys(this.militaryMap)[0].toString() !==
            this.currentUserIndex.toString()
        ) {
            this.utilService
                .getCurrentUserIdPageAction(
                    this.militaryMap,
                    PageDirection.BACK
                )
                .subscribe((id: any) => {
                    this.currentUserIndex = id.toString();
                    this.route.navigate([
                        RoutePath.APPLYNOW +
                            "/" +
                            RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                            "/" +
                            RoutePath.APPLYNOW_MILATARY_STATUS,
                        { userId: this.currentUserIndex },
                    ]);
                });
        } else {
            this.route.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                    "/" +
                    RoutePath.APPLYNOW_CURRENT_PAST_MILATARY_MEMEBER,
            ]);
        }
    }
}
