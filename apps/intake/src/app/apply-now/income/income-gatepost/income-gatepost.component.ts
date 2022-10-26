import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IApplyNowState, Income, IncomeGatepostSelection, PageQueue } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowIncomeGatepostStrategy } from '../../../shared/route-strategies/apply-now/income-gatepost';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold } from '../../household/household-model';
import JsonData from './income-gatepost.json'
import { ScreenQueueRoutesIncomeSituations, ScreenQueueUtil } from './income-gatepost.path';

@Component({
    selector: "compass-ui-income-gatepost",
    templateUrl: "./income-gatepost.component.html",
    styleUrls: ["./income-gatepost.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    //providers: [ApplyNowHouseholdBenefitsStrategy],
})
export class IncomeGatepostComponent implements OnInit {
    jsonData: any;
    incomes: any[] = [];
    incomeGatepostForm: FormGroup | any;
    applyNowState!: IApplyNowState;
    pageQueue!: PageQueue;
    invalid!: boolean;
    programSelected: any[] = [];

    constructor(
        private cd: ChangeDetectorRef,
        private fb: FormBuilder,
        private service: ApplyNowStoreService,
        private router: Router,
        private queueService: ScreenQueueUtil,
    ) {
    }

    ngOnInit(): void {
        this.jsonData = JsonData;
        this.service.getAppData().subscribe((d) => {
            this.applyNowState = { ...d };
            this.cd.detectChanges();
            this.programSelected = this.service.getProgramSelection || [];

            const gpServices =
                this.applyNowState.houseHoldDetails.incomeSituations;
            
            JsonData.questionAnswers.forEach((service) => {
                if (gpServices.checked !== undefined && gpServices.checked.indexOf(service.value) > -1) {
                    service.isYesChecked = true;
                    service.isNoChecked = false;
                }
                else if (gpServices.unchecked !== undefined && gpServices.unchecked.indexOf(service.value) > -1) {
                    service.isYesChecked = false;
                    service.isNoChecked = true;
                }
            });

            this.jsonData = JsonData;

        });
        
    
    }

    showNextPage(selectedItems: any) {
        const storedHouseholdDetails = this.applyNowState?.houseHoldDetails;
        let selectedPaths: any = {
            checked: [],
            unchecked: []
        };
        selectedItems.questionAnswers.forEach((item: any) => {
            if (item.isYesChecked) {
                selectedPaths.checked.push(item.value);
            }
            else if (item.isNoChecked) {
                selectedPaths.unchecked.push(item.value);
            }
        });
        const clonedUpdatedPerson: IHouseHold[] = [];
        this.applyNowState?.houseHoldDetails.houseHoldPersons!.forEach((person: IHouseHold) => {
            const clonedPerson = { ...person };
            clonedUpdatedPerson.push(clonedPerson);
        });

        if (storedHouseholdDetails) {
            this.service.updateHouseHoldDetails({
                ...storedHouseholdDetails,
                ...{ incomeSituations: selectedPaths, ...{ houseHoldPersons: clonedUpdatedPerson } },
            });
        }

        if (selectedPaths.checked.length == 0) {
            selectedPaths = {
                ...selectedPaths, ...{ checked: [ScreenQueueRoutesIncomeSituations.noincome] }
            }
        }

        this.queueService.initDynamicRoutes(
            selectedPaths.checked,
            RoutePath.APPLYNOW_INCOME +
            "/" +
            RoutePath.APPLYNOW_INCOME_SUMMARY
        );
        this.queueService.navigateToPath();


    }

    showPreviousPage() {
        this.router.navigate([
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_INCOME 
        ]);
    }

}