import {
    Component,
    ChangeDetectorRef,
    OnInit
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BasicDetail, BasicDetails, IRelationships } from '../+state/do-i-qualify.models';
import { DoIQualifyService } from '../../shared/services/do-i-qualify.service';

import { State } from '../../+state/app.state';
import { Store } from '@ngrx/store';
import { MenuItemState } from '../../shared/menu-item-state';
import { DoIQualifyStoreService } from '../do-i-qualify-store-service';
import { RoutePath } from '../../shared/route-strategies';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AppStoreService } from '../../app-store-service';
import { DoIQualifyEditPersonStrategy } from '../../shared/route-strategies/do-i-qualify/edit-person';
import { UtilService } from "../../shared/services/util.service";
import { DIQ_INDIVIDUAL_AGE_LIMIT } from '../../shared/constants/Constants';
import { Utility } from '../../shared/utilities/Utility';

@Component({
    selector: "compass-ui-edit-person",
    templateUrl: "./edit-person.component.html",
    styleUrls: ["./edit-person.component.scss"],
    providers: [DoIQualifyEditPersonStrategy],
})
export class EditPersonComponent implements OnInit {
    routePath: typeof RoutePath = RoutePath;
    genderError = false;
    maxDateRange: any;

    public isHeadofHouseHold!: boolean;
    public headofHouseHold!: any;

    basicDetailsGroup: FormGroup | any;
    id = 0;
    basicDetails: BasicDetail[] = [];
    basicDetails_relations: BasicDetail[] = [];
    removePerson = false;
    relationships$: Observable<any> | undefined;
    relationships: any;
    memberRelationshipList!: FormArray;
    headName = "";
    isValid = false;
    isFirstPerson = true;
    public headName$: Subject<any> = new Subject();
    public headNameUpdated$: Observable<any> = this.headName$.asObservable();
    constructor(
        private fb: FormBuilder,
        private store: Store<State>,
        private service: DoIQualifyStoreService,
        private doIQualifyService: DoIQualifyService,
        private cd: ChangeDetectorRef,
        private router: Router,
        private appService: AppStoreService,
        private routingStratagy: DoIQualifyEditPersonStrategy,
        private utilService: UtilService
    ) { }
    creatememberRelationship(): FormGroup {
        return this.fb.group({
            [this.basicDetails_relations[this.memberRelationshipList.length]
                .id]: [null, [Validators.required]],
        });
    }
    get memberRelationshipFormGroup() {
        return this.basicDetailsGroup.get("memberRelationships") as FormArray;
    }
    getmemberRelationshipsFormGroup(index: number): FormGroup {
        // this.memberRelationshipList = this.form.get('memberRelationships') as FormArray;
        const formGroup = this.memberRelationshipList.controls[
            index
        ] as FormGroup;
        return formGroup;
    }
    ngOnInit(): void {
        const tomorrow=new Date();
        tomorrow.setDate(tomorrow.getDate() + 1)
        this.maxDateRange = tomorrow.toISOString().slice(0, 10);
        this.basicDetailsGroup = this.fb.group({
            firstName: [
                "",

                Validators.required,

            ],
            lastName: [
                "",

                Validators.required,

            ],
            dob: ["", Validators.required],
            gender: ["", Validators.required],
            memberRelationships: this.fb.array([]),
        });
        this.memberRelationshipList = this.basicDetailsGroup.get(
            "memberRelationships"
        ) as FormArray;

        this.service.formStateUpdated(
            this.routePath.DOIQUALIFY_EDIT_PERSON,
            MenuItemState.INPROGRESS
        );
        this.basicDetails = this.service.getBasicDetails();

        const details = this.service.getBasicDetailsWithId();

        //this.loadRelationship();
        //this.setHeadName()
        this.id = details?.editId ?? -1;
        this.isFirstPerson = (this.utilService.getMinId(this.basicDetails) == this.id) ? true : false
        this.basicDetails_relations = this.basicDetails.filter(
            (detail) => detail.id !== this.id
        );
        this.basicDetails_relations.forEach(() =>
            this.memberRelationshipList.push(this.creatememberRelationship())
        );
        if (this.id !== -1) {
            if (this.basicDetails && this.basicDetails.length) {
                const data = this.basicDetails.filter((detail) => {
                    return detail.id === this.id;
                })[0] as BasicDetail;
                this.loadMaleFemaleRelationship(data?.gender);
                this.loadValues(data);
                
                // this.setHeadName();
            }
        }
        this.isValid = this.basicDetailsGroup.valid ? true : false;
        this.basicDetailsGroup.valueChanges.subscribe((d: any) => {
            this.isValid = this.basicDetailsGroup.valid ? true : false;
            if (this.basicDetails.length == 1 && this.isFirstUser(this.id)) {
                this.headName = `${this.basicDetailsGroup.controls["firstName"].value} ${this.basicDetailsGroup.controls["lastName"].value}`;
            }
        });
        this.service.formStateUpdated(
            this.routePath.REFERRALS_BASICDETAILS,
            MenuItemState.INPROGRESS
        );
    }

    changeRelation(e: any): void {
        this.basicDetailsGroup.get("relation")?.setValue(e.target.value);
    }

