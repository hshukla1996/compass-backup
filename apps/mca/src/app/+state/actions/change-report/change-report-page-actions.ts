import { createAction, props } from "@ngrx/store";
import { IAddress, IChangeReportState, IContactInformation, IEmploymentIncome, IHouseholdContactInformation, IHouseHoldInformation, IIndividualInformation, ILiheapCrisis, IShelterAndUtilitiesExpense } from "../../models/change-report/change-report.model";

export const getCurrentState = createAction('[store] Get Current State');
export const storeHouseholdDetails = createAction(
    '[MCA Page] Store Household Address',
    props<{ householdInformation: IHouseHoldInformation }>()
);

export const storeResidentAddress = createAction(
    '[MCA Page] Store Resident Address',
    props<{ residentAddress: IAddress }>()
);
export const storeMailingAddress = createAction(
    '[MCA Page] Store Mailing Address',
    props<{ mailingAddress: IAddress }>()
);
export const storeHouseholdContactInformation = createAction(
    '[MCA Page] Store Household Contact Information',
    props<{ householdContactInformation: IHouseholdContactInformation }>()
);
export const storeshelterAndUtilitiesExpense = createAction(
    '[MCA Page] Store Shelter Expenses',
    props<{ shelterAndUtilitiesExpense: IShelterAndUtilitiesExpense }>()
);
export const storeMainContactNumber = createAction(
    '[MCA Page] Store Main Contact Number',
    props<{ mainContactNumber: IContactInformation }>()
);
export const storeSecondaryContactNumber = createAction(
    '[MCA Page] Store Secondary Contact Number',
    props<{ secondContactNumber: IContactInformation }>()
);
export const storeOtherContactNumber = createAction(
    '[MCA Page] Store Other Contact Number',
    props<{ otherContactNumber: IContactInformation }>()
);
export const storeIndividualInformation= createAction(
    '[MCA Page] Store IndividualInformation',
    props<{ individualInformation: IIndividualInformation[] }>()
);
export const storeOtherIncomeChanges = createAction(
    '[MCA Page] Store Other Income Changes',
    props<{ otherIncomeDescription: string }>()
);
export const storeOtherHouseholdChanges = createAction(
    '[MCA Page] Store Other Household Changes',
    props<{ otherHouseholdChanges: string }>()
);
export const storeSelectedChanges = createAction(
    '[MCA Page] Store Selected Changes',
    props<{ selectedChanges: string[] }>()
);
export const storeSelectedIncomeChanges = createAction(
    '[MCA Page] Store Selected Income Changes',
    props<{ selectedIncomeChanges: string[] }>()
);
export const storeSelectedHouseholdChanges = createAction(
    '[MCA Page] Store Selected Household Changes',
    props<{ selectedHouseholdChanges: string[] }>()
);
export const storeIChangeReportState = createAction(
    '[MCA Page] Store ChangeReportState',
    props<{ iChangeReportState: IChangeReportState }>()
);

//Actions for resource and Provider
export const storeProviderState = createAction(
    '[MCA Page] Store Resource and Provider details',
    props<{ resources: string }>()
);

//Actions for OtherInformation
export const storeOtherCommunicationState = createAction(
    '[MCA Page] Store Other Communication details',
    props<{ otherCommunications: string }>()
);

//Actions for HeapCrisis
export const storeILiheapCrisis = createAction(
    '[MCA Page] Store Provider details',
    props<{ liheapCrisis: ILiheapCrisis }>()
);