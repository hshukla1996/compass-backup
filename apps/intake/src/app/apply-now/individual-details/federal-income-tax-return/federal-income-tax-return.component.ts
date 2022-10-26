import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IApplyNowState, IFederalIncomeTaxReturnData } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowIndividualDetailsFederalIncomeTaxReturnStrategy } from '../../../shared/route-strategies/apply-now/individual-details-federal-income-tax-return';
import { UtilService } from '../../../shared/services/util.service';
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, PageDirection } from '../../household/household-model';
import { ScreenQueueUtil } from '../individuals-gatepost/individuals-gatepost.paths';

@Component({
    selector: 'compass-ui-federal-income-tax-return',
    templateUrl: './federal-income-tax-return.component.html',
    styleUrls: ['./federal-income-tax-return.component.scss'],
    providers: [ApplyNowIndividualDetailsFederalIncomeTaxReturnStrategy]
})
export class FederalIncomeTaxReturnComponent implements OnInit {
    federalIncomeTaxReturn: IFederalIncomeTaxReturnData[] = [];

    public form!: FormGroup;

    @ViewChild('formEle') formEle: any;

    applyNowState: IApplyNowState | undefined;

    private formSubmitAttempt: boolean = false;

    public selectedUserids: string[] = [];

    private routePath: typeof RoutePath = RoutePath;

    private eventsSubscription: Subscription | undefined;

    private houseHoldHeadPersons: IHouseHold[] = [];

    private householdMembers: IHouseHold[] = [];

    private currentFederalTaxReturnMap: any = {};

    private currentClaimTaxDependentMap: any = {};

