import { RoutePath } from '..';
import { IApplyNowState } from '../../../apply-now/+state/apply-now.models';
import { IConditionalRoutable, IRoutable } from '../strategy';

export class ApplyNowIndividualDetailsPregnancySummaryScreenStrategy implements IConditionalRoutable {
    hideBackButton = true;
    hideNextButton = true;
    state!: IApplyNowState;
    setDataContext(state: IApplyNowState): void {
        this.state = state;
    }
    
    get currentRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_PREGNANCYSUMMARYSCREEN;
    }

    nextRoute(): string {
        // if (this.state.pregnancySummaryScreenDetails?.validState)
            return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALINCOMETAXRETURN;
        // else return this.currentRoute;
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_PREGNANCYDETAILSSCREEN;
    }
}  