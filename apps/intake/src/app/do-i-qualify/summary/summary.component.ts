import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Summary } from '../+state/do-i-qualify.models';
import { MenuItemState } from '../../shared/menu-item-state';

@Component({
  selector: 'compass-ui-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit, OnDestroy {
  @Input() data!: Summary | null;
  @Output() formState = new EventEmitter<MenuItemState>();

  ngOnInit(): void {
    this.formState.emit(MenuItemState.INPROGRESS);
  }

  ngOnDestroy(): void {
    this.formState.emit(MenuItemState.COMPLETED);
  }
}
