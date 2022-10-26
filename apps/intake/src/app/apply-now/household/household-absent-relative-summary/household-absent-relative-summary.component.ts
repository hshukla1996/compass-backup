import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  ApplyNowHouseholdAbsentRelativeSummaryStrategy
} from "../../../shared/route-strategies/apply-now/household-absent-relative-summary";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { AppStoreService } from "../../../app-store-service";
import { IApplyNowState } from '../../+state/apply-now.models';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { RoutePath } from "../../../shared/route-strategies";
import { ScreenQueueUtil } from "../../../shared/services/screen_queue_util.service";
import { format } from 'date-fns';
import { Utility } from '../../../shared/utilities/Utility';
import { IAbsentRelative } from '../household-model';

@Component({
  selector: 'compass-ui-household-absent-relative-summary',
  templateUrl: './household-absent-relative-summary.component.html',
  styleUrls: ['./household-absent-relative-summary.component.scss'],
  providers: [ApplyNowHouseholdAbsentRelativeSummaryStrategy]

})
export class HouseholdAbsentRelativeSummaryComponent implements OnInit {
  jsonData: any;
  childsupport: any;
  hasLivedInNursingFacility: any;
  applyNowState!: IApplyNowState;
  visit: boolean = false;
  visitCount: any;
  deleteUserData: any;
  races: any;
  modalData = {
    modalTitle: "Are you sure?",
    modalContent: "",
    cancelButton: "Cancel",
    continueButton: "Remove",
  };

  demographicData = {
    "questionText": "Your absent relatives.",
    "subHeading": "Look below to make sure all absent relatives are here.",
    "toolTip": "",
    "questionAnswers": [
      {
        "accordionHeader": "{replace} Sample 65 (M)",
        "accordionSubHeading": "",
        "accordionRightHeading": "",
        "accordionRightSubHeading": "",
        "userId": 1,
        "accordionData": [{}

        ],
        "editButton": "Edit",
        "deleteButton": "Delete"
      },
    ],
    "addtionalButton": "Add Absent Relative"
  }
  constructor(private fb: FormBuilder,
    private routingStrategy: ApplyNowHouseholdAbsentRelativeSummaryStrategy,
    private router: Router,
    private queueService: ScreenQueueUtil,
    private service: ApplyNowStoreService,
    private appService: AppStoreService,
    private cd: ChangeDetectorRef,) { }


