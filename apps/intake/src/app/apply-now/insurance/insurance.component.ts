import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MenuItemState } from '../../shared/menu-item-state';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'compass-ui-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class InsuranceComponent implements OnInit {

  @Output() formState = new EventEmitter<MenuItemState>();

  ngOnInit(): void {
    //this.formState.emit(MenuItemState.INPROGRESS);
  }
  ngOnDestroy(): void {
    //this.formState.emit(MenuItemState.COMPLETED);
  }

}
