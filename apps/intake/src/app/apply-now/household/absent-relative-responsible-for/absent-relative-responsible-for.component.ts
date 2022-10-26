import { ApplyNowAbsentRelativeResponsibleForStrategy } from "../../../shared/route-strategies/apply-now/absentRelativeResponsibleFor";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MenuItemState } from '../../../shared/menu-item-state';
import { IApplyNowState } from '../../+state/apply-now.models';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { RoutePath } from '../../../shared/route-strategies';
import { HouseholdFormDataService } from '../services/household-form-data.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IHouseHold, PageDirection, IHouseHoldDetails, IAbsentRelative } from '../../household/household-model';
import { AbsentRelativeResponsibleForCon } from "../models/absentRelativeResponsibleForCon";
import { FormArray, FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import AbsentRelativeResponsibleForData from '../../household/household-who-apply-ltc/household-who-apply-ltc.json';
import { UtilService } from '../../../shared/services/util.service';
import { ScreenQueueUtil } from "../../../shared/services/screen_queue_util.service";
import { PageActionUtil } from '../../../shared/services/page-action-util.service';
import {Utility} from "../../../shared/utilities/Utility";

@Component({
  selector: 'compass-ui-absent-relative-responsible-for',
  templateUrl: './absent-relative-responsible-for.component.html',
  styleUrls: ['./absent-relative-responsible-for.component.scss'],
  providers: [ApplyNowAbsentRelativeResponsibleForStrategy]
})
export class AbsentRelativeResponsibleForComponent implements OnInit {

  @ViewChild('absentRelativeResponsibleForFormEle') absentRelativeResponsibleForFormFormEle: any;
  routePath: typeof RoutePath = RoutePath;
  householdHead!: IHouseHold;
  householdPersons: IHouseHold[] = [];
  absentRelativeResponsibleForCon: AbsentRelativeResponsibleForCon;
  @Output() dataUpdated = new EventEmitter<any>();
  @Output() formState = new EventEmitter<MenuItemState>();
  data: any;
  absentRelativeMap: any = {};
  public age: any;
  public expanded = false;
  applyNowState!: IApplyNowState;
  private formSubmitAttempt: boolean = false;
  private eventsSubscription: Subscription | undefined;
  submitted = false;
  currentUser: IAbsentRelative = {};
   currentServicesMap: any;
  absentRelativeResponsibleForForm: FormGroup | any;
  displayError: boolean = false;
  error: string = "No one in the household is selected."
  indexExpanded = -1;
  selectedData: any[] = [];
  householdMembers: any[] = []
  absentRelativeResponsibleForJsonData: any;
  firstName: any;
  houseHoldPersons: IHouseHold[] = [];
  houseHoldDetails!: IHouseHoldDetails;
  storedHouseHoldDetail!: IHouseHoldDetails;
  absentRelative!: IAbsentRelative[];
  currentUserName!: string;
  currentUserIndex!: number;
  absentRelatives: IAbsentRelative[] = [];
  detail!: IAbsentRelative;
  visit: boolean = false;
  // selectedItems:any;
  visitCount: any;
   absentRelativeJSON:any = {
    questionText:"You told us someone is currently a student. Tell us who.",
    subHeading: "Select all that apply.",
    toolTip: "",
    isRequired: false,
    requiredText: "Please select at least one",
    questionAnswers: [
    ],
  };

  constructor(private fb: FormBuilder, private store: Store<any>,
    private utilService: UtilService,
    private pageActionUtil: PageActionUtil,
    private queueService: ScreenQueueUtil,
    private service: ApplyNowStoreService, private cd: ChangeDetectorRef,
    private routingStrategy: ApplyNowAbsentRelativeResponsibleForStrategy,
    private router: Router, public householdFormDataService: HouseholdFormDataService
  ) {
    this.absentRelativeResponsibleForCon = householdFormDataService.absentRelativeResponsibleForCon;
  }

  ngOnInit(): void {
    //  this.pageActionUtil.initPageMap("currentIncomeMap", "incomePageDirection", false);
    this.houseHoldDetails = this.service.getHouseHoldDetails;
    this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons || [];
    this.absentRelatives = this.houseHoldDetails.absentRelative || [];
    const currentUserIndex = sessionStorage.getItem("storageId") || "";

    if (this.houseHoldPersons.length > 0) {
      this.currentUser =
        this.service.extractUser(
          this.absentRelatives,
            currentUserIndex
        ) || "";
    }
    // console.log("user",this.currentUser)
    this.absentRelativeJSON.questionText = `Who is ${this.currentUser.firstName} ${this.currentUser.lastName} responsible for?`;
    this.houseHoldPersons.forEach((person, index) => {
      if (person.id) {
        // this.absentRelativeJSON.isRequired = (parseInt(this.currentUser.relationships![index]) === person.id) ? false : true;
        this.absentRelativeJSON.questionAnswers.push({
          id: person.id as unknown as number,
          isChecked: this.currentUser.relationships! ? (parseInt(this.currentUser.relationships![index]) === person.id  ? true : false) : false,
          label: `${person.firstName as string} ${
            person.lastName as string
          } ${Utility.getAge(person.dateOfBirth)}`,
        });
        if (this.currentUser.relationships && parseInt(this.currentUser.relationships![index]) === person.id) {
          this.selectedData.push(person.id);
        }
        // this.selectedItems = this.currentUser.relationships;
      }
    });
  }
  public showPreviousPage() {
      this.router.navigate([ RoutePath.APPLYNOW +
      "/" +
      RoutePath.APPLYNOW_HOUSEHOLD +
      "/" +
      RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVERACE]);
  }

  showNextPage(selectedItems: any) {
    let newArray: string[] = [];
    selectedItems.forEach((element: any) => {
      element = element.toString();
      newArray.push(element);
    });
    console.log("newArrayyy", newArray)
    const storedHouseholdDetails = this.service.getHouseHoldDetails;
    const updatedHouseholdPersons = storedHouseholdDetails.absentRelative?.map(
        (person: IAbsentRelative) => {
            // console.log("personid", person.id);
            if (person.id === this.currentUser.id) {
                const personToBeUpdated = { ...person };
                personToBeUpdated.relationships = newArray;
                //  personToBeUpdated.Relationships = "F"
                return personToBeUpdated;
            } else {
                return person;
            }
        }
    );
    if (storedHouseholdDetails) {
      this.service.updateHouseHoldDetails(
        { ...storedHouseholdDetails, ...{ absentRelative: updatedHouseholdPersons } }
      )
    }
    this.router.navigate([
      RoutePath.APPLYNOW +
      '/' + RoutePath.APPLYNOW_HOUSEHOLD +
      '/' + RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVEADDRESS]);
  }
}
