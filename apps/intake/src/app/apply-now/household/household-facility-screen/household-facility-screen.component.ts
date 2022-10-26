import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { IApplyNowState } from '../../+state/apply-now.models';
import { AppStoreService } from '../../../app-store-service';

import { ApplyNowHouseholdFacilityScreenStrategy } from '../../../shared/route-strategies/apply-now/household-facility-screen';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IhoseholdTypeofFacility, IHouseHold, IHouseHoldDetails } from '../household-model';
import { BehaviorSubject, delay, first, of, Subscription } from 'rxjs';
import { IHousehold } from '../../../referrals/+state/contact-information-model';
import { UtilService } from '../../../shared/services/util.service';
import { PageDirection } from "../../../referrals/+state/referrals.models";
import { NgStyle } from '@angular/common';

@Component({
    selector: "compass-ui-household-facility-screen",
    templateUrl: "./household-facility-screen.component.html",
    styleUrls: ["./household-facility-screen.component.scss"],
    providers: [ApplyNowHouseholdFacilityScreenStrategy],
})
export class HouseholdFacilityScreenComponent implements OnInit {
    householdFacilityScreenForm: FormGroup | any;
    facility: any;
    applyNowState!: IApplyNowState;
    detail!: IHouseHoldDetails;
    data: any;
    currentUser: IHouseHold = {};
    currentFacilityUser!: any;
    householdMembers: IHouseHold[] = [];
    currentServicesMap: any;
    currentUserIndex!: any;
    headFirstName: string | undefined;
    householdWhoApplyLtc: any;
    householdFacilityMembers: IhoseholdTypeofFacility[] = [];

    constructor(
        private fb: FormBuilder,
        private service: ApplyNowStoreService,
        private utilService: UtilService,
        private cd: ChangeDetectorRef,
        private activatedRoute: ActivatedRoute,
        private appService: AppStoreService,
        private routingStrategy: ApplyNowHouseholdFacilityScreenStrategy,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.householdFacilityScreenForm = this.fb.group({
            typeofnursingHome: ["", Validators.required],
        });
        this.service.getAppData().subscribe((d) => {
            this.applyNowState = { ...d };
            this.data = this.applyNowState.metaData;
            this.detail = this.applyNowState
                ?.houseHoldDetails as IHouseHoldDetails;

            this.currentServicesMap =
                {
                    ...this.applyNowState.houseHoldDetails.pageAction
                        ?.nursingHomeMap,
                } || {};

            if (this.applyNowState.houseHoldDetails) {
                this.headFirstName =
                    this.applyNowState.houseHoldDetails.householdHead.firstName;
                this.householdMembers = [
                    this.applyNowState.houseHoldDetails.householdHead,
                ].concat(
                    this.applyNowState.houseHoldDetails?.houseHoldPersons || []
                );
            }
        });
    }
    
    ngAfterViewInit(): void {
        this.appService.getTypeofFacility().subscribe((facility: any[]) => {
            this.facility = facility;
            this.cd.detectChanges();
        });
        this.activatedRoute.params.subscribe((p) => {
            if (Object.keys(p).length === 0) {
                if (this.utilService.isFirstRoute(this.currentServicesMap)) {
                    this.currentUserIndex = Object.keys(
                        this.currentServicesMap
                    )[0];
                } else if (
                    this.utilService.isLastRoute(this.currentServicesMap)
                ) {
                    this.currentUserIndex = Object.keys(
                        this.currentServicesMap
                    )[Object.keys(this.currentServicesMap).length - 1];
                }
            } else {
                this.currentUserIndex = p.userId || "";
            }
    
            this.currentUser =
                this.extractUser(
                    this.householdMembers,
                    this.currentUserIndex
                ) || "";
                if (this.currentUser) {
                    this.householdFacilityScreenForm.patchValue({
                        typeofnursingHome: this.currentUser.householdTypeOfFacility ? this.currentUser.householdTypeOfFacility!.typeofnursingHome : ''
                    });
                }
    
            this.cd.detectChanges();
        });
    
    }

    extractUser(persons: any, userId: any) {
        const currentUser = persons.filter((person: IHouseHold) => {
            return person.id?.toString() === userId.toString();
        })[0];
        return currentUser;
    }

