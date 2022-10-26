import { Injectable } from '@angular/core';
/* import { HouseholdHead } from '../models/householdHead';
import { HouseholdAnotherPerson } from '../models/householdAnotherPerson';
import { HouseholdBenefits } from '../models/householdBenefits'; */
//import { HouseholdBenefitCoverage } from '../models/householdBenefitCoverage';
import { InsuranceGatepostOn, WhoHealthOrMedicalCon, WhoIsCoveredCon } from "../insurance.model";

@Injectable({
  providedIn: 'root'
})
export class InsuranceFormDataService {

  /* householdHead: HouseholdHead;
  householdAnotherPerson: HouseholdAnotherPerson;
  householdBenefits: HouseholdBenefits; */
  whoHealthOrMedicalCon: WhoHealthOrMedicalCon;
  whoIsCoveredCon: WhoIsCoveredCon;
  insuranceGatepostOn: InsuranceGatepostOn;
  constructor() {
   /*  this.householdHead = new HouseholdHead('', '', '', '', '', [], [], '');
    this.householdAnotherPerson = new HouseholdAnotherPerson('', '', '', '', '', [], [], '', '');
    this.householdBenefits = new HouseholdBenefits('', '', '', '', '', '', '', '', ''); */
    this.whoHealthOrMedicalCon = new WhoHealthOrMedicalCon('', '');
    this.whoIsCoveredCon = new WhoIsCoveredCon('','');
    this.insuranceGatepostOn = new InsuranceGatepostOn('', '', '');
  }

  //for JSON Display
  postData() {
    let newCombinedObject = {
    /*   householdHead: this.householdHead,
      householdAnotherPerson: this.householdAnotherPerson,
      householdBenefits: this.householdBenefits, */
      whoHealthOrMedicalCon: this.whoHealthOrMedicalCon,
      whoIsCoveredCon: this.whoIsCoveredCon,
      insuranceGatepostOn: this.insuranceGatepostOn
    }
    console.log(newCombinedObject);
  }
}
