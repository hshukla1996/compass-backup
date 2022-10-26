import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import { FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { Store } from "@ngrx/store";
import { RoutePath } from "../../../shared/route-strategies";
import {IHouseHold, IHouseHoldDetails} from "../../household/household-model";
import {IApplyNowState} from "../../+state/apply-now.models";
import {ApplyNowStoreService} from "../../apply-now-store-service";
import {UtilService} from "../../../shared/services/util.service";
import {AppStoreService} from "../../../app-store-service";
import { Utility } from "../../../shared/utilities/Utility";
import {
    IND_FOSTER_ADULT,
    IND_FOSTER_CHILD
} from "../../../shared/constants/Individual_Programs_Constants";
@Component({
    selector: "ui-compass-primary-caretaker",
    templateUrl: "./primary-caretaker.component.html",
    styleUrls: ["./primary-caretaker.component.css"],
})
export class PrimaryCaretakerComponent implements OnInit {
    primaryCaretakerForm: FormGroup | any | null;
    data: any;
    roles!: any[];
    currentUser: IHouseHold = {};
    elders!: IHouseHold[];
    currentUserIndex!: string;
    personsMap!: any;
    houseHoldPersons: IHouseHold[] = [];
    applyNowState: IApplyNowState | undefined;
    houseHoldDetails!: IHouseHoldDetails;
    constructor(
        private fb: FormBuilder,
        private route: Router,
        private cd: ChangeDetectorRef,
        private service: ApplyNowStoreService,
        private activedRoute: ActivatedRoute,
        private utilService: UtilService,
        private appService: AppStoreService
    ) {}
    ngOnInit() {
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        this.primaryCaretakerForm = this.fb.group({
            primaryCaretaker: ["", Validators.required],
        });
        this.service.getAppData().subscribe((d) => {
            this.applyNowState = { ...d };
            if (this.applyNowState.houseHoldDetails.houseHoldPersons) {
                this.houseHoldPersons =
                    this.applyNowState.houseHoldDetails.houseHoldPersons;
            }
            this.personsMap =
                {
                    ...this.applyNowState.houseHoldDetails.pageAction
                        ?.personsMap,
                } || {};
            this.elders = this.houseHoldPersons.filter(
                (person: IHouseHold) => Utility.getAge(person.dateOfBirth) > 18
            );
        });
        this.appService.getContactRoles().subscribe((c) => {
            this.roles = c;
            this.cd.detectChanges();
        });
        this.activedRoute.params.subscribe((p) => {
            if (Object.keys(p).length == 0) {
                this.currentUserIndex =
                    this.utilService.getCurrentUserIdOnNoParams(
                        this.personsMap
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
            setTimeout(() => {
                this.primaryCaretakerForm
                    .get("primaryCaretaker")
                    .patchValue(this.currentUser.primaryCareTaker);
            }, 500);
            this.cd.detectChanges();
        });
    }

    isFieldValid(field: string): boolean {
        if (this.primaryCaretakerForm.get(field).status !== "VALID") {
        }
        return (
            this.primaryCaretakerForm.get(field).status !== "VALID" &&
            this.primaryCaretakerForm.get(field).touched
        );
    }
    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }
        switch (field) {
            case "primaryCaretaker":
                if (
                    this.primaryCaretakerForm.get("primaryCaretaker").errors
                        .required
                ) {
                    return "Primary Caretaker is required.";
                }
                break;
            default:
                return "";
                break;
        }

        return "";
    }

    get f() {
        return this.primaryCaretakerForm.controls;
    }

    onSubmit(): void {
        this.service.validateAllFormFields(this.primaryCaretakerForm);
        const storedHouseholdDetails = this.houseHoldDetails;
        if (this.primaryCaretakerForm.status.toLowerCase() === "valid") {
            const updatedHouseholdPersons =
                this.applyNowState?.houseHoldDetails.houseHoldPersons?.map(
                    (person: IHouseHold) => {
                        if (person.id === this.currentUser.id) {
                            const personToBeUpdated = { ...person };
                            personToBeUpdated.primaryCareTaker =
                                this.primaryCaretakerForm.get(
                                    "primaryCaretaker"
                                ).value;
                            return personToBeUpdated;
                        } else {
                            return person;
                        }
                    }
                );

            if (storedHouseholdDetails) {
                this.service.updateHouseHoldDetails({
                    ...storedHouseholdDetails,
                    ...{ houseHoldPersons: updatedHouseholdPersons },
                });
            }
      const benefits = this.service.getAppliedBenefitsForIndividual(this.currentUser);
       const showFosterChild = this.service.areProgramsExist(
           benefits as string[],
           IND_FOSTER_CHILD
       );
        console.log("benefits");
        console.log(benefits);
        console.log(IND_FOSTER_CHILD)
        console.log("ShowFosterChild");
        console.log(showFosterChild);
        if (showFosterChild) {
            this.route.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                    "/" +
                    RoutePath.APPLYNOW_FOSTER_CARE_DETAILS,
              {
                userId: this.currentUser.id,
              },
            ]);
        }
        else {
            this.route.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                    "/" +
                    RoutePath.APPLYNOW_CHILD_CARE_SERVICE,
            ]);
        }
        }
    }
    previous(): void {
        if(this.currentUser.citizenship?.citizenshipCode?.toString() === "1"){
            this.route.navigate([
              RoutePath.APPLYNOW +
              "/" +
              RoutePath.APPLYNOW_INDIVIDUALDETAILS +
              "/" +
              RoutePath.APPLYNOW_DRIVING_LICENSE,
            ]);
        }
        else{
          if(this.currentUser.citizenship?.sponsor?.sponsorType === "individual"){
            this.route.navigate([
              RoutePath.APPLYNOW +
              "/" +
              RoutePath.APPLYNOW_INDIVIDUALDETAILS +
              "/" +
              RoutePath.APPLYNOW_INDIVDUAL_SPONSOR_DETAILS,
            ]);

          }
          if(this.currentUser.citizenship?.sponsor?.sponsorType === "organization"){
            this.route.navigate([
              RoutePath.APPLYNOW +
              "/" +
              RoutePath.APPLYNOW_INDIVIDUALDETAILS +
              "/" +
              RoutePath.APPLYNOW_ORG_SPONSOR_DETAILS,
            ]);

          }

        else {
            this.route.navigate([
              RoutePath.APPLYNOW +
              "/" +
              RoutePath.APPLYNOW_INDIVIDUALDETAILS +
              "/" +
              RoutePath.APPLYNOW_CITIZENSHIP,
            ]);
          }
        }

    }
}
