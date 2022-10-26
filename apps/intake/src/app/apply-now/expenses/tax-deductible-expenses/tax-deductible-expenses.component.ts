import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { RoutePath } from "../../../shared/route-strategies";
import {IHouseHold, IHouseHoldDetails, PageDirection} from "../../household/household-model";
import { ScreenQueueUtil } from "./../expenses-gatepost/expenses-gatepost.paths";
import {ApplyNowStoreService} from "../../apply-now-store-service";
import {AppStoreService} from "../../../app-store-service";
import {Utility} from "../../../shared/utilities/Utility";
import { INDIVIDUAL_PROGRAMS } from '../../../shared/constants/Individual_Programs_Constants';

@Component({
    selector: "compass-ui-tax-deductible-expenses",
    templateUrl: "./tax-deductible-expenses.component.html",
    styleUrls: ["./tax-deductible-expenses.component.scss"],
})
export class TaxDeductibleExpensesComponent implements OnInit {
    jsonData: any = {
        questionText:
            "You told us someone has tax deductible expenses. Tell us who.",
        subHeading: "Select all that apply.",
        toolTip: "",
        isRequired: true,
        requiredText: "Please select at least one",
        questionAnswers: [],
    };
    selectedData: string[] = [];
    taxdeductableMap: any = {};
    houseHoldPersons: IHouseHold[] = [];
    houseHoldDetails!: IHouseHoldDetails;
    fragment = "new";
    constructor(
        private router: Router,
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
        this.jsonData.questionAnswers = [];


        this.houseHoldPersons.forEach((person) => {
            let personalBenefits =
                this.service?.getAppliedBenefitsForIndividual(
                    person
                ) as string[];
            const isEligible = this.service.areProgramsExist(personalBenefits, [
                INDIVIDUAL_PROGRAMS.HA,
                INDIVIDUAL_PROGRAMS.HC,
                INDIVIDUAL_PROGRAMS.MCR,
                INDIVIDUAL_PROGRAMS.MAR,
                INDIVIDUAL_PROGRAMS.CHR,
                INDIVIDUAL_PROGRAMS.CA,
                INDIVIDUAL_PROGRAMS.CAR,
                INDIVIDUAL_PROGRAMS.FP,
                INDIVIDUAL_PROGRAMS.FPR,
                INDIVIDUAL_PROGRAMS.PE,
                INDIVIDUAL_PROGRAMS.MI
            ]);
            if (person.id && isEligible) {
                this.jsonData.questionAnswers.push({
                    id: person.id as unknown as number,
                    isChecked: false,
                    label: `${person.firstName as string} ${
                        person.lastName as string
                    } ${Utility.getAge(person.dateOfBirth)}`,
                });
            }
        });
    }
    showNextPage(selectedItems: any) {
        selectedItems.forEach((ind: any) => {
            this.taxdeductableMap[ind] = false;
        });
        const updatedPageAction = {
            ...this.houseHoldDetails.pageAction,
            taxdeductableMap: this.taxdeductableMap,

            taxdeductableDirection: PageDirection.NEXT,
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
                    RoutePath.APPLYNOW_TAX_DEDUCTIBLE_EXPENSES_DETAILS,
            ],
            { fragment: this.fragment }
        );
    }

    showPreviousPage() {
        this.queueService.back();
        /*this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_MEDICAL_EXPENSES_SUMMARY,
        ]);*/
    }
}
