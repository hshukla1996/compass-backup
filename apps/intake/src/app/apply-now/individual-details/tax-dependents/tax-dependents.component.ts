import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IApplyNowState, ITaxDependentsData } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowIndividualDetailsTaxDependentsStrategy } from '../../../shared/route-strategies/apply-now/individual-details-tax-dependents';
import { UtilService } from '../../../shared/services/util.service';
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, PageDirection } from '../../household/household-model';
import { ScreenQueueUtil } from '../individuals-gatepost/individuals-gatepost.paths';

@Component({
  selector: 'compass-ui-tax-dependents',
  templateUrl: './tax-dependents.component.html',
  styleUrls: ['./tax-dependents.component.scss'],
  providers: [ApplyNowIndividualDetailsTaxDependentsStrategy]
})
export class TaxDependentsComponent implements OnInit {

  applyNowState: IApplyNowState | undefined;

  public selectedUserids: string[] = [];

  private eventsSubscription: Subscription | undefined;

  private houseHoldHeadPersons: IHouseHold[] = [];

  private householdMembers: IHouseHold[] = [];

  private taxDependentMap: any = {};

  public taxDependentJsonData = {
    "questionText": "You told us someone is being claimed as tax dependent. Tell us who",
    "subHeading": "Select all that apply.",
    "toolTip": "A dependent can be claimed by only one tax filer. For joint filers, list only one filer that will claim the dependent. ",
    "isRequired": true,
    "requiredText": "You must select an option.",
    "questionAnswers": [{
      "id": 1,
      "label": "Test",
      "isChecked": false
    }]
  };

  constructor(private _formBuilder: FormBuilder,
    private service: ApplyNowStoreService,
    private router: Router,
    private routingStratagy: ApplyNowIndividualDetailsTaxDependentsStrategy,
    private utilService: UtilService,
    private queueService: ScreenQueueUtil) {
  }

  ngOnInit(): void {
    const getData$ = this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.houseHoldHeadPersons = this.applyNowState.houseHoldDetails.houseHoldPersons as IHouseHold[];
      this.taxDependentJsonData.questionAnswers = [];
      // TODO:- this will be uncommnedt in next sprint
      // this.householdMembers = this.houseHoldHeadPersons.filter((person) => {
      //   return !person.filingStatus || person.filingStatus === 'N';
      // });

      // const filteredHousePerson: IHouseHold[] = [];
      // const leftOutMembers = (this.applyNowState?.houseHoldDetails.houseHoldPersons as IHouseHold[]).filter((x) => {
      //   return this.householdMembers.find(y => y.id === x.id) == null
      // });

      // let isFound = false;
      // this.householdMembers.forEach((x) => {
      //   isFound = false;
      //   if (leftOutMembers && leftOutMembers.length > 0) {          
      //     leftOutMembers.forEach(otherPerson => {
      //       if (!isFound) {
      //         if (!otherPerson.claimTaxDependentPersons || otherPerson.claimTaxDependentPersons.indexOf(x.id as number) === -1) {
      //           if (!filteredHousePerson.find(fh => fh.id === x.id)) {
      //             const test = this.householdMembers.filter(z => z.claimTaxDependentPersons?.indexOf(x.id as number) as number > -1);
      //             if (test && test.length === 0) {
      //               filteredHousePerson.push(x);
      //             }
      //           }
      //         }
      //         else {
      //           isFound = true;
      //         }
      //       }
      //     });
      //   }
      //   else {
      //     const otherPersons = this.householdMembers.filter(y => y.id !== x.id);
      //     otherPersons.forEach(otherPerson => {
      //       if (!isFound) {
      //         if (!otherPerson.claimTaxDependentPersons || otherPerson.claimTaxDependentPersons.indexOf(x.id as number) === -1) {
      //           if (!filteredHousePerson.find(fh => fh.id === x.id)) {
      //             filteredHousePerson.push(x);
      //           }
      //         }
      //         else {
      //           isFound = true;
      //         }
      //       }
      //     });
      //   }
      // });

      // if (filteredHousePerson.length > 0) {
      //   this.householdMembers = filteredHousePerson;
      // }

      this.householdMembers = this.houseHoldHeadPersons;

      // this.householdMembers = this.householdMembers.filter((x) => {
      //   const otherHouseHoldMembers = this.houseHoldHeadPersons.filter(y => y.id !== x.id);
      //   const isClaimedAsTaxDependent = otherHouseHoldMembers.filter(function (z) {          
      //     if (z && z.claimTaxDependentPersons) {            
      //       return (z.claimTaxDependentPersons).indexOf(x.id as number) > -1
      //     }
      //     return false;
      //   });
      //   if (!isClaimedAsTaxDependent || isClaimedAsTaxDependent.length === 0) {
      //     return true;
      //   }
      //   return false;
      // });

      this.householdMembers.forEach((person) => {
        if (person.isTaxDependent) {
          this.selectedUserids.push(person.id as unknown as string);
        }
      });

      this.householdMembers.forEach((person) => {
        this.taxDependentJsonData.questionAnswers.push({
          id: person.id as unknown as number,
          isChecked: this.selectedUserids && this.selectedUserids.length > 0 ? this.selectedUserids.findIndex(x => +x === person.id) > -1 : false,
          label: Utility.getLabelText(person)
        });
      });
    });

    this.eventsSubscription?.add(getData$);
  }

  public showNextPage(selectedUserids: any) {
    if (this.applyNowState && this.applyNowState.houseHoldDetails && this.applyNowState.houseHoldDetails.houseHoldPersons) {
      const storedHouseholdDetails = this.applyNowState.houseHoldDetails;
      const clonedUpdatedPerson: IHouseHold[] = [];
      this.applyNowState.houseHoldDetails.houseHoldPersons.forEach((person: IHouseHold) => {
        const clonedPerson = { ...person };
        if (selectedUserids.indexOf(person.id as number) > -1) {
          clonedPerson.isTaxDependent = true;
        }
        else {
          clonedPerson.isTaxDependent = false;
        }

        clonedUpdatedPerson.push(clonedPerson);
      });

      if (selectedUserids.length > 0) {
        this.utilService.sortNames(selectedUserids, this.householdMembers, 'id').forEach((ind) => {
          if (ind) {
            this.taxDependentMap[ind] = false;
          }
        });

        const updatedPageAction = {
          taxDependentMap: this.taxDependentMap,
          serviceDirection: PageDirection.NEXT
        };

        if (storedHouseholdDetails) {
          this.service.updateHouseHoldDetails(
            { ...storedHouseholdDetails, ...{ houseHoldPersons: clonedUpdatedPerson }, ...{ pageAction: updatedPageAction } }
          )
        }

        this.router.navigate([this.routingStratagy.nextRoute()]);
      }
    }
  }

  public showPreviousPage() {
    this.queueService.back();
  }


  ngOnDestroy(): void {
    this.eventsSubscription?.unsubscribe();
  }
}