import { ChangeDetectorRef, Component, EventEmitter, Injectable, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { format } from 'date-fns';
import { Subscription } from 'rxjs';
import { IIndividual } from '../../+state/household-details-model';
import { IReferralsState, PageDirection } from '../../+state/referrals.models';
import { MenuItemState } from '../../../shared/menu-item-state';
import { RoutePath } from '../../../shared/route-strategies';
import { ReferralsAutismServicesStrategy } from '../../../shared/route-strategies/referrals/autism-services';
import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';
import { ReferralStoreService } from '../../referrals-store-service';
import { Location } from "@angular/common";
import { UtilService } from "../../../shared/services/util.service";
//@Injectable()

@Component({
  selector: 'compass-ui-autism-services',
  templateUrl: './autism-services.component.html',
  styleUrls: ['./autism-services.component.scss'],
  providers: [ReferralsAutismServicesStrategy],
})
export class AutismServicesComponent implements OnInit {
  household!: IIndividual;
  individuals: IIndividual[] = [];
  referralState!: IReferralsState;
  selectedUsers: string[] = [];
  autismMap: any = {};
  displayError = false;
  errorMessage = "Select a user"
  @Output() formState = new EventEmitter<MenuItemState>();
  routePath: typeof RoutePath = RoutePath;

  constructor(private fb: FormBuilder, private route: Router,
    private service: ReferralStoreService,
    private cd: ChangeDetectorRef,
    private store: Store<any>,
    private router: Router,
    private utilService: UtilService,
    private queueService: ScreenQueueUtil,
    private routingStratagy: ReferralsAutismServicesStrategy,) {

  }

  isFieldValid(field: string) {

  }
  formatDate(date: any) {
    if (date)
      date = new Date(date).toLocaleDateString()
    return date;
  }
  ngOnInit() {
    this.service.formStateUpdated(this.routePath.REFERRALS_PROGRAMSELECTION, MenuItemState.COMPLETED);

    const pathName: any = this.queueService.getFirstPath() || "";

    this.service.menuStateUpdated(pathName);
    this.service.formStateUpdated(pathName, MenuItemState.INPROGRESS);
    if (pathName == RoutePath.REFERRALS_AUTISM_SERVICES) {
      this.queueService.resetQueueId(0);
    }
    this.service.getAppData().subscribe(d => {
      this.referralState = { ...d };
      this.household = { ...this.referralState.household };
      if (this.household.dateOfBirth) {
        const newFormattedDate = new Date(this.household.dateOfBirth as unknown as Date);
        this.household.dateOfBirth = format(newFormattedDate, 'MM-dd-yyyy');
      }
      this.individuals = this.referralState.individuals || [];
      this.individuals.forEach(ind => {
        if (ind && ind.appliedReferrals && ind.appliedReferrals?.indexOf('AS') > -1) {
          this.selectedUsers.push(ind.individualNumber || "");
        }
      })
      this.cd.detectChanges();
    });

  }

  onCheckboxChange(e: any) {
    console.log("test");
    if (e.target.checked) {
      this.selectedUsers.push(e.target.value.toString());
    } else {
      let i: number = 0;
      this.selectedUsers.forEach((item: any) => {
        if (item == e.target.value) {
          this.selectedUsers.splice(i, 1);
          return;
        }
        i++;
      });
    }
    console.log("test", this.selectedUsers);


  }
  getAppliedReferrals(appliedReferrals: any) {
    if (appliedReferrals.indexOf("AS") < 0) {
      return appliedReferrals.concat(["AS"])

    } else {
      return appliedReferrals
    }
  }
  getAppliedReferralsForNotSelected(appliedReferrals: any) {
    if (appliedReferrals.indexOf("AS") > -1) {
      return appliedReferrals.splice(appliedReferrals.indexOf("AS"), 1)

    } else {
      return appliedReferrals

    }
  }

  next() {
    if (this.selectedUsers.length == 0) {
      this.displayError = true;
      return false
    }

    const updatedIndividuals = this.individuals.map((ind) => {
      const updatedIndividual = { ...ind };
      if (ind && ind.individualNumber?.toString() && this.selectedUsers.indexOf(ind?.individualNumber?.toString()) > -1) {

        updatedIndividual.appliedReferrals = this.getAppliedReferrals(updatedIndividual.appliedReferrals ? [...updatedIndividual.appliedReferrals] : ["AS"]);
      }
      else {
        updatedIndividual.appliedReferrals = this.getAppliedReferralsForNotSelected(updatedIndividual.appliedReferrals ? [...updatedIndividual.appliedReferrals] : []);

      }
      return updatedIndividual
    })
    this.utilService.sortNames(this.selectedUsers, this.individuals, 'individualNumber').forEach((ind) => {
      if (ind) {

        this.autismMap[ind] = false;
      }
    })
    const updatedPageAction = {
      ...this.referralState.pageAction,
      currentServicesMap: this.referralState.pageAction?.currentServicesMap ? { ...this.referralState.pageAction?.currentServicesMap, ...this.autismMap } : this.autismMap,

      serviceDirection: PageDirection.NEXT
    };
    this.service.updatePageAction(updatedPageAction);
    console.log(updatedPageAction, "updatedPageAction")

    this.service.updateIndividualDetails(updatedIndividuals);
    this.queueService.next();

    return true

  }


  getAge(dateString: any): any {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  previous() {
    this.queueService.back();
  }

}
