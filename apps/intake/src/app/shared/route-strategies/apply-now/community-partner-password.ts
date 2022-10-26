import { Injectable } from '@angular/core';
import { RoutePath } from '..';
import { IRoutable } from '../strategy';
@Injectable()
export class ApplyNowCommunityPartnerPasswordStrategy implements IRoutable {
    hideBackButton = true;
    hideNextButton = true;
    get currentRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_GETTINGSTARTED_COMMUNITYPARTNERPASSWORD;
    }

    nextRoute(): string {
        // Your custom code here
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_GETTINGSTARTED_PREPOPULATEAPPLICATION;
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_GETTINGSTARTED_NONPROVIDERREGISTRATION;
    }
}
