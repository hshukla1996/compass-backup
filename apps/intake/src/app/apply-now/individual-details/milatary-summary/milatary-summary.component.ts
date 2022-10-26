import { ChangeDetectorRef, Component } from "@angular/core";
import { Router } from "@angular/router";
import { IApplyNowState } from "../../+state/apply-now.models";
import { RoutePath } from "../../../shared/route-strategies";
import { Utility } from "../../../shared/utilities/Utility";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { IHouseHold, IHouseHoldDetails, PageDirection } from "../../household/household-model";
import { ScreenQueueUtil } from "../individuals-gatepost/individuals-gatepost.paths";
import { AppStoreService } from "../../../app-store-service";
import { DateFormatConstants } from "../../../shared/constants/Constants";

@Component({
    selector: "ui-compass-milatary-summary",
    templateUrl: "./milatary-summary.component.html",
    styleUrls: ["./milatary-summary.component.css"],
})
export class MilatarySummaryComponent {
    jsonData: any;
    selectedData!: any[];
    applyNowState!: IApplyNowState;
    serviceBranches!: any[];
    houseHoldPersons: IHouseHold[] = [];
    veteranStatus?: any[];
    houseHoldDetails!: IHouseHoldDetails;
    userIdToDelete: any;
    demographicData: any = {
        questionText: "Your household's military or veteran members.",
        subHeading:
            "Look below to make sure all military or veteran members are here.",
        toolTip: "",
        questionAnswers: [],
        addtionalButton: "Add Military or Veteran Member",
    };
    modalData = {
        modalTitle: "Are you sure you want to remove this record?",
        modalContent:
            "If you remove this record you will need to re-enter the data to get it back.",
        cancelButton: "Cancel",
        continueButton: "Remove",
    };
    constructor(
        private route: Router,
        private queueService: ScreenQueueUtil,
        private service: ApplyNowStoreService,
        private appService: AppStoreService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        if (this.houseHoldDetails.houseHoldPersons) {
            this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
        }

        this.appService.getServiceBranches().subscribe((c) => {
            this.serviceBranches = c;
            this.cd.detectChanges();
        });
        this.appService.getVeteranStatus().subscribe((s) => {
            this.veteranStatus = s;
            this.cd.detectChanges();
        });
        let k = 0;
        this.houseHoldPersons.forEach((ind: IHouseHold, i: number) => {
            //if (ind.id && this.selectedData.indexOf(ind.id.toString()) > -1)
            if (ind.veteran) {
                this.demographicData["questionAnswers"][k] = {
                    accordionHeader:
                        ind.firstName +
                            " " +
                            ind.lastName +
                            " " +
                            Utility.getAge(ind.dateOfBirth) || "",

                    accordionSubHeading: this.veteranStatus?.filter(
                        (c: any) => c.id === ind.veteran?.status
                    )[0]?.displayValue,
                    accordionRightHeading: "",
                    accordionRightSubHeading: "",
                    userId: ind.id || 0,
                    accordionData: [
                        {
                            label: "Branch of Service:",
                            //value: <string>ind.veteran?.branchOfService,
                            value: this.serviceBranches.filter(
                                (c: any) =>
                                    c.id === ind.veteran?.branchOfService
                            )[0]?.displayValue,
                            bold: false,
                        },
                        {
                            label: "Date Entered:",
                            value: <string>(
                                (ind.veteran?.dateVeteranEntered
                                    ? Utility.getDateInFormat(
                                          new Date(
                                              ind.veteran
                                                  ?.dateVeteranEntered as string
                                          ),
                                          DateFormatConstants.MMDDYYYY
                                      )
                                    : "")
                            ),
                            bold: false,
                        },
                        {
                            label: "Date Discharged:",
                            value: <string>(
                                (ind.veteran?.dateVeteranLeft
                                    ? Utility.getDateInFormat(
                                          new Date(
                                              ind.veteran
                                                  ?.dateVeteranLeft as string
                                          ),
                                          DateFormatConstants.MMDDYYYY
                                      )
                                    : "")
                            ),
                            bold: false,
                        },
                        {
                            label: "Veteran Claim Number:",
                            value: <string>ind.veteran?.verteranClaimNumber,
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
                k++;
            }

            this.jsonData = this.demographicData;
        });
    }
    deleteClicked(user: any) {
        this.userIdToDelete = user;
    }
    continueClicked() {
        this.jsonData["questionAnswers"].forEach((element: any) => {
            if (element["userId"] === this.userIdToDelete) {
                element["accordionHeader"] = "";
                const militaryMap = {
                    ...this.houseHoldDetails.pageAction.militaryMap,
                };

                delete militaryMap[element["userId"]];
                const updatedPageAction = {
                    ...this.houseHoldDetails?.pageAction,
                    militaryMap,
                };
                const updatedHouseholdPersons =
                    this.houseHoldDetails.houseHoldPersons?.map(
                        (person: IHouseHold) => {
                            if (
                                person.id?.toString() ===
                                element["userId"].toString()
                            ) {
                                const personToBeUpdated = { ...person };
                                personToBeUpdated.veteran = {};
                                return personToBeUpdated;
                            } else {
                                return person;
                            }
                        }
                    );
                this.service.updateHouseHoldDetails({
                    ...this.houseHoldDetails,
                    ...{ pageAction: updatedPageAction },
                    ...{ houseHoldPersons: updatedHouseholdPersons },
                });
            }
        });
    }
    editClicked(user: any) {
        this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUAL_MILATARY_DETAILS,
            { userId: user },
        ]);
    }
    next() {
        /*    this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUAL_VETERAN_RELATIVE_DETAILS,
        ]);*/
        this.queueService.updateForwardPath();
        this.queueService.next();
    }

    addClicked() {
        this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_CURRENT_PAST_MILATARY_MEMEBER,
        ]);
    }

    back(): void {
        this.queueService.back();
    }

    addMilataryMember() {
        this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_MILATARY_STATUS,
        ]);
    }
}
