import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { IApplyNowState } from '../../+state/apply-now.models';
import { IHouseHold, PageDirection } from '../../household/household-model';
import {Router, ActivatedRoute} from "@angular/router";
import {RoutePath} from '../../../shared/route-strategies';
import jsonData from './snap-or-tanf-benefits-summary.json'
import { ScreenQueueUtil } from '../individuals-medical-gatepost/individuals-medical-gatepost.path';
import { UtilService } from "../../../shared/services/util.service";

export class accordian {
  label!: string;
  value!: string;
  bold!: false
}

@Component({
  selector: 'compass-ui-snap-or-tanf-benefits-summary',
  templateUrl: './snap-or-tanf-benefits-summary.component.html',
  styleUrls: ['./snap-or-tanf-benefits-summary.component.scss']
})
export class SnapOrTanfBenefitsSummaryComponent implements OnInit {
  jsonData: any;
  applyNowState!: IApplyNowState;
  individualName = "John Sample";
  individualAge = 65;
  individualSex = "M";
  labelArray: any[] = [];
  valueArray: any[] = [];
  sevicesselected: any;
  details1!: any;
  details2!: any;
  deleteUser: any;
  householdPersons: IHouseHold[] = [];
  receivingTANF:any;
  currentSnapUser: any[] = [];
  currentUser: IHouseHold = {};
  currentUserIndex!: string;
  currentSnapOrTanfMap!: any;
  userId: any;
  userName: any;
  showAdd = true;
  modalData = {
        "modalTitle": "Are you sure you want to remove this record?",
        "modalContent": "If you remove this record you will need to re-enter the data to get it back.",
        "cancelButton": "Cancel",
        "continueButton": "Remove"
    }

  constructor(private service: ApplyNowStoreService,
    private router: Router,
    private queueService: ScreenQueueUtil,
    private cd: ChangeDetectorRef,
    private activedRoute: ActivatedRoute,
    private utilService: UtilService) { }

  ngOnInit(): void {
    this.jsonData = jsonData;
    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.householdPersons = this.applyNowState.houseHoldDetails?.houseHoldPersons || [];
      this.receivingTANF = this.applyNowState.receivingTANF?.individualNumbers;
      this.showAdd = this.householdPersons.length > 1 && this.receivingTANF.length < this.householdPersons.length ? true : false;
      if (!this.showAdd) {
          jsonData['addtionalButton'] = '';
      }
    });


  this.applyNowState?.houseHoldDetails.houseHoldPersons!.forEach((person: IHouseHold, index: any) => {
      if (this.receivingTANF!==undefined && this.receivingTANF.includes(person.id)) {
        this.userId = person.id;
        this.userName = person.firstName
        this.sevicesselected = person.fsOrTANFBenefits || [];
        this.details1 = person.fsOrTANFCaseNumber;
        this.details2 = person.fstanfIndividualEBTNumber;
        this.individualName =person['firstName']! + " " + person['lastName'];
        this.individualAge = this.getAge(person['dateOfBirth']);
        this.individualSex = person['gender']!.substring(0, 1);
        jsonData['questionAnswers'][index] = {
          accordionHeader: this.individualName + ' ' + this.individualAge,
           accordionSubHeading: '',
          accordionRightHeading: '',
          accordionRightSubHeading: '',
          userId: person.id || 0,
          accordionData: this.getAccordianLabel(person, this.sevicesselected, this.details1, this.details2),
          editButton: "Edit",
          deleteButton: "Remove"
        }
      }
    });
  
    
    this.jsonData = jsonData;
  }

    getAccordianLabel(persons: IHouseHold, service: any, details1: any, details2: any): accordian[] {
      let accordingData: accordian[] = [];
      let value: any;
      if (service.length > 1) {
        value = service[0].toUpperCase() + ", " + service[1].toUpperCase();
      }
      else if (service.length === 1) {
          value = this.sevicesselected[0].toUpperCase();
      }
      else {
        value = "";
      }
      if (persons) {
        let accordianHeader = "Which of these benefits does " + persons.firstName + " receive?";
        accordingData.push({
          "label": accordianHeader,
          "value": value,
          "bold": false
        });
        accordianHeader = "SNAP or Cash Assistance Case Number";
        accordingData.push({
          "label": accordianHeader,
          "value": details1,
          "bold": false
        });
        accordianHeader = "Electronic Benefit Transfer (EBT) Card Number";
        accordingData.push({
          "label": accordianHeader,
          "value": details2,
          "bold": false
        });
      }

      return accordingData;
    }

  getAge(dateString: any): any {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
      return age;
  }

  deleteClicked(user: any) {
    this.deleteUser = user;
  }

  editClicked(user: any) {
    this.service.updateFromSummary({ isFromAdd: false, benefitId: null, isFromEdit: true });
    this.router.navigate([
      RoutePath.APPLYNOW + 
      '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + 
      '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_SNAPORTANFBENEFITSDETAILS,
    { userId: user },]);
  }

  next() {
    this.queueService.nextPath();
  }

  back() {
    this.router.navigate([
        RoutePath.APPLYNOW +
          "/" +
          RoutePath.APPLYNOW_INDIVIDUALDETAILS +
          "/" +
          RoutePath.APPLYNOW_INDIVIDUALDETAILS_CURRENTSNAPORTANFBENEFITS,
    ]);
  }

  continueClicked() {
    this.jsonData['questionAnswers'].forEach((element: any) => {
        if (element['userId'] === this.deleteUser) {
            element['accordionHeader'] = "";
        }
    });
    this.applyNowState?.receivingTANF?.individualNumbers.forEach((user) => {
      if (user === this.deleteUser) {
          let individualNumbers = this.applyNowState.receivingTANF!.individualNumbers.filter((id)=>id!==user);
          let receivingTANF = {
            code: true,
            individualNumbers: individualNumbers
        }
          this.service.updateCurrentSnapOrTanfBenefits(receivingTANF);

          const storedHouseholdDetails = this.applyNowState?.houseHoldDetails;
          const clonedUpdatedPerson: IHouseHold[] = []
          this.applyNowState?.houseHoldDetails.houseHoldPersons!.forEach((person: IHouseHold) => {
              const clonedPerson = { ...person };
              if (clonedPerson.id === this.deleteUser) {
                clonedPerson.fsOrTANFBenefits = [];
                clonedPerson.fsOrTANFCaseNumber = null;
                clonedPerson.fstanfIndividualEBTNumber = null;
              }
              clonedUpdatedPerson.push(clonedPerson);
          });
          if (storedHouseholdDetails) {
            this.service.updateHouseHoldDetails({
              ...storedHouseholdDetails,
              ...{ houseHoldPersons: clonedUpdatedPerson },
          });
        }
      }
    })
    this.showAdd = this.householdPersons.length > 1 && this.receivingTANF.length < this.householdPersons.length ? true : false;
    if (this.showAdd) {
        jsonData['addtionalButton'] = '+ Add SNAP or Cash Assistance';
    }
  }

  addPerson() {
    this.service.updateFromSummary({ isFromAdd: true, benefitId: null });
    this.router.navigate([
        RoutePath.APPLYNOW +
          "/" +
          RoutePath.APPLYNOW_INDIVIDUALDETAILS +
          "/" +
          RoutePath.APPLYNOW_INDIVIDUALDETAILS_CURRENTSNAPORTANFBENEFITS,
    ]);
  }

}
