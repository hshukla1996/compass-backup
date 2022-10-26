import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { AppStoreService } from '../../app-store-service';
import { MenuItemState } from '../../shared/menu-item-state';
import { RoutePath } from '../../shared/route-strategies';
import { DoIQualifyStoreService } from '../do-i-qualify-store-service';

@Component({
    selector: "compass-ui-getting-started",
    templateUrl: "./getting-started.component.html",
    styleUrls: ["./getting-started.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class GettingStartedComponent implements OnInit, OnDestroy {
    yesnoValues!:any[]
    APIREQUEST_YES!:any;
    APIREQUEST_NO:any
    maleRelationship!:any[]
    femaleRelationship!:any[]
    constructor(
        private storeService: DoIQualifyStoreService,
        private route: Router, private cd: ChangeDetectorRef,
        private appService: AppStoreService,
        private service: DoIQualifyStoreService

    ) {}

    ngOnInit(): void {
        this.storeService.formStateUpdated(
            RoutePath.DOIQUALIFY_GETTINGSTARTED,
            MenuItemState.INPROGRESS
        );
        this.appService.getYesNoValues().subscribe(c => {
            this.yesnoValues = c;
            this.setYesNoValues();
         
        });
      this.appService.getMaleRelationships().subscribe((c:any) => {
       this.maleRelationship=c;
      });
      this.appService.getFemaleRelationships().subscribe((c: any) => {
        this.femaleRelationship = c;
      });

    }

    ngOnDestroy(): void {
        this.storeService.formStateUpdated(
            RoutePath.DOIQUALIFY_GETTINGSTARTED,
            MenuItemState.COMPLETED
        );
    }

    next(): void {
        this.service.updateYesNoValue({YesValue:this.APIREQUEST_YES,NoValue:this.APIREQUEST_NO})
        this.service.storeMaleFemaleRelationship({male:this.maleRelationship,female:this.femaleRelationship})
        this.route.navigate([
            RoutePath.DOIQUALIFY + "/" + RoutePath.DOIQUALIFY_BASICDETAILS,
        ]);
    }
    back(){
        this.route.navigate([
            RoutePath.HOME,
        ]);
    }
     setYesNoValues(){
  
    this.yesnoValues.forEach((values) => {
      const type = typeof values.id;
      const value = values.id;

      if (type === 'number') 
      {
        this.setNumericValueForYesAndNoValues(value);
      }
      if (type === 'string') {
        const isNaN = parseInt(value);
        if (isNaN !== NaN) {
          this.setStringValueForYesAndNoValues(value)
        }
        else{
          this.setNumericValueForYesAndNoValues(value);
        }
      }
    })
  }
  setStringValueForYesAndNoValues(value:string){
    switch (value.charAt(0)) {
      case 'Y':
        this.APIREQUEST_YES = value;
        break;
      case 'N':
        this.APIREQUEST_NO = value;

    }
  }
  setNumericValueForYesAndNoValues(value:number){
    switch (value) {
      case 1:
        this.APIREQUEST_YES = value;
        break;
      case 2:
        this.APIREQUEST_NO = value;
        break;
    }
  }
}
