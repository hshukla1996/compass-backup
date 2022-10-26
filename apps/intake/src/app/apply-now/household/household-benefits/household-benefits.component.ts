import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { HouseholdFormDataService } from "../services/household-form-data.service";

import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ApplyNowHouseholdBenefitsStrategy } from "../../../shared/route-strategies/apply-now/householdBenefits";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import {
    IApplyNowState,
    PageQueue,
    Programs,
} from "../../+state/apply-now.models";
import {
    IHouseHold,
    IHouseholdBenefitsDetails,
    IHouseHoldDetails,
} from "../household-model";
import { ScreenQueueUtil } from "../../../shared/services/screen_queue_util.service";
import { RoutePath } from "../../../shared/route-strategies";

@Component({
    selector: "compass-ui-household-benefits",
    templateUrl: "./household-benefits.component.html",
    styleUrls: ["./household-benefits.component.scss"],
    providers: [ApplyNowHouseholdBenefitsStrategy],
})
export class HouseholdBenefitsComponent implements OnInit {
    householdBenefitForm: FormGroup | any;
    applyNowState!: IApplyNowState;
    sevicesselected: any[] = [];
    pageQueue!: PageQueue;
    individuals: IHouseHold[] = [];
    storedData: any;
    errorMessage = "Select a Service";
    displayError = false;
    noOfAdults: any;
    noOfChildren: any;
    maxChildren: any;
    applyNowLtcStatus: any;
    /*
    CA = "CA",
    HS = "HS",
    FS = "FS",
    BL = "BL",
    LH = "LH",
    CI = "CI",
    HA = "HA",
    ES = "ES",
    CAR ="CAR",
    ECA ="ECA",
    LHP ="LHP",
    LN = "LN",
    LI = "LI",
    WN = "WN",
    WNR = "WNR",
    HC = "HC",
    MAR ="MAR",
    MCR = "MCR",
    MI = "MI"
   */
    householdBenefitFormData = {
        questionText:
            "Select which benefits one or more people in your household want to apply for.",
        isRequired: true,
        requiredText: "Please select at least one",
        subHeading: "Select all that apply.",
        toolTip: "",
        questionAnswers: [
            {
                id: Programs.HC,
                label: "Health Care Coverage",
                helpText:
                    "Includes Childrens Health Insurance Program (CHIP), Medical Assistance, Medicaid for Former Foster Care Youth, Mental Health/Substance Abuse, Pennsylvania's Health Insurance Marketplace (Pennie).",
                link: {
                    href: "https://www.dhs.pa.gov/healthchoices/Pages/HealthChoices.aspx",
                    label: "More about Health Care Coverage",
                },
                isChecked: false,
            },
            {
                id: Programs.FS,
                label: "Food Assistance",
                helpText:
                    "Supplemental Nutrition Assistance Program (SNAP) formerly known as Food Stamps helps families pay for food.",
                link: {
                    href: "https://www.dhs.pa.gov/Services/Assistance/Pages/SNAP.aspx",
                    label: "More about Food Assistance",
                },

                isChecked: false,
            },
            {
                id: Programs.CA,
                label: "Cash Assistance",
                helpText:
                    "Temporary Assistance for Needy Families (TANF), State Blind Pension, and Refugee Cash Assistance give cash help to people or families in need.",
                link: {
                    href: "https://www.dhs.pa.gov/Services/Assistance/Pages/Cash-Assistance.aspx",
                    label: "More about Cash Assistance",
                },
                isChecked: false,
            },
            {
                id: Programs.CI,
                label: "Help With Paying for Child Care",
                helpText:
                    "Child Care Works program helps families pay for child care.",
                link: {
                    href: "https://www.dhs.pa.gov/Services/Children/Pages/Child-Care-Works-Program.aspx",
                    label: "More about Child Care Works",
                },
                isChecked: false,
                disabled: true,
            },
            {
                id: Programs.BL,
                label: "Free or Reduced-Price School Meals",
                helpText:
                    "National School Lunch Program (NSLP) gives low-cost or free school meals to children who qualify.\n" +
                    "\n By selecting this, you are applying for the current school year {schoolyear-schoolyear}. You must apply after {open.enrollmentdate} if you want to apply for next school year.",
                link: {
                    href: "https://fns-prod.azureedge.us/sites/default/files/cn/NSLPFactSheet.pdf",
                    label: "More about Free or Reduced-Price School Meals",
                },
                isChecked: false,
                disabled: true,
            },
            {
                id: Programs.LH,
                label: "Help With Paying your Heating Bill",
                helpText:
                    "Low-Income Home Energy Assistance Program (LIHEAP) helps pay your energy bills.",
                link: {
                    href: "https://www.dhs.pa.gov/Services/Assistance/Pages/LIHEAP.aspx",
                    label: "More about LIHEAP",
                },
                isChecked: false,
            },
            {
                id: Programs.LW,
                label: "Help With Paying Your Water Bill",
                helpText:
                    "Low Income Household Water Assistance Program (LIHWAP) helps you pay overdue water bills (including drinking water and wastewater).",
                link: {
                    href: "https://www.dhs.pa.gov/Services/Assistance/Pages/LIHWAP.aspx",
                    label: "More about LIHWAP",
                },
                isChecked: false,
            },
            {
                id: Programs.WN,
                label: "Long-Term Living Services in a Home or Community-Based Facility",
                helpText:
                    "Helps older adults and people with disabilities over the age of 18 live on their own. This includes people with Traumatic Brain Injuries (TBI).",
                link: {
                    href: "https://www.dhs.pa.gov/Services/Disabilities-Aging/Pages/Alternatives-to-Nursing-Homes.aspx",
                    label: "More about Home and Community-Based Services",
                },
                isChecked: false,
                disabled: false
            },
        ],
    };

