import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { IApplyNowState } from '../../+state/apply-now.models';
import { IHouseHold, PageDirection } from '../../household/household-model';
import { Router, ActivatedRoute } from '@angular/router';
import {RoutePath} from '../../../shared/route-strategies';
import { ApplyNowIndividualDetailsSnapOrTanfBenefitsStrategy } from '../../../shared/route-strategies/apply-now/individual-details-snap-or-tanf-benefits';
import SnapOrTanfJson from './sanp-or-tanf-benefits.json';
import { UtilService } from "../../../shared/services/util.service";

@Component({
  selector: 'compass-ui-snap-or-tanf-benefits',
  templateUrl: './snap-or-tanf-benefits.component.html',
  styleUrls: ['./snap-or-tanf-benefits.component.scss'],
  providers: [ApplyNowIndividualDetailsSnapOrTanfBenefitsStrategy],
})
export class SnapOrTanfBenefitsComponent implements OnInit {
  jsonData: any;
  applyNowState!: IApplyNowState;
  snapOrTanfForm: FormGroup | any;
  programSelection: any;
  sevicesselected: any[] = [];
  householdPersons: IHouseHold[] = [];
  currentSnapUser: any[] = [];
  userName = "John";
  currentUser: IHouseHold = {};
  currentUserIndex!: string;
  currentSnapOrTanfMap!: any;

  constructor(
    private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private routingStrategy: ApplyNowIndividualDetailsSnapOrTanfBenefitsStrategy,
    private router: Router,
    private cd: ChangeDetectorRef,
    private activedRoute: ActivatedRoute,
    private utilService: UtilService) { }

  ngOnInit(): void {
    this.jsonData = SnapOrTanfJson;
    this.snapOrTanfForm = this.fb.group({
      sevicesselected: this.fb.array([]),
    });
    
    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.programSelection = this.applyNowState.programSelection?.programs || [];
      this.currentSnapOrTanfMap = {...this.applyNowState.houseHoldDetails.pageAction?.currentSnapOrTanfMap} || {};
      this.cd.detectChanges();
    });

    this.programSelection.forEach((program: any) => {
      if (program === 'CI' || program === "CIR") {
        SnapOrTanfJson['isRequired'] = true;
      }
    })

    this.householdPersons = this.applyNowState.houseHoldDetails?.houseHoldPersons || [];
    
    this.activedRoute.params.subscribe((p) => {
        if (Object.keys(p).length == 0) {
            this.currentUserIndex =
                this.utilService.getCurrentUserIdOnNoParams(
                    this.currentSnapOrTanfMap
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

    this.userName = this.currentUser.firstName!;

    this.applyNowState.houseHoldDetails.houseHoldPersons!.forEach((person: IHouseHold) => {
      const clonedPerson = { ...person };
      if (clonedPerson.firstName === this.userName) {
        this.sevicesselected = clonedPerson.fsOrTANFBenefits!;
        for (let selectedService of SnapOrTanfJson['questionAnswers']) {
          selectedService['isChecked'] = false;
          for (let index in this.sevicesselected) {
            if (selectedService['id'] === this.sevicesselected[index]) {
              selectedService['isChecked'] = true;
            }
          }
        }
      }
      this.cd.detectChanges();
    });

    SnapOrTanfJson['questionText'] = SnapOrTanfJson['questionText'].replace(SnapOrTanfJson['questionText'].split("does")[1].split(" ")[1], this.userName);
    this.jsonData = SnapOrTanfJson;
  }

  showNextPage(user: any) {
    const storedHouseholdDetails = this.applyNowState?.houseHoldDetails;
    const clonedUpdatedPerson: IHouseHold[] = [];

    this.applyNowState.houseHoldDetails.houseHoldPersons!.forEach((person: IHouseHold) => {
      const clonedPerson = { ...person };
      if (clonedPerson.firstName === this.userName) {
        clonedPerson.fsOrTANFBenefits = user;
      }
      clonedUpdatedPerson.push(clonedPerson);
    });
        
    let isNextPage = false;
    this.currentSnapOrTanfMap[this.currentUserIndex] = false;
    const updatedPageAction = {
        ...storedHouseholdDetails?.pageAction,
        currentSnapOrTanfMap: {
            ...storedHouseholdDetails?.pageAction?.currentSnapOrTanfMap,
            ...this.currentSnapOrTanfMap,
        },
        currentSnapOrTanfDirection: PageDirection.NEXT,
    };
    if (storedHouseholdDetails){
      this.service.updateHouseHoldDetails({
          ...storedHouseholdDetails,
          ...{ houseHoldPersons: clonedUpdatedPerson, pageAction: updatedPageAction },
      });
    }
    if (this.currentSnapOrTanfMap != null) {
        isNextPage = this.utilService.isNextPage(this.currentSnapOrTanfMap);
    }
    if (isNextPage) {
        this.utilService
            .getCurrentUserIdPageAction(
                this.currentSnapOrTanfMap,
                PageDirection.NEXT
            )
            .subscribe((id: any) => {
                this.currentUserIndex = id.toString();
                this.router.navigate([
                    RoutePath.APPLYNOW +
                      "/" +
                      RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                      "/" +
                      RoutePath.APPLYNOW_INDIVIDUALDETAILS_SNAPORTANFBENEFITSDETAILS,
                    { userId: this.currentUserIndex },
                ]);
            });
    } else {
        this.router.navigate([
            RoutePath.APPLYNOW +
              "/" +
              RoutePath.APPLYNOW_INDIVIDUALDETAILS +
              "/" +
              RoutePath.APPLYNOW_INDIVIDUALDETAILS_SNAPORTANFBENEFITSDETAILS,
        ]);
    }
  }

  showPreviousPage() {
    this.router.navigate([
        RoutePath.APPLYNOW +
          "/" +
          RoutePath.APPLYNOW_INDIVIDUALDETAILS +
          "/" +
          RoutePath.APPLYNOW_INDIVIDUALDETAILS_CURRENTSNAPORTANFBENEFITS,
          { userId: this.currentUserIndex },
    ]);
  }
}
