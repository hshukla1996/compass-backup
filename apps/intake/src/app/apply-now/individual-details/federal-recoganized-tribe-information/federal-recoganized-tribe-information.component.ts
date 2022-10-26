import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, of, Subscription } from 'rxjs';
import { IApplyNowState } from '../../+state/apply-now.models';
import { AppStoreService } from '../../../app-store-service';
import { RoutePath } from '../../../shared/route-strategies';
import { UtilService } from '../../../shared/services/util.service';
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, PageDirection } from '../../household/household-model';
import { ScreenQueueUtil } from '../individuals-gatepost/individuals-gatepost.paths';
import * as ProgramConstants from "../../../shared/constants/Individual_Programs_Constants";
@Component({
  selector: 'compass-ui-federal-recoganized-tribe-information',
  templateUrl: './federal-recoganized-tribe-information.component.html',
  styleUrls: ['./federal-recoganized-tribe-information.component.scss'],
})
export class FederalRecoganizedTribeInformationComponent implements OnInit {

  applyNowState: IApplyNowState | undefined;
  public selectedUserids: string[] = [];
  private eventsSubscription: Subscription | undefined;
  private houseHoldHeadPersons: IHouseHold[] = [];
  fderalRecoganizedTribeInfoForm: FormGroup | any;
  private federalRecoganizedMap: any = {};
  private currentUserIndex!: any;
  public currentUser: IHouseHold = {};
  public states: any;
  public isReceivedServiceTextVisible = true;
  public requiredFields = [] as string[];
  constructor(
    private service: ApplyNowStoreService,
    private router: Router,
    private queueService: ScreenQueueUtil,
    private federalTribeInfoFormBuilder: FormBuilder,
    private utilService: UtilService,
    private activatedRoute: ActivatedRoute,
    private appService: AppStoreService
  ) {
  }

  ngOnInit(): void {
    this.fderalRecoganizedTribeInfoForm = this.federalTribeInfoFormBuilder.group({
      tribeName: "",
      tribeState: "",
      receivedIndianHealthService: "",
      allowedIndianHelathService: ""
    });
    const activatedRoute$ = this.activatedRoute.params.
      subscribe((p) => {
        const getData$ = this.service.getAppData().subscribe(d => {
          const getStates$ = this.appService.getStates().subscribe((states) => {
            this.states = states;
            this.applyNowState = { ...d };
            this.houseHoldHeadPersons = this.applyNowState.houseHoldDetails.houseHoldPersons as IHouseHold[];
            this.federalRecoganizedMap = { ...this.applyNowState.houseHoldDetails.pageAction?.federalRecoganizedMap } || {};

            if (Object.keys(p).length === 0) {
              if (this.utilService.isFirstRoute(this.federalRecoganizedMap)) {
                this.currentUserIndex = Object.keys(this.federalRecoganizedMap)[0]
              }
              else if (this.utilService.isLastRoute(this.federalRecoganizedMap)) {
                this.currentUserIndex = Object.keys(this.federalRecoganizedMap)[Object.keys(this.federalRecoganizedMap).length - 1];
              }
            }
            else {
              this.currentUserIndex = p.userId || "";
            }

            this.currentUser = this.extractUser(this.houseHoldHeadPersons, this.currentUserIndex) || "";

            const currentUserDetails = this.houseHoldHeadPersons.find((x) => x.id === +this.currentUserIndex) as IHouseHold;

            of(true).pipe(delay(10)).subscribe(() => {
              this.fderalRecoganizedTribeInfoForm.patchValue({
                tribeName: currentUserDetails.federalTribeInformation?.tribeName,
                tribeState: currentUserDetails.federalTribeInformation?.tribeState,
                receivedIndianHealthService: currentUserDetails.federalTribeInformation?.receivedIndianHealthService,
                allowedIndianHelathService: currentUserDetails.federalTribeInformation?.allowedIndianHelathService,
              });
            });

          });

          this.eventsSubscription?.add(getStates$);
        });
        this.eventsSubscription?.add(getData$);
      });

    this.setOrResetValidator();
    this.eventsSubscription?.add(activatedRoute$);
  }

  setOrResetValidator() {  
    let householdBenefits = this.service?.getBenefits() as string[];
    const fields = [{
      fieldName: 'tribeName',
      optionalProgram: ProgramConstants.IND_FEDERAL_TRIBE_INFO_OPTIONALPROGRAMS as string[],
      requiredProgram: [] as string[]

    }, {
      fieldName: 'tribeState',
      optionalProgram: ProgramConstants.IND_FEDERAL_TRIBE_INFO_OPTIONALPROGRAMS as string[],
      requiredProgram: [] as string[]

    }, {
      fieldName: 'receivedIndianHealthService',
      optionalProgram: ProgramConstants.IND_FEDERAL_TRIBE_INFO_OPTIONALPROGRAMS as string[],
      requiredProgram: [] as string[]

    }, {
      fieldName: 'allowedIndianHelathService',
      optionalProgram: ProgramConstants.IND_FEDERAL_TRIBE_INFO_OPTIONALPROGRAMS as string[],
      requiredProgram: [] as string[]

    }] as FormValidatorField[];

    if (householdBenefits != null && householdBenefits.length > 0) {
      const requiredOrOptionalValidatorField =
        {
          selectedPrograms: householdBenefits,
          requiredFields: this.requiredFields,
          formGroup: this.fderalRecoganizedTribeInfoForm,
          fields: fields
        } as RequiredOrOptionalValidatorField
      Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
      this.fderalRecoganizedTribeInfoForm = requiredOrOptionalValidatorField.formGroup;
      this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
    }
  }

