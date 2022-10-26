import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as RefPageActions from '../actions/ref-data/ref-data.page-action';
import * as RefSelectors from '../selectors/ref-data.selectors'
import { RefDataState } from '../models/ref-data/ref-data.state';
import { AppState } from '../app.state';
import { Observable, of } from 'rxjs';
import { getRefState } from '../selectors/ref-data.selectors';



@Injectable({
  providedIn: 'root'
})
export class RefDataStoreService {


  appState!: RefDataState;

  constructor(private refStore: Store<RefDataState>) 
  { 
   
    
    this.refStore.select(getRefState).subscribe(d => {
      this.appState = { ...d };
      // this.cd.detectChanges();
    });
  }
  initCounties(){
    if (this.appState.counties !== undefined && this.appState.counties !== null && this.appState.counties.length>0)
    {
      return of(this.appState.counties);
    }
    this.refStore.dispatch(RefPageActions.loadCounties());
    return this.refStore.pipe(select(RefSelectors.getCounties));
  }
  initStates()
  {
    if (this.appState.states !== undefined && this.appState.states !== null && this.appState.states.length > 0) {
      return of(this.appState.states);
    }
    this.refStore.dispatch(RefPageActions.loadStates());
    return this.refStore.pipe(select(RefSelectors.getStates));
  }

  initSchoolDistricts() {
    if (this.appState.schoolDistricts !== undefined && this.appState.schoolDistricts !== null && this.appState.schoolDistricts.length > 0) {
      return of(this.appState.schoolDistricts);
    }
    this.refStore.dispatch(RefPageActions.loadSchoolDistricts());
    return this.refStore.pipe(select(RefSelectors.getSchoolDistrict));
  }

  initCountyOffices() {
    if (this.appState.countyOffice !== undefined && this.appState.countyOffice !== null && this.appState.countyOffice.length > 0) {
      return of(this.appState.countyOffice);
    }
    this.refStore.dispatch(RefPageActions.loadCountyOffice());
    return this.refStore.pipe(select(RefSelectors.getCountyOffice));
  }

  initCountyOfficeAddress() {
    if (this.appState.countyAddress !== undefined && this.appState.countyAddress !== null && this.appState.countyAddress.length > 0) {
      return of(this.appState.countyAddress);
    }
    this.refStore.dispatch(RefPageActions.loadCountyOfficeAddress());
    return this.refStore.pipe(select(RefSelectors.getCountyOfficeAddress));
  }

  initCountyEmail() {
    if (this.appState.countyEmail !== undefined && this.appState.countyEmail !== null && this.appState.countyEmail.length > 0) {
      return of(this.appState.countyEmail);
    }
    this.refStore.dispatch(RefPageActions.loadCountyEmail());
    return this.refStore.pipe(select(RefSelectors.getCountyEmail));
  }

  initCountyFax() {
    if (this.appState.countyFax !== undefined && this.appState.countyFax !== null && this.appState.countyFax.length > 0) {
      return of(this.appState.countyFax);
    }
    this.refStore.dispatch(RefPageActions.loadCountyFax());
    return this.refStore.pipe(select(RefSelectors.getCountyFax));
  }
  initCountyPhone() {
    if (this.appState.countyPhone !== undefined && this.appState.countyPhone !== null && this.appState.countyPhone.length > 0) {
      return of(this.appState.countyPhone);
    }
    this.refStore.dispatch(RefPageActions.loadCountyPhone());
    return this.refStore.pipe(select(RefSelectors.getCountyPhone));
  }

  initTownships() {
    if (this.appState.townships !== undefined && this.appState.townships !== null && this.appState.townships.length > 0) {
      return of(this.appState.townships);
    }
    this.refStore.dispatch(RefPageActions.loadTownship());
    return this.refStore.pipe(select(RefSelectors.getTownship));
  }

  initPays() {
    if (this.appState.pays !== undefined && this.appState.pays !== null && this.appState.pays.length > 0) {
      return of(this.appState.pays);
    }
    this.refStore.dispatch(RefPageActions.loadPays());
    return this.refStore.pipe(select(RefSelectors.getPays));
  }

  initHeatingSource() {
    if (this.appState.heatingSource !== undefined && this.appState.heatingSource !== null && this.appState.heatingSource.length > 0) {
      return of(this.appState.heatingSource);
    }
    this.refStore.dispatch(RefPageActions.loadHeatingSource());
    return this.refStore.pipe(select(RefSelectors.getHeatingSource));
  }

  initElectricProvider() {
    if (this.appState.electricCompanies !== undefined && this.appState.electricCompanies !== null && this.appState.electricCompanies.length > 0) {
      return of(this.appState.electricCompanies);
    }
    this.refStore.dispatch(RefPageActions.loadElectricProvider());
    return this.refStore.pipe(select(RefSelectors.getElectricProvider));
  }

}
