import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { State } from "../../../+state/app.state";
import { getApplyNow } from "../../+state/apply-now.selectors";
import { getDoIQualify } from "../../../do-i-qualify/+state/do-i-qualify.selectors";
import { getReferrals } from "../../../referrals/+state/referrals.selectors";
import { Observable, Subscription } from "rxjs";
import { ApplyNowPageActions } from "../../+state/actions";
import { RoutePath } from "../../../shared/route-strategies";
import { UtilService } from "../../../shared/services/util.service";
@Injectable({ providedIn: "root" })
export class ScreenQueueUtilforExpensesUtility {
    subscription = new Subscription();
    state!: any;
    module!: any;
    action!: PageQueueActions;
    currentUserId: any;
    selectedValues = [];
    constructor(
        private store: Store<State>,
        private utilService: UtilService,
        private router: Router
    ) {
        this.module = this.router.url.split("/")[1];
        this.action = this.getUpdateAction() as PageQueueActions;
        this.initStore().subscribe((data) => {
            this.state = data;
        });
    }

    initStore(): Observable<any> {
        switch (this.module.toUpperCase()) {
            case RoutePath.APPLYNOW.toUpperCase():
                return this.store.select(getApplyNow);
            case RoutePath.DOIQUALIFY.toUpperCase():
                return this.store.select(getDoIQualify);
            case RoutePath.REFERRALS.toUpperCase():
                return this.store.select(getReferrals);
        }
        return this.store.select(getReferrals);
    }

    getCurrentPage() {
        const map = this.state.pageQueue?.expensesUtilityPageMap;
        const id = this.state.pageQueue?.expensesUtilityCurrentPageId as number;
        if (map != null) {
            return Array.from(map)[id];
        }
        return -1;
    }
    getCurrentPageQueueId() {
        const queue = this.state?.pageQueue ?? null;
        if (queue != null) {
            return this.state.pageQueue?.expensesUtilityCurrentPageId ?? 0;
        }
        return -1;
    }
    getObject(updatedObj: any) {
        switch (this.module) {
            case RoutePath.DOIQUALIFY:
                return { doIQualify: updatedObj };
            case RoutePath.REFERRALS:
                return { referral: updatedObj };
            case RoutePath.APPLYNOW:
                return { applyNow: updatedObj };
        }
        return "";
    }
    backPath() {
        this.updatePageQueueId(-1);
        this.navigateToPath();
    }
    nextPath() {
        this.updatePageQueueId(1);
        this.navigateToPath();
    }

    navigateToPath() {
        const path = this.getCurrentPage();
        this.router.navigate([this.module + "/" + path]);
    }
    navigateToGatewayPath() {
        this.router.navigate(this.getGetwayPath());
    }

    back() {
        const id = this.getCurrentPageQueueId();
        if (id <= 0) {
            this.navigateToGatewayPath();
            return;
        }
        this.backPath();
    }

    // next() {
    //     this.nextPath();
    // }
    next() {
        this.nextPath();
    }

    getGetwayPath() {
        return [
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_EXPENSES +
            "/" +
            RoutePath.APPLYNOW_EXPENSESUTILITYGATEPOST,
        ];
    }
    composePath(arr: any) {
        let routeArry = [] as (string | undefined)[];
        this.selectedValues = arr;
        arr.forEach((path: any) => {
            if (path != "") {
                routeArry = routeArry.concat(this.getPathName(path));
            }
        });
        return routeArry;
    }

