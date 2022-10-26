import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IApplyNowState } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowResourcesVehicleSummaryStrategy } from '../../../shared/route-strategies/apply-now/resources-vehicle-summary';
import { ApplyNowResourcesVehiclesStrategy } from '../../../shared/route-strategies/apply-now/resources-vehicles';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, IHouseHoldDetails } from '../../household/household-model';
import { ScreenQueueUtil } from '../resources-gatepost/resources-gatepost.path';
@Component({
  selector: 'compass-ui-vehicle-summary',
  templateUrl: './vehicle-summary.component.html',
  styleUrls: ['./vehicle-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApplyNowResourcesVehicleSummaryStrategy, ApplyNowResourcesVehiclesStrategy]
})

export class VehicleSummaryComponent implements OnInit {

  vehicleSummaryForm: FormGroup | any;
  applyNowState!: IApplyNowState;
  jsonData: any;
  houseHoldDetails!: IHouseHoldDetails;
  howOften: any;
  recordToBeOperated!: number;
  deletedResource!: any;
  deletedUser!: any;
  houseHoldPersons: IHouseHold[] = [];
  personMap = new Map<string, string>()

  modalData = {
    modalTitle: "Are you sure you want to remove this record?",
    modalContent:
      "If you remove this record you will need to re-enter the data to get it back.",
    cancelButton: "Cancel",
    continueButton: "Remove",
  };
  resourcesVehicleData= {
    "questionText": "Your owned vehicles",
    "subHeading": "Review the entries to make sure everything looks correct.",
    "toolTip": "",
    "questionAnswers": [
      {
        "accordionHeader": "",
        "accordionSubHeading": "{replace} Sample 65 ",
        "accordionRightHeading": "",
        "accordionRightSubHeading": "",
        "accordionRecord": 1,
        "accordionData": [{}],
        "editButton": "Edit",
        "deleteButton": "Delete"
      },
    ],
    "addtionalButton": "Add Vehicle"
  }


  constructor(private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private routingStrategy: ApplyNowResourcesVehicleSummaryStrategy,
    private addroutingStrategy: ApplyNowResourcesVehiclesStrategy,
    private router: Router,
    private queueService: ScreenQueueUtil
  )  { }

  ngOnInit(): void {
    this.houseHoldDetails = this.service.getHouseHoldDetails;
    if (this.houseHoldDetails) {
      this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons || [];
      let resourceVehicle = this.houseHoldDetails.resources?.anyoneOwnorBuyingVehicle?.vehicleCollection;

      resourceVehicle?.forEach((vehicle: any, idx: number) => {
        this.resourcesVehicleData["questionAnswers"][idx] = {
          accordionHeader: vehicle.year +" "+ vehicle.make +" "+ vehicle.model,
          accordionSubHeading: vehicle.ownerName,
          accordionRightHeading: "",
          accordionRightSubHeading: "",
          accordionRecord: idx,
          accordionData: [
           
            {
              'label': "Model Year",
              'value': vehicle.year,
              "bold": false
            },
            {
              'label': "Make",
              'value': vehicle.make,
              "bold": false
            },
            {
              'label': "Model",
              'value': vehicle.model,
              "bold": false
            },
            {
              'label': "Is the vehicle registered?",
              'value': vehicle.isThisVehiclelicensed,
              "bold": false
            },
           
            {
              'label': "How much money is owed for this vehicle?",
              'value': "$"+vehicle.amountOwed+"k",
              "bold": false
            },
            {
              'label': "Tell us who owns this vehicle.",
              'value': vehicle.owner,
              "bold": false
            },
            {
              'label': "Tell us who outside of the household owns this vehicle.",
              'value': vehicle.ownerName,
              "bold": false
            },
           
          ],
          editButton: "Edit",
          deleteButton: "Remove"
        }
      });
      this.jsonData = this.resourcesVehicleData;
    }
  };
  

  recordIndexToOp(recordIndex: number) {
    this.recordToBeOperated = recordIndex;
  }

  deleteClicked(userId: any) {
    this.deletedUser = userId;
  }
  continueClicked() {
    const storedHouseholdDetails = this.houseHoldDetails;
    const resources = { ...storedHouseholdDetails.resources };
    let anyOneHavingVehicle = { ...resources.anyoneOwnorBuyingVehicle };
    let updatedResources;

    if (anyOneHavingVehicle &&
      anyOneHavingVehicle.vehicleCollection
      && anyOneHavingVehicle.vehicleCollection?.length > 0) {
      const vehicleDetails = [...anyOneHavingVehicle.vehicleCollection];
      vehicleDetails .splice(this.recordToBeOperated, 1)

      anyOneHavingVehicle = { ...anyOneHavingVehicle, ...{ vehicleCollection: [...vehicleDetails] } }
      updatedResources = { ...resources, ...{ anyoneOwnorBuyingVehicle: anyOneHavingVehicle } }

      if (storedHouseholdDetails)
        this.service.updateHouseHoldDetails({
          ...storedHouseholdDetails,
          ...{ resources: updatedResources },
        });

      this.jsonData["questionAnswers"].forEach((element: any) => {
        if (element["accordionRecord"] == this.recordToBeOperated) {
          element["accordionHeader"] = "";
        }
      });

  }
}
  addClicked() {
    this.router.navigate([
      RoutePath.APPLYNOW +
      '/' + RoutePath.APPLYNOW_RESOURCES +
      '/' + RoutePath.APPLYNOW_RESOURCES_VEHICLEDETAILS
    ], { fragment: "new" });
  }
  editClicked(userId: any) {
    this.router.navigate([
      RoutePath.APPLYNOW +
      '/' + RoutePath.APPLYNOW_RESOURCES +
      '/' + RoutePath.APPLYNOW_RESOURCES_VEHICLEDETAILS
    ],
      { fragment: this.recordToBeOperated.toString() });

  }

  back() {
    this.router.navigate([this.routingStrategy.previousRoute()]);
  }

  next() {
    this.queueService.next();
  }
}


    

