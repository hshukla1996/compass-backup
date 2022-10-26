import { RoutePath } from '../../shared/route-strategies';
import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MenuItemState } from '../../shared/menu-item-state';
@Component({
  selector: 'compass-ui-individual-details',
  templateUrl: './individual-details.component.html',
  styleUrls: ['./individual-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndividualDetailsComponent implements OnInit {
  constructor() {
    console.log('Hello');
  }

  route: string | undefined = RoutePath.APPLYNOW_INDIVIDUALDETAILS;
  routePath: typeof RoutePath = RoutePath;

  @Output() formState = new EventEmitter<MenuItemState>();
  ngOnInit(): void {
    this.formState.emit(MenuItemState.INPROGRESS);
  }
  ngOnDestroy(): void {
    //  this.formState.emit(MenuItemState.COMPLETED);
  }
}