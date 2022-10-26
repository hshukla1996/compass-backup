import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, of, Subscription } from 'rxjs';
import { IApplyNowState, IFromSummary } from '../../+state/apply-now.models';
import { IHouseHold, PageDirection, ISnapOrTanfDetails, IFsOrTANFCaseNumber, IFstanfIndividualEBTNumber } from '../../household/household-model';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplyNowIndividualDetailsSnapOrTanfBenefitsDetailsStrategy } from '../../../shared/route-strategies/apply-now/individual-details-snap-or-tanf-benefits-details';
import { UtilService } from "../../../shared/services/util.service";

@Component({
  selector: 'compass-ui-snap-or-tanf-benefits-details',
  templateUrl: './snap-or-tanf-benefits-details.component.html',
  styleUrls: ['./snap-or-tanf-benefits-details.component.scss'],
  providers: [ApplyNowIndividualDetailsSnapOrTanfBenefitsDetailsStrategy],
})
export class SnapOrTanfBenefitsDetailsComponent implements OnInit {
  individualLabel = "";
  householdPersons: IHouseHold[] = [];
  currentSnapUser: any[] = [];
  userName = "John";
  currentUser: IHouseHold = {};
  currentUserIndex!: string;
  currentSnapOrTanfMap!: any;

  routePath: typeof RoutePath = RoutePath;

  public snapOrTanfBenefitForm!: FormGroup;

  @ViewChild('snapOrTanfBenefitFormEle') snapOrTanfBenefitFormEle: any;

  details1!: IFsOrTANFCaseNumber;
  details2!: IFstanfIndividualEBTNumber;

  private eventsSubscription: Subscription | undefined;

  private formSubmitAttempt: boolean = false;

  applyNowState: IApplyNowState | undefined;
  fromSummaryData!: IFromSummary;

  largeImage1 = false;
  largeImage2 = false;

  constructor(private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private routingStrategy: ApplyNowIndividualDetailsSnapOrTanfBenefitsDetailsStrategy,
    private router: Router,
    private cd: ChangeDetectorRef,
    private activedRoute: ActivatedRoute,
    private utilService: UtilService) { }

