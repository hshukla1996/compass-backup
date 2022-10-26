import {
  Component, OnDestroy,
  ChangeDetectorRef,
  OnInit, Output
} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BasicDetail, BasicDetails, IRelationships} from '../+state/do-i-qualify.models';
import { DoIQualifyService } from '../../shared/services/do-i-qualify.service';


import { State } from '../../+state/app.state';
import { Store } from '@ngrx/store';
import { MenuItemState } from '../../shared/menu-item-state';
import { DoIQualifyStoreService } from '../do-i-qualify-store-service';
import { RoutePath } from '../../shared/route-strategies';
import { AppStoreService } from '../../app-store-service';
import { Observable } from 'rxjs';
import { DoIQualifyAddPersonStrategy } from '../../shared/route-strategies/do-i-qualify/add-person';
import { Router } from '@angular/router';
import {UtilService} from "../../shared/services/util.service";
import { DIQ_INDIVIDUAL_AGE_LIMIT } from '../../shared/constants/Constants';
import { IIndividual } from '../../referrals/+state/household-details-model';
@Component({
  selector: 'compass-ui-add-person-details',
  templateUrl: './add-person-details.component.html',
  styleUrls: ['./add-person-details.component.scss'],
  providers: [DoIQualifyAddPersonStrategy],

})
export class AddPersonDetailsComponent implements OnInit, OnDestroy {
  routePath: typeof RoutePath = RoutePath;
  genderError: boolean = false;
  maxDateRange: any;
  isValid=false;
  public headofHouseHold: any;
  public maleRelations:any
  public femaleRelations: any;
  memberRelationshipList!: FormArray;
  relationships$: Observable<any> | undefined;
  relationships: any;
  basicDetails: BasicDetail[] = [];
  basicDetails_relations:BasicDetail[] = [];
  basicDetailsGroup: FormGroup | any;
  headName: string = "";
  headLastName?: string = "";
  constructor(
    private fb: FormBuilder,
    private store: Store<State>,
    private service: DoIQualifyStoreService,
    private appService: AppStoreService,
    private doIQualifyService: DoIQualifyService,
    private cd: ChangeDetectorRef,
    private router:Router,
    private routingStratagy: DoIQualifyAddPersonStrategy,
    private utilService: UtilService
  ) { }
  creatememberRelationship(): FormGroup {
    return this.fb.group({
      [this.basicDetails_relations[this.memberRelationshipList.length].id]: [null, [Validators.required]]
    });
  }
  get memberRelationshipFormGroup() {
    // console.log("relationship", this.basicDetailsGroup.get("memberRelationships"));
    return this.basicDetailsGroup.get('memberRelationships') as FormArray;
  }
  getmemberRelationshipsFormGroup(index:number): FormGroup {
    this.memberRelationshipList = this.basicDetailsGroup.get('memberRelationships') as FormArray;
    console.log("list", this.memberRelationshipList)
    const formGroup = this.memberRelationshipList.controls[index] as FormGroup;
    return formGroup;
  }


  ngOnInit(): void {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1)
    this.maxDateRange = tomorrow.toISOString().slice(0, 10);
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
    this.basicDetails = [...this.service.getBasicDetails()];

    this.headofHouseHold = this.basicDetails.filter((individual: BasicDetail) => {
      return individual.headOfHouse
    })[0];
    this.headName = this.headofHouseHold?.firstName??"";
    this.headLastName = this.headofHouseHold?.lastName || "";

    this.relationships$ = this.appService.getRelationships();
    this.relationships$.subscribe((c) => {
      //this.relationships = c;
     // this.cd.detectChanges();
    });
    this.basicDetails_relations = this.basicDetails;
    console.log("addanother person",this.basicDetails_relations)
    this.basicDetails_relations.forEach(()=>this.memberRelationshipList.push(this.creatememberRelationship()))
    console.log("add another person--",this.memberRelationshipList)

