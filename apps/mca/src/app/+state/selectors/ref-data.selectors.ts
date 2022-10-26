import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RefDataState } from '../models/ref-data/ref-data.state';
 // import { MyBenefitsState } from './ref-data.state';

export const REFDATA_COUNTY_NAME = 'refData';

export const getRefDataCounty = createFeatureSelector<RefDataState>(REFDATA_COUNTY_NAME);
export const getCounties = createSelector(getRefDataCounty, (state) => {
  return state.counties;
});
export const getStates = createSelector(getRefDataCounty, (state) => {
  return state.states;
});
export const getSchoolDistrict = createSelector(getRefDataCounty, (state) => {
  return state.schoolDistricts;
});
export const getTownship = createSelector(getRefDataCounty, (state) => {
  return state.townships;
});
export const getPays = createSelector(getRefDataCounty, (state) => {
  return state.pays;
});
export const getHeatingSource = createSelector(getRefDataCounty, (state) => {
  return state.heatingSource;
});
export const getElectricProvider = createSelector(getRefDataCounty, (state) => {
  return state.electricCompanies;
});
export const getCountyOffice = createSelector(getRefDataCounty, (state) => {
  return state.countyOffice;
});
export const getCountyOfficeAddress = createSelector(getRefDataCounty, (state) => {
  return state.countyAddress;
});
export const getCountyEmail = createSelector(getRefDataCounty, (state) => {
  return state.countyEmail;
});
export const getCountyFax = createSelector(getRefDataCounty, (state) => {
  return state.countyFax;
});
export const getCountyPhone = createSelector(getRefDataCounty, (state) => {
  return state.countyPhone;
});
export const getRefState = createSelector(getRefDataCounty, (state) => {
  return state;
});

