/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IHousehold } from '../+state/contact-information-model';
import { IAddress, IIndividual, IRelationships } from '../+state/household-details-model';
import { IReferralsState } from '../+state/referrals.models';
import { MenuItemState } from '../../shared/menu-item-state';
import { RoutePath } from '../../shared/route-strategies';
import { ReferralStoreService } from '../referrals-store-service';
import { HttpClient } from '@angular/common/http';
import { AppStoreService } from '../../app-store-service';
import { Utility } from '../../shared/utilities/Utility';

@Component({
  selector: 'compass-ui-referral-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  @Output() formState = new EventEmitter<MenuItemState>();
  routePath: typeof RoutePath = RoutePath;
  referralState: IReferralsState | undefined;
  data: any;
  householdDetailsStoredData: any;
  householdSummary!: IHousehold;
  householdContactStoredData: any;
  Individualhousehold!: IIndividual;
  household!: IIndividual;
  individuals: IIndividual[] = [];
  address!: IIndividual;
  relationships: any = [];
  counties: any = [];
  countyDetail: any;
  schoolDistricts: any;
  dobOfMainContactPerson: any;
  // householdPersons: IHousehold[] = [];
  // householdObjToArr: [] =[];
  map=[] as any
  userDetail!: any;
  showAddress=false;
  dob: any;
  constructor(private service: ReferralStoreService, private http: HttpClient,
    private router: Router,
    private appService: AppStoreService,
    private cd: ChangeDetectorRef,) {
    this.appService.getRelationships().subscribe((c = []) => {
      this.relationships = c;
    });
    this.appService.getCounties().subscribe((d: any) => {
      this.counties = d.tableRows;

      // this.cd.detectChanges();
    });
    this.appService.getSchoolDistricts().subscribe((d: any) => {
      this.schoolDistricts = d;

      // this.cd.detectChanges();
    });

  }
  getAge(dateString: any): any {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  getSchoolDistrictsName(id: any) {
    const schoolName = this.schoolDistricts.filter((relation: any) => relation.id == id)
    return (schoolName.length > 0) ? schoolName[0].displayValue : '';
  }

  getRelationshipsname(id: any) {
    const detail = this.relationships.filter((relation: any) => relation.id == id)
    return (detail.length > 0) ? detail[0].displayValue : '';
  }

  ngOnInit(): void {
    // this.formState.emit(MenuItemState.INPROGRESS);
    this.service.formStateUpdated(this.routePath.REFERRALS_SUMMARY, MenuItemState.INPROGRESS)
    this.service.getAppData().subscribe(d => {
      this.referralState = { ...d };
      this.household = { ...this.referralState.household };
      this.individuals = this.referralState.individuals || [];


    });
    if(this.household.individualNumber !== "100"){
      this.getAgeInSummary();

    }
    if (this.household.address?.addressLine1 || this.household.address?.addressLine2 || this.household.address?.city || this.household.address?.state || this.household.address?.zip){
      this.showAddress = true
    }

    const rels = this.household.relationshipsToIndividual ?? [];
    rels.forEach((rel:any) => {
       

      let relationName = ''

      let individualName = ''
       
      let  dob = null
      let relationship = this.relationships.filter((relt:any) => {

        return relt.id === rel.relationshipType;

      })

      let details = this.individuals.filter((person) => {
        // if (rel.relationshipType !== "0"){
        return person.individualNumber == rel.individualLookupId
        // }

      })

      if (relationship.length > 0) {

        relationName = relationship[0].displayValue;

      }

      if (details.length > 0) {

        individualName = details[0].firstName + ' ' + details[0].lastName
        dob = Utility.getAge(details[0].dateOfBirth)  

      }
       
      if (rel.relationshipType !== "0" && rel.relationshipType !== null) {
      this.map.push({rel:relationName,name:individualName,dateofbirth:dob})
      }

      


    })


  }

  getAgeInSummary(){
    const indPerson = this.individuals.filter((ind: any) => ind.individualNumber == this.household.individualNumber)
    this.dobOfMainContactPerson =  Utility.getAge(indPerson[0].dateOfBirth)

  }
  getCountiesName(id: any) {
    const countyDetail = this.counties.filter((county: any) => county.id == id)
    return (countyDetail.length > 0) ? countyDetail[0].displayValue : '';
  }

  editDetails(individualNumber: any) {
    if (individualNumber == '1') {
      this.router.navigate([RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_BASICDETAILS, { userId: individualNumber }]);
    }
    this.router.navigate([RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_ADDANOTHERPERSON, { userId: individualNumber }]);
    // this.router.navigate([RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_CONTACTINFORMATION]);

  }
  capitalize = (s: string) => (s && s[0].toUpperCase() + s.slice(1)) || "";
   
  getIndividualName(individual : any) {
    const detail = this.relationships.filter(
      (relation: any) => {
        return relation.id === individual.relationshipType
      }
    )[0].displayvalue; 
      const relationValue = this.individuals.filter((person:any)=> {
        return person.individualNumber === individual.individualLookupId
      })
    return {
      rel: detail,
      name: relationValue[0].firstName + " " + relationValue[0].lastName
       
    };
  }


  getRelationshipName(relationships: any) {

    return relationships.map((relObj: IRelationships) => {

      // const user = this.extractUser(
      //   this.basicDetails,
      //   relObj.individualLookupId
      // );
      const detail = this.relationships.filter(
        (relation: any) => {
          return relation.id === relObj.relationshipType
        }
      );
      return {
        rel: detail[0]?.displayValue,
        name: this.household?.firstName + "" + this.household?.lastName
          // this.capitalize(user.lastName) +
          // " " +
          // this.capitalize(user.firstName),
      };


    });

    //
    //return (detail.length>0)?detail[0].displayValue:"";
  }
  getRelationshipInd(relationships: any) {

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
        name: user.firstName + " " + user.lastName
        // this.capitalize(user.lastName) +
        // " " +
        // this.capitalize(user.firstName),
      };


    });

    //
    //return (detail.length>0)?detail[0].displayValue:"";
  }
  // getRelationshipName(relationshipsToIndividual: any) { 
  //   return relationshipsToIndividual.map((relObj: IRelationships) => { 
  //     const user = this.extractUser(
  //       this.household,
  //       relObj.individualLookupId
  //     );
  //     const detail = relationshipsToIndividual.filter(
  //       (relation: any) => {
  //         return relation.id === relObj.relationshipType
  //       }
  //     );
  //     return {
  //       rel: detail[0]?.displayValue,
  //       name:
  //         this.capitalize(user.lastName) +
  //         " " +
  //         this.capitalize(user.firstName),
  //     };


  //   });

  //   //
  //   //return (detail.length>0)?detail[0].displayValue:"";
  // }
  formatDate(date: any) {
    if (date) {
      const [year, month, day] = date.split("-");

      const result = [month, day, year].join("/");
      return result;
    }
    return date;
  }

  extractUser(persons: any, userId: any) {

    const currentUser = persons.filter((person: IIndividual) => {

      return person.individualNumber.toString() === userId.toString();
    })[0];


    return currentUser;
  }

  next() {
    this.router.navigate([RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_RECEIPT]);
  }
  previous() {
    this.router.navigate([RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_CONTACTINFORMATION]);

  }

}
