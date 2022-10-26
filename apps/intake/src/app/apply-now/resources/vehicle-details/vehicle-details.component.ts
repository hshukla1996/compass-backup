import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output, Input, ChangeDetectorRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IApplyNowState } from '../../+state/apply-now.models';
import { ApplyNowResourcesVehicleDetailsStrategy } from '../../../shared/route-strategies/apply-now/vehicle-details';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, IHouseHoldDetails, IVehicle } from '../../household/household-model';
import { ScreenQueueUtil } from '../resources-gatepost/resources-gatepost.path';

@Component({
  selector: 'compass-ui-vehicle-details',
  templateUrl: 'vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApplyNowResourcesVehicleDetailsStrategy]
})
export class VehicleDetailsComponent implements OnInit {

  vehicleDetailsForm: FormGroup | any;
  houseHoldDetails!: IHouseHoldDetails;
  houseHoldPersons: IHouseHold[] = [];
  applyNowState: IApplyNowState | undefined;
  fragment = "new";


  constructor(private vehicleDetailsFm: FormBuilder,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private routingStrategy: ApplyNowResourcesVehicleDetailsStrategy,
    private router: Router,
    private queueService: ScreenQueueUtil) { }

  ngOnInit() {
    this.vehicleDetailsForm = this.vehicleDetailsFm.group({
      year:[],
      make:[],
      model:[],
      isThisVehiclelicensed:[],
      amountOwed:[]

    })
    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.houseHoldDetails = this.service.getHouseHoldDetails;
      if (this.houseHoldDetails.houseHoldPersons) {
        this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
      }
    });

    this.activatedRoute.fragment.subscribe((fragment) => {
      this.fragment = fragment || "new";
      if (this.fragment !== "new") {
        this.setFormValues(this.fragment);
      }
    });
  }
  setFormValues(fragment: any) {
    if (
      this.houseHoldDetails?.resources?.anyoneOwnorBuyingVehicle &&
      this.houseHoldDetails?.resources.anyoneOwnorBuyingVehicle.vehicleCollection
      && this.houseHoldDetails?.resources.anyoneOwnorBuyingVehicle.vehicleCollection[fragment]
    ) {
      this.vehicleDetailsForm.patchValue(
        this.houseHoldDetails.resources.anyoneOwnorBuyingVehicle.vehicleCollection[fragment]
      );
    }
  }

  private updateVehicleDetail(recentVehicleDetail: IVehicle): IVehicle {

    recentVehicleDetail.year= this.vehicleDetailsForm.get("year").value;
    recentVehicleDetail.make = this.vehicleDetailsForm.get("make").value;
    recentVehicleDetail.model = this.vehicleDetailsForm.get("model").value;
    if (this.vehicleDetailsForm.get("isThisVehiclelicensed").value === "Y") {
      recentVehicleDetail.isThisVehiclelicensed = "Yes";
    }
    else
    {
      recentVehicleDetail.isThisVehiclelicensed = "No"; 
    }
    recentVehicleDetail.amountOwed = this.vehicleDetailsForm.get("amountOwed").value;

    return recentVehicleDetail;
  }
  goBack() {
    this.queueService.back();
  }

  goNext() {
    this.service.validateAllFormFields(this.vehicleDetailsForm);

    if (this.vehicleDetailsForm.valid) {

      let nextPageFragment = "0";
      const existingHouseHoldDetails = this.houseHoldDetails;
      const resources = { ...existingHouseHoldDetails.resources };
      let anyOneHaveAVehicle = { ...resources.anyoneOwnorBuyingVehicle };
      let vehicleDetails = anyOneHaveAVehicle.vehicleCollection || [];
      let recentVehicleDetail: IVehicle;
      let updatedResources;

      if (this.fragment === "new") {
        recentVehicleDetail = {};
        recentVehicleDetail = this.updateVehicleDetail(recentVehicleDetail);
        vehicleDetails = [...vehicleDetails, ...[recentVehicleDetail]]
      } else {
        vehicleDetails = vehicleDetails.map((detail, i) => {
          if (i === parseInt(this.fragment)) {
            recentVehicleDetail = { ...detail };
            recentVehicleDetail = this.updateVehicleDetail(recentVehicleDetail);
            return { ...recentVehicleDetail };
          } else {
            return { ...detail }
          }
        });
      }

      anyOneHaveAVehicle = { ...anyOneHaveAVehicle, ...{ code: "Yes" }, ...{ vehicleCollection: [...vehicleDetails] } }
      updatedResources = { ...resources, ...{ anyoneOwnorBuyingVehicle: anyOneHaveAVehicle } }

      if (existingHouseHoldDetails)
        this.service.updateHouseHoldDetails({
          ...existingHouseHoldDetails,
          ...{ resources: updatedResources },
        });

      if (this.fragment === "new" && vehicleDetails.length > 0) {
        nextPageFragment = (vehicleDetails.length - 1).toString();
      }else{
        nextPageFragment = this.fragment;
      }

      this.router.navigate([this.routingStrategy.nextRoute()], { fragment: nextPageFragment });

      return true;
    }
    else {
      return false;
    }
    
  }
}