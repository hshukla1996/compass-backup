import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ApplyNowExpensesWaterGatepostStrategy } from '../../../shared/route-strategies/apply-now/expenses-water-gatepost';
import { expensesWaterGatepost, IHouseHold, IHouseHoldDetails } from '../../household/household-model';
import { delay, first, of, Subscription } from "rxjs";
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IApplyNowState } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';
import { IGeneralDetails } from '../../individual-details/general-details/state/general-details-model';

@Component({
  selector: 'compass-ui-water-gatepost',
  templateUrl: './water-gatepost.component.html',
  styleUrls: ['./water-gatepost.component.scss'],
  providers: [ApplyNowExpensesWaterGatepostStrategy]
})
export class WaterGatepostComponent implements OnInit {

  waterGatepostForm: FormGroup | any;
  selectedRaces: string[] = [];
  householdHead!: IHouseHold;
  houseHoldPersons: IHouseHold[] = [];
  houseHoldDetails!: IHouseHoldDetails;
  generalDetails: IGeneralDetails | null = null;
  applyNowState: IApplyNowState | undefined;
  storedData: IGeneralDetails | undefined;
  routePath: typeof RoutePath = RoutePath;
  public waterGatepost: expensesWaterGatepost | any = {
    drinkingWaterShutOff: null,
    wasteWaterShutOff: null,
    noticeFordrinkingWaterShutOff: null,
    noticeForwasteWaterShutOff: null,
    overDueForDrinkingWater: null,
    overDueForWasteWater: null,
    otherwater: null
  }
  gatePostData:any = {
    "questionText": "Do any of the following water situations apply?",
    "toolTip": "",
    "subHeading": "",
    "requiredText": "",
    "questionAnswers": [
      {
        "legend": "Drinking water is shut off",
        "toolTip": "",
        "accordionButton": "",
        "accordionData": "",
        "show": true,
        "disable": false,
        "isYesChecked": false,
        "isNoChecked": false,
        "value": "drinkingWaterShutOff"
      },
      {
        "legend": "Wastewater is shut off",
        "toolTip": "",
        "accordionButton": "",
        "accordionData": "",
        "show": true,
        "disable": false,
        "isYesChecked": false,
        "isNoChecked": false,
        "value": "wasteWaterShutOff"
      },
      {
        "legend": "Have a shut-off notice for drinking water",
        "toolTip": "",
        "accordionButton": "",
        "accordionData": "",
        "show": true,
        "disable": false,
        "isYesChecked": false,
        "isNoChecked": false,
        "value": "shutOffNoticeforDrinkingWater"
      },
      {
        "legend": "Have a shut-off notice for wastewater",
        "toolTip": "",
        "accordionButton": "",
        "accordionData": "",
        "show": true,
        "disable": false,
        "isYesChecked": false,
        "isNoChecked": false,
        "value": "shtOffNoticeForWasteWater"
      },
      {
        "legend": "Have overdue bills for drinking water",
        "toolTip": "",
        "accordionButton": "",
        "accordionData": "",
        "show": true,
        "disable": false,
        "isYesChecked": false,
        "isNoChecked": false,
        "value": "OverDueBillsDrinkingWater"
      },
      {
        "legend": "Have overdue bills for wastewater",
        "toolTip": "",
        "accordionButton": "",
        "accordionData": "",
        "show": true,
        "disable": false,
        "isYesChecked": false,
        "isNoChecked": false,
        "value": "overDueBillsForWasteWater"
      },
      {
        "legend": "Tell us more about your other water situation.",
        "toolTip": "",
        "accordionButton": "",
        "accordionData": "",
        "show": true,
        "other":true,
        "disable": false,
        "isYesChecked": false,
        "isNoChecked": false,
        "value": "otherWaterSituation"
      }

    ]
  }



  constructor(
    private fb: FormBuilder,
    private route: Router,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private routingStrategy: ApplyNowExpensesWaterGatepostStrategy,
    // private storeService: DoIQualifyStoreService,
  ) { }



  ngOnInit(): void {
    this.houseHoldDetails = this.service.getHouseHoldDetails;
    this.gatePostData.questionAnswers.forEach((service:any) => {
      // console.log(i + "-," + service.legend);
      const checkedItems = this.houseHoldDetails?.expenses?.waterGatepostDetails?.checked || []
      const uncheckedItems = this.houseHoldDetails?.expenses?.waterGatepostDetails?.unchecked || []

      if (checkedItems.indexOf(service.value) > -1) {
        service.isYesChecked = true
      }
      else if (uncheckedItems.indexOf(service.value) > -1) {
        service.isNoChecked = true;
      }

    });
    this.gatePostData.otherInfo =
      this.houseHoldDetails?.expenses?.waterGatepostDetails?.otherWater;
    // console.log("----",this.houseHoldDetails)
  }

  showNextPage(selectedItems: any) {
    const selectedPaths: any = {
      checked: [],
      unchecked: [],
      otherWater:"",
    };
    selectedItems.questionAnswers.forEach((item: any) => {

      if (item.isYesChecked) {

        selectedPaths.checked.push(item.value);
      } else if (item.isNoChecked) {
        selectedPaths.unchecked.push(item.value);
      }
    });
    console.log("tytytyt", selectedPaths);
    const utilityDetails = {
      checked: selectedPaths.checked,
      unchecked: selectedPaths.unchecked,
      otherWater: selectedItems.otherInfo,
    }


    const storeHouseholdDetails = this.houseHoldDetails;
    const storedHouseHold =
      this.houseHoldDetails.expenses;
    // const storedHouseholdUtilityGatepost = this.houseHoldDetails.expenses?.utilityExpenseInformation
    const updatedHousehold = {
      ...storedHouseHold,
      waterGatepostDetails: utilityDetails
    };

    // const updatedhouseholdUtilityDetails = {
    //     ...storedHouseHold,
    //     updatedHousehold
    // }

    this.service.updateHouseHoldDetails({
      ...storeHouseholdDetails,
      expenses: updatedHousehold,
    });

    this.route.navigate([this.routingStrategy.nextRoute()]);

  }



  showPreviousPage() {
    this.route.navigate([this.routingStrategy.previousRoute()]);
  }
}
