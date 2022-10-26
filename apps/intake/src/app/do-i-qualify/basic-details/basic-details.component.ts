import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../../+state/app.state';
import { BasicDetail, BasicDetails, IRelationships } from '../+state/do-i-qualify.models';
import { getBasicDetails } from '../+state/do-i-qualify.selectors';

import { MenuItemState } from '../../shared/menu-item-state';
import { DoIQualifyStoreService } from '../do-i-qualify-store-service';
import { RoutePath } from '../../shared/route-strategies';
import { DoIQualifyService } from '../../shared/services/do-i-qualify.service';
import { Router } from '@angular/router';
import { DoIQualifyBasicDetailsStrategy } from '../../shared/route-strategies/do-i-qualify/basic-details';
import { Observable, Subject } from 'rxjs';
import { AppStoreService } from '../../app-store-service';
import { UtilService } from "../../shared/services/util.service";
import { DIQ_INDIVIDUAL_AGE_LIMIT } from '../../shared/constants/Constants';
import { Utility } from '../../shared/utilities/Utility';
import { ToasterNotificationService } from '../../shared/services/toaster-notification.service';


@Component({
  selector: 'compass-ui-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.scss'],
  providers: [DoIQualifyBasicDetailsStrategy],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicDetailsComponent implements OnDestroy, OnInit {
  routePath: typeof RoutePath = RoutePath;
  basicDetailsGroup: FormGroup | any;
  memberRelationshipList!: FormArray;
  basicDetails: BasicDetail[] = [];
  genderError: boolean = false;
  maxDateRange: any;
  relationships$: Observable<any> | undefined;
  relationships: any;
  basicDetails_relations: BasicDetail[] = [];
  headName = "";
  individuals = [];
  individualsRelationObj: any = {}
  public headName$: Subject<any> = new Subject();
  public headNameUpdated$: Observable<any> = this.headName$.asObservable();


  constructor(
    private fb: FormBuilder,
    private store: Store<State>,
    private service: DoIQualifyStoreService,
    private doIQualifyService: DoIQualifyService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private routingStratagy: DoIQualifyBasicDetailsStrategy,
    private appService: AppStoreService,
    private utilService: UtilService,
    private toasterService: ToasterNotificationService
  ) {
    this.headNameUpdated$.subscribe((d) => {
      this.headName = d;
      cd.detectChanges()
    })
  }

  creatememberRelationship(): FormGroup {
    return this.fb.group({
      [this.basicDetails_relations[this.memberRelationshipList.length].id]: [null, [Validators.required]]
    });
  }
  get memberRelationshipFormGroup() {
    return this.basicDetailsGroup.get('memberRelationships') as FormArray;
  }

  ngOnInit(): void {
    const today = new Date();
    this.maxDateRange = today.toISOString().slice(0, 10);

    this.basicDetailsGroup = this.fb.group({
      firstName: [
        '',
        Validators.required

      ],
      lastName: ['',
        Validators.required
      ],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      memberRelationships: this.fb.array([])
    });
    this.memberRelationshipList = this.basicDetailsGroup.get('memberRelationships') as FormArray;
    // this.loadRelationship();



    this.service.formStateUpdated(this.routePath.DOIQUALIFY_BASICDETAILS, MenuItemState.INPROGRESS);
    this.basicDetailsGroup.valueChanges.subscribe((d: any) => {

      const name = `${this.basicDetailsGroup.controls['firstName'].value} ${this.basicDetailsGroup.controls['lastName'].value}`
      this.headName$.next(name)
    });

    this.basicDetails = this.service.getBasicDetails();
    this.basicDetails_relations = this.basicDetails.filter((ind) => ind.id !== this.getMinId());
    this.basicDetails_relations.forEach(() => this.memberRelationshipList.push(this.creatememberRelationship()))
    const id = this.getMinId();
    if (id !== -1) {
      if (this.basicDetails && this.basicDetails.length) {
        const data = this.basicDetails.filter((detail) => {
          return detail.id === id;
        })[0] as BasicDetail;
        this.loadMaleFemaleRelationship(data?.gender);
        this.loadValues(data);
      }
    }

    // this.setHeadName()

  }

  loadMaleFemaleRelationship(val: string) {
    this.relationships = this.service.getRelationship(val as string)
  }

  changeGender(e: any, val: string): void {
    this.basicDetails_relations.forEach((individualMap: any, idx: number) => {
      const relationShipFormObj: any = {};
      relationShipFormObj[individualMap.id!] = null
      this.getmemberRelationshipsFormGroup(idx).patchValue(relationShipFormObj)
    })
    this.loadMaleFemaleRelationship(val);
    this.genderError = false;
  }

  back() {
    this.router.navigate([this.routingStratagy.previousRoute()]);
  }


  next() {

    if (this.basicDetailsGroup.valid) {
      //todo : if valid do wt required 
    }

    else {
      Object.entries(this.basicDetailsGroup.controls).map((item:any) => {
        if(item[1].invalid){
          this.toasterService.error(`${item[0]} is required`);
        }
      })
    }
    // this.showSuccessNotification();
    // this.basicDetailsGroup.markAllAsTouched();
    // this.genderError = false;
    // const isValid = this.basicDetailsGroup.valid;

    // if (this.basicDetailsGroup.controls['gender'].value === "") {
    //   this.genderError = true;
    //   return;
    // }
    // if (!isValid) return;
    // if (!this.validateAge()) return;
    // this.updateData();
    // this.service.updateBasicDetails({ basicDetails: this.basicDetails } as BasicDetails)
    // this.router.navigate([this.routingStratagy.nextRoute()]);
  }
  updateData() {
    let updatedData = { ...this.getControlValues() };

    if (this.basicDetails.length > 0) {
      updatedData.id = this.getMinId();
      const index = this.getHouseHoldIndex();
      if (index >= 0) {
        this.basicDetails = [
          ...this.basicDetails.slice(0, index),
          {
            ...this.basicDetails[index],
            ...updatedData
          },
          ...this.basicDetails.slice(index + 1)
        ]
      }


    }
    else {
      this.basicDetails = [...this.basicDetails, ...[updatedData]];
    }
  }
  getHouseHoldIndex() {

    const index = this.basicDetails.findIndex((detail) => detail.id == this.getMinId());
    return index;
  }
  getHeadofHousehold() {
    const data = this.basicDetails.filter((detail) => detail.headOfHouse == true);
    if (data.length > 0) {
      return data;
    }
    return [];
  }
  // get the formgroup under memberRelationships form array
  getmemberRelationshipsFormGroup(index: number): FormGroup {
    this.memberRelationshipList = this.basicDetailsGroup.get('memberRelationships') as FormArray;
    const formGroup = this.memberRelationshipList.controls[index] as FormGroup;
    return formGroup;
  }
  validateAge() {
    return (this.getAge(this.basicDetailsGroup.controls['dob'].value) < DIQ_INDIVIDUAL_AGE_LIMIT && this.basicDetailsGroup.get('dob').value < this.maxDateRange)
  }

  loadValues(data: BasicDetail) {



    this.basicDetailsGroup.controls["firstName"].patchValue(
      data?.firstName
    );
    this.basicDetailsGroup.controls["lastName"].patchValue(data?.lastName);
    this.basicDetailsGroup.controls["dob"].patchValue(Utility.duetFormatDate(data?.dob));
    this.basicDetailsGroup.controls["gender"].patchValue(
      data?.gender === "M" ? "Male" : "Female"
    );
    this.basicDetails_relations.forEach(
      (individualMap: BasicDetail, idx: number) => {
        const relationShipFormObj: any = {};
        individualMap.relationships?.forEach((indRel: any, idx: number) => {
          if (
            indRel.individualLookupId.toString() ===
            this.getMinId().toString()
          ) {
            const relation = this.utilService.getInvRelationships(data.gender, indRel.relationshipType)
            relationShipFormObj[individualMap.id] = (relation == '') ? indRel.relationshipType : relation




          }
        });
        this.getmemberRelationshipsFormGroup(idx).patchValue(
          relationShipFormObj
        );

      }
    );

  }
  getControlValues() {
    const id = 1;

    const updatedData = {
      id: 1,
      firstName: this.basicDetailsGroup.controls['firstName'].value,
      lastName: this.basicDetailsGroup.controls['lastName'].value,
      age: this.getAge(this.basicDetailsGroup.controls['dob'].value),
      gender: this.showGender(this.basicDetailsGroup.controls['gender'].value),
      dob: this.basicDetailsGroup.controls['dob'].value,

      relationships: this.basicDetails_relations.map((br: BasicDetail, idx: number) => {
        return {
          "individualLookupId": Object.keys(this.getmemberRelationshipsFormGroup(idx).value)[0],
          "relationshipType": Object.values(this.getmemberRelationshipsFormGroup(idx).value)[0],
        }
      })
    } as unknown as BasicDetail

    return updatedData;
  }

  ngOnDestroy(): void {

    this.updateRelations()
    this.service.formStateUpdated(this.routePath.DOIQUALIFY_BASICDETAILS, MenuItemState.COMPLETED);

  }
  updateRelations() {
    const updatedBasicDetails = [...this.basicDetails];
    for (let i = 0; i < updatedBasicDetails.length; i++) {
      const getRelationshipFor = updatedBasicDetails[i].id;
      if (this.getMinId().toString() == getRelationshipFor.toString()) {
        continue;
      }
      const currenMemberRelations: IRelationships[] = [];
      for (let j = 0; j < updatedBasicDetails.length; j++) {
        if (i === j) {
          continue;
        }
        const getRelationshipTo = updatedBasicDetails[j].id;
        const relationToCurrentMember = updatedBasicDetails[
          j
        ].relationships.filter(
          (rel: IRelationships) =>
            rel.individualLookupId.toString() ===
            getRelationshipFor.toString()
        )[0];
        if (relationToCurrentMember) {
          const currentRelation =
            relationToCurrentMember.relationshipType;
          const relation = this.utilService.getInvRelationships(
            updatedBasicDetails[i].gender,
            currentRelation
          )
          currenMemberRelations.push({
            individualLookupId: getRelationshipTo,
            relationshipType: (relation == '') ? currentRelation : relation,
          });
        }
      }
      updatedBasicDetails[i] = {
        ...updatedBasicDetails[i],
        ...{ relationships: currenMemberRelations },
      };
    }
    this.service.updateBasicDetails({
      basicDetails: updatedBasicDetails,
    } as BasicDetails);
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

  errorMap(field: string) {
    if (!this.isFieldValid(field)) return ""
    switch (field) {
      case 'dob': {
        if (this.basicDetailsGroup.get(field)?.errors?.required) {
          return "This field is required.";
        }
        if (this.basicDetailsGroup.get(field)?.errors?.duetInvalidDate) {
          return "duetInvalidDate"
        }
        return "Date must be in the past"
      }
      default: {
        if (this.basicDetailsGroup.controls[field].invalid && (this.basicDetailsGroup.controls[field].dirty || this.basicDetailsGroup.controls[field].touched)) {
          return "This field is required.";
        }
        return ""
      }
    }
  }

  isFieldValid(field: string): boolean {

    if (field === 'dob') {
      const isValidDate = this.getAge(this.basicDetailsGroup.controls['dob'].value) > DIQ_INDIVIDUAL_AGE_LIMIT
      return ((isValidDate) || this.basicDetailsGroup.get('dob').value >= this.maxDateRange) || (this.basicDetailsGroup.get(field).status !== 'VALID' && (this.basicDetailsGroup.get(field).dirty || this.basicDetailsGroup.get(field).touched))
    }
    return (this.basicDetailsGroup.get(field).status !== 'VALID' && (this.basicDetailsGroup.get(field).dirty || this.basicDetailsGroup.get(field).touched))
  }

  showGender(gender: any) {
    if (gender !== '' && gender !== undefined) {
      return gender.charAt(0);
    }
    return '';
  }
  loadRelationship() {
    this.relationships$ = this.appService.getRelationships();
    this.relationships$.subscribe((c) => {
      this.relationships = c;
      if (this.basicDetails.length == 1) {
        const data = this.basicDetails[0];

      }
      this.cd.detectChanges();
    });


  }
  setHeadName() {
    const index = this.basicDetails.findIndex((de) => de.headOfHouse == true);
    if (index >= 0) {
      const name = `${this.basicDetails[index].firstName} ${this.basicDetails[index].lastName}`
      this.headName$.next(name)

    }

  }
  getMinId() {

    if (this.basicDetails.length == 0) return -1;
    const ids = this.basicDetails.map(person => {
      return person.id;
    });
    const min = Math.min(...ids);
    return min;

  }
}
