import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RoutePath } from '../route-strategies';
import { UtilService } from './util.service';
import { State } from '../../+state/app.state';
import { DoIQualifyPageActions } from '../../do-i-qualify/+state/actions';
import { getApplyNow } from '../../apply-now/+state/apply-now.selectors';
import { getDoIQualify } from '../../do-i-qualify/+state/do-i-qualify.selectors';
import { getReferrals } from '../../referrals/+state/referrals.selectors';
import { filter, Observable, Subscription } from 'rxjs';
import { ReferralsPageActions } from '../../referrals/+state/actions';
import { ApplyNowPageActions } from '../../apply-now/+state/actions';
import { Income, Programs, Resource } from './../../apply-now/+state/apply-now.models'
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

    getFirstPath() { 
        const map = this.state.pageQueue?.pageMap; 
        const id = this.state.pageQueue?.currentPageId as number; 
        if (map != null) {

            return Array.from(map)[0];

        }

        return -1;



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
        return  path;
        // alert(this.module + "/" + path);
        //alert(this.getCurrentPageQueueId()+' queueid');
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
        switch (this.module) {
            case RoutePath.DOIQUALIFY:
                return [
                    RoutePath.DOIQUALIFY +
                    "/" +
                    RoutePath.DOIQUALIFY_OTHERHOUSEHOLDSITUATIONS,
                ];
            case RoutePath.REFERRALS:
                return [
                    RoutePath.REFERRALS +
                    "/" +
                    RoutePath.REFERRALS_PROGRAMSELECTION,
                ];
            case RoutePath.APPLYNOW:
                if (this.router.url.indexOf("householdGatepost") > -1) {
                    return [
                        RoutePath.APPLYNOW +
                        "/" +
                        RoutePath.APPLYNOW_HOUSEHOLD +
                        "/" +
                        RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDBENEFITS,
                    ];
                } 
                else if (this.router.url.indexOf('/applynow/household/absentRelativeDetails') == 0 || this.router.url.indexOf('/applynow/household/householdUtilityAllow')==0) {
                    return [
                        RoutePath.APPLYNOW +
                        "/" +
                        RoutePath.APPLYNOW_HOUSEHOLD +
                        "/" +
                        RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDMEMBERSITUATIONGATEPOST,
                    ];
                }
                else if (this.router.url.indexOf(RoutePath.APPLYNOW_RESOURCES) > -1) {
                    return [
                        RoutePath.APPLYNOW +
                        "/" +
                        RoutePath.APPLYNOW_RESOURCES +
                        "/" +
                        RoutePath.APPLYNOW_RESOURCES_RESOURCESGATEPOST
                    ]
                }
                else {
                    return [
                        RoutePath.APPLYNOW +
                        "/" +
                        RoutePath.APPLYNOW_HOUSEHOLD +
                        "/" +
                        RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDBENEFITS,
                    ];
                }
        }
        return [""];
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
        switch (this.module) {
            case RoutePath.DOIQUALIFY:
                return this.getDoIQualifyPathName(name);
            case RoutePath.REFERRALS:
                return this.getReferralsPathName(name);
            case RoutePath.APPLYNOW:
                if (this.router.url.indexOf("householdGatepost") > -1) {
                    return this.getApplyNowGatePostPathName(name);
                } else if (this.router.url.indexOf(RoutePath.APPLYNOW_RESOURCES_RESOURCESGATEPOST) > -1) {
                    return this.getApplyNowResourcesGatePostPathName(name).concat([
                        RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_RESOURCESSUMMARY,
                        RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_RESOURCESENDING]);
                } else if (this.router.url.indexOf(RoutePath.APPLYNOW_INCOME_INCOMEGATEPOST) > -1) {
                    return this.getApplyNowIncomeGatePostPathName(name).concat([
                        RoutePath.APPLYNOW_INCOME + "/" + RoutePath.APPLYNOW_INCOME_SUMMARY,
                        RoutePath.APPLYNOW_INCOME + "/" + RoutePath.APPLYNOW_INCOME_ENDING]);
                }
                else if
                    (this.router.url.indexOf('householdMemberSituationGatepost') > -1) {
                    return this.getApplyNowMemberSituationGatepostPathName(name);
                }
                else {
                    return this.getApplyNowPathName(name);
                }
        }
        return [this.module];
    }

    getDoIQualifyPathName(name: string): string[] {
        switch (name) {
            case ScreenQueueRouteNameDIQ.isPayingHeat:
                return [""];
            case ScreenQueueRouteNameDIQ.hasIncome:
                return [
                    RoutePath.DOIQUALIFY_ONEORMOREJOB,
                    RoutePath.DOIQUALIFY_MONTHLYINCOME,
                ];
            case ScreenQueueRouteNameDIQ.hasOtherIncome:
                return [
                    RoutePath.DOIQUALIFY_WHOHASOTHERINCOME,
                    RoutePath.DOIQUALIFY_OTHERINCOME,
                ];
            case ScreenQueueRouteNameDIQ.isCurrentlyEnrolled:
                return [
                    RoutePath.DOIQUALIFY_CURRENTLYENROLLED,
                    RoutePath.DOIQUALIFY_TYPEOFENROLLMENT,
                ];
            case ScreenQueueRouteNameDIQ.isPregnant:
                return [RoutePath.DOIQUALIFY_WHOISPREGNANT];
            case ScreenQueueRouteNameDIQ.isInFosterCare:
                return [RoutePath.DOIQUALIFY_FOSTERCARE];
            case ScreenQueueRouteNameDIQ.childOfUnitedStatesVeteran:
                return [RoutePath.DOIQUALIFY_CHILDOFUSVETERAN];
            case ScreenQueueRouteNameDIQ.onGoingMedication:
                return [RoutePath.DOIQUALIFY_WHOHASDISABILITY];
            default:
                return [""];
        }
    }
    resetQueueId(id: number) {

        let currentPageId = id;

        const updatepageQueue = { ...this.state, pageQueue: { ...this.state.pageQueue, currentPageId } } as typeof this.state;

        this.store.dispatch(this.action.pageQueueUpdateAction.call(this, this.getObject(updatepageQueue)))

    }
    
    getReferralsPathName(name: string): string[] {
        switch (name) {
            case ScreenQueueRouteNameReferral.EI:
                return [RoutePath.REFERRALS_HOUSEHOLDDETAILS];
            case ScreenQueueRouteNameReferral.ID:
                return [RoutePath.REFERRALS_INTELLECTUAL_DISABILITY_SERVICES];
            case ScreenQueueRouteNameReferral.AS:
                return [RoutePath.REFERRALS_AUTISM_SERVICES];
            case ScreenQueueRouteNameReferral.information:
                return [
                    RoutePath.REFERRALS_MOREINFORMATION,
                    RoutePath.REFERRALS_CONTACTINFORMATION,
                    RoutePath.REFERRALS_SUMMARY,
                ];
            default:
                return [""];
        }
    }
    getIndividualSituationsPathName(name: string): string[] {
        switch (name) {
            case ScreenQueueRouteNameReferral.EI:
                return [RoutePath.REFERRALS_HOUSEHOLDDETAILS];
            case ScreenQueueRouteNameReferral.ID:
                return [RoutePath.REFERRALS_INTELLECTUAL_DISABILITY_SERVICES];
            case ScreenQueueRouteNameReferral.AS:
                return [RoutePath.REFERRALS_AUTISM_SERVICES];
            case ScreenQueueRouteNameReferral.information:
                return [
                    RoutePath.REFERRALS_MOREINFORMATION,
                    RoutePath.REFERRALS_CONTACTINFORMATION,
                    RoutePath.REFERRALS_SUMMARY,
                ];
            default:
                return [""];
        }
    }

    getApplyNowMemberSituationGatepostPathName(name: string): string[] {
        switch (name) {
            case ScreenQueueRouteNameApplyNowHouseholdMemberSituation.isReceivingUtilityAllowanceCheck:
                return [RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDUTILITYALLOW,
                RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSUMMARY];
            case ScreenQueueRouteNameApplyNowHouseholdMemberSituation.isParentNotLiveOrDiedFor21OrYounger:
                return [RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVEDETAILS,
                RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVERACE,
                RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVERESPONSIBLEFOR,
                RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVEADDRESS,
                RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVEEMPLOYERDETAILS,
                RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDABSENTRELATIVENONRESIDENTIALPROPERTY,
                RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDABSENTRELATIVECHILDSUPPORT
                ];
            case ScreenQueueRouteNameApplyNowHouseholdMemberSituation.isSpouseDiedOrNotLivingInTheHouse:
                return [RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVEDETAILS,
                RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVERACE,
                RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVERESPONSIBLEFOR,
                RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVEADDRESS,
                RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVEEMPLOYERDETAILS,
                RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDABSENTRELATIVENONRESIDENTIALPROPERTY,
                RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDABSENTRELATIVECHILDSUPPORT
                ];
            case ScreenQueueRouteNameApplyNowHouseholdMemberSituation.isNeedChildSupportOrHealthInsurance:
                return [RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVEDETAILS,
                RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVERACE,
                RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVERESPONSIBLEFOR,
                RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVEADDRESS,
                RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVEEMPLOYERDETAILS,
                RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDABSENTRELATIVENONRESIDENTIALPROPERTY,
                RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDABSENTRELATIVECHILDSUPPORT
                ];
            case ScreenQueueRouteNameApplyNowHouseholdMemberSituation.hasLivedInNursingFacility:
                return [RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_NURSINGFACILITYDETAILS,
                RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSUMMARY
                ];

            case ScreenQueueRouteNameApplyNowHouseholdMemberSituation.isLessEqual100InCashCheckingSaving:
                return [RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSUMMARY];
            case ScreenQueueRouteNameApplyNowHouseholdMemberSituation.isLess150BeforeTaxesAreTakenOut:
                return [RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSUMMARY];
            case ScreenQueueRouteNameApplyNowHouseholdMemberSituation.isUtilityMoreThanAsset:
                return [RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSUMMARY];
            default:
                return [RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSUMMARY];
        }
    }
    getApplyNowPathName(name: string): string[] {
       
        switch (name) {
            
            case Programs.HC:
                return [
                    RoutePath.APPLYNOW_HOUSEHOLD +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDBENEFITSCOVERAGE,
                    RoutePath.APPLYNOW_HOUSEHOLD +
                    "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDADDRESS
                ];
            case Programs.FS:
                return this.setFsPaths();
                   
            case Programs.CA:
                return [
                    RoutePath.APPLYNOW_HOUSEHOLD +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDCASHASSISTANCE,
                    RoutePath.APPLYNOW_HOUSEHOLD +
                    "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDADDRESS,
                    // RoutePath.APPLYNOW_HOUSEHOLD +
                    // "/" +
                    // RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDLIVEDINPA
                ];
            case Programs.BL:
                return [
                    RoutePath.APPLYNOW_HOUSEHOLD +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSCHOOLMEALS,
                    RoutePath.APPLYNOW_HOUSEHOLD +
                    "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDADDRESS
                ];
            // case ScreenQueueRouteNameHousehold.HeatingBill:
            //     return [RoutePath.REFERRALS_HOUSEHOLDDETAILS];
            case Programs.CI:
                return [
                    RoutePath.APPLYNOW_HOUSEHOLD +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDCHILDCARECOST,
                    RoutePath.APPLYNOW_HOUSEHOLD +
                    "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDADDRESS
                ];
            case Programs.LH:
                return [
                    RoutePath.APPLYNOW_HOUSEHOLD +
                    "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDADDRESS,
                    // RoutePath.APPLYNOW_HOUSEHOLD +
                    // "/" +
                    // RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDELECTRICPROVIDER,
                    // RoutePath.APPLYNOW_HOUSEHOLD +
                    // "/" +
                    // RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSITUATION,
                ];
            case Programs.LW:
                return [
                    RoutePath.APPLYNOW_HOUSEHOLD +
                    "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDADDRESS,
                    // RoutePath.APPLYNOW_HOUSEHOLD +
                    // "/" +
                    // RoutePath.f,
                    // RoutePath.APPLYNOW_HOUSEHOLD +
                    // "/" +
                    // RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSITUATION,
                ];

                
            // case ScreenQueueRouteNameHousehold.PayingYourWaterBill:
            //     return [RoutePath.REFERRALS_HOUSEHOLDDETAILS];
            case Programs.WN:
                return [
                    RoutePath.APPLYNOW_HOUSEHOLD +
                    "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDLONGTERMLIVINGSERVICES,
                    RoutePath.APPLYNOW_HOUSEHOLD +
                    "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDADDRESS,
                    RoutePath.APPLYNOW_HOUSEHOLD +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDLIVINGSIS
                ];
            default:
                return [  RoutePath.APPLYNOW_HOUSEHOLD +
                    "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDADDRESS ];
        }
    }
    getIndividualSituationsGatePost(name: string): string[] {
        switch (name) {
            case ScreenQueueRouteNameApplyNowGatePost.ssnbenefits:
                return [];
            case ScreenQueueRouteNameApplyNowGatePost.intermediateCare:
                return [];
            case ScreenQueueRouteNameApplyNowGatePost.otherStatesBenefits:
                return [
                    RoutePath.APPLYNOW_HOUSEHOLD +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDAPPLIEDBEFORE,
                ];

            case ScreenQueueRouteNameApplyNowGatePost.pnBenefits:
                return [];

            case ScreenQueueRouteNameApplyNowGatePost.SNAPbenefits:
                return [];
            case ScreenQueueRouteNameApplyNowGatePost.disqBenefits:
                return [];
            case ScreenQueueRouteNameApplyNowGatePost.someoneElseBenefits:
                return [
                    RoutePath.APPLYNOW_HOUSEHOLD +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDFOODSTAMPS,
                ];
            default:
                return [""];
        }
    }
    getApplyNowGatePostPathName(name: string): string[] {
        switch (name) {
            case ScreenQueueRouteNameApplyNowGatePost.ssnbenefits:
                return [RoutePath.APPLYNOW_HOUSEHOLD +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDCOUNTRYRECORDNO,
                ];
            case ScreenQueueRouteNameApplyNowGatePost.intermediateCare:
                return [];
            case ScreenQueueRouteNameApplyNowGatePost.otherStatesBenefits:
                return [
                    RoutePath.APPLYNOW_HOUSEHOLD +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDAPPLIEDBEFORE,
                ];

            case ScreenQueueRouteNameApplyNowGatePost.pnBenefits:
                return [];

            case ScreenQueueRouteNameApplyNowGatePost.SNAPbenefits:
                return [];
            case ScreenQueueRouteNameApplyNowGatePost.disqBenefits:
                return [];
            case ScreenQueueRouteNameApplyNowGatePost.someoneElseBenefits:
                return [
                    RoutePath.APPLYNOW_HOUSEHOLD +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDFOODSTAMPS,
                ];
            default:
                return [""];
        }
    }
    
    getApplyNowResourcesGatePostPathName(name: string): string[] {
        switch (name) {
            case Resource.FH:
                return [
                    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_FINANCIALHOLDINGS,
                    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_RESOURCESDETAILS,
                    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_FINANCIALHOLDINGSSUMMARY
                ];
            case Resource.ORP:
                return [
                    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_RESIDENTIALPROPERTY,
                    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_RESIDENTIALPROPERTYDETAILS,
                    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_RESIDENTIALPROPERTYOWNERS,
                    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_RESIDENTIALPROPERTYSUMMARY,
                ];
            case Resource.ONRP:
                return [
                    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_NONRESIDENTIALPROPERTYOWNERS,
                    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_NONRESIDENTIALPROPERTYDETAILS,
                    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_NONRESIDENTIALPROPERTYSUMMARY,
                ];
            case Resource.ERM:
                return [
                    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_EXPECTEDMONEYSTRUCTURE,
                    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_EXPECTEDMONEYSTRUCTURESUMMARY,
                ];
            case Resource.OV:
                return [
                    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_RESOURCESVEHICLES,
                    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_VEHICLEDETAILS,
                    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_VEHICLESUMMARY,
                ];
            case Resource.OBS:
                return [
                    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_BURIALSPACES,
                    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_BURIALSPACEDETAILS,
                    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_BURIALSPACESSUMMARY,
                ];
            case Resource.BOTA:
                return [
                    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_BURIALORTRUSTAGREEMENT,
                    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_BURIALORTRUSTAGREEMENTDETAILS,
                    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_BURIALORTRUSTAGREEMENTSUMMARY,
                ];
            case Resource.OLIP:
                return [
                    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_LIFEINSURANCEPOLICYDETAILS,
                    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_COVEREDINDIVIDUALS,
                    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_LIFEINSURANCEPOLICIESSUMMARY,
                ];
            case Resource.NONE:
                return [''];
            default:
                return [''];
        }
    }

    getApplyNowIncomeGatePostPathName(name: string): string[] {
        switch (name) {
            case Income.CFE:
                return [
                    RoutePath.APPLYNOW_INCOME + "/" + RoutePath.APPLYNOW_INCOME_FUTUREJOB,
                ];
            case Income.FAD:
                return [
                ];
            case Income.PE:
                return [
                    RoutePath.APPLYNOW_INCOME + "/" + RoutePath.APPLYNOW_INCOME_PASTJOB,
                ];
            case Income.OI:
                return [
                    RoutePath.APPLYNOW_INCOME + "/" + RoutePath.APPLYNOW_INCOME_OTHERINCOME,
                ];
            case Income.NOTA:
                return [
                    RoutePath.APPLYNOW_INCOME + "/"  +RoutePath.APPLYNOW_NO_INCOME
                ];
            default:
                return [''];
        }
    }

    getDefaultRouteQueue() {
        switch (this.module) {
            case RoutePath.DOIQUALIFY:
                return DIQPageQueue;
            case RoutePath.APPLYNOW:
                if (this.router.url.indexOf("householdGatepost") > -1) {
                    return ApplyNowHouseholdGatePost;
                }
                else if (this.router.url.indexOf('householdMemberSituationGatepost') > -1) {
                    return APPNowHouseholdMemberSituationGatepostYesNoPageQueue;
                }
				else if (this.router.url.indexOf(RoutePath.APPLYNOW_RESOURCES_RESOURCESGATEPOST) > -1) {
                    return ApplyNowResourcesGatepost;
                } 
                else if (this.router.url.indexOf(RoutePath.APPLYNOW_INCOME_INCOMEGATEPOST) > -1) {
                    return ApplyNowIncomeGatepost;
                }
                else {
                    return ApplyNowHouseholdPageQueue;
                }
                break;
            case RoutePath.REFERRALS:
                return ReferralPageQueue;
        }
        return [this.module];
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
        switch (this.module) {
            case RoutePath.DOIQUALIFY:
                return {
                    pageQueueUpdateAction:
                        DoIQualifyPageActions.updateScreenQueueAction,
                };
            case RoutePath.REFERRALS:
                return {
                    pageQueueUpdateAction:
                        ReferralsPageActions.updateScreenQueueAction,
                };
            case RoutePath.APPLYNOW:
                return {
                    pageQueueUpdateAction:
                        ApplyNowPageActions.updateScreenQueueAction,
                };
        }
        return null;
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

        return conditionalPrograms.some((value) => {
            return selectedPrograms.indexOf(value) !== -1;
        });
    }
    setFsPaths(){
        if(this.selectedValues.length==1){
            return this.FSOnlyPaths;
        }
        
        else if (this.areProgramsExist(this.selectedValues, [Programs.HC, Programs.CA, Programs.FS],Programs.FS)){
            return this.FSAndOtherBenefitsPath
        }
        return [];
    }
    get FSOnlyPaths(){
        return [
            RoutePath.APPLYNOW_HOUSEHOLD +
            "/" +
            RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSNAPSCREEN,
            RoutePath.APPLYNOW_HOUSEHOLD +
            "/" +
            RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSNAPDISABILITY,
            RoutePath.APPLYNOW_HOUSEHOLD +
            "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDADDRESS


        ]
    }
    get FSAndOtherBenefitsPath(){
        
         return            [
            RoutePath.APPLYNOW_HOUSEHOLD +
            "/" +
            RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSNAPSCREEN,
            // RoutePath.APPLYNOW_HOUSEHOLD +
            // "/" +
            // RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSNAPDISABILITY,

            RoutePath.APPLYNOW_HOUSEHOLD +
            "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDADDRESS,
            // RoutePath.APPLYNOW_HOUSEHOLD +
            // "/" +
            // RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDQUICKSNAPEND,
        ];
        
    }
}
export enum ScreenQueueRouteNameReferral {
    ID = "ID",
    EI = "EI",
    AS = "AS",
    information = "information"
}

