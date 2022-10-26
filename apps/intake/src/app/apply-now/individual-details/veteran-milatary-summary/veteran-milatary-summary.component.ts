import { ChangeDetectorRef, Component } from "@angular/core";
import { Router } from "@angular/router";
import { IApplyNowState } from "../../+state/apply-now.models";
import { AppStoreService } from "../../../app-store-service";
import { RoutePath } from "../../../shared/route-strategies";
import { Utility } from "../../../shared/utilities/Utility";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { IHouseHold, IHouseHoldDetails } from "../../household/household-model";
import { ScreenQueueUtil } from "../individuals-gatepost/individuals-gatepost.paths";

@Component({
    selector: "ui-compass-veteran-milatary-summary",
    templateUrl: "./veteran-milatary-summary.component.html",
    styleUrls: ["./veteran-milatary-summary.component.css"],
})
export class VeteranMilatarySummaryComponent {
    jsonData: any;
    selectedData!: any[];
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    serviceBranches!: any[];
    userIdToDelete: any;
    demographicData: any = {
        questionText: "Your veteran relatives.",
        subHeading:
            "Look below to make sure all military or veteran members are here.",
        toolTip: "",
        questionAnswers: [],
        addtionalButton: "+ Add Veteran Relative",
    };
    modalData = {
        modalTitle: "Are you sure you want to remove this record?",
        modalContent:
            "If you remove this record you will need to re-enter the data to get it back.",
        cancelButton: "Cancel",
        continueButton: "Remove",
    };
    constructor(
        private router: Router,
        private service: ApplyNowStoreService,
        private queueService: ScreenQueueUtil,
        private appService: AppStoreService,
        private cd: ChangeDetectorRef
    ) {}
    submit() {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_ADDITIONAL_CONTACT,
        ]);
    }
    ngOnInit(): void {
        this.appService.getServiceBranches().subscribe((c) => {
            this.serviceBranches = c;
            this.cd.detectChanges();
        });
          this.queueService.updateForwardPath();
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        if (this.houseHoldDetails.houseHoldPersons) {
            this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
        }
        let k = 0;
        this.houseHoldPersons.forEach((ind, i) => {
            if (
                ind.veteranRelationInformation &&
                Object.keys(ind.veteranRelationInformation).length > 0
            ) {
                this.demographicData["questionAnswers"][k] =
                    this.getVetProps(ind);

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
                this.jsonData = this.demographicData;
            }

            // console.log("jsondata,,",this.jsonData)
        });
        if (this.houseHoldDetails.otherVetPerson) {
            this.demographicData["questionAnswers"][k] = this.getVetProps(
                this.houseHoldDetails.otherVetPerson
            );
        }
    }
    getVetProps(ind: IHouseHold) {
        if (ind.veteranRelationInformation) {
            return {
                accordionHeader:
                    ind.id === 999
                        ? `${ind.firstName}`
                        : `${ind.firstName as string} ${
                              ind.midName ? ind.midName : ("" as string)
                          } ${ind.lastName as string} ${Utility.getAge(
                              ind.dateOfBirth
                          )} `,
                accordionSubHeading: this.serviceBranches.filter(
                    (c: any) =>
                        c.id === ind.veteranRelationInformation?.branchOfService
                )[0].displayValue,
                accordionRightHeading: "",
                accordionRightSubHeading: "",
                userId: ind.id || 0,

                accordionData: [
                    {
                        label: "Date Entered:",
                        value: <string>(
                            ind.veteranRelationInformation.dateVeteranEntered
                        )
                            ? ind.veteranRelationInformation.dateVeteranEntered
                            : "",
                        bold: false,
                    },
                    {
                        label: "Date Discharged:",
                        value: <string>(
                            ind.veteranRelationInformation.dateVeteranLeft
                        ),
                        bold: false,
                    },
                    {
                        label: "Veteran Claim Number:",
                        value: <string>(
                            ind.veteranRelationInformation.verteranClaimNumber
                        ),
                        bold: false,
                    },
                    {
                        label: `Who is a spouse, widow(er), or minor child of ${ind.firstName}?`,
                        //value: <string>ind.suffix,
                        value: (<string>(
                            ind.veteranRelationInformation?.relatives
                                ?.map((relId) => {
                                    const currentUser =
                                        this.service.extractUser(
                                            this.houseHoldPersons,
                                            relId
                                        ) || "";
                                    return (
                                        currentUser.firstName +
                                        " " +
                                        currentUser.lastName
                                    );
                                })
                                .join(",")
                        )) as string,
                        bold: false,
                    },
                ],
                editButton: "Edit",
                deleteButton: "Delete",
            };
        } else {
            return {};
        }
    }
    deleteClicked(user: any) {
        this.userIdToDelete = user;
    }
    continueClicked() {
        const storedHouseholdDetails = this.houseHoldDetails;
        if (this.userIdToDelete) {
            const updatedHouseholdPersons = this.houseHoldPersons.map((ind) => {
                const updatedInd = { ...ind };
                if (ind?.id?.toString() === this.userIdToDelete.toString()) {
                    updatedInd.veteranRelationInformation = {};
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
    }
    editClicked(user: any) {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUAL_VETERAN_RELATIVE_DETAILS,
            { userId: user },
        ]);
    }
    next() {
        /*  this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_ADDITIONAL_CONTACT,
        ]);
        */
      
        this.queueService.next();
    }

    addClicked() {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUAL_VETERAN_RELATIVE_DETAILS,
        ]);
    }

    back(): void {
        this.queueService.back();
    }
}
