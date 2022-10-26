import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IApplyNowState } from '../../+state/apply-now.models';
import { ApplyNowResourcesBurialOrTrustAgreementStrategy } from '../../../shared/route-strategies/apply-now/burial-or-trust-agreement';
import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IBurialTrustAgreement, IBurialTrustAgreementDetails, IHouseHold, IHouseHoldDetails, IResources } from '../../household/household-model';

@Component({
  selector: 'compass-ui-burial-or-trust-agreement',
  templateUrl: './burial-or-trust-agreement.component.html',
  styleUrls: ['./burial-or-trust-agreement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApplyNowResourcesBurialOrTrustAgreementStrategy]
})
export class BurialOrTrustAgreementComponent implements OnInit {

  public burialOrTrustAgreementForm: FormGroup | any;
  public requiredFields = [] as string[];
  public selectedUserids: string[] = [];
  private eventsSubscription: Subscription | undefined;
  private houseHoldHead!: IHouseHold;
  private houseHoldHeadPersons: IHouseHold[] = [];
  private pregnancyMap: any = {};
  private burialAgreementDetails?: IBurialTrustAgreement;
  private householdMembers: any[] = [];
  applyNowState: IApplyNowState | undefined;
  public textboxValidators = [Validators.maxLength(26), Validators.pattern('^[a-zA-Z]*$')];
  houseHoldDetails!: IHouseHoldDetails;
  public ownerName: string = '';
  fragment = "0";
  houseHoldPersons: IHouseHold[] = [];

  public burialTrustAgreementJsonData = {
    "questionText": "Tell us who owns this burial or trust agreement.",
    "subHeading": "Select all that apply.",
    "toolTip": "",
    "isRequired": true,
    "requiredText": "You must select an option.",
    "questionAnswers": [{
      "id": 1,
      "label": "",
      "isChecked": false,
      "isDisplayTextbox": false
    }]
  };

  constructor(private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private routingStrategy: ApplyNowResourcesBurialOrTrustAgreementStrategy,
    // private addroutingStrategy: ApplyNowResourcesBurialSpacesStrategy,
    private router: Router,
    private screenQueueUtil: ScreenQueueUtil,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.service.getAppData().subscribe(d => {
      this.houseHoldDetails = this.service.getHouseHoldDetails;
      if (this.houseHoldDetails.houseHoldPersons) {
        this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
      }
    });

    this.activatedRoute.fragment.subscribe((fragment) => {
      const resourcesCnt = this.houseHoldDetails.resources?.anyoneHaveBurialORTrustAgreementWithBankORFuneralHome?.burialAgreementCollection?.length || 0
      this.fragment = fragment || (resourcesCnt > 0 ? (resourcesCnt - 1).toString() : "");
      if (this.fragment !== "" && this.fragment !== null) {
        if (this.houseHoldDetails.resources?.anyoneHaveBurialORTrustAgreementWithBankORFuneralHome?.burialAgreementCollection) {

          this.houseHoldDetails.resources?.anyoneHaveBurialORTrustAgreementWithBankORFuneralHome?.burialAgreementCollection[+this.fragment]?.owner?.forEach((per) => {
            this.selectedUserids.push(per as unknown as string);
          });

          this.ownerName = this.houseHoldDetails.resources?.anyoneHaveBurialORTrustAgreementWithBankORFuneralHome?.burialAgreementCollection[+this.fragment]?.ownerName as string;
          this.setFormValues();
        }
        else {
          this.setFormValues();
        }
      }
    });
  }

  private setFormValues() {
    this.burialTrustAgreementJsonData.questionAnswers = [];
    this.houseHoldPersons.forEach((person) => {
      this.burialTrustAgreementJsonData.questionAnswers.push({
        id: person.id as unknown as number,
        isChecked: this.selectedUserids && this.selectedUserids.length > 0 ? this.selectedUserids.findIndex(x => +x === person.id) > -1 : false,
        label: Utility.getLabelText(person),
        isDisplayTextbox: false
      })
    });

    const isDisplayTextboxExists = this.burialTrustAgreementJsonData.questionAnswers.find(x => x.isDisplayTextbox === true);
    if (!isDisplayTextboxExists) {
      this.burialTrustAgreementJsonData.questionAnswers.push({
        id: 0,
        isChecked: this.ownerName !== undefined && this.ownerName !== null && this.ownerName !== "",
        label: "Someone Outside of the Household",
        isDisplayTextbox: true
      });
    }
  }

  public isFieldValid(field: string): boolean {
    const formField = this.burialOrTrustAgreementForm.get(field);
    return (
      formField && this.burialOrTrustAgreementForm.get(field).status !== "VALID" &&
      this.burialOrTrustAgreementForm.get(field).touched
    );
  }


  goBack() {
    this.router.navigate([this.routingStrategy.previousRoute()], { fragment: this.fragment });
  }

  goNext(event: any) {
    const existingHouseHoldDetails = this.houseHoldDetails;
    const resources = { ...existingHouseHoldDetails.resources };
    const anyoneHaveBurialORTrustAgreementWithBankORFuneralHome = { ...resources.anyoneHaveBurialORTrustAgreementWithBankORFuneralHome };

    if (anyoneHaveBurialORTrustAgreementWithBankORFuneralHome.burialAgreementCollection && anyoneHaveBurialORTrustAgreementWithBankORFuneralHome.burialAgreementCollection.length > 0) {
      const burialDetails = [...anyoneHaveBurialORTrustAgreementWithBankORFuneralHome.burialAgreementCollection];
      let recentAddedResource = { ...burialDetails[Number(this.fragment)] };

      recentAddedResource.owner = event.selectedUserId;
      recentAddedResource.ownerName = event.name;
      burialDetails[Number(this.fragment)] = recentAddedResource;

      const updatedBurialCollection = [...burialDetails]
      const updatedBurial = { ...anyoneHaveBurialORTrustAgreementWithBankORFuneralHome, ...{ burialAgreementCollection: [...updatedBurialCollection] } };
      const updatedResources = { ...resources, ...{ anyoneHaveBurialORTrustAgreementWithBankORFuneralHome: updatedBurial } }

      if (existingHouseHoldDetails)
        this.service.updateHouseHoldDetails({
          ...existingHouseHoldDetails,
          ...{ resources: updatedResources },
        });
    }

    this.router.navigate([this.routingStrategy.nextRoute()]);
  }
}
