import { ChangeDetectorRef, Component, OnInit  } from "@angular/core";
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { id } from "date-fns/locale";
import { IApplyNowState } from "../../+state/apply-now.models";
import { AppStoreService } from "../../../app-store-service";
import { RoutePath } from "../../../shared/route-strategies";
import { UtilService } from "../../../shared/services/util.service";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { IHouseHold, IHouseHoldDetails, IRepresentative } from "../../household/household-model";
import * as ProgramConstants from "../../../shared/constants/Individual_Programs_Constants";
import {FormValidatorField, RequiredOrOptionalValidatorField, Utility} from "../../../shared/utilities/Utility";
import {INDIVIDUAL_PROGRAMS} from "../../../shared/constants/Individual_Programs_Constants";
@Component({
    selector: "ui-compass-additional-contact-details",
    templateUrl: "./additional-contact-details.component.html",
    styleUrls: ["./additional-contact-details.component.css"],
})
export class AdditionalContactDetailsComponent {
    additionalContactDetailsForm: FormGroup | any;
    selectedData: string[] = [];
    data: any;
    houseHoldDetails!: IHouseHoldDetails;
    currentUser: IHouseHold = {};
    currentUserIndex!: string;
    contactRoles!: any[];
    contacts!: any[];
    poaMap!: any;
  requiredFields:string[] = []
  fieldDisplays:any = {};
  maxDateRange = new Date().toISOString().slice(0, 10);
  houseHoldPersons: IHouseHold[] = [];
    listOfIndividuals!: { key: any; value: string | undefined }[];
    applyNowState: IApplyNowState | undefined;
    suffixls: any[] = [];
    relationships: any;
    showRolesError = false;
    fragment!: string;
    constructor(
        private fb: FormBuilder,
        private route: Router,
        private service: ApplyNowStoreService,
        private activatedRoute: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private utilService: UtilService,
        private appService: AppStoreService
    ) {}

