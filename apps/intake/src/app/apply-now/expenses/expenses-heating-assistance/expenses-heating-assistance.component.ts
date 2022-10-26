import {
    ChangeDetectorRef,
    Component,
    Directive,
    EventEmitter,
    OnInit,
    Output,
} from "@angular/core";
import {
    FormGroup,
    FormControl,
    ReactiveFormsModule,
    FormBuilder,
    Validators,
    AbstractControl,
    FormArray,
} from "@angular/forms";
import { AppStoreService } from "../../../app-store-service";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { IApplyNowState } from "../../+state/apply-now.models";
import { NavigationEnd, Router } from "@angular/router";
import { RoutePath } from "../../../shared/route-strategies";
import { IHouseHold, IHouseHoldDetails } from "../../household/household-model";
import { LiheapService } from "./liheap.service";

@Component({
    selector: "compass-ui-expenses-heating-assistance",
    templateUrl: "./expenses-heating-assistance.component.html",
    styleUrls: ["./expenses-heating-assistance.component.scss"],
})
export class ExpensesHeatingAssistanceComponent implements OnInit {
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    heatingAssistanceForm: FormGroup | any;
    heatingSource: any;
    providerName: any;
    needElectricity: any;
    applyNowState: IApplyNowState | undefined;
    routePath: typeof RoutePath = RoutePath;
    heatingSources: any;
    heatingAssistanceData: any;


    electricCompaniesList = [
        {
            key: "2325",
            value: "ADAMS ELECTRIC COOPERATIVE INC",
        },
        {
            key: "2731906",
            value: "First Energy Corp",
        },
        {
            key: "2309",
            value: "PPL Electric Utilities Corp",
        },
        {
            key: "2320",
            value: "UGI UTILITIES INC",
        },
    ];

    constructor(
        private fb: FormBuilder,
        private appService: AppStoreService,
        private cd: ChangeDetectorRef,
        private service: ApplyNowStoreService,
        private router: Router,
        private liheapService: LiheapService
    ) { }

    ngOnInit(): void {
        this.heatingAssistanceForm = this.fb.group({
            isWeatherizationSelected: [""],
            mainHeatingSource: ["", Validators.required],
            utilityCompany: ["", Validators.required],
            otherUtilityCompanyName: [""],
            providerNumber: [""],
            heatingNeedElectricity: ["", Validators.required],
            providerPayment: ["", Validators.required],
            electricCompaniesList: [""],
            otherProviderNameVal: [""],
            otherAccountNumber: [""],
            accountPaidInName: ["", Validators.required],
            otherAccountHolderName: [""],
            otherHeatingSource: [""],
        });
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        //this.applyNowState = { ...this.houseHoldDetails };
        this.houseHoldPersons = this.houseHoldDetails
            .houseHoldPersons as IHouseHold[];
        this.appService.getHeatingSource().subscribe((c) => {
            this.heatingSource = c;
            this.cd.detectChanges();
        });

        this.appService.getProviderName().subscribe((c) => {
            this.providerName = c;
            this.cd.detectChanges();
            console.log(this.providerName);
        });
        // this.appService.getHeatingSourcesprovider().subscribe((hs) => {
        //     this.heatingSources = hs;
        //     console.log("data--",hs)
        //     this.cd.detectChanges();
        // });
        this.appService.getNeedElectricity().subscribe((c) => {
            this.needElectricity = c;
            this.cd.detectChanges();
            console.log(this.needElectricity);
        });
        setTimeout(() => {
            this.heatingAssistanceForm.patchValue({
                ...this.houseHoldDetails.expenses,

            });

            this.heatingAssistanceForm.get("isWeatherizationSelected").patchValue(this.houseHoldDetails.expenses?.isWeatherizationSelected);
            console.log("isweatherization")
            // if(this.houseHoldDetails.expenses?.isWeatherizationSelected === 'Y'){
            console.log(this.heatingAssistanceForm
                .get("isWeatherizationSelected"));

            //   }

        }, 500);
        this.cd.detectChanges();
        this.getLiheapServiceData()

    }

    getLiheapServiceData() {
        console.log("county..", this.houseHoldDetails.Household.applicantAddress?.county)
        const dw = {

            "county": this.houseHoldDetails.Household.applicantAddress?.county,
            "heatingSource": this.heatingAssistanceForm.get("mainHeatingSource").value,
        }
        
        console.log("heating", dw)
        this.liheapService.getDrinkingWater(dw).subscribe({
            next: (result:any) => {
                console.log("heatingdata", result)
                this.heatingAssistanceData! =result['providers']
            }
        })

    }

