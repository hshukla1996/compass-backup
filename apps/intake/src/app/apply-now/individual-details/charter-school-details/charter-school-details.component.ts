import { ChangeDetectorRef, Component, OnInit  } from "@angular/core";
import { FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { Store } from "@ngrx/store";
import { IApplyNowState } from "../../+state/apply-now.models";
import { AppStoreService } from "../../../app-store-service";
import { RoutePath } from "../../../shared/route-strategies";
import { UtilService } from "../../../shared/services/util.service";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import {IHouseHold, IHouseHoldDetails, PageDirection} from "../../household/household-model";

@Component({
    selector: "ui-compass-charter-school-details",
    templateUrl: "./charter-school-details.component.html",
    styleUrls: ["./charter-school-details.component.css"],
})
export class CharterSchoolDetailsComponent implements OnInit {
    charterSchoolDetailsForm: FormGroup | any | null;
    data: any;
    currentUser: IHouseHold = {};
    currentUserIndex!: string;
    nslpMap!: any;
    counties!: any;
    applyNowState: IApplyNowState | undefined;
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    constructor(
        private fb: FormBuilder,
        private route: Router,
        private service: ApplyNowStoreService,
        private activedRoute: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private utilService: UtilService,
        private appService: AppStoreService
    ) {
        this.data = this.getData();
    }
    ngOnInit() {
        this.charterSchoolDetailsForm = this.fb.group({
            school: [""],
        });
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        if (this.houseHoldDetails.houseHoldPersons) {
            this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
        }
            this.nslpMap =
                {
                    ...this.houseHoldDetails.pageAction?.nslpMap,
                } || {};

        this.activedRoute.params.subscribe((p) => {
            if (Object.keys(p).length == 0) {
                this.currentUserIndex =
                    this.utilService.getCurrentUserIdOnNoParams(this.nslpMap);
            } else {
                this.currentUserIndex = p.userId || "";
            }
            if (this.houseHoldPersons.length > 0)
                this.currentUser =
                    this.service.extractUser(
                        this.houseHoldPersons,
                        this.currentUserIndex
                    ) || "";
            setTimeout(() => {
                this.charterSchoolDetailsForm.patchValue({
                    school: this.currentUser?.education
                        ?.charterOrPrivateSchoolName,
                });
            }, 500);
            this.cd.detectChanges();
        });
    }

    get f() {
        return this.charterSchoolDetailsForm.controls;
    }
    getData() {
        return {
            schoolsLists: [
                {
                    key: "school1",
                    value: "School 1",
                },
                {
                    key: "school2",
                    value: "School 2",
                },
            ],
        };
    }
    onSubmit(): void {
      let isNextPage = false;
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        const storedHouseholdDetails = this.houseHoldDetails;
        const updatedHouseholdPersons =
            this.houseHoldDetails.houseHoldPersons?.map(
                (person: IHouseHold) => {
                    if (person.id === this.currentUser.id) {
                        const personToBeUpdated = { ...person };
                        personToBeUpdated.education = {
                            ...personToBeUpdated.education,
                            charterOrPrivateSchoolName:
                                this.charterSchoolDetailsForm.get("school")
                                    .value,
                        };
                        return personToBeUpdated;
                    } else {
                        return person;
                    }
                }
            );

      this.nslpMap[this.currentUserIndex] = true;
      const updatedPageAction = {
        ...storedHouseholdDetails?.pageAction,
        nslpMap: {
          ...storedHouseholdDetails?.pageAction?.nslpMap,
          ...this.nslpMap,
        },
        nslpDirection: PageDirection.NEXT,
      };
        if (storedHouseholdDetails)
            this.service.updateHouseHoldDetails({
                ...storedHouseholdDetails,
              ...{ pageAction: updatedPageAction },
                ...{ houseHoldPersons: updatedHouseholdPersons },
            });
      if (this.nslpMap != null) {
        isNextPage = this.utilService.isNextPage(this.nslpMap);
      }
      if (isNextPage) {
        this.utilService.getCurrentUserIdPageAction(
          this.nslpMap,
          PageDirection.NEXT
        ).subscribe((id: any) => {
          this.currentUserIndex = id.toString()
          this.route.navigate([
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_INDIVIDUALDETAILS +
            "/" +
            RoutePath.APPLYNOW_NATIONAL_SCHOOL_LUNCH_PROGRAM,
            {userId: this.currentUserIndex},
          ]);
        });
      }
      else{
        this.route.navigate([
          RoutePath.APPLYNOW +
          "/" +
          RoutePath.APPLYNOW_INDIVIDUALDETAILS +
          "/" +
          RoutePath.APPLYNOW_NSLP_SUMMARY
        ]);
      }
    }
    previous(): void {
                            this.route.navigate([
                                RoutePath.APPLYNOW +
                                    "/" +
                                    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                                    "/" +
                                    RoutePath.APPLYNOW_NATIONAL_SCHOOL_LUNCH_PROGRAM,
                            ]);
    }
}