    ngOnInit() {
        this.additionalContactDetailsForm = this.fb.group({
            additionalContact: this.fb.array([], [Validators.required]),
            contact: [""],
            firstName: [""],
            middleName: [""],
            lastName: [""],
            suffix: [""],
            relationship: [""],
            knowaboutthiscontact: [""],
            dateOfBirth: ["", Utility.dateMaxValidator()],
        });

        this.activatedRoute.params.subscribe((p) => {
            this.houseHoldDetails = this.service.getHouseHoldDetails;
            console.log("this.houseHoldDetails");
            console.log(this.houseHoldDetails.houseHoldPersons);

            if (this.houseHoldDetails.houseHoldPersons) {
                this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
            }
            this.poaMap =
                {
                    ...this.houseHoldDetails.pageAction?.poaMap,
                } || {};
            if (Object.keys(p).length == 0) {
                this.currentUserIndex =
                    this.utilService.getCurrentUserIdOnNoParams(this.poaMap);
            } else {
                this.currentUserIndex = p.userId || "";
            }
            if (this.houseHoldPersons.length > 0)
                this.currentUser =
                    this.service.extractUser(
                        this.houseHoldPersons,
                        this.currentUserIndex
                    ) || "";
          this.activatedRoute.fragment.subscribe((fragment) => {
            this.fragment = fragment || "";
            if (this.fragment !== "new") this.setFormValues(this.fragment);
          });
          this.setOrResetValidator(this.currentUser);
            this.listOfIndividuals = this.houseHoldPersons
                .filter(
                    (ind: IHouseHold) =>
                        ind &&
                        ind.id &&
                        ind?.id.toString() !== this.currentUserIndex
                )
                .map((ind) => {
                    return {
                        key: ind.id,
                        value: ind.firstName,
                    };
                });
            this.data = this.getData();
            this.cd.detectChanges();
        });

        this.appService.getContactRoles().subscribe((c) => {
            this.contactRoles = c;
            this.cd.detectChanges();
            this.addAdditionalContactsToForm();
        });
        this.appService.getSuffix().subscribe((suffix: any[]) => {
            let newSuffix = [...suffix];
            newSuffix.sort((a: any, b: any) => {
                return a.additionalColumns.FlexOrder - b.additionalColumns.FlexOrder
            });
            this.suffixls = newSuffix;
            this.cd.detectChanges();
        });
        this.appService.getRelationships().subscribe((data) => {
            this.relationships = data;
        });
    }
  setRelationWithOutersider(rel:any){
   console.log(rel)
  }
  setContact(contact:any){
      console.log("Contact")
      if(contact === "999") {
        this.setOrResetValidator(this.currentUser);
      }
      else{
        this.additionalContactDetailsForm.get("firstName").patchValue("");
        this.additionalContactDetailsForm.get("middleName").patchValue("");
        this.additionalContactDetailsForm.get("lastName").patchValue("");
        this.additionalContactDetailsForm.get("suffix").patchValue("");
        this.additionalContactDetailsForm.get("relationship").patchValue("");
      }
  }
  setFormValues(fragment: any) {
    setTimeout(() => {
      let updatedFragment = parseInt(fragment) || 0;
      if (this.currentUser?.representativeContactInformation?.representativeContactPersons) {
        updatedFragment = this.currentUser?.representativeContactInformation?.representativeContactPersons?.length-1;
      }

      if(this.currentUser?.representativeContactInformation?.representativeContactPersons) {
        const existingRep = this.currentUser?.representativeContactInformation?.representativeContactPersons[updatedFragment] as IRepresentative

        if (
          existingRep

        ) {

          this.additionalContactDetailsForm.get("contact").patchValue(existingRep.partOfHousehold?.individualNumber);
          this.additionalContactDetailsForm.get("firstName").patchValue(existingRep.firstName);
          this.additionalContactDetailsForm.get("middleName").patchValue(existingRep.middleInitial);
          this.additionalContactDetailsForm.get("lastName").patchValue(existingRep.lastName);
          this.additionalContactDetailsForm.get("suffix").patchValue(existingRep.suffix);
          this.additionalContactDetailsForm.get("relationship").patchValue(existingRep.relationshipToIndividual);
          //this.additionalContactDetailsForm.get("additionalContact").patchValue(existingRep.roles);
          this.additionalContactDetailsForm.get("knowaboutthiscontact").patchValue(existingRep.contactNotes);

          this.selectedData = <string[]>existingRep?.roles;
          console.log(this.selectedData);
        }
      }
      this.cd.detectChanges();
    }, 100);
  }
    private addAdditionalContactsToForm() {
        this.contactRoles.forEach(() =>
            this.AdditionalContactFormArray.push(new FormControl(false))
        );
    }
    get AdditionalContactFormArray() {
        return this.additionalContactDetailsForm.controls
            .additionalContact as FormArray;
    }
    getData() {
        return {
            contactsList: [
                ...(this.listOfIndividuals || []),
                ...[
                    {
                        key: 999,
                        value: "Someone Outside the Household",
                    },
                ],
            ],
            relationships: [
                {
                    key: "contact1",
                    value: "Contact1",
                },
                {
                    key: "contact2",
                    value: "Contact2",
                },
            ],
        };
    }

