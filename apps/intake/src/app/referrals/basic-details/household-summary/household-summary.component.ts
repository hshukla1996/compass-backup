import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { State, Store } from '@ngrx/store';
import { format } from 'date-fns';
import { IIndividual, IRelationships } from '../../+state/household-details-model';
import { IReferralsState } from '../../+state/referrals.models';
import { AppStoreService } from '../../../app-store-service';
import { MenuItemState } from '../../../shared/menu-item-state';
import { RoutePath } from '../../../shared/route-strategies';
import { ReferralsBasicDetailsStrategy } from '../../../shared/route-strategies/referrals/basic-details';
import { ReferralsHouseholdSummaryStrategy } from '../../../shared/route-strategies/referrals/household-summary';
import { ReferralStoreService } from '../../referrals-store-service';


@Component({
  selector: 'compass-ui-household-summary',
  templateUrl: './household-summary.component.html',
  styleUrls: ['./household-summary.component.scss'],
  providers: [ReferralsHouseholdSummaryStrategy],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseholdSummaryComponent implements OnInit {
  @ViewChild("closeModal") closeModal!: ElementRef;

  public age: any;
  public expanded = false;

  referralState!: IReferralsState;
  household!: IIndividual;
  userToBeDeleted!: any;
  individuals: IIndividual[] = [];
  indexExpanded = -1;
  relationships: any = [];
  @Output() formState = new EventEmitter<MenuItemState>();
  routePath: typeof RoutePath = RoutePath;

  constructor(
    private fb: FormBuilder,
    private service: ReferralStoreService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private appService: AppStoreService,
    private routingStratagy: ReferralsHouseholdSummaryStrategy,
  ) {
    this.appService.getRelationships().subscribe((c = []) => {

      this.relationships = c;

      // this.cd.detectChanges();
    });
  }
  capitalize = (s: string) => (s && s[0].toUpperCase() + s.slice(1)) || "";
  getRelationshipName(relationships: any) {
    return relationships.map((relObj: IRelationships) => {
      const user = this.extractUser(
        this.individuals,
        relObj.individualLookupId
      );
      const detail = this.relationships.filter(
        (relation: any) => {

          return relation.id === relObj.relationshipType
        }
      );
      return {
        rel: detail[0]?.displayValue,
        name:
          this.capitalize(user?.lastName) +
          " " +
          this.capitalize(user?.firstName),
      };


    });

  }


  extractUser(persons: any, userId: any) {
    const currentUser = persons.filter((person: IIndividual) => {
      return person.individualNumber?.toString() === userId.toString();
    })[0];

    return currentUser;
  }
  ngOnInit(): void {
    this.service.formStateUpdated(this.routePath.REFERRALS_BASICDETAILS, MenuItemState.INPROGRESS);

    this.service.getAppData().subscribe(d => {
      this.referralState = { ...d };
      this.household = { ...this.referralState.household };
      if (this.household.dateOfBirth) {
        const newFormattedDate = new Date(this.household.dateOfBirth as unknown as Date);
        this.household.dateOfBirth = format(newFormattedDate, 'MM-dd-yyyy');
      }

      this.individuals = this.referralState.individuals || [];
      this.cd.detectChanges();

    });
  }


  getRelationshipsname(id: any) {

    const detail = this.relationships.filter((relation: any) => relation.id == id)
    return (detail.length > 0) ? detail[0].displayValue : '';
  }
  navigateToEdit(individualNumber: any) {
    setTimeout(() => {
      this.router.navigate([RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_ADDANOTHERPERSON, { userId: individualNumber }]);

    }, 100);
  }
  formatDate(date: any) {
    if (date) {
      const [year, month, day] = date.split("-");

      const result = [month, day, year].join("/");
      return result;
    }
    return date;
  }

  isUsersCountAboveTwenty() {

    if (this.individuals.length === 20) {
      return true;
    }
    return false;
  }
  removeHead() {
    if (this.individuals.length > 0) {
      alert("Remove all relations to delete head household");
    }
    else {
      const updatedHouseholdObj = { household: {} }
      setTimeout(() => {
        this.router.navigate([RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_BASICDETAILS]);
      }, 1000)
    }
  }
  setdeleteUser(user: any) {
    this.userToBeDeleted = user;
  }
  deleteUser() {
    const updatedHouseHoldPersons = this.individuals.filter(person => {
      return person.individualNumber !== this.userToBeDeleted?.individualNumber;
    });
    this.service.updateIndividualDetails(updatedHouseHoldPersons);
    setTimeout(() => {
      this.closeModal.nativeElement.click();
      if (!this.individuals.length) {
        this.router.navigate([
          this.routingStratagy.previousRoute(),
        ]);
      }
    }, 100);
  }
  expand() {
    this.expanded = !this.expanded;
  }

  back() {
    let id = "0";
    if (this.individuals.length > 0) {

      if (this.individuals.length > 1) {
        const detail = this.individuals[this.individuals.length - 1];
        id = detail.individualNumber?.toString() || "1";
      }
      else {
        id = this.individuals[0].individualNumber?.toString() || "1";
      }
    }
    this.navigateToEdit(id);
  }

  next() {
    this.router.navigate([RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_PROGRAMSELECTION]);

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

  editDetails() {
    this.router.navigate([RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_BASICDETAILS]);
  }
  addPerson() {
    if (this.individuals.length <= 20)
      this.router.navigate([RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_ADDANOTHERPERSON]);
  }
  ngOnDestroy(): void {
    this.formState.emit(MenuItemState.COMPLETED);


  }

}
