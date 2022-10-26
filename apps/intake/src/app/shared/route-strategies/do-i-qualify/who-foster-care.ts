import { RoutePath } from '..';
import { DoIQualifyState } from '../../../do-i-qualify/+state/do-i-qualify.models';
import { IConditionalRoutable, IRoutable } from '../strategy';

export class DoIQualifyWhoFosterCareStrategy implements IConditionalRoutable {
    state!: DoIQualifyState;
    hideBackButton = true;
    hideNextButton = true;
    setDataContext(state: DoIQualifyState): void {
        this.state = state;
        console.log('Got state data for DoIQualifyBasicDetailsStrategy');
    }
    get currentRoute(): string {
        return RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_FOSTERCARE;
    }

    nextRoute(): string {


        return "";

    }

    previousRoute(): string {

return RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_CURRENTLYENROLLED;
    }
}
