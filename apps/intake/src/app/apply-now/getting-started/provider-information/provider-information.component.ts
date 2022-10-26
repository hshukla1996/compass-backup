import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MenuItemState } from '../../../shared/menu-item-state';
@Component({
  selector: 'compass-ui-provider-information',
  templateUrl: './provider-information.component.html',
  styleUrls: ['./provider-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProviderInformationComponent implements OnInit {
  //@Output() formState = new EventEmitter<MenuItemState>();

  constructor() { }
   //show the ma and Non-MA card
   showCard: boolean = true;
   showMACard(){
     this.showCard = !this.showCard;
   }
 //hide the ma and Non-MA card
 hideMACard(){
     this.showCard = false;
 }

  ngOnInit(): void {
   // this.formState.emit(MenuItemState.INPROGRESS);
  }
  ngOnDestroy(): void {
    //this.formState.emit(MenuItemState.COMPLETED);
  }

}
