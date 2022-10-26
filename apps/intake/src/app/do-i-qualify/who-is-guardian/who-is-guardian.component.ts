import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BasicDetail, BasicDetails } from '../+state/do-i-qualify.models';
import { PageDirection } from '../../referrals/+state/referrals.models';
import { RoutePath } from '../../shared/route-strategies';
import { PageActionUtil } from '../../shared/services/page-action-util.service';
import { DoIQualifyStoreService } from '../do-i-qualify-store-service';

@Component({
  selector: 'compass-ui-who-is-guardian',
  templateUrl: './who-is-guardian.component.html',
  styleUrls: ['./who-is-guardian.component.scss']
})
export class WhoIsGuardianComponent implements OnInit {
  basicDetails!: BasicDetail[];
  currentUserName!: string;
  currentUserId!: number;
  isParentOrGuardianForm!: FormGroup | any;
  filteredBasicDetails!: BasicDetail[]
  grId!: any[]
  constructor(private pageActionUtil: PageActionUtil,
    private doIQualifyService: DoIQualifyStoreService, private router: Router, private formBuilder: FormBuilder) {

    this.isParentOrGuardianForm = this.formBuilder.group({
      guardian: this.formBuilder.array([], [])
    });
    this.basicDetails = this.doIQualifyService.getBasicDetails();



  }
  get guardians(): FormArray {
    return <FormArray>this.isParentOrGuardianForm.controls['guardian'];
  }
  ngOnInit(): void {
    this.guardians.clear()
    this.pageActionUtil.initPageMap("guardianMap", "guardianPageDirection", false);
    this.currentUserId = this.pageActionUtil.userIndex ?? this.findIndex(this.filteredBasicDetails[0].id)
    this.initUserDetail()
  }
  initUserDetail() {
    this.getBackOrNextId()
    this.currentUserName = this.basicDetails[this.currentUserId].firstName || "";


  }

  checkboxChange(id: number, e: any) {

    this.changeCurrentChildDetail(id, e.checked);


  }
  back() {

    const id = this.pageActionUtil.backUserId();
    if (id < 0) {
      this.router.navigate([RoutePath.DOIQUALIFY + "/" + RoutePath.DOIQUALIFY_HOUSEHOLDSUMMARY]);
      // this.queueService.back();
      return;
    }
    this.currentUserId = id;
    this.initUserDetail();
  }
  next() {

    this.updateGuardian()
    this.doIQualifyService.updateBasicDetails({ basicDetails: this.basicDetails } as BasicDetails)
    let guardianSelection = {} as any
    guardianSelection[this.currentUserId] = this.grId;

    this.pageActionUtil.changeMapValue(this.currentUserId, true);
    const id = this.pageActionUtil.nextGuardianId();

    if (id < 0) {
      //   this.queueService.next();
      this.router.navigate([RoutePath.DOIQUALIFY + "/" + RoutePath.DOIQUALIFY_PROGRAMSELECTION]);
      return;
    }
    this.currentUserId = id;
    this.initUserDetail();


  }


  findIndex(id: number) {
    return this.basicDetails.findIndex((detail) => detail.id === id);
  }

  changeCurrentChildDetail(guardianId: any, isChecked: boolean) {
    const index = this.currentUserId;

    this.grId = [...this.basicDetails[index].guardians ?? []] as any[];


    if (isChecked) {
      if (index > -1) {

        this.grId.push(guardianId as any)
      }
      this.guardians.push(new FormControl(guardianId))
    }
    else {
      let id = this.getControlIndex(guardianId)
      if (id > -1) {
        this.guardians.removeAt(id);

      }
      this.grId = this.grId.filter((id) => id !== guardianId)
    }


    // this.basicDetails=[...detail];
    this.basicDetails = this.basicDetails.map((item, inde) => ((inde == index) ? { ...item, guardians: this.grId } : { ...item }));

  }
  getControlIndex(value: any) {
    return this.guardians.controls.findIndex((val: any) => val.value == value);
  }

  isChecked(id: number) {
    const chId = this.basicDetails[this.currentUserId].guardians ?? [];

    const index = chId.indexOf(id);
    if (index >= 0 && this.getControlIndex(id) == -1) {
      this.guardians.push(new FormControl(id));
    }

    return (index >= 0) ? true : false;
  }
  isFieldValid(): boolean {
    return this.doIQualifyService.isFieldValid(this.isParentOrGuardianForm, 'guardian')
  }
  getGuardianById() {
    return this.basicDetails[this.currentUserId].guardians ?? [];
  }
  parentOfIndividualId(id: any, basicDetails: BasicDetail[]) {
    let ids = [] as any;

    basicDetails.forEach((person) => {
      if (person.guardians != undefined && person.guardians.length > 0) {

        const index = person.guardians.indexOf(id);
        if (index >= 0 && ids.indexOf(person.id) < 0) {
          ids.push(person.id);
        }
      }
    })

    return ids;
  }

  updateGuardian() {
    let detail = [...this.basicDetails];
    this.basicDetails.forEach((person, index) => {
      if (person.guardians != undefined) {
        person.guardians.forEach((g) => {
          const index = this.findIndex(g);
          if (index >= 0) {

            detail = detail.map((item, inde) => ((inde == index) ? { ...item, guardians: (item.guardians != undefined) ? item.guardians.filter((id) => id != person.id) : [] } : { ...item }));

          }
        })
      }
    })
    this.basicDetails = [...detail];

  }


  getBackOrNextId() {
    const id = this.basicDetails[this.currentUserId].id;
    const individualIds = this.parentOfIndividualId(id, [...this.basicDetails]) as number[];
    this.filterBasicDetails(id, individualIds);
    if (this.filteredBasicDetails.length == 0) {
      const currentDirection = this.pageActionUtil.getDirection("guardianPageDirection")
      const direction = (currentDirection == PageDirection.NEXT) ? PageDirection.NEXT : PageDirection.BACK
      let _id = (direction == PageDirection.BACK) ? this.pageActionUtil.backUserId() : this.pageActionUtil.nextGuardianId();
      if (_id < 0) {
        (direction == PageDirection.NEXT) ? this.router.navigate([RoutePath.DOIQUALIFY + "/" + RoutePath.DOIQUALIFY_PROGRAMSELECTION]) : this.router.navigate([RoutePath.DOIQUALIFY + "/" + RoutePath.DOIQUALIFY_HOUSEHOLDSUMMARY]);
      }
      else {
        this.currentUserId = this.pageActionUtil.currentUserIndex;
        this.getBackOrNextId();
      }

    }
  }
  filterBasicDetails(id: number, individualIds: number[]) {

    const basicDetails = [...this.basicDetails]
    this.filteredBasicDetails = [];
    this.filteredBasicDetails = basicDetails.filter((detail: any) => detail.age >= 11 && detail.id != id)
    if (individualIds.length > 0) {
      this.filteredBasicDetails = basicDetails.filter((detail: any) => individualIds.indexOf(detail.id) == -1 && detail.id != id && detail.age >= 11)
    }
  }



}
