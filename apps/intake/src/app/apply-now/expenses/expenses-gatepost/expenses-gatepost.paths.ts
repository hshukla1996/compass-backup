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
export class ScreenQueueUtil {
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
    updateForwardPath(){
      const expensesCurrentPageId = this.state.pageQueue?.expensesCurrentPageId as number;
      const expensespageMap = {...this.state.pageQueue?.expensespageMap};
      if(expensespageMap.farwardPaths) {
        const farwardPaths = [...expensespageMap.farwardPaths]
        farwardPaths[expensesCurrentPageId] = expensespageMap.backPaths[expensesCurrentPageId]
        expensespageMap.farwardPaths = farwardPaths;
      }

      const updatepageQueue = {
        ...this.state,
        pageQueue: {
          ...this.state.pageQueue,
          expensespageMap,
          expensesCurrentPageId
        },
      } as typeof this.state;
      this.store.dispatch(
        this.action.pageQueueUpdateAction.call(
          this,
          this.getObject(updatepageQueue)
        )
      );
      return -1;
    }
    getCurrentPage() {
        const map = this.state.pageQueue?.expensespageMap.farwardPaths;
        const id = this.state.pageQueue?.expensesCurrentPageId as number;
        if (map != null) {
            return Array.from(map)[id];
        }
        return -1;
    }
  getCurrentBackPage() {
    const map = this.state.pageQueue?.expensespageMap.backPaths;
    const id = this.state.pageQueue?.expensesCurrentPageId as number;
    if (map != null) {
      return Array.from(map)[id];
    }
    return -1;
  }
    getCurrentPageQueueId() {
        const queue = this.state?.pageQueue ?? null;
        if (queue != null) {
            return this.state.pageQueue?.expensesCurrentPageId ?? 0;
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
        this.navigateToBackPath();
    }
    nextPath() {
        this.updatePageQueueId(1);
        this.navigateToPath();
    }

    navigateToPath() {
        const path = this.getCurrentPage();
        this.router.navigate([this.module + "/" + path]);
    }
  navigateToBackPath() {
    const path = this.getCurrentBackPage();
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
                RoutePath.APPLYNOW_EXPENSES_GATEPOST,
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
  composeBackPaths(arr: any) {
    let routeArry = [] as (string | undefined)[];
    this.selectedValues = arr;
    arr.forEach((path: any) => {
      if (path != "") {
        routeArry = routeArry.concat(this.getBackPathName(path));
      }
    });
    return routeArry;
  }

    updatePageQueue(expensespageMap: any, expensesCurrentPageId: any) {
        const updatepageQueue = {
            ...this.state,
            pageQueue: {
                ...this.state.pageQueue,
                expensespageMap,
                expensesCurrentPageId
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
        const expensesCurrentPageId =
            (this.state.pageQueue?.expensesCurrentPageId ?? 0) + pageId;
        const updatepageQueue = {
            ...this.state,
            pageQueue: { ...this.state.pageQueue, expensesCurrentPageId },
        } as typeof this.state;
        this.store.dispatch(
            this.action.pageQueueUpdateAction.call(
                this,
                this.getObject(updatepageQueue)
            )
        );
    }
    initDynamicRoutes(arr: any, lastPath: any = null) {
        this.selectedValues = arr;
      const routeFrontArray = this.composePath(arr);
      const routeBackArray = this.composeBackPaths(arr);
        const paths = {
          farwardPaths:this.getDynamicRoutes(routeFrontArray, lastPath),
          backPaths:this.getDynamicRoutes(routeBackArray, lastPath)
        }
        this.updatePageQueue(paths, 0);
    }
    getDynamicRoutes(rarr: any, lastPath: any) {



        const dynamicRoutes = this.utilService.addCommonRoute(
            new Set(this.getDefaultRouteQueue()),
            new Set(rarr),
            lastPath
        );
        return dynamicRoutes;
    }
  getBackPathName(name: string): (string | undefined)[] {
    return this.getIndividualSituationsGatePostBackPaths(name);
  }
    getPathName(name: string): (string | undefined)[] {
        return this.getIndividualSituationsGatePost(name);
    }
  getIndividualSituationsGatePostBackPaths(name: string): (string | undefined)[] {
    switch (name) {
      case ScreenQueueRoutesExpensesSituations.childSupportExpenses:
        return [

          RoutePath.APPLYNOW_EXPENSES +
          "/" +
          RoutePath.APPLYNOW_CHILD_SUPPORT_EXPENSESE_SUMMARY,
        ];

      case ScreenQueueRoutesExpensesSituations.alimony:
        return [

          RoutePath.APPLYNOW_EXPENSES +
          "/" +
          RoutePath.APPLYNOW_ALIMONY_EXPENSES_SUMMARY,
        ];
      case ScreenQueueRoutesExpensesSituations.childoradultcare:
        return [

          RoutePath.APPLYNOW_EXPENSES +
          "/" +
          RoutePath.APPLYNOW_CHILD_OR_ADULUT_CARE_EXPENSES_SUMMARY,
        ];
      case ScreenQueueRoutesExpensesSituations.transportation:
        return [
           RoutePath.APPLYNOW_EXPENSES +
          "/" +
          RoutePath.APPLYNOW_TRANSPORTATION_EXPENSES_SUMMARY,
        ];
      case ScreenQueueRoutesExpensesSituations.medical:
        return [
           RoutePath.APPLYNOW_EXPENSES +
          "/" +
          RoutePath.APPLYNOW_MEDICAL_EXPENSES_SUMMARY,
        ];
      case ScreenQueueRoutesExpensesSituations.taxDeductable:
        return [
               RoutePath.APPLYNOW_EXPENSES +
          "/" +
          RoutePath.APPLYNOW_TAX_DEDUCTIBLE_EXPENSES_SUMMARY,
        ];
      case ScreenQueueRoutesExpensesSituations.feesOnIncome:
        return [
             RoutePath.APPLYNOW_EXPENSES +
          "/" +
          RoutePath.APPLYNOW_EXPENSESLEGALFEESUMMARY,
        ];
      case ScreenQueueRoutesExpensesSituations.housingAssitance:
        return [
          RoutePath.APPLYNOW_EXPENSES +
          "/" +
          RoutePath.APPLYNOW_HOUSING_ASSISTANCE_RECEIVED,
        ];
      case ScreenQueueRoutesExpensesSituations.shelterExpensesInside:
        return [
          RoutePath.APPLYNOW_EXPENSES +
          "/" +
          RoutePath.APPLYNOW_EXPENSESUTILITYGATEPOST

        ];
      case ScreenQueueRoutesExpensesSituations.shelterExpensesOutside:
        return [

          RoutePath.APPLYNOW_EXPENSES +
          "/" +
          RoutePath.APPLYNOW_SHARED_EXPENSES_SUMMARY,
        ];


      default:
        return [""];
    }
  }

    getIndividualSituationsGatePost(name: string): (string | undefined)[] {
      const expensespageMap = {...this.state.pageQueue?.expensespageMap};
      const childSupportEndingPath = RoutePath.APPLYNOW_EXPENSES +
        "/" +
        RoutePath.APPLYNOW_CHILD_SUPPORT_EXPENSESE_SUMMARY;
      const alimonyEndingPath = RoutePath.APPLYNOW_EXPENSES +
        "/" +
        RoutePath.APPLYNOW_ALIMONY_EXPENSES_SUMMARY;
      const childOrAdultCareEndingPath = RoutePath.APPLYNOW_EXPENSES +
      "/" +
      RoutePath.APPLYNOW_CHILD_OR_ADULUT_CARE_EXPENSES_SUMMARY
      const transportationSummary = RoutePath.APPLYNOW_EXPENSES +
        "/" +
        RoutePath.APPLYNOW_TRANSPORTATION_EXPENSES_SUMMARY

      const medicalSummary =   RoutePath.APPLYNOW_EXPENSES +
      "/" +
      RoutePath.APPLYNOW_MEDICAL_EXPENSES_SUMMARY
      const taxSummary =  RoutePath.APPLYNOW_EXPENSES +
      "/" +
      RoutePath.APPLYNOW_TAX_DEDUCTIBLE_EXPENSES_SUMMARY
      const feesummary  = RoutePath.APPLYNOW_EXPENSES +
      "/" +
      RoutePath.APPLYNOW_EXPENSESLEGALFEESUMMARY
      const sharedSummary = RoutePath.APPLYNOW_EXPENSES +
      "/" +
      RoutePath.APPLYNOW_SHARED_EXPENSES_SUMMARY
      let farwardPaths:string[] = [];
        if(expensespageMap.farwardPaths) {
           farwardPaths = [...expensespageMap.farwardPaths]
        }

        switch (name) {
            case ScreenQueueRoutesExpensesSituations.childSupportExpenses:

              if(farwardPaths.indexOf(childSupportEndingPath) >-1){
                  return [childSupportEndingPath];
              }
              else {
                return [
                  RoutePath.APPLYNOW_EXPENSES +
                  "/" +
                  RoutePath.APPLYNOW_CHILD_SUPPORT_EXPENSES,

                ];
              }

            case ScreenQueueRoutesExpensesSituations.alimony:
              if(farwardPaths.indexOf(alimonyEndingPath) >-1){
                return [alimonyEndingPath];
              }
              else {
                return [
                  RoutePath.APPLYNOW_EXPENSES +
                  "/" +
                  RoutePath.APPLYNOW_ALIMONY_EXPENSES,

                  //RoutePath.APPLYNOW_EXPENSES + "/" + RoutePath.APPLYNOW_ALIMONY_EXPENSES_DETAILS,
                ];
              }
            case ScreenQueueRoutesExpensesSituations.childoradultcare:
              if(farwardPaths.indexOf(childOrAdultCareEndingPath) >-1){
                return [childOrAdultCareEndingPath];
              }
              else {
                return [
                  RoutePath.APPLYNOW_EXPENSES +
                  "/" +
                  RoutePath.APPLYNOW_CHILD_OR_ADULUT_CARE_EXPENSES,
                  //RoutePath.APPLYNOW_EXPENSES + "/" + RoutePath.APPLYNOW_CHILD_OR_ADULUT_CARE_EXPENSES_DETAILS,
                ];
              }
            case ScreenQueueRoutesExpensesSituations.transportation:
              if(farwardPaths.indexOf(transportationSummary) >-1){
                return [transportationSummary];
              }
              else {
                return [
                  RoutePath.APPLYNOW_EXPENSES +
                  "/" +
                  RoutePath.APPLYNOW_TRANSPORTATION_EXPENSES,
                  //RoutePath.APPLYNOW_EXPENSES + "/" + RoutePath.APPLYNOW_TRANSPORTATION_EXPENSES_DETAILS,
                ];
              }
            case ScreenQueueRoutesExpensesSituations.medical:
              if(farwardPaths.indexOf(medicalSummary) >-1){
                return [medicalSummary];
              }
              else {
                return [
                  RoutePath.APPLYNOW_EXPENSES +
                  "/" +
                  RoutePath.APPLYNOW_MEDICAL_EXPENSES,
                  //RoutePath.APPLYNOW_EXPENSES + "/" + RoutePath.APPLYNOW_MEDICAL_EXPENSES_DETAILS,
                ];
              }
            case ScreenQueueRoutesExpensesSituations.taxDeductable:
              if(farwardPaths.indexOf(taxSummary) >-1){
                return [taxSummary];
              }
              else {
                return [
                  RoutePath.APPLYNOW_EXPENSES +
                  "/" +
                  RoutePath.APPLYNOW_TAX_DEDUCTIBLE_EXPENSES,
                ];
              }
            case ScreenQueueRoutesExpensesSituations.feesOnIncome:
              if(farwardPaths.indexOf(feesummary) >-1){
                return [feesummary];
              }
              else {
                return [
                  RoutePath.APPLYNOW_EXPENSES +
                  "/" +
                  RoutePath.APPLYNOW_EXPENSESLEGALFEE,
                ];
              }
            case ScreenQueueRoutesExpensesSituations.housingAssitance:
                return [
                    RoutePath.APPLYNOW_EXPENSES +
                        "/" +
                        RoutePath.APPLYNOW_HOUSING_ASSISTANCE_RECEIVED,
                ];
            //returb
            case ScreenQueueRoutesExpensesSituations.shelterExpensesOutside:
              if(farwardPaths.indexOf(sharedSummary) >-1){
                return [sharedSummary];
              }
              else {
                return [
                  RoutePath.APPLYNOW_EXPENSES +
                  "/" +
                  RoutePath.APPLYNOW_SHARED_EXPENSES_DETAILS,

                ];
              }
          case ScreenQueueRoutesExpensesSituations.shelterExpensesInside:
            return [
              RoutePath.APPLYNOW_EXPENSES +
              "/" +
              RoutePath.APPLYNOW_EXPENSESUTILITYGATEPOST

            ];

          default:
                return [""];
        }
    }

    getDefaultRouteQueue() {
        return ApplyNowIndividualSituations;
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
        selectedPrograms: string[],
        conditionalPrograms: string[]
    ) {
        if (selectedPrograms.length == 0) return false;

        return conditionalPrograms.some((value) => {
            return selectedPrograms.indexOf(value) !== -1;
        });
    }
    isProgramExist(arr: string[], program: string) {
        return arr.length == 0 ? false : arr.indexOf(program) >= 0;
    }
}
export enum ScreenQueueRoutesExpensesSituations {
    childSupportExpenses = "childSupportExpenses",
    alimony = "alimony",
    childoradultcare = "childoradultcare",
    transportation = "transportation",
    medical = "medical",
    taxDeductable = "taxDeductable",
    feesOnIncome = "feesOnIncome",
    housingAssitance = "housingAssitance",
    shelterExpensesOutside = "shelterExpensesOuside",
    shelterExpensesInside = "shelterExpensesInside",
    LIHEAPPayments = "LIHEAPPayments",
}


/*
export const APPNowHouseholdMemberSituationPageQueue = [RoutePath.DOIQUALIFY_ONEORMOREJOB, RoutePath.DOIQUALIFY_MONTHLYINCOME, RoutePath.DOIQUALIFY_WHOHASOTHERINCOME, RoutePath.DOIQUALIFY_OTHERINCOME,
RoutePath.DOIQUALIFY_CURRENTLYENROLLED, RoutePath.DOIQUALIFY_TYPEOFENROLLMENT, RoutePath.DOIQUALIFY_WHOHASDISABILITY, RoutePath.DOIQUALIFY_WHOISPREGNANT, RoutePath.DOIQUALIFY_CHILDOFUSVETERAN, RoutePath.DOIQUALIFY_FOSTERCARE, RoutePath.DOIQUALIFY_RESULTS]
*/

export const ApplyNowIndividualSituations = [
    RoutePath.APPLYNOW_EXPENSES +
        "/" +
        RoutePath.APPLYNOW_CHILD_SUPPORT_EXPENSES,

    RoutePath.APPLYNOW_EXPENSES +
        "/" +
        RoutePath.APPLYNOW_CHILD_SUPPORT_EXPENSESE_DETAILS,

    RoutePath.APPLYNOW_EXPENSES +
        "/" +
        RoutePath.APPLYNOW_CHILD_SUPPORT_EXPENSESE_SUMMARY,

    RoutePath.APPLYNOW_EXPENSES + "/" + RoutePath.APPLYNOW_ALIMONY_EXPENSES,

    RoutePath.APPLYNOW_EXPENSES +
        "/" +
        RoutePath.APPLYNOW_ALIMONY_EXPENSES_DETAILS,

    RoutePath.APPLYNOW_EXPENSES +
        "/" +
        RoutePath.APPLYNOW_ALIMONY_EXPENSES_SUMMARY,

    RoutePath.APPLYNOW_EXPENSES +
        "/" +
        RoutePath.APPLYNOW_CHILD_OR_ADULUT_CARE_EXPENSES,
    RoutePath.APPLYNOW_EXPENSES +
        "/" +
        RoutePath.APPLYNOW_CHILD_OR_ADULUT_CARE_EXPENSES_DETAILS,

    RoutePath.APPLYNOW_EXPENSES +
        "/" +
        RoutePath.APPLYNOW_CHILD_OR_ADULUT_CARE_EXPENSES_SUMMARY,

    RoutePath.APPLYNOW_EXPENSES +
        "/" +
        RoutePath.APPLYNOW_TRANSPORTATION_EXPENSES,
    RoutePath.APPLYNOW_EXPENSES +
        "/" +
        RoutePath.APPLYNOW_TRANSPORTATION_EXPENSES_DETAILS,
    RoutePath.APPLYNOW_EXPENSES +
        "/" +
        RoutePath.APPLYNOW_TRANSPORTATION_EXPENSES_SUMMARY,

    RoutePath.APPLYNOW_EXPENSES + "/" + RoutePath.APPLYNOW_MEDICAL_EXPENSES,
    RoutePath.APPLYNOW_EXPENSES +
        "/" +
        RoutePath.APPLYNOW_MEDICAL_EXPENSES_DETAILS,
    RoutePath.APPLYNOW_EXPENSES +
        "/" +
        RoutePath.APPLYNOW_MEDICAL_EXPENSES_SUMMARY,
    RoutePath.APPLYNOW_EXPENSES +
        "/" +
        RoutePath.APPLYNOW_TAX_DEDUCTIBLE_EXPENSES,

    RoutePath.APPLYNOW_EXPENSES +
        "/" +
        RoutePath.APPLYNOW_TAX_DEDUCTIBLE_EXPENSES_DETAILS,
    RoutePath.APPLYNOW_EXPENSES +
        "/" +
        RoutePath.APPLYNOW_TAX_DEDUCTIBLE_EXPENSES_SUMMARY,
    RoutePath.APPLYNOW_EXPENSES + "/" + RoutePath.APPLYNOW_EXPENSESLEGALFEE,
    RoutePath.APPLYNOW_EXPENSES +
        "/" +
        RoutePath.APPLYNOW_EXPENSES_LEGALFEE_DETAILS,
    RoutePath.APPLYNOW_EXPENSES +
        "/" +
        RoutePath.APPLYNOW_EXPENSESLEGALFEESUMMARY,
    RoutePath.APPLYNOW_EXPENSES +
        "/" +
        RoutePath.APPLYNOW_HOUSING_ASSISTANCE_RECEIVED,
    RoutePath.APPLYNOW_EXPENSES +
        "/" +
        RoutePath.APPLYNOW_SHARED_EXPENSES_DETAILS,
          RoutePath.APPLYNOW_EXPENSES +
              "/" +
              RoutePath.APPLYNOW_EXPENSESUTILITYGATEPOST,
    RoutePath.APPLYNOW_EXPENSES +
        "/" +
        RoutePath.APPLYNOW_SHARED_EXPENSES_SUMMARY,

];



interface PageQueueActions {
    pageQueueUpdateAction: any;
}

//Pagequeue Household
