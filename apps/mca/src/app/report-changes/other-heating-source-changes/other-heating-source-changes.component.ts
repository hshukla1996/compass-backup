import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Utility } from "../../shared/utilities/Utility";
import { IHouseHoldInformation, IIndividualInformation } from "../../+state/models/change-report/change-report.model";
import { ChangeReportStoreService } from "../../+state/store-service/change-report-store.service";
import { RefDataStoreService } from "../../+state/store-service/ref-data-store.service";
import { RoutePath } from "../../shared/route-strategies";
import { RefDataService } from "../../shared/services/ref-data.service";
import { ReportChangesService } from "../report-changes.service";

@Component({
    selector: "compass-ui-other-heating-source-changes",
    templateUrl: "./other-heating-source-changes.component.html",
    styleUrls: ["./other-heating-source-changes.component.scss"],
})
export class OtherHeatingSourceChangesComponent implements OnInit {
    otherSourceForm: FormGroup | any;
    householdInformation!: IHouseHoldInformation | any;
    individualInformation: IIndividualInformation[] | any;
    heatingSources: any[] = [];
    electricCompanies: any[] = [];
    displayError: boolean = false;
    selectedOptions: string[] = [];
    error: string = "None of the options are selected";
    constructor(private fb: FormBuilder, private router: Router, private refService: RefDataStoreService,
         private reportChangesService: ReportChangesService, private storeService: ChangeReportStoreService) { }

    ngOnInit(): void {
        this.refService.initHeatingSource().subscribe((c) => {
            this.heatingSources = c;
        });
        this.refService.initElectricProvider().subscribe((c) => {
            this.electricCompanies = c;
        })
        this.otherSourceForm = this.fb.group({
            provider: ['', [Validators.required]],
            heatingSourceType: ['', [Validators.required]],
            shutOffNoticeDate: ['', [Validators.required]],
            tellUsMore: [''],
            daysOfFuelLeft: ['', [Validators.required]],
            providerName: ['', [Validators.required]],
            accountNumber: ['', [Validators.required]],
            // otherProviderName:[''],
        });
        this.otherSourceForm.
            patchValue({
                shutOffNoticeDate: Utility.duetFormatDate(this.storeService.getILiheapCrisis()?.providers.shutOffNoticeDate),
                heatingSourceType: this.storeService.getILiheapCrisis()?.providers.heatingSource,
                tellUsMore: this.storeService.getILiheapCrisis()?.providers.description,
                daysOfFuelLeft: this.storeService.getILiheapCrisis()?.providers.daysOfFuelLeft,
                providerName: this.storeService.getILiheapCrisis()?.providers.providerName,
                provider: this.storeService.getILiheapCrisis()?.providers.providerName,
                accountNumber: this.storeService.getILiheapCrisis()?.providers.accountNumber
            });
        if (this.storeService.getILiheapCrisis()?.providers.isShutOffOrRanOutOfFuel) {
            this.selectedOptions.push('shut-off');
        }
        if (this.storeService.getILiheapCrisis()?.providers.heatingSourceNotWorking) {
            this.selectedOptions.push('not-working');
        }
        if (this.storeService.getILiheapCrisis()?.providers.haveShutOffNoticeOrWillRunOutOfFuel){
            this.selectedOptions.push('shut-off-notice');
        }
        this.otherSourceForm.get('heatingSourceType').valueChanges.subscribe((val: any) => {
            const options = ['1', '2', '4'];
            if (!options.includes(val)){
                this.selectedOptions = [];
                this.otherSourceForm.get("shutOffNoticeDate").clearValidators();
                this.otherSourceForm.get("daysOfFuelLeft").clearValidators();
            } else if (val === '2') {
                this.otherSourceForm
                    .get("daysOfFuelLeft")
                    .setValidators(Validators.required);
            } else {
                this.otherSourceForm
                    .get("shutOffNoticeDate")
                    .setValidators(Validators.required);
                    
            }
        });
    }
    
    isFieldValid(field: string): boolean {
        return (this.otherSourceForm.get(field).status !== 'VALID' && (this.otherSourceForm.get(field).dirty || this.otherSourceForm.get(field).touched))
    }

    onlyNumberAllowed(event: { which: any; keyCode: any }): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    errorMap(field: string) {
        const form = this.otherSourceForm;
        if (!this.isFieldValid(field)) {
            return ''

        }
        switch (field) {
            case "shutOffNoticeDate":
                if (form.get(field).errors?.required) {
                    return "No Shut off date is entered";
                }
                if (form.get(field).errors?.duetInvalidDate) {
                    return "duetInvalidDate"
                }
                break;
            case "providerName":
                if (form.get(field).errors?.required) {
                    return "No provider name selected from dropdown";
                }
                break;
            case "heatingSourceType":
                if (form.get(field).errors?.required) {
                    return "No Heating Source is selected from the dropdown";
                }
                break; 
            case "accountNumber":
                if (form.get(field).errors?.required) {
                    return "No account number is entered";
                }
                break;
            case "daysOfFuelLeft":
                if (form.get(field).errors?.required) {
                    return "No amount is entered";
                }
                break;

            default:
                return "";
                break;
        }
        return "";
    }

    onCheckboxChange(type: string) {
        if (this.selectedOptions.includes(type)) {
            this.selectedOptions = this.selectedOptions.filter(bill => bill != type);
        } else {
            this.selectedOptions.push(type)
        }
    }

    onBack() {
        this.router.navigate([RoutePath.ELECTRIC_HEATING_SOURCE_CHANGES]);
    }
    onNext() {
        const options = ['1', '2', '4'];
        if (options.includes(this.otherSourceForm.get('heatingSourceType').value) && !this.selectedOptions.length) {
            this.displayError = true;
        }
        this.reportChangesService.validateAllFormFields(this.otherSourceForm)
        if(!this.otherSourceForm.valid) {
            return
        }
        const updateOtherSource = {
            providerId: 1,
            providerName: this.otherSourceForm.get("provider").value,
            providerType: '',
            legalEntityId: '',
            serviceLocationId: '',
            isPrimary: true,
            isDirectPay: false,
            heatingSourceCode: '',
            heatingSource: this.otherSourceForm.get("heatingSourceType").value,
            individualIdLinkedToAccount: 1,
            paymentName: '',
            isShutOffOrRanOutOfFuel: this.selectedOptions.includes('shut-off'),
            haveShutOffNoticeOrWillRunOutOfFuel: this.selectedOptions.includes('not-working'),
            heatingSourceNotWorking: this.selectedOptions.includes('shut-off-notice'),
            shutOffNoticeDate: this.otherSourceForm.get("shutOffNoticeDate").value,
            daysOfFuelLeft: this.otherSourceForm.get("daysOfFuelLeft").value,
            phoneNumber: '',
            bestWayToContact: '',
            description: this.otherSourceForm.get("tellUsMore").value,
            accountNumber: this.otherSourceForm.get("accountNumber").value,
        }
        const updatedHeapDetails: any = {
            residentAddress: this.householdInformation?.residentAddress,
            individualInformation: this.householdInformation?.individualInformation,
            providers: updateOtherSource,

        }
        this.storeService.updateILiheapCrisis({
            ...updatedHeapDetails
        });
        this.router.navigate([RoutePath.LIHEAP_CRISIS_SUMMARY]);
    }
}
