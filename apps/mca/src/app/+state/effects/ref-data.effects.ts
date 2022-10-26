import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { RefTableGqlService } from '../../shared/services/ref-table-gql.service';
import { MyBenefitsService } from '../../shared/services/my-benefits/my-benefits.service';
import { RefDataService } from '../../shared/services/ref-data.service';
import { loadedCounties, loadedCountiesFailure, loadedCountyEmail, loadedCountyEmailFailure, loadedCountyFax, loadedCountyFaxFailure, loadedCountyOfficeAddresess, loadedCountyOfficeAddresssFailure, loadedCountyOffices, loadedCountyOfficesFailure, loadedCountyPhone, loadedCountyPhoneFailure, loadedElectricProvider, loadedElectricProviderFailure, loadedHeatingSource, loadedHeatingSourceFailure, loadedPayFailure, loadedPays, loadedSchoolDistricts, loadedSchoolDistrictsFailure, loadedStates, loadedStatesFailure, loadedTownship, loadedTownshipFailure } from '../actions/ref-data/ref-data.api-action';
import { loadCounties, loadCountyEmail, loadCountyFax, loadCountyOffice, loadCountyOfficeAddress, loadCountyPhone, loadElectricProvider, loadHeatingSource, loadPays, loadSchoolDistricts, loadStates, loadTownship } from '../actions/ref-data/ref-data.page-action';


@Injectable()
export class RefDataEffects {
    constructor(private actions$: Actions, private api: RefTableGqlService) { }

    loadCountiesEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadCounties),
            mergeMap((action) =>
                this.api.getRefData("R00017", []).pipe(
                    map((response) =>
                        loadedCounties({
                            counties: response.data.tableRows,
                        })
                    ),
                    catchError((error: any) =>
                        of(
                            loadedCountiesFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    })

    loadStatesEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadStates),
            mergeMap((action) =>
                this.api.getRefData("R00002", []).pipe(
                    map((response) =>
                        loadedStates({
                            states: response.data.tableRows,
                        })
                    ),
                    catchError((error: any) =>
                        of(
                            loadedStatesFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    });

    loadSchoolDistrictEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadSchoolDistricts),
            mergeMap((action) =>
                this.api.getRefData("R00019", []).pipe(
                    map((response) =>
                        loadedSchoolDistricts({
                            schoolDistricts: response.data.tableRows,
                        })
                    ),
                    catchError((error: any) =>
                        of(
                            loadedSchoolDistrictsFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    });

    loadTownshipEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadTownship),
            mergeMap((action) =>
                this.api.getRefData("R00077", []).pipe(
                    map((response) =>
                        loadedTownship({
                            townships: response.data.tableRows,
                        })
                    ),
                    catchError((error: any) =>
                        of(
                            loadedTownshipFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    });

    getPays$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadPays),
            mergeMap(() =>
                this.api.getRefData("R00007", []).pipe(
                    map((response) =>
                        loadedPays({
                            pays: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            loadedPayFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );

    getHeatingSource$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadHeatingSource),
            mergeMap(() =>
                this.api.getRefData("R00180", []).pipe(
                    map((response) =>
                        loadedHeatingSource({
                            heatingSource: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            loadedHeatingSourceFailure(
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

    getElectricProvider$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadElectricProvider),
            mergeMap(() =>
                this.api.getRefData("R00013", []).pipe(
                    map((response) =>
                        loadedElectricProvider({
                            electricCompanies: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            loadedElectricProviderFailure(
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

    getCountyOffice$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCountyOffice),
            mergeMap(() =>
                this.api.getRefData("R00045", []).pipe(
                    map((response) =>
                        loadedCountyOffices({
                            countyOffices: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            loadedCountyOfficesFailure(
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

    getCountyOfficeAddress$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCountyOfficeAddress),
            mergeMap(() =>
                this.api.getRefDataByColumn("R00045", "AddressLine1", []).pipe(
                    map((response) =>
                        loadedCountyOfficeAddresess({
                            countyOfficeAddresss: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            loadedCountyOfficeAddresssFailure(
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

    getCountyEmail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCountyEmail),
            mergeMap(() =>
                this.api.getRefDataByColumn("R00045", "Email", []).pipe(
                    map((response) =>
                        loadedCountyEmail({
                            countyEmail: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            loadedCountyEmailFailure(
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

    getCountyFax$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCountyFax),
            mergeMap(() =>
                this.api.getRefDataByColumn("R00045", "FaxNumber", []).pipe(
                    map((response) =>
                        loadedCountyFax({
                            countyFax: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            loadedCountyFaxFailure(
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
    getCountyPhone$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCountyPhone),
            mergeMap(() =>
                this.api.getRefDataByColumn("R00045", "TollFreeNumber", []).pipe(
                    map((response) =>
                        loadedCountyPhone({
                            countyPhone: response.data.tableRows,
                        })
                    ),
                    catchError((error) =>
                        of(
                            loadedCountyPhoneFailure(
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
};
