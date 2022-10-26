import { Component, OnInit, SecurityContext } from '@angular/core';
import { Router } from '@angular/router';
import { RoutePath } from '../../../shared/route-strategies';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from 'apps/intake/src/environments/environment';

@Component({
  selector: 'compass-ui-non-provider-registration',
  templateUrl: './non-provider-registration.component.html',
  styleUrls: ['./non-provider-registration.component.scss']
})
export class NonProviderRegistrationComponent implements OnInit {

  constructor(private route: Router, private _sanitizer: DomSanitizer) { }
  previous() {
    this.route.navigate([
      RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_GETTINGSTARTED_COMMUNITYORGANIZATION
    ]);
  }
  selfRegistration(){
    const url = environment.compassRegistrationUrl;
  
    const safeUrl = this._sanitizer.sanitize(SecurityContext.RESOURCE_URL, this._sanitizer.bypassSecurityTrustResourceUrl(url)) as string;
    window.open(safeUrl);

  }

  next() {
    this.route.navigate([
      RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_GETTINGSTARTED_COMMUNITYPARTNERPASSWORD
    ]);
  }
  ngOnInit(): void {
  }

}
