import { Component } from '@angular/core';
import { RoutePath } from '../shared/route-strategies';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'compass-ui-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  applynowPath = RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_GETTINGSTARTED;
  getstarted = RoutePath.GETSTARTED;

  constructor(
    private route: ActivatedRoute
  ) { }

}
