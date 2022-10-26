import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { State } from "../../+state/app.state";
import { getApplyNow } from "../+state/apply-now.selectors";
import { getDoIQualify } from "../../do-i-qualify/+state/do-i-qualify.selectors";
import { getReferrals } from "../../referrals/+state/referrals.selectors";
import { Observable, Subscription } from "rxjs";
import { ApplyNowPageActions } from "../+state/actions";
import { RoutePath } from "../../shared/route-strategies";
import { UtilService } from "../../shared/services/util.service";
import { IHouseHold } from "../household/household-model";
import { ApplyNowStoreService } from "../apply-now-store-service";
import { INDIVIDUAL_PROGRAMS } from "../../shared/constants/Individual_Programs_Constants";
@Injectable({ providedIn: "root" })
export class EntryScreenQueueUtil {
    subscription = new Subscription();
    state!: any;
    module!: any;
    action!: PageQueueActions;
    currentUserId: any;
    currentUser!: IHouseHold;
    selectedValues = [];
    constructor(
        private store: Store<State>,
        private utilService: UtilService,
        private service: ApplyNowStoreService,
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
            RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_INDIVIDUALDETAILS,
        ];
    }
    composePath() {
        const routeArry = this.getPathNames();

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
    resetPageQueueId() {
        let currentPageId = 0;
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
    initRevDynamicRoutes(
        ind: IHouseHold,
        lastPath: any = null,
        queueName = ""
    ) {
        this.currentUser = ind;
        const paths = this.getDynamicRoutes(lastPath);
       

        this.updatePageQueue(paths, paths.length-2, queueName);
        this.initStore().subscribe((data) => {
            this.state = data;
        });
    }
    initDynamicRoutes(ind: IHouseHold, lastPath: any = null, queueName = "") {
        this.currentUser = ind;
        const paths = this.getDynamicRoutes(lastPath);
        this.resetPageQueueId();

        this.updatePageQueue(paths, 0, queueName);
        this.initStore().subscribe((data) => {
            this.state = data;
        });
    }
    getDynamicRoutes(lastPath: any) {
        const routeArray = this.composePath();
        const dynamicRoutes = routeArray.concat(lastPath);
        return dynamicRoutes;
    }

    getPathNames() {
        const paths = [];
        console.log("getPathNames");
        console.log(this.currentUser);
        let personalBenefits = this.service?.getAppliedBenefitsForIndividual(
            this.currentUser
        ) as string[];
        console.log("pseronsal Benefits");
        console.log(personalBenefits);
        console.log(this.currentUser);
        const isGDEligible = this.service.areProgramsExist(personalBenefits, [
            INDIVIDUAL_PROGRAMS.HC,
            INDIVIDUAL_PROGRAMS.HA,
            INDIVIDUAL_PROGRAMS.ABR,
            INDIVIDUAL_PROGRAMS.CA,
            INDIVIDUAL_PROGRAMS.CAR,
            INDIVIDUAL_PROGRAMS.LN,
            INDIVIDUAL_PROGRAMS.LI,
            INDIVIDUAL_PROGRAMS.LNR,
            INDIVIDUAL_PROGRAMS.LH,
            INDIVIDUAL_PROGRAMS.LHP,
            INDIVIDUAL_PROGRAMS.LHCR,
            INDIVIDUAL_PROGRAMS.LIR,
            INDIVIDUAL_PROGRAMS.CI,
            INDIVIDUAL_PROGRAMS.CIR,
            INDIVIDUAL_PROGRAMS.FP,
            INDIVIDUAL_PROGRAMS.FPR,
            INDIVIDUAL_PROGRAMS.PE,
            INDIVIDUAL_PROGRAMS.WN,
            INDIVIDUAL_PROGRAMS.WNR,
            INDIVIDUAL_PROGRAMS.WAR,
            INDIVIDUAL_PROGRAMS.MI,
            INDIVIDUAL_PROGRAMS.SMA,
            INDIVIDUAL_PROGRAMS.ECA,
            INDIVIDUAL_PROGRAMS.LW,
            INDIVIDUAL_PROGRAMS.FS,
            INDIVIDUAL_PROGRAMS.ES,
            INDIVIDUAL_PROGRAMS.ESR,
            INDIVIDUAL_PROGRAMS.FSR,
            INDIVIDUAL_PROGRAMS.MCR,
            INDIVIDUAL_PROGRAMS.MAR,
            INDIVIDUAL_PROGRAMS.CHR,
        ]);
        const isRaceEligible = this.service.areProgramsExist(personalBenefits, [
            INDIVIDUAL_PROGRAMS.LH,
            INDIVIDUAL_PROGRAMS.LHP,
            INDIVIDUAL_PROGRAMS.LHCR,
            INDIVIDUAL_PROGRAMS.LW,
            INDIVIDUAL_PROGRAMS.HC,
            INDIVIDUAL_PROGRAMS.HA,
            INDIVIDUAL_PROGRAMS.MCR,
            INDIVIDUAL_PROGRAMS.MAR,
            INDIVIDUAL_PROGRAMS.CA,
            INDIVIDUAL_PROGRAMS.CAR,
            INDIVIDUAL_PROGRAMS.FS,
            INDIVIDUAL_PROGRAMS.ES,
            INDIVIDUAL_PROGRAMS.ESR,
            INDIVIDUAL_PROGRAMS.FSR,
            INDIVIDUAL_PROGRAMS.LN,
            INDIVIDUAL_PROGRAMS.LI,
            INDIVIDUAL_PROGRAMS.WN,
            INDIVIDUAL_PROGRAMS.WNR,
            INDIVIDUAL_PROGRAMS.WAR,
            INDIVIDUAL_PROGRAMS.LIR,
            INDIVIDUAL_PROGRAMS.BL,
            INDIVIDUAL_PROGRAMS.FP,
            INDIVIDUAL_PROGRAMS.FPR,
            INDIVIDUAL_PROGRAMS.CI,
            INDIVIDUAL_PROGRAMS.CIR,
            INDIVIDUAL_PROGRAMS.LNR,
        ]);
        const isSSNEligible = this.service.areProgramsExist(personalBenefits, [
            INDIVIDUAL_PROGRAMS.HC,
            INDIVIDUAL_PROGRAMS.HA,
            INDIVIDUAL_PROGRAMS.MCR,
            INDIVIDUAL_PROGRAMS.MAR,
            INDIVIDUAL_PROGRAMS.CHR,
            INDIVIDUAL_PROGRAMS.ABR,
            INDIVIDUAL_PROGRAMS.CA,
            INDIVIDUAL_PROGRAMS.CAR,
            INDIVIDUAL_PROGRAMS.FS,
            INDIVIDUAL_PROGRAMS.ES,
            INDIVIDUAL_PROGRAMS.FSR,
            INDIVIDUAL_PROGRAMS.ESR,
            INDIVIDUAL_PROGRAMS.LN,
            INDIVIDUAL_PROGRAMS.LI,
            INDIVIDUAL_PROGRAMS.WN,
            INDIVIDUAL_PROGRAMS.WNR,
            INDIVIDUAL_PROGRAMS.WAR,
            INDIVIDUAL_PROGRAMS.LIR,
            INDIVIDUAL_PROGRAMS.LH,
            INDIVIDUAL_PROGRAMS.LHP,
            INDIVIDUAL_PROGRAMS.LHCR,
            INDIVIDUAL_PROGRAMS.CI,
            INDIVIDUAL_PROGRAMS.CIR,
            INDIVIDUAL_PROGRAMS.BL,
            INDIVIDUAL_PROGRAMS.FP,
            INDIVIDUAL_PROGRAMS.FPR,
            INDIVIDUAL_PROGRAMS.LNR,
            INDIVIDUAL_PROGRAMS.PE,
            INDIVIDUAL_PROGRAMS.MI,
            INDIVIDUAL_PROGRAMS.SMA,
            INDIVIDUAL_PROGRAMS.ECA,
            INDIVIDUAL_PROGRAMS.LW,
        ]);
        const isDLEligible = this.service.areProgramsExist(personalBenefits, [
            INDIVIDUAL_PROGRAMS.HC,
            INDIVIDUAL_PROGRAMS.MCR,
            INDIVIDUAL_PROGRAMS.CHR,
            INDIVIDUAL_PROGRAMS.HA,
            INDIVIDUAL_PROGRAMS.MAR,
            INDIVIDUAL_PROGRAMS.ABR,
            INDIVIDUAL_PROGRAMS.CA,
            INDIVIDUAL_PROGRAMS.CAR,
            INDIVIDUAL_PROGRAMS.FS,
            INDIVIDUAL_PROGRAMS.FSR,
            INDIVIDUAL_PROGRAMS.LN,
            INDIVIDUAL_PROGRAMS.LNR,
            INDIVIDUAL_PROGRAMS.LI,
            INDIVIDUAL_PROGRAMS.LIR,
            INDIVIDUAL_PROGRAMS.FP,
            INDIVIDUAL_PROGRAMS.FPR,
            INDIVIDUAL_PROGRAMS.WN,
            INDIVIDUAL_PROGRAMS.WNR,
            INDIVIDUAL_PROGRAMS.WAR,
            INDIVIDUAL_PROGRAMS.ECA,
        ]);
        if (isGDEligible) {
            paths.push(
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                    "/" +
                    RoutePath.APPLYNOW_GENERAL_DETAILS
            );
        }
        if (isRaceEligible) {
            paths.push(
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                    "/" +
                    RoutePath.APPLYNOW_RACE
            );
        }
        if (isSSNEligible) {
            paths.push(
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                    "/" +
                    RoutePath.APPLYNOW_SOCAIL_SECURITY_NUMBER
            );
        }
        if (isDLEligible) {
            paths.push(
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                    "/" +
                    RoutePath.APPLYNOW_DRIVING_LICENSE
            );
        }
        return paths;
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

export const ApplyNowIndividualSituations = [
    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
        "/" +
        RoutePath.APPLYNOW_GENERAL_DETAILS,

    RoutePath.APPLYNOW_INDIVIDUALDETAILS + "/" + RoutePath.APPLYNOW_RACE,

    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
        "/" +
        RoutePath.APPLYNOW_SOCAIL_SECURITY_NUMBER,

    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
        "/" +
        RoutePath.APPLYNOW_DRIVING_LICENSE,

    RoutePath.APPLYNOW_INDIVIDUALDETAILS + "/" + RoutePath.APPLYNOW_CITIZENSHIP,
];
interface PageQueueActions {
    pageQueueUpdateAction: any;
}

//Pagequeue Household
