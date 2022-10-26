// hydration.reducer.ts
import { ActionReducer, INIT, UPDATE } from "@ngrx/store";
import { IApplyNowState } from "./apply-now.models";

export const hydrationMetaReducer = (
    reducer: ActionReducer<IApplyNowState>
): ActionReducer<IApplyNowState> => {
    
    return (state, action) => {
       
        if (action.type === INIT || action.type === UPDATE) {
            const storageValue = sessionStorage.getItem("state");
          
            if (storageValue) {
                try {
                    const storedObj = JSON.parse(storageValue)
                    if (storedObj.currentState === 'ApplyNow'){
                        return storedObj;      
                    }
                    else {
                        sessionStorage.removeItem("state");
                    }
                       
                } catch {
                    sessionStorage.removeItem("state");
                }
            }
        }
        const nextState = reducer(state, action); 
        sessionStorage.setItem("state", JSON.stringify(nextState));
        return nextState;
    };
};