export enum ScreenQueueRouteNameApplyNowGatePost {
    ssnbenefits = 'ssnbenefits',
    intermediateCare = 'intermediateCare',
    otherStatesBenefits = 'otherStatesBenefits',
    pnBenefits = 'pnBenefits',
    SNAPbenefits = 'SNAPbenefits',
    disqBenefits = 'disqBenefits',
    someoneElseBenefits = 'someoneElseBenefits'
}


export enum ScreenQueueRouteNameDIQ {

    isPayingHeat = "isPayingHeat",
    isTwentyOneOrYoungerAndNoParent = "isTwentyOneOrYoungerAndNoParent",
    isSpouseAbsentee = "isSpouseAbsentee",
    isLostJobOrReducedHoursLastYear = "isLostJobOrReducedHoursLastYear",
    isWantHelpPayingMedicalBillsForLastThreeMonths = "isWantHelpPayingMedicalBillsForLastThreeMonths",
    isInMedicalOrLivingServices = "isInMedicalOrLivingServices",
    isVictimOfDomesticAbuse = "isVictimOfDomesticAbuse",
    isInTreatmentOfDrugAndAlchoholAbuse = "isInTreatmentOfDrugAndAlchoholAbuse",
    isPregnant = "isPregnant",
    hasIncome = "hasIncome",
    hasOtherIncome = "hasOtherIncome",
    isCurrentlyEnrolled = "isCurrentlyEnrolled",
    isInFosterCare = "isInFosterCare",
    childOfUnitedStatesVeteran = "childOfUnitedStatesVeteran",
    onGoingMedication = "onGoingMedication"

}

