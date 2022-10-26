import { ChangeDetectorRef, Component, EventEmitter, Injectable, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { format } from 'date-fns';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IIndividual } from '../../+state/household-details-model';
import { IReferralsState, PageDirection } from '../../+state/referrals.models';
import { MenuItemState } from '../../../shared/menu-item-state';
import { RoutePath } from '../../../shared/route-strategies';
import { ReferralsIntellectualDisabilityServicesStrategy } from '../../../shared/route-strategies/referrals/intellectual-disability-services';
import { ReferralStoreService } from '../../referrals-store-service';
import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';
import {UtilService} from "../../../shared/services/util.service";
@Injectable()

@Component({
  selector: 'compass-ui-intellectual-disability-services',
  templateUrl: './intellectual-disability-services.component.html',
  styleUrls: ['./intellectual-disability-services.component.scss'],
  providers: [ReferralsIntellectualDisabilityServicesStrategy]
})
export class IntellectualDisabilityServicesComponent implements OnInit {
  household!: IIndividual;
  individuals: IIndividual[] = [];
  referralState!: IReferralsState;
  intellectualDisabilityForm: FormGroup | any;
  selectedUsers: string[] = [];
  error = "Select atleast one person";
  displayError = false;
  errorMessage = "Select a user"
  @Output() formState = new EventEmitter<MenuItemState>();
  routePath: typeof RoutePath = RoutePath;

  intellectualMap: any = {};

  constructor(private fb: FormBuilder, private route: Router,
    private service: ReferralStoreService,
    private cd: ChangeDetectorRef,
    private store: Store<any>,
    private router: Router,
    private queueService: ScreenQueueUtil,
              private utilService: UtilService,
    private routingStratagy: ReferralsIntellectualDisabilityServicesStrategy,) {
    this.intellectualDisabilityForm = this.fb.group({
      appliedReferrals: this.fb.array([], [Validators.required]),
    })
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
    if (pathName == RoutePath.REFERRALS_INTELLECTUAL_DISABILITY_SERVICES) {
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
      this.individuals.forEach(ind =>{
        if(ind && ind.appliedReferrals && ind.appliedReferrals?.indexOf('ID') > -1){
          this.selectedUsers.push(ind.individualNumber || "");
        }
      })
      this.cd.detectChanges();
    });

  }

  onCheckboxChange(e: any) {
    if (e.target.checked) {
      this.displayError = false;
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
    if (appliedReferrals.indexOf("ID") < 0) {
      return appliedReferrals.concat(["ID"])

    } else{    
      return appliedReferrals
    }
  }

  getAppliedReferralsForNotSelected(appliedReferrals:any){
    if (appliedReferrals.indexOf("ID") > -1) {
      return appliedReferrals.splice(appliedReferrals.indexOf("ID"), 1)

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
        updatedIndividual.appliedReferrals = this.getAppliedReferrals(updatedIndividual.appliedReferrals ? [...updatedIndividual.appliedReferrals] : ["ID"]);
      } 
      else  {
        
        updatedIndividual.appliedReferrals = this.getAppliedReferralsForNotSelected(updatedIndividual.appliedReferrals ? [...updatedIndividual.appliedReferrals] : []);
      }
      return updatedIndividual
    })
    this.utilService.sortNames(this.selectedUsers,this.individuals,'individualNumber').forEach((ind) => { 
      if (ind) {
        this.intellectualMap[ind] = false;
      }
    })

    const updatedPageAction = {
      ...this.referralState.pageAction,

      currentServicesMap:this.referralState.pageAction?.currentServicesMap ? {...this.referralState.pageAction?.currentServicesMap,...this.intellectualMap}: this.intellectualMap,
      serviceDirection: PageDirection.NEXT
    };
    this.service.updatePageAction(updatedPageAction);

    this.service.updateIndividualDetails(updatedIndividuals);
    this.queueService.next();

    return true

  }

  getAge(dateString: any): any {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  previous() {
    this.queueService.back();


  }
  ngOnDestroy(): void {
    
  }

}
