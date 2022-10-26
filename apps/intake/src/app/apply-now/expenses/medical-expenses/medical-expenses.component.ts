import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import { RoutePath } from "../../../shared/route-strategies";
import {IHouseHold, IHouseHoldDetails, PageDirection} from "../../household/household-model";
import { ScreenQueueUtil } from "./../expenses-gatepost/expenses-gatepost.paths";
import {ApplyNowStoreService} from "../../apply-now-store-service";
import {AppStoreService} from "../../../app-store-service";
import {Utility} from "../../../shared/utilities/Utility";
import {AppPageActions} from "../../../+state/actions";
import {select, Store} from "@ngrx/store";
import * as AppSelectors from "../../../+state/app.selectors";
import {State as AppState} from "../../../+state";
import { INDIVIDUAL_PROGRAMS } from '../../../shared/constants/Individual_Programs_Constants';


@Component({
    selector: "compass-ui-medical-expenses",
    templateUrl: "./medical-expenses.component.html",
    styleUrls: ["./medical-expenses.component.scss"],
})
export class MedicalExpensesComponent implements OnInit {
    jsonData: any = {
        questionText:
            "You told us someone had medical expenses that were not covered by health insurance in the last 90 days. Tell us who.",
        subHeading: "Select all that apply.",
        toolTip: "",
        isRequired: true,
        requiredText: "Please select at least one",
        questionAnswers: [],
    };
    selectedData: string[] = [];
    medicalMap: any = {};
    houseHoldPersons: IHouseHold[] = [];
    houseHoldDetails!: IHouseHoldDetails;
    fragment = "new";
    constructor(
        private router: Router,
        private queueService: ScreenQueueUtil,
        private service: ApplyNowStoreService,
        private appService: AppStoreService,
        private appstore: Store<AppState>,
        private cd: ChangeDetectorRef,
        private activedRoute: ActivatedRoute,
    ) {}

    ngOnInit(): void {
      this.activedRoute.fragment.subscribe((fragment) => {
        this.fragment = fragment || '';
        if(this.fragment == 'new'){
          this.selectedData = [];
        }
      });
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        if (this.houseHoldDetails.houseHoldPersons) {
            this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
        }

        this.jsonData.questionAnswers = [];
        if( this.houseHoldDetails.pageAction?.medicalMap) {
          this.selectedData = Object.keys(
            this.houseHoldDetails.pageAction.medicalMap
          );
        }
        this.houseHoldPersons.forEach((person) => {
            let personalBenefits =
                this.service?.getAppliedBenefitsForIndividual(
                    person
                ) as string[];
            const isEligible = this.service.areProgramsExist(personalBenefits, [
                INDIVIDUAL_PROGRAMS.CI,
                INDIVIDUAL_PROGRAMS.CIR,
                INDIVIDUAL_PROGRAMS.FS,
                INDIVIDUAL_PROGRAMS.FSR,
                INDIVIDUAL_PROGRAMS.ES,
                INDIVIDUAL_PROGRAMS.ESR,
            ]);
            if (person.id && isEligible) {
                this.jsonData.questionAnswers.push({
                    id: person.id as unknown as number,
                    isChecked: this.fragment !== "new" &&
                    this.selectedData.indexOf(person.id.toString()) > -1
                      ? true
                      : false,
                    label: `${person.firstName as string} ${
                        person.lastName as string
                    } ${Utility.getAge(person.dateOfBirth)}`,
                });
            }
        });
    }
    showNextPage(selectedItems: any) {
        selectedItems.forEach((ind: any) => {
            this.medicalMap[ind] = false;
        });
        const updatedPageAction = {
            ...this.houseHoldDetails.pageAction,
            medicalMap: this.medicalMap,

            medicalDirection: PageDirection.NEXT,
        };
        if (this.houseHoldDetails) {
            console.log(updatedPageAction);
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
                    RoutePath.APPLYNOW_MEDICAL_EXPENSES_DETAILS,
            ],
            { fragment: this.fragment }
        );
    }

    showPreviousPage() {
        /*this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_CHILD_OR_ADULUT_CARE_EXPENSES_SUMMARY,
        ]);*/
        this.queueService.back();
    }
}