export enum ScreenQueueRouteNameApplyNowHouseholdMemberSituation {

    isLess150BeforeTaxesAreTakenOut = "isLess150BeforeTaxesAreTakenOut",
    isLessEqual100InCashCheckingSaving = "isLessEqual100InCashCheckingSaving",
    isUtilityMoreThanAsset = "isUtilityMoreThanAsset",
    isReceivingUtilityAllowanceCheck = "isReceivingUtilityAllowanceCheck",
    isParentNotLiveOrDiedFor21OrYounger = "isParentNotLiveOrDiedFor21OrYounger",
    isSpouseDiedOrNotLivingInTheHouse = "isSpouseDiedOrNotLivingInTheHouse",
    isNeedChildSupportOrHealthInsurance = "isNeedChildSupportOrHealthInsurance",
    hasLivedInNursingFacility = "hasLivedInNursingFacility",
    isLivingInCertifiedShelter = "isLivingInCertifiedShelter",
    isLostJobReducedHoursWithNoFaultInLastYr = "isLostJobReducedHoursWithNoFaultInLastYr",
    isDisbledBlindIllOrNeedtoOvercomeDrugOrAlcohol = "isDisbledBlindIllOrNeedtoOvercomeDrugOrAlcohol",
    isReceivingTreatmentForDrugOrAlcohol = "isReceivingTreatmentForDrugOrAlcohol"
}

