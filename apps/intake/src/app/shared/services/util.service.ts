import { Injectable } from '@angular/core';
import { MenuData, MenuItem } from '@compass-ui/data';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PageDirection } from '../../apply-now/individual-details/general-details/state/general-details-model';

import { MenuItemClass, MenuItemState } from '../menu-item-state';
import { RoutePath } from '../route-strategies';
import { AppStoreService } from "../../app-store-service";

@Injectable({ providedIn: "root" })
export class UtilService {
  seelctedUserIdInFederalTaxReturn: number[] =  [];
  maleInvRelationships: any;
  femaleInvRelationships: any;  
  constructor(private appService: AppStoreService,) {
  }
  getRouteName(path: string): string | undefined {
    return path.split("/").pop();
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

  reverseMapIterator(): any {
    const values = Array.from(this.keys());
    let index = values.length;
    return {
      next: function () {
        return {
          done: index === 0,

          value: values[--index],
        };
      },
    };
  }

  forwardMapIterator(): any {
    const values = Array.from(this.keys());
    let index = 0;
    return {
      next: function () {
        return {
          value: values[index++],
          done: index > values.length,
        };
      },
    };
  }

  keys(): Iterable<unknown> | ArrayLike<unknown> {
    throw new Error("Method not implemented.");
  }

  addCommonRoute(
    queueSet: any,
    routeArray: any,
    lastComponentPath: string
  ): any {
    let _intersection = [];
    for (let elem of queueSet) {
      if (routeArray.has(elem)) {
        _intersection.push(elem);
      }
    }
    if (lastComponentPath)
      _intersection.push(lastComponentPath);
    return _intersection;
  }

  isEmptyObject(obj: any) {
    return JSON.stringify(obj) === "{}";
  }

  isPreviousPage(obj: any) {
    return Object.keys(obj)[0].toString() !== obj.toString();
  }
  getLastUser(mapObj:any){
    let previousUser = "";
      for (var i in mapObj) {
          if (mapObj[i]) {
              previousUser = i;
          } else {
              break;
          }
      }
      return previousUser;
    }
  isNextPage(obj: any) {
    const entries = Object.entries(obj);

    for (const [key, value] of entries) {
      if (!value) {
        return true;
      }
    }
    return false;
  }

  isFirstRoute(obj: any) {
    const entries: any = Object.entries(obj);
    let firstRoute = true;
    for (const [key, value] of entries) {
      if (value) {
        firstRoute = false;
      }
    }
    return firstRoute;
  }

  isLastRoute(obj: any) {
    const entries = Object.entries(obj);
    let lastRoute = true;
    for (const [key, value] of entries) {
      if (!value) {
        lastRoute = false;
      }
    }
    return lastRoute;
  }

  getCurrentUserId(
    namesMap: any,
    direction: string,
  ) {
    const currentId$ = new BehaviorSubject<number>(0);
    const iterateMap =
      direction == PageDirection.BACK
        ? Object.keys(namesMap).reverse()
        : Object.keys(namesMap);
    if (iterateMap != null) {
      for (const key of iterateMap) {
        if (
          (namesMap[key] == false &&
            direction == PageDirection.NEXT) ||
          (namesMap[key] == true && direction == PageDirection.BACK)
        ) {
          currentId$.next(key as any);
          break;
        }
      }
    }
    return currentId$.asObservable();
  }

  getCurrentUserIdPageAction(
    namesMap: any,
    direction: string
  ) {
    const currentId$ = new BehaviorSubject<number>(0);

    const iterateMap =
      direction == PageDirection.BACK
        ? Object.keys(namesMap).reverse()
        : Object.keys(namesMap).sort();

    if (iterateMap != null) {
      for (const key of iterateMap) {
        if (
          (namesMap[key] == false &&
            direction == PageDirection.NEXT) ||
          (namesMap[key] == true && direction == PageDirection.BACK)
        ) {
          currentId$.next(key as any);

          break;
        }
      }
    }

    return currentId$.asObservable();
  }

  sortNames(selectedItems: any[], induviduals: any[], id: string) {
        return  selectedItems.sort()
  /*  const induvidualsArr = induviduals.map((individual: any) => {
      if (individual && individual.id) {
        return individual.id.toString();
      }
    })
    const selectedItems1 = selectedItems.map((item) => item.toString());
    const sortedNames = induvidualsArr.filter((ind) => {
      if (selectedItems1.indexOf(ind) > -1) {
        return true;
      }
      return false;
    })
    return sortedNames*/
  }
  loadInvRelationship() {

    this.appService.getMaleInvRelationships().subscribe((invRelations) => {
      this.maleInvRelationships = invRelations;

    })
    this.appService.getFemaleInvRelationships().subscribe((invRelations) => {
      this.femaleInvRelationships = invRelations;
      // this.cd.detectChanges();
    })




  }
  getInvReationshipWithCurrentMember(relations: any, currentMemberId: string) {
    let relationWithCurrentIndividual: any;

    relations?.forEach((indRel: any) => {
      if (Object.keys(indRel)[0].toString() === currentMemberId) {
        relationWithCurrentIndividual = Object.values(indRel)[0]
      }
    })
    return relationWithCurrentIndividual;
  }
  getInvRelationships(gender: string, relation: any) {
    let invRel;
    const g = gender.charAt(0).toUpperCase();
    this.loadInvRelationship();
    if (g == 'F') {
      invRel = this.femaleInvRelationships.filter((rel: any) => rel.id == relation);
    }
    else if (g == 'M') {
      invRel = this.maleInvRelationships.filter((rel: any) => rel.id == relation);
    }
    if (relation)
      return invRel[0].displayValue
    else return '';
  }
  getNumericPropertyValue(value:any){
    return (value == null || value == "" || value == undefined)?0:value;
  }
  getObjectPropertyValue(value:any){
    return (value == null || value == "" || value == undefined) ? null : value;
  }
  generateId(details: any) {

    const ids = details.map((person: any) => {
      return person.id;
    });


    const max = Math.max(...ids);
    return max + 1;
  }
  getMinId(details: any) {
    const ids = details.map((person: any) => {
      return person.id;
    });


    const min = Math.min(...ids);
    return min
  }
  getCurrentUserIdOnNoParams(paramsMap:any){
      let currentUserIndex:any;
      var conunt = 0;
      if (this.isFirstRoute(paramsMap)) {
          currentUserIndex = Object.keys(paramsMap)[0];
      } else if (this.isLastRoute(paramsMap)) {
          currentUserIndex =
              Object.keys(paramsMap)[Object.keys(paramsMap).length - 1];
            } else {
          Object.keys(paramsMap).forEach((pid) => {
              if (!paramsMap[pid] && conunt ==0) {
                  currentUserIndex = pid;
                  conunt++;
              }
          });
      }
      return currentUserIndex
  }
  getMinimumNumber(arr: number[]) {
    return Math.min(...arr);
  }
}
