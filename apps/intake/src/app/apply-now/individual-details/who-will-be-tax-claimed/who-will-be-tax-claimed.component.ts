import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CwSimpleTileCheckbox } from 'libs/ui/src/lib/templates/cw-simpletile-checkbox/cw-simpletile-checkbox.component';
import { Subscription } from 'rxjs';
import { IApplyNowState } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowIndividualDetailsWhoWillBeTaxClaimedStrategy } from '../../../shared/route-strategies/apply-now/individual-details-who-will-be-tax-claimed';
import { UtilService } from '../../../shared/services/util.service';
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, PageDirection } from '../../household/household-model';

@Component({
  selector: 'compass-ui-filing-jointly',
  templateUrl: './who-will-be-tax-claimed.component.html',
  styleUrls: ['./who-will-be-tax-claimed.component.scss'],
  providers: [ApplyNowIndividualDetailsWhoWillBeTaxClaimedStrategy]
})
export class WhoWillBeTaxClaimedComponent implements OnInit {

  applyNowState: IApplyNowState | undefined;

  private eventsSubscription: Subscription | undefined;

  private houseHoldHeadPersons: IHouseHold[] = [];

  @ViewChild('checkboxComponent') checkboxComponent!: CwSimpleTileCheckbox;

  public whoWillTaxClaimJsonData = {
    "questionText": "Who is planning on filing a federal income tax return?",
    "subHeading": "Select all that apply.",
    "toolTip": "You cannot select a person who you have already selected as a tax dependent of someone else on the application. A person can be claimed by only one tax filer. For joint filers, you only need to select dependents for the person signing the tax form.",
    "isRequired": false,
    "requiredText": "Please select at least one",
    "questionAnswers": [{
      "id": 1,
      "label": "",
      "isChecked": false
    }]
  };

  private HouseHoldHeadNameObject?: IHouseHold;
  private HouseHoldHeadSpouseObject!: IHouseHold;
  private whoWillBeTaxClaimedMap: any = {};
  private claimTaxDependentMap: any = {};
  private federalTaxReturnMap: any = {};
  private currentUserIndex!: any;
  public currentUser: IHouseHold = {};
  public selectedUserids: number[] = [];

