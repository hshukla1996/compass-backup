import { RoutePath } from '..';
import { IApplyNowState } from '../../../apply-now/+state/apply-now.models';
import { IConditionalRoutable, IRoutable } from '../strategy';

export class ApplyNowIndividualDetailsSummonsOrWarrantsStrategy implements IConditionalRoutable {
    hideBackButton = true;
    hideNextButton = true;
    state!: IApplyNowState;

    setDataContext(state: IApplyNowState): void {
        this.state = state;
    }
    get currentRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_SUMMONSORWARRANT;
    }

    nextRoute(): string {
        // return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALINCOMETAXRETURNSUMMARY;
        return '';
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALRECOGANIZEDTRIBE;
    }
}  