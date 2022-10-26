import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { IApplyNowState } from '../../+state/apply-now.models';
import { IHouseHold, PageDirection } from '../../household/household-model';
import { Router, ActivatedRoute } from '@angular/router';
import {RoutePath} from '../../../shared/route-strategies';
import { UtilService } from "../../../shared/services/util.service";
import { ScreenQueueUtil } from '../individuals-medical-gatepost/individuals-medical-gatepost.path';
import JsonData from './prior-tanf-or-cash-assistance.json'

@Component({
  selector: 'compass-ui-prior-tanf-or-cash-assistance',
  templateUrl: './prior-tanf-or-cash-assistance.component.html',
  styleUrls: ['./prior-tanf-or-cash-assistance.component.scss'],
})
export class PriorTanfOrCashAssistanceComponent implements OnInit {
    jsonData: any;
    alreadySelected: any[] = [];
    priorTanfOrCashAssistanceForm: FormGroup | any;
    applyNowState!: IApplyNowState;
    householdPersons: IHouseHold[] = [];
    selectedUserids: any[] = [];
    householdMembers: any[] = [];

     constructor(private fb: FormBuilder,
        private service: ApplyNowStoreService,
        private cd: ChangeDetectorRef,
        private router: Router,
        private queueService: ScreenQueueUtil) { }

    ngOnInit(): void {
        this.jsonData = JsonData;
        this.priorTanfOrCashAssistanceForm = this.fb.group({
            selectedUserids: this.fb.array([]),
        });

        this.service.getAppData().subscribe(d => {
            this.applyNowState = { ...d };
            this.householdPersons = this.applyNowState.houseHoldDetails?.houseHoldPersons || [];
            this.alreadySelected = [...this.applyNowState?.receivedTANFInPasts6Months?.individualNumbers ?? []]; 
            this.cd.detectChanges();
        });

        if (this.applyNowState.houseHoldDetails) {
            this.householdMembers = this.householdPersons;
            this.householdMembers.forEach((ind) => {
                if (ind) {
                    if (this.selectedUserids.indexOf(parseInt(ind)) === -1) {
                        this.selectedUserids.push(parseInt(ind.id));
                    }
                }
            });
        }

        if (this.selectedUserids.length > 0) {
            JsonData['questionAnswers'] = [];
            this.householdMembers.forEach((member, index) => {
                if (this.selectedUserids.indexOf(member['id']) !== -1) {
                    let age = this.getAge(member['dateOfBirth']);
                    let gender = member['gender'].substring(0, 1);
                    let label = member['firstName'][0].toUpperCase() + member['firstName'].slice(1) + " " + member['lastName'][0].toUpperCase() + member['lastName'].slice(1) + " " + age;
                    let check = this.alreadySelected.indexOf(member['id']) !== -1 ? true : false;
                    JsonData['questionAnswers'].push({
                        id : member['id'],
                        isChecked: check,
                        label: label,
                        disabled: false
                    });
                }
            });
        }
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

    showNextPage(user: any) {
        let receivedTANFInPasts6Months = {
            code: true,
            individualNumbers: user
        }
        this.service.updatePriorTanfOrCashAssistance(receivedTANFInPasts6Months);
        this.queueService.nextPath();
    }

    showPreviousPage() {
        if (this.queueService.state.pageQueue.currentPageId > 0) {
            this.queueService.backPath();
        }
        else {
            this.router.navigate([
            RoutePath.APPLYNOW + 
            '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + 
            '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_INDIVIDUALSMEDICALGATEPOST]);
        }
    }
}