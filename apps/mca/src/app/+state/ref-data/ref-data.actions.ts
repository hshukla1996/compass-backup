import { createAction, props } from '@ngrx/store';
import { MyBenefits } from '../models/my-benefits/my-benefits.model';
import { Post } from '../models/post.model'; 

export const addPostAction = createAction(
  '[MyBenefits page] add MyBenefits',
  props<{ myBenefit: MyBenefits }>()
);

export const addedPostAction = createAction(
  '[MyBenefits page] added MyBenefits',
  props<{ myBenefit: MyBenefits }>()
);

export const updatePostAction = createAction(
  '[MyBenefits Page] update MyBenefits',
  props<{ myBenefit: MyBenefits }>()
);

export const updatedPostAction = createAction(
  '[MyBenefits page] updated MyBenefits',
  props<{ myBenefit: MyBenefits }>()
);

export const deletePostAction = createAction(
  '[MyBenefits page] delete MyBenefits',
  props<{ id: string }>()
);

export const deletedPostAction = createAction(
  '[MyBenefits page] deleted MyBenefits',
  props<{ id: string }>()
);

export const loadPosts = createAction('[Posts page] Load posts');
export const loadCounties = createAction('[App page] Load Counties');

export const loadedCounties = createAction(
  '[App page] Loaded Counties',
  props<{ counties: any }>()
);

export const loadedCountiesFailure = createAction(
  '[App page] Loaded Counties Failure',
  props<{ error: string }>()
);

export const loadedPosts = createAction(
  '[MyBenefits page] Loaded MyBenefits',
  props<{ myBenefits: MyBenefits[] }>()
);
