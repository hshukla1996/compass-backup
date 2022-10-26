 
export interface RefDataState {
  states: any[],
  counties: any[],
  schoolDistricts: any[],
  townships: any[],
  pays: any[],
  heatingSource: any[],
  electricCompanies: any[],
  countyOffice: any[],
  countyAddress: any[],
  countyEmail: any[],
  countyFax: any[],
  countyPhone: any[]
}

export const initialState: RefDataState = {
  states: [],
  counties: [],
  schoolDistricts: [],
  townships : [],
  pays: [],
  heatingSource: [],
  electricCompanies: [],
  countyOffice: [],
  countyAddress: [],
  countyEmail: [],
  countyFax: [],
  countyPhone: []
}
