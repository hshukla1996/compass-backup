import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { MenuItemState } from '../../../shared/menu-item-state';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold } from '../../household/household-model';
import { IApplyNowState } from '../../+state/apply-now.models';
import { ApplyNowVoterRegistrationStrategy } from '../../../shared/route-strategies/apply-now/voter-registration';
import {AppStoreService} from "../../../app-store-service";
import {UtilService} from "../../../shared/services/util.service";
@Component({
    selector: "compass-ui-voter-registration",
    templateUrl: "./voter-registration.component.html",
    styleUrls: ["./voter-registration.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ApplyNowVoterRegistrationStrategy],
})
export class VoterRegistrationComponent implements OnInit {
    voterRegForm: FormGroup | any;
    states: any;
    applyNowState: IApplyNowState | undefined;
    submitted = false;
  currentUser: IHouseHold = {};
  currentUserIndex!: string;
  personsMap!: any;
  houseHoldPersons:IHouseHold[] = [];

    householdHead!: IHouseHold;
    @Output() formState = new EventEmitter<MenuItemState>();
    constructor(
        private fb: FormBuilder,
        private service: ApplyNowStoreService,
		private routingStrategy:ApplyNowVoterRegistrationStrategy,
        private appService: AppStoreService,
        private route: Router,
        private cd: ChangeDetectorRef,
        private activedRoute: ActivatedRoute,
        private utilService: UtilService,

    ) {}
    ngOnInit() {
        this.voterRegForm = this.fb.group({
            reginfo: ["", Validators.required],
        });
        this.service.getAppData().subscribe((d) => {
            this.applyNowState = { ...d };

          if(this.applyNowState.houseHoldDetails.houseHoldPersons) {
            this.houseHoldPersons =
              this.applyNowState.houseHoldDetails.houseHoldPersons;
          }
          this.personsMap =
            {
              ...this.applyNowState.houseHoldDetails.pageAction
                ?.personsMap,
            } || {};
        });
      this.appService.getStates().subscribe((states:any) => {
        this.states = states;
        this.cd.detectChanges();
      });
      //  if (localStorage.getItem("reginfo")) {
       //     let dataObj: any = JSON.parse(localStorage.getItem("reginfo")!);
       //     console.log(dataObj);
       //     this.voterRegForm.patchValue({
       //         reginfo: dataObj.reginfo,
       //     });
       // }
      this.activedRoute.params.subscribe((p) => {
        if (Object.keys(p).length == 0) {
            this.currentUserIndex = this.utilService.getCurrentUserIdOnNoParams(
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
             this.voterRegForm.patchValue({
                reginfo: this.currentUser.interestedToVote
           });
        this.cd.detectChanges();
      });
    }
    get f() {
        return this.voterRegForm.controls;
    }
	previous():void {
		 this.route.navigate([this.routingStrategy.previousRoute()]);
	}
    onSubmit(): void {
       const storedHouseholdDetails = this.applyNowState?.houseHoldDetails;
			  const updatedHouseholdPersons =
                  this.applyNowState?.houseHoldDetails.houseHoldPersons?.map(
                      (person: IHouseHold) => {
                          if (person.id === this.currentUser.id) {
                              const personToBeUpdated = { ...person };
                             
                              personToBeUpdated.interestedToVote =
            this.voterRegForm.get("reginfo").value;
                              
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
        this.route.navigate([
            this.routingStrategy.nextRoute(),
            { userId: this.currentUserIndex },
        ]);
    }
    ngOnDestroy(): void {
        this.formState.emit(MenuItemState.COMPLETED);
    }
}
