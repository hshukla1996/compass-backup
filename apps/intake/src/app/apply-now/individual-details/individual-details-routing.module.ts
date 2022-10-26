import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiModule } from '@compass-ui/ui';
import { RoutePath } from '../../shared/route-strategies';
import { IndividualDividerComponent } from './individual-divider/individual-divider.component';
import { BenefitsNotReceviedComponent } from './benefits-not-received/benefits-not-received.component';
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
import { HomelessnessComponent } from './homelessness/homelessness.component';
import { MigrantOrSeasonalFarmWorkerComponent } from './migrant-or-seasonal-farm-worker/migrant-or-seasonal-farm-worker.component';
import { IndividualsSummaryComponent } from './individuals-summary/individuals-summary.component';
import { IndividualsEndingComponent } from './individuals-ending/individuals-ending.component';
import { IndividualDetailsComponent } from './individual-details.component';

const routes: Routes = [
  {
    path: '', component: IndividualDividerComponent,
    // children: [
    //   { path: RoutePath.APPLYNOW_INDIVIDUALDETAILS_BENEFITSNOTRECEIVED, component: BenefitsNotReceviedComponent },
    //   { path: RoutePath.APPLYNOW_INDIVIDUALDETAILS_BENEFITSNOTRECEIVEDDETAILS, component: BenefitsNotReceviedDetailsComponent },
    //   { path: RoutePath.APPLYNOW_INDIVIDUALDETAILS_BENEFITSNOTRECEIVEDSUMMARY, component: BenefitsNotReceviedSummaryComponent },
    //   { path: RoutePath.APPLYNOW_INDIVIDUALDETAILS_PREGNANCYSCREEN, component: PregnancyScreenComponent },
    //   { path: RoutePath.APPLYNOW_INDIVIDUALDETAILS_PREGNANCYSUMMARYSCREEN, component: PregnancySummaryScreenComponent },
    //   { path: RoutePath.APPLYNOW_INDIVIDUALDETAILS_PREGNANCYDETAILSSCREEN, component: PregnancyDetailsScreenComponent },
    //   { path: RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALINCOMETAXRETURN, component: FederalIncomeTaxReturnComponent },
    //   { path: RoutePath.APPLYNOW_INDIVIDUALDETAILS_TAXDEPENDENTS, component: TaxDependentsComponent },
    //   { path: RoutePath.APPLYNOW_INDIVIDUALDETAILS_TAXDEPENDENTSDETAILS, component: TaxDependentsDetailsComponent },
    //   { path: RoutePath.APPLYNOW_INDIVIDUALDETAILS_TAXDEPENDENTSSUMMARY, component: TaxDependentsSummaryComponent },
    //   { path: RoutePath.APPLYNOW_INDIVIDUALDETAILS_DOMESTICVIOLENCE, component: DomesticViolenceComponent },
    //   { path: RoutePath.APPLYNOW_INDIVIDUALDETAILS_SNAPORTANFBENEFITS, component: SnapOrTanfBenefitsComponent },
    //   { path: RoutePath.APPLYNOW_INDIVIDUALDETAILS_SNAPORTANFBENEFITSDETAILS, component: SnapOrTanfBenefitsDetailsComponent },
    //   { path: RoutePath.APPLYNOW_INDIVIDUALDETAILS_SNAPORTANFBENEFITSSUMMARY, component: SnapOrTanfBenefitsSummaryComponent },
    //   { path: RoutePath.APPLYNOW_INDIVIDUALDETAILS_FAMILYPLANNINGSERVICES, component: FamilyPlanningServicesComponent },
    //   { path: RoutePath.APPLYNOW_INDIVIDUALDETAILS_HOMELESSNESS, component: HomelessnessComponent },
    //   { path: RoutePath.APPLYNOW_INDIVIDUALDETAILS_MIGRANTORSEASONALFARMWORKER, component: MigrantOrSeasonalFarmWorkerComponent },
    //   { path: RoutePath.APPLYNOW_INDIVIDUALDETAILS_INDIVIDUALSSUMMARY, component: IndividualsSummaryComponent },
    //   { path: RoutePath.APPLYNOW_INDIVIDUALDETAILS_INDIVIDUALSENDING, component: IndividualsEndingComponent }
    //]
  },

];

@NgModule({
  imports: [UiModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndividualDetailsRoutingModule { }
