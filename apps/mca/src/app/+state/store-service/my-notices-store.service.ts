import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RoutePath } from '../../shared/route-strategies';
import { AppState } from '../app.state';
import * as ChangeReportActions from '../actions/change-report/change-report-page-actions'
import * as MyBenefitsPageActions from '../actions/my-benefits/my-benefits-page-actions'
import * as MyNoticesPageActions from '../actions/my-notices/my-notices-page-actions'
import { MyNotices } from '../models/my-notices/my-notices.model';
import { getNotices } from '../selectors/my-notices.selector';

@Injectable({
    providedIn: 'root'
})

export class MyBenefitsStoreService {
    routePath: typeof RoutePath = RoutePath;
    mynotices!: MyNotices;
    changeReportState$!: Observable<MyNotices | null>;
    private cd!: ChangeDetectorRef
    myNotice!: MyNotices;
    myNotices$!: Observable<MyNotices | null>;

    constructor(
        private store: Store<AppState>
    ) {
        this.myNotices$ = this.store.select(getNotices);
        this.store.select(getNotices).subscribe((d) => {

            this.mynotices = { ...d };
        });
    }

    get getMyNoticesState() {
        return this.mynotices;
    }

    updateMyNotices(myNotice: MyNotices) {
        this.store.dispatch(MyNoticesPageActions.storeMyNotices({ myNotice }))

    }
}

