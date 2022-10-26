import { Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Age, BasicDetail, BasicDetails, IRelationships} from '../+state/do-i-qualify.models';
import { RoutePath } from '../../shared/route-strategies/index';
import { State } from '../../+state/app.state';
import { Store } from '@ngrx/store';
import { DoIQualifyStoreService } from '../do-i-qualify-store-service';

import { DoIQualifyHouseholdSummaryStrategy } from '../../shared/route-strategies/do-i-qualify/house-hold-summary';
import { AppStoreService } from '../../app-store-service';
import { MenuItemState } from '../../shared/menu-item-state';
import { PageActionDirection, PageActionUtil } from '../../shared/services/page-action-util.service';
import { UtilService } from '../../shared/services/util.service';
import { IHouseHold} from "../../apply-now/household/household-model";

@Component({
    selector: "compass-ui-household-summary",
    templateUrl: "./household-summary.component.html",
    styleUrls: ["./household-summary.component.scss"],
    providers: [DoIQualifyHouseholdSummaryStrategy],
})
export class HouseholdSummaryComponent implements OnInit {
    @ViewChild("closeModal") closeModal!: ElementRef;
    public age: any;
    public expanded = false;
    relationships: any;
    userToBeDeleted!: any;
    basicDetails: BasicDetail[] = [];
    indexExpanded = -1;
    relationshipsMap: any = [];
    constructor(
        private router: Router,
        private store: Store<State>,
        private service: DoIQualifyStoreService,
        private routingStratagy: DoIQualifyHouseholdSummaryStrategy,
        private appService: AppStoreService,
        private pageActionUtil: PageActionUtil,
        private utilService: UtilService
    ) {
        this.appService.getRelationships().subscribe((c) => {
            this.relationships = c;
            if (!Array.isArray(this.relationships)) {
                this.relationships = [];
            }
        });
    }