export enum ScreenQueueRouteNameHousehold {
    //  this.benefits =["CA","HS", "FS", "BL","LH","CI","HA","ES","CAR","ECA","LHP","LN","LI","WN","WNR","HC","MAR","MCR","MI"]

    healthcareCoverage = "healthcareCoverage",
    FoodAssistance = "FoodAssistance",
    CashAssistance = "CashAssistance",
    FreeSchoolMeals = "FreeSchoolMeals",
    HeatingBill = "HeatingBill",
    ChildCareCost = "ChildCareCost",
    PayingYourWaterBill = "PayingYourWaterBill",
    HomeorCommunityFacility = "HomeorCommunityFacility"

}
export enum ScreenQueueRoutesIndividualSituations {
    currentStudent = "currentStudent",
    educationProgram = "educationProgram",
    millitaryDuty = "millitaryDuty",
    hasReprestative = "hasReprestative",
    isPregnant = "isPregnant",
    filingIncomeTax = "filingIncomeTax",
    taxDependent = "taxDependent",
    domesticViolence = "domesticViolence",
    isHomeless = "isHomeless",
    migrantWorker = "migrantWorker",
    isFedTribe = "isFedTribe",
    issuedSummons = "issuedSummons"
}
export const DIQPageQueue = [RoutePath.DOIQUALIFY_ONEORMOREJOB, RoutePath.DOIQUALIFY_MONTHLYINCOME, RoutePath.DOIQUALIFY_WHOHASOTHERINCOME, RoutePath.DOIQUALIFY_OTHERINCOME,
RoutePath.DOIQUALIFY_CURRENTLYENROLLED, RoutePath.DOIQUALIFY_TYPEOFENROLLMENT, RoutePath.DOIQUALIFY_WHOHASDISABILITY, RoutePath.DOIQUALIFY_WHOISPREGNANT, RoutePath.DOIQUALIFY_CHILDOFUSVETERAN, RoutePath.DOIQUALIFY_FOSTERCARE, RoutePath.DOIQUALIFY_RESULTS]

