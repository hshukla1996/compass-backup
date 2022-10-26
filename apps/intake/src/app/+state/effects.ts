import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, Effect } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { GqlService } from '@compass-ui/shared/common';
import * as StateActions from './actions';
import { loadFemaleInvRelationsFailure, loadMaleInvRelationsFailure } from "./actions/app-api.actions";

@Injectable()
export class RootEffects {
    constructor(private actions$: Actions, private api: GqlService) {}

    init$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getPACounties),
            mergeMap(() =>
                this.api.getRefData("R00017", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.SetPACounties({
                            counties: response.data,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadPACountiesFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );
    getCountries$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getCitizenship),
            mergeMap(() =>
                this.api.getRefData("R00111", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.SetCountries({
                            countries: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadCountriesFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );
    getDocuemntTypes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getDocumentTypes),
            mergeMap(() =>
                this.api.getRefData("R00630", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setDocumentTypes({
                            documentTypes: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadDocumentTypesFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );
    getImmunizations$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getImmunizations),
            mergeMap(() =>
                this.api.getRefData("R00312", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setImmunizations({
                            immunizations: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadImmunizationsFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );
    getCitizenships$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getCitizenship),
            mergeMap(() =>
                this.api.getRefData("R00053", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setCitizenship({
                            citizenship: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadPACountiesFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );

    getMaritalStatus$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getMaritalStatus),
            mergeMap(() =>
                this.api.getRefData("R00006", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setMaritalStatus({
                            maritalStatusTypes: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadPACountiesFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );

    getEducations$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getEducations),
            mergeMap(() =>
                this.api.getRefData("R00375", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setEducations({
                            educations: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadPACountiesFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );
    getServiceBranches$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getServiceBranches),
            mergeMap(() =>
                this.api.getRefData("R00076", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setServiceBranches({
                            serviceBranches: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadServiceBranchesFailure(
                                { error }
                            )
                        )
                    )
                )
            )
        )
    );

    getContactRoles$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getContactRoles),
            mergeMap(() =>
                this.api.getRefData("R00135", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setContactRoles({
                            contactRoles: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadContactRolesFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );
    getSchoolDistricts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getSchoolDistricts),
            mergeMap(() =>
                this.api.getRefData("R00019", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setSchoolDistrict({
                            schoolDistrict: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadSchoolDistrictsFailure(
                                { error }
                            )
                        )
                    )
                )
            )
        )
    );
    getSchoolGrades$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getSchoolGrades),
            mergeMap(() =>
                this.api.getRefData("R00222", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setSchoolGrades({
                            schoolGrades: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadSchoolGradesFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );
    getTownShip$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getSchoolDistricts),
            mergeMap(() =>
                this.api.getRefData("R00077", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setTownShip({
                            townShip: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadTownShipFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );

    getStates$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getStates),
            mergeMap(() =>
                this.api.getRefData("R00002", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setStates({
                            state: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadStatesFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );

    getDrinkingWater$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getDrinkingWater),
            mergeMap(() =>
                this.api.getRefData("R00002", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setDrinkingWater({
                            drinkingWater: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadStatesFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );


    getWasteWater$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getWasteWater),
            mergeMap(() =>
                this.api.getRefData("R00002", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setWasteWater({
                            wasteWater: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadStatesFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );


    getAmountPeriodForTribes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getAmountPeriodForTribes),
            mergeMap(() =>
                this.api.getRefData("R00643", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setAmountPeriodForTribes({
                            amountPeriods: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadAmountPeriodForTribeFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );

    getPays$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getPays),
            mergeMap(() =>
                this.api.getRefData("R00007", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setPays({
                            pay: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadPaysFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );

    getLivSituation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getLivSituation),
            mergeMap(() =>
                this.api.getRefData("R00134", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setLivSituation({
                            livSituation: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadLivSituationFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );

    getHouSituation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getHouSituation),
            mergeMap(() =>
                this.api.getRefData("R00181", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setHouSituation({
                            houSituation: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadHouSituationFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );

    getNumberOfExpectedBabies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getNumberOfExpectedBabies),
            mergeMap(() =>
                this.api.getRefData("R00615", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setNumberOfExpectedBabies({
                            numberOfExpectedBabies: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadNumberOfExpectedFailure(
                                { error }
                            )
                        )
                    )
                )
            )
        )
    );

    getBenefitTypes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getBenefitTypes$),
            mergeMap(() =>
                this.api.getRefData("R00079", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setBenefitTypes({
                            benefitTypes: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadBenefitTypesFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );

    getElectricProvider$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getSuffix),
            mergeMap(() =>
                this.api.getRefData("R00005", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setElectricCompanies({
                            electricCompanies: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadElectricCompanyFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );

    getRelationships$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getRelationships),
            mergeMap(() =>
                this.api.getRefData("R00005", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setRelationships({
                            relationships: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadRelationshipsFailure(
                                { error }
                            )
                        )
                    )
                )
            )
        )
    );
    getMaleInverseRelationships$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getMaleInvRelations),
            mergeMap(() =>
                this.api.getRefData("R00390", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setMaleInvRelations({
                            maleInvRelationships: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadMaleInvRelationsFailure(
                                { error }
                            )
                        )
                    )
                )
            )
        )
    );
    getFemaleInverseRelationships$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getFemaleInvRelations),
            mergeMap(() =>
                this.api.getRefData("R00391", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setFemaleInvRelations({
                            femaleInvRelationships: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadFemaleInvRelationsFailure(
                                { error }
                            )
                        )
                    )
                )
            )
        )
    );
    getInsuranceNameType$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getInsuranceNameType),
            mergeMap(() =>
                this.api.getRefData("R00662", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setInsuranceNameType({
                            insuranceNameType: response.data,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadInsuranceNameTypeFailure(
                                { error }
                            )
                        )
                    )
                )
            )
        )
    );
    getSchoolTypes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getStates),
            mergeMap(() =>
                this.api.getRefData("R00375", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setSchoolTypes({
                            schoolTypes: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadStatesFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );

    getNSLPSchoolTypes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getStates),
            mergeMap(() =>
                this.api.getRefData("R00256", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setNSLPSchoolTypes({
                            nslpSchoolTypes: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadStatesFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );

    getRaces$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getRaces),
            mergeMap(() =>
                this.api.getRefData("R00009", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setRaces({
                            races: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadRacesFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );

    getSuffix$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getSuffix),
            mergeMap(() =>
                this.api.getRefMultiColoumnData("R00003", ["FlexOrder"]).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setSuffix({
                            suffix: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadSuffixFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );

    getFacility$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getTypeofFacility),
            mergeMap(() =>
                this.api.getRefData("R00136", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setFacilities({
                            facilities: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadFacilitiesFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );

    getParentSpouseOrBoth$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getParentSpouseOrBoth),
            mergeMap(() =>
                this.api.getRefData("R00084", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setParentSpouseOrBoth({
                            parentSpouseOrBoth: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadParentSpouseOrBothFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );
    getReferralPhonenumbers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getReferralPhonenumbers),
            mergeMap(() =>
                this.api.getCountyContactData("R00226", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setReferralPhoneNumbers({
                            phoneNumber: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadReferralPhoneNumbersFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );
    getCountyOfPlacement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getCountyOfPlacement),
            mergeMap(() =>
                this.api.getRefData("R00616", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setCountyOfPlacement({
                            countyOfPlacement: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadCountyOfPlacementFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );
    getVeteranStatus$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getVeteranStatus),
            mergeMap(() =>
                this.api.getRefData("R00067", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setVeteranStatus({
                            veteranStatus: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadVeteranStatusFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );
    getDisabilityType$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getDisabilityType),
            mergeMap(() =>
                this.api.getRefData("R00289", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setDisabilityType({
                            disabilityType: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadDisabilityTypeFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );
    getDisabilitySsi$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getDisabilitySsi),
            mergeMap(() =>
                this.api.getRefData("R00291", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setDisabilitySsi({
                            disabilitySsi: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadDisabilitySsiFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );
    getChildDisability$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getChildDisability),
            mergeMap(() =>
                this.api.getRefData("R00290", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setChildDisability({
                            childDisability: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadChildDisabilityFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );
    getSecurityQuestions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getSecurityQuestions),
            mergeMap(() =>
                this.api.getRefData("R00457", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setSecurityQuestions({
                            securityQuestion: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadSecurityQuestionsFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );
    getMedicalService$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getMedicalService),
            mergeMap(() =>
                this.api.getRefData("R00024", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setMedicalService({
                            medicalService: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadMedicalServiceFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );
    getHeatingSource$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getHeatingSource),
            mergeMap(() =>
                this.api.getRefData("R00180", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.SetHeatingSource({
                            heatingSource: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadHeatingSourceFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );

    getProviderName$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getProviderName),
            mergeMap(() =>
                this.api.getRefData("R00665", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.SetProviderName({
                            providerName: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadProviderNameFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );

    getHeatingSourcesprovider$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getHeatingSourcesprovider),
            mergeMap(() =>
                this.api.getRefData("R00665", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.SetHeatingSourcesProvider({
                            heatingSourcesProvider: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadProviderNameFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );

    getNeedElectricity$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getNeedElectricity),
            mergeMap(() =>
                this.api.getRefData("R00013", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.SetNeedElectricity({
                            needElectricity: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadNeedElectricityFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );
    getYesNoValue$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getYesNoValues),
            mergeMap(() =>
                this.api.getRefData("R00013", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.loadYesNoValues({
                            yesNoValues: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadYesNoValuesFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );
    getOtherIncomeType$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getOtherIncomeTypes),
            mergeMap(() =>
                this.api.getRefData("R00020", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setOtherIncomeTypes({
                            otherIncomeTypes: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadOtherIncomeTypesFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );
    getSharedExpenses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getSharedExpenses),
            mergeMap(() =>
                this.api.getRefData("R00059", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setSharedExpenses({
                            sharedExpenses: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadSharedExpensesFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );
  getChildCareDays$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StateActions.AppPageActions.getChildCareDays),
      mergeMap(() =>
        this.api.getRefData("R00313", []).pipe(
          map((response) =>
            StateActions.AppApiActions.setChildCareDays({
              childCareDays: response.data.tableRows,
            })
          ),
          catchError((error) =>
            of(
              StateActions.AppApiActions.loadChildCareDaysFailure(
                {
                  error,
                }
              )
            )
          )
        )
      )
    )
  );
    getDeducatableSources$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getDeductableSources),
            mergeMap(() =>
                this.api.getRefData("R00020", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setDeductableSources({
                            deductableSources: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadDeductableSourcesFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );
    getMedicalExpenses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getMedicalExpenses),
            mergeMap(() =>
                this.api.getRefData("R00317", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.loadMedicalExpenses({
                            medicalExpenses: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadMedicalExpensesFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );
    getMaleRelationship$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getMaleRelationship),
            mergeMap(() =>
                this.api.getRefData("R00140", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.loadMaleRelationship({
                            maleRelationship: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadMaleRelationshipFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );

    getFeMaleRelationship$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getFemaleRelationship),
            mergeMap(() =>
                this.api.getRefData("R00141", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.loadFeMaleRelationship({
                            femaleRelationship: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadFeMaleRelationshipFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );

    getHouseHoldExpensesPaid$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getHouseHoldExpensesPaid),
            mergeMap(() =>
                this.api.getRefData("R00142", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.loadHouseHoldExpensesPaid({
                            houseHoldExpenses: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadHouseHoldExpensesPaidFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );

    getMAProviderNumbers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getFemaleRelationship),
            mergeMap(() =>
                this.api.getRefData("R00141", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.loadMAProviderNumbers({
                            maproviderNumbers: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadMAProviderNumbersFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );

    getNonMAProviderNumbers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getNonMAProviderNumbers),
            mergeMap(() =>
                this.api.getRefData("R00141", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.loadNonMAProviderNumbers({
                            nonMAproviderNumbers: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadNonMAProviderNumbersFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );

    getReasonForEmploymentEnd$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getReasonForEmploymentEnd),
            mergeMap(() =>
                this.api.getRefData("R00609", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setReasonForEmploymentEnd({
                            reasonForEmploymentEnd: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadReasonForEmploymentEndFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );

    getUnitType$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getUnitTypes),
            mergeMap(() =>
                this.api.getRefData("R00248", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setUnitTypes({
                            unitType: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadsetUnitTypesFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );
    getPoliticalParties$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getPoliticalParties),
            mergeMap(() =>
                this.api.getRefData("R00243", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setPoliticalParties({
                            politicalParties: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadPoliticalPartiesFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );
    getElectionDueDates$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getElectionDueDates),
            mergeMap(() =>
                this.api.getRefData("R00085", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setElectionDueDates({
                            electionDueDates: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadElectionDueDatesFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );
    getSituations$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getSituations),
            mergeMap(() =>
                this.api.getRefData("R00244", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setSituations({
                            situations: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadSituationsFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );

    getResourceType$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getResourceTypes),
            mergeMap(() =>
                this.api.getRefData("R00061", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setResourceTypes({
                            ResourceTypes: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadResourceTypesFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );
    getCompanyNames$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getCompanyNames),
            mergeMap(() =>
                this.api.getRefData("R00662", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setComapanyNames({
                            insuranceCompnayNames: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadComapanaNamesFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );
    getPolicyTypes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getPolicyTypes),
            mergeMap(() =>
                this.api.getRefData("R00154", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setPolicyTypes({
                            policyTypes: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadPolicyTypesFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );
    getPolicyCoverage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getPolicyCoverage),
            mergeMap(() =>
                this.api.getRefData("R00119", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setPolicyCoverage({
                            policyCoverage: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadComapanaNamesFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );
    getLGBTQQuestions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getLGBTQQuestions),
            mergeMap(() =>
                this.api.getRefData("R00249", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setLGBTQQuestions({
                            questions: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadLGBTQQuestionsFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );
    getLGBTQAnswers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getLGBTQAnswers),
            mergeMap(() =>
                this.api.getRefData("R00250", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setLGBTQAnswers({
                            answers: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadLGBTQAnswersFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );
    getEmployerPolicyCoverage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getEmployerPolicyCoverage),
            mergeMap(() =>
                this.api.getRefData("R00645", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setEmployerPolicyCoverage({
                            policyCoverage: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadComapanaNamesFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );

    getApplicationLanguage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getApplicationLanguage),
            mergeMap(() =>
                this.api.getRefData("R00378", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setApplicationLanguage({
                            applicationLanguage: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadApplicationLanguageFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );
    getEmployerPaidPremiumPolicy$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getEmployerPaidPremiumPolicy),
            mergeMap(() =>
                this.api.getRefData("R00614", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setEmployerPremiumPaidPolicy({
                            employerPaidPremiumPolicy: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadEmployerPremiumPaidPolicyFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );
    getEmployerInsuranceChange$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getEmployerChangePolicy),
            mergeMap(() =>
                this.api.getRefData("R00644", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setEmployerChangePolicy({
                            employerChangePolicy: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadEmployerChangePolicyFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );
    getPolicyEndCoverage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getPolicyEndCoverage),
            mergeMap(() =>
                this.api.getRefData("R00011", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setPolicyEndCoverage({
                            policyEndCoverage: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadPolicyEndCoverageFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );
    getBenefits$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getBenefits),
            mergeMap(() =>
                this.api.getRefData("R00038", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setBenefits({
                            benefits: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadBenefitsFailure(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );
    getProgramServices$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getProgramServices),
            mergeMap(() =>
                this.api.getRefData("R00223", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setProgramServices({
                            programServices: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadProgramServices(
                                {
                                    error,
                                }
                            )
                        )
                    )
                )
            )
        )
    );
    /*
    @Effect({ dispatch: false })
    init$ = this.actions$.pipe(
        ofType(ActionTypes.Initialize),
        map(() =>
            this.store.dispatch(new StateActions.GetItems())

    getSuffix$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getSuffix),
            mergeMap(() =>
                this.api.getRefData("R00003", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setSuffix({
                            suffix: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadSuffixFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );
    getSchoolTypes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getStates),
            mergeMap(() =>
                this.api.getRefData("R00074", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setSchoolTypes({
                            schoolTypes: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadStatesFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );

    /*getStates$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StateActions.AppPageActions.getStates),
            mergeMap(() =>
                this.api.getRefData("R00002", []).pipe(
                    map((response) =>
                        StateActions.AppApiActions.setStates({
                            states: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            StateActions.AppApiActions.loadSuffixFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );*/

    /*
@Effect({ dispatch: false })
init$ = this.actions$.pipe(
    ofType(ActionTypes.Initialize),
    map(() =>
        this.store.dispatch(new StateActions.GetItems())
    )
); */
}
