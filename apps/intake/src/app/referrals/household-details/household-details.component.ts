import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { format } from 'date-fns';
import { Individual, Individuals, IReferralsState, PageDirection } from '../+state/referrals.models';
import { MenuItemState } from '../../shared/menu-item-state';
import { RoutePath } from '../../shared/route-strategies';
import { ReferralStoreService } from '../referrals-store-service';
import { IIndividual } from '../+state/household-details-model';
import { ReferralsHouseholdDetailsStrategy } from '../../shared/route-strategies/referrals/household-details';
import { ScreenQueueUtil } from '../../shared/services/screen_queue_util.service';

@Component({
  selector: 'compass-ui-household-details',
  templateUrl: './household-details.component.html',
  styleUrls: ['./household-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ReferralsHouseholdDetailsStrategy]
})
export class HouseholdDetailsComponent implements OnInit {
  household!: IIndividual;
  individuals: IIndividual[] = [];
  referralState!: IReferralsState;
  selectedUsers: string[] = [];
  interventionMap: any = {};
  displayError = false;
  errorMessage = "Select a user"
  @Output() formState = new EventEmitter<MenuItemState>();
  routePath: typeof RoutePath = RoutePath;

  constructor(private fb: FormBuilder, private route: Router,
    private service: ReferralStoreService,
    private cd: ChangeDetectorRef,
    private store: Store<any>,
    private router: Router,
    private queueService: ScreenQueueUtil,
    private routingStratagy: ReferralsHouseholdDetailsStrategy,) {

  }


  formatDate(date: any) {
    if (date)
      date = new Date(date).toLocaleDateString()
    return date;
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

  ngOnInit() {
    this.service.formStateUpdated(this.routePath.REFERRALS_PROGRAMSELECTION, MenuItemState.COMPLETED);

    const pathName: any = this.queueService.getFirstPath() || "";

    this.service.menuStateUpdated(pathName);
    this.service.formStateUpdated(pathName, MenuItemState.INPROGRESS);
    if (pathName == RoutePath.REFERRALS_HOUSEHOLDDETAILS) {
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
        if (ind && ind.appliedReferrals && ind.appliedReferrals?.indexOf('EI') > -1) {
          this.selectedUsers.push(ind.individualNumber || "");
        }
      })
      this.cd.detectChanges();
    });

  }



  onCheckboxChange(e: any) {
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

  }

  getAppliedReferrals(appliedReferrals: any) {
    if (appliedReferrals.indexOf("EI") < 0) {
      return appliedReferrals.concat(["EI"])

    } else {
      return appliedReferrals
    }
  }
  getAppliedReferralsForNotSelected(appliedReferrals: any) {
    if (appliedReferrals.indexOf("EI") > -1) {
      return appliedReferrals.splice(appliedReferrals.indexOf("EI"), 1)

    }
    else {
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
        updatedIndividual.appliedReferrals = this.getAppliedReferrals(updatedIndividual.appliedReferrals ? [...updatedIndividual.appliedReferrals] : ["EI"]);

      }
      else {
        updatedIndividual.appliedReferrals = this.getAppliedReferralsForNotSelected(updatedIndividual.appliedReferrals ? [...updatedIndividual.appliedReferrals] : []);

      }
      return updatedIndividual
    })

    this.selectedUsers.forEach((ind) => {
      if (ind) {
        this.interventionMap[ind] = false;
      }
    })

    const updatedPageAction = {
      ...this.referralState.pageAction,
      currentServicesMap: this.referralState.pageAction?.currentServicesMap ? { ...this.referralState.pageAction?.currentServicesMap, ...this.interventionMap } : this.interventionMap,
      serviceDirection: PageDirection.NEXT
    };
    this.service.updatePageAction(updatedPageAction);

    this.service.updateIndividualDetails(updatedIndividuals);
    this.queueService.next(Object.keys(this.interventionMap)[0]);

    return true
  }



  previous() {
    this.queueService.back();
  }
  ngOnDestroy(): void {
  }
}