    constructor(
        public householdFormDataService: HouseholdFormDataService,
        private fb: FormBuilder,
        private service: ApplyNowStoreService,
        private router: Router,
        private routingStratagy: ApplyNowHouseholdBenefitsStrategy,
        private queueService: ScreenQueueUtil,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.householdBenefitForm = this.fb.group({
            sevicesselected: this.fb.array([]),
        });

        this.service.getAppData().subscribe((d) => {
            this.applyNowState = { ...d };
            this.sevicesselected = [
                ...(this.applyNowState?.programSelection?.programs ?? []),
            ];
            for (const selectedService of this.householdBenefitFormData[
                "questionAnswers"
            ]) {
                for (const index in this.sevicesselected) {
                    if (selectedService["id"] === this.sevicesselected[index]) {
                        selectedService["isChecked"] = true;
                    }
                    else if (this.sevicesselected[index] === "HA" && selectedService["id"] === "HC") {
                        if (!this.sevicesselected.includes("HC")) {
                            this.sevicesselected.push("HC");
                        }
                        selectedService["isChecked"] = true;
                    }
                    else if (this.sevicesselected[index] === "ES" && selectedService["id"] === "FS") {
                        if (!this.sevicesselected.includes("FS")) {
                            this.sevicesselected.push("FS");
                        }
                        selectedService["isChecked"] = true;
                    }
                }
            }
            this.individuals =
                this.applyNowState.houseHoldDetails.houseHoldPersons ?? [];
            this.applyNowLtcStatus =
                this.applyNowState.houseHoldDetails.areYouWantToApplyLTC;
            this.noOfChildren = this.individuals.filter((ind) => {

                return this.getAge(ind.dateOfBirth) < 19 && ind.IsThisIndividualOutsideHousehold !== "Y";
            }).length;

            if (this.noOfChildren > 0) {
                this.householdBenefitFormData.questionAnswers[3].disabled =
                    false;
            }
            else {
                this.householdBenefitFormData.questionAnswers[3].isChecked = false;
            }
            this.maxChildren = this.individuals.filter((ind) => {
                return this.getAge(ind.dateOfBirth) < 22 && ind.IsThisIndividualOutsideHousehold !== "Y";
            }).length;
            if (this.maxChildren > 0) {
                this.householdBenefitFormData.questionAnswers[4].disabled =
                    false;
            }
            else {
                this.householdBenefitFormData.questionAnswers[4].isChecked = false;
            }
            this.noOfAdults = this.individuals.filter((ind) => {
                return this.getAge(ind.dateOfBirth) > 17 && ind.IsThisIndividualOutsideHousehold !== "Y";
            }).length;
            if (this.noOfAdults == 0) {
                this.householdBenefitFormData.questionAnswers[7].disabled = true;
                this.householdBenefitFormData.questionAnswers[7].isChecked = false;
            }
            this.cd.detectChanges();
        });
    }

    getAge(dateString: any): any {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }

    onCheckboxChange(value: string, e: any) {
        if (e.checked) {
            this.sevicesselected = this.sevicesselected.concat([value]);
        } else {
            for (let i = 0; i < this.sevicesselected.length; i++) {
                if (this.sevicesselected[i] === value) {
                    this.sevicesselected.splice(i, 1);
                }
            }
        }
    }

    findIndex(value: any) {
        return this.sevicesselected.findIndex((d) => d === value);
    }

    showNextPage(sevicesselected: any) {
        if (sevicesselected.includes("HA")) {
            sevicesselected = sevicesselected.filter((program: any) => program !== "HA");
        }
        if (sevicesselected.includes("ES")) {
            sevicesselected = sevicesselected.filter((program: any) => program !== "ES");
        }

        this.service.updateHouseholdServicesSelected(sevicesselected);

        this.queueService.initDynamicRoutes(
            sevicesselected,
            RoutePath.APPLYNOW_HOUSEHOLD +
                "/" +
                RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDGATEPOST,
            "householdBenfits"
        );
        this.queueService.navigateToPath();
    }
    showPreviousPage() {

        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_HOUSEHOLD +
                "/" +
                RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDLTCNURSING,
        ]);
    }
}
