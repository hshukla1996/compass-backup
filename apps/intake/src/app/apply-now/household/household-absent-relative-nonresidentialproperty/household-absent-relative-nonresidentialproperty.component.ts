import { ChangeDetectorRef, Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, first, of, Subscription } from 'rxjs';
import { IApplyNowState } from '../../+state/apply-now.models';
import { AppStoreService } from '../../../app-store-service';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowHouseholdAbsentRelativeNonresidentialpropertyStrategy } from '../../../shared/route-strategies/apply-now/household-absent-relative-nonresidentialproperty';
import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';
import { UtilService } from '../../../shared/services/util.service';
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IAbsentRelative, IAbsentRelativeNonResidentialProperty, IHouseHold, IHouseHoldDetails, PageDirection } from '../household-model';

@Component({
    selector: "compass-ui-household-absent-relative-nonresidentialproperty",
    templateUrl:
        "./household-absent-relative-nonresidentialproperty.component.html",
    styleUrls: [
        "./household-absent-relative-nonresidentialproperty.component.scss",
    ],
    providers: [ApplyNowHouseholdAbsentRelativeNonresidentialpropertyStrategy],
})
export class HouseholdAbsentRelativeNonresidentialpropertyComponent
    implements OnInit
{
    absentRelativeNonResidentialForm: FormGroup | any;
    applyNowState!: IApplyNowState;
    data: any;
    detail!: IAbsentRelative;
    maxDateRange: any;
    states: any;
    currentServicesMap: any;
    currentUserIndex!: any;
    currentUser: IAbsentRelative = {};
    householdMembers: IHouseHold[] = [];
    selectedUserids: string[] = [];
    absentRelativeMap: any = {};
    firstName: any;
    storedHouseHoldDetail!: IHouseHoldDetails;
    householdPersons: IHouseHold[] = [];
    editedMember!: any;
    absentRelatives: IAbsentRelative[] = [];
    visit: boolean = false;
    visitCount: any;
    isDateValid = true;

    child: Boolean = true;

    constructor(
        private fb: FormBuilder,
        private routingStrategy: ApplyNowHouseholdAbsentRelativeNonresidentialpropertyStrategy,
        private router: Router,
        private appService: AppStoreService,
        private service: ApplyNowStoreService,
        private queueService: ScreenQueueUtil,
        private cd: ChangeDetectorRef,
        private activatedRoute: ActivatedRoute,
        private utilService: UtilService
    ) {}

    @HostListener("paste", ["$event"]) blockPaste(e: KeyboardEvent) {
        e.preventDefault();
    }

    ngOnInit(): void {
        const memberId = this.activatedRoute.snapshot.paramMap.get("userId");
        const x = sessionStorage.getItem("storageId");
        this.maxDateRange = new Date().toISOString().slice(0, 10);
        this.absentRelativeNonResidentialForm = this.fb.group({
            id: x,
            ownproperty: [""],
            propertyBrought: ["", Utility.dateMaxValidator()],
            estimatedValue: [""],
            streetAddress: [""],
            streetAddress2: [""],
            city: [""],
            state: [""],
            zip: ["", Utility.zipCodeValidator()],
        });

        this.appService.getStates().subscribe((states) => {
            this.states = states;
            this.cd.detectChanges();
        });

        this.service.getAppData().subscribe((d) => {
            this.applyNowState = { ...d };
            if (
                memberId &&
                this.applyNowState.houseHoldDetails.nonResidentialProperty
            ) {
                this.editedMember =
                    this.applyNowState.houseHoldDetails.nonResidentialProperty.filter(
                        (ar: IAbsentRelativeNonResidentialProperty) => {
                            return ar?.id?.toString() == memberId?.toString();
                        }
                    )[0];
            }
            this.data = this.applyNowState.metaData;
            this.detail = this.applyNowState.houseHoldDetails
                .absentRelative as IAbsentRelative;
            this.storedHouseHoldDetail = d?.houseHoldDetails;
            const firstPerson = this.storedHouseHoldDetail.absentRelative
                ? this.storedHouseHoldDetail.absentRelative[0]
                : null;
            if (firstPerson) {
                this.firstName = firstPerson.firstName || "";
            }

            if (this.applyNowState.houseHoldDetails.absentRelative) {
                this.absentRelatives =
                    this.applyNowState.houseHoldDetails.absentRelative;
            }

            this.currentUser =
                this.extractUser(this.absentRelatives, this.currentUserIndex) ||
                "";
            this.absentRelativeNonResidentialForm
                .get("ownproperty")
                .patchValue(
                    this.currentUser.nonResidentialProperty?.ownNonResidentialProperty ? (this.currentUser.nonResidentialProperty?.ownNonResidentialProperty === 'Y' ? "Yes" : "No") : null
                );
            this.absentRelativeNonResidentialForm
                .get("propertyBrought")
                .patchValue(
                    Utility.duetFormatDate(this.currentUser.nonResidentialProperty?.datePurchased)
                );
            this.absentRelativeNonResidentialForm
                .get("estimatedValue")
                .patchValue(
                    this.currentUser.nonResidentialProperty?.marketValue
                );

            this.absentRelativeNonResidentialForm
                .get("streetAddress")
                .patchValue(
                    this.currentUser.nonResidentialProperty?.address
                        .addressLine1
                );
            this.absentRelativeNonResidentialForm
                .get("streetAddress2")
                .patchValue(
                    this.currentUser.nonResidentialProperty?.address
                        .addressline2
                );
            this.absentRelativeNonResidentialForm
                .get("city")
                .patchValue(
                    this.currentUser.nonResidentialProperty?.address.city
                );
            this.absentRelativeNonResidentialForm
                .get("state")
                .patchValue(
                    this.currentUser.nonResidentialProperty?.address.state
                );
            this.absentRelativeNonResidentialForm
                .get("zip")
                .patchValue(
                    this.currentUser.nonResidentialProperty?.address.zip
                );

            this.cd.detectChanges();
        });
    }

    isFieldValid(field: string): boolean {
        return (
            this.absentRelativeNonResidentialForm.get(field).status !== "VALID" &&
            (this.absentRelativeNonResidentialForm.get(field).dirty ||
                this.absentRelativeNonResidentialForm.get(field).touched)
        );
    }

    errorMap(field: string) {
    if (!this.isFieldValid(field)) {
      return "";
    }
    switch (field) {
      case "propertyBrought":
         if (this.absentRelativeNonResidentialForm.get('propertyBrought').errors?.invalidDate) {
            return 'Date must be in the past.'
        }
        if (this.absentRelativeNonResidentialForm.get("propertyBrought").errors.duetInvalidDate) {
            return "duetInvalidDate";
        }
        break;
      default:
        return "";

    }

    return "";
  }

    checkAddress(check: any) {
        let charCode = check.charCode;
        return ((charCode > 47 && charCode < 58) || (charCode > 64 && charCode < 91)
                || (charCode > 96 && charCode < 123) || charCode == 35
                || charCode == 47 || charCode == 45);
    }
    checkCity(check: any) {
        let charCode = check.charCode;
        return ((charCode > 64 && charCode < 91)
                || (charCode > 96 && charCode < 123) || charCode == 92
                || charCode == 39 || charCode == 45);
    }

    OnlyNumberAllowed(event: { which: any; keyCode: any }): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    extractUser(persons: any, userId: any) {
        const currentUser = persons.filter((person: IAbsentRelative) => {
            return (
                person.id?.toString() === sessionStorage.getItem("storageId")
            );
        })[0];
        return currentUser;
    }

    goNext() {
        if (!this.isDateValid || this.absentRelativeNonResidentialForm.status !== 'VALID') return;
        const updatedAbsentRelative = {
            id: this.absentRelativeNonResidentialForm.controls["id"].value,
            ownproperty:
                this.absentRelativeNonResidentialForm.controls[
                    "ownproperty"
                ].value?.charAt(0),
            ownNonResidentialProperty:
                this.absentRelativeNonResidentialForm.controls["ownproperty"]
                    .value.charAt(0),
            datePurchased:
                this.absentRelativeNonResidentialForm.controls[
                    "propertyBrought"
                ].value,
            marketValue:
                this.absentRelativeNonResidentialForm.controls["estimatedValue"]
                    .value,
            address: {
                addressLine1:
                    this.absentRelativeNonResidentialForm.controls[
                        "streetAddress"
                    ].value,
                addressline2:
                    this.absentRelativeNonResidentialForm.controls[
                        "streetAddress2"
                    ].value,
                city: this.absentRelativeNonResidentialForm.controls["city"]
                    .value,
                state: this.absentRelativeNonResidentialForm.controls["state"]
                    .value,
                zip: this.absentRelativeNonResidentialForm.controls["zip"]
                    .value,
                zipExtension: "",
                county: "05",
                isThisAddressEffectiveImmediately: false,
                addressEffectiveDate: "",
            },
        };

        const storedHouseholdDetails = this.applyNowState?.houseHoldDetails;
        const updatedHouseholdPersons =
            this.applyNowState?.houseHoldDetails.absentRelative?.map(
                (person: IAbsentRelative) => {
                    if (person.id === this.currentUser.id) {
                        console.log(
                            "current id",
                            this.currentUser.id,
                            "person id==",
                            person.id
                        );
                        const personToBeUpdated = { ...person };
                        personToBeUpdated.nonResidentialProperty =
                            updatedAbsentRelative;
                        return personToBeUpdated;
                    } else {
                        return person;
                    }
                }
            );

        if (storedHouseholdDetails) {
            this.service.updateHouseHoldDetails({
                ...storedHouseholdDetails,
                ...{ absentRelative: updatedHouseholdPersons },
            });
        }

        this.router.navigate([
            RoutePath.APPLYNOW + 
            '/' + RoutePath.APPLYNOW_HOUSEHOLD + 
            '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDABSENTRELATIVECHILDSUPPORT]);

        return true;
    }

    previous() {
        this.router.navigate([this.routingStrategy.previousRoute()]);
    }
}






