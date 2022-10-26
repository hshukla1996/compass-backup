import {
    ChangeDetectionStrategy,
    ChangeDetectorRef, Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
} from "@angular/core";
import { MenuItemState } from '../../../shared/menu-item-state';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { RoutePath } from '../../../shared/route-strategies';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplyNowIndividualDetailsStrategy } from '../../../shared/route-strategies/apply-now/individual-details';
import { IApplyNowState } from '../../+state/apply-now.models';
import { IHouseHold } from '../../household/household-model';
import { PageDirection } from "../../../referrals/+state/referrals.models";
import {EntryScreenQueueUtil} from "../individuals-entry-gatepost";

@Component({
    selector: "compass-ui-individual-divider",
    templateUrl: "./individual-divider.component.html",
    styleUrls: ["./individual-divider.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ApplyNowIndividualDetailsStrategy],
})
export class IndividualDividerComponent implements OnInit {
    @Output() formState = new EventEmitter<MenuItemState>();

    routePath: typeof RoutePath = RoutePath;
    individualForm: FormGroup | any;
    applyNowState!: IApplyNowState;
    personsMap: any[] = [];
    householdHead!: IHouseHold;
    householdPersons!: IHouseHold[];

    constructor(
        private service: ApplyNowStoreService,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private router: Router,
        private routingStratagy: ApplyNowIndividualDetailsStrategy,
        private queueService:EntryScreenQueueUtil
    ) {}

    ngOnInit(): void {
        this.individualForm = this.fb.group({});
        this.formState.emit(MenuItemState.INPROGRESS);
        this.formState.emit(MenuItemState.INPROGRESS);
        this.service.formStateUpdated(
            this.routePath.APPLYNOW_INDIVIDUALDETAILS,
            MenuItemState.INPROGRESS
        );
        this.service.getAppData().subscribe((d) => {
            this.applyNowState = { ...d };
            this.householdPersons =
                this.applyNowState.houseHoldDetails?.houseHoldPersons || [];

            this.cd.detectChanges();
        });
    }

    ngOnDestroy(): void {}
    previous() {
        this.router.navigate([this.routingStratagy.previousRoute()]);
    }
    onSubmit() {
        //this.generalDetailsForm.markAllAsTouched();
        // Custom logic here
        this.householdPersons?.forEach((ind) => {
            if (ind && ind.id) {
                this.personsMap[ind.id] = false;
            }
        });
        const updatedPageAction = {
            ...this.applyNowState.houseHoldDetails.pageAction,
            personsMap: {
                ...this.applyNowState.houseHoldDetails.pageAction?.personsMap,
                ...this.personsMap,
            },

            personDirection: PageDirection.NEXT,
        };
        this.service.updateHouseHoldDetails({
            ...this.applyNowState.houseHoldDetails,
            ...{ pageAction: updatedPageAction },
        });
      this.queueService.initDynamicRoutes(this.householdPersons[0],
        RoutePath.APPLYNOW_INDIVIDUALDETAILS +
        "/" +
        RoutePath.APPLYNOW_DEMOGRAPHIC_SUMMARY,
      );
      this.queueService.navigateToPath();
     //   this.router.navigate([this.routingStratagy.nextRoute()]);
    }
}
