import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MenuData } from '@compass-ui/data';

@Component({
    selector: "compass-ui-non-stepper-menu",
    templateUrl: "./non-stepper-menu.component.html",
    styleUrls: ["./non-stepper-menu.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NonStepperMenuComponent implements OnInit {
    @Input() menuData!: MenuData | null;
    @Input() basicDisable!: boolean
    menuCollapsed = false;
    activeItemId = 1;
    totalItems: number | undefined;
    constructor(private router: Router) {}
    ngOnInit() {
        if (screen.width < 576) {
            this.menuCollapsed = true;
        }
        const currentLink = this.menuData?.menuItems.filter((menuItem) => {
            return this.router.url.indexOf(menuItem.link) > -1;
        })[0];
        this.activeItemId = currentLink?.id || 1;
        this.totalItems = this.menuData?.menuItems.length;
    }

    ngOnChanges(changes: SimpleChanges) {
        // changes.prop contains the old and the new value...

        const currentLink = this.menuData?.menuItems.filter((menuItem) => {
            return this.router.url.indexOf(menuItem.link) > -1;
        })[0];

        this.activeItemId = currentLink?.id || 1;

        this.totalItems = this.menuData?.menuItems.length;
    }

    setStatus(activeId: number) {
        this.activeItemId = activeId;
    }
    toggleMenu() {
        this.menuCollapsed = !this.menuCollapsed;
    }
}