  /**
   * 
   * @param persons This will extract the user
   * @param userId 
   * @returns 
   */
  private extractUser(persons: any, userId: any) {
    console.log(persons);
    console.log(userId);
    const currentUser = persons.filter((person: IHouseHold) => {
      return userId ? person.id?.toString() === userId.toString() : false;
    })[0];
    return currentUser;
  }


  isFieldValid(field: string): boolean {
    const formField = this.fderalRecoganizedTribeInfoForm.get(field);
    return (
      formField && this.fderalRecoganizedTribeInfoForm.get(field).status !== "VALID" &&
      this.fderalRecoganizedTribeInfoForm.get(field).touched
    );
  }

  private setFormValidity() {
    const receivedIndianHealthServiceControl = this.fderalRecoganizedTribeInfoForm.get('receivedIndianHealthService');
    const allowedIndianHelathServiceControl = this.fderalRecoganizedTribeInfoForm.get('allowedIndianHelathService');
    if (receivedIndianHealthServiceControl.value.toString().toUpperCase() === "YES") {
      allowedIndianHelathServiceControl.setErrors(null);
    }
  }

  public showNextPage() {
    this.setFormValidity();
    if (this.fderalRecoganizedTribeInfoForm.valid) {
      if (this.applyNowState && this.applyNowState.houseHoldDetails && this.applyNowState.houseHoldDetails.houseHoldPersons) {
        const storedHouseholdDetails = this.applyNowState.houseHoldDetails;
        const clonedUpdatedPerson: IHouseHold[] = [];
        this.applyNowState.houseHoldDetails.houseHoldPersons.forEach((person: IHouseHold) => {
          const clonedPerson = { ...person };
          if (person.id as number === +this.currentUserIndex) {
            clonedPerson.federalTribeInformation = this.fderalRecoganizedTribeInfoForm.value;
          }
          else if (Object.keys(this.federalRecoganizedMap).indexOf(this.currentUserIndex) === -1) {
            clonedPerson.federalTribeInformation = undefined;
          }

          clonedUpdatedPerson.push(clonedPerson);
        });

        // let isNextPage = false;
        this.federalRecoganizedMap[this.currentUserIndex] = true;

        const updatedPageAction = {
          federalRecoganizedMap: { ...storedHouseholdDetails.pageAction?.federalRecoganizedMap, ...this.federalRecoganizedMap },
          federalTaxIncomeMap: { ...storedHouseholdDetails.pageAction?.federalTaxIncomeMap },
          serviceDirection: PageDirection.NEXT
        };


        if (storedHouseholdDetails) {
          this.service.updateHouseHoldDetails(
            { ...storedHouseholdDetails, ...{ houseHoldPersons: clonedUpdatedPerson, pageAction: updatedPageAction } }
          )
        }

        // if (this.federalRecoganizedMap != null) {
        //   isNextPage = this.utilService.isNextPage(this.federalRecoganizedMap);
        // }

        this.router.navigate([
          RoutePath.APPLYNOW + '/' +
          RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' +
          RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALRECOGANIZEDTRIBEINCOME
          , { userId: this.currentUserIndex }]);

        // if (isNextPage) {
        //   this.utilService
        //     .getCurrentUserIdPageAction(this.federalRecoganizedMap, PageDirection.NEXT)
        //     .subscribe((id: any) => {
        //       this.currentUserIndex = id.toString();
        //       this.fderalRecoganizedTribeInfoForm.reset();
        //       this.router.navigate([
        //         RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALRECOGANIZEDTRIBEINFORMATION,
        //         { userId: this.currentUserIndex },
        //       ]);
        //     });
        // } else {
        //   this.router.navigate([
        //     RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALRECOGANIZEDTRIBEINCOME,
        //   ]);
        // }
      }
    }
  }

  public showIsReceivedServiceText(showText: boolean): void {
    this.isReceivedServiceTextVisible = showText;
  }

  public errorMap(field: string) {
    if (!this.isFieldValid(field)) {
      return "";
    }

    switch (field) {
      case "tribeName":
        if (this.fderalRecoganizedTribeInfoForm.get("tribeName").errors?.required) {
          return "Tribe Name is required.";
        }
        break;
      case "receivedIndianHealthService":
        if (
          this.fderalRecoganizedTribeInfoForm.get("receivedIndianHealthService").errors
            .required
        ) {
          return "Please select Yes or No";
        }
        break;

      default:
        return "";
    }
    return "";
  }

  public showPreviousPage() {
    if (this.applyNowState) {
      this.federalRecoganizedMap[this.currentUserIndex] = false;
      const storeHouseholdDetails = this.applyNowState.houseHoldDetails;
      const updatedPageAction = {
        federalRecoganizedMap: { ...storeHouseholdDetails.pageAction?.federalRecoganizedMap, ...this.federalRecoganizedMap },
        federalTaxIncomeMap: { ...storeHouseholdDetails.pageAction?.federalTaxIncomeMap },
        serviceDirection: PageDirection.NEXT
      };

      this.service.updateHouseHoldDetails({ ...storeHouseholdDetails, ...{ pageAction: updatedPageAction } })

      if (Object.keys(this.federalRecoganizedMap)[0].toString() !== this.currentUserIndex.toString()) {
        this.utilService
          .getCurrentUserIdPageAction(this.federalRecoganizedMap, PageDirection.BACK)
          .subscribe((id: any) => {
            this.currentUserIndex = id.toString();
            this.router.navigate([
              RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALRECOGANIZEDTRIBEINFORMATION,
              { userId: this.currentUserIndex }]);
          });
      } else {
        this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALRECOGANIZEDTRIBE]);
      }

      return true;
    }
    else {
      return false;
    }
  }

  ngOnDestroy(): void {
    this.eventsSubscription?.unsubscribe();
  }
}
