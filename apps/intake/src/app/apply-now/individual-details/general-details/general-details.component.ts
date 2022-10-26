import { ChangeDetectionStrategy, Component, OnInit, Output, Input, ChangeDetectorRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { IGeneralDetails } from "./state/general-details-model";
import { IApplyNowState } from "../../+state/apply-now.models";
import {delay, of} from "rxjs";
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { AppStoreService } from "../../../app-store-service";
import { ApplyNowGeneralDetailsStrategy } from '../../../shared/route-strategies/apply-now/general-details';
import { IHouseHold, PageDirection } from '../../household/household-model';
import {UtilService} from "../../../shared/services/util.service";
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from '../../../shared/utilities/Utility';
import {
  IND_GEN_DETAIL_CITIZENSHIP_REQUIRED_PROGRAMS,
  IND_GEN_DETAIL_DOD_OPTIONAL_PROGRAM,
  IND_GEN_DETAIL_DOS_REQUIRED_PROGRAM,
  IND_GEN_DETAIL_GRAD_OPTIONAL_PROGRAM,
  IND_GEN_DETAIL_GRAD_REQUIRED_PROGRAM,
  IND_GEN_DETAIL_MARITALSTATUS_OPTIONAL_PROGRAMS,
  IND_GEN_DETAIL_MARITALSTATUS_REQUIRED_PROGRAMS,
  IND_GEN_DETAIL_RUNAWAY_REQUIRED_PROGRAM,
  IND_GEN_DETAIL_SPOUSENAME_OPTIONAL_PROGRAMS,
  INDIVIDUAL_PROGRAMS
} from '../../../shared/constants/Individual_Programs_Constants';
import {EntryScreenQueueUtil} from "../individuals-entry-gatepost";
import { RoutePath } from '../../../shared/route-strategies';
//import Validation from './utils/validation';
@Component({
    selector: "compass-ui-general-details",
    templateUrl: "./general-details.component.html",
    styleUrls: ["./general-details.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ApplyNowGeneralDetailsStrategy],
})
export class GeneralDetailsComponent implements OnInit {
    data: any;
    // private formSubmitAttempt: boolean = false;
    maxDateRange = new Date().toISOString().slice(0, 10);
    currentUserIndex!: string;
    currentUser: IHouseHold = {};
    generalDetailsForm: FormGroup | any;
    generalDetails: IGeneralDetails | null = null;
    applyNowState: IApplyNowState | undefined;
    submitted = false;
    selectedMaritalStatus: any;
    personsMap!: any;
    personAge!:number;
  houseHoldPersons:IHouseHold[] = [];
    citizenships: any;
    educations:any;
    maritalStatusTypes:any;
  requiredFields=[] as string[]
 fieldDisplays:any= {};
 headOftheHouse:boolean = false;
    constructor(
        private fb: FormBuilder,
        private route: Router,
        private service: ApplyNowStoreService,
        private appService: AppStoreService,
        private cd: ChangeDetectorRef,
        private routingStratagy: ApplyNowGeneralDetailsStrategy,
        private router: Router,
        private activedRoute: ActivatedRoute,
        private utilService: UtilService,
        private queueService:EntryScreenQueueUtil
    ) {
        //this.data = this.getData();
    }

    isFieldValid(field: string): boolean {
        if (this.generalDetailsForm.get(field).status !== "VALID") {
            //console.log("invalid");
            //console.log(field);
            //console.log(this.generalDetailsForm.get(field).touched);
        }
        return (
            this.generalDetailsForm.get(field).status !== "VALID" &&
            this.generalDetailsForm.get(field).touched
        );
    }
    ngOnInit() {
        this.generalDetailsForm = this.fb.group({
            citizenship: [""],
            maritalStatus: ["" ],
            qualification: ["" ],
            runaway: ["",],
            validState: true,
            spouseName: [""],
            spouseDeathDate: ["", Utility.dateMaxValidator()],
            dateOfSeperation: ["", Utility.dateMaxValidator()],
        });
      this.maxDateRange = new Date().toISOString().slice(0, 10);
        this.appService.getCitizenship().subscribe((c) => {
            this.citizenships = c;
            this.cd.detectChanges();
        });

        this.appService.getMaritalStatus().subscribe((c) => {
            this.maritalStatusTypes = c;
            this.cd.detectChanges();
        });

        this.appService.getEducationData().subscribe((c) => {
            this.educations = c;
            this.cd.detectChanges();
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
            this.cd.detectChanges();
        });
      this.activedRoute.params.subscribe((p) => {
        if (Object.keys(p).length == 0) {
       this.currentUserIndex =  this.utilService.getCurrentUserIdOnNoParams(this.personsMap);
        } else {
          this.currentUserIndex = p.userId || "";
        }
        if (this.houseHoldPersons.length > 0)
          this.currentUser =
            this.service.extractUser(
              this.houseHoldPersons,
              this.currentUserIndex
            ) || "";
        this.setFieldProgramValidations(this.currentUser)
        this.personAge = Utility.getAge(this.currentUser.dateOfBirth);
        of(true).pipe(delay(10)).subscribe(() => {
          this.generalDetailsForm.patchValue({
            citizenship:this.currentUser?.citizenship?.citizenshipCode,
            maritalStatus: this.currentUser?.maritalStatus,
            spouseName:this.currentUser?.spouseName,
            spouseDeathDate: Utility.duetFormatDate(this.currentUser?.spouseDeathDate),
            dateOfSeperation: Utility.duetFormatDate(this.currentUser?.separationDate),
            qualification:this.currentUser?.highestGradeLevelCompleted,
            runaway:this.currentUser?.runaway ? (this.currentUser?.runaway === "Y" ?'Yes':'No') : null
          })
        });
        if (this.applyNowState?.houseHoldDetails.HeadofHousehold == this.currentUser.id) {
          this.headOftheHouse = true;
        }

        this.cd.detectChanges();
      });
       // this.generalDetailsForm.valueChanges.subscribe((d: any) => {
            //console.log(this.generalDetailsForm);
       //     this.cd.detectChanges();
            //this.service.updateBasicDetails({ basicDetails: this.basicDetails, validState: valid } as unknown as BasicDetails);
       // });

        this.generalDetailsForm
            .get("maritalStatus")
            .valueChanges.subscribe((selectedValue: string) => {
                this.selectedMaritalStatus = selectedValue;
                if(['4','5','7'].indexOf(selectedValue) === -1) {
                  this.generalDetailsForm
                    .get("dateOfSeperation").clearValidators();
                  this.generalDetailsForm
                    .get("dateOfSeperation").updateValueAndValidity();
                }
                else {
                  this.generalDetailsForm.controls['dateOfSeperation'].setValidators([Utility.dateMaxValidator()]);

                }
          if(selectedValue === '6'){
              this.generalDetailsForm.controls['spouseDeathDate'].setValidators([Utility.dateMaxValidator()]);
          }
          this.generalDetailsForm
            .get("spouseName")
            .patchValue(
              ""
            );
          this.generalDetailsForm
            .get("spouseDeathDate")
            .patchValue(
             ""
            );
          this.generalDetailsForm
            .get("dateOfSeperation")
            .patchValue(
             ""
            );

            });

    }

    setFieldProgramValidations(ind:IHouseHold){
      const indBenfits = this.service?.getAppliedBenefitsForIndividual(ind) as string[];
      const fields = [{
        fieldName: 'citizenship',
        optionalProgram:  [INDIVIDUAL_PROGRAMS.FS, INDIVIDUAL_PROGRAMS.FSR, INDIVIDUAL_PROGRAMS.ES, INDIVIDUAL_PROGRAMS.ESR, INDIVIDUAL_PROGRAMS.MCR, INDIVIDUAL_PROGRAMS.MAR, INDIVIDUAL_PROGRAMS.CHR],
        requiredProgram: IND_GEN_DETAIL_CITIZENSHIP_REQUIRED_PROGRAMS as string[]

      }, {
        fieldName: 'maritalStatus',
        optionalProgram: IND_GEN_DETAIL_MARITALSTATUS_OPTIONAL_PROGRAMS as string[],
        requiredProgram: IND_GEN_DETAIL_MARITALSTATUS_REQUIRED_PROGRAMS as string[]

      },
        {
          fieldName: 'spouseName',
          optionalProgram: IND_GEN_DETAIL_SPOUSENAME_OPTIONAL_PROGRAMS as string[],
          requiredProgram: [] as string[]

        },

      {
          fieldName: 'dateOfSeperation',
          optionalProgram: [] as string[],
          requiredProgram: IND_GEN_DETAIL_DOS_REQUIRED_PROGRAM as string[]

        },
        {
          fieldName: 'spouseDeathDate',
          optionalProgram: IND_GEN_DETAIL_DOD_OPTIONAL_PROGRAM as string[],
          requiredProgram: [] as string[]

        },
        {

          fieldName: 'qualification',
          optionalProgram: IND_GEN_DETAIL_GRAD_OPTIONAL_PROGRAM as string[],
          requiredProgram: IND_GEN_DETAIL_GRAD_REQUIRED_PROGRAM as string[]


        },
        {

          fieldName: 'runaway',
          optionalProgram: [] as string[],
          requiredProgram: IND_GEN_DETAIL_RUNAWAY_REQUIRED_PROGRAM as string[]


        }] as FormValidatorField[]
        this.fieldDisplays = {};
        fields.forEach((fieldObj:FormValidatorField)=>{
          this.fieldDisplays[fieldObj.fieldName] = this.service
            .areProgramsExist(indBenfits,[...fieldObj.optionalProgram,...fieldObj.requiredProgram])
        })
      if (indBenfits != null && indBenfits.length > 0) {
        const requiredOrOptionalValidatorField =
          {

            selectedPrograms: indBenfits,
            requiredFields: [],
            formGroup: this.generalDetailsForm,
            fields: fields
          } as RequiredOrOptionalValidatorField
        Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
        this.generalDetailsForm = requiredOrOptionalValidatorField.formGroup;
        this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
      }
    }
    get f() {
        return this.generalDetailsForm.controls;
    }

    errorMap(field: string) {

        if (!this.isFieldValid(field)) {
            return "";
        }

        switch (field) {
            case "citizenship":
                if (
                    this.generalDetailsForm.get("citizenship").errors.required
                ) {
                    return "Citizenship is required.";
                }
                break;
            case "maritalStatus":
                if (
                    this.generalDetailsForm.get("maritalStatus").errors.required
                ) {
                    return "Marital status is required.";
                }
                break;
            case "qualification":
                if (
                    this.generalDetailsForm.get("qualification").errors.required
                ) {
                    return "qualification status is required.";
                }
                break;
            case "runaway":
                if (this.generalDetailsForm.get("runaway").errors.required) {
                    return "Runaway is required.";
                }
                break;

            case "dateOfSeperation":
                 if (
                   this.requiredFields.indexOf("dateOfSeperation") > -1 && this.selectedMaritalStatus === '4'

                 ) {
                     return "Spouse date of seperation is required.";
                 }
                 else if(this.generalDetailsForm.get("dateOfSeperation").errors.invalidDate) {
                   return "Date should not exceed today's date.";
                 }
                 if (this.generalDetailsForm.get("dateOfSeperation").errors.duetInvalidDate) {
                    return "duetInvalidDate";
                }
                break;
          case "spouseDeathDate":
            if (
              this.requiredFields.indexOf("spouseDeathDate") > -1 && this.selectedMaritalStatus === '6'
            ) {
              return "Spouse death date is required.";
            }
            if(this.generalDetailsForm.get("spouseDeathDate").errors.invalidDate) {
              return "Date should not exceed today's date.";
            }
            if (this.generalDetailsForm.get("spouseDeathDate").errors.duetInvalidDate) {
                return "duetInvalidDate";
            }
            break;
            default:
                return "";
                break;
        }
        return "";
    }

    dropdownValueChanged(e: any) {
        console.log(e);
    }


    onSubmit(): boolean {
        //this.generalDetailsForm.markAllAsTouched();
        this.service.validateAllFormFields(this.generalDetailsForm);
        console.log(this.generalDetailsForm);
        if (this.generalDetailsForm.status.toLowerCase() === "valid") {

          const storedHouseholdDetails = this.applyNowState?.houseHoldDetails;
          //iterantive over absent relatives , find the current from the absent relvative map and update address
          const updatedHouseholdPersons =  this.applyNowState?.houseHoldDetails.houseHoldPersons?.map((person:IHouseHold)=>{

            if(person.id === this.currentUser.id) {
              const personToBeUpdated = {...person};
              //absent revelatve = addreess entered
              personToBeUpdated.citizenship = {citizenshipCode: this.generalDetailsForm.get("citizenship").value};
              personToBeUpdated.maritalStatus = this.generalDetailsForm.get("maritalStatus").value
              personToBeUpdated.separationDate = this.generalDetailsForm.get("dateOfSeperation").value
              personToBeUpdated.spouseName = this.generalDetailsForm.get("spouseName").value
              personToBeUpdated.spouseDeathDate = this.generalDetailsForm.get("spouseDeathDate").value
              personToBeUpdated.highestGradeLevelCompleted = this.generalDetailsForm.get("qualification").value
              personToBeUpdated.runaway = this.fieldDisplays.runaway ? this.generalDetailsForm.get("runaway").value?.charAt(0): ''
              return personToBeUpdated;

            }
            else{
              return person;
            }
          });

          if(storedHouseholdDetails) {
            this.service.updateHouseHoldDetails(
              {...storedHouseholdDetails,...{houseHoldPersons:updatedHouseholdPersons}}
            )
          }

          this.queueService.next();

           // this.router.navigate([this.routingStratagy.nextRoute(),{ userId: this.currentUserIndex },]);
            return true;
        } else {
            return false;
        }
    }
    previous() {
      const lastUser =   this.utilService.getLastUser(this.personsMap);
      const lastPath = sessionStorage.getItem("lastpath");
      const storedHouseholdDetails = this.service.getHouseHoldDetails;
       if (lastUser) {
            this.personsMap[lastUser] = false;
          const updatedPageAction = {
              ...storedHouseholdDetails?.pageAction,
              personsMap: {
                  ...storedHouseholdDetails?.pageAction?.personsMap,
                  ...this.personsMap,
              },
              serviceDirection: PageDirection.NEXT,
          };
          if (storedHouseholdDetails)
              this.service.updateHouseHoldDetails({
                  ...storedHouseholdDetails,
                  ...{ pageAction: updatedPageAction }
              });
  const lastUserObj = this.service.extractUser(
     this.houseHoldPersons,
     lastUser
 );
 this.queueService.initRevDynamicRoutes(
     lastUserObj,
     RoutePath.APPLYNOW_INDIVIDUALDETAILS +
         "/" +
         RoutePath.APPLYNOW_DEMOGRAPHIC_SUMMARY
 );
           this.route.navigate([
               RoutePath.APPLYNOW + "/" + lastPath,
               { userId: lastUser },
           ]);
       } else {
           this.router.navigate([this.routingStratagy.previousRoute()]);
       } 
      }
}
