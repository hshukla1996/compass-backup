import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuData } from '@compass-ui/data';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription } from 'rxjs';
import { State } from '../+state/app.state';
import { MenuItemState } from '../shared/menu-item-state';
import { RoutePath } from '../shared/route-strategies';
import { DoIQualifyService } from '../shared/services/do-i-qualify.service';
import { UtilService } from '../shared/services/util.service';
import { DoIQualifyPageActions } from './+state/actions';
import { BasicDetails, DoIQualifyModel, TotalHouseHoldValue, OtherHouseholdSituations, ProgramSelection } from './+state/do-i-qualify.models';
import { getDoIQualify } from './+state/do-i-qualify.selectors';
import { DoIQualifyStoreService } from './do-i-qualify-store-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './do-i-qualify.component.html',
  styleUrls: ['./do-i-qualify.component.scss'],
})
export class DoIQualifyComponent implements OnInit, OnDestroy {
  routePath: typeof RoutePath = RoutePath;
  route: string | undefined = RoutePath.DOIQUALIFY_GETTINGSTARTED;
  subscription = new Subscription(); 
  
  allPACounties$!: Observable<any>;
  disableBasic = false;
  doIQualify!: DoIQualifyModel;

  constructor(
    private store: Store<State>,
    private router: Router,
    private utilService: UtilService,
    private cd: ChangeDetectorRef,
    private doIQualifyService: DoIQualifyService,
    private storeService: DoIQualifyStoreService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    // this.toastrService.success('Message Success!', 'Title Success!');
    this.subscription.add(
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(
          (e: any) => (this.route = this.utilService.getRouteName(e.url))
        )
    );
   // this.store.dispatch(DoIQualifyPageActions.loadDoIQualify());

    this.store.select(getDoIQualify).subscribe(d => {
      this.doIQualify = { ...d };
      this.cd.detectChanges();
    });
    this.doIQualifyService.triggerBasicData$.subscribe(res=>{
      this.disableBasic = true;
    })
  }

  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();

    this.storeService.clearStore()
    sessionStorage.removeItem("state");
  }
}
