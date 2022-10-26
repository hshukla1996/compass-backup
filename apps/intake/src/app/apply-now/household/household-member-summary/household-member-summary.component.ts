import {
    Component,
    ChangeDetectorRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
    ElementRef,
} from "@angular/core";

import { Router } from "@angular/router";

import { RoutePath } from "../../../shared/route-strategies";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { AppStoreService } from "../../../app-store-service";
import { IApplyNowState } from "../../+state/apply-now.models";
import {
    IHouseHold,
    IHouseHoldDetails,
    IRelationships,
} from "../household-model";
import { format } from "date-fns";
import { PageDirection } from "../../../referrals/+state/referrals.models";
import { UtilService } from "../../../shared/services/util.service";
import { DoIQualifyStoreService } from "../../../do-i-qualify/do-i-qualify-store-service";
import { MatCardLgImage } from "@angular/material/card";
import { Utility } from "../../../shared/utilities/Utility";
// import { timeStamp } from 'console';

@Component({
    selector: "compass-ui-household-member-summary",
    templateUrl: "./household-member-summary.component.html",
    styleUrls: ["./household-member-summary.component.scss"],
})
export class HouseholdMemberSummaryComponent implements OnInit {
    public age: any;
    public expanded = false;
    houseHoldDetails!: IHouseHoldDetails;
    householdHead!: IHouseHold;
    houseHoldPersons: IHouseHold[] = [];
    basicDetails: IHouseHold[] = [];
    applyNowState!: IApplyNowState;
    indexExpanded = -1;
    deleteUserIdhouseholdSummary: any;
    deleteUserType: any;
    userToBeDeleted!: any;
    // firstNamelocal: any;
    firstNamelocal: any = "sfsff";
    relationships: any;
    userIdToDelete!: any;
    modalData = {
        modalTitle: "Are you sure you want to remove this record?",
        modalContent:
            "If you remove this record you will need to re-enter the data to get it back.",
        cancelButton: "Cancel",
        continueButton: "Remove",
    };
    demographicData: any = {
        questionText: "People in your household.",
        subHeading:
            "Review the entries to make sure everything looks correct. If someone is missing from your household, add them now.",
        toolTip:
            "If you’re applying for healthcare, we need to know about everyone on your federal income tax return. If you don’t plan to file a federal income tax return, that’s ok. You can still apply.",
        questionAnswers: [],
        addtionalButton: "Add Another Person",
    };
    constructor(
        private router: Router,
        private cd: ChangeDetectorRef,
        private service: ApplyNowStoreService,
        private appService: AppStoreService,
        private utilService: UtilService,
        private diqservice: DoIQualifyStoreService
    ) {
        this.appService.getRelationships().subscribe((c) => {
            this.relationships = c;
            if (!Array.isArray(this.relationships)) {
                this.relationships = [];
            }
        });
    }
  ngOnInit(){
      this.loadPersons();
  }
    loadPersons(): void {
        this.houseHoldDetails = this.service.getHouseHoldDetails;

        this.houseHoldPersons =
            this.service.getHouseHoldDetails.houseHoldPersons || [];
        this.houseHoldPersons.forEach((ind, i) => {
            this.demographicData["questionAnswers"][i] = {
                accordionHeader:
                    ind.firstName +
                        " " +
                        ind.lastName +
                        " " +
                        Utility.getAge(ind.dateOfBirth) || "",
                accordionSubHeading: "",
                accordionRightHeading: "",
                accordionRightSubHeading: "",
                userId: ind.id || 0,

                accordionData: [
                    {
                        label: `Date of Birth`,
                        value: Utility.formatDate(ind.dateOfBirth),
                        bold: false,
                    },
                    {
                        label: `Sex`,
                        value: ind.gender === "M" ? "Male" : "Female",
                        bold: false,
                    },
                    {
                        label: `Has ${ind.firstName} ever been known by another name?`,
                        value: ind.otherName ? "Yes" : "No",
                    },
                    {
                        label: `What is this person’s other name?`,
                        value: ind.otherNameVal,
                    },
                    {
                        label: `Relationship to ${ind.firstName}`,
                        value: this.getRelationshipName(
                            ind?.memberRelationships
                        )
                            .map((r: any) => `${r.rel} of ${r.name}`)
                            .join("<br/>"),
                        isHtml: true,
                    },
                ],
                editButton: "Edit",
                 deleteButton: "Delete",
            };

            this.demographicData["questionAnswers"][i].accordionData.forEach(
                (element: any) => {
                    element.label = !element.value ? "" : element.label;
                }
            );
        });
    }
    deleteClicked(userId: any) {
        this.deleteUserIdhouseholdSummary = userId;
    }
    continueClicked() {
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        const updatedHouseHoldPersons = this.houseHoldPersons.filter(
            (person) => {
                return (
                    person.id?.toString() !==
                    this.deleteUserIdhouseholdSummary.toString()
                );
                // return person.id !== id;
            }
        );
        const updatedHouseholdObj = {
            houseHoldPersons: this.updateRelations(updatedHouseHoldPersons),
        };
        this.service.updateHouseHoldDetails({
            ...this.houseHoldDetails,
            ...updatedHouseholdObj,
        });

        setTimeout(() => {
          this.loadPersons();
            if (!this.houseHoldPersons.length) {
                this.router.navigate([
                    RoutePath.APPLYNOW +
                        "/" +
                        RoutePath.APPLYNOW_HOUSEHOLD +
                        "/" +
                        RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDHEAD,
                ]);
            }
        }, 100);
        this.demographicData["questionAnswers"].forEach((element: any) => {
            if (element["userId"] === this.deleteUserIdhouseholdSummary) {
                element["accordionHeader"] = "";
            }
        });
    }


