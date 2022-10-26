import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndividualDetailsRoutingModule } from './individual-details-routing.module';
import { IndividualDetailsComponent } from './individual-details.component';
import { BenefitsNotReceviedComponent } from './benefits-not-received/benefits-not-received.component';
import { IndividualDividerComponent } from './individual-divider/individual-divider.component';
import { BenefitsNotReceviedDetailsComponent } from './benefits-not-received-details/benefits-not-received-details.component';
import { BenefitsNotReceviedSummaryComponent } from './benefits-not-received-summary/benefits-not-received-summary.component';
import { PregnancyScreenComponent } from './pregnancy-screen/pregnancy-screen.component';
import { PregnancySummaryScreenComponent } from './pregnancy-summary-screen/pregnancy-details-screen.component';
import { PregnancyDetailsScreenComponent } from './pregnancy-details-screen/pregnancy-summary-screen.component';
import { FederalIncomeTaxReturnComponent } from './federal-income-tax-return/federal-income-tax-return.component';
import { TaxDependentsComponent } from './tax-dependents/tax-dependents.component';
import { TaxDependentsDetailsComponent } from './tax-dependents-details/tax-dependents-details.component';
import { TaxDependentsSummaryComponent } from './tax-dependents-summary/tax-dependents-summary.component';
import { DomesticViolenceComponent } from './domestic-violence/domestic-violence.component';
import { SnapOrTanfBenefitsComponent } from './snap-or-tanf-benefits/snap-or-tanf-benefits.component';
import { SnapOrTanfBenefitsDetailsComponent } from './snap-or-tanf-benefits-details/snap-or-tanf-benefits-details.component';
import { SnapOrTanfBenefitsSummaryComponent } from './snap-or-tanf-benefits-summary/snap-or-tanf-benefits-summary.component';
import { FamilyPlanningServicesComponent } from './family-planning-services/family-planning-services.component';
import { MigrantOrSeasonalFarmWorkerComponent } from './migrant-or-seasonal-farm-worker/migrant-or-seasonal-farm-worker.component';
import { IndividualsSummaryComponent } from './individuals-summary/individuals-summary.component';
import { IndividualsEndingComponent } from './individuals-ending/individuals-ending.component';
import { SupplementalSecurityDisabilityComponent } from './supplemental-security-disability/supplemental-security-disability.component';
import { SupplementalSecurityIncomeDetailsComponent } from './supplemental-security-income-details/supplemental-security-income-details.component';
import { SupplementalSecurityIncomeComponent } from './supplemental-security-income/supplemental-security-income.component';
import { FamilyPlanningServiceSummaryComponent } from './family-planning-service-summary/family-planning-service-summary.component';
import { SsiSummaryComponent } from './ssi-summary/ssi-summary.component';
import { EntryScreenQueueUtil } from './individuals-entry-gatepost';



@NgModule({
    declarations: [
        // BenefitsNotReceviedComponent,
        // IndividualDividerComponent,
        // BenefitsNotReceviedDetailsComponent,
        // BenefitsNotReceviedSummaryComponent,
        // PregnancyScreenComponent,
        // PregnancySummaryScreenComponent,
        // PregnancyDetailsScreenComponent,
        // FederalIncomeTaxReturnComponent,
        // TaxDependentsComponent,
        // TaxDependentsDetailsComponent,
        // DomesticViolenceComponent,
        // SnapOrTanfBenefitsComponent,
        // SnapOrTanfBenefitsDetailsComponent,
        // SnapOrTanfBenefitsSummaryComponent,
        // FamilyPlanningServicesComponent,
        // HomelessnessComponent,
        // MigrantOrSeasonalFarmWorkerComponent,
        // IndividualsSummaryComponent,
        // IndividualsEndingComponent
        // SupplementalSecurityDisabilityComponent,
        //   SupplementalSecurityIncomeDetailsComponent,
        //   SupplementalSecurityIncomeComponent
        // FamilyPlanningServiceSummaryComponent,
        //   SsiSummaryComponent
    ],
    imports: [
        CommonModule,
        // IndividualDetailsRoutingModule
    ],
    providers: [EntryScreenQueueUtil],
})
export class IndividualDetailsModule {}