  constructor(
    private service: ApplyNowStoreService,
    private router: Router,
    private routingStratagy: ApplyNowIndividualDetailsWhoWillBeTaxClaimedStrategy,
    private utilService: UtilService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.HouseHoldHeadNameObject = undefined;
    const activatedRoute$ = this.activatedRoute.params.
      subscribe((p) => {
        const getData$ = this.service.getAppData().subscribe(d => {
          this.applyNowState = { ...d };
          this.whoWillBeTaxClaimedMap = { ...this.applyNowState.houseHoldDetails.pageAction?.whoWillBeTaxClaimedMap } || {};
          this.federalTaxReturnMap = { ...this.applyNowState.houseHoldDetails.pageAction?.federalTaxReturnMap } || {};
          this.claimTaxDependentMap = { ...this.applyNowState.houseHoldDetails.pageAction?.claimTaxDependentMap } || {};

          if (Object.keys(p).length === 0) {
            if (this.utilService.isFirstRoute(this.whoWillBeTaxClaimedMap)) {
              this.currentUserIndex = Object.keys(this.whoWillBeTaxClaimedMap)[0]
            }
            else if (this.utilService.isLastRoute(this.whoWillBeTaxClaimedMap)) {
              this.currentUserIndex = Object.keys(this.whoWillBeTaxClaimedMap)[Object.keys(this.whoWillBeTaxClaimedMap).length - 1];
            }
          }
          else {
            this.currentUserIndex = p.userId || "";
          }

          this.houseHoldHeadPersons = (this.applyNowState.houseHoldDetails.houseHoldPersons as IHouseHold[]).filter((person) => {
            return person.id !== +this.currentUserIndex;
          });

          this.currentUser = this.extractUser(this.applyNowState.houseHoldDetails.houseHoldPersons as IHouseHold[], this.currentUserIndex) || "";

          const isHusband = this.currentUser.memberRelationships?.filter(x => x.relationshipType === 'H');
          const isWife = this.currentUser.memberRelationships?.filter(x => x.relationshipType === 'W');

          let lookUpId: number = 0;
          lookUpId = isHusband && isHusband.length > 0 ? isHusband[0].individualLookupId : 0;
          lookUpId = isWife && isWife.length > 0 ? isWife[0].individualLookupId : lookUpId;

          this.houseHoldHeadPersons = this.houseHoldHeadPersons.filter(x => x.id !== +lookUpId);

          let husbandWifePair: any[] = [];
          this.houseHoldHeadPersons.forEach(person => {
            if (person.memberRelationships && person.memberRelationships.length > 0) {
              const isHusband = person.memberRelationships.filter(x => x.relationshipType === 'H');
              const isWife = person.memberRelationships.filter(x => x.relationshipType === 'W');
              if (isHusband && isHusband.length > 0) {
                husbandWifePair.push({ 'Husband': person.id, 'Wife': +isHusband[0].individualLookupId });
              }

              if (isWife && isWife.length > 0 && husbandWifePair) {
                if (!husbandWifePair.find(x => x.Husband === +isWife[0].individualLookupId)) {
                  husbandWifePair.push({ 'Husband': +isWife[0].individualLookupId, 'Wife': person.id });
                }
              }
            }
          });

          const IgnoreMemberId: any[] = [];
          if (husbandWifePair && husbandWifePair.length > 0) {
            husbandWifePair.forEach(pair => {
              const details = (this.applyNowState?.houseHoldDetails.houseHoldPersons as IHouseHold[]).find(x => x.id === pair.Husband);;
              if (details?.filingStatus && details.filingStatus === 'Y') {
                IgnoreMemberId.push(pair.Husband);
                IgnoreMemberId.push(pair.Wife);
              }
            })
          }

          this.houseHoldHeadPersons = this.houseHoldHeadPersons.filter(x => {
            return IgnoreMemberId.indexOf(x.id) === -1
          });

          const filteredHousePerson: IHouseHold[] = [];
          const leftOutMembers = (this.applyNowState?.houseHoldDetails.houseHoldPersons as IHouseHold[]).filter((x) => {
            return this.houseHoldHeadPersons.find(y => y.id === x.id) == null
          })

          let isFound = false;
          this.houseHoldHeadPersons.forEach((x) => {
            isFound = false;
            const otherPersons = leftOutMembers.filter(y => y.id !== x.id && (!x.isFederalTaxReturn || x.isFederalTaxReturn === 'N'));
            otherPersons.forEach(otherPerson => {
              if (!isFound) {
                if (!otherPerson.claimTaxDependentPersons || otherPerson.claimTaxDependentPersons.indexOf(x.id as number) === -1) {
                  if (!filteredHousePerson.find(fh => fh.id === x.id)) {
                    filteredHousePerson.push(x);
                  }
                }
                else {
                  isFound = true;
                }
              }
            });
          });

          this.houseHoldHeadPersons = filteredHousePerson;
          this.selectedUserids = [];
          (this.applyNowState.houseHoldDetails.houseHoldPersons as IHouseHold[]).forEach((person) => {
            if (person.id === + this.currentUserIndex && person.claimTaxDependentPersons) {
              person.claimTaxDependentPersons.forEach((id) => {
                this.selectedUserids.push(+id);
              });
            }
          });

          if (Object.keys(p).length !== 0 && this.checkboxComponent) {
            this.checkboxComponent.resetSelectedUserId(this.selectedUserids);
          }

          this.HouseHoldHeadNameObject = (this.applyNowState.houseHoldDetails.houseHoldPersons as IHouseHold[]).find(x => x.id === +this.currentUserIndex);
          
          if (this.currentUser.filingStatus?.toUpperCase() === "Y") {
            const spouseDetails = (this.applyNowState.houseHoldDetails.houseHoldPersons as IHouseHold[]).find(x => x.id === lookUpId);      
            this.whoWillTaxClaimJsonData.questionText = `Who will ${this.currentUser.firstName} and ${spouseDetails?.firstName}  claim anyone as a tax dependent ?`
          }
          else {
            this.whoWillTaxClaimJsonData.questionText = `Who will ${this.currentUser.firstName} claim anyone as a tax dependent ?`
          }
                        
          this.whoWillTaxClaimJsonData.questionAnswers = [];
          this.houseHoldHeadPersons.forEach((person) => {
            this.whoWillTaxClaimJsonData.questionAnswers.push({
              id: person.id as unknown as number,
              isChecked: this.selectedUserids && this.selectedUserids.length > 0 ? this.selectedUserids.findIndex(x => +x === person.id) > -1 : false,
              label: `${person.firstName as string} ${person.lastName as string} ${Utility.getAge(person.dateOfBirth)} 
          `
            })
          });
        });
        this.eventsSubscription?.add(getData$);
      });

    this.eventsSubscription?.add(activatedRoute$);
  }

