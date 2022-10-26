import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IApplyNowState } from '../../+state/apply-now.models';
import { ApplyNowResidentialPropertyStrategy } from '../../../shared/route-strategies/apply-now/residential-property';
import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, IHouseHoldDetails } from '../../household/household-model';


@Component({
  selector: 'compass-ui-residential-property',
  templateUrl: './residential-property.component.html',
  styleUrls: ['./residential-property.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApplyNowResidentialPropertyStrategy]
})
export class ResidentialPropertyComponent implements OnInit {

  residentialPropertyForm: FormGroup | any;
  houseHoldDetails!: IHouseHoldDetails;
  houseHoldPersons: IHouseHold[] = [];
  applyNowState: IApplyNowState | undefined;
  fragment = "0";

  constructor(private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private routingStrategy: ApplyNowResidentialPropertyStrategy,
    private router: Router,
    private screenQueueUtil: ScreenQueueUtil,
    private activatedRoute: ActivatedRoute,
    private queueService: ScreenQueueUtil) { }

  ngOnInit() {
    this.residentialPropertyForm = this.fb.group({
      estimatedMarketValue: [""],
      currentlyLiveElsewhere: [""],
      intendToReturnHome: [""],
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
    });

    if (
      this.houseHoldDetails?.resources?.anyoneOwnAHome &&
      this.houseHoldDetails?.resources.anyoneOwnAHome.code === "Yes"
    ) {
      let residentialInfoDetail = this.houseHoldDetails?.resources.anyoneOwnAHome;
      this.residentialPropertyForm.get("currentlyLiveElsewhere").patchValue(residentialInfoDetail.currentlyLiveElsewhere);
      this.residentialPropertyForm.get("intendToReturnHome").patchValue(residentialInfoDetail.intendToReturnHome === "Yes"?"Y":"N");
      this.residentialPropertyForm.get("estimatedMarketValue").patchValue(residentialInfoDetail.estimatedMarketValue)
    }
  }

  goBack() {
    this.queueService.back();
  }

  goNext() {
    const existingHouseHoldDetails = this.houseHoldDetails;
    const resources = { ...existingHouseHoldDetails.resources };
    let residentialPropertyInfo = { ...resources.anyoneOwnAHome };
    let updatedResources;
    let intendToReturnHome;

    if (this.residentialPropertyForm.get("intendToReturnHome").value === "") {
      intendToReturnHome = "No"
    } else {
      intendToReturnHome = this.residentialPropertyForm.get("intendToReturnHome").value === "Y"?"Yes":"No";
    }

    residentialPropertyInfo = {
      ...residentialPropertyInfo, ...{ code: "Yes" },
      ...{ estimatedMarketValue: this.residentialPropertyForm.get("estimatedMarketValue").value },
      ...{ currentlyLiveElsewhere: this.residentialPropertyForm.get("currentlyLiveElsewhere").value },
      ...{ intendToReturnHome: intendToReturnHome }
    }

    updatedResources = { ...resources, ...{ anyoneOwnAHome: residentialPropertyInfo } }

    if (existingHouseHoldDetails)
      this.service.updateHouseHoldDetails({
        ...existingHouseHoldDetails,
        ...{ resources: updatedResources },
      });

    this.router.navigate([this.routingStrategy.nextRoute()], { fragment: this.fragment });
  }
}