    updatePageQueue(expensesUtilityPageMap: any, expensesUtilityCurrentPageId: any, queueName: any) {
        const updatepageQueue = {
            ...this.state,
            pageQueue: {
                ...this.state.pageQueue,
                expensesUtilityPageMap,
                expensesUtilityCurrentPageId,
                queueName,
            },
        } as typeof this.state;
        this.store.dispatch(
            this.action.pageQueueUpdateAction.call(
                this,
                this.getObject(updatepageQueue)
            )
        );
    }
    updatePageQueueId(pageId: any) {
        const expensesUtilityCurrentPageId = (this.state.pageQueue?.expensesUtilityCurrentPageId ?? 0) + pageId;
        const updatepageQueue = {
            ...this.state,
            pageQueue: { ...this.state.pageQueue, expensesUtilityCurrentPageId },
        } as typeof this.state;
        this.store.dispatch(
            this.action.pageQueueUpdateAction.call(
                this,
                this.getObject(updatepageQueue)
            )
        );
    }
    initDynamicRoutes(arr: any, lastPath: any = null, queueName = "") {
        this.selectedValues = arr;
        const paths = this.getDynamicRoutes(arr, lastPath);
        this.updatePageQueue(paths, 0, queueName);
        this.initStore().subscribe((data) => {
            this.state = data;
        });
    }
    getDynamicRoutes(arr: any, lastPath: any) {
        const routeArray = this.composePath(arr);

        const dynamicRoutes = this.utilService.addCommonRoute(
            new Set(this.getDefaultRouteQueue()),
            new Set(routeArray),
            lastPath
        );
        return dynamicRoutes;
    }

    getPathName(name: string): (string | undefined)[] {
        return this.getUtilitygatepostDetails(name);
    }


    getUtilitygatepostDetails(name: string): (string | undefined)[] {
        switch (name) {

            case ScreenQueueRoutesExpensesUtilityGatePost.doesAnyonePayForRentOrMortgage:
                return [RoutePath.APPLYNOW_EXPENSES +
                    "/" +
                    RoutePath.APPLYNOW_EXPENSESHOUSEHOLDMORTGAGERENT];
            case ScreenQueueRoutesExpensesUtilityGatePost.doesAnyonePayForPropertyTaxes:
                return [RoutePath.APPLYNOW_EXPENSES +
                    "/" +
                    RoutePath.APPLYNOW_EXPENSES_PROPERTYTAXDETAILS];
            case ScreenQueueRoutesExpensesUtilityGatePost.doesAnyonePayForHomeInsurance:
                return [RoutePath.APPLYNOW_EXPENSES +
                    "/" +
                    RoutePath.APPLYNOW_EXPENSES_PROPERTYINSURANCEDETAILS]

            default:
                    return [""];
            }
        }





        // getIndividualSituationsGatePost(name: string): (string | undefined)[] {
        //     switch (name) {
        //  case ScreenQueueRoutesExpensesSituations.childSupportExpenses:
        //             return  [RoutePath.APPLYNOW_EXPENSES +
        //             "/" +
        //             RoutePath.APPLYNOW_CHILD_SUPPORT_EXPENSES,

        //             //RoutePath.APPLYNOW_EXPENSES + "/" + RoutePath.APPLYNOW_CHILD_SUPPORT_EXPENSESE_DETAILS,

        //             RoutePath.APPLYNOW_EXPENSES +
        //             "/" +
        //             RoutePath.APPLYNOW_CHILD_SUPPORT_EXPENSESE_SUMMARY];

        //         case ScreenQueueRoutesExpensesSituations.alimony:
        //             return [
        //               RoutePath.APPLYNOW_EXPENSES + "/" + RoutePath.APPLYNOW_ALIMONY_EXPENSES,

        //               //RoutePath.APPLYNOW_EXPENSES + "/" + RoutePath.APPLYNOW_ALIMONY_EXPENSES_DETAILS,

        //               RoutePath.APPLYNOW_EXPENSES +
        //               "/" +
        //               RoutePath.APPLYNOW_ALIMONY_EXPENSES_SUMMARY,
        //             ];
        //         case ScreenQueueRoutesExpensesSituations.childoradultcare:
        //             return [
        //               RoutePath.APPLYNOW_EXPENSES +
        //               "/" +
        //               RoutePath.APPLYNOW_CHILD_OR_ADULUT_CARE_EXPENSES,
        //               //RoutePath.APPLYNOW_EXPENSES + "/" + RoutePath.APPLYNOW_CHILD_OR_ADULUT_CARE_EXPENSES_DETAILS,

