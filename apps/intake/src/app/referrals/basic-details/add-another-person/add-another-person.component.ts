import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IIndividual, IRelationships } from '../../+state/household-details-model';
import { Individual, IReferralsState } from '../../+state/referrals.models';
import { AppStoreService } from '../../../app-store-service';
import { BasicDetails } from '../../../do-i-qualify/+state/do-i-qualify.models';
import { MenuItemState } from '../../../shared/menu-item-state';
import { RoutePath } from '../../../shared/route-strategies';
import { ReferralsAddAnotherPersonStrategy } from '../../../shared/route-strategies/referrals/add-another-person';
import { UtilService } from '../../../shared/services/util.service';
import { Utility } from '../../../shared/utilities/Utility';
import { ReferralStoreService } from '../../referrals-store-service';

@Component({
  selector: 'compass-ui-add-another-person',
  templateUrl: './add-another-person.component.html',
  styleUrls: ['./add-another-person.component.scss'],
  providers: [ReferralsAddAnotherPersonStrategy],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddAnotherPersonComponent implements OnInit {
  @Output() formState = new EventEmitter<MenuItemState>();
  public maleRelations: any
  public femaleRelations: any;
  memberRelationshipList!: FormArray;
  // basicDetails_relations: Individual[] = [];
  basicDetails_relations: IIndividual[] = [];
  routePath: typeof RoutePath = RoutePath;
  householdAnotherPerForm: FormGroup | any;
  relationships$: Observable<any> | undefined;
  storedHouseHoldDetails!: IIndividual;
  editedMember!: any;
  headName = "";
  relationships: any = [];
  firstNamelocal: string = "";
  genderError: boolean = false;
  referralState!: IReferralsState;
  maxDateRange: any;
  individuals: IIndividual[] = [];
  currentUserIndex!: any;
  currentUser: IIndividual = {};

  constructor(
    private fb: FormBuilder,
    private service: ReferralStoreService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private routingStratagy: ReferralsAddAnotherPersonStrategy,
    private appService: AppStoreService,
    private utilService: UtilService

  ) { }


  ngOnInit(): void {
    this.maxDateRange = new Date().toISOString().slice(0, 10);
    const memberId = this.route.snapshot.paramMap.get("userId");

    this.householdAnotherPerForm = this.fb.group({
      individualNumber: [""],
      firstName: ['', [Validators.required,]],
      lastName: ['', [Validators.required,]],
      dateOfBirth: [" ", Utility.dateMaxValidator()],

    });
    this.service.formStateUpdated(this.routePath.REFERRALS_BASICDETAILS, MenuItemState.INPROGRESS);

    this.individuals = [...this.service.getIndividuals];



    this.service.getAppData().subscribe((d) => {
      this.referralState = d;
      this.individuals = this.referralState.individuals || [];


      if (memberId) {
        this.editedMember = this.referralState.individuals?.filter((person) => person.individualNumber?.toString() === memberId)[0];


      }
      else {

      }

      this.cd.detectChanges();
    });
    if (this.editedMember?.individualNumber) {
      this.loadValues();
    }
    this.activatedRoute.params.subscribe((p) => {
      this.currentUserIndex = p.userId || "";
      this.currentUser = this.extractUser(this.individuals, this.currentUserIndex) || "";
      this.householdAnotherPerForm.get('firstName').patchValue(this.currentUser.firstName)
      this.householdAnotherPerForm.get('lastName').patchValue(this.currentUser.lastName)
      this.householdAnotherPerForm.get('dateOfBirth').patchValue(Utility.duetFormatDate(this.currentUser.dateOfBirth))

      this.cd.detectChanges();

    });


  }


  loadValues() {
    const detail = this.service.getIndividuals;

    if (detail.length > 0) {
      const index = this.getHouseHoldIndex();


      const data = (index > 0) ? detail[index] : detail[0];
      this.householdAnotherPerForm.controls['firstName'].patchValue(data?.firstName)
      this.householdAnotherPerForm.controls['lastName'].patchValue(data?.lastName)
      this.householdAnotherPerForm.controls['dateOfBirth'].patchValue(Utility.duetFormatDate(data?.dateOfBirth))


    }
  }
  getHouseHoldIndex() {

    const index = this.individuals.findIndex((detail) => detail.individualNumber == this.getMinId());
    return index;
  }
  getMinId() {

    if (this.individuals.length == 0) return -1;
    const ids = this.individuals.map(person => {
      return person.individualNumber;
    });
    const min = Math.min(...ids);
    return min;

  }

  changeGender(e: any): void {
    this.genderError = false;
  }

  isFieldValid(field: string): boolean {
    if (field === 'dateOfBirth') {
      const isValidDate = this.getAge(this.householdAnotherPerForm.controls['dateOfBirth'].value) > 200
      return ((isValidDate) || this.householdAnotherPerForm.get('dateOfBirth').value > this.maxDateRange) || (this.householdAnotherPerForm.get(field).status !== 'VALID' && (this.householdAnotherPerForm.get(field).dirty || this.householdAnotherPerForm.get(field).touched))
    }
    return (this.householdAnotherPerForm.get(field).status !== 'VALID' && (this.householdAnotherPerForm.get(field).dirty || this.householdAnotherPerForm.get(field).touched))
  }

  previous() {
    this.router.navigate([this.routingStratagy.previousRoute()]);
  }





  extractUser(persons: any, userId: any) {
    const currentUser = persons.filter((person: IIndividual) => {
      return person.individualNumber?.toString() === userId.toString();
    })[0];

    return currentUser;
  }
  GetValue(value: string) {
    this.firstNamelocal = value;
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
  errorMap(field: string) {
    if (!this.isFieldValid(field)) {
      return "";
    }
    switch (field) {
      case 'dateOfBirth':
        if (this.householdAnotherPerForm.get(field)?.errors?.required) {
          return "basidDetailRequiredMessage"
        }
        if (this.householdAnotherPerForm.get(field)?.errors?.duetInvalidDate) {
          return "duetInvalidDate"
        }
        if (this.householdAnotherPerForm.get('dateOfBirth')?.errors?.invalidDate) {
          return "Date of Birth must be in the past."

        }
        return "Enter valid First Name, Last Name, Sex, and Date of Birth for all individuals."
    }
    return "";
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


  validateAge() {
    return (this.getAge(this.householdAnotherPerForm.controls['dateOfBirth'].value) < 200 && this.householdAnotherPerForm.get('dateOfBirth').value < this.maxDateRange)
  }
  getIndividualNumber() {
    return this.referralState.individuals?.length ? this.referralState.individuals?.length + 1 : 1;
  }
  addUser() {
    this.individuals = [...this.service.getIndividuals];
    const newUser = {
      individualNumber: this.generateId(),
      firstName: this.householdAnotherPerForm.controls['firstName'].value,
      lastName: this.householdAnotherPerForm.controls['lastName'].value,
      dateOfBirth: this.householdAnotherPerForm.controls['dateOfBirth'].value,

      headOfHouse: false
    } as unknown as IIndividual;

    this.individuals.push(newUser);

    this.service.updateIndividualDetails(this.individuals);
  }
  showGender(gender: any) {
    if (gender !== '' && gender !== undefined) {
      return gender.charAt(0);
    }
    return '';
  }
  generateId() {

    const ids = this.individuals.map(person => {
      return person.individualNumber;
    });


    const max = Math.max(...ids);
    return max + 1;
  }
  getAppliedReferralsForNotSelectedAS(selectedReferrals: any) {

    const appliedReferrals = [...selectedReferrals]
    if (appliedReferrals.indexOf("AS") > -1) {
      const refs = appliedReferrals.filter((ar) => (ar !== "AS"))
      return refs

    }
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
  getFinalAppliedreferrals(age: number) {
    let appldRef = this.editedMember?.appliedReferrals || []
    if (this.editedMember) {
      if (age <= 6) {

        appldRef = this.getAppliedReferralsForNotSelectedAS(this.editedMember.appliedReferrals)
      }
      if (age >= 5) {
        appldRef = this.getAppliedReferralsForNotSelectedEI(this.editedMember.appliedReferrals)
      }
    }

    return appldRef

  }
  onSubmit() {
    const updatedHouseholdPerson = {
      individualNumber: this.editedMember?.individualNumber || this.getIndividualNumber().toString(),
      dateOfBirth: this.householdAnotherPerForm.controls["dateOfBirth"].value,
      firstName: this.householdAnotherPerForm.controls["firstName"].value,
      lastName: this.householdAnotherPerForm.controls["lastName"].value,
      appliedReferrals:
        this.getFinalAppliedreferrals(Utility.getAge(this.householdAnotherPerForm.controls['dateOfBirth'].value))
    };
    this.service.validateAllFormFields(this.householdAnotherPerForm);
    if (!this.validateAge()) return false;
    if (this.householdAnotherPerForm.status.toLowerCase() === "valid") {
      let updatedHouseHoldPersonObj;
      if (this.editedMember) {
        let updatedHouseHoldPersonArray =
          this.referralState.individuals?.map(
            (person) => {
              if (person.individualNumber === this.editedMember.individualNumber) {

                return {
                  ...this.editedMember, ...updatedHouseholdPerson
                }
              }

              return person;
            }
          );

        updatedHouseHoldPersonObj = updatedHouseHoldPersonArray;
      }
      else {
        updatedHouseHoldPersonObj = this.referralState.individuals ? [...this.referralState.individuals, ...[updatedHouseholdPerson],
        ]
          : [updatedHouseholdPerson];

      }

      this.service.updateIndividualDetails(updatedHouseHoldPersonObj || []);
      this.router.navigate([this.routingStratagy.nextRoute()]);

      return true;
    } else {
      return false;
    }
  }


  ngOnDestroy(): void {
    this.formState.emit(MenuItemState.COMPLETED);
    this.service.formStateUpdated(this.routePath.REFERRALS_BASICDETAILS, MenuItemState.COMPLETED);
  }

}
