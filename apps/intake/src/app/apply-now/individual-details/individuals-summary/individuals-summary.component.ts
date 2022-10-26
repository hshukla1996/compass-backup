import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { IApplyNowState, Programs } from '../../+state/apply-now.models';
import { Router } from "@angular/router";
import { RoutePath } from '../../../shared/route-strategies';
import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';
import {ApplyNowService} from "../../../shared/services/apply-now.service";


@Component({
  selector: 'compass-ui-individuals-summary',
  templateUrl: './individuals-summary.component.html',
  styleUrls: ['./individuals-summary.component.scss']
})
export class IndividualsSummaryComponent implements OnInit {
  houseHoldDetails: any;
  householdMembers: any[] = [];
  applyNowState: IApplyNowState | undefined;
  serviceData!: any;
  isLoading = false;
  loadingText = "Loading...";
  nslpCount = 0;
  currentStudentCount = 0;
  trainingProgramCount = 0;
  militaryMembersCount = 0;
  veteranRelativesCount = 0;
  additionalContactsCount = 0;
  pregnanciesCount = 0;
  federalIncomeTaxCount = 0;
  taxDependentsCount = 0;
  domesticViolenceCount = 0
  homelessCount = 0;
  migrantWorkerCount = 0;
  federalTribeCount = 0;
  summonCount = 0;
  medicalConditionCount = 0;
  healthMedicationsCount = 0;
  medicalBillsCount = 0;
  currentSnapCount = 0;
  priorTanfCount = 0;
  benefitsNotCount = 0;
  familyPlanningCount = 0;
  ssiCount = 0;
  ssdCount = 0;
  owesFinesCount = 0;
  welfareFraudCount = 0;
  currentProbationCount = 0;
  fleeingCount = 0;
  prisonCount = 0;
  programSelected: any[] = [];

  constructor(
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private applyNowService: ApplyNowService,
    private queueService: ScreenQueueUtil) { }

