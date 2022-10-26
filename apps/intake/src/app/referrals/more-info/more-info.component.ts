import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, findIndex, Observable, Subscription } from 'rxjs';
import { IIndividual } from '../+state/household-details-model';
import { Individual, Individuals, IReferralsState, PageDirection } from '../+state/referrals.models';
import { AppStoreService } from '../../app-store-service';
import { MenuItemState } from '../../shared/menu-item-state';
import { RoutePath } from '../../shared/route-strategies';
import { ReferralsMoreInfoStrategy } from '../../shared/route-strategies/referrals/more-info';
import { ScreenQueueUtil } from '../../shared/services/screen_queue_util.service';
import { UtilService } from '../../shared/services/util.service';
import { Utility } from '../../shared/utilities/Utility';
import { ReferralStoreService } from '../referrals-store-service';

@Component({
  selector: 'compass-ui-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ReferralsMoreInfoStrategy]
})
export class MoreInfoComponent implements OnInit {
  @ViewChild('moreInfoFormEle') householdDetailsFormEle: any;
  @Output() formState = new EventEmitter<MenuItemState>();
  data: any;
  remainingCharacters: any = "";
  routePath: typeof RoutePath = RoutePath;
  counties$: Observable<any> | undefined;
  schoolDistricts$: Observable<any> | undefined;
  counties: any;
  selectedCounty: any;
  selectedSchoolDistrict: any;
  selectedUserIds!: any[];
  schoolDistricts: any;
  reasonForReferral!: string | undefined;
  householdDetailsForm: FormGroup | any;
  currentUser: IIndividual = {};
  individuals: IIndividual[] = [];
  referralState!: IReferralsState;
  currentServicesMap: any;
  currentId$ = new BehaviorSubject<number>(0);
  currentUserIndex!: any;
  indAge: any;

  constructor(private fb: FormBuilder, private route: Router,
    private service: ReferralStoreService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private queueService: ScreenQueueUtil,
    private appService: AppStoreService,
    private routingStratagy: ReferralsMoreInfoStrategy,
    private utilService: UtilService,
    private activatedRoute: ActivatedRoute,
    private store: Store<any>) {
  }
  isFieldValid(field: string): boolean {
    if (this.householdDetailsForm.get(field).status !== 'VALID') {
    }
    return (this.householdDetailsForm.get(field).status !== 'VALID' && this.householdDetailsForm.get(field).touched)
  }
  ngOnInit() {
    this.householdDetailsForm = this.fb.group({
      county: ['', Validators.required],
      schoolDistrict: ['',],
      reasonForReferral: [''],
      validState: true
    });
    this.counties$ = this.appService.getCounties();
    this.counties$.subscribe(c => {
      this.counties = c;
      this.cd.detectChanges();
    });
    const pathName: any = this.queueService.getFirstPath() || "";

    this.service.menuStateUpdated(pathName);
    this.service.formStateUpdated(pathName, MenuItemState.COMPLETED);


    this.service.formStateUpdated(this.routePath.REFERRALS_MOREINFORMATION, MenuItemState.INPROGRESS)

    this.appService.getSchoolDistricts().subscribe((e: any) => {
      this.schoolDistricts = e;
      this.cd.detectChanges();
    });
    this.individuals = this.service.getIndividuals ?? [];


    this.householdDetailsForm.get("county").valueChanges.subscribe((selectedValue: string) => {
      this.selectedCounty = selectedValue;
    });
    this.householdDetailsForm.get("schoolDistrict").valueChanges.subscribe((selectedValue: string) => {
      this.selectedSchoolDistrict = selectedValue;

    });

    this.activatedRoute.params.
      subscribe((p) => {



        this.currentServicesMap =
          {

            ...this.service.getReferralState.pageAction

              ?.currentServicesMap,

          } || {};
        if (Object.keys(p).length === 0) {

          if (this.utilService.isFirstRoute(this.currentServicesMap)) {
            this.currentUserIndex = Object.keys(this.currentServicesMap)[0]
          }

          else if (this.utilService.isLastRoute(this.currentServicesMap)) {

            this.currentUserIndex = Object.keys(this.currentServicesMap)[

              Object.keys(this.currentServicesMap).length - 1

            ];

          }

        }

        else {

          this.currentUserIndex =

            p.userId || "";

        }
        this.selectedUserIds = Object.keys(this.currentServicesMap);
        this.currentUser =
          this.extractUser(

            this.individuals,

            this.currentUserIndex

          ) || "";
        this.indAge = Utility.getAge(this.currentUser.dateOfBirth)
        this.householdDetailsForm.reset();

        if ((this.currentUser.appliedReferrals || []).indexOf('EI') > -1) {
          this.householdDetailsForm.get('schoolDistrict').setValidators(Validators.required);
        } else {

          this.householdDetailsForm.get('schoolDistrict').clearValidators();
        }
        this.householdDetailsForm.get('reasonForReferral').patchValue(this.currentUser.reasonForReferral)
        this.householdDetailsForm.get('county').patchValue(this.currentUser.county)
        this.householdDetailsForm.get('schoolDistrict').patchValue(this.currentUser.schoolDistrict)
        this.cd.detectChanges();

      });


  }


