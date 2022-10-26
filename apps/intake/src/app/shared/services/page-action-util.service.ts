import { Router } from '@angular/router';
import { Store } from '@ngrx/store';


import { State } from '../../+state/app.state';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Subject, Subscription } from 'rxjs';
import { DoIQualifyPageActions } from '../../do-i-qualify/+state/actions';
import { RoutePath } from '../route-strategies';
import { UtilService } from './util.service';
import { ScreenQueueUtil } from './screen_queue_util.service';
import { ApplyNowPageActions } from '../../apply-now/+state/actions';

@Injectable({ providedIn: 'root' })
export class PageActionUtil {
    currentMap!: {};
    otherPageActionObject!:{}
    direction!: {}

    subscription = new Subscription();
    action!: PageUpdateActions
    state!: any;
    module!: any;
    currentId = new BehaviorSubject<number>(0);
    currentUserIndex = 0
    currentMapPropertyName!: string
    currentPageDirectionPropertyName!: string
    constructor(private store: Store<State>,
        private utilService: UtilService,
        private router: Router, private queueService: ScreenQueueUtil) {
        this.module = this.router.url.split("/")[1];
        this.queueService.initStore().subscribe((data) => {
            this.state = data;

        });
    }

    getCurrentUserId(namesMap: any, direction: string, currentId$: Subject<number>) {

        const iterateMap =
            direction == PageActionDirection.BACK
                ? Object.keys(namesMap).reverse()
                : Object.keys(namesMap);
        if (iterateMap != null) {
            for (const key of iterateMap) {
                if (
                    (namesMap[key] == false &&
                        direction == PageActionDirection.NEXT) ||
                    (namesMap[key] == true && direction == PageActionDirection.BACK)
                ) {
                    currentId$.next(key as any);
                    break;
                }
            }
        }
        return currentId$.asObservable();
    }
    resetMap(obj: any | undefined) {
        if (!this.utilService.isEmptyObject(this.currentMap)) {
            const changedMap = { ...this.currentMap } as any;

            const entries = Object.entries(changedMap);
            for (const [key, value] of entries) {
                changedMap[key] = false
            }
            this.currentMap = { ...changedMap };
        }


    }
    emptyMap() {
        const ob = {}
        this.currentMap = { ...ob };

    }
    emptyOtherMap(mapName:string){
        const empty={}
        const obj = { ...this.otherPageActionObject } as any;
        let map = { ...obj[mapName] }
        map={...empty}
        obj[mapName] = { ...map };
        this.otherPageActionObject = { ...obj };
    }

    removeFromMap(key: string) {

        const map = { ...this.currentMap } as any
        if (!this.utilService.isEmptyObject(map)) {
            delete map[key]

        }
        this.currentMap = { ...map };
    }
    changeMapValue(key: any, value: any) {

        const map = { ...this.currentMap } as any
        map[key] = value
        this.currentMap = { ...map };
    }
    updatePageAction(direction: string,updateWithOther:boolean) {
        // const pageActionObject = {
        //     ...this.state.pageAction,
        // }
        const pageActionObject = (updateWithOther) ? { ...this.otherPageActionObject } : { ...this.state.pageAction}
        pageActionObject[this.currentMapPropertyName] = this.currentMap;
        pageActionObject[this.currentPageDirectionPropertyName] = direction;
        const updatepageAction = { ...this.state, pageAction: pageActionObject } as typeof this.state;
        this.action = this.getUpdateAction() as PageUpdateActions
        this.store.dispatch(this.action.pageUpdateAction.call(this, this.getObject(updatepageAction)))
    }
    nextUserId() {
        this.getMap(this.currentMapPropertyName);
        this.changeMapValue(this.currentUserIndex, true);
        const hasNextPage = this.utilService.isNextPage(this.currentMap);
        if (hasNextPage) {
            this.updatePageActionDetail(PageActionDirection.NEXT)
            this.init(PageActionDirection.NEXT);
            return this.currentUserIndex;
        }

        return -1;

    }
    nextGuardianId(){
        this.getMap(this.currentMapPropertyName);
        this.changeMapValue(this.currentUserIndex, true);
        const hasNextPage = this.utilService.isNextPage(this.currentMap);
        this.updatePageActionDetail(PageActionDirection.NEXT)
        if (hasNextPage) {
           
            this.init(PageActionDirection.NEXT);
            return this.currentUserIndex;
        }

        return -1;

    }
    backUserId() {
        this.getMap(this.currentMapPropertyName);
        this.changeMapValue(this.currentUserIndex, false);
        //if (this.currentUserIndex > 0) {
        if (!this.isFirstRoute(this.currentMap, this.currentUserIndex - 1)) {

            this.updatePageActionDetail(PageActionDirection.BACK)
            this.init(PageActionDirection.BACK);
            return this.currentUserIndex;
        }
        return -1;
    }

