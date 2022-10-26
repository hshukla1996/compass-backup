import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { getApplyNow } from '../../apply-now/+state/apply-now.selectors';
import { getDoIQualify } from '../../do-i-qualify/+state/do-i-qualify.selectors';
import { getReferrals } from '../../referrals/+state/referrals.selectors';
import { IConfigPageQueue, PageQueueState } from '../model/page-queue-state.model';
import { RoutePath } from '../route-strategies';

import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class PageQueueService {

  constructor(
    private utilService: UtilService,
    private router: Router, private store: Store<PageQueueState>,) { 
      this.initStore().subscribe((data) => {
        this.state = data;
      });
    }
  private module!: string
  private state!: any
  private queueConfig!: IConfigPageQueue
  private currentQueueName!: string
  private selectedValues!: string[]
  private currentAction!: any
  private initStore(): Observable<any> {
    this.module = this.router.url.split("/")[1];
    switch (this.module.toUpperCase()) {
      
      case RoutePath.APPLYNOW.toUpperCase():
        return this.store.select(getApplyNow);
      case RoutePath.DOIQUALIFY.toUpperCase():
        return this.store.select(getDoIQualify);
      case RoutePath.REFERRALS.toUpperCase():
        return this.store.select(getReferrals);
   
    }

    return of([]);
  }
  intiPageQueueState(){
    this.initStore().subscribe((data) => {
      this.state = data;
    });
  }
  configGatePostQueue(qcg: IConfigPageQueue) {
    
    this.queueConfig = qcg;
    this.intiPageQueueState();

    const routeArray = this.composePath(qcg.selectedPath, qcg?.getPathNameFunction)
    this.currentQueueName = this.queueConfig.pageQueueName
    const dynamicRoutes = this.utilService.addCommonRoute(
      new Set(qcg.defaultPath),
      new Set(routeArray),
      qcg?.lastPath??''
    );
    this.updatePageQueue(dynamicRoutes, 0);
  }
  configQueue(qcg: IConfigPageQueue){
    this.queueConfig = qcg;
    this.currentQueueName = this.queueConfig.pageQueueName
  }
  setCurrentQueue(queueName:string){

  }
  private updatePageQueue(paths: string[], pageQueueId: number) {
    debugger
    let pageQueueData = this.state.pageQueueData;

    const updated = {
      ...this.state,
      pageQueueData: { ...this.getPageQueueData(paths, pageQueueId) }
      //pageQueueData: (pageQueueData == null) ? { ...this.getPageQueueData(paths, pageQueueId) } : { ...pageQueueData, ...this.getPageQueueData(paths, pageQueueId)}
    }
    this.store.dispatch(this.queueConfig.actionName.call(this, this.getObject(updated)))
    //}




  }
  private getPageQueueData(paths: string[], pageQueueId: number) {
    let pageQueueData = {} as any;
    pageQueueData[this.currentQueueName] = {}

    let pageQueue = {} as any;
    pageQueue['pageMap'] = paths;
    pageQueue['currentPageId'] = pageQueueId;
    pageQueueData[this.currentQueueName]['pageQueue'] = { ...pageQueue };
    return pageQueueData;
  }
  private getObject(obj: any) {
    let returnObj = {} as any
    const name = this.queueConfig.reducerObjectType as any;
    returnObj[name] = obj;
    return returnObj;
  }

  
  private composePath(arr: any, fn: Function) {
    let routeArry = [] as string[];
    this.selectedValues = arr;
    arr.forEach((path: any) => {
      if (path != "") {
        routeArry = routeArry.concat(fn.call(this, path));
      }
    });
    return routeArry;
  }
  updatePageQueueId(pageId: any) {

    const pageQueueData = this.state.pageQueueData;
    if (pageQueueData != null) {
      const pageQueue = pageQueueData[this.currentQueueName];
      if (pageQueue != null && pageQueue.pageQueue !== null) {
        const _pageId = (pageQueue?.pageQueue?.currentPageId ?? 0) + pageId
        const updatedPageQueue = {
          pageQueue: { ...pageQueue.pageQueue, currentPageId: _pageId }

        }
        let _pageQueueData = { ...pageQueueData } as any;

        _pageQueueData[this.currentQueueName] = { ...updatedPageQueue };
        let updated = {
          ...this.state,
          pageQueueData: _pageQueueData
        }
        this.store.dispatch(this.queueConfig.actionName.call(this, this.getObject(updated)))

      }
    }


  }
  setPageQueueId(pageId:any){
    const pageQueueData = this.state.pageQueueData;
    if (pageQueueData != null) {
      const pageQueue = pageQueueData[this.currentQueueName];
      if (pageQueue != null && pageQueue.pageQueue !== null) {
        const _pageId =  pageId
        const updatedPageQueue = {
          pageQueue: { ...pageQueue.pageQueue, currentPageId: _pageId }

        }
        let _pageQueueData = { ...pageQueueData } as any;

        _pageQueueData[this.currentQueueName] = { ...updatedPageQueue };
        let updated = {
          ...this.state,
          pageQueueData: _pageQueueData
        }
        this.store.dispatch(this.queueConfig.actionName.call(this, this.getObject(updated)))

      }
    }
  }
  gotoFirstPageFromSummary(option:any=null){
    this.setPageQueueId((option==null)?1:option);
    this.navigateToPath();

  }
  private backPath() {
    this.updatePageQueueId(-1);
    this.navigateToPath();
  }
  private nextPath() {
    this.updatePageQueueId(1);
    this.navigateToPath();
  }
  private getCurrentPageQueueId() {
    const pageQueueData = this.state.pageQueueData;
    if (pageQueueData != undefined && pageQueueData !== null) {
      const pageQueue = pageQueueData[this.currentQueueName];
      if (pageQueue !== null && pageQueue.pageQueue !== null) {
        return pageQueue.pageQueue.currentPageId;
      }
    }
    return -1;
  }
  back() {
    if (this.getCurrentPageQueueId() <=0) {
      if(this.getCurrentPageQueueId()==0)this.updatePageQueueId(-1);
      this.navigateToGatewayPath();
      return;
    }
    this.backPath();
  }
  next() {
    this.nextPath();
  }
  gotoFirstPage() {
    const path = this.gotoPage(0)
    this.navigateToGivenPath(path);
    // this.navigateToPath()
  }

  goLastPage() {
    debugger
    const path = this.gotoPage(0, true)
    this.navigateToGivenPath(path);
  }
  private navigateToPath() {
    const path = this.getCurrentPage();
    this.router.navigate([this.queueConfig.currentModule + "/" + path]);
    return path;
  }
  private navigateToGivenPath(path: string) {

    this.router.navigate([this.queueConfig.currentModule + "/" + path]);
    return;
  }
  private navigateToGatewayPath() {
    this.router.navigate([this.queueConfig.currentModule + "/" +this.queueConfig.gateWaypathName]);
  }

  private getCurrentPage() {
    const pageQueueData = this.state.pageQueueData;
    if (pageQueueData != null) {
      const pageQueue = pageQueueData[this.currentQueueName]
      if (pageQueue != undefined && pageQueue !== null && pageQueue.pageQueue !== null) {
        const map = pageQueue.pageQueue.pageMap;
        const id = pageQueue.pageQueue.currentPageId as number;
        if (map != null && id !== null) {
          return Array.from(map)[id];
        }
      }
    }

    return '';
  }

  private gotoPage(id: number = 0, isGoToLast: boolean = false) {
    const pageQueueData = this.state.pageQueueData;
    if (pageQueueData != null) {
      const pageQueue = pageQueueData[this.currentQueueName]
      if (pageQueue != undefined && pageQueue !== null && pageQueue.pageQueue !== null) {
        const map = pageQueue.pageQueue.pageMap as string[];
        if (id < 0 || id >= map.length) id = 0;
        if (isGoToLast) id = map.length - 1;
        if (map != null && id !== null) {
          return Array.from(map)[id];
        }
      }
    }

    return '';
  }
 
}
