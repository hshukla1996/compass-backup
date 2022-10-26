import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Individuals, IReferralsState } from '../+state/referrals.models';
import { MenuItemState } from '../../shared/menu-item-state';
import { RoutePath } from '../../shared/route-strategies';
import { ReferralStoreService } from '../referrals-store-service';
import { IIndividual } from '../+state/household-details-model';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { State, Store } from '@ngrx/store';
import { getHouseholdDetails } from '../+state/referrals.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { AppStoreService } from '../../app-store-service';
import { ReferralsBasicDetailsStrategy } from '../../shared/route-strategies/referrals/basic-details';
import { Observable, Subject } from 'rxjs';
import { UtilService } from '../../shared/services/util.service';
import { Utility } from '../../shared/utilities/Utility';

@Component({
  selector: 'compass-ui-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.scss'],
  providers: [ReferralsBasicDetailsStrategy],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicDetailsComponent implements OnInit {
  @Output() formState = new EventEmitter<MenuItemState>();
  basicDetailsForm: FormGroup | any;
  routePath: typeof RoutePath = RoutePath;
  private formSubmitAttempt: boolean = false;
  firstNamelocal: string = "";
  lastNameLocal: string = "";
  referralState!: IReferralsState;
  genderError: boolean = false;
  maxDateRange: any;
  individuals: IIndividual[] = [];
  currentUserIndex!: any;
  currentUser: IIndividual = {};
  relationships$: Observable<any> | undefined;
  basicDetails_relations: IIndividual[] = [];
  editedMember!: any;
  relationships: any = [];
  memberRelationshipList!: FormArray;
  headName = "";
  headlastName = "";
  public headName$: Subject<any> = new Subject();
  public headNameUpdated$: Observable<any> = this.headName$.asObservable();
  constructor(
    private fb: FormBuilder,
    private service: ReferralStoreService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private appService: AppStoreService,
    private routingStratagy: ReferralsBasicDetailsStrategy,
    private utilService: UtilService,
  ) {
    this.headNameUpdated$.subscribe((d) => {
      this.headName = d;
      cd.detectChanges()
    })
  }
 
  getHouseHoldIndex() {

    const index = this.individuals.findIndex((detail) => detail.individualNumber == this.getMinId());
    return index;
  }

  ngOnInit(): void {
    this.maxDateRange = new Date().toISOString().slice(0, 10);
    const memberId = this.route.snapshot.paramMap.get("userId");
    this.basicDetailsForm = this.fb.group({
      firstName: ['', [Validators.required,]],
      lastName: ['', [Validators.required,]],
      dateOfBirth: ['', Utility.dateMaxValidator()],
    });
    this.basicDetailsForm.valueChanges.subscribe((d: any) => {
      const name = `${this.basicDetailsForm.controls['firstName'].value} ${this.basicDetailsForm.controls['lastName'].value}`
      this.headName$.next(name)
    });


    this.service.getAppData().subscribe(d => {
      this.referralState = { ...d };
      this.individuals = this.service.getIndividuals ?? [];
      this.headName = this.basicDetailsForm.get('firstName')?.value || ""
      this.headlastName = this.basicDetailsForm.get('lastName')?.value || ""
      this.firstNamelocal = this.headName
      this.lastNameLocal = this.headlastName
      if (!memberId && this.individuals.length > 0) {
        this.editedMember = this.individuals[0];
      }
      if (memberId) {
        this.editedMember = this.referralState.individuals?.filter((person) => person.individualNumber?.toString() === memberId)[0];

      }
      this.cd.detectChanges();
    });
    this.activatedRoute.params.subscribe((p) => {
      if (p.userId) {
        this.currentUserIndex = p.userId || "";
      } else if (this.individuals.length > 0) {
        this.currentUserIndex = 1
      }
      this.currentUser = this.extractUser(this.individuals, this.currentUserIndex) || "";
      this.basicDetailsForm.get('firstName').patchValue(this.currentUser.firstName)
      this.basicDetailsForm.get('lastName').patchValue(this.currentUser.lastName)
      this.basicDetailsForm.get('dateOfBirth').patchValue(Utility.duetFormatDate(this.currentUser.dateOfBirth))

      this.cd.detectChanges();

    });

    this.loadValues();

    this.formState.emit(MenuItemState.INPROGRESS);
    this.service.formStateUpdated(this.routePath.REFERRALS_BASICDETAILS, MenuItemState.INPROGRESS);
  }



  previous() {
    this.router.navigate([this.routingStratagy.previousRoute()]);
  }

  onSubmit() {
    console.log('HIiiii')
    this.basicDetailsForm.markAllAsTouched();
    this.genderError = false;
    const isValid = this.basicDetailsForm.valid;

    if (!isValid) return;
    if (!this.validateAge()) return;
    this.updateData();
    this.service.updateIndividualDetails(this.individuals as IIndividual[])
    this.router.navigate([this.routingStratagy.nextRoute()]);


  }
  updateData() {
    let updatedData = { ...this.getControlValues() };
    updatedData.appliedReferrals = [];
    if (this.individuals.length > 0) {
      updatedData.individualNumber = this.getMinId();
      const index = this.getHouseHoldIndex();
      if (index >= 0) {
        this.individuals = [
          ...this.individuals.slice(0, index),
          {
            ...this.individuals[index],
            ...updatedData
          },
          ...this.individuals.slice(index + 1)
        ]
      }


    }
    else {
      this.individuals = [...this.individuals, ...[updatedData]];
    }
  }

  loadValues() {
    const detail = this.service.getIndividuals;

    if (detail.length > 0) {
      const index = this.getHouseHoldIndex();


      const data = (index > 0) ? detail[index] : detail[0];
      this.basicDetailsForm.controls['firstName'].patchValue(data?.firstName)
      this.basicDetailsForm.controls['lastName'].patchValue(data?.lastName)
      this.basicDetailsForm.controls['dateOfBirth'].patchValue(Utility.duetFormatDate(data?.dateOfBirth))

    }
  }

  getControlValues() {
    const id = 1;

    const updatedData = {
      individualNumber: this.getIndividualNumber().toString(),
      firstName: this.basicDetailsForm.controls['firstName'].value,
      lastName: this.basicDetailsForm.controls['lastName'].value,
      dateOfBirth: this.basicDetailsForm.controls['dateOfBirth'].value,
    } as unknown as IIndividual

    return updatedData;
  }

  ngOnDestroy(): void { }

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

  errorMap(field: string) {
    if (!this.isFieldValid(field)) {
      return "";
    }
    switch (field) {
      case 'dateOfBirth':
        if (this.basicDetailsForm.get(field)?.errors?.required) {
          return "basidDetailRequiredMessage"
        }
        if (this.basicDetailsForm.get(field)?.errors?.duetInvalidDate) {
          return "duetInvalidDate"
        }
        if (this.basicDetailsForm.get('dateOfBirth')?.errors?.invalidDate) {
          return "Date of Birth must be in the past."
        }
        break
    }
    return "";
  }

  isFieldValid(field: string): boolean {
    if (field === 'dateOfBirth') {
      const isValidDate = this.getAge(this.basicDetailsForm.controls['dateOfBirth'].value) > 200
      return ((isValidDate) || this.basicDetailsForm.get('dateOfBirth').value > this.maxDateRange) || (this.basicDetailsForm.get(field).status !== 'VALID' && (this.basicDetailsForm.get(field).dirty || this.basicDetailsForm.get(field).touched))
    }
    return (this.basicDetailsForm.get(field).status !== 'VALID' && (this.basicDetailsForm.get(field).dirty || this.basicDetailsForm.get(field).touched))
  }

  showGender(gender: any) {
    if (gender !== '' && gender !== undefined) {
      return gender.charAt(0);
    }
    return '';
  }


  getMinId() {

    if (this.individuals.length == 0) return -1;
    const ids = this.individuals.map(person => {
      return person.individualNumber;
    });
    const min = Math.min(...ids);
    return min.toString();

  }


  validateAge() {
    return (this.getAge(this.basicDetailsForm.controls['dateOfBirth'].value) < 200 && this.basicDetailsForm.get('dateOfBirth').value < this.maxDateRange)
  }



  extractUser(persons: any, userId: any) {
    const currentUser = persons.filter((person: IIndividual) => {
      return person.individualNumber?.toString() === userId.toString();
    })[0];

    return currentUser;
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

  GetFirstNameValue(value: string) {
    this.firstNamelocal = value;

  }
  GetLastNameValue(value: string) {
    this.lastNameLocal = value
  }
  getIndividualNumber() {
    if (this.currentUserIndex) {
      return this.currentUserIndex;
    }
    return this.referralState.individuals?.length ? this.referralState.individuals?.length + 1 : 1;
  }




}
