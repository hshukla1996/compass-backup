// hydration.reducer.ts
import { ActionReducer, INIT, UPDATE } from "@ngrx/store";
import { DoIQualifyState } from "./do-i-qualify.models";

export const hydrationMetaReducer = (
    reducer: ActionReducer<DoIQualifyState>
): ActionReducer<DoIQualifyState> => {

    return (state, action) => {

        if (action.type === INIT || action.type === UPDATE) {
            const storageValue = sessionStorage.getItem("state");

            if (storageValue) {
                try {
                    const storedObj = JSON.parse(storageValue)
                    if (storedObj.currentState === 'DoIQualify') {
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