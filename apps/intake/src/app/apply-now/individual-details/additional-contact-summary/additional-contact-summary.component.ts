import { ChangeDetectorRef, Component} from "@angular/core";
import { Router } from "@angular/router";
import { IApplyNowState } from "../../+state/apply-now.models";
import { AppStoreService } from "../../../app-store-service";
import { RoutePath } from "../../../shared/route-strategies";
import { Utility } from "../../../shared/utilities/Utility";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { IHouseHold, IHouseHoldDetails } from "../../household/household-model";
import { ScreenQueueUtil } from "../individuals-gatepost/individuals-gatepost.paths";

@Component({
    selector: "ui-compass-additional-contact-summary",
    templateUrl: "./additional-contact-summary.component.html",
    styleUrls: ["./additional-contact-summary.component.css"],
})
export class AdditionalContactSummaryComponent {
    jsonData: any;
    selectedData!: any[];
    applyNowState!: IApplyNowState;
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    states!: any[];
    deletedUser!: any;
    modalData = {
        modalTitle: "Are you sure you want to remove this record?",
        modalContent:
            "If you remove this record you will need to re-enter the data to get it back.",
        cancelButton: "Cancel",
        continueButton: "Remove",
    };
    recordToBeOperated!: number;
    contactPreferenceces: any = {
        P: "Phone",
        E: "Email",
        M: "Mobile",
    };

    demographicData: any = {
        questionText: "Your additional contacts",
        subHeading:
            "Look below to make sure you see all additional contacts here.",
        toolTip: "",
        questionAnswers: [{}],
        addtionalButton: "Add Additional Contacts",
    };
    constructor(
        private router: Router,
        private service: ApplyNowStoreService,
        private appService: AppStoreService,
        private cd: ChangeDetectorRef,
        private queueService: ScreenQueueUtil
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
        this.appService.getStates().subscribe((states) => {
            this.states = states;
            this.cd.detectChanges();
        });
      this.queueService.updateForwardPath();
        this.loadSummaryData();
    }
    loadSummaryData(): void {
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        this.demographicData.questionAnswers = [];
        this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons || [];

        let k = 0;
        this.houseHoldPersons.forEach((ind, i) => {
            if (
                ind.representativeContactInformation
                    ?.representativeContactPersons
            ) {
                ind.representativeContactInformation?.representativeContactPersons.forEach(
                    (contact, idx) => {
                        this.demographicData["questionAnswers"][k] = {
                            accordionHeader:
                                `${ind.firstName as string} ${
                                    ind.midName ? ind.midName : ("" as string)
                                } ${ind.lastName as string} ${Utility.getAge(
                                    ind.dateOfBirth
                                )} ` || "",
                            accordionSubHeading: contact?.firstName || "",
                            accordionRightHeading: "",
                            accordionRightSubHeading: "",
                            userId: ind.id || 0,
                            accordionRecord: idx,
                            accordionData: [
                                {
                                    label: "Street Address",
                                    value: <string>(
                                        contact.address?.addressLine1
                                    ),
                                    bold: false,
                                },
                                {
                                    label: "Street Address (2)",
                                    value: <string>(
                                        contact.address?.addressline2
                                    ),
                                    bold: false,
                                },
                                {
                                    label: "City",
                                    value: <string>contact.address?.city,
                                    bold: false,
                                },
                                {
                                    label: "State",
                                    value: <string>contact.address?.state,
                                    bold: false,
                                },

                                {
                                    label: "ZIP Code",
                                    value: <string>contact.address?.zip,
                                    bold: false,
                                },
                                {
                                    label: "Main Contact Number",
                                    value: <string>contact?.homePhoneNumber,
                                    bold: false,
                                },
                                {
                                    label: "Second Contact Number",
                                    value: <string>contact.workPhone,
                                    bold: false,
                                },
                                {
                                    label: "Other Contact Number",
                                    value: <string>contact.otherPhoneNumber,
                                    bold: false,
                                },
                                {
                                    label: "Email Address",
                                    value: <string>contact.emailAddress,
                                    bold: false,
                                },
                                {
                                    label: "What is the best way to contact this person?",
                                    value: <string>(
                                        (contact.preferredMethodOfContact
                                            ? this.contactPreferenceces[
                                                  contact
                                                      .preferredMethodOfContact
                                              ]
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
                        k++;
                        this.jsonData = this.demographicData;
                        // console.log("jsondata,,",this.jsonData)
                    }
                );
            }
        });
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

                    if (
                        person.id?.toString() ===
                            this.deletedUser?.toString() &&
                        personToBeUpdated.representativeContactInformation
                            ?.representativeContactPersons
                    ) {
                        personToBeUpdated.representativeContactInformation = {
                            ...person.representativeContactInformation,
                            representativeContactPersons: [
                                ...personToBeUpdated
                                    .representativeContactInformation
                                    .representativeContactPersons,
                            ].splice(this.recordToBeOperated, 1),
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
                element["accordionRecord"] === this.recordToBeOperated &&
                this.deletedUser === element.userId
            ) {
                element["accordionHeader"] = "";
            }
        });
    }
    editClicked(user: any) {
        this.router.navigate(
            [
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                    "/" +
                    RoutePath.APPLYNOW_ADDITIONAL_CONTACT_DETAILS,
                { userId: user },
            ],
            { fragment: this.recordToBeOperated?.toString() }
        );
    }
    next() {
        /*  this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS_PREGNANCYSCREEN,
        ]);*/

        this.queueService.next();
    }

    addClicked() {
        this.router.navigate(
            [
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                    "/" +
                    RoutePath.APPLYNOW_ADDITIONAL_CONTACT,
            ],
            { fragment: "new" }
        );
    }

    back(): void {
        this.queueService.back();
    }
}