export const APPNowHouseholdMemberSituationGatepostYesNoPageQueue = [
    RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDUTILITYALLOW,
    RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVEDETAILS,
    RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVERACE,
    RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVERESPONSIBLEFOR,
    RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVEADDRESS,
    RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVEEMPLOYERDETAILS,
    RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDABSENTRELATIVENONRESIDENTIALPROPERTY,
    RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDABSENTRELATIVECHILDSUPPORT,
    RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDABSENTRELATIVECHILDSUPPORTSCREEN,
    RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDABSENTRELATIVESUMMARY,
    RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_NURSINGFACILITYDETAILS,
    RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSUMMARY,
    RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDENDING]

export const ReferralPageQueue = [RoutePath.REFERRALS_HOUSEHOLDDETAILS, RoutePath.REFERRALS_INTELLECTUAL_DISABILITY_SERVICES, RoutePath.REFERRALS_AUTISM_SERVICES, RoutePath.REFERRALS_MOREINFORMATION, RoutePath.REFERRALS_CONTACTINFORMATION, RoutePath.REFERRALS_SUMMARY,]

export const ApplyNowHouseholdPageQueue = [
    RoutePath.APPLYNOW_HOUSEHOLD +
    "/" +
    RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDBENEFITSCOVERAGE,
    RoutePath.APPLYNOW_HOUSEHOLD +
    "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSNAPSCREEN,
    RoutePath.APPLYNOW_HOUSEHOLD +
    "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSNAPDISABILITY,
    // RoutePath.APPLYNOW_HOUSEHOLD +
    // "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDQUICKSNAPEND,
    RoutePath.APPLYNOW_HOUSEHOLD +
    "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDCASHASSISTANCE,
    // RoutePath.APPLYNOW_HOUSEHOLD +
    // "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDLIVEDINPA,
    RoutePath.APPLYNOW_HOUSEHOLD +
    "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDCHILDCARECOST,
    RoutePath.APPLYNOW_HOUSEHOLD +
    "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSCHOOLMEALS,
    // RoutePath.APPLYNOW_HOUSEHOLD +
    // "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDELECTRICPROVIDER,
    // RoutePath.APPLYNOW_HOUSEHOLD +
    // "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDWATERQUES,
    // RoutePath.APPLYNOW_HOUSEHOLD +
    // "/" +
    // RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSITUATION,
    RoutePath.APPLYNOW_HOUSEHOLD +
    "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDLONGTERMLIVINGSERVICES,
    RoutePath.APPLYNOW_HOUSEHOLD +
    "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDADDRESS
]

