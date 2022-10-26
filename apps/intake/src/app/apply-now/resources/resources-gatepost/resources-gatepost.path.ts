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
        }
        return this.store.select(getApplyNow);
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
            RoutePath.APPLYNOW_RESOURCES +
            "/" +
            RoutePath.APPLYNOW_RESOURCES_RESOURCESGATEPOST,
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
        return this.getResourcesGatePost(name);
    }

    getResourcesGatePost(name: string): string[] {
        switch (name) {
            case ScreenQueueRoutesResourcesSituations.cashorotherfinancialHoldings:
                return [
                    RoutePath.APPLYNOW_RESOURCES +
                    "/" +
                    RoutePath.APPLYNOW_RESOURCES_FINANCIALHOLDINGSDETAILS,
                ];
            case ScreenQueueRoutesResourcesSituations.OwnsahomethatthehouseholdlivesIn:
                return [
                    RoutePath.APPLYNOW_RESOURCES +
                    "/" +
                    RoutePath.APPLYNOW_RESOURCES_RESIDENTIALPROPERTY,
                ];
            case ScreenQueueRoutesResourcesSituations.OwnsapropertyhouseholddoesnotliveIn:
                return [
                    RoutePath.APPLYNOW_RESOURCES +
                    "/" +
                    RoutePath.APPLYNOW_RESOURCES_NONRESIDENTIALPROPERTYDETAILS,
                ];
            case ScreenQueueRoutesResourcesSituations.expecttorecieveMoney:
                return [
                    RoutePath.APPLYNOW_RESOURCES +
                    "/" +
                    RoutePath.APPLYNOW_RESOURCES_EXPECTEDMONEYSTRUCTURE,
                ];

            case ScreenQueueRoutesResourcesSituations.resourcevehicles:
                return [
                    RoutePath.APPLYNOW_RESOURCES +
                    "/" +
                    RoutePath.APPLYNOW_RESOURCES_VEHICLEDETAILS,
                ];
            case ScreenQueueRoutesResourcesSituations.ownsburialSpace:
                return [
                    RoutePath.APPLYNOW_RESOURCES +
                    "/" +
                    RoutePath.APPLYNOW_RESOURCES_BURIALSPACEDETAILS,
                ];
            case ScreenQueueRoutesResourcesSituations.burialTrustAgreement:
                return [
                    RoutePath.APPLYNOW_RESOURCES +
                    "/" +
                    RoutePath.APPLYNOW_RESOURCES_BURIALORTRUSTAGREEMENTDETAILS,
                ];
            case ScreenQueueRoutesResourcesSituations.soldOrTransferredResource:
                return [
                    RoutePath.APPLYNOW_RESOURCES +
                    "/" +
                    RoutePath.APPLYNOW_RESOURCES_SOLDORTRANSFERREDRESOURCEDETAILS,
                ];
            case ScreenQueueRoutesResourcesSituations.closedAccount:
                return [
                    RoutePath.APPLYNOW_RESOURCES +
                    "/" +
                    RoutePath.APPLYNOW_RESOURCES_CLOSEDOREMPTIEDACCOUNTDETAILS,
                ];
            case ScreenQueueRoutesResourcesSituations.ownsinsurancepolicy:
                return [
                    RoutePath.APPLYNOW_RESOURCES +
                    "/" +
                    RoutePath.APPLYNOW_RESOURCES_LIFEINSURANCEPOLICYDETAILS,
                ];






            default: return [""];

        }
    }

    getDefaultRouteQueue() {
        return ApplyNowResourceSituations;
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
export enum ScreenQueueRoutesResourcesSituations {
    cashorotherfinancialHoldings = "financialholdingsdetails",
    OwnsahomethatthehouseholdlivesIn = "residentialproperty",
    OwnsapropertyhouseholddoesnotliveIn = "nonresidentialpropertydetails",
    expecttorecieveMoney = "expectedmoneystructure",
    resourcevehicles = "vehicledetails",
    ownsburialSpace = "burialspacedetails",
    burialTrustAgreement = "burialtrustagreement",
    closedAccount = "closedaccount",
    soldOrTransferredResource = "givenawayresources",
    ownsinsurancepolicy = "ownsinsurancepolicy"
}


export const ApplyNowResourceSituations = [

    RoutePath.APPLYNOW_RESOURCES +
    "/" +
    RoutePath.APPLYNOW_RESOURCES_FINANCIALHOLDINGSDETAILS,

    RoutePath.APPLYNOW_RESOURCES +
    "/" +
    RoutePath.APPLYNOW_RESOURCES_BURIALORTRUSTAGREEMENTDETAILS,

    RoutePath.APPLYNOW_RESOURCES +
    "/" +
    RoutePath.APPLYNOW_RESOURCES_CLOSEDOREMPTIEDACCOUNTDETAILS,

    RoutePath.APPLYNOW_RESOURCES +
    "/" +
    RoutePath.APPLYNOW_RESOURCES_LIFEINSURANCEPOLICYDETAILS,

    RoutePath.APPLYNOW_RESOURCES +
    "/" +
    RoutePath.APPLYNOW_RESOURCES_LIFEINSURANCEPOLICIESSUMMARY,

    RoutePath.APPLYNOW_RESOURCES +
    "/" +
    RoutePath.APPLYNOW_RESOURCES_SOLDORTRANSFERREDRESOURCEDETAILS,

    RoutePath.APPLYNOW_RESOURCES +
    "/" +
    RoutePath.APPLYNOW_RESOURCES_RESIDENTIALPROPERTY,
    



    RoutePath.APPLYNOW_RESOURCES +
    "/" +
    RoutePath.APPLYNOW_RESOURCES_NONRESIDENTIALPROPERTYDETAILS,

    RoutePath.APPLYNOW_RESOURCES +
    "/" +
    RoutePath.APPLYNOW_RESOURCES_EXPECTEDMONEYSTRUCTURE,

    RoutePath.APPLYNOW_RESOURCES +
    "/" +
    RoutePath.APPLYNOW_RESOURCES_VEHICLEDETAILS,

    RoutePath.APPLYNOW_RESOURCES +
    "/" +
    RoutePath.APPLYNOW_RESOURCES_BURIALSPACEDETAILS,



];

interface PageQueueActions {
    pageQueueUpdateAction: any;
}

//Pagequeue Household
