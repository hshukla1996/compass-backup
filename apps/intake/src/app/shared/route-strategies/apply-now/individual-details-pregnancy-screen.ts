import { RoutePath } from '..';
import { IApplyNowState } from '../../../apply-now/+state/apply-now.models';
import { IConditionalRoutable, IRoutable } from '../strategy';

export class ApplyNowIndividualDetailsPregnancyScreenStrategy implements IConditionalRoutable {
    hideBackButton = true;
    hideNextButton = true;
    state!: IApplyNowState;

    setDataContext(state: IApplyNowState): void {
        this.state = state;
    }

    get currentRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_PREGNANCYSCREEN;
    }

    nextRoute(): string {
        // if (this.state.pregnancyScreenData?.validState)
            return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_PREGNANCYDETAILSSCREEN;
        //else return this.currentRoute;
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_BENEFITSNOTRECEIVEDSUMMARY;
    }
}  