import { ChangeDetectorRef, Component } from "@angular/core";
import { RoutePath } from "../../../shared/route-strategies";
import { Router } from "@angular/router";
import { IApplyNowState } from "../../+state/apply-now.models";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { AppStoreService } from "../../../app-store-service";
import { ScreenQueueUtil } from "../individuals-gatepost/individuals-gatepost.paths";
import {IHouseHold, IHouseHoldDetails, ITrainingDetails} from "../../household/household-model";
import { Utility } from "../../../shared/utilities/Utility";
import { DateFormatConstants } from "../../../shared/constants/Constants";
@Component({
    selector: "ui-compass-training-summary",
    templateUrl: "./training-summary.component.html",
    styleUrls: ["./training-summary.component.css"],
})
export class TrainingSummaryComponent {
    jsonData: any;
    selectedData!: any[];
    isToBeDeleted = false;
    recordToBeOperated!: number;
    applyNowState!: IApplyNowState;
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    deletedUser: IHouseHold = {};
    modalData = {
        modalTitle: "Are you sure you want to remove this record?",
        modalContent:
            "If you remove this record you will need to re-enter the data to get it back.",
        cancelButton: "Cancel",
        continueButton: "Remove",
    };
    demographicData: any = {
        questionText: "Your training programs.",
        subHeading:
            "Look below to make sure all training or educational programs are here.",
        toolTip: "",
        questionAnswers: [{}],
        addtionalButton: "Add Training Program",
    };
    constructor(
        private router: Router,
        private service: ApplyNowStoreService,
        private queueService: ScreenQueueUtil,
        private appService: AppStoreService,
        private cd: ChangeDetectorRef
    ) {}
    ngOnInit(): void {
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        this.demographicData.questionAnswers = [];
        this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons || [];

        let k = 0;
        this.houseHoldPersons.forEach((ind, i) => {
            if (ind.trainingInformation?.trainings) {
                ind.trainingInformation?.trainings.forEach(
                    (training: ITrainingDetails, idx) => {
                        this.demographicData["questionAnswers"][k] = {
                            accordionHeader:
                                `${ind.firstName as string} ${
                                    ind.midName ? ind.midName : ("" as string)
                                } ${ind.lastName as string} ${Utility.getAge(
                                    ind.dateOfBirth
                                )} (${Utility.getGenderCode(
                                    ind.gender as string
                                )}) ` || "",
                            accordionSubHeading: training?.trainingInstitute,
                            accordionRightHeading: "",
                            accordionRightSubHeading: "",
                            userId: ind.id || 0,
                            accordionRecord: idx,

                            accordionData: [
                                {
                                    label: "Program Start Date:",
                                    value: <string>(
                                        Utility.getDateInFormat(
                                            new Date(
                                                training.trainingStartDate as string
                                            ),
                                            DateFormatConstants.MMDDYYYY
                                        )
                                    ),
                                    bold: false,
                                },
                                {
                                    label: `When does ${ind.firstName} expect to finish the program?`,
                                    value: <string>(
                                        Utility.getDateInFormat(
                                            new Date(
                                                training.trainingEndDate as string
                                            ),
                                            DateFormatConstants.MMDDYYYY
                                        )
                                    ),
                                    bold: false,
                                },
                                {
                                    label: `How many hours per week does ${ind.firstName} spend in the program?`,
                                    value: <string>(
                                        training.estimatedHoursPerWeekCount
                                    ),
                                    bold: false,
                                },
                            ],
                            editButton: "Edit",
                            deleteButton: "Delete",
                        };
                        this.demographicData["questionAnswers"][
                            k
                        ].accordionData.forEach((element: any) => {
                            element["label"] =
                                element["value"] === "" ||
                                element["value"] === undefined
                                    ? ""
                                    : element["label"];
                        });
                        this.jsonData = this.demographicData;
                        k++;
                    }
                );
                this.cd.detectChanges();
            }
        });
    }
    recordIndexToOp(recordIndex: number) {
        this.recordToBeOperated = recordIndex;
    }
    continueClicked() {
        const storedHouseholdDetails = this.houseHoldDetails;
        const updatedHouseholdPersons =
            this.houseHoldDetails.houseHoldPersons?.map(
                (person: IHouseHold) => {
                    const personToBeUpdated = { ...person };
                    if (
                        person.id?.toString() ===
                            this.deletedUser.id?.toString() &&
                        personToBeUpdated.trainingInformation
                    ) {
                        personToBeUpdated.trainingInformation = {
                            isAttendingTraining: "Y",
                            trainings:
                                personToBeUpdated.trainingInformation?.trainings.filter(
                                    (training, i) =>
                                        i !== this.recordToBeOperated
                                ) || [],
                        };
                    }
                    return personToBeUpdated;
                }
            );
        if (storedHouseholdDetails)
            this.service.updateHouseHoldDetails({
                ...storedHouseholdDetails,
                ...{ houseHoldPersons: updatedHouseholdPersons },
            });
        this.demographicData["questionAnswers"].forEach((element: any) => {
            if (
                element.accordionRecord === this.recordToBeOperated &&
                this.deletedUser.id === element.userId
            ) {
                element["accordionHeader"] = "";
            }
        });
    }
    deleteClicked(userId: any) {
        this.isToBeDeleted = true;
        this.deletedUser = this.houseHoldPersons.filter(
            (ind) => ind.id === userId
        )[0];
    }
    editClicked(userId: any) {
        this.router.navigate(
            [
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                    "/" +
                    RoutePath.APPLYNOW_TRAINING_DETAILS,
                { userId: userId },
            ],
            { fragment: this.recordToBeOperated.toString() }
        );
    }
    next() {
        this.queueService.updateForwardPath();
        this.queueService.next();
    }

    addClicked() {
        this.router.navigate(
            [
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                    "/" +
                    RoutePath.APPLYNOW_WHO_TRAIN,
            ],
            { fragment: "new" }
        );
    }

    back(): void {
        this.queueService.back();
    }
}
