import { Injectable } from '@angular/core';
import { HouseholdHead } from '../models/householdHead';
import { HouseholdAnotherPerson } from '../models/householdAnotherPerson';
import { HouseholdBenefits } from '../models/householdBenefits';
import { HouseholdBenefitCoverage } from '../models/householdBenefitCoverage';
import { HouseholdAddress } from '../models/householdAddress';
import { AbsentRelativeAddress} from '../models/absentRelativeAddress';
import { HouseholdReviewAddress } from '../models/householdReviewAddress';
import { HouseholdPrevAddress } from '../models/householdPrevAddress';
import { HouseholdLived } from '../models/householdLived';
import { HouseholdContactInfo } from '../models/householdContactInfo';
import { HouseholdLivSistuation } from '../models/householdLivSistuation';
import { HouseholdSituation } from '../models/householdSituation';
import { HouseholdWater } from '../models/householdWater';
import { HouseholdGatepost } from '../models/householdGatepost';
import { HouseholdUtility } from '../models/householdUtility';
import { HouseholdRecordNo } from '../models/householdRecordNo';
import { HouseholdAppliedBefore } from '../models/householdAppliedBefore';
import { HouseholdFoodStamp } from '../models/householdFoodStamp';
import { HouseholdCrimHistory } from '../models/householdCrimHistory';
import { HouseholdOutsidePersonCon } from '../models/householdOutsidePerson';
import { HouseholdWhoApplyLtcCon } from '../models/householdWhoApplyLtcCon';
import { AbsentRelativeDetails } from '../models/absentRelativeDetails';
import { AbsentRelativeResponsibleForCon } from '../models/absentRelativeResponsibleForCon';
import { AbsentRelativeRaces } from '../models/absentRelativeRaces';
import { AbsentRelativeEmployer } from '../models/absentRelativeEmployer';
import { NursingFacilityDetailsCon } from '../models/nursingFacilityDetailsCon';

@Injectable({
  providedIn: 'root'
})
export class HouseholdFormDataService {

  householdHead: HouseholdHead;
  householdAnotherPerson: HouseholdAnotherPerson;
  householdBenefits: HouseholdBenefits;
  householdBenefitCoverage: HouseholdBenefitCoverage;
  householdAddress: HouseholdAddress;
  householdReviewAddress: HouseholdReviewAddress;
  householdPrevAddress: HouseholdPrevAddress;
  householdLived: HouseholdLived;
  householdContactInfo: HouseholdContactInfo;
  householdLivSistuation: HouseholdLivSistuation;
  householdSituation: HouseholdSituation;
  householdWater: HouseholdWater;
  householdGatepost: HouseholdGatepost;
  householdUtility: HouseholdUtility;
  householdRecordNo: HouseholdRecordNo;
  householdAppliedBefore: HouseholdAppliedBefore;
  householdFoodStamp: HouseholdFoodStamp;
  householdCrimHistory: HouseholdCrimHistory;
  householdOutsidePersonCon: HouseholdOutsidePersonCon;
  householdWhoApplyLtcCon: HouseholdWhoApplyLtcCon;
  absentRelativeDetails: AbsentRelativeDetails;
  absentRelativeResponsibleForCon: AbsentRelativeResponsibleForCon;
  absentRelativeAddress: AbsentRelativeAddress;
  absentRelativeEmployer: AbsentRelativeEmployer;
  nursingFacilityDetailsCon: NursingFacilityDetailsCon;
  absentRelativeRaces: AbsentRelativeRaces;

  constructor() {
    this.householdHead = new HouseholdHead('', '', '', '', '', [], [], '');
    this.householdAnotherPerson = new HouseholdAnotherPerson('', '', '', '', '', [], [], '', '');
    this.householdBenefits = new HouseholdBenefits('', '', '', '', '', '', '', '', '');
    this.householdBenefitCoverage = new HouseholdBenefitCoverage('', '');
    this.householdAddress = new HouseholdAddress('', '', '', '', '', '', '', '', [], '', '', '', '', '', [], '', '', '');
    this.householdReviewAddress = new HouseholdReviewAddress([]);
    this.householdPrevAddress = new HouseholdPrevAddress('', '', '', '', '');
    this.householdLived = new HouseholdLived('', '', '');
    this.householdContactInfo = new HouseholdContactInfo('', [], '', [], '', [], '', '', '');
    this.householdLivSistuation = new HouseholdLivSistuation('', '');
    this.householdSituation = new HouseholdSituation('', '');
    this.householdWater = new HouseholdWater([], [], []);
    this.householdGatepost = new HouseholdGatepost('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
    this.householdUtility = new HouseholdUtility('');
    this.householdRecordNo = new HouseholdRecordNo('');
    this.householdAppliedBefore = new HouseholdAppliedBefore('', '');
    this.householdFoodStamp = new HouseholdFoodStamp('', '', '', '', '', '', '', '');
    this.householdCrimHistory = new HouseholdCrimHistory('', '', '', '', '', '');
    this.householdOutsidePersonCon = new HouseholdOutsidePersonCon('', '');
    this.householdWhoApplyLtcCon = new HouseholdWhoApplyLtcCon('','');
    this.absentRelativeDetails = new AbsentRelativeDetails('','','','','','','','','');
    this.absentRelativeResponsibleForCon = new AbsentRelativeResponsibleForCon('', '');
    this.absentRelativeAddress = new AbsentRelativeAddress('', '', '', '', '','');
    this.absentRelativeEmployer = new AbsentRelativeEmployer('', '', '', '', '', '','','');
    this.nursingFacilityDetailsCon = new NursingFacilityDetailsCon('', '', '', '', '', '', '', '');
    this.absentRelativeRaces = new AbsentRelativeRaces('', '', '', '', '', '', '');
  }

  //for JSON Display
  postData() {
    let newCombinedObject = {
      householdHead: this.householdHead,
      householdAnotherPerson: this.householdAnotherPerson,
      householdBenefits: this.householdBenefits,
      householdBenefitCoverage: this.householdBenefitCoverage,
      houseHoldAddress: this.householdAddress,
      householdReviewAddress: this.householdReviewAddress,
      householdPrevAddress: this.householdPrevAddress,
      householdLived: this.householdLived,
      householdContactInfo: this.householdContactInfo,
      householdLivSistuation: this.householdLivSistuation,
      householdSituation: this.householdSituation,
      householdWater: this.householdWater,
      householdGatepost: this.householdGatepost,
      householdUtility: this.householdUtility,
      householdRecordNo: this.householdRecordNo,
      householdAppliedBefore: this.householdAppliedBefore,
      householdFoodStamp: this.householdFoodStamp,
      householdCrimHistory: this.householdCrimHistory,
      HouseholdOutsidePersonCon: this.householdOutsidePersonCon,
      HouseholdWhoApplyLtcCon: this.householdWhoApplyLtcCon,
      AbsentRelativeDetails: this.absentRelativeDetails,
      AbsentRelativeResponsibleForCon: this.absentRelativeResponsibleForCon,
      absentRelativeAddress: this.absentRelativeAddress,
      absentRelativeEmployer: this.absentRelativeEmployer,
      nursingFacilityDetailsCon: this.nursingFacilityDetailsCon,
      absentRelativeRace: this.absentRelativeRaces
    }

    console.log(newCombinedObject);
  }

}