    isFieldValid(field: string): boolean {
        const formField = this.heatingAssistanceForm.get(field);
        return (
            formField &&
            this.heatingAssistanceForm.get(field).status !== "VALID" &&
            this.heatingAssistanceForm.get(field).touched
        );
    }

    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }

        switch (field) {
            case "mainHeatingSource":
                if (
                    this.heatingAssistanceForm.get("mainHeatingSource").errors
                        .required
                ) {
                    return "No heating source is selected";
                }
                break;
            case "utilityCompany":
                if (
                    this.heatingAssistanceForm.get("utilityCompany").errors
                        .required
                ) {
                    return "No utility company or fuel dealer is entered";
                }
                break;
            case "heatingNeedElectricity":
                if (
                    this.heatingAssistanceForm.get("heatingNeedElectricity")
                        .errors.required
                ) {
                    return "The question is not answered ";
                }
                break;
            case "providerPayment":
                if (
                    this.heatingAssistanceForm.get("providerPayment").errors
                        .required
                ) {
                    return "The question is not answered";
                }
                break;
            case "electricCompaniesList":
                if (
                    this.heatingAssistanceForm.get("electricCompaniesList")
                        .errors.required
                ) {
                    return "No electric provider is selected";
                }
                break;
            case "accountPaid":
                if (
                    this.heatingAssistanceForm.get("accountPaid").errors
                        .required
                ) {
                    return "No name is selected";
                }
                break;
            case "accountPaidInName":
                if (
                    this.heatingAssistanceForm.get("accountPaidInName").errors
                        .required
                ) {
                    return "No name is selected";
                }
                break;
            default:
                return "";
                break;
        }
        return "";
    }

    onSubmit(): boolean {
        this.service.validateAllFormFields(this.heatingAssistanceForm);

        if (this.heatingAssistanceForm.valid) {
            console.log("isWeatherizationSelected")
            console.log(
                this.heatingAssistanceForm.get("isWeatherizationSelected")
            );

            const updatedExpenses = {
                ...this.houseHoldDetails.expenses,
                isWeatherizationSelected: this.heatingAssistanceForm.get(
                    "isWeatherizationSelected"
                ).value,
                mainHeatingSource:
                    this.heatingAssistanceForm.get("mainHeatingSource").value,
                utilityCompany:
                    this.heatingAssistanceForm.get("utilityCompany").value,
                otherUtilityCompanyName: this.heatingAssistanceForm.get(
                    "otherUtilityCompanyName"
                ).value,
                providerNumber:
                    this.heatingAssistanceForm.get("providerNumber").value,
                heatingNeedElectricity: this.heatingAssistanceForm.get(
                    "heatingNeedElectricity"
                ).value,
                providerPayment:
                    this.heatingAssistanceForm.get("providerPayment").value,
                electricityProvider: this.heatingAssistanceForm.get(
                    "electricCompaniesList"
                ).value,
                otherProviderName: this.heatingAssistanceForm.get(
                    "otherProviderNameVal"
                ).value,
                otherAccountNumber:
                    this.heatingAssistanceForm.get("otherAccountNumber").value,
                accountPaidInName:
                    this.heatingAssistanceForm.get("accountPaidInName").value,
                otherAccountHolderName: this.heatingAssistanceForm.get(
                    "otherAccountHolderName"
                ).value,
            };
            if (this.houseHoldDetails) {
                this.service.updateHouseHoldDetails({
                    ...this.houseHoldDetails,
                    ...{ expenses: updatedExpenses },
                });
            }
            if (this.heatingAssistanceForm.valid) {
                this.router.navigate([
                    RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_EXPENSES +
                    "/" +
                    RoutePath.APPLYNOW_EXPENSESHEATINGGATEPOST,
                ]);
            } else {
                return false;
            }
            return true;
        } else {
            return false;
        }
    }

    previousRoute(): void {
        this.router.navigate([
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_EXPENSES +
            "/" +
            RoutePath.APPLYNOW_EXPENSESENROLLMENT,
        ]);
    }

    OtherUtilityInfo: boolean = false;
    utilityCompany: any = [];
    showOtherUtilityCompany(event: any) {
        if ((this.utilityCompany.values = event.target.value == "other")) {
            this.OtherUtilityInfo = true;
        } else {
            this.OtherUtilityInfo = false;
        }
    }

    providerPamentSentTo: boolean = false;
    showPaymentSentTo() {
        this.providerPamentSentTo = true;
        this.heatingAssistanceForm
            .get("electricCompaniesList")
            .setValidators(Validators.required);
    }
    hidePaymentSentTo() {
        this.heatingAssistanceForm.get("electricCompaniesList").value = "";
        this.heatingAssistanceForm.get("otherProviderNameVal").value = "";
        this.heatingAssistanceForm.get("otherAccountNumber").value = "";
        this.heatingAssistanceForm
            .get("electricCompaniesList")
            .clearValidators();
        this.providerPamentSentTo = false;
    }

    otherProviderName: boolean = false;
    otherElectricProviderName: any = [];
    showOtherElectricProviderName(event: any) {
        if (
            (this.otherElectricProviderName.values =
                event.target.value == "other")
        ) {
            this.otherProviderName = true;
        } else {
            this.otherProviderName = false;
        }
    }

    otherAccountPaid: boolean = false;
    needOtherAccountPaid: any = [];
    showOtherAccountPaid(event: any) {
        if (
            (this.needOtherAccountPaid.values = event.target.value == "other")
        ) {
            this.otherAccountPaid = true;
        } else {
            this.otherAccountPaid = false;
        }
    }
}
