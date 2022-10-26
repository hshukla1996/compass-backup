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
  updateForwardPath() {
    const individualCurrentPageId = this.state.pageQueue?.individualCurrentPageId as number;
    const individualpageMap = { ...this.state.pageQueue?.individualpageMap };
    if (individualpageMap.farwardPaths) {
      const farwardPaths = [...individualpageMap.farwardPaths]
      farwardPaths[individualCurrentPageId] = individualpageMap.backPaths[individualCurrentPageId]
      individualpageMap.farwardPaths = farwardPaths;
    }

    const updatepageQueue = {
      ...this.state,
      pageQueue: {
        ...this.state.pageQueue,
        individualpageMap,
        individualCurrentPageId
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
    const map = this.state.pageQueue?.individualpageMap.farwardPaths;
    const id = this.state.pageQueue?.individualCurrentPageId as number;
    if (map != null) {
      return Array.from(map)[id];
    }
    return -1;
  }
  getCurrentBackPage() {
    const map = this.state.pageQueue?.individualpageMap.backPaths;
    const id = this.state.pageQueue?.individualCurrentPageId as number;
    if (map != null) {
      return Array.from(map)[id];
    }
    return -1;
  }
  getCurrentPageQueueId() {
    const queue = this.state?.pageQueue ?? null;
    if (queue != null) {
      return this.state.pageQueue?.individualCurrentPageId ?? 0;
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
    if (id <= 0 || id > this.state.pageQueue?.individualpageMap.backPaths.length) {
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
      RoutePath.APPLYNOW_INDIVIDUALDETAILS +
      "/" +
      RoutePath.APPLYNOW_INDIVIDUAL_GATEPOST,
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

  updatePageQueue(individualpageMap: any, individualCurrentPageId: any) {
    const updatepageQueue = {
      ...this.state,
      pageQueue: {
        ...this.state.pageQueue,
        individualpageMap,
        individualCurrentPageId
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
    const individualCurrentPageId =
      (this.state.pageQueue?.individualCurrentPageId ?? 0) + pageId;
    const updatepageQueue = {
      ...this.state,
      pageQueue: { ...this.state.pageQueue, individualCurrentPageId },
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
      farwardPaths: this.getDynamicRoutes(routeFrontArray, lastPath),
      backPaths: this.getDynamicRoutes(routeBackArray, null)
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
      case ScreenQueueRoutesIndividualSituations.currentStudent:
        return [

          RoutePath.APPLYNOW_INDIVIDUALDETAILS +
          "/" +
          RoutePath.APPLYNOW_CURRENT_EDUCATON_SUMMARY,

        ];

      case ScreenQueueRoutesIndividualSituations.educationProgram:
        return [

          RoutePath.APPLYNOW_INDIVIDUALDETAILS +
          "/" +
          RoutePath.APPLYNOW_TRAINING_SUMMARY,
        ];
      case ScreenQueueRoutesIndividualSituations.millitaryDuty:
        return [

          RoutePath.APPLYNOW_INDIVIDUALDETAILS +
          "/" +
          RoutePath.APPLYNOW_MILATARY_SUMMARY,
        ];
      case ScreenQueueRoutesIndividualSituations.veteranRelative:
        return [
          RoutePath.APPLYNOW_INDIVIDUALDETAILS +
          "/" +
          RoutePath.APPLYNOW_VETERAN_MILATARY_SUMMARY,
        ];
      case ScreenQueueRoutesIndividualSituations.hasReprestative:
        return [
          RoutePath.APPLYNOW_INDIVIDUALDETAILS +
          "/" +
          RoutePath.APPLYNOW_ADDITIONAL_CONTACT_SUMMARY,
        ];
      case ScreenQueueRoutesIndividualSituations.isPregnant:
        return [
          RoutePath.APPLYNOW_INDIVIDUALDETAILS +
          "/" +
          RoutePath.APPLYNOW_INDIVIDUALDETAILS_PREGNANCYSUMMARYSCREEN
        ];
      case ScreenQueueRoutesIndividualSituations.filingIncomeTax:
        return [
          RoutePath.APPLYNOW_INDIVIDUALDETAILS +
          "/" +
          RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALINCOMETAXRETURNSUMMARY,
        ];
      case ScreenQueueRoutesIndividualSituations.taxDependent:
        return [
          RoutePath.APPLYNOW_INDIVIDUALDETAILS +
          "/" +
          RoutePath.APPLYNOW_INDIVIDUALDETAILS_TAXDEPENDENTSSUMMARY,
        ];
      case ScreenQueueRoutesIndividualSituations.domesticViolence:
        return [
          RoutePath.APPLYNOW_INDIVIDUALDETAILS +
          "/" +
          RoutePath.APPLYNOW_INDIVIDUALDETAILS_DOMESTICVIOLENCE,
        ];
      case ScreenQueueRoutesIndividualSituations.isHomeless:
        return [
          RoutePath.APPLYNOW_INDIVIDUALDETAILS +
          "/" +
          RoutePath.APPLYNOW_INDIVIDUALDETAILS_HOMELESSNESS,
        ];
      case ScreenQueueRoutesIndividualSituations.migrantWorker:
        return [
          RoutePath.APPLYNOW_INDIVIDUALDETAILS +
          "/" +
          RoutePath.APPLYNOW_INDIVIDUALDETAILS_MIGRANTORSEASONALFARMWORKER,
        ];
      case ScreenQueueRoutesIndividualSituations.isFedTribe:
        return [
          RoutePath.APPLYNOW_INDIVIDUALDETAILS +
          "/" +
          RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALRECOGANIZEDTRIBESUMMARY,
        ];
      case ScreenQueueRoutesIndividualSituations.issuedSummons:
        return [
          RoutePath.APPLYNOW_INDIVIDUALDETAILS +
          "/" +
          RoutePath.APPLYNOW_INDIVIDUALDETAILS_SUMMONSORWARRANT,
        ];


      default:
        return [""];
    }
  }

  getIndividualSituationsGatePost(name: string): (string | undefined)[] {
    const individualpageMap = { ...this.state.pageQueue?.individualpageMap };
    let farwardPaths: string[] = [];
    const currentStudentEndingPath = RoutePath.APPLYNOW_INDIVIDUALDETAILS +
      "/" +
      RoutePath.APPLYNOW_CURRENT_EDUCATON_SUMMARY;
    const trainingEndingPath = RoutePath.APPLYNOW_INDIVIDUALDETAILS +
      "/" +
      RoutePath.APPLYNOW_TRAINING_SUMMARY;
    const militaryDutyEndingPath = RoutePath.APPLYNOW_INDIVIDUALDETAILS +
      "/" +
      RoutePath.APPLYNOW_MILATARY_SUMMARY;
    const vetRelEndingPath = RoutePath.APPLYNOW_INDIVIDUALDETAILS +
      "/" +
      RoutePath.APPLYNOW_VETERAN_MILATARY_SUMMARY;
    const represettativeEndingPath = RoutePath.APPLYNOW_INDIVIDUALDETAILS +
      "/" +
      RoutePath.APPLYNOW_ADDITIONAL_CONTACT_SUMMARY;
    const pregencyEndingPath = RoutePath.APPLYNOW_INDIVIDUALDETAILS +
      "/" +
      RoutePath.APPLYNOW_INDIVIDUALDETAILS_PREGNANCYSUMMARYSCREEN;
    const federalEndingPath = RoutePath.APPLYNOW_INDIVIDUALDETAILS +
      "/" +
      RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALINCOMETAXRETURNSUMMARY;

    const taxDependentEndingPath = RoutePath.APPLYNOW_INDIVIDUALDETAILS +
      "/" +
      RoutePath.APPLYNOW_INDIVIDUALDETAILS_TAXDEPENDENTSSUMMARY;

    const federalTribeEndingPath = RoutePath.APPLYNOW_INDIVIDUALDETAILS +
      "/" +
      RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALRECOGANIZEDTRIBESUMMARY;

    if (individualpageMap.farwardPaths) {
      farwardPaths = [...individualpageMap.farwardPaths]
    }
    switch (name) {
      case ScreenQueueRoutesIndividualSituations.currentStudent:

        if (farwardPaths.indexOf(currentStudentEndingPath) > -1) {
          return [currentStudentEndingPath];
        }
        else {
          return [
            RoutePath.APPLYNOW_INDIVIDUALDETAILS +
            "/" +
            RoutePath.APPLYNOW_WHO_CURRENT_STUDENT,

          ];
        }

      case ScreenQueueRoutesIndividualSituations.educationProgram:
        if (farwardPaths.indexOf(trainingEndingPath) > -1) {
          return [trainingEndingPath];
        }
        else {
          return [
            RoutePath.APPLYNOW_INDIVIDUALDETAILS +
            "/" +
            RoutePath.APPLYNOW_WHO_TRAIN,

          ];
        }
      case ScreenQueueRoutesIndividualSituations.millitaryDuty:
        if (farwardPaths.indexOf(militaryDutyEndingPath) > -1) {
          return [militaryDutyEndingPath];
        }
        else {
          return [
            RoutePath.APPLYNOW_INDIVIDUALDETAILS +
            "/" +
            RoutePath.APPLYNOW_CURRENT_PAST_MILATARY_MEMEBER,
          ];
        }
      case ScreenQueueRoutesIndividualSituations.veteranRelative:
        if (farwardPaths.indexOf(vetRelEndingPath) > -1) {
          return [vetRelEndingPath];
        }
        else {
          return [

            RoutePath.APPLYNOW_INDIVIDUALDETAILS +
            "/" +
            RoutePath.APPLYNOW_INDIVIDUAL_VETERAN_RELATIVE_DETAILS,
          ];
        }
      case ScreenQueueRoutesIndividualSituations.hasReprestative:
        if (farwardPaths.indexOf(represettativeEndingPath) > -1) {
          return [represettativeEndingPath];
        }
        else {
          return [
            RoutePath.APPLYNOW_INDIVIDUALDETAILS +
            "/" +
            RoutePath.APPLYNOW_ADDITIONAL_CONTACT,
          ];
        }
      case ScreenQueueRoutesIndividualSituations.isPregnant:
        if (farwardPaths.indexOf(pregencyEndingPath) > -1) {
          return [pregencyEndingPath];
        }
        else {
          return [
            RoutePath.APPLYNOW_INDIVIDUALDETAILS +
            "/" +
            RoutePath.APPLYNOW_INDIVIDUALDETAILS_PREGNANCYSCREEN,
          ];
        }
      case ScreenQueueRoutesIndividualSituations.filingIncomeTax:
        if (farwardPaths.indexOf(federalEndingPath) > -1) {
          return [federalEndingPath];
        }
        else {
          return [
            RoutePath.APPLYNOW_INDIVIDUALDETAILS +
            "/" +
            RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALINCOMETAXRETURN,
          ];
        }
      case ScreenQueueRoutesIndividualSituations.taxDependent:
        if (farwardPaths.indexOf(taxDependentEndingPath) > -1) {
          return [taxDependentEndingPath];
        }
        else {
          return [
            RoutePath.APPLYNOW_INDIVIDUALDETAILS +
            "/" +
            RoutePath.APPLYNOW_INDIVIDUALDETAILS_TAXDEPENDENTS,
          ];
        }
      case ScreenQueueRoutesIndividualSituations.domesticViolence:
        return [
          RoutePath.APPLYNOW_INDIVIDUALDETAILS +
          "/" +
          RoutePath.APPLYNOW_INDIVIDUALDETAILS_DOMESTICVIOLENCE,
        ];
      case ScreenQueueRoutesIndividualSituations.isHomeless:
        return [
          RoutePath.APPLYNOW_INDIVIDUALDETAILS +
          "/" +
          RoutePath.APPLYNOW_INDIVIDUALDETAILS_HOMELESSNESS,
        ];
      case ScreenQueueRoutesIndividualSituations.migrantWorker:
        return [
          RoutePath.APPLYNOW_INDIVIDUALDETAILS +
          "/" +
          RoutePath.APPLYNOW_INDIVIDUALDETAILS_MIGRANTORSEASONALFARMWORKER,
        ];
      case ScreenQueueRoutesIndividualSituations.isFedTribe:
        if (farwardPaths.indexOf(federalTribeEndingPath) > -1) {
          return [federalTribeEndingPath];
        }
        else {
          return [
            RoutePath.APPLYNOW_INDIVIDUALDETAILS +
            "/" +
            RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALRECOGANIZEDTRIBE,
          ];
        }
      case ScreenQueueRoutesIndividualSituations.issuedSummons:
        return [
          RoutePath.APPLYNOW_INDIVIDUALDETAILS +
          "/" +
          RoutePath.APPLYNOW_INDIVIDUALDETAILS_SUMMONSORWARRANT,
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
export enum ScreenQueueRoutesIndividualSituations {
  currentStudent = "currentStudent",
  educationProgram = "educationProgram",
  millitaryDuty = "millitaryDuty",
  veteranRelative = "veteranRelative",
  hasReprestative = "hasReprestative",
  isPregnant = "isPregnant",
  filingIncomeTax = "filingIncomeTax",
  taxDependent = "taxDependent",
  domesticViolence = "domesticViolence",
  isHomeless = "isHomeless",
  migrantWorker = "migrantWorker",
  isFedTribe = "isFedTribe",
  issuedSummons = "issuedSummons",
}

/*
export const APPNowHouseholdMemberSituationPageQueue = [RoutePath.DOIQUALIFY_ONEORMOREJOB, RoutePath.DOIQUALIFY_MONTHLYINCOME, RoutePath.DOIQUALIFY_WHOHASOTHERINCOME, RoutePath.DOIQUALIFY_OTHERINCOME,
RoutePath.DOIQUALIFY_CURRENTLYENROLLED, RoutePath.DOIQUALIFY_TYPEOFENROLLMENT, RoutePath.DOIQUALIFY_WHOHASDISABILITY, RoutePath.DOIQUALIFY_WHOISPREGNANT, RoutePath.DOIQUALIFY_CHILDOFUSVETERAN, RoutePath.DOIQUALIFY_FOSTERCARE, RoutePath.DOIQUALIFY_RESULTS]
*/

export const ApplyNowIndividualSituations = [
  RoutePath.APPLYNOW_INDIVIDUALDETAILS +
  "/" +
  RoutePath.APPLYNOW_WHO_CURRENT_STUDENT,

  RoutePath.APPLYNOW_INDIVIDUALDETAILS +
  "/" +
  RoutePath.APPLYNOW_CURRENT_EDUCATON_DETAILS,

  RoutePath.APPLYNOW_INDIVIDUALDETAILS +
  "/" +
  RoutePath.APPLYNOW_CURRENT_EDUCATON_SUMMARY,

  RoutePath.APPLYNOW_INDIVIDUALDETAILS + "/" + RoutePath.APPLYNOW_WHO_TRAIN,

  RoutePath.APPLYNOW_INDIVIDUALDETAILS +
  "/" +
  RoutePath.APPLYNOW_TRAINING_DETAILS,

  RoutePath.APPLYNOW_INDIVIDUALDETAILS +
  "/" +
  RoutePath.APPLYNOW_TRAINING_SUMMARY,

  RoutePath.APPLYNOW_INDIVIDUALDETAILS +
  "/" +
  RoutePath.APPLYNOW_CURRENT_PAST_MILATARY_MEMEBER,
  RoutePath.APPLYNOW_INDIVIDUALDETAILS +
  "/" +
  RoutePath.APPLYNOW_INDIVIDUAL_MILATARY_DETAILS,
  RoutePath.APPLYNOW_INDIVIDUALDETAILS +
  "/" +
  RoutePath.APPLYNOW_MILATARY_SUMMARY,


  RoutePath.APPLYNOW_INDIVIDUALDETAILS +
  "/" +
  RoutePath.APPLYNOW_MILATARY_STATUS,

  RoutePath.APPLYNOW_INDIVIDUALDETAILS +
  "/" +
  RoutePath.APPLYNOW_INDIVIDUAL_MILATARY_DETAILS,

  RoutePath.APPLYNOW_INDIVIDUALDETAILS +
  "/" +
  RoutePath.APPLYNOW_MILATARY_SUMMARY,



  RoutePath.APPLYNOW_INDIVIDUALDETAILS +
  "/" +
  RoutePath.APPLYNOW_WHO_VETERAN_RELATIVE,
  RoutePath.APPLYNOW_INDIVIDUALDETAILS +
  "/" +
  RoutePath.APPLYNOW_INDIVIDUAL_VETERAN_RELATIVE_DETAILS,

  RoutePath.APPLYNOW_INDIVIDUALDETAILS +
  "/" +
  RoutePath.APPLYNOW_VETERAN_MILATARY_SUMMARY,

  RoutePath.APPLYNOW_INDIVIDUALDETAILS +
  "/" +
  RoutePath.APPLYNOW_ADDITIONAL_CONTACT,

  RoutePath.APPLYNOW_INDIVIDUALDETAILS +
  "/" +
  RoutePath.APPLYNOW_ADDITIONAL_CONTACT_DETAILS,
  RoutePath.APPLYNOW_INDIVIDUALDETAILS +
  "/" +
  RoutePath.APPLYNOW_ADDITIONAL_CONTACT_SUMMARY,
  RoutePath.APPLYNOW_INDIVIDUALDETAILS +
  "/" +
  RoutePath.APPLYNOW_INDIVIDUALDETAILS_PREGNANCYSCREEN,
  RoutePath.APPLYNOW_INDIVIDUALDETAILS +
  "/" +
  RoutePath.APPLYNOW_INDIVIDUALDETAILS_PREGNANCYDETAILSSCREEN,
  RoutePath.APPLYNOW_INDIVIDUALDETAILS +
  "/" +
  RoutePath.APPLYNOW_INDIVIDUALDETAILS_PREGNANCYSUMMARYSCREEN,

  RoutePath.APPLYNOW_INDIVIDUALDETAILS +
  "/" +
  RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALINCOMETAXRETURN,
  RoutePath.APPLYNOW_INDIVIDUALDETAILS +
  "/" +
  RoutePath.APPLYNOW_INDIVIDUALDETAILS_FilingStatus,
  RoutePath.APPLYNOW_INDIVIDUALDETAILS +
  "/" +
  RoutePath.APPLYNOW_INDIVIDUALDETAILS_CLAIMTAXDEPENDENT,
  RoutePath.APPLYNOW_INDIVIDUALDETAILS +
  "/" +
  RoutePath.APPLYNOW_INDIVIDUALDETAILS_WHOWILLBETAXCLAIMED,
  RoutePath.APPLYNOW_INDIVIDUALDETAILS +
  "/" +
  RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALINCOMETAXRETURNSUMMARY,
  RoutePath.APPLYNOW_INDIVIDUALDETAILS +
  "/" +
  RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALINCOMETAXRETURN,
  RoutePath.APPLYNOW_INDIVIDUALDETAILS +
  "/" +
  RoutePath.APPLYNOW_INDIVIDUALDETAILS_TAXDEPENDENTS,
  RoutePath.APPLYNOW_INDIVIDUALDETAILS +
  "/" +
  RoutePath.APPLYNOW_INDIVIDUALDETAILS_TAXDEPENDENTSSUMMARY,
  RoutePath.APPLYNOW_INDIVIDUALDETAILS +
  "/" +
  RoutePath.APPLYNOW_INDIVIDUALDETAILS_DOMESTICVIOLENCE,
  RoutePath.APPLYNOW_INDIVIDUALDETAILS +
  "/" +
  RoutePath.APPLYNOW_INDIVIDUALDETAILS_HOMELESSNESS,
  RoutePath.APPLYNOW_INDIVIDUALDETAILS +
  "/" +
  RoutePath.APPLYNOW_INDIVIDUALDETAILS_MIGRANTORSEASONALFARMWORKER,
  RoutePath.APPLYNOW_INDIVIDUALDETAILS +
  "/" +
  RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALRECOGANIZEDTRIBE,
  RoutePath.APPLYNOW_INDIVIDUALDETAILS +
  "/" +
  RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALRECOGANIZEDTRIBESUMMARY,
  RoutePath.APPLYNOW_INDIVIDUALDETAILS +
  "/" +
  RoutePath.APPLYNOW_INDIVIDUALDETAILS_SUMMONSORWARRANT,
];


interface PageQueueActions {
  pageQueueUpdateAction: any;
}

//Pagequeue Household
