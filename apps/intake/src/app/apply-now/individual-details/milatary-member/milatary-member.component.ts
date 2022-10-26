import { Component, OnInit  } from "@angular/core";
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {Router} from '@angular/router';
import  { KeyValueModal } from "../../insurance/keyValueModal";
import {RoutePath} from "../../../shared/route-strategies";
import { IHouseHold, PageDirection } from "../../household/household-model";
import { Subscription } from "rxjs";
import { Utility } from "../../../shared/utilities/Utility";
import { IApplyNowState } from "../../+state/apply-now.models";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { ScreenQueueUtil } from "../individuals-gatepost/individuals-gatepost.paths";
import { INDIVIDUAL_PROGRAMS } from "../../../shared/constants/Individual_Programs_Constants";
@Component({
    selector: "ui-compass-milatary-member",
    templateUrl: "./milatary-member.component.html",
    styleUrls: ["./milatary-member.component.css"],
})
export class MilataryMemberComponent {
    MilataryMemberForm: FormGroup | any;
    selectedData: string[] = [];
    militaryMap: any;
    applyNowState: IApplyNowState | undefined;
    milataryMembertData: KeyValueModal[] = [];
    private houseHoldHeadPersons: IHouseHold[] = [];
    private eventsSubscription: Subscription | undefined;
    private householdMembers: any[] = [];
    public millitionMemberJSON = {
        questionText:
            "You told us someone is a veteran, on active military duty, in the national guard, or in the reserves. Tell us who.",
        subHeading: "Select all that apply.",
        toolTip: "",
        isRequired: true,
        requiredText: "Please select at least one",
        questionAnswers: [
            {
                id: 1,
                label: "Test",
                isChecked: false,
            },
        ],
    };

    constructor(
        private fb: FormBuilder,
        private service: ApplyNowStoreService,
        private route: Router,
        private queueService: ScreenQueueUtil
    ) {}

    ngOnInit() {
        const getData$ = this.service.getAppData().subscribe((d) => {
            this.applyNowState = { ...d };
            this.houseHoldHeadPersons = this.applyNowState.houseHoldDetails
                .houseHoldPersons as IHouseHold[];
            this.householdMembers = this.houseHoldHeadPersons;
            this.millitionMemberJSON.questionAnswers = [];
            if (
                typeof this.applyNowState?.houseHoldDetails.pageAction
                    .militaryMap === "object"
            )
                this.selectedData = Object.keys(
                    this.applyNowState?.houseHoldDetails.pageAction.militaryMap
                );
            this.householdMembers.forEach((person) => {
                let personalBenefits =
                    this.service?.getAppliedBenefitsForIndividual(
                        person
                    ) as string[];
                const isEligible = this.service.areProgramsExist(
                    personalBenefits,
                    [
                        INDIVIDUAL_PROGRAMS.CA,
                        INDIVIDUAL_PROGRAMS.CAR,
                        INDIVIDUAL_PROGRAMS.LN,
                        INDIVIDUAL_PROGRAMS.LI,
                        INDIVIDUAL_PROGRAMS.WN,
                        INDIVIDUAL_PROGRAMS.WNR,
                        INDIVIDUAL_PROGRAMS.WAR,
                        INDIVIDUAL_PROGRAMS.LIR,
                        INDIVIDUAL_PROGRAMS.LNR,
                        INDIVIDUAL_PROGRAMS.LH,
                        INDIVIDUAL_PROGRAMS.LHP,
                        INDIVIDUAL_PROGRAMS.CI,
                        INDIVIDUAL_PROGRAMS.CIR,
                        INDIVIDUAL_PROGRAMS.LW,
                        INDIVIDUAL_PROGRAMS.FS,
                    ]
                );
                if (person.id && isEligible)
                    this.millitionMemberJSON.questionAnswers.push({
                        id: person.id as unknown as number,
                        isChecked:
                            this.selectedData && this.selectedData.length > 0
                                ? this.selectedData.findIndex(
                                      (x) =>
                                          x.toString() === person.id.toString()
                                  ) > -1
                                : false,
                        label: `${person.firstName as string} ${
                            person.lastName as string
                        } ${Utility.getAge(person.dateOfBirth)}`,
                    });

            });
        });
        this.eventsSubscription?.add(getData$);
    }

    showNextPage(selectedItems: any) {
        this.militaryMap = {};
        selectedItems.forEach((ind: any) => {
            this.militaryMap[ind] = false;
        });

        const updatedPageAction = {
            ...this.applyNowState?.houseHoldDetails.pageAction,
            militaryMap: {
                ...this.applyNowState?.houseHoldDetails.pageAction?.militaryMap,
                ...this.militaryMap,
            },

            militaryDirection: PageDirection.NEXT,
        };
        if (this.applyNowState?.houseHoldDetails) {
            console.log(updatedPageAction);
            this.service.updateHouseHoldDetails({
                ...this.applyNowState?.houseHoldDetails,
                ...{ pageAction: updatedPageAction },
            });
        }
        this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_MILATARY_STATUS,
        ]);
    }
    showPreviousPage(): void {
        this.queueService.back();
        /*  this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_TRAINING_SUMMARY,
        ]); */
    }
}
