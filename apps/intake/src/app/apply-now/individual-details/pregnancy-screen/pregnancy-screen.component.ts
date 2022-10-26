import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IApplyNowState } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowIndividualDetailsPregnancyScreenStrategy } from '../../../shared/route-strategies/apply-now/individual-details-pregnancy-screen';
import { UtilService } from '../../../shared/services/util.service';
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, PageDirection } from '../../household/household-model';
import { ScreenQueueUtil } from '../individuals-gatepost/individuals-gatepost.paths';

@Component({
    selector: 'compass-ui-pregnancy-screen',
    templateUrl: './pregnancy-screen.component.html',
    styleUrls: ['./pregnancy-screen.component.scss'],
    providers: [ApplyNowIndividualDetailsPregnancyScreenStrategy]
})
export class PregnancyScreenComponent implements OnInit {

    form!: FormGroup;
    applyNowState: IApplyNowState | undefined;
    public selectedUserids: string[] = [];
    private eventsSubscription: Subscription | undefined;
    private houseHoldHead!: IHouseHold;
    private houseHoldHeadPersons: IHouseHold[] = [];
    private pregnancyMap: any = {};
    private householdMembers: any[] = []
    pregnancyJsonData = {
        "questionText": "You told us someone is pregnant. Tell us who. ",
        "subHeading": "Select all that apply.",
        "toolTip": "",
        "isRequired": true,
        "requiredText": "You must select an option.",
        "questionAnswers": [{
            "id": 1,
            "label": "",
            "isChecked": false
        }]
    };

    constructor(
        private service: ApplyNowStoreService,
        private router: Router,
        private routingStratagy: ApplyNowIndividualDetailsPregnancyScreenStrategy,
        private utilService: UtilService,
        private queueService: ScreenQueueUtil) {
    }

    ngOnInit(): void {
        const getData$ = this.service.getAppData().subscribe(d => {

            this.applyNowState = { ...d };
            this.houseHoldHead = this.applyNowState.houseHoldDetails.householdHead;
            this.houseHoldHeadPersons = this.applyNowState.houseHoldDetails.houseHoldPersons as IHouseHold[];
            this.pregnancyJsonData.questionAnswers = [];
            this.householdMembers = this.houseHoldHeadPersons.filter((person) => {
                const age = Utility.getAge(person.dateOfBirth)
                if (person.gender && Utility.getGenderCode(person.gender) === 'F' && age >= 9 && age <= 60) {
                    return true;
                }
                else {
                    return false;
                }
            });

            this.houseHoldHeadPersons.forEach((person) => {
                if (person.isPregnant === 'Y') {
                    this.selectedUserids.push(person.id as unknown as string);
                }
            });

            this.householdMembers.forEach((person) => {
                this.pregnancyJsonData.questionAnswers.push({
                    id: person.id as unknown as number,
                    isChecked: this.selectedUserids && this.selectedUserids.length > 0 ? this.selectedUserids.findIndex(x => x === person.id) > -1 : false,
                    label:  Utility.getLabelText(person)
                })
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
                    clonedPerson.isPregnant = 'Y';
                }
                else {
                    clonedPerson.isPregnant = 'N';
                }

                clonedUpdatedPerson.push(clonedPerson);
            });

            this.utilService.sortNames(selectedUserids, this.householdMembers, 'id').forEach((ind) => {
                if (ind) {
                    this.pregnancyMap[ind] = false;
                }
            })

            const updatedPageAction = {
                pregnancyMap: this.pregnancyMap,
                serviceDirection: PageDirection.NEXT
            };

            if (storedHouseholdDetails) {
                this.service.updateHouseHoldDetails(
                    { ...storedHouseholdDetails, ...{ houseHoldPersons: clonedUpdatedPerson, pageAction: updatedPageAction } }
                )
            }

            if (selectedUserids.length > 0) {
                this.router.navigate([this.routingStratagy.nextRoute()]);
            }
            else {
                this.queueService.next();
                //this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALINCOMETAXRETURN]);
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