    public taxReturnJsonData = {
        "questionText": "You told us someone is planning to file a federal income tax return. Tell us who.",
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

    constructor(private _formBuilder: FormBuilder,
        private service: ApplyNowStoreService,
        private router: Router,
        private routingStratagy: ApplyNowIndividualDetailsFederalIncomeTaxReturnStrategy,
        private utilService: UtilService,
        private queueService: ScreenQueueUtil,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        const activatedRoute$ = this.activatedRoute.params.
            subscribe((p) => {
                const getData$ = this.service.getAppData().subscribe(d => {
                    this.applyNowState = { ...d };
                    this.houseHoldHeadPersons = this.applyNowState.houseHoldDetails.houseHoldPersons as IHouseHold[];
                    this.taxReturnJsonData.questionAnswers = [];
                    this.householdMembers = this.houseHoldHeadPersons;
                    // if (p.source !== "FederalSummary") {
                    //     this.householdMembers = this.houseHoldHeadPersons;
                    // }
                    // else {
                    //     this.householdMembers = this.houseHoldHeadPersons.filter(x => (!x.isFederalTaxReturn || x.isFederalTaxReturn === 'N'));
                    // }

                    this.houseHoldHeadPersons.forEach((person) => {
                        if (person.isFederalTaxReturn && person.isFederalTaxReturn === 'Y') {
                            this.selectedUserids.push(person.id as unknown as string);
                        }
                    });

                    this.householdMembers.forEach((person) => {
                        this.taxReturnJsonData.questionAnswers.push({
                            id: person.id as unknown as number,
                            isChecked: this.selectedUserids && this.selectedUserids.length > 0 ?
                                this.selectedUserids.findIndex(x => +x === person.id) > -1 : false,
                            label: Utility.getLabelText(person)
                        });
                    });
                });
                this.eventsSubscription?.add(getData$);
            });


        this.eventsSubscription?.add(activatedRoute$);
    }

    public showNextPage(selectedUserids: any) {
        this.utilService.seelctedUserIdInFederalTaxReturn.length = 0;
        let isSpouseInvolved = false;
        this.currentFederalTaxReturnMap = {};
        this.utilService.seelctedUserIdInFederalTaxReturn = [...selectedUserids];
        this.currentClaimTaxDependentMap = {};
        if (this.applyNowState && this.applyNowState.houseHoldDetails && this.applyNowState.houseHoldDetails.houseHoldPersons) {
            const storedHouseholdDetails = this.applyNowState.houseHoldDetails;
            const clonedUpdatedPerson = this.householdMembers.map((person: IHouseHold) => {
                const clonedPerson = { ...person };
                if (selectedUserids.indexOf(person.id as number) > -1) {
                    clonedPerson.isFederalTaxReturn = 'Y';
                }
                else {
                    clonedPerson.isFederalTaxReturn = 'N';
                    clonedPerson.filingStatus = '';
                    clonedPerson.claimAsTaxDependent = '';
                    clonedPerson.claimTaxDependentPersons = [];
                }

                return clonedPerson;
            });

            if (selectedUserids.length > 0) {
                this.utilService.sortNames(selectedUserids, this.householdMembers, 'id').forEach((ind) => {
                    if (ind) {
                        const memberDetails = this.householdMembers.find(x => x.id === +ind) as IHouseHold;
                        if (memberDetails) {
                            const memberHusbandRelationShip = memberDetails.memberRelationships?.filter(x => x.relationshipType === 'H');
                            const memberWifeRelationShip = memberDetails.memberRelationships?.filter(x => x.relationshipType === 'W');
                            if (memberHusbandRelationShip && memberHusbandRelationShip.length > 0) {
                                isSpouseInvolved = true;
                                const isWifeAvailableinLookUp = Object.keys(this.currentFederalTaxReturnMap).findIndex(x => +x === +memberHusbandRelationShip[0].individualLookupId);
                                if (isWifeAvailableinLookUp === -1) {
                                    this.currentFederalTaxReturnMap[ind] = false;
                                    this.currentClaimTaxDependentMap[ind] = false;
                                }
                            }
                            else if (memberWifeRelationShip && memberWifeRelationShip.length > 0) {
                                isSpouseInvolved = true;
                                const isHusbandAvailableinLookUp = Object.keys(this.currentFederalTaxReturnMap).findIndex(x => +x === +memberWifeRelationShip[0].individualLookupId);
                                if (isHusbandAvailableinLookUp === -1) {
                                    this.currentFederalTaxReturnMap[ind] = false;
                                    this.currentClaimTaxDependentMap[ind] = false;
                                }
                            }
                            else {
                                this.currentClaimTaxDependentMap[ind] = false;
                            }
                        }
                    }
                });

                const updatedPageAction = {
                    federalTaxReturnMap: this.currentFederalTaxReturnMap,
                    claimTaxDependentMap: this.currentClaimTaxDependentMap,
                    serviceDirection: PageDirection.NEXT
                };

                // Finally Updating the parent house Hold Person Details. This code will go in next update in PROD
                // const updatedParentList = this.applyNowState.houseHoldDetails.houseHoldPersons.map(x => {
                //     const cloned = { ...x };
                //     const isFound = clonedUpdatedPerson.find(y => y.id === x.id);
                //     if (isFound) {
                //         cloned.isFederalTaxReturn = isFound.isFederalTaxReturn;
                //     }
                //     return cloned;
                // });
                // TODO:- Need to work on Back Routing. Please confirm

                if (storedHouseholdDetails) {
                    this.service.updateHouseHoldDetails(
                        { ...storedHouseholdDetails, ...{ houseHoldPersons: clonedUpdatedPerson }, ...{ pageAction: updatedPageAction } }
                    )
                }

                if (isSpouseInvolved) {
                    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FilingStatus]);
                }
                else {
                    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_CLAIMTAXDEPENDENT]);
                }
            }
            else {
                this.router.navigate([this.routingStratagy.nextRoute()]);
            }
        }
    }

    public showPreviousPage() {
        this.queueService.back();
        // let isPregnancyDetailsEntered = false;
        // if (this.applyNowState && this.applyNowState.houseHoldDetails.houseHoldPersons) {
        //     this.applyNowState.houseHoldDetails.houseHoldPersons.forEach((person) => {
        //         if (person.isPregnantInformation) {
        //             isPregnancyDetailsEntered = true;
        //         }
        //     });
        // }

        // if (isPregnancyDetailsEntered) {
        //     this.router.navigate([this.routingStratagy.previousRoute()]);
        // }
        // else {
        //     this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_PREGNANCYSCREEN]);
        // }
    }


    ngOnDestroy(): void {
        this.eventsSubscription?.unsubscribe();
    }
}