    onCheckboxChange(e: any) {
      this.showRolesError = false
        if (e.target.checked) {
            this.selectedData.push(e.target.value);
        } else {
            let i: number = 0;
            this.selectedData.forEach((item: any) => {
                if (item == e.target.value) {
                    this.selectedData.splice(i, 1);
                    return;
                }
                i++;
            });
        }
     this.setOrResetValidator(this.currentUser)
    }
  isFieldValid(field: string): boolean {
    return (
      this.additionalContactDetailsForm.get(field).status !== "VALID" &&
      this.additionalContactDetailsForm.get(field).touched
    );
  }
  errorMap(field: string) {
    if (!this.isFieldValid(field)) {
      return "";
    }

    switch (field) {
      case "firstName":
        if (
          this.additionalContactDetailsForm.get("firstName").errors.required
        ) {
          return "First name is required.";
        }
        break;
      case "lastName":
        if (
          this.additionalContactDetailsForm.get("lastName").errors.required
        ) {
          return "Last name is required.";
        }
        break;
      case "relationship":
        if (
          this.additionalContactDetailsForm.get("relationship").errors.required
        ) {
          return "Relationship is required.";
        }
        break;
      case "contact":
        if (
          this.additionalContactDetailsForm.get("contact").errors.required
        ) {
          return "Contact is required.";
        }
        break;
      case "dateOfBirth":
        if (this.additionalContactDetailsForm.get('dateOfBirth').errors?.required) {
            return 'Date Of Birth is required.'
        }
        if (this.additionalContactDetailsForm.get('dateOfBirth').errors?.invalidDate) {
            return 'Date Of Birth must be in the past.'
        }
        if (this.additionalContactDetailsForm.get("dateOfBirth").errors.duetInvalidDate) {
            return "duetInvalidDate";
        }
        break;
      default:
        return "";
        break;
    }
    return "";
  }