    goBack() {
        this.currentServicesMap[this.currentUserIndex] = false;
        const storeHouseholdDetails = this.applyNowState.houseHoldDetails;
        const updatedPageAction = {
            ...storeHouseholdDetails.pageAction,
            nursingHomeMap: {
                ...storeHouseholdDetails.pageAction?.nursingHomeMap,
                ...this.currentServicesMap,
            },

            serviceDirection: PageDirection.BACK,
        };
        this.service.updateHouseHoldDetails({
            ...storeHouseholdDetails,
            ...{ pageAction: updatedPageAction },
        });

        if (
            Object.keys(this.currentServicesMap)[0].toString() !==
            this.currentUserIndex.toString()
        ) {
            this.utilService
                .getCurrentUserIdPageAction(
                    this.currentServicesMap,
                    PageDirection.BACK
                )

                .subscribe((id: any) => {
                    this.currentUserIndex = id.toString();
                    this.router.navigate([
                        this.routingStrategy.currentRoute,
                        { userId: this.currentUserIndex },
                    ]);
                });

        } else {
            this.router.navigate([this.routingStrategy.previousRoute()]);
        }
    }

    isFieldValid(field: string): boolean {
        return (
            this.householdFacilityScreenForm.get(field).status !== "VALID" &&
            (this.householdFacilityScreenForm.get(field).dirty ||
                this.householdFacilityScreenForm.get(field).touched)
        );
    }

    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }

        switch (field) {
            case "typeofnursingHome":
                if (
                    this.householdFacilityScreenForm.get("typeofnursingHome")
                        .errors?.required
                ) {
                    return "No type of nursing home/facility is selected from the dropdown";
                }
                break;
        }
        return "";
    }

    goNext(): boolean {
        this.service.validateAllFormFields(this.householdFacilityScreenForm);
        this.currentServicesMap[this.currentUserIndex] = true;
        if (this.householdFacilityScreenForm.status.toLowerCase() === "valid") {
            const storedHouseholdDetails = this.applyNowState?.houseHoldDetails;
            const updatedPageAction = {
                ...storedHouseholdDetails.pageAction,
                nursingHomeMap: {
                    ...storedHouseholdDetails.pageAction?.nursingHomeMap,
                    ...this.currentServicesMap,
                },
                serviceDirection: PageDirection.NEXT,
            };
            const updatedHouseholdFacility = {
                typeofnursingHome:
                    this.householdFacilityScreenForm.controls[
                        "typeofnursingHome"
                    ].value
            };
            if (updatedHouseholdFacility.typeofnursingHome === "2") {
                this.service.updateHouseholdServicesSelected(["LI"]);
            } else {
                this.service.updateHouseholdServicesSelected(["LN"]);
            }
            const updatedHouseHoldPersonArray =
                storedHouseholdDetails?.houseHoldPersons?.map(
                    (person: IHouseHold) => {
                        if (person.id === this.currentUser.id) {
                            const personToBeUpdated = { ...person };
                            personToBeUpdated.householdTypeOfFacility =
                                updatedHouseholdFacility;
                            return personToBeUpdated;
                        } else {
                            return person;
                        }
                    }
                );

            const updatedHouseholdDetails = {
                ...storedHouseholdDetails,
                pageAction: updatedPageAction,
            };

            if (storedHouseholdDetails) {
                this.service.updateHouseHoldDetails({
                    ...updatedHouseholdDetails,
                    ...{ houseHoldPersons: updatedHouseHoldPersonArray },
                });
            }
            let isNextPage = false;
            this.currentServicesMap[this.currentUserIndex] = true;

            if (this.currentServicesMap != null) {
                isNextPage = this.utilService.isNextPage(
                    this.currentServicesMap
                );
            }
            if (isNextPage) {
                this.utilService
                    .getCurrentUserIdPageAction(
                        this.currentServicesMap,
                        PageDirection.NEXT
                    )
                    .subscribe((id: any) => {
                        this.currentUserIndex = id.toString();
                        this.router.navigate([
                            this.routingStrategy.currentRoute,

                            { userId: this.currentUserIndex },
                        ]);
                    });

                this.householdFacilityScreenForm.reset();
            } else {
                //Next to pagequeue
                this.router.navigate([this.routingStrategy.nextRoute()]);
            }

            return true;
        } else {
            return false;
        }
    }
    previous() {
        this.router.navigate([this.routingStrategy.previousRoute()]);
    }
}
