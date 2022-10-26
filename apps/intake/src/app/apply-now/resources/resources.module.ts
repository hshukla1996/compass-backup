import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { UiModule } from '@compass-ui/ui';
import { ResourcesComponent } from '../resources/resources.component';
import { ResourcesRoutingModule } from './resources-routing.module';
import { ResourcesDividerComponent } from './resources-divider/resources-divider.component';
import { ResourcesGatepostComponent } from './resources-gatepost/resources-gatepost.component';
import { FinancialHoldingsComponent } from './financial-holdings/financial-holdings.component';
import { ResourcesDetailsComponent } from './resources-details/resources-details.component';
import { FinancialHoldingsSummaryComponent } from './financial-holdings-summary/financial-holdings-summary.component';
import { ResidentialPropertyComponent } from './residential-property/residential-property.component';
import { ResidentialPropertyDetailsComponent } from './residential-property-details/residential-property-details.component';
import { ResidentialPropertySummaryComponent } from './residential-property-summary/residential-property-summary.component';
import { NonResidentialPropertyComponent } from './non-residential-property/non-residential-property.component';
import { NonResidentialPropertyDetailsComponent } from './non-residential-property-details/non-residential-property-details.component';
import { NonResidentialPropertySummaryComponent } from './non-residential-property-summary/non-residential-property-summary.component';
import { ExpectedMoneyStructureComponent } from './expected-money-structure/expected-money-structure.component';
import { ExpectedMoneyStructureSummaryComponent } from './expected-money-structure-summary/expected-money-structure-summary.component';
import { ResourcesVehiclesComponent } from './resources-vehicles/resources-vehicles.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { VehicleSummaryComponent } from './vehicle-summary/vehicle-summary.component';
import { BurialSpacesComponent } from './burial-spaces/burial-spaces.component';
import { BurialSpaceDetailsComponent } from './burial-space-details/burial-space-details.component';
import { BurialSpacesSummaryComponent } from './burial-spaces-summary/burial-spaces-summary.component';
import { BurialOrTrustAgreementComponent } from './burial-or-trust-agreement/burial-or-trust-agreement.component';
import { BurialOrTrustAgreementDetailsComponent } from './burial-or-trust-agreement-details/burial-or-trust-agreement-details.component';
import { BurialOrTrustAgreementSummaryComponent } from './burial-or-trust-agreement-summary/burial-or-trust-agreement-summary.component';
import { ClosedOrEmptiedAccountDetailsComponent } from './closed-or-emptied-account-details/closed-or-emptied-account-details.component';
import { ClosedOrEmptiedAccountSummaryComponent } from './closed-or-emptied-account-summary/closed-or-emptied-account-summary.component';
import { SoldOrTransferredResourceDetailsComponent } from './sold-or-transferred-resource-details/sold-or-transferred-resource-details.component';
import { SoldOrTransferredResourceSummaryComponent } from './sold-or-transferred-resource-summary/sold-or-transferred-resource-summary.component';
import { LifeInsurancePoliciesComponent } from './life-insurance-policies/life-insurance-policies.component';
import { LifeInsurancePolicyDetailsComponent } from './life-insurance-policy-details/life-insurance-policy-details.component';
import { CoveredIndividualsComponent } from './covered-individuals/covered-individuals.component';
import { LifeInsurancePoliciesSummaryComponent } from './life-insurance-policies-summary/life-insurance-policies-summary.component';
import { ResourcesSummaryComponent } from './resources-summary/resources-summary.component';
import { ResourcesEndingComponent } from './resources-ending/resources-ending.component';
import { ResidentialPropertyDetailsCalloutComponent } from './residential-property-details-callout/residential-property-details-callout.component';
import { BurialOrTrustAgreementAdditionalDetailsComponent } from './burial-or-trust-agreement-additional-details/burial-or-trust-agreement-additional-details.component';
import { FinancialHoldingsDetailsComponent } from './financial-holdings-details/financial-holdings-details.component';
import { NonResidentialPropertyAdditionaldetailsComponent } from './non-residential-property-additionaldetails/non-residential-property-additionaldetails.component';
import { NonResidentialPropertyOwnersComponent } from './non-residential-property-owners/non-residential-property-owners.component';
import { ResidentialPropertyOwnersComponent } from './residential-property-owners/residential-property-owners.component';

@NgModule({
  declarations: [
    // ResourcesComponent,
    // ResourcesDividerComponent,

    ResourcesGatepostComponent,
    FinancialHoldingsComponent,
    ResourcesDetailsComponent,
    FinancialHoldingsSummaryComponent,
    ResidentialPropertyComponent,
    ResidentialPropertyDetailsComponent,
    ResidentialPropertySummaryComponent,
    NonResidentialPropertyComponent,
    NonResidentialPropertyDetailsComponent,
    NonResidentialPropertySummaryComponent,
    ExpectedMoneyStructureComponent,
    ExpectedMoneyStructureSummaryComponent,
    ResourcesVehiclesComponent,
    VehicleDetailsComponent,
    VehicleSummaryComponent,
    BurialSpacesComponent,
    BurialSpaceDetailsComponent,
    BurialSpacesSummaryComponent,
    BurialOrTrustAgreementComponent,
    BurialOrTrustAgreementDetailsComponent,
    BurialOrTrustAgreementAdditionalDetailsComponent,
    BurialOrTrustAgreementSummaryComponent,
    ClosedOrEmptiedAccountDetailsComponent,
    ClosedOrEmptiedAccountSummaryComponent,
    SoldOrTransferredResourceDetailsComponent,
    SoldOrTransferredResourceSummaryComponent,
    LifeInsurancePoliciesComponent,
    LifeInsurancePolicyDetailsComponent,
    CoveredIndividualsComponent,
    LifeInsurancePoliciesSummaryComponent,
    ResourcesSummaryComponent,
    ResourcesEndingComponent,
    ResidentialPropertyDetailsCalloutComponent,
    ResourcesGatepostComponent,
    FinancialHoldingsComponent,
    ResourcesDetailsComponent,
    FinancialHoldingsSummaryComponent,
    ResidentialPropertyComponent,
    ResidentialPropertyDetailsComponent,
    ResidentialPropertySummaryComponent,
    NonResidentialPropertyOwnersComponent,
    NonResidentialPropertyDetailsComponent,
    NonResidentialPropertySummaryComponent,
    ExpectedMoneyStructureComponent,
    ExpectedMoneyStructureSummaryComponent,
    ResourcesVehiclesComponent,
    VehicleDetailsComponent,
    VehicleSummaryComponent,
    BurialSpacesComponent,
    BurialSpaceDetailsComponent,
    BurialSpacesSummaryComponent,
    BurialOrTrustAgreementComponent,
    BurialOrTrustAgreementDetailsComponent,
    BurialOrTrustAgreementSummaryComponent,
    ClosedOrEmptiedAccountDetailsComponent,
    ClosedOrEmptiedAccountSummaryComponent,
    SoldOrTransferredResourceDetailsComponent,
    SoldOrTransferredResourceSummaryComponent,
    LifeInsurancePoliciesComponent,
    LifeInsurancePolicyDetailsComponent,
    CoveredIndividualsComponent,
    LifeInsurancePoliciesSummaryComponent,
    ResourcesSummaryComponent,
    ResourcesEndingComponent,
    FinancialHoldingsDetailsComponent,
    ResidentialPropertyOwnersComponent,
    NonResidentialPropertyAdditionaldetailsComponent,
  ],
  imports: [
    CommonModule,
    ResourcesRoutingModule,
    TranslateModule,
    UiModule

  ]
})
export class ResourcesModule { }
