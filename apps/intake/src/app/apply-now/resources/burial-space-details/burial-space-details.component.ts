import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { Store } from "@ngrx/store";
// import { IApplyNowState } from "../../+state/apply-now.models";
import { IApplyNowState } from '../../+state/apply-now.models';
import { ApplyNowResourcesBurialSpaceDetailsStrategy } from '../../../shared/route-strategies/apply-now/resources-burial-space-details';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IBurialSpace, IHouseHold, IHouseHoldDetails } from '../../household/household-model';
import { ScreenQueueUtil } from '../resources-gatepost/resources-gatepost.path';
// import Validation from '../../../../../../utils/validation';

@Component({
  selector: 'compass-ui-burial-space-details',
  templateUrl: './burial-space-details.component.html',
  styleUrls: ['./burial-space-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApplyNowResourcesBurialSpaceDetailsStrategy]
})
export class BurialSpaceDetailsComponent implements OnInit {

  burialSpaceDetailsForm: FormGroup | any;
  houseHoldDetails!: IHouseHoldDetails;
  houseHoldPersons: IHouseHold[] = [];
  applyNowState: IApplyNowState | undefined;
  fragment = "new";


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: ApplyNowStoreService,
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private routingStrategy: ApplyNowResourcesBurialSpaceDetailsStrategy,
    private queueService: ScreenQueueUtil
  ) {
   
  }
  ngOnInit() {
    this.burialSpaceDetailsForm = this.fb.group({
      numberOfSpaces: [''],
      valueofSpaces: [''],
      amountOwedOnSpaces: [''],
      nameofCemetary: [''],

    });

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
      this.houseHoldDetails?.resources?.anyoneOwnaBurialSpace &&
      this.houseHoldDetails?.resources.anyoneOwnaBurialSpace.burialSpacesCollection
      && this.houseHoldDetails?.resources.anyoneOwnaBurialSpace.burialSpacesCollection[fragment]
    ) {
      this.burialSpaceDetailsForm.patchValue(
        this.houseHoldDetails.resources.anyoneOwnaBurialSpace.burialSpacesCollection[fragment]
      );
    }
  }

  private updateBurialSpaceDetail(recentBurialSpaceDetail: IBurialSpace): IBurialSpace {

    recentBurialSpaceDetail.numberOfSpaces = this.burialSpaceDetailsForm.get("numberOfSpaces").value;
    recentBurialSpaceDetail.valueofSpaces = this.burialSpaceDetailsForm.get("valueofSpaces").value;
    recentBurialSpaceDetail.amountOwedOnSpaces = this.burialSpaceDetailsForm.get("amountOwedOnSpaces").value;
    recentBurialSpaceDetail.nameofCemetary = this.burialSpaceDetailsForm.get("nameofCemetary").value;

    return recentBurialSpaceDetail;

  }
 
  goBack() {
    this.queueService.next();
  }

  goNext() {

    this.service.validateAllFormFields(this.burialSpaceDetailsForm);

    if (this.burialSpaceDetailsForm.valid) {
      
      let nextPageFragment = "0";
      const existingHouseHoldDetails = this.houseHoldDetails;
      const resources = { ...existingHouseHoldDetails.resources };
      let anyOneHaveABurialSpace = { ...resources.anyoneOwnaBurialSpace };
      let burialSpaceDetails = anyOneHaveABurialSpace.burialSpacesCollection || [];
      let recentBurialSpaceDetail: IBurialSpace;
      let updatedResources;

      if (this.fragment === "new") {
        recentBurialSpaceDetail = {};
        recentBurialSpaceDetail = this.updateBurialSpaceDetail(recentBurialSpaceDetail);
        burialSpaceDetails = [...burialSpaceDetails, ...[recentBurialSpaceDetail]]
      } else {
        burialSpaceDetails = burialSpaceDetails.map((detail, i) => {
          if (i === parseInt(this.fragment)) {
            recentBurialSpaceDetail = {...detail};
            recentBurialSpaceDetail = this.updateBurialSpaceDetail(recentBurialSpaceDetail);
            return { ...recentBurialSpaceDetail };
          } else {
            return { ...detail }
          }
        });
      }

      anyOneHaveABurialSpace = { ...anyOneHaveABurialSpace, ...{ code: "Yes" }, ...{ burialSpacesCollection: [...burialSpaceDetails] } }
      updatedResources = { ...resources, ...{ anyoneOwnaBurialSpace: anyOneHaveABurialSpace } }

      if (existingHouseHoldDetails)
        this.service.updateHouseHoldDetails({
          ...existingHouseHoldDetails,
          ...{ resources: updatedResources },
        });

      if (burialSpaceDetails.length > 0) {
        nextPageFragment = (burialSpaceDetails.length - 1).toString();
      }

      this.router.navigate([this.routingStrategy.nextRoute()], { fragment: nextPageFragment });

      return true;
    }
    else {
      return false;
    }
  }
}