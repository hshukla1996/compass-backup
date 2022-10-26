import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { IApplyNowState } from '../../+state/apply-now.models';
import { INDIVIDUAL_PROGRAMS } from '../../../shared/constants/Individual_Programs_Constants';
import { RoutePath } from "../../../shared/route-strategies";
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from "../../apply-now-store-service";
import {IHouseHold, IHouseHoldDetails, PageDirection} from '../../household/household-model';
import { ScreenQueueUtil } from "./../expenses-gatepost/expenses-gatepost.paths";

@Component({
    selector: "compass-ui-child-or-adult-care-expenses",
    templateUrl: "./child-or-adult-care-expenses.component.html",
    styleUrls: ["./child-or-adult-care-expenses.component.scss"],
})
export class ChildOrAdultCareExpensesComponent implements OnInit {
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    selectedData: string[] = [];
    fragment!:string;
    adultCareMap: any[] = [];
    public jsonData:any = {
        questionText:
            "You told us someone pays for child care or care for an adult with a disability in order to work. Tell us who.",
        subHeading: "Select all that apply.",
        toolTip: "",
        isRequired: true,
        requiredText: "Please select at least one",
        questionAnswers: [

        ],
    };
    constructor(
        private service: ApplyNowStoreService,
        private router: Router,
        private queueService: ScreenQueueUtil,
        private activedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        if (this.houseHoldDetails.houseHoldPersons) {
            this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
        }
        this.jsonData.questionAnswers = [];
        if(this.houseHoldDetails.pageAction?.adultCareMap)
        this.selectedData = Object.keys(this.houseHoldDetails.pageAction.adultCareMap) ;
        this.houseHoldPersons.forEach((person) => {
            let personalBenefits =
                this.service?.getAppliedBenefitsForIndividual(
                    person
                ) as string[];
            const isEligible = this.service.areProgramsExist(personalBenefits, [
                INDIVIDUAL_PROGRAMS.HC,
                INDIVIDUAL_PROGRAMS.HA,
                INDIVIDUAL_PROGRAMS.MCR,
                INDIVIDUAL_PROGRAMS.MAR,
                INDIVIDUAL_PROGRAMS.CHR,
                INDIVIDUAL_PROGRAMS.FP,
                INDIVIDUAL_PROGRAMS.ABR,
                INDIVIDUAL_PROGRAMS.FPR,
                INDIVIDUAL_PROGRAMS.FS,
                INDIVIDUAL_PROGRAMS.FSR,
            ]);
            if (person.id && isEligible) {
                this.jsonData.questionAnswers.push({
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
            }
        });
        this.activedRoute.fragment.subscribe((fragment) => {
            this.fragment = fragment || "";
            if (this.fragment == "new") {
                this.selectedData = [];
            }
        });
    }

    showNextPage(selectedItems: any) {
        selectedItems.forEach((ind: any) => {
            if (parseInt(ind)) this.adultCareMap[ind] = false;
        });

        const updatedPageAction = {
            ...this.houseHoldDetails.pageAction,
            adultCareMap: {
                ...this.adultCareMap,
            },

            adultCareDirection: PageDirection.NEXT,
        };

        if (this.houseHoldDetails) {
            this.service.updateHouseHoldDetails({
                ...this.houseHoldDetails,
                ...{ pageAction: updatedPageAction },
            });
        }

        this.router.navigate(
            [
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_EXPENSES +
                    "/" +
                    RoutePath.APPLYNOW_CHILD_OR_ADULUT_CARE_EXPENSES_DETAILS,
            ],
            { fragment: this.fragment }
        );
    }

    showPreviousPage() {
        this.queueService.back();
    }
}
