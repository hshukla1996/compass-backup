import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { IApplyNowState } from '../../+state/apply-now.models';
import { IHouseHold, PageDirection } from '../../household/household-model';
import { AppStoreService } from '../../../app-store-service';
import { Router, ActivatedRoute } from "@angular/router";
import { RoutePath } from '../../../shared/route-strategies';
import { Observable } from 'rxjs';
import { ScreenQueueUtil } from '../individuals-legal-gatepost/individuals-legal-gatepost.path';
import { UtilService } from "../../../shared/services/util.service";
import JsonData from './incarceration-summary.json'
import { Utility } from '../../../shared/utilities/Utility';

export class accordian {
  label!: string;
  value!: string;
  bold!: false
}

@Component({
  selector: 'compass-ui-incarceration-summary',
  templateUrl: './incarceration-summary.component.html',
  styleUrls: ['./incarceration-summary.component.scss']
})
export class IncarcerationSummaryComponent implements OnInit {
    jsonData: any;
    applyNowState!: IApplyNowState;
    individualName = "John Sample";
    individualAge = 65;
    countys$: Observable<any> | undefined;
    countys: any;
    county: any;
    labelArray: any[] = [];
    valueArray: any[] = [];
    sevicesselected: any;
    details!: any;
    deleteUser: any;
    householdPersons: IHouseHold[] = [];
    currentSnapUser: any[] = [];
    currentUser: IHouseHold = {};
    currentUserIndex!: string;
    currentlyInPrisonMap!: any;
    userId: any;
    userName: any;
    showAdd = true;
    isAnyoneCurrentlyIncarcerated: any;
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
    private utilService: UtilService,
    private appService: AppStoreService,) { }

    ngOnInit(): void {
        this.jsonData = JsonData;
        this.service.getAppData().subscribe(d => {
            this.applyNowState = { ...d };
            this.countys$ = this.appService.getCountyOfPlacement();
            this.countys$?.subscribe((s) => {
                this.countys = s;
                this.cd.detectChanges();
            });
            this.householdPersons = this.applyNowState.houseHoldDetails?.houseHoldPersons || [];
            this.isAnyoneCurrentlyIncarcerated = this.applyNowState.isAnyoneCurrentlyIncarcerated?.individualNumbers;
            this.showAdd = this.householdPersons.length > 1 && this.isAnyoneCurrentlyIncarcerated.length < this.householdPersons.length ? true : false;
            if (!this.showAdd) {
                JsonData['addtionalButton'] = '';
            }
            this.currentlyInPrisonMap = {...this.applyNowState.houseHoldDetails.pageAction?.currentlyInPrisonMap} || {};
        });

        this.activedRoute.params.subscribe((p) => {
            if (Object.keys(p).length == 0) {
                this.currentUserIndex =
                    this.utilService.getCurrentUserIdOnNoParams(
                        this.currentlyInPrisonMap
                    );
            } else {
                this.currentUserIndex = p.userId || "";
            }
            if (this.householdPersons.length > 0)
                this.currentUser =
                    this.service.extractUser(
                        this.householdPersons,
                        this.currentUserIndex
                    ) || "";
            this.cd.detectChanges();
        });

        this.applyNowState?.houseHoldDetails.houseHoldPersons!.forEach((person: IHouseHold, index: any) => {
            if (this.isAnyoneCurrentlyIncarcerated.includes(person.id)) {
                this.userId = person.id;
                this.userName = person.firstName
                this.details = person.incarcerated;
                this.individualName = person['firstName']! + " " + person['lastName'];
                this.individualAge = this.getAge(person['dateOfBirth']);
                this.countys.forEach((county: any) => {
                    if (this.details.countyOfPlacement === county.id) {
                        this.county = county.displayValue;
                    }
                })
                JsonData['questionAnswers'][index] = {
                accordionHeader: this.individualName + ' ' + this.individualAge,
                accordionSubHeading: this.county,
                accordionRightHeading: '',
                accordionRightSubHeading: '',
                userId: person.id || 0,
                accordionData: this.getAccordianLabel(person, this.details),
                editButton: "Edit",
                deleteButton: "Remove"
                }
            }
        });

        this.jsonData = JsonData;
    }

    getAccordianLabel(persons: IHouseHold, details: any): accordian[] {
      let accordingData: accordian[] = [];
      if (persons) {
        let accordianHeader = "Incarceration Begin Date";
        accordingData.push({
          "label": accordianHeader,
          "value": Utility.formatDate(details.incarceratedAdmissionDate),
          "bold": false
        });
        accordianHeader = "Release Date";
        accordingData.push({
          "label": accordianHeader,
          "value": Utility.formatDate(details.incarceratedDischargeDate),
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
        '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_INCARCERATIONDETAILS,
        { userId: this.currentUserIndex },]);
    }

    next() {
        const storedHouseholdDetails = this.applyNowState?.houseHoldDetails;
        let isNextPage = false;

        this.currentlyInPrisonMap[this.currentUserIndex] = true;
        const updatedPageAction = {
            ...storedHouseholdDetails?.pageAction,
            currentlyInPrisonMap: {
                ...storedHouseholdDetails?.pageAction?.currentlyInPrisonMap,
                ...this.currentlyInPrisonMap,
            },
            currentlyInPrisonDirection: PageDirection.NEXT,
        };

        if (storedHouseholdDetails) {
            this.service.updateHouseHoldDetails({
              ...storedHouseholdDetails,
              ...{ pageAction: updatedPageAction },
          });
        }

        if (this.currentlyInPrisonMap != null) {
          isNextPage = this.utilService.isNextPage(this.currentlyInPrisonMap);
        }

        if (isNextPage) {
            this.utilService
                .getCurrentUserIdPageAction(
                    this.currentlyInPrisonMap,
                    PageDirection.NEXT
                )
                .subscribe((id: any) => {
                    this.currentUserIndex = id.toString();
                    this.router.navigate([
                        RoutePath.APPLYNOW +
                            "/" +
                            RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                            "/" +
                            RoutePath.APPLYNOW_INDIVIDUALDETAILS_INCARCERATIONDETAILS,
                        { userId: this.currentUserIndex },
                    ]);
                });
        } else {
            this.router.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                    "/" +
                    RoutePath.APPLYNOW_INDIVIDUALDETAILS_INDIVIDUALSSUMMARY,
            ]);
        }
    }

    back() {
        this.router.navigate([
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_INDIVIDUALDETAILS +
            "/" +
            RoutePath.APPLYNOW_INDIVIDUALDETAILS_CURRENTLYINPRISON,
        ]);
    }

    addPerson() {
        this.service.updateFromSummary({ isFromAdd: true, benefitId: null })
        this.router.navigate([
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_INDIVIDUALDETAILS +
            "/" +
            RoutePath.APPLYNOW_INDIVIDUALDETAILS_CURRENTLYINPRISON,
        ]);
    }

    continueClicked() {
        this.jsonData['questionAnswers'].forEach((element: any) => {
            if (element['userId'] === this.deleteUser) {
                element['accordionHeader'] = "";
            }
        });
        this.applyNowState?.isAnyoneCurrentlyIncarcerated?.individualNumbers.forEach((user) => {
            if (user === this.deleteUser) {
                let individualNumbers = this.applyNowState.isAnyoneCurrentlyIncarcerated!.individualNumbers.filter((id)=>id!==user);
                let isAnyoneCurrentlyIncarcerated = {
                    code: true,
                    individualNumbers: individualNumbers
                }
                this.service.updateCurrentlyInPrison(isAnyoneCurrentlyIncarcerated);

                const storedHouseholdDetails = this.applyNowState?.houseHoldDetails;
                const clonedUpdatedPerson: IHouseHold[] = []
                this.applyNowState?.houseHoldDetails.houseHoldPersons!.forEach((person: IHouseHold) => {
                    const clonedPerson = { ...person };
                    if (clonedPerson.id === this.deleteUser) {
                        clonedPerson.incarcerated = { countyOfPlacement: '', incarceratedAdmissionDate: '', incarceratedDischargeDate: '' }
                    }
                    clonedUpdatedPerson.push(clonedPerson);
                });
                if (storedHouseholdDetails) {
                    this.service.updateHouseHoldDetails({
                        ...storedHouseholdDetails,
                        ...{ houseHoldPersons: clonedUpdatedPerson },
                    });
                }
                this.showAdd = this.householdPersons.length > 1 && this.isAnyoneCurrentlyIncarcerated.length < this.householdPersons.length ? true : false;
                if (this.showAdd) {
                    JsonData['addtionalButton'] = '+ Add Incarcerated Person';
                }
            }
        })
    }
}