import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, NavigationEnd, Router, RouterStateSnapshot} from '@angular/router';
import { MenuData } from '@compass-ui/data';
import { Store } from '@ngrx/store';
import {filter, Observable, of, Subject, Subscription} from 'rxjs';
import { MenuItemState } from '../shared/menu-item-state';
import { State } from '../+state/app.state';
import { RoutePath } from '../shared/route-strategies';
import { UtilService } from '../shared/services/util.service';
import { ReferralsPageActions } from './+state/actions';
import { IReferralsState, ReferralsModel } from './+state/referrals.models';
import * as menu from './menu';
import { getReferrals } from './+state/referrals.selectors';
// import { getCounties } from '../+state';
import { State as AppState } from './../+state';
import * as StoreActions from './../+state/actions';
import { ReferralStoreService } from './referrals-store-service';

import { AppStoreService } from '../app-store-service';
//import {CanComponentDeactivate} from "../shared/services/route-prompt.service";
import {DialogService} from "../shared/services/route-change-dialog.service";


@Component({
  selector: 'compass-ui-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.scss'],
  providers:[DialogService]
})

export class ReferralsComponent implements  CanDeactivate<ReferralsComponent> {
  routePath: typeof RoutePath = RoutePath;
  route: string | undefined = RoutePath.APPLYNOW + '/' + RoutePath.REFERRALS_GETTINGSTARTED;
  // route: string | undefined = RoutePath.REFERRALS_GETTINGSTARTED;

  subscription = new Subscription();
  //modals
  referrals!: IReferralsState;
  referrals$!: Observable<IReferralsState | null>;

  //generalDetails$!: Observable<GeneralDetails | null>;
  submitEvent: Subject<void> = new Subject<void>();

  items$: any;
  schoolDistricts$: any;
  states$: any;
  phoneNumbers$:any;
  show: boolean | undefined;


  constructor(
    private appService: AppStoreService,
    private store: Store<State>,
    private router: Router,
    private utilService: UtilService,
    private service: ReferralStoreService,
    private cd: ChangeDetectorRef,
    public dialogService: DialogService

  ) {
  }

  canDeactivate(): Observable<boolean> | boolean {


    //if (this.unSaved) {

      const result = window.confirm('There are unsaved changes! Are you sure?');
    this.service.clearStore();
    sessionStorage.removeItem("state");

      return of(result);
   // }
   // return true;
  }
  ngOnInit() {
    this.subscription.add(
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(
          (e: any) => {
            window.scrollTo(0, 0);
            return (this.route = this.utilService.getRouteName(e.url))
          }

        )
    );
    this.store.dispatch(ReferralsPageActions.loadReferrals());
    this.items$ = this.appService.getCounties();
    this.schoolDistricts$ = this.appService.getSchoolDistricts();
    this.states$ = this.appService.getStates();
    this.referrals$ = this.store.select(getReferrals);
    this.phoneNumbers$ = this.appService.getReferralPhoneNumbers();
    this.store.select(getReferrals).subscribe(d => {
      this.referrals = { ...d };
      this.cd.detectChanges();
    });

  }

  getItems() {
    this.show = !this.show;
  }
  submitPage(path: string) {
    this.service.setFormSubmitEvent(path);
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
