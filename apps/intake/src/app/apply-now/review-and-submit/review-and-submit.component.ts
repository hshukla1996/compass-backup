import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MenuItemState } from '../../shared/menu-item-state';
@Component({
  selector: 'compass-ui-review-and-submit',
  templateUrl: './review-and-submit.component.html',
  styleUrls: ['./review-and-submit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewAndSubmitComponent implements OnInit {
  @Output() formState = new EventEmitter<MenuItemState>();
  constructor() { }
  ngOnInit(): void {
   // this.formState.emit(MenuItemState.INPROGRESS);
  }
  ngOnDestroy(): void {
    this.formState.emit(MenuItemState.COMPLETED);
  }
}