  ngOnInit(): void {
    this.service.getAppData().subscribe((d) => {
        this.applyNowState = { ...d };
      this.serviceData = this.applyNowState.gettingStartedResponse;
        this.programSelected = this.service.getProgramSelection || [];
        this.houseHoldDetails = this.applyNowState?.houseHoldDetails || [];
        this.householdMembers = this.applyNowState.houseHoldDetails?.houseHoldPersons || [];
        this.cd.detectChanges();
    });


    if (this.applyNowState?.houseHoldDetails.pageAction?.nslpMap) {
      this.nslpCount = Object.keys(this.applyNowState?.houseHoldDetails.pageAction?.nslpMap).length;
    }
    if (this.applyNowState?.houseHoldDetails.pageAction?.studentsMap) {
      this.currentStudentCount = Object.keys(this.applyNowState?.houseHoldDetails.pageAction?.studentsMap).length;
    }
    if (this.applyNowState?.houseHoldDetails.pageAction?.trainingsMap) {
      this.trainingProgramCount = Object.keys(this.applyNowState?.houseHoldDetails.pageAction?.trainingsMap).length;
    }
    if (this.applyNowState?.houseHoldDetails.pageAction?.militaryMap) {
      this.militaryMembersCount = Object.keys(this.applyNowState?.houseHoldDetails.pageAction?.militaryMap).length;
    }
    if (this.applyNowState?.houseHoldDetails.pageAction?.poaMap) {
      this.additionalContactsCount = Object.keys(this.applyNowState?.houseHoldDetails.pageAction?.poaMap).length;
    }
    if (this.applyNowState?.houseHoldDetails.pageAction?.taxDependentMap) {
      this.taxDependentsCount = Object.keys(this.applyNowState?.houseHoldDetails.pageAction?.taxDependentMap).length;
    }
    if (this.applyNowState?.householdHasAnyoneReceivedSSIInThePast?.individualNumbers) {
      this.ssiCount = Object.keys(this.applyNowState?.householdHasAnyoneReceivedSSIInThePast?.individualNumbers).length;
    }
    this.householdMembers.forEach((person) => {
      if (person.veteranRelationInformation) {
        this.veteranRelativesCount++;
      }
      if (person.isPregnantInformation) {
        this.pregnanciesCount++;
      }
      if (person.isFederalTaxReturn) {
        this.federalIncomeTaxCount++;
      }
      if (person.isFacingDomesticViolence) {
        this.domesticViolenceCount++;
      }
      if (person.isHomeless) {
        this.homelessCount++;
      }
      if (person.isMigrantOrSeasonalFarmWorker) {
        this.migrantWorkerCount++;
      }
      if (person.isFederalTribe) {
        this.federalTribeCount++;
      }
      if (person.isSummonedOrWarrant) {
        this.summonCount++;
      }
      if (person.isMedical) {
        this.medicalConditionCount++;
      }
      if (person.isHealthSustainingMedication) {
        this.healthMedicationsCount++;
      }
      if (person.isPaidMedicalBills) {
        this.medicalBillsCount++;
      }
      if (person.benefitsNotReceivedInformation) {
        this.benefitsNotCount++;
      }
      if (person.agreeToFamilyPlanningServiceOnly) {
        this.familyPlanningCount++;
      }
    });
    if (this.applyNowState?.receivingTANF?.individualNumbers) {
      this.currentSnapCount = this.applyNowState?.receivingTANF?.individualNumbers.length;
    }
    if (this.applyNowState?.receivedTANFInPasts6Months?.individualNumbers) {
      this.priorTanfCount = this.applyNowState?.receivedTANFInPasts6Months?.individualNumbers.length;
    }
    if (this.applyNowState?.householdHasAnyoneReceivedSSDInThePast?.individualNumbers) {
      this.ssdCount = this.applyNowState?.householdHasAnyoneReceivedSSDInThePast?.individualNumbers.length;
    }
    if (this.applyNowState?.whoHasBeenConvictedAFelony?.individualNumbers) {
      this.owesFinesCount = this.applyNowState?.whoHasBeenConvictedAFelony?.individualNumbers.length;
    }
    if (this.applyNowState?.whoWasConvictedForWelfareFraud?.individualNumbers) {
      this.welfareFraudCount = this.applyNowState?.whoWasConvictedForWelfareFraud?.individualNumbers.length;
    }
    if (this.applyNowState?.whoIsOnProbationOrParole?.individualNumbers) {
      this.currentProbationCount = this.applyNowState?.whoIsOnProbationOrParole?.individualNumbers.length;
    }
    if (this.applyNowState?.whoIsCurrentlyFleeingFromLawEnforcementOfficials?.individualNumbers) {
      this.fleeingCount = this.applyNowState?.whoIsCurrentlyFleeingFromLawEnforcementOfficials?.individualNumbers.length;
    }
    if (this.applyNowState?.isAnyoneCurrentlyIncarcerated?.individualNumbers) {
      this.prisonCount = this.applyNowState?.isAnyoneCurrentlyIncarcerated?.individualNumbers.length;
    }
  }