        //               RoutePath.APPLYNOW_EXPENSES +
        //               "/" +
        //               RoutePath.APPLYNOW_CHILD_OR_ADULUT_CARE_EXPENSES_SUMMARY,
        //             ];
        //         case ScreenQueueRoutesExpensesSituations.transportation:
        //             return [
        //               RoutePath.APPLYNOW_EXPENSES +
        //               "/" +
        //               RoutePath.APPLYNOW_TRANSPORTATION_EXPENSES,
        //               //RoutePath.APPLYNOW_EXPENSES + "/" + RoutePath.APPLYNOW_TRANSPORTATION_EXPENSES_DETAILS,
        //               RoutePath.APPLYNOW_EXPENSES +
        //               "/" +
        //               RoutePath.APPLYNOW_TRANSPORTATION_EXPENSES_SUMMARY,
        //             ];
        //         case ScreenQueueRoutesExpensesSituations.medical:
        //             return [
        //               RoutePath.APPLYNOW_EXPENSES + "/" + RoutePath.APPLYNOW_MEDICAL_EXPENSES,
        //               //RoutePath.APPLYNOW_EXPENSES + "/" + RoutePath.APPLYNOW_MEDICAL_EXPENSES_DETAILS,
        //               RoutePath.APPLYNOW_EXPENSES +
        //               "/" +
        //               RoutePath.APPLYNOW_MEDICAL_EXPENSES_SUMMARY,
        //             ];
        //         case ScreenQueueRoutesExpensesSituations.taxDeductable:
        //             return [
        //               RoutePath.APPLYNOW_EXPENSES +
        //               "/" +
        //               RoutePath.APPLYNOW_TAX_DEDUCTIBLE_EXPENSES,

        //               //RoutePath.APPLYNOW_EXPENSES + "/" + RoutePath.APPLYNOW_TAX_DEDUCTIBLE_EXPENSES_DETAILS,
        //               RoutePath.APPLYNOW_EXPENSES +
        //               "/" +
        //               RoutePath.APPLYNOW_TAX_DEDUCTIBLE_EXPENSES_SUMMARY,
        //             ];
        //         case ScreenQueueRoutesExpensesSituations.feesOnIncome:
        //             return [
        //               RoutePath.APPLYNOW_EXPENSES + "/" + RoutePath.APPLYNOW_EXPENSESLEGALFEE,
        //               //RoutePath.APPLYNOW_EXPENSES + "/" + RoutePath.APPLYNOW_EXPENSES_LEGALFEE_DETAILS,
        //               RoutePath.APPLYNOW_EXPENSES +
        //               "/" +
        //               RoutePath.APPLYNOW_EXPENSESLEGALFEESUMMARY,
        //             ];
        //         case ScreenQueueRoutesExpensesSituations.housingAssitance:
        //             return [
        //               RoutePath.APPLYNOW_EXPENSES +
        //               "/" +
        //               RoutePath.APPLYNOW_HOUSING_ASSISTANCE_RECEIVED,
        //             ];
        //         case ScreenQueueRoutesExpensesSituations.shelterExpensesInside:
        //            // return
        //         case ScreenQueueRoutesExpensesSituations.shelterExpensesOutside:
        //            // return
        //         case ScreenQueueRoutesExpensesSituations.LIHEAPPayments:
        //             return [
        //               //RoutePath.APPLYNOW_EXPENSES + "/" + RoutePath.APPLYNOW_SHARED_EXPENSES_DETAILS,
        //               RoutePath.APPLYNOW_EXPENSES +
        //               "/" +
        //               RoutePath.APPLYNOW_SHARED_EXPENSES_SUMMARY,
        //             ];