    init(direction: string) {

        this.iterateMap(direction);
    }
    getUpdateAction() {
        switch (this.module) {
            case RoutePath.DOIQUALIFY:
                return { pageUpdateAction: DoIQualifyPageActions.updatePageAction }
            case RoutePath.APPLYNOW:
                return { pageUpdateAction: ApplyNowPageActions.updatePageAction }

               
        }
        return null;
    }

    getObject(updatedObj: any) {
        switch (this.module) {
            case RoutePath.DOIQUALIFY:
                return { doIQualify: updatedObj }
            case RoutePath.APPLYNOW:
                return { applyNow: updatedObj }
        }
        return "";
    }


    getCurrentMap(currentMapPropertyName: any) {
        const obj = { ...this.state.pageAction };
        const currentMap = { ...obj[currentMapPropertyName] ?? {} } as any;
        return currentMap;
    }
    updatePageActionDetail(direction: string,updateWithOther=false) {
        this.updatePageAction(direction, updateWithOther);
    }
    
    initPageMap(mapPropertyName: string, directionPropertyName: string, isGateWay: boolean) {
        this.getMap(mapPropertyName);
        this.currentMapPropertyName = mapPropertyName;
        this.currentPageDirectionPropertyName = directionPropertyName;
        const direction = this.getPageAction()[directionPropertyName];
        if (!isGateWay) {
            this.iterateMap(direction);
        }
    }

    iterateMap(direction: any) {
        this.getCurrentUserId(this.currentMap, direction, this.currentId).subscribe((d) => {
            this.currentUserIndex = d;
        })
    }




    getPageAction() {
        const pageActionObj = { ...this.state.pageAction };
        return pageActionObj;
    }
    getMap(mapPropertyName: string) {
        const pageActionObj = { ...this.state.pageAction };
        this.currentMap = pageActionObj[mapPropertyName] ?? {};
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
    get userIndex() {
        return this.currentUserIndex
    }

    isFirstRoute(obj: any, _key: any) {

       // return (_key in obj) ? false : true;
        return _key<this.getMinId(obj)?true:false;
    }
    getDirection(directionPropertyName:string){
        const direction = this.getPageAction()[directionPropertyName];
        return direction;
    }
    getMinId(obj:any){
        const keys = Object.keys(obj).map(key => parseInt(key))
        const minId = this.utilService.getMinimumNumber(keys);
        return minId;
    }
    initOtherMap(mapNames:any,direction:String){
        //[{mapName:"",directionName:""}]
        let pageActionObject = {
            ...this.state.pageAction,
        }
       
        mapNames.forEach((ele:any)=>{
            const _mapName=ele.mapName;
            const _direction=ele.directionName;
           pageActionObject[_mapName] ={};
           pageActionObject[_direction]=direction;
        })
        this.otherPageActionObject={...pageActionObject}
        
    }
    changeOtherMapValue(mapName:string,key:any,value:any)
    {
        
        const obj = { ...this.otherPageActionObject } as any;
        let map={...obj[mapName]}
        map[key] = value
        obj[mapName]={...map};
        this.otherPageActionObject={...obj};
    }
    updateOtherMap(){
        const updatepageAction = { ...this.state, pageAction: this.otherPageActionObject } as typeof this.state;
        this.action = this.getUpdateAction() as PageUpdateActions
        this.store.dispatch(this.action.pageUpdateAction.call(this, this.getObject(updatepageAction)))
    }

}

export enum PageActionDirection {
    BACK = "BACK",
    NEXT = "NEXT"
}

interface PageUpdateActions {
    pageUpdateAction: any;

}
