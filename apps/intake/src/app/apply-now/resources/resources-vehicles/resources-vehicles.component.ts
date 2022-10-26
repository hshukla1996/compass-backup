import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output, Input, ChangeDetectorRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IApplyNowState } from '../../+state/apply-now.models';
import { ApplyNowResourcesVehiclesStrategy } from '../../../shared/route-strategies/apply-now/resources-vehicles';
import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IAnyOwnORBuyingVehicle, IHouseHold, IHouseHoldDetails, IResources, IVehicle } from '../../household/household-model';
//  import { ApplyNowStoreService } from '../../apply-now-store-service';

@Component({
  selector: 'compass-ui-resources-vehicles',
  templateUrl: './resources-vehicles.component.html',
  styleUrls: ['./resources-vehicles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApplyNowResourcesVehiclesStrategy]
})
export class ResourcesVehiclesComponent implements OnInit {
  resourceVehiclesForm: FormGroup | any;
  houseHoldPersons: IHouseHold[] = [];
  applyNowState!: IApplyNowState;
  houseHoldDetails!: IHouseHoldDetails;
  displayError: boolean = false;
  fragment = "new";
  constructor(private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private routingStrategy: ApplyNowResourcesVehiclesStrategy,
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
  get resourceVehicleOwners(): FormArray {
    return <FormArray>this.resourceVehiclesForm.controls['vehicleOwners'];
  }

  private buildInitialForm(): void {
    this.resourceVehiclesForm = this.fb.group({
      vehicleOwners: this.fb.array([]),
      isSomeoneOutsideHousehold: [false],
      ownerName: [""],
    })
  }

  private setupCheckboxFromState() {
    let vehicleResources = this.houseHoldDetails.resources?.anyoneOwnorBuyingVehicle?.vehicleCollection
    if (vehicleResources && vehicleResources.length > 0) {
      vehicleResources[parseInt(this.fragment)].owner?.forEach(owner => {
        this.resourceVehicleOwners.push(new FormControl(owner))
      });
    }
  }

  getIndex(value: string): number {
    return this.resourceVehicleOwners.controls.findIndex(ctrl => ctrl.value == value);
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
      this.resourceVehiclesForm.patchValue({
        "isSomeoneOutsideHousehold" : true
      });
    } else {
      this.resourceVehiclesForm.patchValue({
        "isSomeoneOutsideHousehold": false
      });
    }
  }

  onCheckboxChange(personId: number, data: any) {
    if (data.checked) {
      this.resourceVehicleOwners.push(new FormControl(personId));
    }
    else {
      let resourceIndex = this.getIndex(personId.toString())
      if (resourceIndex > -1) {
        this.resourceVehicleOwners.removeAt(resourceIndex);
      }
    }
  }

  getReourceVehicleState(personId: number): boolean {
    let index = this.getIndex(personId.toString())
    if (index > -1) {
      return true;
    } else {
      return false;
    }
  }
  goBack() {
    this.router.navigate([this.routingStrategy.previousRoute()], { fragment: this.fragment });
  }

  goNext() {
    this.service.validateAllFormFields(this.resourceVehiclesForm);
    if (this.resourceVehiclesForm.valid) {

      const selectedUserIds: string[] = [];
      const existingHouseHoldDetails = this.houseHoldDetails;
      const resources = { ...existingHouseHoldDetails.resources };
      let anyOneBuyingVehicle = { ...resources.anyoneOwnorBuyingVehicle };
      let vehicleDetails = anyOneBuyingVehicle.vehicleCollection || [];
      let recentVehicleResource: IVehicle;
      let updatedResources;

      this.resourceVehiclesForm.value.vehicleOwners.forEach((person: any) => {
        selectedUserIds.push(person)
      });

      vehicleDetails = vehicleDetails.map((detail, i) => {
        if (i === parseInt(this.fragment)) {

          recentVehicleResource = { ...detail };
          recentVehicleResource.owner = [...selectedUserIds]

          if (this.resourceVehiclesForm.get("isSomeoneOutsideHousehold").value) {
            recentVehicleResource.ownerName = this.resourceVehiclesForm.get("ownerName").value;
          } else {
            recentVehicleResource.ownerName = "";
          }
          return { ...recentVehicleResource };
        } else {
          return { ...detail }
        }
      });

      anyOneBuyingVehicle = { ...anyOneBuyingVehicle, ...{ vehicleCollection: [...vehicleDetails] } }
      updatedResources = { ...resources, ...{ anyoneOwnorBuyingVehicle: anyOneBuyingVehicle } }

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