export const ApplyNowHouseholdGatePost = [
    RoutePath.APPLYNOW_HOUSEHOLD +
    "/" +
    RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDAPPLIEDBEFORE,
    RoutePath.APPLYNOW_HOUSEHOLD +
    "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDCOUNTRYRECORDNO,
    RoutePath.APPLYNOW_HOUSEHOLD +
    "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDFOODSTAMPS,
]

export const ApplyNowIndividualSituations = [
    RoutePath.APPLYNOW +
    "/" +
    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
    "/" +
    RoutePath.APPLYNOW_WHO_CURRENT_STUDENT,
    RoutePath.APPLYNOW +
    "/" +
    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
    "/" +
    RoutePath.APPLYNOW_CURRENT_EDUCATON_DETAILS,
    RoutePath.APPLYNOW +
    "/" +
    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
    "/" +
    RoutePath.APPLYNOW_CURRENT_EDUCATON_SUMMARY,
    RoutePath.APPLYNOW +
    "/" +
    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
    "/" +
    RoutePath.APPLYNOW_WHO_TRAIN,
    RoutePath.APPLYNOW +
    "/" +
    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
    "/" +
    RoutePath.APPLYNOW_TRAINING_DETAILS,
    RoutePath.APPLYNOW +
    "/" +
    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
    "/" +
    RoutePath.APPLYNOW_TRAINING_SUMMARY,
    RoutePath.APPLYNOW +
    "/" +
    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
    "/" +
    RoutePath.APPLYNOW_CURRENT_PAST_MILATARY_MEMEBER,
    RoutePath.APPLYNOW +
    "/" +
    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
    "/" +
    RoutePath.APPLYNOW_MILATARY_STATUS,
    RoutePath.APPLYNOW +
    "/" +
    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
    "/" +
    RoutePath.APPLYNOW_INDIVIDUAL_MILATARY_DETAILS,
    RoutePath.APPLYNOW +
    "/" +
    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
    "/" +
    RoutePath.APPLYNOW_MILATARY_SUMMARY,
    RoutePath.APPLYNOW +
    "/" +
    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
    "/" +
    RoutePath.APPLYNOW_INDIVIDUAL_VETERAN_RELATIVE_DETAILS,
    RoutePath.APPLYNOW +
    "/" +
    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
    "/" +
    RoutePath.APPLYNOW_WHO_VETERAN_RELATIVE,
    RoutePath.APPLYNOW +
    "/" +
    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
    "/" +
    RoutePath.APPLYNOW_VETERAN_MILATARY_SUMMARY,
    RoutePath.APPLYNOW +
    "/" +
    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
    "/" +
    RoutePath.APPLYNOW_ADDITIONAL_CONTACT,
    RoutePath.APPLYNOW +
    "/" +
    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
    "/" +
    RoutePath.APPLYNOW_ADDITIONAL_CONTACT_DETAILS,
];

