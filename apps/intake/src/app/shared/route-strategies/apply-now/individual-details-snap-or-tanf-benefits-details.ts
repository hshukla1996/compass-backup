import { RoutePath } from '..';
import { IApplyNowState } from '../../../apply-now/+state/apply-now.models';
import { IConditionalRoutable, IRoutable } from '../strategy';

export class ApplyNowIndividualDetailsSnapOrTanfBenefitsDetailsStrategy implements IConditionalRoutable {
    hideBackButton = true;
    hideNextButton = true;
    state!: IApplyNowState;
    setDataContext(state: IApplyNowState): void {
        this.state = state;
    }
    get currentRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_SNAPORTANFBENEFITSDETAILS;
    }

    nextRoute(): string {
        // if (this.state.snapOrTanfBenefitsDetails?.validState)
            return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_SNAPORTANFBENEFITSSUMMARY;
        // else return this.currentRoute;
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_SNAPORTANFBENEFITS;
    }
}  