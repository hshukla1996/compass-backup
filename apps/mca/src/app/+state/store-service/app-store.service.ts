import { ChangeDetectorRef, Injectable } from '@angular/core';
import { MenuData, MenuItem } from '@compass-ui/data';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MenuItemClass, MenuItemState } from '../../shared/menu-item-state';
import { RoutePath } from '../../shared/route-strategies';
import { AppState, State } from '../app.state';
import { getAppStateData } from '../selectors/app-state.selector';
import * as AppPageActions from "../actions/app.page-actions";
@Injectable({
  providedIn: 'root'
})
export class AppStoreService {

  routePath: typeof RoutePath = RoutePath;
  appState!: State;
  appState$!: Observable<State | null>;
  private cd!: ChangeDetectorRef



  constructor(
    private store: Store<AppState>,
    
  ) {
    this.appState$ = this.store.select(getAppStateData);
    this.store.select(getAppStateData).subscribe(d => {
      this.appState = { ...d };
      // this.cd.detectChanges();
    });
  }
  menuStateUpdated(sender: RoutePath, state: MenuItemState) {
    const menu = this.getUpdatedMenu(this.appState.menu as MenuData, sender, state);
    const updatedState = { ...this.appState, menu } as State;
    this.store.dispatch(AppPageActions.updateMenuState({ menuData: updatedState }))
  }
  getUpdatedMenu(
    menu: MenuData,
    item: RoutePath,
    state: MenuItemState
  ): MenuData {
    
    let itemToUpdate = menu.menuItems.find((i) => {
      if (i.link) {
        return i.link.toUpperCase() === item.toUpperCase();
      }
      return;
    }) as MenuItem;
    const remainingItems = menu.menuItems.filter((i) => {
      if (i.link) {
        return i.link.toUpperCase() !== item.toUpperCase();
      }
      return;
    });

    itemToUpdate = {
      ...itemToUpdate,
      status: state,
      class: this.getMenuItemClass(state),
    };
    const allItems = [{ ...itemToUpdate }, ...remainingItems].sort((a, b) =>
      a.id < b.id ? -1 : 1
    );

    return { ...menu, menuItems: allItems };
  }
  getMenuItemClass(status: MenuItemState): MenuItemClass {
    switch (status) {
      case MenuItemState.INPROGRESS:
        return MenuItemClass.INPROGRESS;
      case MenuItemState.COMPLETED:
        return MenuItemClass.COMPLETED;
      case MenuItemState.ERROR:
        return MenuItemClass.ERROR;
      default:
        return MenuItemClass.NOTSTARTED;
    }
  }

}