    capitalize = (s: string) => (s && s[0].toUpperCase() + s.slice(1)) || "";
    getRelationshipName(relationships: any) {
        return relationships.map((relObj: IRelationships) => {
            // console.log("rel object",relObj)
            const user = this.service.extractUser(
                this.houseHoldPersons,
                relObj.individualLookupId
            );
            const detail = this.relationships.filter(
                (relation: any) => relation.id === relObj.relationshipType
            );
            return {
                rel: detail[0]?.displayValue,
                name:
                    this.capitalize(user.firstName) +
                    " " +
                    this.capitalize(user.lastName),
            };
        });

        //
        //return (detail.length>0)?detail[0].displayValue:"";
    }

    editClicked(id: any) {
        /*this.service.updateBasicDetails({ basicDetails: this.basicDetails, editId: id } as unknown as BasicDetails)*/
        setTimeout(() => {
            //  this.router.navigate([RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_EDIT_PERSON]);
            if (id === this.houseHoldPersons[0].id) {
                this.router.navigate([
                    RoutePath.APPLYNOW +
                        "/" +
                        RoutePath.APPLYNOW_HOUSEHOLD +
                        "/" +
                        RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDHEAD,
                ]);
            } else {
                this.router.navigate([
                    RoutePath.APPLYNOW +
                        "/" +
                        RoutePath.APPLYNOW_HOUSEHOLD +
                        "/" +
                        RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDANOTHERPERSON,
                    { userId: id },
                ]);
            }
        }, 100);
        // console.log(id);
    }

    updateRelations(houseHoldPersons:IHouseHold[]) {
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        const updatedBasicDetails: IHouseHold[] = [];
            const existingMembers = houseHoldPersons.map((member) => {
                if (member.id) return member.id.toString();
                else return "";
            });

            for (
                let i = 0;
                i <  houseHoldPersons.length;
                i++
            ) {
                const getRelationshipFor = houseHoldPersons[i].id;
                const currenMemberRelations: IRelationships[] = [];
                for (let j = 0; j < houseHoldPersons.length; j++) {
                    if (i === j) {
                        continue;
                    }
                    const getRelationshipTo = houseHoldPersons[j].id;
                    const relationToCurrentMember = houseHoldPersons[
                        j
                    ].memberRelationships?.filter((rel: IRelationships) => {
                        if (
                            existingMembers.indexOf(
                                rel.individualLookupId.toString()
                            ) > -1 &&
                            getRelationshipFor
                        ) {
                            return (
                                rel.individualLookupId.toString() ===
                                getRelationshipFor.toString()
                            );
                        }
                        return false;
                    })[0];
                    if (
                        relationToCurrentMember &&
                        getRelationshipFor &&
                        existingMembers.indexOf(
                            getRelationshipFor?.toString()
                        ) > -1
                    ) {
                        const currentRelation =
                            relationToCurrentMember.relationshipType;
                        if (getRelationshipTo)
                            currenMemberRelations.push({
                                individualLookupId: getRelationshipTo,
                                relationshipType:
                                    this.utilService.getInvRelationships(
                                      houseHoldPersons[i].gender || "M",
                                        currentRelation
                                    ),
                            });
                    }
                }
                updatedBasicDetails[i] = {...houseHoldPersons[i]}
                updatedBasicDetails[i].memberRelationships =
                    currenMemberRelations;
            }

     return updatedBasicDetails;
    }

    expand() {
        this.expanded = !this.expanded;
    }

    getAge(dateString: any): any {
        // var today = new Date();
        // var birthDate = new Date(dateString);
        // var age = today.getFullYear() - birthDate.getFullYear();
        // var m = today.getMonth() - birthDate.getMonth();
        // if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        //   age--;
        // }
        // return age;
        // const newFormattedDate = new Date(dateString as unknown as Date);
        // const dob= format(newFormattedDate, 'MM-dd-yyyy');
        // return dob;

        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    editDetails() {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_HOUSEHOLD +
                "/" +
                RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDHEAD,
        ]);
    }
    addClicked() {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_HOUSEHOLD +
                "/" +
                RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDANOTHERPERSON,
        ]);
    }
    next(): void {
        // Custom logic here
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_HOUSEHOLD +
                "/" +
                RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDHEADSELECTION,
        ]);
    }

    back(): void {
        // Custom logic here
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_HOUSEHOLD +
                "/" +
                RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDHEAD,
        ]);
    }
}
