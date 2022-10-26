import { ChangeDetectorRef, Injectable } from '@angular/core';
import {  Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RoutePath } from '../../shared/route-strategies';
import { AppState } from '../app.state';
import { IAddress, IChangeReportState, IHouseholdContactInformation, IHouseHoldInformation, IIndividualInformation, ILiheapCrisis, IShelterAndUtilitiesExpense } from '../models/change-report/change-report.model';
import { getChangeReport } from '../selectors/change-report.selector';
import * as ChangeReportActions from '../actions/change-report/change-report-page-actions'
@Injectable({
  providedIn: 'root'
})
export class ChangeReportStoreService {

  routePath: typeof RoutePath = RoutePath;
  changeReportState!: IChangeReportState;
  changeReportState$!: Observable<IChangeReportState | null>;
  private cd!: ChangeDetectorRef



  constructor(
    private store: Store<AppState>
  ) {
    this.changeReportState$ = this.store.select(getChangeReport);
    this.store.select(getChangeReport).subscribe(d => {
      this.changeReportState = { ...d };
      // this.cd.detectChanges();
    });
  }

  getAppData() {
    return this.store.select(getChangeReport);
  }

  getDescription() {
    return this.changeReportState.householdInformation?.resources
  }

  getHouseholdInformation() {
    return this.changeReportState.householdInformation;
  }

  getIndividualInformation() {
    return this.changeReportState.individualInformation;
  }

  getOtherCommunicationChanges() {
    return this.changeReportState.householdInformation?.otherCommunications
  }

  getCounty() {
    return this.changeReportState.county;
  }

  getShelterAndUtilityDetails() {
    return this.changeReportState.householdInformation?.shelterAndUtilitiesExpense
  }

  getHeatingCrisisDetails() {
    return this.changeReportState.householdInformation?.shelterAndUtilitiesExpense
  }
  getILiheapCrisis() {
    return this.changeReportState.liheapCrisis
  }
  // iliheap crisis
  updateILiheapCrisis(updatedILiheapDetails: ILiheapCrisis) {
    this.store.dispatch(
      ChangeReportActions.storeILiheapCrisis({
        liheapCrisis: updatedILiheapDetails
      })
    );
  }
  //update utilities
  updateUtilitiesDetails(updatedUtilityDetails: IShelterAndUtilitiesExpense) {
    this.store.dispatch(
      ChangeReportActions.storeshelterAndUtilitiesExpense({
        shelterAndUtilitiesExpense: updatedUtilityDetails
      })
    );
  }
  updateResourceDetails(updateProviderDetails: string) {
    this.store.dispatch(
      ChangeReportActions.storeProviderState({
        resources: updateProviderDetails
      })
    );
  }
  updateOtherCommunication(updateOtherCommunicationDetails: string) {
    this.store.dispatch(
      ChangeReportActions.storeOtherCommunicationState({
        otherCommunications: updateOtherCommunicationDetails
      })
    );
  }

  updateHouseHoldDetails(updatedHouseholdDetails: IHouseHoldInformation) {
    this.store.dispatch(
      ChangeReportActions.storeHouseholdDetails({
        householdInformation: updatedHouseholdDetails
      })
    );
  }

  updateResidentAddress(updatedResidentAddress: IAddress) {
    this.store.dispatch(
      ChangeReportActions.storeResidentAddress({
        residentAddress: updatedResidentAddress
      })
    );
  }

  updateMailingAddress(updatedMailingAddress: IAddress) {
    this.store.dispatch(
      ChangeReportActions.storeMailingAddress({
        mailingAddress: updatedMailingAddress
      })
    );
  }

  updateOtherIncomeChanges(otherIncomeDescription: string) {
    this.store.dispatch(
      ChangeReportActions.storeOtherIncomeChanges({
        otherIncomeDescription: otherIncomeDescription
      })
    );
  }
  updateOtherHouseholdChanges(otherHouseholdChanges: string) {
    this.store.dispatch(
      ChangeReportActions.storeOtherHouseholdChanges({
        otherHouseholdChanges: otherHouseholdChanges
      })
    );
  }

  updateIndividualInformation(updatedIndividualInformation: IIndividualInformation[]) {
    this.store.dispatch(
      ChangeReportActions.storeIndividualInformation({
        individualInformation: updatedIndividualInformation
      })
    );
  }

  updateSelectedChanges(selectedChanges: string[]) {
    this.store.dispatch(
      ChangeReportActions.storeSelectedChanges({
        selectedChanges: selectedChanges
      })
    );
  }

  updateSelectedIncomeChanges(selectedIncomeChanges: string[]) {
    this.store.dispatch(
      ChangeReportActions.storeSelectedIncomeChanges({
        selectedIncomeChanges: selectedIncomeChanges
      })
    );
  }

  updateSelectedHouseholdChanges(selectedHouseholdChanges: string[]) {
    this.store.dispatch(
      ChangeReportActions.storeSelectedHouseholdChanges({
        selectedHouseholdChanges: selectedHouseholdChanges
      })
    );
  }

  updateContactDetails(updatedContactDetails: IHouseholdContactInformation) {
    this.store.dispatch(
      ChangeReportActions.storeHouseholdContactInformation({
        householdContactInformation: updatedContactDetails
      })
    );
  }

  updateChangeReportState(changeReportState: IChangeReportState) {
    this.store.dispatch(
      ChangeReportActions.storeIChangeReportState({
        iChangeReportState: changeReportState
      })
    );
  }

  //TODO: Remove this method,for example only
  //To create service file, use nx generate @nrwl/angular:service filename
  updateAddress(){
    const address={
      streetAddressLine1:'test',
      streetAddressLine2:'ttest4'
    }
    this.store.dispatch(
      ChangeReportActions.storeResidentAddress({
        residentAddress: address,
      })
    );
  }
  getAddress(){
    const address=this.changeReportState.householdInformation?.residentAddress
    console.log('Address:',address)
  }
}
