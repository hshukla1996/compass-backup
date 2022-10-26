import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IApplyNowState } from '../../+state/apply-now.models';
import { ApplyNowResourcesBurialSpacesStrategy } from '../../../shared/route-strategies/apply-now/resources-burial-spaces';
import { ApplyNowResourcesBurialSpacesSummaryStrategy } from '../../../shared/route-strategies/apply-now/resources-burial-spaces-summary';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, IHouseHoldDetails } from '../../household/household-model';

@Component({
  selector: 'compass-ui-burial-spaces-summary',
  templateUrl: './burial-spaces-summary.component.html',
  styleUrls: ['./burial-spaces-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApplyNowResourcesBurialSpacesSummaryStrategy, ApplyNowResourcesBurialSpacesStrategy]
})
export class BurialSpacesSummaryComponent implements OnInit {
  burialSpacesSummaryForm: FormGroup | any;
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
  residentialPropertyData = {
    "questionText": "Your burial spaces. .",
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
    "addtionalButton": "+ Add Burial Space"
  }


  constructor(private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private routingStrategy: ApplyNowResourcesBurialSpacesSummaryStrategy,
    private addroutingStrategy: ApplyNowResourcesBurialSpacesStrategy,
  
    private router: Router) { }

  ngOnInit(): void {
  }

  recordIndexToOp(recordIndex: number) {
    this.recordToBeOperated = recordIndex;
  }

  deleteClicked(userId: any) {
    this.deletedUser = userId;
  }
  continueClicked() {

  }
  addClicked() {

  }
  editClicked(userId: any) {

  }

  addResidentialProperty() {
    this.router.navigate([this.addroutingStrategy.currentRoute]);
  }
  back() {
    this.router.navigate([this.routingStrategy.previousRoute()]);
  }

  next() {
    this.router.navigate([this.routingStrategy.nextRoute()]);
  }

 

}


