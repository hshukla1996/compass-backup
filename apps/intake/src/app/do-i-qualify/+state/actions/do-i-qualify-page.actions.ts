import { createAction, props } from '@ngrx/store';
import {  DoIQualifyAPIModel, DoIQualifyModel } from '../do-i-qualify.models';

export const loadDoIQualify = createAction('[DoIQualify Page] Load DoIQualify');
export const clearDoIQualify = createAction('[DoIQualify Page] Clear DoIQualify');
export const postDoIQualify = createAction(
  '[DoIQualify Page] Post DoIQualify',
  props<{ doIQualify: DoIQualifyAPIModel }>()
);

export const storeBasicDetails = createAction(
  '[DoIQualify Page] Store BasicDetails',
  props<{ doIQualify: DoIQualifyModel }>()
);

export const storeProgramSelections = createAction(
  '[DoIQualify Page] Store Program Selection',
  props<{doIQualify: DoIQualifyModel}>()
)
export const storeHouseholdValueActions = createAction(
  '[DoIQualify Page] Store Household Value',
  props<{doIQualify: DoIQualifyModel}>()
)
export const storeHouseholdSituationsActions = createAction(
  '[DoIQualify Page] Store House Situations Value',
  props<{doIQualify: DoIQualifyModel}>()
)
export const storeOneOrMoreJobDetails = createAction(
  '[DoIQualify Page] Store OneOrMoreDetails',
  props<{ doIQualify: DoIQualifyModel }>()
);

export const loadDoIQualifyMenu = createAction('[DoIQualify Page] Load Menu');

export const updateMenuState = createAction(
  '[DoIQualify Page] Update Menu Item Status',
  props<{ doIQualify: DoIQualifyModel }>()
);
export const updatePageAction = createAction(
  '[DoIQualify Page] Update Page Action Detail',
  props<{ doIQualify: DoIQualifyModel }>()
);
export const updateScreenQueueAction = createAction(
  '[DoIQualify Page] Update Page Queue Detail',
  props<{ doIQualify: DoIQualifyModel }>()
);
export const storeHouseholdsituationSelectionActions = createAction(
  '[DoIQualify Page] Store House Situations Options Value',
  props<{ doIQualify: DoIQualifyModel }>()
)
export const updateYesNoValues = createAction(
  '[DoIQualify Page] Store Yes No Values',
  props<{ doIQualify: DoIQualifyModel }>()
)
export const storeMaleFemaleRelationships = createAction(
  '[DoIQualify Page] Store Male Female Values',
  props<{ doIQualify: DoIQualifyModel }>()
)

