import { createAction, props } from '@ngrx/store';
export const loadCounties = createAction('[store] Get Counties');;
export const loadStates = createAction('[store] Get States');
export const loadSchoolDistricts = createAction('[store] Get School Districts');
export const loadTownship = createAction('[store] Get township');
export const loadPays = createAction('[store] Get Pays');
export const loadHeatingSource = createAction('[store] Get HeatingSource');
export const loadElectricProvider = createAction('[store] Get ElectricProvider');
export const loadCountyOffice = createAction('[App page] Load County Office');
export const loadCountyOfficeAddress = createAction('[App page] Load County Office Address');
export const loadCountyEmail = createAction('[App page] Load County Email');
export const loadCountyPhone = createAction('[App page] Load County Phone');
export const loadCountyFax = createAction('[App page] Load County Fax');




