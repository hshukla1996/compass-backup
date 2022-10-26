import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IncomeComponent } from "../income/income.component";
import { IncomeGatepostComponent } from "../income/income-gatepost/income-gatepost.component";
import { IncomeRoutingModule } from "./income-routing.module";
import { UiModule } from "@compass-ui/ui";
import { IncomeFutureJob } from "./income-futurejob/income-futurejob.component";
import { IncomeJobDetailsComponent } from "./income-jobdetails/income-jobdetails.component";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IncomeJobMoreDetailsComponent } from "./income-jobmoredetails/income-jobmoredetails.component";
import { IncomeJobSummaryComponent } from "./income-jobsummary/income-jobsummary.component";
import { IncomePastJob } from "./income-pastjob/income-pastjob.component";
import { IncomePastJobDetailsComponent } from "./income-pastjobdetails/income-pastjobdetails.component";
import { OtherIncomeDetailsComponent } from "./other-income-details/other-income-details.component";
import { OtherIncomeSummaryComponent } from "./other-income-summary/other-income-summary.component";
import { OtherIncomeComponent } from "./other-income/other-income.component";
import { IncomePastJobMoreDetailsComponent } from "./income-pastjobmoredetails/income-pastjobmoredetails.component";
import { IncomePastJobSummaryComponent } from "./income-pastjobsummary/income-pastjobsummary.component";
import { IncomeendingComponent } from "./incomeending/incomeending.component";
import { IncomesummaryComponent } from "./incomesummary/incomesummary.component";
import { OtherIncomeAddressComponent } from "./other-income-address/other-income-address.component";
import { NoIncomeComponent } from "./no-income/no-income.component";
import { OtherIncomeEndmodalComponent } from "./other-income-endmodal/other-income-endmodal.component";
import { FinancialdisabilityIncomeComponent } from "./financialdisability-income/financialdisability-income.component";
import { IncomeJobEndModalComponent } from "./income-jobendmodal/income-jobendmodal.component";

@NgModule({
    declarations: [
        IncomeGatepostComponent,
        IncomeFutureJob,
        IncomeJobDetailsComponent,
        IncomeJobMoreDetailsComponent,
        IncomeJobSummaryComponent,
        IncomeJobEndModalComponent,
        IncomePastJob,
        IncomePastJobDetailsComponent,
        IncomePastJobMoreDetailsComponent,
        IncomePastJobSummaryComponent,
        OtherIncomeComponent,
        OtherIncomeDetailsComponent,
        OtherIncomeSummaryComponent,
        IncomeendingComponent,
        IncomesummaryComponent,
        OtherIncomeAddressComponent,
        NoIncomeComponent,
        OtherIncomeEndmodalComponent,
        FinancialdisabilityIncomeComponent,
    ],
    imports: [
        CommonModule,
        UiModule,
        IncomeRoutingModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class IncomeModule {}
