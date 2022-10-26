import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { RoutePath } from "../../../shared/route-strategies";
import { ApplyNowStoreService } from '../../apply-now-store-service';
import JsonData from "./expenses-heating-gatepost.json";

@Component({
    selector: "compass-ui-expenses-heating-gatepost",
    templateUrl: "./expenses-heating-gatepost.component.html",
    styleUrls: ["./expenses-heating-gatepost.component.scss"],
})
export class ExpensesHeatingGatepostComponent implements OnInit {
    jsonData: any;
    constructor(
        private cd: ChangeDetectorRef,
        private router: Router,
        private service: ApplyNowStoreService
    ) {}

    ngOnInit(): void {
        this.jsonData = JsonData;
        const houseHoldDetails = this.service.getHouseHoldDetails;
        setTimeout(() => {
            this.jsonData.questionAnswers.forEach((service: any, i: number) => {
                if (
                  houseHoldDetails.expenses?.heatingSituations
                  &&     houseHoldDetails.expenses?.heatingSituations?.checked?.indexOf(
                        service.value
                    ) > -1
                ) {
                    service.isYesChecked = true;
                } else if (
                  houseHoldDetails.expenses?.heatingSituations &&
                  houseHoldDetails.expenses?.heatingSituations?.unchecked?.indexOf(
                        service.value
                    ) > -1
                ) {
                    service.isNoChecked = true;
                }
            });
             this.jsonData.moreInfo =
                houseHoldDetails.expenses?.heatingSituations?.info;
            this.cd.detectChanges();
        }, 500);
    }

    checkName(check: any) {
        let charCode = check.keyCode;
        console.log("--",check)
        return ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)
            || charCode == 39 || charCode == 92 || charCode == 45);
    }

    showNextPage(selectedItems: any) {
        const storedHouseholdDetails = this.service.getHouseHoldDetails;
        const selectedPaths: any = {
            checked: [],
            unchecked: [],
            info:""
        };

        selectedItems.questionAnswers.forEach((item: any) => {
            if (item.isYesChecked) {
                selectedPaths.checked.push(item.value);
            } else if (item.isNoChecked) {
                selectedPaths.unchecked.push(item.value);
            }
        });
      selectedPaths.info = selectedItems.moreInfo;
        const updatedExpenses = {
            ...storedHouseholdDetails.expenses,
            heatingSituations: selectedPaths,
        };
        if (storedHouseholdDetails) {
            this.service.updateHouseHoldDetails({
                ...storedHouseholdDetails,
                ...{ expenses: updatedExpenses },
            });
        }

        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_EXPENSESMAILINGADDRESS,
        ]);
    }

    showPreviousPage() {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_EXPENSESHEATINGASSISTANCE,
        ]);
    }
}