export const ApplyNowResourcesGatepost = [
    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_FINANCIALHOLDINGS,
    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_RESOURCESDETAILS,
    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_FINANCIALHOLDINGSSUMMARY,
    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_RESIDENTIALPROPERTY,
    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_RESIDENTIALPROPERTYDETAILS,
    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_RESIDENTIALPROPERTYOWNERS,
    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_RESIDENTIALPROPERTYSUMMARY,
    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_NONRESIDENTIALPROPERTYOWNERS,
    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_NONRESIDENTIALPROPERTYDETAILS,
    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_NONRESIDENTIALPROPERTYSUMMARY,
    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_EXPECTEDMONEYSTRUCTURE,
    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_EXPECTEDMONEYSTRUCTURESUMMARY,
    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_RESOURCESVEHICLES,
    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_VEHICLEDETAILS,
    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_VEHICLESUMMARY,
    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_BURIALSPACES,
    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_BURIALSPACEDETAILS,
    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_BURIALSPACESSUMMARY,
    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_BURIALORTRUSTAGREEMENT,
    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_BURIALORTRUSTAGREEMENTDETAILS,
    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_BURIALORTRUSTAGREEMENTSUMMARY,
    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_LIFEINSURANCEPOLICIES,
    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_LIFEINSURANCEPOLICYDETAILS,
    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_COVEREDINDIVIDUALS,
    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_LIFEINSURANCEPOLICIESSUMMARY,
    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_RESOURCESSUMMARY,
    RoutePath.APPLYNOW_RESOURCES + "/" + RoutePath.APPLYNOW_RESOURCES_RESOURCESENDING,
]

export const ApplyNowIncomeGatepost = [
    RoutePath.APPLYNOW_INCOME + "/" + RoutePath.APPLYNOW_INCOME_FUTUREJOB,
    RoutePath.APPLYNOW_INCOME + "/" + RoutePath.APPLYNOW_INCOME_PASTJOB,
    RoutePath.APPLYNOW_INCOME + "/" + RoutePath.APPLYNOW_INCOME_OTHERINCOME,
    RoutePath.APPLYNOW_INCOME + "/" + RoutePath.APPLYNOW_NO_INCOME,
]

interface PageQueueActions {
    pageQueueUpdateAction: any;
}

//Pagequeue Household

