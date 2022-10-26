import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MenuData, MenuItem } from '@compass-ui/data';
import { Store } from '@ngrx/store';
import { State } from 'apps/intake/src/app/+state/app.state';
import { ApplyNowStoreService } from 'apps/intake/src/app/apply-now/apply-now-store-service';
import { Observable } from 'rxjs';

@Component({
    selector: "compass-ui-menu",
    templateUrl: "./menu.component.html",
    styleUrls: ["./menu.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ApplyNowStoreService]
})
export class MenuComponent implements OnInit {
    @Input() menuData!: MenuData | null;
    @Input() basicDisable!: boolean
    @Input() fromDIQ=false as boolean
    menuCollapsed = false;
    activeItemId = 1;
    formID=""
    formID$= new Observable<string> ();


    totalItems: number | undefined;
    constructor(private router: Router, private store: Store<State>, private service: ApplyNowStoreService, private cd: ChangeDetectorRef,
    ) {
        }
    ngOnInit() {
        if (screen.width < 576) {
            this.menuCollapsed = true;
        } else {
            this.menuCollapsed = false;
        }
        
        const currentLink = this.menuData?.menuItems.filter((menuItem) => {
            return menuItem.class === 'active';
            // return this.router.url.indexOf(menuItem.link) > -1;
        })[0];
        this.activeItemId = currentLink?.id || 1;
        this.totalItems = this.menuData?.menuItems.length;
        this.getDIQStepId(currentLink);
        // this.formID = this.service.gettingStartedResponseID;
        this.service.gettingStarted$.subscribe(res => {
           
            this.formID = res;
            this.cd.detectChanges();
        })

    }

    ngOnChanges(changes: SimpleChanges) {
        // changes.prop contains the old and the new value...

        const currentLink = this.menuData?.menuItems.filter((menuItem) => {
            // return this.router.url.indexOf(menuItem.link) > -1;
            return menuItem.class === 'active';
        })[0];

        this.activeItemId = currentLink?.id || 1;

        this.totalItems = this.menuData?.menuItems.length;
        this.getDIQStepId(currentLink);
    }

    setStatus(activeId: number) {
        this.activeItemId = activeId;
    }
    getDIQStepId(currentLink:MenuItem|undefined)
    {
        if (this.fromDIQ) 
        {
            const completed = this.menuData?.menuItems.filter((menuItem) => {
                return menuItem.class.indexOf('completed') > -1;
                // return this.router.url.indexOf(menuItem.link) > -1;
            });
            this.activeItemId = (completed?.length == this.menuData?.menuItems.length) ? this.menuData?.menuItems.length || 1 : currentLink?.id || 1
        }
    }
    toggleMenu() {
        this.menuCollapsed = !this.menuCollapsed;
    }
}
