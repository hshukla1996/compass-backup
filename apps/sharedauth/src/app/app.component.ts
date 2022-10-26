import { HttpHeaders, HttpClient, HttpBackend, HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { AuthOptions, OidcSecurityService, OpenIdConfiguration, UserDataResult } from 'angular-auth-oidc-client';

@Component({
  selector: "compass-ui-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "sharedauth";

  constructor(public oidcSecurityService: OidcSecurityService, public http: HttpClient) { }

  ngOnInit(): void {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken, errorMessage }) => {
      console.log(isAuthenticated);
      console.log(userData);
      console.log(accessToken);
      console.log(errorMessage ? JSON.stringify(errorMessage) : "CheckAuth is working.");
    });
  }
 
}

