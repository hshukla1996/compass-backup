import { ArrayType } from '@angular/compiler';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuData } from '@compass-ui/data';
import { Observable } from 'rxjs';
import { IIndividual, IServicesSelected } from '../+state/household-details-model';
// import { PageQueue } from '../+state/household-details-model';
// import { IIndividual } from '../+state/household-details-model';
import { IReferralsState, PageDirection, PageQueue } from '../+state/referrals.models';
import { AppStoreService } from '../../app-store-service';
import { MenuItemState } from '../../shared/menu-item-state';
import { RoutePath } from '../../shared/route-strategies';
import { ReferralsProgramSelectionStrategy } from '../../shared/route-strategies/referrals/program-selection';
import { ScreenQueueRouteNameReferral, ScreenQueueUtil } from '../../shared/services/screen_queue_util.service';
import { ReferralStoreService } from '../referrals-store-service';

@Component({
  selector: 'compass-ui-program-selection',
  templateUrl: './program-selection.component.html',
  styleUrls: ['./program-selection.component.scss'],
  providers: [ReferralsProgramSelectionStrategy],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ProgramSelectionComponent implements OnInit {
  @ViewChild('programSelectionFormEle') programSelectionFormEle: any;
  @Output() formState = new EventEmitter<MenuItemState>();
  pageQueue!: PageQueue;
  selectedValues!: any[]
  routePath: typeof RoutePath = RoutePath;
  sevicesselected: any[] = [];
  programServices: any;
  programServices$: Observable<any> | undefined;
  programSelectionForm: FormGroup | any;
  data: any;
  referralState: IReferralsState | undefined;
  household!: IIndividual;
  individuals: IIndividual[] = [];
  storedData: any;
  errorMessage = "This field is required."
  displayError = false;
  noOfAdults: any;
  noOfChildren: any
  // services: IServicesSelected[]=[];

  constructor(private fb: FormBuilder, private appService: AppStoreService, private service: ReferralStoreService, private router: Router, private cd: ChangeDetectorRef,
    private formBuilder: FormBuilder, private queueService: ScreenQueueUtil) {
    this.programSelectionForm = this.fb.group({
      sevicesselected: this.fb.array([], [Validators.required]),
    });

  }
  getAppliedReferralsForNotSelectedAS(selectedReferrals: any) {

    const appliedReferrals = [...selectedReferrals]
    if (appliedReferrals.indexOf("AS") > -1) {
      const refs = appliedReferrals.filter((ar) => (ar !== "AS"))
      return refs

    }
    //  if (appliedReferrals.indexOf("EI") > -1) {
    //   const refs = appliedReferrals.filter((ar) => (ar !== "EI"))

    //   return refs

    // }
    //  if (appliedReferrals.indexOf("ID") > -1) {
    //   const refs = appliedReferrals.filter((ar) => (ar !== "ID"))

    //   return refs

    // } 
    else {
      return appliedReferrals

    }
  }
  getAppliedReferralsForNotSelectedEI(selectedReferrals: any) {
    const appliedReferrals = [...selectedReferrals]
    if (appliedReferrals.indexOf("EI") > -1) {
      const refs = appliedReferrals.filter((ar) => (ar !== "EI"))

      return refs

    }
    else {


      return appliedReferrals

    }
  }
  getAppliedReferralsForNotSelectedID(selectedReferrals: any) {
    const appliedReferrals = [...selectedReferrals]
    if (appliedReferrals.indexOf("ID") > -1) {
      const refs = appliedReferrals.filter((ar) => (ar !== "ID"))

      return refs

    } else {


      return appliedReferrals

    }
  }
  ngOnInit(): void {
    this.formState.emit(MenuItemState.INPROGRESS);
    this.service.formStateUpdated(this.routePath.REFERRALS_PROGRAMSELECTION, MenuItemState.INPROGRESS);
    this.service.formStateUpdated(this.routePath.REFERRALS_BASICDETAILS, MenuItemState.COMPLETED);
    // this.service.formStateUpdated(this.routePath.REFERRALS_ADDANOTHERPERSON, MenuItemState.COMPLETED); 


    // this.service.getAppData().subscribe(d => {

    this.referralState = this.service.getReferralState;
    this.sevicesselected = [...this.referralState?.servicesselected ?? []];
    this.individuals = this.service.getIndividuals ?? [];
    // this.programServices$ = this.appService.getProgramServices();
    // this.programServices$.subscribe(c => {
    //   this.programServices = c;
    //   this.cd.detectChanges(); 

    // });
    this.noOfAdults = this.individuals.filter(ind => {
      return this.getAge(ind.dateOfBirth) >= 6
    }).length
    if (this.noOfAdults == 0) {
      this.onCheckboxChange('AS', false)
    }
    this.noOfChildren = this.individuals.filter(ind => {
      // this.sevicesselected.splice();
      return this.getAge(ind.dateOfBirth) <= 5
    }).length
    if (this.noOfChildren == 0) {
      this.onCheckboxChange('EI', false)
    }

    this.cd.detectChanges();

    // });



  }
  removeASFromUsers() {
    const updatedIndividuals = this.individuals.map((ind) => {
      const updatedIndividual = { ...ind };
      if (Array.isArray(updatedIndividual.appliedReferrals))
        updatedIndividual.appliedReferrals = this.getAppliedReferralsForNotSelectedAS(updatedIndividual.appliedReferrals);
      return updatedIndividual
    })
    this.service.updateIndividualDetails(updatedIndividuals);

  }

  removeEIFromUsers() {
    const updatedIndividuals = this.individuals.map((ind) => {
      const updatedIndividual = { ...ind };
      if (Array.isArray(updatedIndividual.appliedReferrals))
        updatedIndividual.appliedReferrals = this.getAppliedReferralsForNotSelectedEI(updatedIndividual.appliedReferrals);
      return updatedIndividual
    })
    this.service.updateIndividualDetails(updatedIndividuals);
  }
  removeIDFromUsers() {

    const updatedIndividuals = this.individuals.map((ind) => {
      const updatedIndividual = { ...ind };
      if (Array.isArray(updatedIndividual.appliedReferrals))
        updatedIndividual.appliedReferrals = this.getAppliedReferralsForNotSelectedID(updatedIndividual.appliedReferrals);
      return updatedIndividual
    })
    this.service.updateIndividualDetails(updatedIndividuals);
  }
  ischecked(value: string) {
    return this.findIndex(value) >= 0
  }

  get programSelectionFormArray() {

    return this.programSelectionForm.controls.sevicesselected as FormArray;
  }

  isIntervention() {
    return !(this.service.getIndividuals.filter(detail => this.getAge(detail.dateOfBirth) <= 5).length > 0)

  }

  isAutism() {
    return !(this.service.getIndividuals.filter(detail => this.getAge(detail.dateOfBirth) >= 6).length > 0)

  }

  isCheckboxDisabled() {
    return true
    // return this.individuals.filter(detail => this.getAge(detail.dateOfBirth) <= 5).length >0

  }



  onCheckboxChange(value: string, status: boolean) {

    if (status) {
      this.sevicesselected = this.sevicesselected.concat([value]);
    } else {
      for (let i = 0; i < this.sevicesselected.length; i++) {

        if (this.sevicesselected[i] === value) {

          this.sevicesselected.splice(i, 1);

        }

      }
    }
  }
  back() {

    this.router.navigate([RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_HOUSEHOLDSUMMARY]);

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


  findIndex(value: any) {
    return this.sevicesselected.findIndex(d => d === value)
  }

  onSubmit(e: any) {
    const serviceSelected = this.sevicesselected.filter(service => service !== "information")
    const updatedIndividuals = this.individuals.map((ind) => {
      const updatedIndividual = { ...ind };
      if (Array.isArray(updatedIndividual.appliedReferrals)) {
        const selectedAppliedReferrals = updatedIndividual.appliedReferrals?.filter(ref => serviceSelected.indexOf(ref) > -1)

        updatedIndividual.appliedReferrals = selectedAppliedReferrals
      }
      return updatedIndividual
    })

    if (this.sevicesselected.length == 1 && this.findIndex(ScreenQueueRouteNameReferral.information) >= 0) {
      this.displayError = true;
      return
    }
    if (this.sevicesselected.length == 0) {
      this.displayError = true;
      return
    }
    this.sevicesselected.push(ScreenQueueRouteNameReferral.information);

    this.service.updateServicesSelected(this.sevicesselected);

    this.queueService.initDynamicRoutes(this.sevicesselected, RoutePath.REFERRALS_RECEIPT);
    this.service.updateIndividualDetails(updatedIndividuals);
    // this.queueService.updatePageQueueId(0);
    //uncomment this
    const updatedPageAction = {
      currentServicesMap: {},
      serviceDirection: PageDirection.NEXT
    };
    this.service.updatePageAction(updatedPageAction);

    const pathName: any = this.queueService.navigateToPath() || "";

    this.service.menuStateUpdated(pathName);
    this.service.formStateUpdated(pathName, MenuItemState.INPROGRESS);


  }


  ngOnDestroy(): void {
     

  }

}

