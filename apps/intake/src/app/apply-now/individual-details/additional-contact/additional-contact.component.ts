import { Component, OnInit  } from "@angular/core";
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription } from "rxjs";
import { IApplyNowState } from "../../+state/apply-now.models";
import { INDIVIDUAL_PROGRAMS } from "../../../shared/constants/Individual_Programs_Constants";
import { RoutePath } from "../../../shared/route-strategies";
import { Utility } from "../../../shared/utilities/Utility";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { IHouseHold, PageDirection } from "../../household/household-model";
import { KeyValueModal } from "../../insurance/keyValueModal";
import { ScreenQueueUtil } from "../individuals-gatepost/individuals-gatepost.paths";
@Component({
    selector: "ui-compass-additional-contact",
    templateUrl: "./additional-contact.component.html",
    styleUrls: ["./additional-contact.component.css"],
})
export class AdditionalContactComponent {
    additionalContactForm: FormGroup | any;
    selectedData: string[] = [];
    poaMap: any[] = [];
    applyNowState: IApplyNowState | undefined;
    fragment = "";
    private houseHoldHeadPersons: IHouseHold[] = [];
    private eventsSubscription: Subscription | undefined;
    private householdMembers: any[] = [];
    public poaJSON = {
        questionText:
            "You told us someone has a representative, power of attorney, or additional contact person with legal authority. Tell us who.",
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
    additionalContactFormsData: KeyValueModal[] = [];

    constructor(
        private fb: FormBuilder,
        private service: ApplyNowStoreService,
        private activedRoute: ActivatedRoute,
        private route: Router,
        private queueService: ScreenQueueUtil
    ) {}

    ngOnInit() {
        const getData$ = this.service.getAppData().subscribe((d) => {
            this.applyNowState = { ...d };
            this.houseHoldHeadPersons = this.applyNowState.houseHoldDetails
                .houseHoldPersons as IHouseHold[];
            this.householdMembers = this.houseHoldHeadPersons;
            this.poaJSON.questionAnswers = [];
            // this.houseHoldHeadPersons.forEach((person) => {
            // if (person.i) {
            //   this.selectedData.push(person.id as unknown as string);
            // }
            // });
            if (
                typeof this.applyNowState?.houseHoldDetails.pageAction
                    .poaMap === "object"
            )
                this.selectedData = Object.keys(
                    this.applyNowState?.houseHoldDetails.pageAction.poaMap
                );
            this.householdMembers.forEach((person) => {
                //alert(this.fragment);

                let personalBenefits =
                    this.service?.getAppliedBenefitsForIndividual(
                        person
                    ) as string[];
                const isEligible = this.service.areProgramsExist(
                    personalBenefits,
                    [
                        INDIVIDUAL_PROGRAMS.LN,
                        INDIVIDUAL_PROGRAMS.LI,
                        INDIVIDUAL_PROGRAMS.LIR,
                        INDIVIDUAL_PROGRAMS.LNR,
                        INDIVIDUAL_PROGRAMS.HA,
                        INDIVIDUAL_PROGRAMS.HC,
                        INDIVIDUAL_PROGRAMS.MCR,
                        INDIVIDUAL_PROGRAMS.MAR,
                        INDIVIDUAL_PROGRAMS.CHR,
                        INDIVIDUAL_PROGRAMS.CA,
                        INDIVIDUAL_PROGRAMS.CAR,
                        INDIVIDUAL_PROGRAMS.FP,
                        INDIVIDUAL_PROGRAMS.FPR,
                        INDIVIDUAL_PROGRAMS.WN,
                        INDIVIDUAL_PROGRAMS.WNR,
                        INDIVIDUAL_PROGRAMS.WAR,
                        INDIVIDUAL_PROGRAMS.FS,
                        INDIVIDUAL_PROGRAMS.FSR,
                    ]
                );
                if (person.id && isEligible)
                    this.poaJSON.questionAnswers.push({
                        id: person.id as unknown as number,
                        isChecked: this.fragment !== "new" &&
                        this.selectedData.indexOf(person.id.toString()) > -1
                          ? true
                          : false,
                        label: `${person.firstName as string} ${
                            person.lastName as string
                        } ${Utility.getAge(person.dateOfBirth)}`,
                    });
            });
        });
        this.eventsSubscription?.add(getData$);
        this.activedRoute.fragment.subscribe((fragment) => {
            if (fragment) {
                this.fragment = fragment;
            }
        });
    }

    showNextPage(selectedItems: any) {
        selectedItems.forEach((ind: any) => {
            this.poaMap[ind] = false;
        });
        const updatedPageAction = {
            ...this.applyNowState?.houseHoldDetails.pageAction,
            poaMap: {
                ...this.applyNowState?.houseHoldDetails.pageAction?.poaMap,
                ...this.poaMap,
            },

            poaDirection: PageDirection.NEXT,
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
                RoutePath.APPLYNOW_ADDITIONAL_CONTACT_DETAILS,
        ]);
    }
    showPreviousPage(): void {
        /* this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_VETERAN_MILATARY_SUMMARY,
        ]);*/
        this.queueService.back();
    }
    ngOnDestroy(): void {
        this.eventsSubscription?.unsubscribe();
    }
    submit() {
        this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_ADDITIONAL_CONTACT_DETAILS,
        ]);
    }
    previous() {
        this.queueService.back();
    }
}