  extractUser(persons: any, userId: any) {
    const currentUser = persons.filter((person: IIndividual) => {
      return person.individualNumber?.toString() === userId.toString();
    })[0];
    return currentUser;
  }

  valueChange(value: any) {
    this.remainingCharacters = 255 - value
  }
  errorMap(field: string) {
    if (!this.isFieldValid(field)) {
      return "";
    }

    switch (field) {

      case 'county':
        if (this.householdDetailsForm.get('county').errors.required) {
          return 'No County has been Selected'
        }
        break;

      case 'schoolDistrict':
        if (this.householdDetailsForm.get('schoolDistrict').errors.required) {
          return 'No School District has been Selected '
        }
        break;
    }

    return ""
  }

  previous() {
    this.currentServicesMap[this.currentUserIndex] = false;
    const updatedPageAction = {
      ...this.service.getReferralState.pageAction,
      currentServicesMap: this.service.getReferralState.pageAction?.currentServicesMap ? { ...this.service.getReferralState.pageAction?.currentServicesMap, ...this.currentServicesMap } : this.currentServicesMap,
      serviceDirection: PageDirection.BACK
    };
    this.service.updatePageAction(updatedPageAction);




    if (

      Object.keys(this.currentServicesMap)[0].toString() !==

      this.currentUserIndex.toString()

    ) {



      this.utilService

        .getCurrentUserIdPageAction(

          this.currentServicesMap,

          PageDirection.BACK,

        )

        .subscribe((id: any) => {

          this.currentUserIndex = id.toString();

          this.router.navigate([

            this.routingStratagy.currentRoute,

            { userId: this.currentUserIndex },

          ]);

        });



    } else {



      this.queueService.back();


    }

  }

  next() {
    this.individuals = this.service.getIndividuals ?? [];
    const updatedIndividuals = this.individuals.map((user: any, index: number) => {

      let newUser = { ...user };
      if ((newUser.appliedReferrals || []).indexOf('EI') == -1) {
        newUser.schoolDistrict = ""
      }
      if (user.individualNumber.toString() === this.currentUserIndex.toString()) {
        newUser.reasonForReferral = this.householdDetailsForm.get("reasonForReferral").value
        newUser.county = this.householdDetailsForm.get("county").value

        if ((newUser.appliedReferrals || []).indexOf('EI') > -1) {
          newUser.schoolDistrict = this.householdDetailsForm.get("schoolDistrict").value
        }

      }

      return newUser


    })

    this.service.updateIndividualDetails(updatedIndividuals);

    this.service.validateAllFormFields(this.householdDetailsForm)
    if (this.householdDetailsForm.status.toLowerCase() === 'valid') {

      let isNextPage = false;
      this.currentServicesMap[this.currentUserIndex] = true;
      const updatedPageAction = {
        ...this.service.getReferralState.pageAction,
        currentServicesMap: this.service.getReferralState.pageAction?.currentServicesMap ? { ...this.service.getReferralState.pageAction?.currentServicesMap, ...this.currentServicesMap } : this.currentServicesMap,
        serviceDirection: PageDirection.NEXT,
      };
      this.service.updatePageAction(updatedPageAction);

      if (this.currentServicesMap != null) {
        isNextPage = this.utilService.isNextPage(this.currentServicesMap);
      }
      if (isNextPage) {

        this.utilService

          .getCurrentUserIdPageAction(this.currentServicesMap, PageDirection.NEXT)

          .subscribe((id: any) => {

            this.currentUserIndex = id.toString();

            this.router.navigate([

              this.routingStratagy.currentRoute,

              { userId: this.currentUserIndex },

            ]);



          });




      } else {


        this.queueService.next();


      }
    }


  }


}