    this.isValid = this.basicDetailsGroup.valid ? true : false;
    this.basicDetailsGroup.valueChanges.subscribe((d: any) => {
      this.isValid = this.basicDetailsGroup.valid ? true : false;

    });
    this.service.formStateUpdated(this.routePath.DOIQUALIFY_BASICDETAILS, MenuItemState.INPROGRESS);
  }


  changeGender(e: any,val:string): void {
  
    this.genderError = false;
    this.relationships=this.service.getRelationship(val as string)
    this.basicDetails_relations.forEach((individualMap: any, idx: number) => {
      const relationShipFormObj: any = {};
      
      relationShipFormObj[individualMap.id!] = null
      this.getmemberRelationshipsFormGroup(idx).patchValue(relationShipFormObj)
    })
  }



  isFieldValid(field: string): boolean {
    if (field === 'dob') {
      const isValidDate = this.getAge(this.basicDetailsGroup.controls['dob'].value) > DIQ_INDIVIDUAL_AGE_LIMIT
      return ((isValidDate) || this.basicDetailsGroup.get('dob').value >= this.maxDateRange) || (this.basicDetailsGroup.get(field).status !== 'VALID' && (this.basicDetailsGroup.get(field).dirty || this.basicDetailsGroup.get(field).touched))
    }
    return (this.basicDetailsGroup.get(field).status !== 'VALID' && (this.basicDetailsGroup.get(field).dirty || this.basicDetailsGroup.get(field).touched))
  }
back(){
  this.router.navigate([this.routingStratagy.previousRoute()]);
}
next(){
  this.basicDetailsGroup.markAllAsTouched();
 
  this.genderError = false;
  if (this.basicDetailsGroup.controls['gender'].value === "")
  {
    this.genderError = true;
    return;
  }
  if (!this.isValid) return;
  if (!this.validateAge()) return;
  this.addUser();
  this.router.navigate([this.routingStratagy.nextRoute()]);
}
  updateRelations(){
    const updatedBasicDetails = [...this.basicDetails];
     for (let i = 0; i < updatedBasicDetails.length - 1; i++) {

         const getRelationshipFor = updatedBasicDetails[i].id;
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
               const relations = this.utilService.getInvRelationships( updatedBasicDetails[i].gender,currentRelation)
                 currenMemberRelations.push({
                     individualLookupId: getRelationshipTo,
                   relationshipType: (relations)==''?currentRelation:relations
                 });
             }
         }

         updatedBasicDetails[i] = {...updatedBasicDetails[i],...{relationships:currenMemberRelations}};
         
     }

       this.service.updateBasicDetails({
           basicDetails: updatedBasicDetails,
       } as BasicDetails);
  }
  
addUser(){
  this.basicDetails = [...this.service.getBasicDetails()];
  const newUser = {
    id: this.generateId(),
    firstName: this.basicDetailsGroup.controls['firstName'].value,
    lastName: this.basicDetailsGroup.controls['lastName'].value,
    age: this.getAge(this.basicDetailsGroup.controls['dob'].value),
    dob: this.basicDetailsGroup.controls['dob'].value,
    gender: this.showGender(this.basicDetailsGroup.controls['gender'].value),
    relationships: this.basicDetails_relations.map((br:BasicDetail,idx:number)=> {
      return {
        "individualLookupId":Object.keys(this.getmemberRelationshipsFormGroup(idx).value)[0],
        "relationshipType":Object.values(this.getmemberRelationshipsFormGroup(idx).value)[0],
      }
    }),
    headOfHouse:false
  } as unknown as BasicDetail;

  this.basicDetails.push(newUser);

  this.service.updateBasicDetails({ basicDetails: this.basicDetails } as unknown as BasicDetails);
}
  ngOnDestroy(): void {
  this.updateRelations();
      this.service.formStateUpdated(this.routePath.DOIQUALIFY_BASICDETAILS, MenuItemState.COMPLETED);

  }

  showGender(gender: any) {
    if (gender !== '' && gender !== undefined) {
      return gender.charAt(0);
    }
    return '';
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
    return (this.getAge(this.basicDetailsGroup.controls['dob'].value) < DIQ_INDIVIDUAL_AGE_LIMIT && this.basicDetailsGroup.get('dob').value < this.maxDateRange)
  }
  generateId(){
    
    const ids = this.basicDetails.map(person => {
      return person.id;
    });
   

    const max = Math.max(...ids);
    return max+1;
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

}
