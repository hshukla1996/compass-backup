import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RoutePath } from "../../shared/route-strategies";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportChangesService } from '../report-changes.service';
import { ChangeReportStoreService } from '../../+state/store-service/change-report-store.service';
import { IHouseHoldInformation, IIndividualInformation } from '../../+state/models/change-report/change-report.model';

@Component({
    selector: "compass-ui-electric-heating-source-changes",
    templateUrl: "./electric-heating-source-changes.component.html",
    styleUrls: ["./electric-heating-source-changes.component.scss"],
})
export class ElectricHeatingSourceChangesComponent implements OnInit {
    heatingSourceChanges: string[] = [];
    heatingSourceForm: FormGroup | any;
    householdInformation!: IHouseHoldInformation | any;
    individualInformation: IIndividualInformation[] | any;
    constructor(private router: Router, private fb: FormBuilder, private reportChangesService: ReportChangesService, private storeService: ChangeReportStoreService) { }

    ngOnInit(): void {
        this.heatingSourceForm = this.fb.group({
            electricity: [''],
            notWorking: [''],
            notice: [''],
            noticeDate: [''],
            tellUsMore: ['']
        });

        this.heatingSourceForm.
            patchValue({
                electricity: this.storeService.getILiheapCrisis()?.providers.isShutOffOrRanOutOfFuel,
                notWorking: this.storeService.getILiheapCrisis()?.providers.heatingSourceNotWorking,
                notice: this.storeService.getILiheapCrisis()?.providers.haveShutOffNoticeOrWillRunOutOfFuel,
                noticeDate: this.storeService.getILiheapCrisis()?.providers.shutOffNoticeDate,
                tellUsMore: this.storeService.getILiheapCrisis()?.providers.description
            })
    }

    onBack() {
        this.router.navigate([RoutePath.HEATING_SOURCE_CRISIS]);
    }
    onNext() {
        const updateHeatingSource = {
            heatingSourceNotWorking: this.heatingSourceForm.get("notWorking").value,
            providerId: 1,
            providerName: '',
            providerType: '',
            accountNumber: '1234',
            legalEntityId: '',
            serviceLocationId: '',
            isPrimary: true,
            isDirectPay: false,
            heatingSourceCode: '',
            heatingSource: '',
            individualIdLinkedToAccount: 1,
            paymentName: '',
            isShutOffOrRanOutOfFuel: this.heatingSourceForm.get("electricity").value,
            haveShutOffNoticeOrWillRunOutOfFuel: this.heatingSourceForm.get("notice").value,
            shutOffNoticeDate: this.heatingSourceForm.get("noticeDate").value,
            daysOfFuelLeft: 1,
            phoneNumber: '',
            bestWayToContact: '',
            description: this.heatingSourceForm.get("tellUsMore").value,
        }
        const updatedHeapDetails: any = {
            residentAddress: this.householdInformation?.residentAddress,
            individualInformation: this.householdInformation?.individualInformation,
            providers: updateHeatingSource,

        }
        this.storeService.updateILiheapCrisis({
            ...updatedHeapDetails
        });
        this.router.navigate([RoutePath.OTHER_HEATING_SOURCE_CHANGES])
    }

    onCheckboxChange(type: string) {
        if (this.heatingSourceChanges.includes(type)) {
            this.heatingSourceChanges = this.heatingSourceChanges.filter(t => t != type);
        } else {
            this.heatingSourceChanges.push(type)
        }
    }
}
