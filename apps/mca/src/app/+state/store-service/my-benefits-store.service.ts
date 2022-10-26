import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RoutePath } from '../../shared/route-strategies';
import { AppState } from '../app.state'; 
import * as ChangeReportActions from '../actions/change-report/change-report-page-actions'
import {  MyBenefits } from '../models/my-benefits/my-benefits.model';
import * as MyBenefitsPageActions from '../actions/my-benefits/my-benefits-page-actions'
import { getBenefits } from '../selectors/my-benefits.selector';

@Injectable({
    providedIn: 'root'
})
export class MyBenefitsStoreService {

    routePath: typeof RoutePath = RoutePath;
    mybenefits!: MyBenefits;
    changeReportState$!: Observable<MyBenefits | null>;
    private cd!: ChangeDetectorRef
    myBenefit!: MyBenefits;
    myBenefits$!: Observable<MyBenefits | null>;


    constructor(
        private store: Store<AppState>
    ) {
        this.myBenefits$ = this.store.select(getBenefits);
        this.store.select(getBenefits).subscribe((d) => {
          
            this.mybenefits = { ...d };
        });
    }

    get getMyBenefitsState() { 
        return this.mybenefits;
    }
    //TODO: Remove this method,for example only
    //To create service file, use nx generate @nrwl/angular:service filename
    // viewBenefitDetails(viewBenefits: any) {
    //     this.store.dispatch(MyBenefitsPageActions.storeViewBenefits({ viewBenefits }))

    // }
    
    updateMyBenefits(myBenefit: MyBenefits) {
        this.store.dispatch(MyBenefitsPageActions.storeMyBenefits({ myBenefit }))

    }
    
}