  ngOnInit(): void {
    // this.service.getAppData().subscribe(d => {
    this.applyNowState = this.service.getApplyNow,

      this.hasLivedInNursingFacility = this.applyNowState.householdMemberSituationGatepostSelection?.hasLivedInNursingFacility;

    const childsupportValue = this.applyNowState.houseHoldDetails?.absentRelativeChildSupport.childsupport ?? ""
    this.childsupport = (childsupportValue !== "" && childsupportValue == 'N') ? false : true;

    this.appService.getRaces().subscribe((r) => {
      this.races = r;
     console.log("racee=",this.races)
      this.cd.detectChanges();
    });

    const absentRelatives = this.applyNowState.houseHoldDetails.absentRelative || []
    absentRelatives.forEach((abrel, i) => {

      let result = this.races?.filter((o1: any) => abrel?.raceInformation?.some(o2 => o1.id === (o2)));
      console.log("abrel", result, abrel.raceInformation)
      let responsibleForname = "";
      for (let i = 0; i < result!.length; i++) {
        responsibleForname = result![i].displayValue +" "+ responsibleForname;

      }
      console.log("raceinfo",responsibleForname.slice(0,-1))

      const age =
        this.demographicData['questionAnswers'][i] = {

          accordionHeader: abrel.firstName + ' ' + (abrel.midName ? abrel.midName : '') + ' ' + abrel.lastName + ' ' + (abrel.suffix ? abrel.suffix : '')  +' '+ '(' +this.getAge(abrel['dateOfBirth'])+')' || '',
          accordionSubHeading: "",
          accordionRightHeading: "",
          accordionRightSubHeading: "",
          userId: abrel.id || 0,


          accordionData: [
            {
              'label': "First Name",
              'value': <string>abrel.firstName,
              "bold": false,
              "show":false
              
            },
            {
              'label': "Middle Name",
              'value': <string>abrel.midName,
              "bold": false
            },
            {
              'label': "Last Name",
              'value': <string>abrel.lastName,
              "bold": false
            },
            {
              'label': "Suffix",
              'value': <string>abrel.suffix,
              "bold": false
            },
            {
              'label': "Has this person died?",
              'value': abrel.deceased || false,
              "bold": false
            },
            {
              'label': "Date of Birth:",
              // 'value': <string>abrel.dateOfBirth,
              'value': Utility.formatDate(abrel.dateOfBirth),
              "bold": false
            },
            {
              'label': "Social Security Number (SSN):",
              'value': <string>abrel.socialSecurityNumber,
              "bold": false
            },
            {
              'label': "Is this person a spouse, parent, or both of the household member(s)?",
              'value': abrel.isThisPersonSpouseParentOrBothOfTheHouseholdMember,
              "bold": false
            },
            {
              'label': "What is " + abrel.firstName + ' ' + abrel.lastName + "'s race?:",
              // 'value': abrel?.raceInformation,
              'value': responsibleForname,

              "bold": false
            },
            {
              'label': "Is this person of Hispanic or Latino origin?:",
              'value': abrel?.hispanicOrigin,
              "bold": false
            },
            {

              'label': "Who is " + abrel.firstName + ' ' + abrel.lastName + " responsible for?:",


              'value': abrel?.relationships?.map((rel) => {
                const relativeUser = this.service.extractUser(this.applyNowState?.houseHoldDetails?.houseHoldPersons, rel)
                return relativeUser.firstName + " " + relativeUser.lastName

              }).join(", "),

              "bold": false
            },
            {
              'label': "Street Address:",
              'value': <string>abrel.Address?.AddressLine1,
              "bold": false
            },
            {
              'label': "Street Address (2):",
              'value': <string>abrel.Address?.AddressLine2,
              "bold": false
            },
            {
              'label': "City:",
              'value': <string>abrel.Address?.City,
              "bold": false
            },
            {
              'label': "State:",
              'value': <string>abrel.Address?.State,
              "bold": false
            },
            {
              'label': "ZIP Code:",
              'value': <string>abrel.Address?.Zip,
              "bold": false
            },
            {
              'label': "Phone Number:",
              'value': <string>abrel.Address?.PhoneNumber,
              "bold": false
            },
            {
              'label': "Employer Name:",
              'value': <string>abrel.Employer?.EmployerName,
              "bold": false
            },
            {
              'label': "Employer Street Address:",
              'value': <string>abrel.Employer?.Address?.AddressLine1,
              "bold": false
            },
            {
              'label': "Employer Street Address (2):",
              'value': <string>abrel.Employer?.Address?.AddressLine2,
              "bold": false
            },
            {
              'label': "Employer City:",
              'value': <string>abrel.Employer?.Address?.City,
              "bold": false
            },
            {
              'label': "Employer State:",
              'value': <string>abrel.Employer?.Address?.State,
              "bold": false
            },
            {
              'label': "Employer ZIP Code:",
              'value': <string>abrel.Employer?.Address?.Zip,
              "bold": false
            },
            {
              'label': "Employer Phone:",
              'value': <string>abrel.Employer?.EmployerPhoneNumber,
              "bold": false
            },
            {
              'label': "Does " + abrel.firstName + ' ' + abrel.lastName + " own non-residential property like a home or land?:",
              'value': <string>abrel.nonResidentialProperty?.ownNonResidentialProperty,
              "bold": false
            },
            {
              'label': "When was the property bought?:",
              // 'value': <string>abrel.nonResidentialProperty?.datePurchased,
              'value': Utility.formatDate(abrel.nonResidentialProperty?.datePurchased),
              "bold": false
            },
            {
              'label': "Estimated Market Value:",
              'value': <string>abrel.nonResidentialProperty?.marketValue,
              "bold": false
            },
            {
              'label': "Street Address:",
              'value': <string>abrel.nonResidentialProperty?.address.addressLine1,
              "bold": false
            },
            {
              'label': "Street Address (2):",
              'value': <string>abrel.nonResidentialProperty?.address.addressline2,
              "bold": false
            },
            {
              'label': "City:",
              'value': <string>abrel.nonResidentialProperty?.address.city,
              "bold": false
            },
            {
              'label': "State:",
              'value': <string>abrel.nonResidentialProperty?.address.state,
              "bold": false
            },
            {
              'label': "ZIP Code:",
              'value': <string>abrel.nonResidentialProperty?.address.zip,
              "bold": false
            },
            {
              'label': "Does " + abrel.firstName + ' ' + abrel.lastName + " pay child support?:",
              'value': <string>abrel.childSupport?.payForChildSupport,
              "bold": false
            },
            {
              'label': "Is the child support court-ordered or voluntary?:",
              'value': <string>abrel.childSupport?.courtOrderedOrVoluntary,
              "bold": false
            },
            {
              'label': "How much do they pay?:",
              'value': <string>abrel.childSupport?.voluntaryChildSupportAmount,
              "bold": false
            },
            {
              'label': "How often do they pay this amount?:",
              'value': <string>abrel.childSupport?.VoluntaryChildSupportAmountFrequency,
              "bold": false
            },
            // {
            //   'label': "ZIP Code:",
            //   'value': <string>abrel.nonResidentialProperty?.Zip,
            //   "bold": false
            // },
            {
              'label': "When did they last pay this amount?:",
              // 'value': <string>abrel.childSupport?.lastDatePaidVoluntaryChildSupport,
              'value': Utility.formatDate(abrel.childSupport?.lastDatePaidVoluntaryChildSupport),
              "bold": false
            },
            {
              'label': "Who did they pay this amount to?:",
              'value': <string>abrel.childSupport?.voluntaryChildSupportPaidToWhom,
              "bold": false
            },
            {
              'label': "Court Order Number:",
              'value': <string>abrel.childSupport?.courtOrder?.courtOrderNumber,
              "bold": false
            },
            {
              'label': "Court Name:",
              'value': <string>abrel.childSupport?.courtOrder?.courtName,
              "bold": false
            },
            {
              'label': "How much do they pay?: ",
              'value': <string>abrel.childSupport?.courtOrder?.courtOrderChildSupportAmount,
              "bold": false
            },
            {
              'label': "How often do they pay this amount?:",
              'value': <string>abrel.childSupport?.courtOrder?.courtOrderChildSupportAmountFrequency,
              "bold": false
            },
            {
              'label': "Court Order Date:",
              // 'value': <string>abrel.childSupport?.courtOrder?.courtOrderDate,
              'value': Utility.formatDate(abrel.childSupport?.courtOrder?.courtOrderDate),
              "bold": false
            },
            {
              'label': "Are there any special items? If so, what are they?:",
              'value': <string>abrel.childSupport?.courtOrder?.specialTerms,
              "bold": false
            },

          ],
          editButton: "Edit",
          deleteButton: "Remove"


        }

        this.jsonData = this.demographicData;
        // console.log("jsondata,,",this.jsonData)
      })

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
    console.log("---", user)
    this.deleteUserData = user

  }


