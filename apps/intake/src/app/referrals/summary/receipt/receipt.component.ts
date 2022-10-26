import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItemState } from '../../../shared/menu-item-state';
import { RoutePath } from '../../../shared/route-strategies';
import { ReferralStoreService } from '../../referrals-store-service';
import { HttpClient } from '@angular/common/http';
import { IHousehold } from '../../+state/contact-information-model';
import { IIndividual } from '../../+state/household-details-model';
import { IReferralsState } from '../../+state/referrals.models';
import { ReferralsService } from '../../../shared/services/referrals.service';
import { Router } from '@angular/router';
import { AppStoreService } from '../../../app-store-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'compass-ui-referral-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss'],
})
export class ReceiptComponent implements OnInit {
  @Output() formState = new EventEmitter<MenuItemState>();
  routePath: typeof RoutePath = RoutePath;


  constructor(private service: ReferralStoreService, private http: HttpClient,
    private referralService: ReferralsService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private appService: AppStoreService,) {
    this.appService.getCounties().subscribe((d: any) => {
      this.counties = d.tableRows;

      // this.cd.detectChanges();
    });
    this.appService.getReferralPhoneNumbers().subscribe((d: any) => {
      this.phoneNumbers = d; 
      // this.cd.detectChanges();
    });

  }

  private referralState!: IReferralsState;
  data: any;
  finalresponse: any;
  services: any;
  isLoading = true;
  counties: any = [];
  phoneNumbers: any;
  loadingText = "Loading..."
  phoneNumbers$: Observable<any> | undefined;
  householdDetailsStoredData: any;
  householdSummary!: IHousehold;
  householdContactStoredData: any;
  Individualhousehold!: IIndividual;
  household!: IIndividual;
  individuals: IIndividual[] = [];
  address!: IIndividual;
  ngOnInit(): void {
    this.service.menuStateDisabled();

    // this.service.getAppData().subscribe(d => {
    this.individuals = this.service.getIndividuals ?? [];
    this.household = this.service.getHousehold ?? [];
    this.services = this.service.getServicesSelected ?? [];
      // this.referralState = { ...d };
      // this.household = { ...this.referralState.household };
      // this.individuals = this.referralState.individuals || [];

      // this.services = this.referralState.servicesselected;
      try {
        const finalReferralModel = {
          household: this.household,
          individuals: this.individuals,
          servicesselected: this.services,
          googleReCaptchaResponse: "03AGdBq24yEl-_N0p-Sw_Gne-TVR7jSUBn4WuPpWPuKpZNrr5ZOn0Wkl1ATIDiBSLGpgivAznIjhHSTEZsGLs6zDnbrCvYbbgEu4TxlOOwm_8EWgcLwjuI11Y03QRcAnEgrS0WJHdNHjOp68AXXKrj06vKg0dmlIRJVm0z8olkaIfc7UuUZH_zehKKNiCHP3c6KUJE3OFy5UQ8GeqeXHxC49BroCatUy1mUSKPKdXrAScYp5tFTmCws0La_zfgjEFZRosnxoX6-fVK7-q6JzyhcJwMweyxJY4bovve_ZOPElbOM58yMRCRdtC5v3U7qO0obX-EnH5yJTCq91gHbQZyZmsQbM9VWZ0fT_tqYy3vt5iPR45SZld6XZ2BagQbfHQzsCp-RXrM-TP2urB6TnYP3B4wJ-9FR4T9qzjJzPd5cW2irruR-fFsJy6f0tIhvjM640mYiaiMRNOMIUkK1XeozE6B7gVNM3cOyh3EFmHclVZjKNG_v1MGDaM"
        }
        this.referralService.postReferrals(finalReferralModel).subscribe(response => {
          this.isLoading = false
          console.log(response, "response")
          this.finalresponse = response;

        })
      } catch (ex) {
        this.loadingText = "Something went wrong"
      }

    // });

    this.formState.emit(MenuItemState.INPROGRESS);
  }
  getCountiesName(id: any) {
    // console.log(this.counties, "this.counties")
    const countyDetail = this.counties.filter((county: any) => county.id == id)
    // console.log((countyDetail.length > 0) ? countyDetail[0].displayValue : '',"countyDetail")
    return (countyDetail.length > 0) ? countyDetail[0].displayValue : '';
  }
  getPhoneNumbers(id: any) { 
    const phone = this.phoneNumbers.filter((phonenum: any) => phonenum.id == id)
      // console.log(phonenum)
    return (phone.length > 0) ? phone[0].displayValue : '';
  }
  back() {
    // this.service.clearStore()
    // sessionStorage.removeItem("state");
    this.router.navigate(['/']);
  }
  getStarted() {
    this.router.navigate([RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_GETTINGSTARTED]);
  }
  ngOnDestroy(): void {
    this.formState.emit(MenuItemState.COMPLETED);
    this.service.formStateUpdated(this.routePath.REFERRALS_SUMMARY, MenuItemState.COMPLETED);
    this.service.clearStore()
    sessionStorage.removeItem("state");

  

  }

}
