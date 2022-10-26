import { ChangeDetectorRef, Component } from "@angular/core";
import { RoutePath } from "../../../shared/route-strategies";
import { Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { AppStoreService } from "../../../app-store-service";
import { IApplyNowState } from "../../+state/apply-now.models";
import { ScreenQueueUtil } from "../individuals-gatepost/individuals-gatepost.paths";
import { Utility } from "../../../shared/utilities/Utility";
import { DateFormatConstants } from "../../../shared/constants/Constants";
import { IHouseHold, IHouseHoldDetails } from "../../household/household-model";

@Component({
    selector: "ui-compass-current-education-summary",
    templateUrl: "./current-education-summary.component.html",
    styleUrls: ["./current-education-summary.component.css"],
})
export class CurrentEducationSummaryComponent {
    jsonData: any;
    selectedData!: any[];
    applyNowState!: IApplyNowState;
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    schoolTypes!: any[];
    userIdToDelete!: any;
    demographicData: any = {
        questionText: "Your current education.",
        subHeading: "Look below to make sure all current education is here.",
        toolTip: "",
        questionAnswers: [],
        addtionalButton: "Add Current Education",
    };
    modalData = {
        modalTitle: "Are you sure you want to remove this record?",
        modalContent:
            "If you remove this record you will need to re-enter the data to get it back.",
        cancelButton: "Cancel",
        continueButton: "Remove",
    };
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private service: ApplyNowStoreService,
        private appService: AppStoreService,
        private cd: ChangeDetectorRef,
        private queueService: ScreenQueueUtil
    ) {}

    ngOnInit(): void {
        this.appService.getSchoolTypes().subscribe((c) => {
            this.schoolTypes = c;
            this.cd.detectChanges();
        });
        this.queueService.updateForwardPath();
        // this.selectedData = Object.keys(
        //     this.applyNowState?.houseHoldDetails.pageAction.studentsMap
        // );
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons || [];

        let k = 0;
        this.houseHoldPersons.forEach((ind, i) => {
            //if (ind.id && this.selectedData.indexOf(ind.id.toString()) > -1)
            console.log(ind.firstName);
            console.log(ind.currentEducation);
            if (
                ind &&
                ind.currentEducation &&
                Object.keys(ind.currentEducation).length > 0
            ) {
                this.demographicData["questionAnswers"][k] = {
                    accordionHeader:
                        ind.firstName +
                        " " +
                        ind.lastName +
                        " " +
                        Utility.getAge(ind.dateOfBirth) +
                        " (" +
                        Utility.getGenderCode(ind.gender as string) +
                        ")",
                    accordionSubHeading: ind.currentEducation?.schoolName,
                    accordionRightHeading: "",
                    accordionRightSubHeading: "",
                    userId: ind.id || 0,

                    accordionData: [
                        {
                            label: "School Name",
                            value: <string>ind.currentEducation?.schoolName,
                            bold: false,
                        },
                        {
                            label: "School Type",
                            value: <string>(
                                this.schoolTypes.filter(
                                    (st) =>
                                        st.id ===
                                        ind.currentEducation?.schoolType
                                )[0]?.displayValue
                            ),
                            bold: false,
                        },
                        {
                            label: `Does ${ind.firstName} attend school full-time or part-time?`,
                            value:
                                <string>ind.currentEducation?.fullOrPartTime ===
                                "fullTime"
                                    ? "Full-Time"
                                    : "Part-Time",
                            bold: false,
                        },

                        {
                            label: `When does ${ind.firstName} expect to graduate?`,
                            value: <string>(
                                (ind.currentEducation?.educationEndDate
                                    ? Utility.getDateInFormat(
                                          new Date(
                                              ind.currentEducation
                                                  ?.educationEndDate as string
                                          ),
                                          DateFormatConstants.MMDDYYYY
                                      )
                                    : "")
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

            // console.log("jsondata,,",this.jsonData)
        });
        this.cd.detectChanges();
    }
    deleteClicked(userId: any) {
        this.userIdToDelete = userId;
    }
    continueClicked() {
        const storedHouseholdDetails = this.houseHoldDetails;
        if (this.userIdToDelete) {
            const updatedHouseholdPersons = this.houseHoldPersons.map((ind) => {
                const updatedInd = { ...ind };
                if (ind.id === this.userIdToDelete) {
                    updatedInd.education = {};
                }
                return updatedInd;
            });
            this.service.updateHouseHoldDetails({
                ...storedHouseholdDetails,
                ...{ houseHoldPersons: updatedHouseholdPersons },
            });
            this.jsonData["questionAnswers"].forEach((element: any) => {
                if (element["userId"] === this.userIdToDelete) {
                    element["accordionHeader"] = "";
                }
            });
        }
        //  this.jsonData["questionAnswers"].forEach((element: any) => {
        //  if (element["userId"] === user) {
        //    element["accordionHeader"] = "";
        //  }
        // });
    }

    editClicked(user: any) {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_CURRENT_EDUCATON_DETAILS,
            { userId: user },
        ]);
    }
    next() {
        //  this.router.navigate([
        //    RoutePath.APPLYNOW +
        //       "/" +
        //       RoutePath.APPLYNOW_INDIVIDUALDETAILS +
        //      "/" +
        //      RoutePath.APPLYNOW_WHO_TRAIN,
        // ]);
       
        this.queueService.next();
    }

    addClicked() {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_WHO_CURRENT_STUDENT,
        ],
      { fragment: "new" });
    }

    back(): void {
        this.queueService.back();
    }
}
