import { createAction, props } from '@ngrx/store';
import { DoIQualifyEntity, BasicDetails, ProgramSelection } from './do-i-qualify.models';

export enum DoIQualifyActionTypes {
  Init = '[DoIQualify Page] Init',
  InitSuccess = '[DoIQualify/API] Load DoIQualify Success',
  InitFailure = '[DoIQualify/API] Load DoIQualify Failure',
  SaveBasicDetails = '[DoIQualify/API] save Basic Details',
  SaveProgramSelection = '[DoIQualify/API] save program selection Details',
  
}

export const init = createAction(DoIQualifyActionTypes.Init);

export const loadDoIQualifySuccess = createAction(
  DoIQualifyActionTypes.InitSuccess,
  props<{ payload: DoIQualifyEntity[] }>()
);

export const loadDoIQualifyFailure = createAction(
  DoIQualifyActionTypes.InitFailure,
  props<{ error: any }>()
);

export const saveBasicDetails = createAction(
  DoIQualifyActionTypes.SaveBasicDetails,
  props<{payload: BasicDetails }>()
  );

  export const storeProgramSelections = createAction(
    DoIQualifyActionTypes.SaveProgramSelection,
    props<{payload: ProgramSelection}>()
  )