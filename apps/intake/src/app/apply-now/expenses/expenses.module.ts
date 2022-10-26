import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

import { UiModule } from "@compass-ui/ui";
import { ExpensesComponent } from '../expenses/expenses.component';
import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpensesLegalFeeComponent } from './expenses-legal-fee/expenses-legal-fee.component';
import { ExpensesLegalFeeSummaryComponent } from './expenses-legal-fee-summary/expenses-legal-fee-summary.component';
import { ExpensesHeatingGatepostComponent } from './expenses-heating-gatepost/expenses-heating-gatepost.component';
import { ExpensesUtilityGatepostComponent } from './expenses-utility-gatepost/expenses-utility-gatepost.component';
import { ExpensesSummaryComponent } from './expenses-summary/expenses-summary.component';
// import { ExpensesPropertyTaxDetailsComponent } from './expenses-property-tax-details/expenses-property-tax-details.component';
import { PropertyInsuranceDetailsComponent } from './property-insurance-details/property-insurance-details.component';
import { SharedExpensesComponent } from './shared-expenses/shared-expenses.component';
import { SharedExpenseSummaryComponent } from './shared-expense-summary/shared-expense-summary.component';
//import { ExpensesSummaryComponent } from './expenses-summary/expenses-summary.component';
import { ExpensesEndingComponent } from './expenses-ending/expenses-ending.component';
import { ExpensesGatepostComponent } from './expenses-gatepost/expenses-gatepost.component';
import { ChildSupportExpensesComponent } from './child-support-expenses/child-support-expenses.component';
import { ChildSupExpDlsComponent } from './child-support-expenses-details/child-support-expenses-details.component';
import { ChildSupExpSumCmp } from './child-support-expenses-summary/child-support-expenses-summary.component';
import { AlimonyExpensesComponent } from './alimony-expenses/alimony-expenses.component';
import { AlmonyExpDlsComponent } from './alimony-expenses-details/alimony-expenses-details.component';
import { AlimonyExpSumCmp } from "./alimony-expenses-summary/alimony-expenses-summary.component";
import { ChildOrAdultCareExpensesComponent } from './child-or-adult-care-expenses/child-or-adult-care-expenses.component';
import { CldOradultExpDlsComponent } from './child-or-adult-care-expenses-details/child-or-adult-care-expenses-details.component';
import { CldOradultExpSumCmp } from './child-or-adult-care-expenses-summary/child-or-adult-care-expenses-summary.component';

import { WastewaterProviderComponent } from './wastewater-provider/wastewater-provider.component';
import { WastewaterAddressComponent } from './wastewater-address/wastewater-address.component';
import { WaterGatepostComponent } from './water-gatepost/water-gatepost.component';

import { TransportationExpensesComponent } from "./transportation-expenses/transportation-expenses.component";
import { TransportationExpDlsComponent } from "./transportation-expenses-details/transportation-expenses-details.component";
import { TransportationExpSumCmp } from './transportation-expenses-summary/transportation-expenses-summary.component';
import { MedicalExpensesComponent } from './medical-expenses/medical-expenses.component';
import { MedicalExpDlsComponent } from './medical-expenses-details/medical-expenses-details.component';
import { MedicalExpSumCmp } from './medical-expenses-summary/medical-expenses-summary.component';
import { TaxDeductibleExpensesComponent } from './tax-deductible-expenses/tax-deductible-expenses.component';
import { TaxDeductibleExpDlsComponent } from './tax-deductible-expenses-details/tax-deductible-expenses-details.component';
import { TaxDeductibleSumCmp } from './tax-deductible-expenses-summary/tax-deductible-expenses-summary.component';
import { ExpLegalFeeDlsComponent } from './expenses-legal-fee-details/expenses-legal-fee-details.component';
import { HousingAssistanceReceivedComponent } from './housing-assistance-received/housing-assistance-received.component';
import { ExpensesMedicalComponent } from './expenses-medical/expenses-medical.component';
@NgModule({
    declarations: [
        ExpensesComponent,
        ExpensesLegalFeeComponent,
        ExpLegalFeeDlsComponent,
        ExpensesLegalFeeSummaryComponent,
        ExpensesComponent,
        // ExpensesPropertyTaxDetailsComponent,
        PropertyInsuranceDetailsComponent,
        SharedExpensesComponent,
        SharedExpenseSummaryComponent,
        ExpensesSummaryComponent,
        ExpensesEndingComponent,
        ExpensesHeatingGatepostComponent,
        ExpensesUtilityGatepostComponent,
        ExpensesEndingComponent,
        ExpensesGatepostComponent,
        ChildSupportExpensesComponent,
        ChildSupExpSumCmp,
        AlimonyExpensesComponent,
        AlmonyExpDlsComponent,
        AlimonyExpSumCmp,
        ChildOrAdultCareExpensesComponent,
        CldOradultExpDlsComponent,
        CldOradultExpSumCmp,
        TransportationExpensesComponent,
        TransportationExpDlsComponent,
        TransportationExpSumCmp,
        MedicalExpensesComponent,
        MedicalExpDlsComponent,
        MedicalExpSumCmp,
        TaxDeductibleExpensesComponent,
        TaxDeductibleExpDlsComponent,
        TaxDeductibleSumCmp,
        HousingAssistanceReceivedComponent,
        SharedExpensesComponent,
        SharedExpenseSummaryComponent,
        WastewaterProviderComponent,
        WastewaterAddressComponent,
        WaterGatepostComponent,

        ExpensesMedicalComponent,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ExpensesRoutingModule,
        UiModule,
        TranslateModule,
    ],
})
export class ExpensesModule {}