  /**
   * 
   * @param persons This will extract the user
   * @param userId 
   * @returns 
   */
  private extractUser(persons: any, userId: any) {
    console.log(persons);
    console.log(userId);
    const currentUser = persons.filter((person: IHouseHold) => {
      return userId ? person.id?.toString() === userId.toString() : false;
    })[0];
    return currentUser;
  }

  public showNextPage(selectedUserids: any) {
    let lookUpId: number = 0;
    const originalData = [...this.houseHoldHeadPersons ];
    if (this.applyNowState && this.applyNowState.houseHoldDetails && this.applyNowState.houseHoldDetails.houseHoldPersons) {
      const storedHouseholdDetails = this.applyNowState.houseHoldDetails;
      const clonedUpdatedPerson: IHouseHold[] = [];
      this.applyNowState.houseHoldDetails.houseHoldPersons.forEach((person: IHouseHold) => {
        const clonedPerson = { ...person };
        if (person.id === +this.currentUserIndex) {
          clonedPerson.claimTaxDependentPersons = [];
          (selectedUserids as []).forEach((userId) => {
            (clonedPerson.claimTaxDependentPersons as []).push(userId);
          });
        }
        clonedUpdatedPerson.push(clonedPerson);
      });

      const currentUserDetails = clonedUpdatedPerson.find(x => x.id === +this.currentUserIndex) as IHouseHold;
      const isHusband = currentUserDetails.memberRelationships?.filter(x => x.relationshipType === 'H');
      if (isHusband && isHusband.length > 0) {
        const WifeDEtails = clonedUpdatedPerson.find(x => x.id === isHusband[0].individualLookupId);
        if (WifeDEtails?.isFederalTaxReturn && WifeDEtails?.isFederalTaxReturn === 'Y' && WifeDEtails.filingStatus === 'Y') {
          WifeDEtails.claimAsTaxDependent = "Yes";
          WifeDEtails.claimTaxDependentPersons = currentUserDetails.claimTaxDependentPersons;
        }
      }

      const isWife = currentUserDetails.memberRelationships?.filter(x => x.relationshipType === 'W');
      if (isWife && isWife.length > 0) {
        const husbandDetails = clonedUpdatedPerson.find(x => x.id === isWife[0].individualLookupId);
        if (husbandDetails?.isFederalTaxReturn && husbandDetails?.isFederalTaxReturn === 'Y' && husbandDetails?.filingStatus === 'Y') {
          husbandDetails.claimAsTaxDependent = "Yes";
          husbandDetails.claimTaxDependentPersons = currentUserDetails.claimTaxDependentPersons;
        }
      }

      let isNextPage = false;
      this.whoWillBeTaxClaimedMap[this.currentUserIndex] = true;

      const updatedPageAction = {
        federalTaxReturnMap: { ...storedHouseholdDetails.pageAction?.federalTaxReturnMap },
        claimTaxDependentMap: { ...storedHouseholdDetails.pageAction?.claimTaxDependentMap },
        whoWillBeTaxClaimedMap: { ...storedHouseholdDetails.pageAction?.whoWillBeTaxClaimedMap, ...this.whoWillBeTaxClaimedMap },
        serviceDirection: PageDirection.NEXT
      };

      if (storedHouseholdDetails) {
        this.service.updateHouseHoldDetails(
          { ...storedHouseholdDetails, ...{ houseHoldPersons: clonedUpdatedPerson }, ...{ pageAction: updatedPageAction } }
        )
      }

      if (originalData.length === (selectedUserids as []).length) {
        this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALINCOMETAXRETURNSUMMARY]);
      }
      else {
        if (this.whoWillBeTaxClaimedMap != null) {
          isNextPage = this.utilService.isNextPage(this.whoWillBeTaxClaimedMap);
        }

        this.utilService.seelctedUserIdInFederalTaxReturn.every((x) => {

        });

        let currentUserIndexInFederaltaxReturn = this.utilService.seelctedUserIdInFederalTaxReturn.indexOf(+this.currentUserIndex);

        while (currentUserIndexInFederaltaxReturn <= this.utilService.seelctedUserIdInFederalTaxReturn.length - 1) {
          currentUserIndexInFederaltaxReturn = currentUserIndexInFederaltaxReturn + 1;
          const nextUserId = this.utilService.seelctedUserIdInFederalTaxReturn[currentUserIndexInFederaltaxReturn];

          const isWorkFlowFilingJointly = Object.keys(this.federalTaxReturnMap).filter(x => +x === nextUserId).length > 0;
          const isWorkFlowClaimDependent = Object.keys(this.claimTaxDependentMap).filter(x => +x === nextUserId).length > 0;

          if (!nextUserId) {
            this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALINCOMETAXRETURNSUMMARY]);
            break;
          }