  continueClicked() {


    const updatedHouseHoldPersons = this.applyNowState?.houseHoldDetails?.absentRelative?.filter(
      (person) => {
        return person.id !== this.deleteUserData;
        // return person.id !== id;
      }
    );
    console.log("continueclicked", updatedHouseHoldPersons)

    const updatedHouseholdObj = {
      absentRelative: updatedHouseHoldPersons,
    };
    this.jsonData['questionAnswers'].forEach((element: any) => {
      if (element['userId'] === this.deleteUserData) {
        element['accordionHeader'] = "";
      }
    });
    this.service.updateHouseHoldDetails({
      ...this.applyNowState.houseHoldDetails,
      ...updatedHouseholdObj,
    });

    // const storedHouseholdDetails = this.applyNowState.houseHoldDetails;

    // const updatedHouseholdPersons =
    //   this.applyNowState.houseHoldDetails.absentRelative?.map(
    //     (person: IAbsentRelative) => {
    //       const personToBeUpdated = { ...person };

    //       if (
    //         person.id?.toString() ===
    //         this.deleteUserData?.toString()
    //       ) {

    //         const storedExpense = { ...person };
    //         const storedAlimonyExpense = storedExpense || [];
    //         personToBeUpdated. = {
    //           ...storedExpense,
    //           alimonyExpenses: storedAlimonyExpense.splice(this.deleteUserData, 1)
    //         }
    //       }

    //       return personToBeUpdated;
    //     }
    //   );
    // if (storedHouseholdDetails)
    //   this.service.updateHouseHoldDetails({
    //     ...storedHouseholdDetails,
    //     ...{ absentRelative: updatedHouseholdPersons },
    //   });


  }

  editClicked(user: any) {
    console.log(user);
    this.router.navigate([
      RoutePath.APPLYNOW +
      "/" +
      RoutePath.APPLYNOW_HOUSEHOLD +
      "/" +
      RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVEDETAILS,
      { userId: user },
    ]);
  }

  addClicked() {
    sessionStorage.setItem("AddAbsentRelative", "YES");

    var y: number;
    var x = sessionStorage.getItem("storageId");
    if (x == null) {
      x = String(1);
      y = 1;
      sessionStorage.setItem("storageId", x?.toString());
    }
    else {
      y = parseInt(x) + 1;
      sessionStorage.setItem("storageId", y?.toString());
    }
    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVEDETAILS])
  }
  next() {
    var x = 'householdAbsentRelativeSummary';
    sessionStorage.setItem("routingPath", x);
    if (this.hasLivedInNursingFacility == true)
      this.router.navigate([this.routingStrategy.nextRoute()]);
    else
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSUMMARY])
  }

  back() {
    /* if (this.childsupport == true) {
       this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDABSENTRELATIVECHILDSUPPORTSCREEN])
     } else {
       this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDABSENTRELATIVECHILDSUPPORT])
     }*/
     this.router.navigate([
        RoutePath.APPLYNOW + 
        '/' + RoutePath.APPLYNOW_HOUSEHOLD + 
        '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDABSENTRELATIVECHILDSUPPORT]);
  }

}
