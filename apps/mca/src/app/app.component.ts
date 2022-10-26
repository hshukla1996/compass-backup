import {ChangeDetectorRef, Component, OnInit, SimpleChanges} from '@angular/core';
import { UiModule } from '@compass-ui/ui';
import {menuData} from './menu'
import {filter, pairwise} from "rxjs";
import {Router, RoutesRecognized} from "@angular/router";
import { Store } from "@ngrx/store";
import { environment } from '../environments/environment';
import { getAppStateData } from './+state/selectors/app-state.selector';
import { AppState, State } from './+state/app.state';

@Component({
  selector: 'compass-ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'mca';
  menuData = menuData
  showMenu = false;
  currentEnv: string = environment.currentEnv;
  state!:any
  constructor(private router: Router, private store: Store<AppState>,
     private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    const pathArray = window.location.pathname.split('/');
   // if (pathArray[0]) {
      this.showMenu = true;
   // } else {
    //  this.showMenu = false;
    //}
    this.store.select(getAppStateData).subscribe(d => {
      this.state = { ...d };
      this.cd.detectChanges();
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    this.router.events
      .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        // const previousModule =  events[0].urlAfterRedirects.split('/')[1];
        const currentModule = events[1].urlAfterRedirects.split('/')[1];
        if(currentModule) {
          this.showMenu = true;
        }
        else {
          this.showMenu = false;
        }
      });
  }

}
