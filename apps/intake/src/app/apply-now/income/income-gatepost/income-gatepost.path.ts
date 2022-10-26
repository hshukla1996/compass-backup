import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { State } from "../../../+state/app.state";
import { getApplyNow } from "../../../apply-now/+state/apply-now.selectors";
import { getDoIQualify } from "../../../do-i-qualify/+state/do-i-qualify.selectors";
import { getReferrals } from "../../../referrals/+state/referrals.selectors";
import { filter, Observable, Subscription } from "rxjs";
import { ApplyNowPageActions } from "../../../apply-now/+state/actions";
import { Programs } from "../../../apply-now/+state/apply-now.models";
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

    getCurrentPage() {
        const map = this.state.pageQueue?.pageMap;
        const id = this.state.pageQueue?.currentPageId as number;
        if (map != null) {
            return Array.from(map)[id];
        }
        return -1;
    }
    getCurrentPageQueueId() {
        const queue = this.state?.pageQueue ?? null;
        if (queue != null) {
            return this.state.pageQueue?.currentPageId ?? 0;
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
    next(firstUserId: any = null) {
        this.currentUserId = firstUserId;
        this.nextPath();
    }

    getGetwayPath() {
        return [
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_INCOME +
            "/" +
            RoutePath.APPLYNOW_INCOME_INCOMEGATEPOST,
        ];
    }
    composePath(arr: any) {
        let routeArry = [] as string[];
        this.selectedValues = arr;
        arr.forEach((path: any) => {
            if (path != "") {
                routeArry = routeArry.concat(this.getPathName(path));
            }
        });
        return routeArry;
    }

    updatePageQueue(pageMap: any, currentPageId: any, queueName: any) {
        const updatepageQueue = {
            ...this.state,
            pageQueue: {
                ...this.state.pageQueue,
                pageMap,
                currentPageId,
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
        let currentPageId = (this.state.pageQueue?.currentPageId ?? 0) + pageId;
        const updatepageQueue = {
            ...this.state,
            pageQueue: { ...this.state.pageQueue, currentPageId },
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

    getPathName(name: string): string[] {
        return this.getIncomeGatePost(name);
    }

    getIncomeGatePost(name: string): string[] {
        switch (name) {
            case ScreenQueueRoutesIncomeSituations.incomefutureJob:
                return [
                    RoutePath.APPLYNOW_INCOME +
                    "/" +
                    RoutePath.APPLYNOW_INCOME_FUTUREJOB,
                ];
            case ScreenQueueRoutesIncomeSituations.incomepastJob:
                return [
                    RoutePath.APPLYNOW_INCOME +
                    "/" +
                    RoutePath.APPLYNOW_INCOME_PASTJOB,
                ];
            case ScreenQueueRoutesIncomeSituations.otherincome:
                return [
                    RoutePath.APPLYNOW_INCOME +
                    "/" +
                    RoutePath.APPLYNOW_INCOME_OTHERINCOME,
                ];
            case ScreenQueueRoutesIncomeSituations.disabilityassistance:
                return [
                    RoutePath.APPLYNOW_INCOME +
                    "/" +
                    RoutePath.APPLYNOW_INCOME_DISABILITYFINANCIALASSISTANCE,
                ];
            case ScreenQueueRoutesIncomeSituations.noincome:
                return  [
                    RoutePath.APPLYNOW_INCOME +
                    "/" +
                    RoutePath.APPLYNOW_NO_INCOME,
                ];
            default: return  [""];
           
        }
    }

    getDefaultRouteQueue() {
        return ApplyNowIncomeSituations;
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
export enum ScreenQueueRoutesIncomeSituations {
    incomefutureJob = "incomefutureJob",
    incomepastJob = "incomepastJob",
    otherincome = "otherincome",
    disabilityassistance = "disabilityassistance",
    noincome="noincome",
}
/*
export const APPNowHouseholdMemberSituationPageQueue = [RoutePath.DOIQUALIFY_ONEORMOREJOB, RoutePath.DOIQUALIFY_MONTHLYINCOME, RoutePath.DOIQUALIFY_WHOHASOTHERINCOME, RoutePath.DOIQUALIFY_OTHERINCOME,
RoutePath.DOIQUALIFY_CURRENTLYENROLLED, RoutePath.DOIQUALIFY_TYPEOFENROLLMENT, RoutePath.DOIQUALIFY_WHOHASDISABILITY, RoutePath.DOIQUALIFY_WHOISPREGNANT, RoutePath.DOIQUALIFY_CHILDOFUSVETERAN, RoutePath.DOIQUALIFY_FOSTERCARE, RoutePath.DOIQUALIFY_RESULTS]
*/

export const ApplyNowIncomeSituations = [
    RoutePath.APPLYNOW_INCOME +
    "/" +
    RoutePath.APPLYNOW_INCOME_FUTUREJOB,

    RoutePath.APPLYNOW_INCOME +
    "/" +
    RoutePath.APPLYNOW_INCOME_PASTJOB,

    RoutePath.APPLYNOW_INCOME +
    "/" +
    RoutePath.APPLYNOW_INCOME_OTHERINCOME,

    RoutePath.APPLYNOW_INCOME +
    "/" +
    RoutePath.APPLYNOW_INCOME_DISABILITYFINANCIALASSISTANCE,

    RoutePath.APPLYNOW_INCOME +
    "/" +
    RoutePath.APPLYNOW_NO_INCOME,

];
interface PageQueueActions {
    pageQueueUpdateAction: any;
}

//Pagequeue Household