  navigateToEdit() {
    setTimeout(() => {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_DEMOGRAPHIC_SUMMARY]);
    }, 100);
  }

   navigateToEditNSLP() {
    setTimeout(() => {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_NATIONAL_SCHOOL_LUNCH_PROGRAM]);
    }, 100);
  }

  navigateToEditDemographicSituations() {
    setTimeout(() => {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUAL_GATEPOST]);
    }, 100);
  }

  navigateToEditCurrentStudent() {
    setTimeout(() => {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_WHO_CURRENT_STUDENT]);
    }, 100);
  }

  navigateToEditTrainingPrograms() {
    setTimeout(() => {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_WHO_TRAIN]);
    }, 100);
  }

  navigateToEditMilitaryMembers() {
    setTimeout(() => {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_CURRENT_PAST_MILATARY_MEMEBER]);
    }, 100);
  }

  navigateToVeteranRelatives() {
    setTimeout(() => {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_WHO_VETERAN_RELATIVE]);
    }, 100);
  }

  navigateToAdditionalContacts() {
    setTimeout(() => {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_ADDITIONAL_CONTACT]);
    }, 100);
  }

  navigateToPregnancies() {
    setTimeout(() => {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_PREGNANCYSCREEN]);
    }, 100);
  }

  navigateToFederalTax() {
     setTimeout(() => {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALINCOMETAXRETURN]);
    }, 100);
  }

  navigateToTaxDependents() {
    setTimeout(() => {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_TAXDEPENDENTS]);
    }, 100);
  }

  navigateToDomesticViolence() {
    setTimeout(() => {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_DOMESTICVIOLENCE]);
    }, 100);
  }

  navigateToHomeless() {
    setTimeout(() => {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_HOMELESSNESS]);
    }, 100);
  }

  navigateToMigrantWorker() {
    setTimeout(() => {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_MIGRANTORSEASONALFARMWORKER]);
    }, 100);
  }

  navigateToFederalTribe() {
    setTimeout(() => {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALRECOGANIZEDTRIBE]);
    }, 100);
  }

  navigateToSummon() {
    setTimeout(() => {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_SUMMONSORWARRANT]);
    }, 100);
  }

  navigateToEditIndividualHealth() {
    setTimeout(() => {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_INDIVIDUALSMEDICALGATEPOST]);
    }, 100);
  }

  navigateToMedicalConditions() {
    setTimeout(() => {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_MEDICALCONDITION]);
    }, 100);
  }

  navigateToHealthMedications() {
    setTimeout(() => {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_SUSTAININGMEDICATION]);
    }, 100);
  }

  navigateToMedicalBills() {
    setTimeout(() => {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_MEDICALBILLS]);
    }, 100);
  }

  navigateToCurrentSnap() {
    setTimeout(() => {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_CURRENTSNAPORTANFBENEFITS]);
    }, 100);
  }

  navigateToPriorTanf() {
    setTimeout(() => {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_PRIORTANFORCASHASSISTANCE]);
    }, 100);
  }

  navigateToBenefitsNot() {
    setTimeout(() => {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_BENEFITSNOTRECEIVED]);
    }, 100);
  }

  navigateToFamilyPlanning() {
     setTimeout(() => {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FAMILYPLANNINGSERVICES]);
    }, 100);
  }

  navigateToSsi() {
    setTimeout(() => {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_SUPPLEMENTALSECURITYINCOME]);
    }, 100);
  }

  navigateToSsd() {
    setTimeout(() => {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_SOCIALSECURITYDISABILITY]);
    }, 100);
  }

  navigateToEditIndividualLegal() {
    setTimeout(() => {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_INDIVIDUALSLEGALGATEPOST]);
    }, 100);
  }

  navigateToOwesFines() {
    setTimeout(() => {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_OWNESFINES]);
    }, 100);
  }

  navigateToWelfareFraud() {
    setTimeout(() => {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_CONVICTEDWELFAREFRAUD]);
    }, 100);
  }

  navigateToCurrentProbation() {
    setTimeout(() => {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_CURRENTLYONPROBATION]);
    }, 100);
  }

  navigateToFleeing() {
    setTimeout(() => {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_CURRENTLYFLEEING]);
    }, 100);
  }

  navigateToPrison() {
    setTimeout(() => {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_CURRENTLYINPRISON]);
    }, 100);
  }

  next() {
    this.isLoading = true;
    const serviceData = { ...this.serviceData };
    console.log(this.serviceData);
    console.log(this.service.getHouseHoldDetails);

    serviceData.household = this.service.getHouseholdContracts();
    console.log(serviceData.household)

    serviceData.people = {
      individuals:
      this.service.getHouseHoldDetails.houseHoldPersons,
      absentRelatives:
      this.service.getHouseHoldDetails.absentRelative
    }
    // serviceData.people.individuals = this.householdData.houseHoldPersons;
    //
    //this.queueService.next()
    console.log("servicesdata");
    console.log(serviceData)
    this.applyNowService
      .postSaveApplyNow(serviceData)
      .subscribe((data: any) => {
        if (data) {
          this.isLoading = false;
          console.log(data)
          this.router.navigate([
            RoutePath.APPLYNOW + '/'
            + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/'
            + RoutePath.APPLYNOW_INDIVIDUALDETAILS_INDIVIDUALSENDING]);
        }
      });




  }

  back() {
    if (this.queueService.state.pageQueue.currentPageId > 0) {
        this.queueService.backPath();
    }
    else {
        this.router.navigate([
        //Individual gatepost 3 condition
        //R = HA, HC, MCR, MAR, CA, CAR, FP, FPR, MI, SMA, LH, LHP, ECA (FP and FPR removed)
        //O = FS, FSR, ES, ESR
        (this.programSelected.indexOf(Programs.HA) > -1 ||
          this.programSelected.indexOf(Programs.HC) > -1 ||
          this.programSelected.indexOf(Programs.MCR) > -1 ||
          this.programSelected.indexOf(Programs.MAR) > -1  ||
          this.programSelected.indexOf(Programs.CA) > -1  ||
          this.programSelected.indexOf(Programs.CAR) > -1  ||
          this.programSelected.indexOf(Programs.MI) > -1 ||
          this.programSelected.indexOf(Programs.SMA) > -1 ||
          this.programSelected.indexOf(Programs.LH) > -1  ||
          this.programSelected.indexOf(Programs.LHP) > -1  ||
          this.programSelected.indexOf(Programs.ECA) > -1  ||
          this.programSelected.indexOf(Programs.FS) > -1  ||
          this.programSelected.indexOf(Programs.FSR) > -1  ||
          this.programSelected.indexOf(Programs.ES) > -1  ||
          this.programSelected.indexOf(Programs.ESR) > -1) ?
      RoutePath.APPLYNOW +
              "/" +
      RoutePath.APPLYNOW_INDIVIDUALDETAILS +
          "/" +
          RoutePath.APPLYNOW_INDIVIDUALDETAILS_INDIVIDUALSLEGALGATEPOST :
      //Individual gatepost 2 condition
      //R and O = HA, HC, MCR, MAR, CA, CAR, CI, CIR, MI, FS, FSR, ES, ESR, CHR, LN, LI, WAR, WN, WNR, LIR
      (this.programSelected.indexOf(Programs.HA) > -1 ||
        this.programSelected.indexOf(Programs.HC) > -1 ||
        this.programSelected.indexOf(Programs.MCR) > -1 ||
        this.programSelected.indexOf(Programs.MAR) > -1  ||
        this.programSelected.indexOf(Programs.CA) > -1  ||
        this.programSelected.indexOf(Programs.CAR) > -1  ||
        this.programSelected.indexOf(Programs.CI) > -1 ||
        this.programSelected.indexOf(Programs.CIR) > -1 ||
        this.programSelected.indexOf(Programs.MI) > -1  ||
        this.programSelected.indexOf(Programs.FS) > -1  ||
        this.programSelected.indexOf(Programs.FSR) > -1  ||
        this.programSelected.indexOf(Programs.ES) > -1  ||
        this.programSelected.indexOf(Programs.ESR) > -1  ||
        this.programSelected.indexOf(Programs.CHR) > -1  ||
        this.programSelected.indexOf(Programs.LN) > -1 ||
        this.programSelected.indexOf(Programs.LI) > -1 ||
        this.programSelected.indexOf(Programs.WAR) > -1 ||
        this.programSelected.indexOf(Programs.WN) > -1 ||
        this.programSelected.indexOf(Programs.WNR) > -1 ||
        this.programSelected.indexOf(Programs.LIR) > -1
        ) ?
    RoutePath.APPLYNOW +
              "/" +
      RoutePath.APPLYNOW_INDIVIDUALDETAILS +
          "/" +
          RoutePath.APPLYNOW_INDIVIDUALDETAILS_INDIVIDUALSMEDICALGATEPOST :
    //Individual gatepost 1
    RoutePath.APPLYNOW +
              "/" +
      RoutePath.APPLYNOW_INDIVIDUALDETAILS +
          "/" +
          RoutePath.APPLYNOW_INDIVIDUAL_GATEPOST
      ]);
    }
  }
}
