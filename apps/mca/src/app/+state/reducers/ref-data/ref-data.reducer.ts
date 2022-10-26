import {Action, createReducer, on} from '@ngrx/store';

import {initialState} from '../../models/ref-data/ref-data.state'; 
import { loadedCounties, loadedCountyEmail, loadedCountyFax, loadedCountyOfficeAddresess, loadedCountyOffices, loadedCountyPhone, loadedElectricProvider, loadedHeatingSource, loadedPays, loadedSchoolDistricts, loadedStates, loadedTownship } from '../../actions/ref-data/ref-data.api-action';

const _refDataReducer = createReducer(
  initialState,
  on(loadedCounties, (state, action) => {
    
    return {
      ...state,
      counties: action.counties,
    };
  }),
  on(loadedStates, (state, action) => {
    return {
      ...state,
      states:action.states
    };
  }),
  on(loadedSchoolDistricts, (state, action) => {
    return {
      ...state,
      schoolDistricts: action.schoolDistricts
    };
  }),
  on(loadedTownship, (state, action) => {
    return {
      ...state,
      townships: action.townships
    };
  }),
  on(loadedPays, (state, action) => {
    return {
      ...state,
      pays: action.pays
    };
  }),
  on(loadedHeatingSource, (state, action) => {
    return {
      ...state,
      heatingSource: action.heatingSource
    };
  }),
  on(loadedElectricProvider, (state, action) => {
    return {
      ...state,
      electricCompanies: action.electricCompanies
    };
  }),
  on(loadedCountyOffices, (state, action) => {
    return {
      ...state,
      countyOffice: action.countyOffices
    };
  }),
  on(loadedCountyOfficeAddresess, (state, action) => {
    return {
      ...state,
      countyAddress: action.countyOfficeAddresss
    };
  }),
  on(loadedCountyEmail, (state, action) => {
    return {
      ...state,
      countyEmail: action.countyEmail
    };
  }),
  on(loadedCountyPhone, (state, action) => {
    return {
      ...state,
      countyPhone: action.countyPhone
    };
  }),
  on(loadedCountyFax, (state, action) => {
    return {
      ...state,
      countyFax: action.countyFax
    };
  })
);

export function refDataReducer(state: any | undefined, action: Action) {
  return _refDataReducer(state, action);
}