        //         default:
        //             return [""];
        //     }
        // }

        getDefaultRouteQueue() {
            return ExpensesUtilityGatepost;
        }
        initializeSelection(obj: any) {
            const selectedValues = [];
            if (obj != null) {
                const entries = Object.entries(obj);

                for (const [key, value] of entries) {
                    if (value) {
                        selectedValues.push(key);
                    }
                }
            }
            return selectedValues;
        }

        getUpdateAction() {
            return {
                pageQueueUpdateAction: ApplyNowPageActions.updateScreenQueueAction,
            };
        }

        areProgramsExist(
            selectedPrograms: any[],
            conditionalPrograms: string[],
            program: string
        ) {
            if (selectedPrograms.length == 0) return false;
            if (
                selectedPrograms.length == 1 &&
                selectedPrograms.indexOf(program) >= 0
            )
                return true;

            return conditionalPrograms.every((value) => {
                return selectedPrograms.indexOf(value) !== -1;
            });
        }
    }
// export enum ScreenQueueRoutesExpensesSituations {
//     childSupportExpenses = "childSupportExpenses",
//     alimony = "alimony",
//     childoradultcare = "childoradultcare",
//     transportation = "transportation",
//     medical = "medical",
//     taxDeductable = "taxDeductable",
//     feesOnIncome = "feesOnIncome",
//     housingAssitance = "housingAssitance",
//     shelterExpensesOutside = "shelterExpensesOuside",
//     shelterExpensesInside = "shelterExpensesInside",
//     LIHEAPPayments = "LIHEAPPayments",
// }

export enum ScreenQueueRoutesExpensesUtilityGatePost {
    doesAnyonePayForRentOrMortgage = "doesAnyonePayForRentOrMortgage",
    doesAnyonePayForPropertyTaxes = "doesAnyonePayForPropertyTaxes",
    doesAnyonePayForHomeInsurance = "doesAnyonePayForHomeInsurance",
}
/*
export const APPNowHouseholdMemberSituationPageQueue = [RoutePath.DOIQUALIFY_ONEORMOREJOB, RoutePath.DOIQUALIFY_MONTHLYINCOME, RoutePath.DOIQUALIFY_WHOHASOTHERINCOME, RoutePath.DOIQUALIFY_OTHERINCOME,
RoutePath.DOIQUALIFY_CURRENTLYENROLLED, RoutePath.DOIQUALIFY_TYPEOFENROLLMENT, RoutePath.DOIQUALIFY_WHOHASDISABILITY, RoutePath.DOIQUALIFY_WHOISPREGNANT, RoutePath.DOIQUALIFY_CHILDOFUSVETERAN, RoutePath.DOIQUALIFY_FOSTERCARE, RoutePath.DOIQUALIFY_RESULTS]
*/

// export const ApplyNowIndividualSituations = [
//     RoutePath.APPLYNOW_EXPENSES +
//         "/" +
//         RoutePath.APPLYNOW_CHILD_SUPPORT_EXPENSES,

//     RoutePath.APPLYNOW_EXPENSES +
//         "/" +
//         RoutePath.APPLYNOW_CHILD_SUPPORT_EXPENSESE_DETAILS,

//     RoutePath.APPLYNOW_EXPENSES +
//         "/" +
//         RoutePath.APPLYNOW_CHILD_SUPPORT_EXPENSESE_SUMMARY,

//     RoutePath.APPLYNOW_EXPENSES + "/" + RoutePath.APPLYNOW_ALIMONY_EXPENSES,

//     RoutePath.APPLYNOW_EXPENSES +
//         "/" +
//         RoutePath.APPLYNOW_ALIMONY_EXPENSES_DETAILS,

//     RoutePath.APPLYNOW_EXPENSES +
//         "/" +
//         RoutePath.APPLYNOW_ALIMONY_EXPENSES_SUMMARY,

