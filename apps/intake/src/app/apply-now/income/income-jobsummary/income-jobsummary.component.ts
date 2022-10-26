import { ChangeDetectorRef, Component, Directive, EventEmitter, OnInit, Output, } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { AppStoreService } from "../../../app-store-service";
//import { HouseholdFormDataService } from "../services/household-form-data.service";
import { IApplyNowState, IncomeJobs } from "../../+state/apply-now.models";
import { RoutePath } from "../../../shared/route-strategies";
import { IHouseHold, IHouseHoldDetails } from "../../household/household-model";
import { ScreenQueueUtil } from "../income-gatepost/income-gatepost.path";
import { Utility } from "../../../shared/utilities/Utility";


@Component({
    selector: "compass-ui-income-jobsummary",
    templateUrl: "./income-jobsummary.component.html",
    styleUrls: ["./income-jobsummary.component.scss"],
})

export class IncomeJobSummaryComponent implements OnInit {
    applyNowState!: IApplyNowState;
    jsonData: any;
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    howOften: any;
    recordToBeOperated!: number;
    deletedUser!: any;
    prepopulated: boolean = false;

    modalData = {
        modalTitle: "Are you sure you want to remove this record?",
        modalContent:
            "If you remove this record you will need to re-enter the data to get it back.",
        cancelButton: "Cancel",
        continueButton: "Remove",
    };

    currentEmploymentData = {
        "questionText": "Review current and upcoming jobs.",
        "subHeading": "Review the entries to make sure everything looks correct.",
        "toolTip": "Only upcoming jobs that are starting in the next 30 days need to be added.",
        "questionAnswers": [
            {
                "accordionHeader": "",
                "accordionSubHeading": "{replace} Sample 65 (M)",
                "accordionRightHeading": "",
                "accordionRightSubHeading": "",
                "accordionRecord": 1,
                "userId": 1,
                "accordionData": [{}],
                "editButton": "Edit",
                "deleteButton": "Delete"
            },
        ],
        "addtionalButton": "Add Another Job"
    }

    constructor(
        private router: Router,
        private cd: ChangeDetectorRef,
        private service: ApplyNowStoreService,
        private appService: AppStoreService,
        private queueService: ScreenQueueUtil
    ) { }

    ngOnInit(): void {
        this.appService.getPay().subscribe((pay) => {
            this.howOften = pay;
            this.cd.detectChanges();
        });

        this.service.getAppData().subscribe(d => {
            this.applyNowState = { ...d };
            this.houseHoldDetails = this.service.getHouseHoldDetails;
            if (this.houseHoldDetails.houseHoldPersons) {
                this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
                let k = 0;
                this.houseHoldPersons.forEach((person, i) => {
                    if (person.individualIncome?.currentEmployment && Object.keys(person.individualIncome?.currentEmployment).length > 0)
                        person.individualIncome?.currentEmployment?.forEach((currentEmployment: any, idx: number) => {

                            let address = currentEmployment.address;
                            this.currentEmploymentData['questionAnswers'][k] = {

                                accordionHeader: currentEmployment.name || '',
                                accordionSubHeading: person.firstName +
                                    " " +
                                    person.lastName +
                                    " " +
                                    Utility.getAge(person.dateOfBirth) +
                                    " (" +
                                    Utility.getGenderCode(person.gender as string) +
                                    ")" || "",
                                accordionRightHeading: "$" + currentEmployment.grossIncome,
                                accordionRightSubHeading: this.howOften.filter(
                                    (c: any) => c.id === currentEmployment.frequency
                                )[0]?.displayValue,
                                userId: person.id || 0,
                                accordionRecord: idx,
                                accordionData: [
                                    {
                                        'label': "Is this Self Employment?",
                                        'value': <string>currentEmployment.isSelfEmployment,
                                        "bold": false
                                    },
                                    {
                                        'label': "Employer Address",
                                        'value': address.addressLine1 + "\n" + (address.addressline2 ? address.addressline2 : "") + "\n" + address.city + "\n" + address.state + "\n" + address.zip,
                                        "bold": false
                                    },
                                    {
                                        'label': "Employer Phone",
                                        'value': <string>currentEmployment.phoneNumber,
                                        "bold": false
                                    },
                                    {
                                        'label': "What date did " + person.firstName + " start working at this job?",
                                        'value': <string>currentEmployment.startDate,
                                        "bold": false
                                    },
                                    {
                                        'label': "Is " + person.firstName + " on a strike for this job?",
                                        'value': <string>currentEmployment.onStrike,
                                        "bold": false
                                    },
                                    {
                                        'label': "How many hours does " + person.firstName + " work per week?",
                                        'value': <number>currentEmployment.numberOfHoursWorkedPerWeek,
                                        "bold": false
                                    },
                                    {
                                        'label': "What is" + person.firstName + " hourly pay rate?",
                                        'value': <number>currentEmployment.payRate,
                                        "bold": false
                                    },
                                    {
                                        'label': "What date did " + person.firstName + " last receive a paycheck for this job?",
                                        'value': <string>currentEmployment.mostRecentPayDate,
                                        "bold": false
                                    }
                                ],
                                editButton: "Edit",
                                deleteButton: "Remove"
                            }
                            k++;
                        });

                    this.jsonData = this.currentEmploymentData;
                });

            }
        });
    }

    recordIndexToOp(recordIndex: number) {
        this.recordToBeOperated = recordIndex;
    }

    deleteClicked(userId: any) {
        this.deletedUser = userId;
        if (this.prepopulated) {
            this.router.navigate([
                RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INCOME +
                "/" +
                RoutePath.APPLYNOW_INCOME_INCOMEJOBENDMODAL,
                { userId: userId },
            ], { fragment: this.recordToBeOperated.toString() });
        }
    }

    addClicked() {
        this.router.navigate([
            RoutePath.APPLYNOW
            + "/" + RoutePath.APPLYNOW_INCOME
            + "/" + RoutePath.APPLYNOW_INCOME_FUTUREJOB
        ], { fragment: "new" });
    }

    editClicked(userId: any) {

        this.router.navigate([
            RoutePath.APPLYNOW +
            "/" + RoutePath.APPLYNOW_INCOME +
            "/" + RoutePath.APPLYNOW_INCOME_JOBDETAILS,
            { userId: userId },
        ],
            { fragment: this.recordToBeOperated.toString() });
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
                        existingIndividualIncome.currentEmployment &&
                        existingIndividualIncome.currentEmployment.length > 0
                    ) {
                        const existingCurrentEmployment = [...existingIndividualIncome.currentEmployment];
                        existingCurrentEmployment.splice(this.recordToBeOperated, 1);
                        existingIndividualIncome.currentEmployment = existingCurrentEmployment;
                        this.jsonData["questionAnswers"].forEach((element: any) => {
                            if (element["accordionRecord"] === this.recordToBeOperated) {
                                element["accordionHeader"] = '';
                            }
                        });
                        return { ...personToBeUpdated, ...{ individualIncome: existingIndividualIncome } };
                    }
                    return personToBeUpdated;
                }
            );
        if (storedHouseholdDetails) {
            this.service.updateHouseHoldDetails({
                ...storedHouseholdDetails,
                ...{ houseHoldPersons: updatedHouseholdPersons },
            });
        }
    }

    back(): void {
        this.router.navigate([
            RoutePath.APPLYNOW
            + "/" + RoutePath.APPLYNOW_INCOME
            + "/" + RoutePath.APPLYNOW_INCOME_JOBMOREDETAILS
        ]);
    }

    next(): void {
        this.queueService.nextPath();
    }

}
