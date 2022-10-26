import { createAction, props } from '@ngrx/store'; 
import { MyBenefits } from '../../models/my-benefits/my-benefits.model';
 

export const storeMyBenefits = createAction(
    '[MyBenefits page] add MyBenefits',
    props<{ myBenefit: any }>()
);


// export const storeViewBenefits = createAction(
//     '[ApplyNow Page] Store viewBenefits',
//     props<{ viewBenefits: any }>() 

// );