          if (isWorkFlowFilingJointly || isWorkFlowClaimDependent) {
            if (isWorkFlowFilingJointly) {
              this.utilService
                .getCurrentUserIdPageAction(this.federalTaxReturnMap, PageDirection.NEXT)
                .subscribe((id: any) => {
                  this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FilingStatus, { userId: id }]);
                });
            }
            else if (isWorkFlowClaimDependent) {
              this.utilService
                .getCurrentUserIdPageAction(this.claimTaxDependentMap, PageDirection.NEXT)
                .subscribe((id: any) => {
                  this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_CLAIMTAXDEPENDENT, { userId: id }]);
                });
            }
            else {
              this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALINCOMETAXRETURNSUMMARY]);
            }

            break;
          }
          else {
            continue;
          }
        }
      }
    }
  }

  /**
   * Is Filling Jointly Method
   * @param data 
   */
  public isFillingJointly(data: string): void {
    if (this.HouseHoldHeadNameObject && this.HouseHoldHeadNameObject.isFederalTaxReturn) {
      this.HouseHoldHeadNameObject = { ...this.HouseHoldHeadNameObject, ...{ filingStatus: data } };
    }
    else {
      this.HouseHoldHeadSpouseObject = { ...this.HouseHoldHeadSpouseObject, ...{ filingStatus: data } };
    }
  }

  public showPreviousPage() {
    if (this.applyNowState) {
      this.whoWillBeTaxClaimedMap[this.currentUserIndex] = false;
      const storeHouseholdDetails = this.applyNowState.houseHoldDetails;
      const updatedPageAction = {
        federalTaxReturnMap: { ...storeHouseholdDetails.pageAction?.federalTaxReturnMap },
        claimTaxDependentMap: { ...storeHouseholdDetails.pageAction?.claimTaxDependentMap },
        whoWillBeTaxClaimedMap: { ...storeHouseholdDetails.pageAction?.whoWillBeTaxClaimedMap, ...this.whoWillBeTaxClaimedMap },
        serviceDirection: PageDirection.NEXT
      };

      this.service.updateHouseHoldDetails({ ...storeHouseholdDetails, ...{ pageAction: updatedPageAction } })

      this.router.navigate([this.routingStratagy.previousRoute(), { userId: this.currentUserIndex }]);

      return true;
    }
    else {
      return false;
    }
  }

  /**
   * This will take use to add Another House Hold Screen
   */
  public addAnotherHouseHoldPerson() {
    this.router.navigate([RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDANOTHERPERSON])
  }

  ngOnDestroy(): void {
    this.eventsSubscription?.unsubscribe();
  }
}
