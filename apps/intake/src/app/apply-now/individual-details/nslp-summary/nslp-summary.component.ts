import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { IApplyNowState } from "../../+state/apply-now.models";
import { AppStoreService } from "../../../app-store-service";
import { RoutePath } from "../../../shared/route-strategies";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { Utility } from "../../../shared/utilities/Utility";
import { IHouseHold, IHouseHoldDetails } from "../../household/household-model";
import {PageDirection} from "../../../referrals/+state/referrals.models";

@Component({
    selector: "ui-compass-nslp-summary",
    templateUrl: "./nslp-summary.component.html",
    styleUrls: ["./nslp-summary.component.css"],
})
export class NSLPSummaryComponent implements OnInit {
    jsonData: any;
    selectedData!: any[];
    nslpMap: any = {};
    userIdToDelete!: any;
    applyNowState!: IApplyNowState;
    counties!: any;
    schoolTypes!: any;
    schoolGrades!: any;
    houseHoldPersons: IHouseHold[] = [];
    houseHoldDetails!: IHouseHoldDetails;
    demographicData:any = {
        questionText: "Your education details.",
        subHeading:
            "Look below to make sure all individuals in the household are here.",
        toolTip: "",
        questionAnswers: [

        ],
        addtionalButton: "",
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
        private cd: ChangeDetectorRef
    ) {}
    ngOnInit() {
        this.appService.getSchoolGrades().subscribe((c: any) => {
            this.schoolGrades = c;
            console.log(this.schoolGrades);
            this.cd.detectChanges();
        });
        this.appService.getCounties().subscribe((c: any) => {
            this.counties = c.tableRows;
            this.cd.detectChanges();
        });

        this.appService.getNSLPSchoolTypes().subscribe((c: any) => {
            this.schoolTypes = c;
            this.cd.detectChanges();
        });
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        if (this.houseHoldDetails.houseHoldPersons) {
            this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
        }
      let k = 0;
        this.houseHoldPersons.forEach((ind, i) => {
            //if (ind.id && this.selectedData.indexOf(ind.id.toString()) > -1)
            if (  ind &&
              ind.education &&
              Object.keys(ind.education).length > 0) {
                this.demographicData["questionAnswers"][k] = {
                    accordionHeader:
                        ind.firstName +
                        " " +
                        ind.lastName +
                        " " +
                        Utility.getAge(ind.dateOfBirth),
                    accordionSubHeading: "",
                    accordionRightHeading: "",
                    accordionRightSubHeading: "",
                    userId: ind.id || 0,
                    accordionData: [
                        {
                            label: `For the current school year, what grade or year is ${ind.firstName} in?`,
                            value: this.schoolGrades.filter(
                                (c: any) => c.id === ind.education?.currentGrade
                            )[0]?.displayValue,
                            bold: false,
                        },
                        {
                            label: `What county is ${ind.firstName}'s school in? `,
                            value: this.counties.filter(
                                (c: any) => c.id === ind.education?.schoolCounty
                            )[0]?.displayValue,
                            bold: false,
                        },
                        {
                            label: "Is this a public, private, or charter school?",
                            value: this.schoolTypes.filter(
                                (c: any) =>
                                    c.id ===
                                    ind.education?.charterOrPrivateSchoolType
                            )[0]?.displayValue,
                            bold: false,
                        },
                        {
                            label: "Select the school district below.",
                            value: <string>ind.education?.schoolDistrict,
                            bold: false,
                        },

                        {
                            label: `Which school building does ${ind.firstName} go to?`,
                            value: <string>ind.education?.schoolBuilding,
                            bold: false,
                        },
                        {
                            label: "Select the school from the list.",
                            value: <string>(
                                ind.education?.charterOrPrivateSchoolName
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
        });
      this.cd.detectChanges();
    }

    deleteClicked(userId: any) {
        this.userIdToDelete = userId;
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
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUAL_GATEPOST,
        ]);
    }

    addClicked() {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_WHO_CURRENT_STUDENT,
        ]);
    }

    continueClicked() {
        const storedHouseholdDetails = this.houseHoldDetails;
        if (this.userIdToDelete) {
            const updatedHouseholdPersons = this.houseHoldPersons.map((ind) => {
                const updatedInd = { ...ind };
                if (ind.id === this.userIdToDelete) {
                    updatedInd.education = {
                        ...ind.education,
                        ...{
                            currentGrade: "",
                            schoolCounty: "",
                            charterOrPrivateSchoolType: "",
                            schoolDistrict: "",
                            schoolBuilding: "",
                            charterOrPrivateSchoolName: "",
                        },
                    };
                }
                return updatedInd;
            });
            const nslpMap = { ...this.houseHoldDetails.pageAction.nslpMap };
            delete nslpMap[this.userIdToDelete];
            const updatedPageAction = {
                ...this.houseHoldDetails?.pageAction,
                nslpMap,
            };
            this.service.updateHouseHoldDetails({
                ...storedHouseholdDetails,
                ...{ pageAction: updatedPageAction },
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

    back(): void {
      this.houseHoldDetails = this.service.getHouseHoldDetails;
      this.houseHoldDetails.selectedForSchoolMeals.forEach((ind: any) => {
        this.nslpMap[ind] = true;
      });
      const updatedPageAction = {
        ...this.houseHoldDetails.pageAction,
        nslpMap: {
          ...this.houseHoldDetails.pageAction?.nslpMap,
          ...this.nslpMap,
        },

        personDirection: PageDirection.NEXT,
      };
      this.service.updateHouseHoldDetails({
        ...this.houseHoldDetails,
        ...{ pageAction: updatedPageAction },
      });
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_CHARTER_SCHOOL_DETAILS,
        ]);
    }
}
