import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
} from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RoutePath } from "../../shared/route-strategies";
import { MenuItemState } from "../../shared/menu-item-state";
import { ApplyNowStoreService } from "../apply-now-store-service";
import { Store } from "@ngrx/store";
import { State } from "../../+state/app.state";
import { ApplyNowPageActions } from "../+state/actions";
import { filter, Subscription } from 'rxjs';
import { UtilService } from "../../shared/services/util.service";
import { Programs } from "../+state/apply-now.models";
import { INDIVIDUAL_PROGRAMS } from "../../shared/constants/Individual_Programs_Constants";
import { IApplyNowState } from "../+state/apply-now.models";
import { ApplyNowService } from "../../shared/services/apply-now.service";

@Component({
    selector: "compass-ui-expenses",
    templateUrl: "./expenses.component.html",
    styleUrls: ["./expenses.component.scss"],
})
export class ExpensesComponent implements OnInit {
    routingStratagy: any;
    routePath: typeof RoutePath = RoutePath;
    route: string | undefined = RoutePath.APPLYNOW_EXPENSES;
    subscription = new Subscription();
    applyNowState!: IApplyNowState;
    serviceData!: any;

    @Output() formState = new EventEmitter<MenuItemState>();
    constructor(
        private store: Store<State>,
        private router: Router,
        private utilService: UtilService,
        private service: ApplyNowStoreService,
        private applyNowService: ApplyNowService
    ) {}

    ngOnInit() {
        this.formState.emit(MenuItemState.INPROGRESS);
        this.service.formStateUpdated(
            this.routePath.APPLYNOW_EXPENSES,
            MenuItemState.INPROGRESS
        );
        this.service.getAppData().subscribe((d) => {
            this.applyNowState = { ...d };
            this.serviceData = this.applyNowState.gettingStartedResponse;
        });
      //  this.store.dispatch(ApplyNowPageActions.loadApplyNow());

        this.subscription.add(
            this.router.events
                .pipe(filter((event) => event instanceof NavigationEnd))
                .subscribe(
                    (e: any) =>
                        (this.route = this.utilService.getRouteName(e.url))
                )
        );
    }

    save() {
        console.log("this.serviceData");
        const serviceData = { ...this.serviceData };
        console.log(this.serviceData);
        console.log(this.service.getHouseHoldDetails);

        serviceData.household = this.service.getHouseholdContracts();
        console.log(serviceData.household);

        serviceData.people = {
            individuals: this.service.getHouseHoldDetails.houseHoldPersons,
            absentRelatives: this.service.getHouseHoldDetails.absentRelative,
        };
        // serviceData.people.individuals = this.householdData.houseHoldPersons;
        //
        //this.queueService.next()
        console.log("servicesdata");
        console.log(serviceData);
        this.applyNowService
            .postSaveApplyNow(serviceData)
            .subscribe((data: any) => {
                if (data) {
                    console.log(data);
                    this.router.navigateByUrl("http://compass-dev.dhs.pa.gov/mca/");
                }
            });
    }

    previousRoute(): void {
        // Custom logic here
        this.router.navigate([
            RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_INCOME,
        ]);
    }

    onSubmit() {
        const benefits = this.service.getBenefits();
        const isProgramExist = this.service.isProgramExist(
            benefits as string[],
            INDIVIDUAL_PROGRAMS.LH
        );

        const isProgramExistforWater = this.service.isProgramExist(
            benefits as string[],
            INDIVIDUAL_PROGRAMS.LW
        );
        if (isProgramExist) {
            this.router.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_EXPENSES +
                    "/" +
                    RoutePath.APPLYNOW_EXPENSESENROLLMENT,
            ]);
        } else if (isProgramExistforWater) {
            this.router.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_EXPENSES +
                    "/" +
                    RoutePath.APPLYNOW_EXPENSESWATERASSISTANCEAPPLICATION,
            ]);
        } else {
            this.router.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_EXPENSES +
                    "/" +
                    RoutePath.APPLYNOW_EXPENSES_GATEPOST,
            ]);
        }
    }
}
