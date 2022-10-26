import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IApplyNowState, IPregnancySummaryScreenDetails } from '../../+state/apply-now.models';
import { AppStoreService } from '../../../app-store-service';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowIndividualDetailsPregnancyDetailsScreenStrategy } from '../../../shared/route-strategies/apply-now/individual-details-pregnancy-details-screen';
import { UtilService } from '../../../shared/services/util.service';
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, PageDirection } from '../../household/household-model';
import * as ProgramConstants from "../../../shared/constants/Individual_Programs_Constants";
import { ApplyNowResourcesReceivedLongTermServicesDetailsStrategy } from '../../../shared/route-strategies/apply-now/received-long-term-services-details';
@Component({
  selector: 'compass-ui-received-long-term-services-details-screen',
  templateUrl: './received-long-term-services-details.component.html',
  styleUrls: ['./received-long-term-services-details.component.scss'],
  providers: [ApplyNowResourcesReceivedLongTermServicesDetailsStrategy]
})
export class ReceivedLongTermServicesDetailsComponent implements OnInit, OnDestroy {

  public receivedLongTermServiceDetails: any = [];

  public receivedLongTermServicesDetailsForm!: FormGroup;

  private eventsSubscription: Subscription | undefined;

  private receivedLongTermServicesMap: any = {};

  private currentUserIndex!: any;

  public currentUser: IHouseHold = {};

  public headFirstName: string | undefined;

  private houseHoldHeadPersons: IHouseHold[] = [];

  public requiredFields = [] as string[];

  /**
     * constructor of Pregnancy Summary Screen component
     * @param fb 
     */
  constructor(private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private appService: AppStoreService,
    private activatedRoute: ActivatedRoute,
    private utilService: UtilService,
    private routingStrategy: ApplyNowResourcesReceivedLongTermServicesDetailsStrategy,
    private router: Router) {
  }

  /**
   * Initialising the form with default values
   */
  public ngOnInit() {
    this.receivedLongTermServicesDetailsForm = this.fb.group({
      receivedLongTermService: [""],
    });

    const activatedRoute$ = this.activatedRoute.params.
      subscribe((p) => {        
        this.houseHoldHeadPersons = this.service.getHouseHoldDetails.houseHoldPersons as IHouseHold[];      
        this.receivedLongTermServicesMap = { ...this.service.getHouseHoldDetails.pageAction?.receivedLongTermServicesMap } || {};

        if (Object.keys(p).length === 0) {
          if (this.utilService.isFirstRoute(this.receivedLongTermServicesMap)) {
            this.currentUserIndex = Object.keys(this.receivedLongTermServicesMap)[0]
          }
          else if (this.utilService.isLastRoute(this.receivedLongTermServicesMap)) {
            this.currentUserIndex = Object.keys(this.receivedLongTermServicesMap)[Object.keys(this.receivedLongTermServicesMap).length - 1];
          }
        }
        else {
          this.currentUserIndex = p.userId || "";
        }

        this.currentUser = this.extractUser(this.houseHoldHeadPersons, this.currentUserIndex) || "";    
        const houseHoldDetails = this.houseHoldHeadPersons.find(x => x.id == +this.currentUserIndex);
        if (houseHoldDetails) {
          this.headFirstName = houseHoldDetails.firstName;
          this.receivedLongTermServicesDetailsForm.patchValue({
            receivedLongTermService: houseHoldDetails && houseHoldDetails.isReceivedLongTermDetails ? houseHoldDetails.isReceivedLongTermDetails : "",
          });
        }
      });

    const longTermDetails$ = this.appService.getHouseHoldExpensesPaid().subscribe((longTermDetails) => {
      this.receivedLongTermServiceDetails = longTermDetails;
    });

    this.setOrResetValidator();
    this.eventsSubscription?.add(longTermDetails$);
    this.eventsSubscription?.add(activatedRoute$);
  }

  private extractUser(persons: any, userId: any) {
    console.log(persons);
    console.log(userId);
    const currentUser = persons.filter((person: IHouseHold) => {
      return person.id?.toString() === userId.toString();
    })[0];
    return currentUser;
  }

