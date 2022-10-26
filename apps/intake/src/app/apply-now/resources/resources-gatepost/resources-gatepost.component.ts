import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IApplyNowState, PageQueue, Resource } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import JsonData from './resourcess-gatepost.json';
import { IHouseHold } from '../../household/household-model';
import { ScreenQueueUtil, ScreenQueueRoutesResourcesSituations } from './resources-gatepost.path';

@Component({
  selector: "compass-ui-resources-gatepost",
  templateUrl: "./resources-gatepost.component.html",
  styleUrls: ["./resources-gatepost.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ResourcesGatepostComponent implements OnInit {
  jsonData: any;
  resources: any[] = [];
  resourcesGatepostForm: FormGroup | any;
  applyNowState!: IApplyNowState;
  pageQueue!: PageQueue;
  invalid!: boolean;
  programSelected: any[] = [];


  constructor(
    private cd: ChangeDetectorRef,
    private service: ApplyNowStoreService,
    private router: Router,
    private queueService: ScreenQueueUtil,
  ) {
  }

  ngOnInit(): void {
    this.jsonData = JsonData;
    this.service.getAppData().subscribe((d) => {
      this.applyNowState = { ...d };
      this.cd.detectChanges();
      this.programSelected = this.service.getProgramSelection || [];

      const gpServices =
        this.applyNowState.houseHoldDetails.resourceSituations;

      JsonData.questionAnswers.forEach((service) => {
        if (gpServices.checked !== undefined && gpServices.checked.indexOf(service.value) > -1) {
          service.isYesChecked = true;
          service.isNoChecked = false;
        }
        else if (gpServices.unchecked !== undefined && gpServices.unchecked.indexOf(service.value) > -1) {
          service.isYesChecked = false;
          service.isNoChecked = true;
        }
      });
      this.jsonData = JsonData;
    });

  }
  showNextPage(selectedItems: any) {

    const storedHouseholdDetails = this.applyNowState?.houseHoldDetails;
    let selectedPaths: any = {
      checked: [],
      unchecked: []
    };
    selectedItems.questionAnswers.forEach((item: any) => {
      if (item.isYesChecked) {
        selectedPaths.checked.push(item.value);
      }
      else if (item.isNoChecked) {
        selectedPaths.unchecked.push(item.value);
      }
    });
    const clonedUpdatedPerson: IHouseHold[] = [];
    this.applyNowState?.houseHoldDetails.houseHoldPersons!.forEach((person: IHouseHold) => {
      const clonedPerson = { ...person };
      clonedUpdatedPerson.push(clonedPerson);
    });
    
    if (storedHouseholdDetails) {
      this.service.updateHouseHoldDetails({
        ...storedHouseholdDetails,
        ...{ resourceSituations: selectedPaths, ...{ houseHoldPersons: clonedUpdatedPerson } },
      });
    }

    console.log(selectedPaths);
    
    this.queueService.initDynamicRoutes(
     
      selectedPaths.checked,
      RoutePath.APPLYNOW_RESOURCES +
      "/" +
      RoutePath.APPLYNOW_RESOURCES_RESOURCESSUMMARY
    );
    this.queueService.navigateToPath();
  }

  showPreviousPage() {
    if (this.queueService.state.pageQueue.currentPageId > 0) {
      this.queueService.backPath();
    }
  }
}