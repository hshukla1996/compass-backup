import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Output, } from '@angular/core';
import { Subject } from "rxjs";
import { NavigationEnd, Router } from '@angular/router';
import { MenuData } from '@compass-ui/data';
import { MenuItemState } from '../shared/menu-item-state';
import { filter, Observable, Subscription } from 'rxjs';
import { RoutePath } from '../shared/route-strategies';
import { UtilService } from '../shared/services/util.service';
import { Store } from '@ngrx/store';
import { State } from '../+state/app.state';
import {  IApplyNowState } from './+state/apply-now.models';
import * as menu from './menu';
import { ApplyNowPageActions } from './+state/actions';
import { getApplyNow } from './+state/apply-now.selectors';
import { State as AppState } from './../+state';
import { getCitizenship } from '../+state/app.selectors'
import * as StoreActions from './../+state/actions';
import { ApplyNowStoreService } from './apply-now-store-service';
import { IGeneralDetails } from './individual-details/general-details/state/general-details-model';
import {CanComponentDeactivate} from "../deac-gaurd.service";
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
    selector: "compass-ui-apply-now",
    templateUrl: "./apply-now.component.html",
    styleUrls: [
        "./apply-now.component.scss",
       
    ],
})
export class ApplyNowComponent
    implements OnInit, OnDestroy, CanComponentDeactivate
{
    routePath: typeof RoutePath = RoutePath;
    route: string | undefined =
        RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_GETTINGSTARTED;
    subscription = new Subscription();
    //modals
    applyNow!: IApplyNowState;
    applyNow$!: Observable<IApplyNowState | null>;

    //generalDetails$!: Observable<GeneralDetails | null>;
    submitEvent: Subject<void> = new Subject<void>();

    items$: any;
    show: boolean | undefined;
    sfrm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private appstore: Store<AppState>,
        private store: Store<State>,
        private router: Router,
        private utilService: UtilService,
        private service: ApplyNowStoreService,
        private cd: ChangeDetectorRef
    ) {
        this.sfrm = this.fb.group({
            name: [""],
        });
    }
    ngOnInit() {
        this.subscription.add(
            this.router.events
                .pipe(filter((event) => event instanceof NavigationEnd))
                .subscribe((e: any) => {
                    window.scrollTo(0, 0);
                    return (this.route = this.utilService.getRouteName(e.url));
                    window.onbeforeunload = () => alert("unload");
                })
        );

        //this.store.dispatch(ApplyNowPageActions.loadApplyNow());
        //this.appstore.dispatch(StoreActions.AppPageActions.getPACounties());
        this.items$ = this.store.select(getCitizenship);
        this.applyNow$ = this.store.select(getApplyNow);
        console.log(this.applyNow$);
        this.store.select(getApplyNow).subscribe((d) => {
            this.applyNow = { ...d };
            this.cd.detectChanges();
        });
    }

    myclose = false;

    ConfirmClose(event: any) {
        if (event.clientY < 0) {
            event.returnValue =
                "You have closed the browser. Do you want to logout from your application?";
            setTimeout("myclose=false", 10);
            this.myclose = true;
        }
    }

    getItems() {
        this.show = !this.show;
    }
    confirm() {
        return false;
    }

    submitPage(path: string) {
        this.service.setFormSubmitEvent(path);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
