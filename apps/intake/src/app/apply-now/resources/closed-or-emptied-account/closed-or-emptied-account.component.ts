import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IApplyNowState } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowResourcesClosedOrEmptiedAccountStrategy } from '../../../shared/route-strategies/apply-now/closed-or-emptied-account';
import { UtilService } from '../../../shared/services/util.service';
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, IHouseHoldDetails, PageDirection } from '../../household/household-model';

@Component({
  selector: 'compass-ui-closed-or-emptied-account',
  templateUrl: './closed-or-emptied-account.component.html',
  styleUrls: ['./closed-or-emptied-account.component.scss'],
  providers: [ApplyNowResourcesClosedOrEmptiedAccountStrategy]
})
export class ClosedOrEmptiedAccountComponent implements OnInit {

  applyNowState: IApplyNowState | undefined;
  public selectedUserids: string[] = [];
  houseHoldDetails!: IHouseHoldDetails;
  houseHoldPersons: IHouseHold[] = [];
  fragment = "0";

  public closedOrEmptiedAccountData = {
    "questionText": "Tell us who closed or emptied an account to pay for nursing services.",
    "subHeading": "Select all that apply.",
    "toolTip": "",
    "isRequired": true,
    "requiredText": "You must select an option.",
    "questionAnswers": [{
      "id": 1,
      "label": "Test",
      "isChecked": false
    }]
  };

  public textboxValidators = [Validators.maxLength(26), Validators.pattern('^[a-zA-Z]*$')];
  public ownerName: string = '';

  constructor(
    private service: ApplyNowStoreService,
    private router: Router,
    private routingStratagy: ApplyNowResourcesClosedOrEmptiedAccountStrategy,
    private utilService: UtilService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.service.getAppData().subscribe(d => {
      this.houseHoldDetails = this.service.getHouseHoldDetails;
      if (this.houseHoldDetails.houseHoldPersons) {
        this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
      }
    });

    this.activatedRoute.fragment.subscribe((fragment) => {
      const resourcesCnt = this.houseHoldDetails.resources?.anyoneHaveClosedDetails?.accountDetails?.length || 0
      this.fragment = fragment || (resourcesCnt > 0 ? (resourcesCnt - 1).toString() : "");
      if (this.fragment !== "" && this.fragment !== null) {
        if (this.houseHoldDetails.resources?.anyoneHaveClosedDetails?.accountDetails) {
          this.houseHoldDetails.resources?.anyoneHaveClosedDetails?.accountDetails[+this.fragment].owner?.forEach((per) => {
            this.selectedUserids.push(per as unknown as string);
          });

          this.ownerName = this.houseHoldDetails.resources?.anyoneHaveClosedDetails?.accountDetails[+this.fragment].ownerName as string;
          this.setFormValues();
        }
        else {
          this.setFormValues();
        }
      }
    });
  }

  private setFormValues() {
    this.closedOrEmptiedAccountData.questionAnswers = [];
    this.houseHoldPersons.forEach((person) => {
      this.closedOrEmptiedAccountData.questionAnswers.push({
        id: person.id as unknown as number,
        isChecked: this.selectedUserids && this.selectedUserids.length > 0 ? this.selectedUserids.findIndex(x => +x === person.id) > -1 : false,
        label: Utility.getLabelText(person)
      })
    });
  }

  public showNextPage(event: any) {
    const existingHouseHoldDetails = this.houseHoldDetails;
    const resources = { ...existingHouseHoldDetails.resources };
    const anyoneHaveClosedDetails = { ...resources.anyoneHaveClosedDetails };

    if (anyoneHaveClosedDetails.accountDetails && anyoneHaveClosedDetails.accountDetails.length > 0) {
      const accountDetails = [...anyoneHaveClosedDetails.accountDetails];
      let recentAddedResource = { ...accountDetails[Number(this.fragment)] };

      recentAddedResource.owner = event.selectedUserId;
      accountDetails[Number(this.fragment)] = recentAddedResource;

      const updatedAccountDetails = [...accountDetails]
      const updatedAccount = { ...anyoneHaveClosedDetails, ...{ accountDetails: [...updatedAccountDetails] } };
      const updatedResources = { ...resources, ...{ anyoneHaveClosedDetails: updatedAccount } }

      if (existingHouseHoldDetails)
        this.service.updateHouseHoldDetails({
          ...existingHouseHoldDetails,
          ...{ resources: updatedResources },
        });
    }

    this.router.navigate([RoutePath.APPLYNOW +
      '/' + RoutePath.APPLYNOW_RESOURCES +
      '/' + RoutePath.APPLYNOW_RESOURCES_CLOSEDOREMPTIEDACCOUNTSUMMARY]);
  }

  public showPreviousPage() {
    this.router.navigate([this.routingStratagy.previousRoute()], { fragment: this.fragment });
  }
}