    showGender(gender: any) {
        if (gender !== "" && gender !== undefined) {
            return gender.charAt(0);
        }
        return "";
    }
    isFirstUser(id: number) {
        return (
            this.basicDetails.filter(
                (detail) => detail.headOfHouse == true && detail.id == id
            ).length > 0
        );
    }
    loadValues(data: BasicDetail) {
        this.headofHouseHold = this.basicDetails.filter(
            (individual: BasicDetail) => {
                return individual.headOfHouse;
            }
        )[0];

        this.id = data?.id;
        this.isHeadofHouseHold = data?.headOfHouse;
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
                        this.id.toString()
                    ) {
                        const relation = this.utilService.getInvRelationships(data.gender, indRel.relationshipType);
                        relationShipFormObj[individualMap.id] = (relation == '') ? indRel.relationshipType:relation;


                            

                    }
                });
                this.getmemberRelationshipsFormGroup(idx).patchValue(
                    relationShipFormObj
                );

            }
        );

    }
    loadRelationship() {
        this.relationships$ = this.appService.getRelationships();
        this.relationships$.subscribe((c) => {
            this.relationships = c;
            this.cd.detectChanges();
        });
    }
    loadMaleFemaleRelationship(val:string){
        this.relationships = this.service.getRelationship(val as string)
    }
    next() {

        this.basicDetailsGroup.markAllAsTouched();
        if (!this.basicDetailsGroup.valid) return;
        this.genderError = false;
        if (this.basicDetailsGroup.controls["dob"].value === "") {
            this.genderError = true;
            return;
        }
        if (!this.validateAge()) return;
        const updatedData = {
            id: this.id,
            firstName: this.basicDetailsGroup.controls["firstName"].value,
            lastName: this.basicDetailsGroup.controls["lastName"].value,
            dob: this.basicDetailsGroup.controls["dob"].value,
            age: this.getAge(this.basicDetailsGroup.controls["dob"].value),
            gender: this.showGender(
                this.basicDetailsGroup.controls["gender"].value
            ),
            headOfHouse: this.isHeadofHouseHold,
            relationships: this.basicDetails_relations.map(
                (br: BasicDetail, idx: number) => {
                    return {
                        individualLookupId: Object.keys(
                            this.getmemberRelationshipsFormGroup(idx).value
                        )[0],
                        relationshipType: Object.values(
                            this.getmemberRelationshipsFormGroup(idx).value
                        )[0],
                    };
                }
            ),
        } as unknown as BasicDetail;
        this.basicDetails = this.service.getBasicDetails();
        this.basicDetails = [
            ...this.basicDetails.filter((detail) => detail.id !== this.id),
            updatedData,
        ].sort((a: any, b: any) => a.id - b.id);
        this.service.updateBasicDetails({
            basicDetails: this.basicDetails,
        } as BasicDetails);
        this.router.navigate([this.routingStratagy.nextRoute()]);
    }
    back() {
        this.router.navigate([this.routingStratagy.previousRoute()]);
    }
    changeGender(e: any,val:string): void {
        this.loadMaleFemaleRelationship(val);
        this.basicDetails_relations.forEach((individualMap: any, idx: number) => {
            const relationShipFormObj: any = {};
            relationShipFormObj[individualMap.id!] = null
            this.getmemberRelationshipsFormGroup(idx).patchValue(relationShipFormObj)
        })
        this.genderError = false;
    }
    getIndex() {
        const index = this.basicDetails.findIndex(
            (detail) => detail.id == this.id
        );
        return index;
    }

    updateRelations() {
        const updatedBasicDetails = [...this.basicDetails];
        for (let i = 0; i < updatedBasicDetails.length; i++) {
            const getRelationshipFor = updatedBasicDetails[i].id;
            if (this.id.toString() == getRelationshipFor.toString()) {
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
                        relationshipType:(relation=='')?currentRelation:relation ,
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
    ngOnDestroy(): void {
        this.updateRelations();
        this.service.formStateUpdated(
            this.routePath.REFERRALS_BASICDETAILS,
            MenuItemState.COMPLETED
        );
    }

    getAge(dateString: any): any {
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }



    deleteUser() {
        this.removePerson = true;
        this.router.navigate([
            RoutePath.DOIQUALIFY + "/" + RoutePath.DOIQUALIFY_HOUSEHOLDSUMMARY,
        ]);
    }

    isFieldValid(field: string): boolean {
        if (field === 'dob') {
            const isValidDate = this.getAge(this.basicDetailsGroup.controls['dob'].value) > DIQ_INDIVIDUAL_AGE_LIMIT
            return ((isValidDate) || this.basicDetailsGroup.get('dob').value >= this.maxDateRange) || (this.basicDetailsGroup.get(field).status !== 'VALID' && (this.basicDetailsGroup.get(field).dirty || this.basicDetailsGroup.get(field).touched))
        }
        return (this.basicDetailsGroup.get(field).status !== 'VALID' && (this.basicDetailsGroup.get(field).dirty || this.basicDetailsGroup.get(field).touched))
    }
    setHeadName() {
        const index = this.basicDetails.findIndex(
            (de) => de.headOfHouse == true
        );
        if (index >= 0) {
            const name = `${this.basicDetails[index].firstName} ${this.basicDetails[index].lastName}`;
            this.headName = name;
        }
    }
    validateAge() {
        return (this.getAge(this.basicDetailsGroup.controls['dob'].value) < DIQ_INDIVIDUAL_AGE_LIMIT && this.basicDetailsGroup.get('dob').value < this.maxDateRange)
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
