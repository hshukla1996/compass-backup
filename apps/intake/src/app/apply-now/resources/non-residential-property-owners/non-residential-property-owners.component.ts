import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output, Input, ChangeDetectorRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IApplyNowState } from '../../+state/apply-now.models';
import { ApplyNowNonResidentialPropertyStrategy } from '../../../shared/route-strategies/apply-now/non-residential-property';
import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, IHouseHoldDetails, IResourcesNonResidentialProperty } from '../../household/household-model';

@Component({
  selector: 'compass-ui-non-residential-property-owners',
  templateUrl: './non-residential-property-owners.component.html',
  styleUrls: ['./non-residential-property-owners.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApplyNowNonResidentialPropertyStrategy]
})
export class NonResidentialPropertyOwnersComponent implements OnInit {

  nonresidentialPropertyOwnersForm: FormGroup | any;
  houseHoldPersons: IHouseHold[] = [];
  applyNowState!: IApplyNowState;
  houseHoldDetails!: IHouseHoldDetails;
  fragment = "0";
  selectedOwners: string[] = [];
  displayError: boolean = false;


  constructor(private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private routingStrategy: ApplyNowNonResidentialPropertyStrategy,
    private router: Router,
    private screenQueueUtil: ScreenQueueUtil,
    private activatedRoute: ActivatedRoute,) { } 

  ngOnInit() {
    this.buildInitialForm();

    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.houseHoldDetails = this.service.getHouseHoldDetails;
      if (this.houseHoldDetails.houseHoldPersons) {
        this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons || [];
        this.cd.detectChanges();
      }
    });

    this.activatedRoute.fragment.subscribe((fragment) => {
      this.fragment = fragment || "0";
      this.setupCheckboxFromState();
    });
    
  }
  get nonresidentialPropertyOwners(): FormArray {
    return <FormArray>this.nonresidentialPropertyOwnersForm.controls['nonresidentialPropertyOwners'];
  }
  private buildInitialForm(): void {
    this.nonresidentialPropertyOwnersForm = this.fb.group({
      nonresidentialPropertyOwners: this.fb.array([]),
      isSomeoneOutsideHousehold: [false],
      nonresidentialpropertyssomeone: [""],
    })
  }
  private setupCheckboxFromState() {
    let nonresidentialProperties = this.houseHoldDetails.resources?.nonresidentialProperty?.nonResidentialPropertyCollection
    if (nonresidentialProperties && nonresidentialProperties.length > 0) {
      nonresidentialProperties[parseInt(this.fragment)].owner?.forEach(owner => {
        this.nonresidentialPropertyOwners.push(new FormControl(owner))
      });
    }

  }
  getIndex(value: string): number {
    return this.nonresidentialPropertyOwners.controls.findIndex(ctrl => ctrl.value == value);
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
  outsideOfHousedholdChanged(data: any) {
    if (data.checked) {
      this.nonresidentialPropertyOwnersForm.value.isSomeoneOutsideHousehold = true;
    } else {
      this.nonresidentialPropertyOwnersForm.value.isSomeoneOutsideHousehold = false;
    }
  }

  onCheckboxChange(personId: number, data: any) {
    if (data.checked) {
      this.nonresidentialPropertyOwners.push(new FormControl(personId));
    }
    else {
      let resourceIndex = this.getIndex(personId.toString())
      if (resourceIndex > -1) {
        this.nonresidentialPropertyOwners.removeAt(resourceIndex);
      }
    }
  }
  getNonResidentialPropertyState(personId: number): boolean {
    let index = this.getIndex(personId.toString())
    if (index > -1) {
      return true;
    } else {
      return false;
    }
  }

  goBack() {
    this.router.navigate([this.routingStrategy.previousRoute()],{fragment:this.fragment});
  }

  goNext() {
   
    this.service.validateAllFormFields(this.nonresidentialPropertyOwnersForm);
    if (this.nonresidentialPropertyOwnersForm.valid) {

      const selectedUserIds: string[] = [];
      const existingHouseHoldDetails = this.houseHoldDetails;
      const resources = { ...existingHouseHoldDetails.resources };
      let anyOneHavingNonResidentialProperty = { ...resources.nonresidentialProperty };
      let nonResidentialPropertyDetails = anyOneHavingNonResidentialProperty.nonResidentialPropertyCollection || [];
      let recentNonResidentialResource: IResourcesNonResidentialProperty;
      let updatedResources;

      this.nonresidentialPropertyOwnersForm.value.nonresidentialPropertyOwners.forEach((person: any) => {
        selectedUserIds.push(person)
      });

      nonResidentialPropertyDetails = nonResidentialPropertyDetails.map((detail, i) => {
        if (i === parseInt(this.fragment)) {

          recentNonResidentialResource = { ...detail };
          recentNonResidentialResource.owner = [...selectedUserIds]

          if (this.nonresidentialPropertyOwnersForm.get("isSomeoneOutsideHousehold").value){
            recentNonResidentialResource.ownerName = this.nonresidentialPropertyOwnersForm.get("ownerName").value;
          }else{
            recentNonResidentialResource.ownerName = "";
          } 
          return { ...recentNonResidentialResource };
        } else {
          return { ...detail }
        }
      });

      anyOneHavingNonResidentialProperty = { ...anyOneHavingNonResidentialProperty, ...{ nonResidentialPropertyCollection: [...nonResidentialPropertyDetails] } }
      updatedResources = { ...resources, ...{ nonresidentialProperty: anyOneHavingNonResidentialProperty } }

      if (existingHouseHoldDetails)
        this.service.updateHouseHoldDetails({
          ...existingHouseHoldDetails,
          ...{ resources: updatedResources },
        });

      this.router.navigate([this.routingStrategy.nextRoute()]);
      return true;
    }
    else {
      return false;
    }
  }



}