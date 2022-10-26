import { Component, OnInit  } from "@angular/core";
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { KeyValueModal } from "../../insurance/keyValueModal"
import {RoutePath} from "../../../shared/route-strategies";
import { IApplyNowState } from "../../+state/apply-now.models";
import { IHouseHold, IHouseHoldDetails, PageDirection } from "../../household/household-model";
import { Subscription } from "rxjs";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { Utility } from "../../../shared/utilities/Utility";
import { ScreenQueueUtil } from "../individuals-gatepost/individuals-gatepost.paths";
import { select } from "@ngrx/store";
import { INDIVIDUAL_PROGRAMS } from "../../../shared/constants/Individual_Programs_Constants";
@Component({
    selector: "ui-compass-who-training",
    templateUrl: "./who-training.component.html",
    styleUrls: ["./who-training.component.css"],
})
export class WhoTrainingComponent {
    selectedData: string[] = [];
    trainingsMap: any[] = [];
    fragment = "";
    applyNowState: IApplyNowState | undefined;
    private houseHoldHeadPersons: IHouseHold[] = [];
    private eventsSubscription: Subscription | undefined;
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    public trainingJSON = {
        questionText:
            "You told us someone is attending a training or education program right now. Tell us who.",
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
        private service: ApplyNowStoreService,
        private queueService: ScreenQueueUtil,
        private activedRoute: ActivatedRoute,
        private route: Router
    ) {}
    ngOnInit() {
        this.activedRoute.fragment.subscribe((fragment) => {
            this.fragment = fragment || "";
            if (this.fragment == "new") {
                this.selectedData = [];
            }
        });
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        if (this.houseHoldDetails.houseHoldPersons) {
            this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
        }
        this.trainingJSON.questionAnswers = [];
        // this.houseHoldHeadPersons.forEach((person) => {
        // if (person.i) {
        //   this.selectedData.push(person.id as unknown as string);
        // }
        // });
        if (
            typeof this.houseHoldDetails.pageAction.trainingsMap === "object" &&
            this.fragment !== "new"
        )
            this.selectedData = Object.keys(
                this.houseHoldDetails.pageAction.trainingsMap
            );
        this.houseHoldPersons.forEach((person: IHouseHold) => {
            let personalBenefits =
                this.service?.getAppliedBenefitsForIndividual(
                    person
                ) as string[];
            const isEligible = this.service.areProgramsExist(personalBenefits, [
                INDIVIDUAL_PROGRAMS.CI,
                INDIVIDUAL_PROGRAMS.CIR,
            ]);
            if (person.id && isEligible )
                this.trainingJSON.questionAnswers.push({
                    id: person.id as unknown as number,
                    isChecked:
                        this.fragment !== "new" &&
                        this.selectedData.indexOf(person.id.toString()) > -1
                            ? true
                            : false,
                    label: `${person.firstName as string} ${
                        person.lastName as string
                    } ${Utility.getAge(person.dateOfBirth)}`,
                });
        });
    }

    showNextPage(selectedItems: any) {
        selectedItems.forEach((ind: any) => {
            this.trainingsMap[ind] = false;
        });
        const updatedPageAction = {
            ...this.houseHoldDetails.pageAction,
            trainingsMap: {
                ...this.houseHoldDetails.pageAction?.trainingsMap,
                ...this.trainingsMap,
            },

            trainingDirection: PageDirection.NEXT,
        };
        if (this.houseHoldDetails) {
            this.service.updateHouseHoldDetails({
                ...this.houseHoldDetails,
                ...{ pageAction: updatedPageAction },
            });
        }
        this.route.navigate(
            [
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                    "/" +
                    RoutePath.APPLYNOW_TRAINING_DETAILS,
            ],
            { fragment: this.fragment }
        );
    }
    showPreviousPage(): void {
        /*  this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_CURRENT_EDUCATON_SUMMARY,
        ]);*/
        this.queueService.back();
    }
}
