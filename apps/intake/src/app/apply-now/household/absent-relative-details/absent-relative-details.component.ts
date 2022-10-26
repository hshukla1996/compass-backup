import { ApplyNowAbsentRelativeDetailsStrategy } from "../../../shared/route-strategies/apply-now/absentRelativeDetails";
import {
    ChangeDetectorRef,
    Component,
    Directive,
    EventEmitter,
    OnInit,
    Output,
} from "@angular/core";
import {
    FormGroup,
    FormControl,
    ReactiveFormsModule,
    FormBuilder,
    Validators,
    AbstractControl,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { AppStoreService } from "../../../app-store-service";
import { HouseholdHead } from "../models/householdHead";
import { IApplyNowState } from "../../+state/apply-now.models";
import { delay, of } from "rxjs";
import { Observable } from "rxjs";
import { HouseholdFormDataService } from "../services/household-form-data.service";
import { AbsentRelativeDetails } from "../models/absentRelativeDetails";
import {
    IHouseHoldDetails,
    IAbsentRelative,
    IHouseHold,
} from "../household-model";
import { ScreenQueueUtil } from "../../../shared/services/screen_queue_util.service";
import { INDIVIDUAL_PROGRAMS } from "../../../shared/constants/Individual_Programs_Constants";
import {
    FormValidatorField,
    RequiredOrOptionalValidatorField,
    Utility,
} from "../../../shared/utilities/Utility";
import {RoutePath} from "../../../shared/route-strategies";

@Component({
  selector: 'compass-ui-absent-relative-details',
  templateUrl: './absent-relative-details.component.html',
  styleUrls: ['./absent-relative-details.component.scss'],
  providers: [ApplyNowAbsentRelativeDetailsStrategy]
})
export class AbsentRelativeDetailsComponent implements OnInit {
    absentRelativeDetailsForm: FormGroup | any;
    private formSubmitAttempt: boolean = false;
    firstNamelocal: string = "";
    deceasedError: boolean = false;
    genderError: boolean = false;
    applyNowState!: IApplyNowState;
    maxDateRange: any;
    minDateRange: any;
    suffixls: any[] = [];
    editedMember!: any;
    currentUser!: any;
    showAnotherName = false;
    parentSpouseOrBoth$: Observable<any> | undefined;
    parentSpouseOrBoth: any;
    y: any;
    storedHouseHoldDetail!: IHouseHoldDetails;
    absentRelatives: IAbsentRelative[] = [];
    currentUserIndex!: any;
    visit: boolean = false;
    visitCount: any;
    isDateValid = true;
    houseHoldPersons: IHouseHold[] = [];
    requiredFields = [] as string[];
    fieldDisplays: any = {};
    showError = false;

    constructor(
        private fb: FormBuilder,
        // public householdFormDataService: HouseholdFormDataService,
        private househead: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private queueService: ScreenQueueUtil,
        private service: ApplyNowStoreService,
        private cd: ChangeDetectorRef,
        private routingStrategy: ApplyNowAbsentRelativeDetailsStrategy,
        private appService: AppStoreService
    ) {}

    ngOnInit(): void {
        this.maxDateRange = new Date().toISOString().slice(0, 10);
        this.minDateRange = new Date("1875-01-01").toISOString().slice(0, 10);
        // console.log("date", new Date());
        this.absentRelativeDetailsForm = this.fb.group({
            id: [""],
            firstName: [""],
            midName: [""],
            lastName: [""],
            suffix: [""],
            dateOfBirth: ["", [Utility.dateMaxValidator(), Utility.dateStartValidator("1875-01-01")]],
            deceased: [""],
            socialSecurityNumber: [""],
            gender: [""],
            isThisPersonSpouseParentOrBothOfTheHouseholdMember: [""],
            //raceInformation: [],
            //hispanicOrigin: false,
        });
        this.appService.getParentSpouseOrBoth().subscribe((data) => {
            this.parentSpouseOrBoth = data;
        });

        this.appService.getSuffix().subscribe((suffix: any[]) => {
            let newSuffix = [...suffix];
            newSuffix.sort((a: any, b: any) => {
                return a.additionalColumns.FlexOrder - b.additionalColumns.FlexOrder
            });
            this.suffixls = newSuffix;
            this.cd.detectChanges();
        });
        this.service.getAppData().subscribe((d) => {
            this.storedHouseHoldDetail = d?.houseHoldDetails;
            this.applyNowState = { ...d };
          this.currentUserIndex = sessionStorage.getItem("storageId");
            if (this.applyNowState.houseHoldDetails.absentRelative &&  this.currentUserIndex) {
                this.absentRelatives =
                    this.applyNowState.houseHoldDetails.absentRelative;


            this.currentUser =
                this.service.extractUser(this.absentRelatives, this.currentUserIndex) ||
                "";
            console.log("this.saved users")
            console.log( this.applyNowState.houseHoldDetails.absentRelative)
      this.absentRelativeDetailsForm.get('firstName').patchValue(this.currentUser.firstName);
      this.absentRelativeDetailsForm.get('midName').patchValue(this.currentUser.midName);
      this.absentRelativeDetailsForm.get('lastName').patchValue(this.currentUser.lastName);
      this.absentRelativeDetailsForm.get('suffix').patchValue(this.currentUser.suffix);
      this.absentRelativeDetailsForm.get('dateOfBirth').patchValue(Utility.duetFormatDate(this.currentUser.dateOfBirth));
      this.absentRelativeDetailsForm.get('deceased').patchValue(this.currentUser.deceased ? (this.currentUser.deceased === 'Y' ? "Yes" : "No") : null);
      this.absentRelativeDetailsForm.get('socialSecurityNumber').patchValue(this.currentUser.socialSecurityNumber);
      this.absentRelativeDetailsForm.get('gender').patchValue(this.currentUser.gender ? (this.currentUser.gender === 'M' ? "Male" : "Female") : null);
      this.absentRelativeDetailsForm.get('isThisPersonSpouseParentOrBothOfTheHouseholdMember').patchValue(this.currentUser.isThisPersonSpouseParentOrBothOfTheHouseholdMember);
        this.cd.detectChanges();
            }
    });
    }
  
    extractUser(persons: any, userId: any) {
        const currentUser = persons.filter((person: IAbsentRelative) => {
      return person.id?.toString() === sessionStorage.getItem("storageId")?.toString();
        })[0];
        return currentUser;
    }

    changeDeceased(e: any): void {
        this.deceasedError = false;
    }

    changeGender(e: any): void {
        this.genderError = false;
    }

    dateOfBirthValidator(control: AbstractControl) {
        if (control) {
            if (
                control.value == null ||
                control.value === undefined ||
                control.value === ""
            ) {
                return { date_error: "date error message" };
            }
        }
        return null;
    }

    private myFormValidator(predicate: any, validator: any): any {
    return ((formControl: FormControl) => {
            if (!formControl.parent) {
                return null;
            }
            if (predicate()) {
                return validator(formControl);
            }
            return null;
    });
    }

    GetValue(value: string) {
        this.firstNamelocal = value;
    }

    isFieldValid(field: string): boolean {
    return (this.absentRelativeDetailsForm.get(field).status !== 'VALID' && (this.absentRelativeDetailsForm.get(field).dirty || this.absentRelativeDetailsForm.get(field).touched))

    }

    errorMap(field: string) {
    if (!this.isFieldValid(field)) {
      return ''

    }

        switch (field) {
            case "firstName":
                if (
                    this.absentRelativeDetailsForm.get("firstName").errors
                        ?.required
                ) {
                    return "First Name is required.";
                } else {
          return 'Enter only alphabets.';
                }
                break;
            case "midName":
                if (
                    this.absentRelativeDetailsForm.get("midName").errors
                        ?.pattern
                ) {
                    return "Enter only alphabets.";
                } else {
          const midNameControlValue = this.absentRelativeDetailsForm.get("midName")
                    if (midNameControlValue.value.length > 1) {
            return 'max length is 1 character.'
          }
          else {
                        of(true)
                            .pipe(delay(1))
                            .subscribe(() => {
                                midNameControlValue.setErrors(null);
                            });
                    }
                }
                break;

            case "lastName":
                if (
                    this.absentRelativeDetailsForm.get("lastName").errors
                        ?.required
                ) {
                    return "Last Name is required.";
                } else {
          return 'Enter only alphabets.';
                }
                break;
            case "dateOfBirth":
                if (this.absentRelativeDetailsForm.get('dateOfBirth').errors?.invalidDate) {
                    return 'Date Of Birth must be in the past and not before January 1, 1875.'
                }
                if (this.absentRelativeDetailsForm.get("dateOfBirth").errors.duetInvalidDate) {
                    return "duetInvalidDate";
                }
                break;
            case "deceased":
                if (
                    this.absentRelativeDetailsForm.get("deceased").errors
                        ?.required
                ) {
                    return "Deceased is required.";
                }
                break;
            case "gender":
                if (
                    this.absentRelativeDetailsForm.get("gender").errors
                        ?.required
                ) {
                    return "Gender is required.";
                }
                break;
            default:
                return "";
                break;
        }
        return "";
    }

    ssnValidator(ssn: any) {
        this.showError = ssn;
    }
    onSubmit(): boolean {
        if (this.showError) return false;
      this.service.validateAllFormFields(this.absentRelativeDetailsForm);
      //if (this.absentRelativeDetailsForm.valid) {
        var y: number;
        var x = sessionStorage.getItem("storageId");
        if (x == null) {
            x = String(1);
            y = 1;
            sessionStorage.setItem("storageId", x?.toString());
        } else {
            y = parseInt(x);
            sessionStorage.setItem("storageId", y?.toString());
        }
        console.log("absent Relative", this.absentRelativeDetailsForm);
        const updatedAbsentRelative = {
            id: y,
      firstName: this.absentRelativeDetailsForm.controls['firstName'].value,
      lastName: this.absentRelativeDetailsForm.controls['lastName'].value,
      midName: this.absentRelativeDetailsForm.controls['midName'].value,
      suffix: this.absentRelativeDetailsForm.controls["suffix"].value ? this.absentRelativeDetailsForm.controls["suffix"].value : null,
      dateOfBirth: this.absentRelativeDetailsForm.controls['dateOfBirth'].value ? this.absentRelativeDetailsForm.controls["dateOfBirth"].value : null,
      deceased: this.absentRelativeDetailsForm.controls['deceased'].value?.charAt(0),
      gender: this.absentRelativeDetailsForm.controls['gender'].value?.charAt(0),
      socialSecurityNumber: this.absentRelativeDetailsForm.controls['socialSecurityNumber'].value,
      isThisPersonSpouseParentOrBothOfTheHouseholdMember: this.absentRelativeDetailsForm.controls['isThisPersonSpouseParentOrBothOfTheHouseholdMember'].value,

    }
        this.service.validateAllFormFields(this.absentRelativeDetailsForm);
        console.log(
            "absent Relative",
            this.absentRelativeDetailsForm.status.toLowerCase()
        );

        if (this.absentRelativeDetailsForm.status.toLowerCase() === "valid") {
            const storedHouseHoldDetails = this.applyNowState?.houseHoldDetails;
            let updatedAbsentRelativeObj;
            if (this.currentUser) {
                const updatedHouseHoldPersonArray =
                    storedHouseHoldDetails?.absentRelative?.map((person) => {

                        if (person.id && person.id.toString() === this.currentUser.id.toString()) {
                            console.log("existing person")
                           console.log(person);
                            return {...person,...updatedAbsentRelative};
                        }
                        return person;
                    });

                updatedAbsentRelativeObj = {
                    absentRelative: updatedHouseHoldPersonArray,
                };
            } else {
                updatedAbsentRelativeObj = {
                    absentRelative: storedHouseHoldDetails.absentRelative
                        ? [
                              ...storedHouseHoldDetails.absentRelative,
                              ...[updatedAbsentRelative],
                          ]
                        : [updatedAbsentRelative],
                };
            }
            this.service.updateHouseHoldDetails({
                ...storedHouseHoldDetails,
                ...updatedAbsentRelativeObj,
            });

            this.router.navigate([
                RoutePath.APPLYNOW + 
                '/' + RoutePath.APPLYNOW_HOUSEHOLD + 
                '/' + RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVERACE]);
            return true;
        } 
        else {
            return false;
        }
    }

    get f() {
        return this.absentRelativeDetailsForm.controls;
    }

    previous() {
        if (this.queueService.state.pageQueue.currentPageId > 0) {
            this.queueService.backPath();
        }
        else {
            this.router.navigate([
            RoutePath.APPLYNOW + 
            '/' + RoutePath.APPLYNOW_HOUSEHOLD + 
            '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDMEMBERSITUATIONGATEPOST]);
        }
    }
}