    ngOnInit(): void {
        this.basicDetails = this.service.getBasicDetails();
        this.service.formStateUpdated(
            RoutePath.REFERRALS_BASICDETAILS,
            MenuItemState.INPROGRESS
        );
    }
    extractUser(persons: any, userId: any) {
        const currentUser = persons.filter((person: IHouseHold) => {
            return person.id === parseInt(userId);
        })[0];
        
        return currentUser;
    }
    capitalize = (s: string) => (s && s[0].toUpperCase() + s.slice(1)) || "";
    getRelationshipName(relationships: any) {
        
        return relationships.map((relObj: IRelationships) => {
           
            const user = this.extractUser(
                this.basicDetails,
                relObj.individualLookupId
            );
            const detail = this.relationships.filter(
                (relation: any) => {
                    return  relation.id === relObj.relationshipType
                }
            );
            return {
               rel : detail[0]?.displayValue,
                name:
                    this.capitalize(user.lastName) +
                    " " +
                    this.capitalize(user.firstName),
            };
   

        });

        //
        //return (detail.length>0)?detail[0].displayValue:"";
    }
    expand() {
        this.expanded = !this.expanded;
    }
    showGender(gender: any) {
        if (gender !== "" && gender !== undefined) {
            return gender.charAt(0);
        }
        return "";
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

    formatDate(date: any) {
        if (date) {
            const [year, month, day] = date.split("-");

            const result = [month, day, year].join("/");
            return result;
        }
        return date;
    }

    navigateToEdit(id: any) {
        this.service.updateBasicDetails({
            basicDetails: this.basicDetails,
            editId: id,
        } as unknown as BasicDetails);
        setTimeout(() => {
            this.router.navigate([
                RoutePath.DOIQUALIFY + "/" + RoutePath.DOIQUALIFY_EDIT_PERSON,
            ]);
        }, 300);
    }

    updateRelations() {
        const updatedBasicDetails = [...this.basicDetails];
        const existingMembers = updatedBasicDetails.map((member) =>
            member.id.toString()
        );
        //householdpersons 
        for (let i = 0; i < updatedBasicDetails.length; i++) {
            const getRelationshipFor = updatedBasicDetails[i].id;
            const currenMemberRelations: IRelationships[] = [];
            for (let j = 0; j < updatedBasicDetails.length; j++) {
                if (i === j) {
                    continue;
                }
                const getRelationshipTo = updatedBasicDetails[j].id;
                const relationToCurrentMember = updatedBasicDetails[
                    j
                ].relationships.filter(
                    (rel: IRelationships) =>{
                      if (existingMembers.indexOf(rel.individualLookupId.toString()) > -1){
                          return (
                              rel.individualLookupId.toString() ===
                              getRelationshipFor.toString()
                          );
                      }
                      return false;
                    }
                )[0];
                if (
                    relationToCurrentMember &&
                    existingMembers.indexOf(getRelationshipFor.toString()) > -1
                ) {
                    const currentRelation =
                        relationToCurrentMember.relationshipType;
                       
                    currenMemberRelations.push({
                        individualLookupId: getRelationshipTo,
                        relationshipType: this.utilService.getInvRelationships(
                            updatedBasicDetails[i].gender,
                            currentRelation
                        ),
                    });
                }
            }

            updatedBasicDetails[i] = {
                ...updatedBasicDetails[i], //householdpreson Ihouseholdperson //"relationships": [ { "individualLookupId": 0, "relationshipType": "B" } ]
                ...{ relationships: currenMemberRelations },
            };
        }

        this.service.updateBasicDetails({
            basicDetails: updatedBasicDetails,
        } as BasicDetails);
        this.basicDetails = updatedBasicDetails;
    }
    setdeleteUser(user: any) {
        this.userToBeDeleted = user;
    }
    deleteUser() {
        // console.log(this.deleteModal);
        this.basicDetails = this.basicDetails.filter((detail) => {
            return detail.id !== this.userToBeDeleted?.id;
        });
        this.basicDetails = this.basicDetails.map((person) => ({ ...person, guardians: (person.guardians==undefined || person.guardians==null)?[]: person.guardians.filter((g) => g !== this.userToBeDeleted?.id) }))
          this.updateRelations();
        setTimeout(() => {
            this.closeModal.nativeElement.click();
                if (!this.basicDetails.length) {
                    this.router.navigate([
                        this.routingStratagy.previousRoute(),
                    ]);
                }
        }, 100);
       
     
    }

    addPerson() {
        if (this.basicDetails.length <= 20)
            this.router.navigate([
                RoutePath.DOIQUALIFY + "/" + RoutePath.DOIQUALIFY_ADD_PERSON,
            ]);
    }

    back() {
        let id = 0;
        if (this.basicDetails.length > 0) {

            if (this.basicDetails.length > 1) {
                const detail = this.basicDetails[this.basicDetails.length - 1];
                id = detail.id;
            } else {
                id = this.basicDetails[0].id;
            }

        }
        this.navigateToEdit(id);
    }
    next() {
        //this.router.navigate([this.routingStratagy.nextRoute()]);
        this.service.formStateUpdated(
            RoutePath.DOIQUALIFY_BASICDETAILS,
            MenuItemState.COMPLETED
        );
        if (this.hasGuardianOrParent())
        {
            this.nextToGuardianPage();
        } else {
            this.router.navigate([this.routingStratagy.nextRoute()]);
        }
    }
    getHeadOfHouseholdName() {
        const detail = this.basicDetails.filter(
            (detail) => detail.headOfHouse == true
        );
        return detail.length > 0
            ? `of ${detail[0].firstName} ${detail[0].lastName}`
            : "";
    }
    isUsersCountAboveTwenty() {
      
        if (this.basicDetails.length === 20) {
            return true;
        }
        return false;
    }
    isUserCountAbove17(){
        if (this.basicDetails.length >17) {
            return true;
        }
        return false;
    }
    hasAnyChild() {
        return (
            this.basicDetails.filter(
                (detail) =>
                    detail.age < Age.GUARDIANAGE && detail.headOfHouse == false
            ).length > 0
        );
    }
    get getChildren() {
        const minId=this.utilService.getMinId(this.basicDetails);
        return this.basicDetails.filter(
            (detail) => detail.age <= 18 && detail.id != minId
        );
    }
    nextToGuardianPage() {
        
        const children = this.getChildren;
        if(children.length==0){
            this.router.navigate([this.routingStratagy.nextRoute()]);
            return;
        }
        if (children.length > 0) {
            if (children.length == 1) {
                const minId = this.utilService.getMinId(this.basicDetails);
                const ind = this.basicDetails.findIndex((person) => person.id == minId);
                if (ind >= 0) {
                    const age = this.basicDetails[ind].age;
                    if (age < 11) {
                        this.router.navigate([this.routingStratagy.nextRoute()]);
                        return;
                    }
                }
            }
            this.pageActionUtil.initPageMap(
                "guardianMap",
                "guardianPageDirection",
                true
            );
            this.pageActionUtil.emptyMap();

            children.forEach((detail) => {


                const index = this.basicDetails.findIndex(
                    (d) => d.id == detail.id
                );
                if (index > -1)
                    this.pageActionUtil.changeMapValue(index, false);


            });
        }
        this.pageActionUtil.updatePageActionDetail(PageActionDirection.NEXT);
        this.router.navigate([this.routingStratagy.guardianPath()]);
    }
    hasAtleastOneAdult() {
        return this.basicDetails.filter((detail) => detail.age > 18).length > 0;
    }
    hasGuardianOrParent() {
        const individualLen = this.basicDetails.length;
        if (individualLen < 2) return false;
        const isAgeEighteenOrUnder = this.basicDetails.filter((person) => person.age <= 18).length > 0;
        if (isAgeEighteenOrUnder) {
            const isAgeElevenOrAbove = this.basicDetails.filter((person) => person.age >= 11).length > 0;
            return isAgeElevenOrAbove;
        }
        return false;
    }
    isFirstUser(id:any){
        return(this.utilService.getMinId(this.basicDetails) == id) ? true : false
    }
    
}
