import { Component } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: "compass-ui-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    title = "provider-search";
    code: string = '';

    constructor(
      private route: ActivatedRoute,
      private cookie: CookieService
    ) { }

}