    submit() {
      if(!this.selectedData.length && this.requiredFields.indexOf('additionalContact') > -1){
        this.showRolesError = true
        return;
      }
      this.additionalContactDetailsForm.markAllAsTouched();
      console.log(this.additionalContactDetailsForm)
      const isValid = this.additionalContactDetailsForm.valid;
      if(!isValid)
        return;
      let index=0;
      const storedHouseholdDetails = this.service.getHouseHoldDetails;
      const storedContactDetails =
        this.currentUser.representativeContactInformation?.representativeContactPersons || [];

      const contactDetailsFromForm = {
        sequenceNumber: this.currentUser.representativeContactInformation?.representativeContactPersons?.length.toString() || "0",
        sequenceNumberSpecified: true,
        partOfHousehold: {
          individualNumber:this.additionalContactDetailsForm.get("contact")
                .value,
        },
        firstName:
        this.additionalContactDetailsForm.get("firstName").value,
        middleInitial:this.additionalContactDetailsForm.get("middleName").value,
        suffix:
        this.additionalContactDetailsForm.get("suffix").value,
        relationshipToIndividual:
        this.additionalContactDetailsForm.get("relationship").value,
        lastName: this.additionalContactDetailsForm.get("lastName").value,
        roles: this.selectedData,
        dateOfBirthSpecified:
        this.additionalContactDetailsForm.get("dateOfBirth").value ? true : false,
        contactNotes: this.additionalContactDetailsForm.get(
          "knowaboutthiscontact"
        ).value,
      };
      let currentContactDetails: IRepresentative[];
      if (Number.isInteger(parseInt(this.fragment))) {
        currentContactDetails = storedContactDetails.map((cs, i) => {
          index = i
          if (i === parseInt(this.fragment)) {

            return {...cs,...contactDetailsFromForm};
          } else {
            return contactDetailsFromForm;
          }
        });
      } else {
        index = storedContactDetails.length;
        currentContactDetails = [
          ...storedContactDetails,
          ...[contactDetailsFromForm],
        ];
      }



         const updatedHouseholdPersons =
             this.houseHoldDetails.houseHoldPersons?.map(
                 (person: IHouseHold) => {
                     const personToBeUpdated = { ...person };
                     if (
                         person.id?.toString() ===
                         this.currentUser.id?.toString()
                     ) {
                         personToBeUpdated.representativeContactInformation = {
                             hasRepresentativeAttorneyOrContact: "Y",
                             isAttendingTraining: "Y",
                             representativeContactPersons:
                             currentContactDetails,
                         };
                     }
                     return personToBeUpdated;
                 }
             );
           if (storedHouseholdDetails)
               this.service.updateHouseHoldDetails({
                   ...storedHouseholdDetails,
                   ...{ houseHoldPersons: updatedHouseholdPersons },
               });

           this.additionalContactDetailsForm.reset();

        this.route.navigate(
            [
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                    "/" +
                    RoutePath.APPLYNOW_ADDITIONAL_CONTACT_MORE_DETAILS,
                {
                    userId: this.currentUser.id,
                },
            ],
            { fragment: index.toString() }
        );
    }
    previous(): void {
        this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_ADDITIONAL_CONTACT,
        ]);
    }
  setOrResetValidator(user:IHouseHold) {
    const householdBenefits = this.service?.getAppliedBenefitsForIndividual(user) as string[];

    const fields = [{
      fieldName: 'contact',
      optionalProgram: [],
      requiredProgram: [INDIVIDUAL_PROGRAMS.LN, INDIVIDUAL_PROGRAMS.LI, INDIVIDUAL_PROGRAMS.LIR, INDIVIDUAL_PROGRAMS.LNR,
        INDIVIDUAL_PROGRAMS.HA, INDIVIDUAL_PROGRAMS.HC, INDIVIDUAL_PROGRAMS.MCR, INDIVIDUAL_PROGRAMS.MAR,
        INDIVIDUAL_PROGRAMS.CHR, INDIVIDUAL_PROGRAMS.CA, INDIVIDUAL_PROGRAMS.CAR, INDIVIDUAL_PROGRAMS.FP, INDIVIDUAL_PROGRAMS.FPR, INDIVIDUAL_PROGRAMS.WN, INDIVIDUAL_PROGRAMS.WNR, INDIVIDUAL_PROGRAMS.WAR]

    }, {
      fieldName: 'firstName',
      optionalProgram: [],
      requiredProgram:  this.additionalContactDetailsForm.get('contact').value ==='999'?[INDIVIDUAL_PROGRAMS.LN, INDIVIDUAL_PROGRAMS.LI, INDIVIDUAL_PROGRAMS.LIR, INDIVIDUAL_PROGRAMS.LNR,
        INDIVIDUAL_PROGRAMS.HA, INDIVIDUAL_PROGRAMS.HC, INDIVIDUAL_PROGRAMS.MCR, INDIVIDUAL_PROGRAMS.MAR,
        INDIVIDUAL_PROGRAMS.CHR, INDIVIDUAL_PROGRAMS.CA, INDIVIDUAL_PROGRAMS.CAR, INDIVIDUAL_PROGRAMS.FP, INDIVIDUAL_PROGRAMS.FPR, INDIVIDUAL_PROGRAMS.WN,
        INDIVIDUAL_PROGRAMS.WNR, INDIVIDUAL_PROGRAMS.WAR]:[]
    },
      {
      fieldName: 'middleName',
      optionalProgram:[INDIVIDUAL_PROGRAMS.LN, INDIVIDUAL_PROGRAMS.LI, INDIVIDUAL_PROGRAMS.LIR, INDIVIDUAL_PROGRAMS.LNR,
        INDIVIDUAL_PROGRAMS.HA, INDIVIDUAL_PROGRAMS.HC, INDIVIDUAL_PROGRAMS.MCR, INDIVIDUAL_PROGRAMS.MAR,
        INDIVIDUAL_PROGRAMS.CHR, INDIVIDUAL_PROGRAMS.CA, INDIVIDUAL_PROGRAMS.CAR, INDIVIDUAL_PROGRAMS.FP, INDIVIDUAL_PROGRAMS.FPR, INDIVIDUAL_PROGRAMS.WN, INDIVIDUAL_PROGRAMS.WNR, INDIVIDUAL_PROGRAMS.WAR],
      requiredProgram: []

    }, {
      fieldName: 'lastName',
      optionalProgram: [],
      requiredProgram:   this.additionalContactDetailsForm.get('contact').value ==='999'?[INDIVIDUAL_PROGRAMS.LN, INDIVIDUAL_PROGRAMS.LI, INDIVIDUAL_PROGRAMS.LIR, INDIVIDUAL_PROGRAMS.LNR,
        INDIVIDUAL_PROGRAMS.HA, INDIVIDUAL_PROGRAMS.HC, INDIVIDUAL_PROGRAMS.MCR, INDIVIDUAL_PROGRAMS.MAR,
        INDIVIDUAL_PROGRAMS.CHR, INDIVIDUAL_PROGRAMS.CA, INDIVIDUAL_PROGRAMS.CAR, INDIVIDUAL_PROGRAMS.FP,
        INDIVIDUAL_PROGRAMS.FPR, INDIVIDUAL_PROGRAMS.WN, INDIVIDUAL_PROGRAMS.WNR,
        INDIVIDUAL_PROGRAMS.WAR]:[]


      }, {
      fieldName: 'suffix',
      optionalProgram: [INDIVIDUAL_PROGRAMS.LN, INDIVIDUAL_PROGRAMS.LI, INDIVIDUAL_PROGRAMS.LIR, INDIVIDUAL_PROGRAMS.LNR, INDIVIDUAL_PROGRAMS.WN, INDIVIDUAL_PROGRAMS.WNR, INDIVIDUAL_PROGRAMS.WAR],
      requiredProgram:  []



      }, {
      fieldName: 'relationship',
      optionalProgram: [],
      requiredProgram:  this.additionalContactDetailsForm.get('contact').value ==='999'?[INDIVIDUAL_PROGRAMS.LN, INDIVIDUAL_PROGRAMS.LI, INDIVIDUAL_PROGRAMS.LIR,
        INDIVIDUAL_PROGRAMS.LNR, INDIVIDUAL_PROGRAMS.WN, INDIVIDUAL_PROGRAMS.WNR,
        INDIVIDUAL_PROGRAMS.WAR]:[]

    },{
        fieldName: 'additionalContact',
        optionalProgram: [INDIVIDUAL_PROGRAMS.FS, INDIVIDUAL_PROGRAMS.FSR],
        requiredProgram: [INDIVIDUAL_PROGRAMS.LN, INDIVIDUAL_PROGRAMS.LI,
          INDIVIDUAL_PROGRAMS.LIR, INDIVIDUAL_PROGRAMS.LNR, INDIVIDUAL_PROGRAMS.HA,
          INDIVIDUAL_PROGRAMS.HC, INDIVIDUAL_PROGRAMS.MCR, INDIVIDUAL_PROGRAMS.MAR,
          INDIVIDUAL_PROGRAMS.CHR, INDIVIDUAL_PROGRAMS.CA, INDIVIDUAL_PROGRAMS.CAR,
          INDIVIDUAL_PROGRAMS.FP, INDIVIDUAL_PROGRAMS.FPR, INDIVIDUAL_PROGRAMS.WN,
          INDIVIDUAL_PROGRAMS.WNR, INDIVIDUAL_PROGRAMS.WAR]

      }, {
      fieldName: 'knowaboutthiscontact',
      optionalProgram:[ INDIVIDUAL_PROGRAMS.LI, INDIVIDUAL_PROGRAMS.LIR, INDIVIDUAL_PROGRAMS.LN, INDIVIDUAL_PROGRAMS.LNR, INDIVIDUAL_PROGRAMS.WN, INDIVIDUAL_PROGRAMS.WNR, INDIVIDUAL_PROGRAMS.WAR],
      requiredProgram: [] as string[]

    }, {
      fieldName: 'dateOfBirth',
      optionalProgram:[],
      requiredProgram:this.selectedData.indexOf('C') > -1 ? [INDIVIDUAL_PROGRAMS.WAR] : []

    }] as FormValidatorField[]
    this.fieldDisplays = {};
    fields.forEach((fieldObj:FormValidatorField)=>{
      this.fieldDisplays[fieldObj.fieldName] = this.service
        .areProgramsExist(householdBenefits,[...fieldObj.optionalProgram,...fieldObj.requiredProgram])
    })

    if (householdBenefits != null && householdBenefits.length > 0) {
      const requiredOrOptionalValidatorField =
        {

          selectedPrograms: householdBenefits,
          requiredFields: this.requiredFields,
          formGroup: this.additionalContactDetailsForm,
          fields: fields
        } as RequiredOrOptionalValidatorField
      Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
      this.additionalContactDetailsForm = requiredOrOptionalValidatorField.formGroup;
      this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
    }
  }
}