//     RoutePath.APPLYNOW_EXPENSES +
//         "/" +
//         RoutePath.APPLYNOW_CHILD_OR_ADULUT_CARE_EXPENSES,
//     RoutePath.APPLYNOW_EXPENSES +
//         "/" +
//         RoutePath.APPLYNOW_CHILD_OR_ADULUT_CARE_EXPENSES_DETAILS,

//     RoutePath.APPLYNOW_EXPENSES +
//         "/" +
//         RoutePath.APPLYNOW_CHILD_OR_ADULUT_CARE_EXPENSES_SUMMARY,

//     RoutePath.APPLYNOW_EXPENSES +
//         "/" +
//         RoutePath.APPLYNOW_TRANSPORTATION_EXPENSES,
//     RoutePath.APPLYNOW_EXPENSES +
//         "/" +
//         RoutePath.APPLYNOW_TRANSPORTATION_EXPENSES_DETAILS,
//     RoutePath.APPLYNOW_EXPENSES +
//         "/" +
//         RoutePath.APPLYNOW_TRANSPORTATION_EXPENSES_SUMMARY,

//     RoutePath.APPLYNOW_EXPENSES + "/" + RoutePath.APPLYNOW_MEDICAL_EXPENSES,
//     RoutePath.APPLYNOW_EXPENSES +
//         "/" +
//         RoutePath.APPLYNOW_MEDICAL_EXPENSES_DETAILS,
//     RoutePath.APPLYNOW_EXPENSES +
//         "/" +
//         RoutePath.APPLYNOW_MEDICAL_EXPENSES_SUMMARY,
//     RoutePath.APPLYNOW_EXPENSES +
//         "/" +
//         RoutePath.APPLYNOW_TAX_DEDUCTIBLE_EXPENSES,

//     RoutePath.APPLYNOW_EXPENSES +
//         "/" +
//         RoutePath.APPLYNOW_TAX_DEDUCTIBLE_EXPENSES_DETAILS,
//     RoutePath.APPLYNOW_EXPENSES +
//         "/" +
//         RoutePath.APPLYNOW_TAX_DEDUCTIBLE_EXPENSES_SUMMARY,
//     RoutePath.APPLYNOW_EXPENSES + "/" + RoutePath.APPLYNOW_EXPENSESLEGALFEE,
//     RoutePath.APPLYNOW_EXPENSES +
//         "/" +
//         RoutePath.APPLYNOW_EXPENSES_LEGALFEE_DETAILS,
//     RoutePath.APPLYNOW_EXPENSES +
//         "/" +
//         RoutePath.APPLYNOW_EXPENSESLEGALFEESUMMARY,
//     RoutePath.APPLYNOW_EXPENSES +
//         "/" +
//         RoutePath.APPLYNOW_HOUSING_ASSISTANCE_RECEIVED,
//     RoutePath.APPLYNOW_EXPENSES +
//         "/" +
//         RoutePath.APPLYNOW_SHARED_EXPENSES_DETAILS,
//     RoutePath.APPLYNOW_EXPENSES +
//         "/" +
//         RoutePath.APPLYNOW_SHARED_EXPENSES_SUMMARY,

// ];

export const ExpensesUtilityGatepost = [
    RoutePath.APPLYNOW_EXPENSES +
    "/" +
    RoutePath.APPLYNOW_EXPENSESHOUSEHOLDMORTGAGERENT,
    RoutePath.APPLYNOW_EXPENSES +
    "/" +
    RoutePath.APPLYNOW_EXPENSES_PROPERTYTAXDETAILS,
    RoutePath.APPLYNOW_EXPENSES +
    "/" +
    RoutePath.APPLYNOW_EXPENSES_PROPERTYINSURANCEDETAILS,

]



interface PageQueueActions {
    pageQueueUpdateAction: any;
}

//Pagequeue Household
