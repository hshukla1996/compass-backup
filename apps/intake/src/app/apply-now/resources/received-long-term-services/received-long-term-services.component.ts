import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IApplyNowState } from '../../+state/apply-now.models';
import { ApplyNowResourcesReceivedLongTermServicesStrategy } from '../../../shared/route-strategies/apply-now/received-long-term-services';
import { UtilService } from '../../../shared/services/util.service';
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, PageDirection } from '../../household/household-model';
import { ScreenQueueUtil } from '../resources-gatepost/resources-gatepost.path';

@Component({
    selector: 'compass-ui-received-long-term-services',
    templateUrl: './received-long-term-services.component.html',
    styleUrls: ['./received-long-term-services.component.scss'],
    providers: [ApplyNowResourcesReceivedLongTermServicesStrategy]
})
export class ReceivedLongTermServicesComponent implements OnInit {

    applyNowState: IApplyNowState | undefined;

    public selectedUserids: string[] = [];

    private houseHoldHeadPersons: IHouseHold[] = [];

    private householdMembers: IHouseHold[] = [];

    private receivedLongTermServicesMap: any = {};

    public receivedLongTermServicesData = {
        "questionText": "You told us someone received Long-Term Living Services in a Nursing Home or Related Facility and/or through Home and Community-Based Supports and services. Tell us who. ",
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

    constructor(
        private service: ApplyNowStoreService,
        private router: Router,
        private routingStratagy: ApplyNowResourcesReceivedLongTermServicesStrategy,
        private utilService: UtilService,
        private screenQueueUtil: ScreenQueueUtil) {
    }

    ngOnInit(): void {
        this.houseHoldHeadPersons = this.service.getHouseHoldDetails.houseHoldPersons as IHouseHold[];
        this.receivedLongTermServicesData.questionAnswers = [];
        this.householdMembers = this.houseHoldHeadPersons;
        this.houseHoldHeadPersons.forEach((person) => {
            if (person.isReceivedLongTermService && person.isReceivedLongTermService === 'Y') {
                this.selectedUserids.push(person.id as unknown as string);
            }
        });

        this.householdMembers.forEach((person) => {
            this.receivedLongTermServicesData.questionAnswers.push({
                id: person.id as unknown as number,
                isChecked: this.selectedUserids && this.selectedUserids.length > 0 ?
                    this.selectedUserids.findIndex(x => +x === person.id) > -1 : false,
                label: Utility.getLabelText(person)
            });
        });
    }

    public showNextPage(selectedUserids: any) {
        if (this.service.getHouseHoldDetails && this.service.getHouseHoldDetails.houseHoldPersons) {
            const storedHouseholdDetails = this.service.getHouseHoldDetails;
            const clonedUpdatedPerson: IHouseHold[] = [];
            this.service.getHouseHoldDetails.houseHoldPersons.forEach((person: IHouseHold) => {
                const clonedPerson = { ...person };
                if (selectedUserids.indexOf(person.id as number) > -1) {
                    clonedPerson.isReceivedLongTermService = 'Y';
                }
                else {
                    clonedPerson.isReceivedLongTermService = 'N';
                }

                clonedUpdatedPerson.push(clonedPerson);
            });

            this.utilService.sortNames(selectedUserids, this.householdMembers, 'id').forEach((ind) => {
                if (ind) {
                    this.receivedLongTermServicesMap[ind] = false;
                }
            })

            const updatedPageAction = {
                receivedLongTermServicesMap: this.receivedLongTermServicesMap,
                serviceDirection: PageDirection.NEXT
            };

            if (storedHouseholdDetails) {
                this.service.updateHouseHoldDetails(
                    { ...storedHouseholdDetails, ...{ houseHoldPersons: clonedUpdatedPerson, pageAction: updatedPageAction } }
                )
            }
            this.router.navigate([this.routingStratagy.nextRoute()]);
        }
    }

    public showPreviousPage() {
        this.screenQueueUtil.back();
    }
}
