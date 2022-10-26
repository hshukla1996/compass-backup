import {
  AuthOptions,
  OidcSecurityService,
  OpenIdConfiguration,
  UserDataResult
  } from 'angular-auth-oidc-client';
import { AuthorizedEvent } from '../auth-event';
import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: "compass-ui-authhome",
  templateUrl: "./authhome.component.html",
  styleUrls: ["./authhome.component.scss"],
})
export class AuthhomeComponent implements OnInit, DoCheck {
  
  constructor(
    private oidcSecurityService: OidcSecurityService,
    private authorizedEvent: AuthorizedEvent
  ) { }

  ngOnInit(): void {
    this.oidcSecurityService.authorize();
  }

  ngDoCheck(): void {
    // this.oidcSecurityService.isAuthenticated$.subscribe(({ isAuthenticated }) => {
    //   console.warn("Authorized Event: " + isAuthenticated);
    //   this.authorizedEvent.authorizedEvent().next(isAuthenticated);
    // }); 
  }

  loginOIDC() {
    console.log("Authorize complete");
  }

  logoff() { 
    this.oidcSecurityService.logoff();
  }
}
