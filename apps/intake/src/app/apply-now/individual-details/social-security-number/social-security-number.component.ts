import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { MenuItemState } from '../../../shared/menu-item-state';
import { FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import {  ApplyNowSocalSecurityNumberStrategy} from '../../../shared/route-strategies/apply-now/social-security-number';
import { IApplyNowState } from '../../+state/apply-now.models';
import { IHouseHold } from '../../household/household-model';
import {UtilService} from "../../../shared/services/util.service";
import {EntryScreenQueueUtil} from "../individuals-entry-gatepost";

@Component({
    selector: "compass-ui-social-security-number",
    templateUrl: "./social-security-number.component.html",
    styleUrls: ["./social-security-number.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ApplyNowSocalSecurityNumberStrategy],
})
export class SocialSecurityNumberComponent implements OnInit {
    socialSecurityForm: FormGroup | any;
    applyNowState: IApplyNowState | undefined;
    data: any;
    currentUserIndex!: string;
    currentUser: IHouseHold = {};
    personsMap!: any;
    houseHoldPersons: IHouseHold[] = [];
    submitted = false;
    formchckvalue: FormGroup | any;
    householdHead!: IHouseHold;
    @Output() formState = new EventEmitter<MenuItemState>();
    constructor(
        private fb: FormBuilder,
        private service: ApplyNowStoreService,
        private routingStratagy: ApplyNowSocalSecurityNumberStrategy,
        private router: Router,
        private cd: ChangeDetectorRef,
        private activedRoute: ActivatedRoute,
        private utilService: UtilService,
        private queueService:EntryScreenQueueUtil
    ) {}
    ngOnInit() {
        this.socialSecurityForm = this.fb.group({
            socialSecurityNumber: [
                
                "" ,Validators.pattern(/^(?!(000|666|9))(\d{3}-?(?!(00))\d{2}-?(?!(0000))\d{4,})$/)
            ],
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
                this.socialSecurityForm
                    .get("socialSecurityNumber")
                    .patchValue(this.currentUser.socialSecurityNumber);
            }, 500);
            this.cd.detectChanges();
        });
    }
    get f() {
        return this.socialSecurityForm.controls;
    }
    isFieldValid(field: string): boolean {
      if(this.socialSecurityForm.get("socialSecurityNumber").value === "078051120"){
        return false;
      }
        return (
            this.socialSecurityForm.get(field).status !== "VALID" &&
            (this.socialSecurityForm.get(field).dirty ||
                this.socialSecurityForm.get(field).touched)
        );
    }

    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }

        switch (field) {

            case "socialSecurityNumber":
                if (
                    this.socialSecurityForm.get("socialSecurityNumber").errors
                        ?.pattern
                ) {
                    return "Social Security Number is not valid.";
                }
                break;
            default:
                return "";
                break;
        }
        return "";
    }
    previous() {
        this.queueService.back();
       // this.router.navigate([this.routingStratagy.previousRoute(), { userId: this.currentUserIndex }]);
    }
    onSubmit(): boolean {
        this.service.validateAllFormFields(this.socialSecurityForm);
        //078051120
        // const ssnEntered =this.socialSecurityForm.get("socialSecurityNumber").value.replaced("-","");
      //  alert(ssnEntered);
        if (this.socialSecurityForm.status.toLowerCase() === "valid" &&
          this.socialSecurityForm.get("socialSecurityNumber").value !== "078051120") {
            const storedHouseholdDetails = this.applyNowState?.houseHoldDetails;
            const updatedHouseholdPersons =
                this.applyNowState?.houseHoldDetails.houseHoldPersons?.map(
                    (person: IHouseHold) => {
                        if (person.id === this.currentUser.id) {
                            const personToBeUpdated = { ...person };

                            personToBeUpdated.socialSecurityNumber =
                                this.socialSecurityForm.get(
                                    "socialSecurityNumber"
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
          this.queueService.next();
           // this.router.navigate([
            //    this.routingStratagy.nextRoute(),
             //   { userId: this.currentUserIndex },
           // ]);
            return true;
        } else {
            return false;
        }
    }
}