  public isFieldValid(field: string) {
    return (this.receivedLongTermServicesDetailsForm.get(field)?.status !== 'VALID' && this.receivedLongTermServicesDetailsForm.get(field)?.touched) ||
      (this.receivedLongTermServicesDetailsForm.get(field)?.status !== 'VALID' && this.receivedLongTermServicesDetailsForm.get(field)?.untouched);
  }

  public goNext(): boolean {
    if (this.receivedLongTermServicesDetailsForm.valid) {
      let storeHouseholdDetails = { ...this.service.getHouseHoldDetails };
      const storedHouseHoldPerson = [...this.service.getHouseHoldDetails.houseHoldPersons as IHouseHold[]];
      const updatedPersonDetails = storedHouseHoldPerson.map(obj => {
        if (obj.id == this.currentUserIndex) {
          const updatedouseHoldPerson = Object.assign({}, obj, { isReceivedLongTermDetails: this.receivedLongTermServicesDetailsForm.value.receivedLongTermService });
          return updatedouseHoldPerson;
        }
        else {
          return obj;
        }
      });


      let isNextPage = false;
      this.receivedLongTermServicesMap[this.currentUserIndex] = true;

      const updatedPageAction = {
        receivedLongTermServicesMap: { ...storeHouseholdDetails.pageAction?.receivedLongTermServicesMap, ...this.receivedLongTermServicesMap },
        serviceDirection: PageDirection.NEXT
      };

      this.service.updateHouseHoldDetails({ ...storeHouseholdDetails, ...{ houseHoldPersons: updatedPersonDetails }, ...{ pageAction: updatedPageAction } })

      if (this.receivedLongTermServicesMap != null) {
        isNextPage = this.utilService.isNextPage(this.receivedLongTermServicesMap);
      }

      if (isNextPage) {
        this.utilService
          .getCurrentUserIdPageAction(this.receivedLongTermServicesMap, PageDirection.NEXT)
          .subscribe((id: any) => {
            this.currentUserIndex = id.toString();
            this.receivedLongTermServicesDetailsForm.reset();
            this.router.navigate([
              this.routingStrategy.currentRoute,
              { userId: this.currentUserIndex },
            ]);
          });
      } else {
        this.router.navigate([this.routingStrategy.nextRoute()]);
      }

      return true;
    } else {
      return false;
    }
  }

  public previous(): boolean {
    this.receivedLongTermServicesMap[this.currentUserIndex] = false;
    const storeHouseholdDetails = this.service.getHouseHoldDetails;
    const updatedPageAction = {
      receivedLongTermServicesMap: { ...storeHouseholdDetails.pageAction?.receivedLongTermServicesMap, ...this.receivedLongTermServicesMap },
      serviceDirection: PageDirection.NEXT
    };

    this.service.updateHouseHoldDetails({ ...storeHouseholdDetails, ...{ pageAction: updatedPageAction } })

    if (Object.keys(this.receivedLongTermServicesMap)[0].toString() !== this.currentUserIndex.toString()) {
      this.utilService
        .getCurrentUserIdPageAction(this.receivedLongTermServicesMap, PageDirection.BACK)
        .subscribe((id: any) => {
          this.currentUserIndex = id.toString();
          this.router.navigate([
            this.routingStrategy.currentRoute, { userId: this.currentUserIndex }]);
        });
    } else {
      this.router.navigate([this.routingStrategy.previousRoute()]);
    }

    return true;
  }

  setOrResetValidator() {
    let householdBenefits = this.service?.getBenefits() as string[];
    const fields = [{
      fieldName: 'receivedLongTermService',
      optionalProgram: [] as string[],
      requiredProgram: ProgramConstants.IND_RECEIVEDLONGTERMDETAILS_REQUIREDPROGRAMS as string[]

    }] as FormValidatorField[];

    if (householdBenefits != null && householdBenefits.length > 0) {
      const requiredOrOptionalValidatorField =
        {
          selectedPrograms: householdBenefits,
          requiredFields: this.requiredFields,
          formGroup: this.receivedLongTermServicesDetailsForm,
          fields: fields
        } as RequiredOrOptionalValidatorField
      Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
      this.receivedLongTermServicesDetailsForm = requiredOrOptionalValidatorField.formGroup;
      this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
    }
  }

  public get getUserFirstName(): string {
    return `${this.currentUser.firstName as string}'s`;
  }

  public ngOnDestroy(): void {
    this.eventsSubscription?.unsubscribe();
  }
}
