import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { IApplyNowState, IFromSummary } from '../../+state/apply-now.models';
import { IHouseHold, PageDirection } from '../../household/household-model';
import {Router} from "@angular/router";
import {RoutePath} from '../../../shared/route-strategies';
import CurrentSnapOrTanfJson from './current-snap-or-tanf-benefit.json';
import { ApplyNowIndividualDetailsCurrentSnapOrTanfBenefitsStrategy } from '../../../shared/route-strategies/apply-now/individual-details-current-snap-or-tanf-benefits';
import { ScreenQueueUtil } from '../individuals-medical-gatepost/individuals-medical-gatepost.path';

@Component({
  selector: 'compass-ui-current-snap-or-tanf-benefits',
  templateUrl: './current-snap-or-tanf-benefits.component.html',
  styleUrls: ['./current-snap-or-tanf-benefits.component.scss'],
  providers: [ApplyNowIndividualDetailsCurrentSnapOrTanfBenefitsStrategy]
})
export class CurrentSnapOrTanfBenefitsComponent implements OnInit {
    jsonData: any;
    currentSnapOrTanfForm: FormGroup | any;
    applyNowState!: IApplyNowState;
    householdPersons: IHouseHold[] = [];
    selectedUserids: any[] = [];
    alreadySelected: any[] = []; 
    householdMembers: any[] = [];
    currentSnapOrTanfMap: any[] = [];
    fromSummaryData!: IFromSummary;

    constructor(private fb: FormBuilder,
        private service: ApplyNowStoreService,
        private cd: ChangeDetectorRef,
        private router: Router,
        private queueService: ScreenQueueUtil) { }

    ngOnInit(): void {
        this.jsonData = CurrentSnapOrTanfJson;
        this.currentSnapOrTanfForm = this.fb.group({
            selectedUserids: this.fb.array([]),
        });

        this.service.getAppData().subscribe(d => {
            this.applyNowState = { ...d };
            this.householdPersons = this.applyNowState.houseHoldDetails?.houseHoldPersons || [];
            this.alreadySelected = [...this.applyNowState?.receivingTANF?.individualNumbers ?? []]; 
            this.fromSummaryData = this.service.getFromSummaryData() as IFromSummary;
            if (this.fromSummaryData && this.fromSummaryData.isFromAdd) {
                this.householdPersons = this.householdPersons.filter((person: IHouseHold, index: any) => !this.alreadySelected.includes(person.id));
            }
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
            CurrentSnapOrTanfJson['questionAnswers'] = [];
            this.householdMembers.forEach((member, index) => {
                if (this.selectedUserids.indexOf(member['id']) !== -1) {
                    let age = this.getAge(member['dateOfBirth']);
                    let gender = member['gender'].substring(0, 1);
                    let label = member['firstName'][0].toUpperCase() + member['firstName'].slice(1) + " " + member['lastName'][0].toUpperCase() + member['lastName'].slice(1) + " " + age;
                    let check = this.alreadySelected.indexOf(member['id']) !== -1 ? true : false;
                    CurrentSnapOrTanfJson['questionAnswers'].push({
                        id : member['id'],
                        isChecked: check,
                        label: label,
                        disabled: false
                    });
                }
            });
        }
        this.jsonData = CurrentSnapOrTanfJson;
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
        let userData;
        if (this.fromSummaryData && this.fromSummaryData.isFromAdd) {
            userData = user;
            user = user.filter((person: any, index: any) => person!==this.alreadySelected[index]);
        }
        user.forEach((ind:any) => {
             this.currentSnapOrTanfMap[ind]= false;
        });
        const updatedPageAction = {
            ...this.applyNowState?.houseHoldDetails.pageAction,
            currentSnapOrTanfMap: {
                ...this.applyNowState?.houseHoldDetails.pageAction
                    ?.currentSnapOrTanfMap,
                ...this.currentSnapOrTanfMap,
            },
            currentSnapOrTanfDirection: PageDirection.NEXT,
        };
        if(this.applyNowState?.houseHoldDetails){
            this.service.updateHouseHoldDetails({
                ...this.applyNowState?.houseHoldDetails,
                ...{ pageAction: updatedPageAction },
            });
        }
        let receivingTANF = {
            code: true,
            individualNumbers: user
        }
        if (userData) {
            receivingTANF.individualNumbers = userData;
        }
        this.service.updateCurrentSnapOrTanfBenefits(receivingTANF);
        this.router.navigate([
            RoutePath.APPLYNOW + 
            '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + 
            '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_SNAPORTANFBENEFITS]);
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