  ngOnInit(): void {
    this.snapOrTanfBenefitForm = this.fb.group({
      fsOrTANFCaseNumber: '',
      fstanfIndividualEBTNumber: '',
    });

    this.snapOrTanfBenefitForm.get('fsOrTANFCaseNumber')?.valueChanges.subscribe((amount) => {
      if (amount?.toString().length > 9) {
        this.snapOrTanfBenefitForm.get('fsOrTANFCaseNumber')?.setErrors({});
      }
    })

    this.snapOrTanfBenefitForm.get('fstanfIndividualEBTNumber')?.valueChanges.subscribe((cardNumber) => {
      if (cardNumber?.toString().length > 10) {
        this.snapOrTanfBenefitForm.get('fstanfIndividualEBTNumber')?.setErrors({});
      }
    })

    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.householdPersons = this.applyNowState.houseHoldDetails?.houseHoldPersons || [];
      this.currentSnapOrTanfMap = {...this.applyNowState.houseHoldDetails.pageAction?.currentSnapOrTanfMap} || {};
      this.fromSummaryData = this.service.getFromSummaryData() as IFromSummary;
      this.cd.detectChanges();
    });

    this.activedRoute.params.subscribe((p) => {
        if (Object.keys(p).length == 0) {
            this.currentUserIndex =
                this.utilService.getCurrentUserIdOnNoParams(
                    this.currentSnapOrTanfMap
                );
        } else {
            this.currentUserIndex = p.userId || "";
        }
        if (this.householdPersons.length > 0)
            this.currentUser =
                this.service.extractUser(
                    this.householdPersons,
                    this.currentUserIndex
                ) || "";
        this.cd.detectChanges();
    });

    this.userName = this.currentUser.firstName!;

    this.applyNowState?.houseHoldDetails.houseHoldPersons!.forEach((person: IHouseHold) => {
      const clonedPerson = { ...person };
      if (clonedPerson.firstName === this.userName) {
        
        this.details1 = clonedPerson.fsOrTANFCaseNumber!;
        this.details2 = clonedPerson.fstanfIndividualEBTNumber!;
        of(true).pipe(delay(10)).subscribe(() => {
        this.snapOrTanfBenefitForm.patchValue({
          fsOrTANFCaseNumber: this.details1,
          fstanfIndividualEBTNumber: this.details2,
        })
      });
      }
    });

    this.individualLabel = "Tell us more about {replace}'s SNAP or Cash Assistance benefits."
    this.individualLabel = this.individualLabel.replace(this.individualLabel.split("about ")[1].split("'")[0], this.userName);

    this.snapOrTanfBenefitForm.valueChanges.subscribe((d) => {
      
      this.details1 = d.fsOrTANFCaseNumber;
      this.details2 = d.fstanfIndividualEBTNumber;
    });

    this.eventsSubscription = ApplyNowStoreService.submitEvent?.subscribe((val) => {
      const componentPath = val.split("/").pop();
      if (componentPath === this.routePath.APPLYNOW_INDIVIDUALDETAILS_SNAPORTANFBENEFITSDETAILS) {
        this.formSubmitAttempt = true;
        this.snapOrTanfBenefitFormEle.onSubmit(true);
      }
    });
  }

  public isFieldValid(field: string) {
    return (this.snapOrTanfBenefitForm.get(field)?.status !== 'VALID' && this.snapOrTanfBenefitForm.get(field)?.touched) ||
      (this.snapOrTanfBenefitForm.get(field)?.untouched && this.formSubmitAttempt);
  }

  public next() {
    this.service.validateAllFormFields(this.snapOrTanfBenefitForm)
    this.formSubmitAttempt = true;
    if (this.formSubmitAttempt) {
      const storedHouseholdDetails = this.applyNowState?.houseHoldDetails;
      const clonedUpdatedPerson: IHouseHold[] = [];

      this.applyNowState?.houseHoldDetails.houseHoldPersons!.forEach((person: IHouseHold) => {
      const clonedPerson = { ...person };
      if (clonedPerson.firstName === this.userName) {
        clonedPerson.fsOrTANFCaseNumber = this.snapOrTanfBenefitForm.value.fsOrTANFCaseNumber ? 
        this.snapOrTanfBenefitForm.value.fsOrTANFCaseNumber : this.service.checkPropertyForString("fsOrTANFCaseNumber") ? null : ""
        clonedPerson.fstanfIndividualEBTNumber = this.snapOrTanfBenefitForm.value.fstanfIndividualEBTNumber ? 
        this.snapOrTanfBenefitForm.value.fstanfIndividualEBTNumber : this.service.checkPropertyForString("fstanfIndividualEBTNumber") ? null : ""
      }
      clonedUpdatedPerson.push(clonedPerson);
    });
        
      let isNextPage = false;
      this.currentSnapOrTanfMap[this.currentUserIndex] = true;
      const updatedPageAction = {
          ...storedHouseholdDetails?.pageAction,
          currentSnapOrTanfMap: {
              ...storedHouseholdDetails?.pageAction?.currentSnapOrTanfMap,
              ...this.currentSnapOrTanfMap,
          },
          currentSnapOrTanfDirection: PageDirection.NEXT,
      };
      if (storedHouseholdDetails) {
        this.service.updateHouseHoldDetails({
            ...storedHouseholdDetails,
            ...{ houseHoldPersons: clonedUpdatedPerson, pageAction: updatedPageAction },
        });
      }
      if (this.fromSummaryData?.isFromEdit) {
        this.router.navigate([
              RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS_SNAPORTANFBENEFITSSUMMARY,
          ]);
      }
      if (this.currentSnapOrTanfMap != null) {
          isNextPage = this.utilService.isNextPage(this.currentSnapOrTanfMap);
      }
      if (isNextPage) {
          this.utilService
              .getCurrentUserIdPageAction(
                  this.currentSnapOrTanfMap,
                  PageDirection.NEXT
              )
              .subscribe((id: any) => {
                  this.currentUserIndex = id.toString();
                  this.router.navigate([
                      RoutePath.APPLYNOW +
                        "/" +
                        RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                        "/" +
                        RoutePath.APPLYNOW_INDIVIDUALDETAILS_SNAPORTANFBENEFITS,
                      { userId: this.currentUserIndex },
                  ]);
              });
      } else {
          this.router.navigate([
              RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS_SNAPORTANFBENEFITSSUMMARY,
          ]);
      }
    }
  }

  enlargeImage1() {
    if (this.largeImage1) {
      this.largeImage1 = false;
    }
    else {
      this.largeImage1 = true;
    }
  }

  enlargeImage2() {
    if (this.largeImage2) {
      this.largeImage2 = false;
    }
    else {
      this.largeImage2 = true;
    }
  }

  public back() {
    this.router.navigate([
        RoutePath.APPLYNOW +
          "/" +
          RoutePath.APPLYNOW_INDIVIDUALDETAILS +
          "/" +
          RoutePath.APPLYNOW_INDIVIDUALDETAILS_SNAPORTANFBENEFITS,
          { userId: this.currentUserIndex },
    ]);
  }

  public ngOnDestroy(): void {
    this.eventsSubscription?.unsubscribe();
  }
}
