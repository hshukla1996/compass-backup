import { createAction, props } from "@ngrx/store";


export const loadedCounties = createAction(
    '[App page] Loaded Counties',
    props<{ counties: any }>()
);

export const loadedCountiesFailure = createAction(
    '[App page] Loaded Counties Failure',
    props<{ error: string }>()
);
export const loadedStates = createAction(
    '[App page] Loaded States',
    props<{ states: any }>()
);

export const loadedStatesFailure = createAction(
    '[App page] Loaded States Failure',
    props<{ error: string }>()
);

export const loadedSchoolDistricts = createAction(
    '[App page] Loaded SchoolDistricts',
    props<{ schoolDistricts: any }>()
);

export const loadedSchoolDistrictsFailure = createAction(
    '[App page] Loaded SchoolDistricts Failure',
    props<{ error: string }>()
);

export const loadedTownship = createAction(
    '[App page] Loaded Township',
    props<{ townships: any }>()
);

export const loadedTownshipFailure = createAction(
    '[App page] Loaded Township Failure',
    props<{ error: string }>()
);

export const loadedPays = createAction(
    '[App page] Loaded Pays',
    props<{ pays: any }>()
);

export const loadedPayFailure = createAction(
    '[App page] Loaded Pay Failure',
    props<{ error: string }>()
);

export const loadedHeatingSource = createAction(
    '[App page] Loaded HeatingSource',
    props<{ heatingSource: any }>()
);

export const loadedHeatingSourceFailure = createAction(
    '[App page] Loaded HeatingSource Failure',
    props<{ error: string }>()
);

export const loadedElectricProvider = createAction(
    '[App page] Loaded ElectricProvider',
    props<{ electricCompanies: any }>()
);

export const loadedElectricProviderFailure = createAction(
    '[App page] Loaded ElectricProvider Failure',
    props<{ error: string }>()
); 

export const loadedCountyOffices = createAction(
    '[App page] Loaded County Offices',
    props<{ countyOffices: any }>()
);

export const loadedCountyOfficesFailure = createAction(
    '[App page] Loaded County Offices Failure',
    props<{ error: string }>()
);

export const loadedCountyOfficeAddresess = createAction(
    '[App page] Loaded County Office Addresses',
    props<{ countyOfficeAddresss: any }>()
);

export const loadedCountyOfficeAddresssFailure = createAction(
    '[App page] Loaded County Office Addresses Failure',
    props<{ error: string }>()
);

export const loadedCountyEmail = createAction(
    '[App page] Loaded CountyEmail',
    props<{ countyEmail: any }>()
);

export const loadedCountyEmailFailure = createAction(
    '[App page] Loaded County Email Failure',
    props<{ error: string }>()
);
export const loadedCountyFax = createAction(
    '[App page] Loaded County Fax',
    props<{ countyFax: any }>()
);

export const loadedCountyFaxFailure = createAction(
    '[App page] Loaded County Fax Failure',
    props<{ error: string }>()
);
export const loadedCountyPhone = createAction(
    '[App page] Loaded County Phone',
    props<{ countyPhone: any }>()
);

export const loadedCountyPhoneFailure = createAction(
    '[App page] Loaded County Phone Failure',
    props<{ error: string }>()
);