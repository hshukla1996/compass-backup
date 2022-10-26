import { Action, createReducer, on } from '@ngrx/store';
import * as MyBenefitsPageActions from '../../actions/my-benefits/my-benefits-page-actions' 
import { MyBenefits, initialState } from '../../models/my-benefits/my-benefits.model';


export const myBenefitsReducer = createReducer<MyBenefits>(
    initialState,
    on(MyBenefitsPageActions.storeMyBenefits, (state, action): MyBenefits => { 
        
        return {
            ...state,
            ...action.myBenefit
        };
    }
    ),
 
     
)

 
 

