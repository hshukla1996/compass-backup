import { RoutePath } from '..';
import { IApplyNowState } from '../../../apply-now/+state/apply-now.models';
import { IConditionalRoutable } from '../strategy';

export class ApplyNowIndividualDetailsBenefitsNotReceivedDDetailsStrategy implements IConditionalRoutable {
    state!: IApplyNowState;
    setDataContext(state: IApplyNowState): void {
        this.state = state;        
    }
    get currentRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_BENEFITSNOTRECEIVEDDETAILS;
    }

    nextRoute(): string {
        if (this.state.benefitsNotReceviedDetails?.validState)
            return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_BENEFITSNOTRECEIVEDSUMMARY;
        else return this.currentRoute;
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_BENEFITSNOTRECEIVED;
    }
}  