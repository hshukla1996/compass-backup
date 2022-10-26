import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IApplyNowState } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, IHouseHoldDetails } from '../../household/household-model';
import { ScreenQueueUtil } from '../income-gatepost/income-gatepost.path';


@Component({
    selector: "compass-ui-income-pastjobsummary",
    templateUrl: "./income-pastjobsummary.component.html",
    styleUrls: ["./income-pastjobsummary.component.scss"],
})
export class IncomePastJobSummaryComponent implements OnInit {

    applyNowState!: IApplyNowState;
    jsonData: any;
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    howOften: any;
    recordToBeOperated!: number;
    deletedUser!: any;


    modalData = {
        modalTitle: "Are you sure you want to remove this record?",
        modalContent:
            "If you remove this record you will need to re-enter the data to get it back.",
        cancelButton: "Cancel",
        continueButton: "Remove",
    };
    pastJobData: any = {
        questionText: "Review past jobs.",
        subHeading: "Review the entries below to make sure all past jobs of all household members are displayed.",
        toolTip: "Only jobs that ended in the past 30 days need to be added.",
        questionAnswers: [
            {
                accordionHeader: "{replace} Sample 65 (M)",
                accordionSubHeading: "",
                accordionRightHeading: "",
                accordionRightSubHeading: "",
                userId: 1,
                accordionData: [{}],
                editButton: "Edit",
                deleteButton: "Remove",
            },
        ],
        addtionalButton:"+ Add Another Job",
    };

    constructor(private router: Router,
        private service: ApplyNowStoreService,
        private queueService: ScreenQueueUtil,
        ) { }

    ngOnInit(): void {

        // this.service.getAppData().subscribe(d => {
        //     this.applyNowState = { ...d };
            this.houseHoldDetails = this.service.getHouseHoldDetails;
            if (this.houseHoldDetails.houseHoldPersons) {
                this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;

                let k = 0;
                this.houseHoldPersons.forEach((person, i) => {
                    person?.individualIncome?.pastEmployment?.forEach((employment: any,idx: number) => {
                        this.pastJobData['questionAnswers'][k] = {

                            accordionHeader: employment.name || 'Empty',
                            accordionSubHeading: person.firstName +
                                " " +
                                person.lastName +
                                " " +
                                Utility.getAge(person.dateOfBirth) +
                                " (" +
                                Utility.getGenderCode(person.gender as string) +
                                ")" || "",
                            userId: person.id || 0,
                            accordionRecord: idx,
                            accordionData: [
                                {
                                    'label': "Employer Name",
                                    'value': <string>employment?.name,
                                    "bold": false
                                },
                                {
                                    'label': "Employer Street Address",
                                    'value': <string>employment?.address?.addressLine1,
                                    "bold": false
                                },
                                {
                                    'label': "City",
                                    'value': <string>employment?.address?.city,
                                    "bold": false
                                },
                                {
                                    'label': "State",
                                    'value': <string>employment?.address?.state,
                                    "bold": false
                                },
                                {
                                    'label': "Zip",
                                    'value': <string>employment?.address?.zip,
                                    "bold": false
                                },
                                {
                                    'label': "Employer Phone Number",
                                    'value': <string>employment?.phoneNumber,
                                    "bold": false
                                },
                                {
                                    'label': "When did this job start?",
                                    'value': <string>employment?.startDate,
                                    "bold": false
                                },
                                {
                                    'label': "When did this job end",
                                    'value': <string>employment?.endDate,
                                    "bold": false
                                },
                                {
                                    'label': "How many hours did " + person?.firstName + " work each week?",
                                    'value': employment?.numberOfHoursWorkedPerWeek || 0,
                                    "bold": false
                                },
                                {
                                    'label': "What date did " + person?.firstName + " last receive a paycheck from this job?",
                                    'value': <string>employment?.mostRecentPayDate,
                                    "bold": false
                                }
                            ],
                            editButton: "Edit",
                            deleteButton: "Remove"
                        }
                        k++;
                    });
                });
                this.jsonData = this.pastJobData;
              
            }
            
        //});
    }

    recordIndexToOp(recordIndex: number) {
        this.recordToBeOperated = recordIndex;
    }
    deleteClicked(userId: any) {
        this.deletedUser = userId;
    }
    continueClicked() {
        const storedHouseholdDetails = this.houseHoldDetails;

        const updatedHouseholdPersons =
            this.houseHoldDetails.houseHoldPersons?.map(
                (person: IHouseHold) => {
                    const personToBeUpdated = { ...person };
                    const existingIndividualIncome = { ...personToBeUpdated.individualIncome };

                    if (
                        person.id?.toString() ===
                        this.deletedUser?.toString() &&
                        existingIndividualIncome.pastEmployment &&
                        existingIndividualIncome.pastEmployment.length > 0
                    ) {
                        const existingPastEmployment = [...existingIndividualIncome.pastEmployment];
                        existingPastEmployment.splice(this.recordToBeOperated, 1);
                        existingIndividualIncome.pastEmployment = existingPastEmployment;
                        return { ...personToBeUpdated, ...{ individualIncome: existingIndividualIncome } };
                    }

                    return personToBeUpdated;
                }
            );
        if (storedHouseholdDetails)
            this.service.updateHouseHoldDetails({
                ...storedHouseholdDetails,
                ...{ houseHoldPersons: updatedHouseholdPersons },
            });

        this.jsonData["questionAnswers"].forEach((element: any) => {
            if (element["accordionRecord"] === this.recordToBeOperated && element["userId"] === this.deletedUser) {
                element["accordionHeader"] = '';
            }
        });
    }

    addClicked() {
        this.router.navigate([
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_INCOME +
            "/" +
            RoutePath.APPLYNOW_INCOME_PASTJOB,
        ], { fragment: "new" });
    }

    editClicked(editDetails: any) {

        this.router.navigate([
            RoutePath.APPLYNOW
            + "/" + RoutePath.APPLYNOW_INCOME
            + "/" + RoutePath.APPLYNOW_INCOME_PASTJOBDETAILS,
            { userId: editDetails },
        ],
            { fragment: this.recordToBeOperated?.toString() }
        );
    }

    back(): void {
        this.queueService.back();
    }

    next(): void {
        this.queueService.next();
    }

}
