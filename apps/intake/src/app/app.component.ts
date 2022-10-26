import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { filter,pairwise, Observable, Subscription } from 'rxjs';
import { State as AppState } from './+state';
import * as StoreActions from './+state/actions';
import {AppStoreService} from "./app-store-service";
import {Router, RoutesRecognized} from "@angular/router";
import { environment } from '../../../intake/src/environments/environment';

@Component({
  selector: 'compass-ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'intake';
  allPACounties$!: Observable<any>;
  currentEnv: string = environment.currentEnv;
  langSel: any = "en";
  constructor(
    private appStoreService: AppStoreService,
    private appstore: Store<AppState>,
    private router: Router,
    public translate: TranslateService,

  ) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');
  }
  ngOnInit() {
    this.router.events
      .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        const previousModule =  events[0].urlAfterRedirects.split('/')[1];
        const currentModule =  events[1].urlAfterRedirects.split('/')[1];
        // if(currentModule !== previousModule){
        //  alert("are you sure you want to leave")
        // }
      });
    this.appStoreService.initData();

    //  this.appstore.dispatch(StoreActions.AppPageActions.getPACounties());
    //  this.appstore.dispatch(StoreActions.AppPageActions.getCitizenship());

  }
  switchLang(lang: string) {
    this.translate.use(lang);
    this.langSel = lang;
  }

}
