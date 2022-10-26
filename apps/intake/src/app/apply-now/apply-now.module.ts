import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UiModule } from "@compass-ui/ui";
import { TranslateModule } from "@ngx-translate/core";
import { EffectsModule } from "@ngrx/effects";
import { MetaReducer, StoreModule } from "@ngrx/store";
import { RoutePath } from "../shared/route-strategies";
import { ButtonNavigationModule } from "../shared/ui/button-navigation/button-navigation.module";
import { ApplyNowEffects } from "./+state/apply-now.effects";
import { hydrationMetaReducer } from "./+state/hydration.reducer";
import * as fromApplyNow from "./+state/apply-now.reducer";
import { ApplyNowRoutingModule } from "./apply-now-routing.module";
import { ApplyNowComponent } from "./apply-now.component";
import { CommunityOrganizationComponent } from "./getting-started/community-organization/community-organization.component";
import { ExistingAccountComponent } from "./getting-started/existing-account/existing-account.component";
import { FamilySafetyComponent } from "./getting-started/family-safety/family-safety.component";
import { GatepostComponent } from "./getting-started/gatepost/gatepost.component";
import { GettingStartedEndingComponent } from "./getting-started/getting-started-ending/getting-started-ending.component";
import { GettingStartedComponent } from "./getting-started/getting-started.component";
import { ImportantInformationComponent } from "./getting-started/important-information/important-information.component";
import { PrePopulateApplicationComponent } from "./getting-started/pre-populate-application/pre-populate-application.component";
import { ProviderInformationComponent } from "./getting-started/provider-information/provider-information.component";
import { HouseholContactInfoComponent } from "./household/househol-contact-info/househol-contact-info.component";
import { HouseholWaterComponent } from "./household/househol-water/househol-water.component";
import { HouseholdAddressComponent } from "./household/household-address/household-address.component";
import { HouseholdAppliedBeforeComponent } from "./household/household-applied-before/household-applied-before.component";
import { HouseholdBenefitsCoverageComponent } from "./household/household-benefits-coverage/household-benefits-coverage.component";
import { HouseholdBenefitsComponent } from "./household/household-benefits/household-benefits.component";
import { HouseholdCountryRecNoComponent } from "./household/household-country-rec-no/household-country-rec-no.component";
import { HouseholdCriminalHistoryComponent } from "./household/household-criminal-history/household-criminal-history.component";
import { HouseholdEndingComponent } from "./household/household-ending/household-ending.component";
import { HouseholdFineComponent } from "./household/household-fine/household-fine.component";
import { HouseholdFoodStampsComponent } from "./household/household-food-stamps/household-food-stamps.component";
import { HouseholdFraudComponent } from "./household/household-fraud/household-fraud.component";
import { HouseholdGatepostComponent } from "./household/household-gatepost/household-gatepost.component";
import { HouseholdHeadComponent } from "./household/household-head/household-head.component";
import { HouseholdAnotherPersonComponent } from "./household/household-another-person/household-another-person.component";
import { HouseholdIncarcerationComponent } from "./household/household-incarceration/household-incarceration.component";
import { HouseholdLivedComponent } from "./household/household-lived/household-lived.component";
import { HouseholdLivingSistuationComponent } from "./household/household-living-sistuation/household-living-sistuation.component";
import { HouseholdMemberSummaryComponent } from "./household/household-member-summary/household-member-summary.component";
import { HouseholdPreviousAdderssComponent } from "./household/household-previous-adderss/household-previous-adderss.component";
import { HouseholdReviewAddressComponent } from "./household/household-review-address/household-review-address.component";
import { HouseholdSummaryComponent } from "./household/household-summary/household-summary.component";
import { HouseholdUtilityAllowComponent } from "./household/household-utility-allow/household-utility-allow.component";
import { HouseholdHeadSelectionComponent } from "./household/household-head-selection/household-head-selection.component";
import { HouseholdComponent } from "./household/household.component";
import { HouseholdOutsidePersonComponent } from "./household/household-outside-person/household-outside-person.component";
import { HouseholdLtcNursingComponent } from "./household/household-ltc-nursing/household-ltc-nursing.component";
import { HouseholdSituationComponent } from "./household/household-situation/household-situation.component";
import { HouseholdWhoApplyLtcComponent } from "./household/household-who-apply-ltc/household-who-apply-ltc.component";
import { NursingFacilityDetailsComponent } from "./household/nursing-facility-details/nursing-facility-details.component";
import { IncomeComponent } from "./income/income.component";
import { BenefitsNotReceviedDetailsComponent } from "./individual-details/benefits-not-received-details/benefits-not-received-details.component";
import { BenefitsNotReceviedSummaryComponent } from "./individual-details/benefits-not-received-summary/benefits-not-received-summary.component";
import { BenefitsNotReceviedComponent } from "./individual-details/benefits-not-received/benefits-not-received.component";
import { DomesticViolenceComponent } from "./individual-details/domestic-violence/domestic-violence.component";
import { DrivingLicenseComponent } from "./individual-details/driving-license/driving-license.component";
import { CitizenshipComponent } from "./individual-details/citizenship/citizenship.component";
import { OrgSponsorDetailsComponent } from "./individual-details/org-sponsor-details/org-sponsor-details.component";
import { IndividualSponsorDetailsComponent } from "./individual-details/individual-sponsor-details/individual-sponsor-details.component";
import { FamilyPlanningServicesComponent } from "./individual-details/family-planning-services/family-planning-services.component";
import { FederalIncomeTaxReturnComponent } from "./individual-details/federal-income-tax-return/federal-income-tax-return.component";
import { GeneralDetailsComponent } from "./individual-details/general-details/general-details.component";
import { HomelessComponent } from "./individual-details/homelessness/homelessness.component";
import { IndividualDetailsComponent } from "./individual-details/individual-details.component";
import { IndividualDividerComponent } from "./individual-details/individual-divider/individual-divider.component";
import { IndividualsEndingComponent } from "./individual-details/individuals-ending/individuals-ending.component";
import { IndividualsSummaryComponent } from "./individual-details/individuals-summary/individuals-summary.component";
import { MigrantOrSeasonalFarmWorkerComponent } from "./individual-details/migrant-or-seasonal-farm-worker/migrant-or-seasonal-farm-worker.component";
import { PregnancyScreenComponent } from "./individual-details/pregnancy-screen/pregnancy-screen.component";
import { RaceComponent } from "./individual-details/race/race.component";
import { BenefitsAndHealthSituationComponent } from "./individual-details/benefit-and-health-situations/benefit-and-health-situations.component";
import { CurrentSnapOrTanfBenefitsComponent } from "./individual-details/current-snap-or-tanf-benefits/current-snap-or-tanf-benefits.component";
import { SnapOrTanfBenefitsComponent } from "./individual-details/snap-or-tanf-benefits/snap-or-tanf-benefits.component";
import { SnapOrTanfBenefitsDetailsComponent } from "./individual-details/snap-or-tanf-benefits-details/snap-or-tanf-benefits-details.component";
import { SnapOrTanfBenefitsSummaryComponent } from "./individual-details/snap-or-tanf-benefits-summary/snap-or-tanf-benefits-summary.component";
import { PriorTanfOrCashAssistanceComponent } from "./individual-details/prior-tanf-or-cash-assistance/prior-tanf-or-cash-assistance.component";
import { SocialSecurityDisabilityComponent } from "./individual-details/social-security-disability/social-security-disability.component";
import { IndividualsLegalGatepostComponent } from "./individual-details/individuals-legal-gatepost/individuals-legal-gatepost.component";
import { IndividualsMedicalGatepostComponent } from "./individual-details/individuals-medical-gatepost/individuals-medical-gatepost.component";
import { CurrentlyInPrisonComponent } from "./individual-details/currently-in-prison/currently-in-prison.component";
import { IncarcerationDetailsComponent } from "./individual-details/incarceration-details/incarceration-details.component";
import { IncarcerationSummaryComponent } from "./individual-details/incarceration-summary/incarceration-summary.component";
import { SocialSecurityNumberComponent } from "./individual-details/social-security-number/social-security-number.component";
import { TaxDependentsDetailsComponent } from "./individual-details/tax-dependents-details/tax-dependents-details.component";
import { TaxDependentsSummaryComponent } from "./individual-details/tax-dependents-summary/tax-dependents-summary.component";
import { TaxDependentsComponent } from "./individual-details/tax-dependents/tax-dependents.component";
import { VoterRegistrationComponent } from "./individual-details/voter-registration/voter-registration.component";
import { ResourcesComponent } from "./resources/resources.component";
import { ResourcesDividerComponent } from "./resources/resources-divider/resources-divider.component";
import { ResourcesGatepostComponent } from "./resources/resources-gatepost/resources-gatepost.component";
import { FinancialHoldingsComponent } from "./resources/financial-holdings/financial-holdings.component";
import { ResourcesDetailsComponent } from "./resources/resources-details/resources-details.component";
import { FinancialHoldingsSummaryComponent } from "./resources/financial-holdings-summary/financial-holdings-summary.component";
import { ResidentialPropertyComponent } from "./resources/residential-property/residential-property.component";
import { ResidentialPropertyDetailsComponent } from "./resources/residential-property-details/residential-property-details.component";
import { ResidentialPropertySummaryComponent } from "./resources/residential-property-summary/residential-property-summary.component";
import { NonResidentialPropertyOwnersComponent } from "./resources/non-residential-property-owners/non-residential-property-owners.component";
import { NonResidentialPropertyDetailsComponent } from "./resources/non-residential-property-details/non-residential-property-details.component";
import { NonResidentialPropertySummaryComponent } from "./resources/non-residential-property-summary/non-residential-property-summary.component";
import { ExpectedMoneyStructureComponent } from "./resources/expected-money-structure/expected-money-structure.component";
import { ExpectedMoneyStructureSummaryComponent } from "./resources/expected-money-structure-summary/expected-money-structure-summary.component";
import { VehicleDetailsComponent } from "./resources/vehicle-details/vehicle-details.component";
import { ResourcesVehiclesComponent } from "./resources/resources-vehicles/resources-vehicles.component";
import { VehicleSummaryComponent } from "./resources/vehicle-summary/vehicle-summary.component";
import { BurialSpacesComponent } from "./resources/burial-spaces/burial-spaces.component";
import { BurialSpaceDetailsComponent } from "./resources/burial-space-details/burial-space-details.component";
import { BurialSpacesSummaryComponent } from "./resources/burial-spaces-summary/burial-spaces-summary.component";
import { BurialOrTrustAgreementComponent } from "./resources/burial-or-trust-agreement/burial-or-trust-agreement.component";
import { BurialOrTrustAgreementDetailsComponent } from "./resources/burial-or-trust-agreement-details/burial-or-trust-agreement-details.component";
import { ClosedOrEmptiedAccountDetailsComponent } from "./resources/closed-or-emptied-account-details/closed-or-emptied-account-details.component";
import { ClosedOrEmptiedAccountSummaryComponent } from "./resources/closed-or-emptied-account-summary/closed-or-emptied-account-summary.component";
import { ApplyNowResourcesBurialOrTrustAgreementSummaryStrategy } from "../shared/route-strategies/apply-now/burial-or-trust-agreement-summary";
import { BurialOrTrustAgreementSummaryComponent } from "./resources/burial-or-trust-agreement-summary/burial-or-trust-agreement-summary.component";
import { SoldOrTransferredResourceDetailsComponent } from "./resources/sold-or-transferred-resource-details/sold-or-transferred-resource-details.component";
import { SoldOrTransferredResourceSummaryComponent } from "./resources/sold-or-transferred-resource-summary/sold-or-transferred-resource-summary.component";
import { ReceivedLongTermServicesComponent } from "./resources/received-long-term-services/received-long-term-services.component";
import { ReceivedLongTermServicesDetailsComponent } from "./resources/received-long-term-services-details/received-long-term-services-details.component";
import { LifeInsurancePoliciesComponent } from "./resources/life-insurance-policies/life-insurance-policies.component";
import { LifeInsurancePolicyDetailsComponent } from "./resources/life-insurance-policy-details/life-insurance-policy-details.component";
import { CoveredIndividualsComponent } from "./resources/covered-individuals/covered-individuals.component";
import { LifeInsurancePoliciesSummaryComponent } from "./resources/life-insurance-policies-summary/life-insurance-policies-summary.component";
import { ClosedOrEmptiedAccountComponent } from "./resources/closed-or-emptied-account/closed-or-emptied-account.component";
import { ResourcesSummaryComponent } from "./resources/resources-summary/resources-summary.component";
import { ResourcesEndingComponent } from "./resources/resources-ending/resources-ending.component";

import { InsuranceComponent } from "./insurance/insurance.component";
import { InsuranceDividerComponent } from "./insurance/insurance-divider/insurance-divider.component";

import { InsuranceEndingComponent } from "./insurance/insurance-ending/insurance-ending.component";
import { RsdvdDividerComponent } from "./review-and-submit/rsdvd-divider/rsdvd-divider.component";
import { RsadbAddBenefitsComponent } from "./review-and-submit/rsadb-add-benefits/rsadb-add-benefits.component";
import { GqlService } from '@compass-ui/shared/common'
import { HouseholdSnapScreenComponent } from "./household/household-snap-screen/household-snap-screen.component";
import { HouseholdChildCareCostComponent } from "./household/household-child-care-cost/household-child-care-cost.component";
import { HouseholdCashAssistanceComponent } from "./household/household-cash-assistance/household-cash-assistance.component";
import { HouseholdSchoolMealsComponent } from "./household/household-school-meals/household-school-meals.component";
import { HouseholdLongtermlivingServicesComponent } from "./household/household-longtermliving-services/household-longtermliving-services.component";
import { HouseholdFacilityScreenComponent } from "./household/household-facility-screen/household-facility-screen.component";
import { HouseholdSnapDisabilityComponent } from "./household/household-snap-disability/household-snap-disability.component";
import { HouseholdQuickSnapEndComponent } from "./household/household-quick-snap-end/household-quick-snap-end.component";
import { HouseholdElectricProviderComponent } from "./household/household-electric-provider/household-electric-provider.component";

import { HouseholdMemberSituationGatepostComponent } from "./household/household-member-situation-gatepost/household-member-situation-gatepost.component";
import { FilingJointlyComponent } from "./individual-details/filing-jointly/filing-jointly-screen.component";
import { PrimaryCaretakerComponent } from "./individual-details/primary-caretaker/primary-caretaker.component";
import { FosterCareDetailsComponent } from "./individual-details/foster-care-details/foster-care-details.component";
import { AdultFosterCareDetailsComponent } from "./individual-details/adult-foster-care-details/adult-foster-care-details.component";
import { ChildCareServiceComponent } from "./individual-details/child-care-service/child-care-service.component";
import { DemographicSummaryComponent } from "./individual-details/demographic-summary/demographic-summary.component";
import { CurrentStudentComponent } from "./individual-details/current-student/current-student.component";
import { CurrentEducationSummaryComponent } from "./individual-details/current-education-summary/current-education-summary.component";
import { TrainingSummaryComponent } from "./individual-details/training-summary/training-summary.component";
import { IndividualsGatepostComponent } from "./individual-details/individuals-gatepost/individuals-gatepost.component";
import { CurrentEducationDetailsComponent } from "./individual-details/current-education-details/current-education-details.component";
import { WhoTrainingComponent } from "./individual-details/who-training/who-training.component";
import { TrainingDetailsComponent } from "./individual-details/training-details/training-details.component";
import { HouseholdAbsentRelativeNonresidentialpropertyComponent } from "./household/household-absent-relative-nonresidentialproperty/household-absent-relative-nonresidentialproperty.component";
import { HouseholdAbsentRelativeChildsupportComponent } from "./household/household-absent-relative-childsupport/household-absent-relative-childsupport.component";
import { HouseholdAbsentRelativeChildsupportDetailsComponent } from "./household/household-absent-relative-childsupport-details/household-absent-relative-childsupport-details.component";
import { HouseholdAbsentRelativeSummaryComponent } from "./household/household-absent-relative-summary/household-absent-relative-summary.component";
import { AbsentRelativeDetailsComponent } from "./household/absent-relative-details/absent-relative-details.component";
import { AbsentRelativeRaceComponent } from "./household/absent-relative-race/absent-relative-race.component";
import { AbsentRelativeResponsibleForComponent } from "./household/absent-relative-responsible-for/absent-relative-responsible-for.component";
import { AbsentRelativeAddressComponent } from "./household/absent-relative-address/absent-relative-address.component";
import { AbsentRelativeEmployerDetailsComponent } from "./household/absent-relative-employer-details/absent-relative-employer-details.component";
import { ClaimTaxDependentScreenComponent } from "./individual-details/claim-tax-dependent-screen/claim-tax-dependent-screen.component";
import { WhoWillBeTaxClaimedComponent } from "./individual-details/who-will-be-tax-claimed/who-will-be-tax-claimed.component";
import { FederalIncomeTaxReturnSummaryComponent } from "./individual-details/federal-tax-return-summary/federal-tax-return-summary.component";
import { MilataryMemberComponent } from "./individual-details/milatary-member/milatary-member.component";
import { MilataryStatusComponent } from "./individual-details/milatary-status/milatary-status.component";
import { IndividaulMilataryDetailsComponent } from "./individual-details/individual-milatary-details/individual-milatary-details.component";
import { MilatarySummaryComponent } from "./individual-details/milatary-summary/milatary-summary.component";
import { IndividaulVeteranRelativeDetailsComponent } from "./individual-details/individual-veteran-relative-details/individual-veteran-relative-details.component";
import { WhoVeteranRelativesComponent } from "./individual-details/who-veteran-relatives/who-veteran-relatives.component";
import { VeteranMilatarySummaryComponent } from "./individual-details/veteran-milatary-summary/veteran-milatary-summary.component";
import { AdditionalContactComponent } from "./individual-details/additional-contact/additional-contact.component";
import { AdditionalContactDetailsComponent } from "./individual-details/additional-contact-details/additional-contact-details.component";
import { AdditionalContactMoreDetailsComponent } from "./individual-details/addition-contact-more-details/addition-contact-more-details.component";
import { NationalSchoolLunchProgramComponent } from "./individual-details/national-school-lunch-program/national-school-lunch-program.component";
import { PublicSchoolDetailsComponent } from "./individual-details/public-school-details/public-school-details.component";
import { CharterSchoolDetailsComponent } from "./individual-details/charter-school-details/charter-school-details.component";
import { NSLPSummaryComponent } from "./individual-details/nslp-summary/nslp-summary.component";
import { AdditionalContactSummaryComponent } from "./individual-details/additional-contact-summary/additional-contact-summary.component";
import { SummonsOrWarrantsComponent } from "./individual-details/summons-or-warrants/summons-or-warrants.component";
import { FederalRecoganizedTribeComponent } from "./individual-details/federal-recoganized-tribe/federal-recoganized-tribe.component";
import { FederalRecoganizedTribeInformationComponent } from "./individual-details/federal-recoganized-tribe-information/federal-recoganized-tribe-information.component";
import { FederalRecoganizedTribeIncomeComponent } from "./individual-details/federal-recoganized-tribe-income/federal-recoganized-tribe-income.component";
import { SupplementalSecurityDisabilityComponent } from "./individual-details/supplemental-security-disability/supplemental-security-disability.component";
import { SupplementalSecurityIncomeDetailsComponent } from "./individual-details/supplemental-security-income-details/supplemental-security-income-details.component";
import { SupplementalSecurityIncomeComponent } from "./individual-details/supplemental-security-income/supplemental-security-income.component";
import { FederalRecoganizedTribeSummaryComponent } from "./individual-details/federal-recoganized-tribe-summary/federal-recoganized-tribe-summary.component";
import { CommunityPartnerPasswordComponent } from "./getting-started/community-partner-password/community-partner-password.component";
import { NonProviderRegistrationComponent } from "./getting-started/non-provider-registration/non-provider-registration.component";
import { SomeoneElseComponent } from "./getting-started/someone-else/someone-else.component";
import { NonMedicalAssisComponent } from "./getting-started/non-medical-assis/non-medical-assis.component";
import { MedicalConditionComponent } from "./individual-details/medical-condition-selection/medical-condition-selection.component";
import { MedicalConditionDetailsComponent } from "./individual-details/medical-condition-details/medical-condition-details.component";
import { HealthSustainingMedicationComponent } from "./individual-details/health-sustaining-mediciation/health-sustaining-mediciation.component";
import { PaidUnpaidMedicalBillsComponent } from "./individual-details/paid-unpaid-medical-bills/paid-unpaid-medical-bills.component";
import { FamilyPlanningServiceReviewComponent } from "./individual-details/family-planning-service-review/family-planning-service-review.component";
import { FamilyPlanningServiceAfraidComponent } from "./individual-details/family-planning-service-afraid/family-planning-service-afraid.component";
import { IndividualOwnesFinesComponent } from "./individual-details/individual-ownes-fines/individual-ownes-fines.component";

import { IncomeendingComponent } from "./income/incomeending/incomeending.component";
import { IndividualConvictedWelfareFraudComponent } from "./individual-details/individual-convicted-welfare-fraud/individual-convicted-welfare-fraud.component";
import { IndividualCurrentlyOnProbationComponent } from "./individual-details/individual-currently-on-probation/individual-currently-on-probation.component";
import { IndividualCurrentlyFleeingComponent } from "./individual-details/individual-currently-fleeing/individual-currently-fleeing.component";
import { FamilyPlanningServiceSummaryComponent } from "./individual-details/family-planning-service-summary/family-planning-service-summary.component";
import { SupplementalSecurityIncomeSummaryComponent } from "./individual-details/supplemental-security-income-summary/supplemental-security-income-summary.component";
import { MedicalConditionSummaryComponent } from "./individual-details/medical-condition-summary/medical-condition-summary.component";
import { PregnancySummaryScreenComponent } from "./individual-details/pregnancy-summary-screen/pregnancy-summary-screen.component";
import { PregnancyDetailsScreenComponent } from "./individual-details/pregnancy-details-screen/pregnancy-details-screen.component";

import { ExpensesLandingComponent } from "./expenses/expenses-enrollment/expenses-enrollment.component";
import { ExpensesHeatingAssistanceComponent } from "./expenses/expenses-heating-assistance/expenses-heating-assistance.component";
import { ExpensesHeatingGatepostComponent } from "./expenses/expenses-heating-gatepost/expenses-heating-gatepost.component";
import { ExpensesMailingAddressComponent } from "./expenses/expenses-mailing-address/expenses-mailing-address.component";
import { ExpensesHouseholdMortgageRentComponent } from "./expenses/expenses-household-mortgage-rent/expenses-household-mortgage-rent.component";
import { ExpensesHouseholdPropertyInsuranceComponent } from "./expenses/expenses-household-property-insurance/expenses-household-property-insurance.component";

import { DrinkingWaterCompanyMailingComponent } from "./expenses/drinking-water-company-mailing/drinking-water-company-mailing.component";
import { WaterAssistanceApplicationComponent } from "./expenses/water-assistance-application/water-assistance-application.component";
import { ExpensesPropertyTaxDetailsComponent } from "./expenses/expenses-property-tax-details/expenses-property-tax-details.component";
import { ChildSupExpSumCmp } from "./expenses/child-support-expenses-summary/child-support-expenses-summary.component";
import { ChildSupExpDlsComponent } from "./expenses/child-support-expenses-details/child-support-expenses-details.component";
import { NotEligibleComponent } from "./voter-registration/not-eligible/not-eligible.component";
import { RequirementQuestionsComponent } from "./voter-registration/requirement-questions/requirement-questions.component";
import { VoterRegistrationGettingStartedComponent } from "./voter-registration/voter-registration.component";
import { SituationGatepostComponent } from "./voter-registration/situation-gatepost/situation-gatepost.component";
import { PreviousRegistrationComponent } from "./voter-registration/previous-registration/previous-registration.component";
import { ChangeOfAddressComponent } from "./voter-registration/change-of-address/change-of-address.component";
import { ChangeOfNameComponent } from "./voter-registration/change-of-name/change-of-name.component";
import { VoterRaceComponent } from "./voter-registration/voter-race/voter-race.component";
import { ResidentialAddressComponent } from "./voter-registration/residential-address/residential-address.component";
import { VoterBasicDetailsComponent } from "./voter-registration/voter-basic-details/voter-basic-details.component";
import { VerifySsnComponent } from "./voter-registration/verify-ssn/verify-ssn.component";
import { UploadSignatureComponent } from "./voter-registration/upload-signature/upload-signature.component";
import { UploadSignatureSummaryComponent } from "./voter-registration/upload-signature-summary/upload-signature-summary.component";
import { SelectIdentityVerifyMethodComponent } from "./voter-registration/select-identity-verify-method/select-identity-verify-method.component";
import { VerifyDriversLicenseComponent } from "./voter-registration/verify-drivers-license/verify-drivers-license.component";
import { PoliticalPartyComponent } from "./voter-registration/political-party/political-party.component";
import { RegistrationDeclarationsComponent } from "./voter-registration/registration-declarations/registration-declarations.component";
import { WhoFilledFormComponent } from "./voter-registration/who-filled-form/who-filled-form.component";
import { VoterRegistrationEndingComponent } from "./voter-registration/voter-registration-ending/voter-registration-ending.component";
import { VoterAddressReviewComponent } from "./voter-registration/voter-address-review/voter-address-review.component";
import { ReceivedLongTermServicesSummaryComponent } from "./resources/received-long-term-services-summary/received-long-term-services-summary.component";
import { BurialOrTrustAgreementAdditionalDetailsComponent } from "./resources/burial-or-trust-agreement-additional-details/burial-or-trust-agreement-additional-details.component";
import { FinancialHoldingsDetailsComponent } from "./resources/financial-holdings-details/financial-holdings-details.component";
import { ResidentialPropertyOwnersComponent } from "./resources/residential-property-owners/residential-property-owners.component";
import { NonResidentialPropertyAdditionaldetailsComponent } from "./resources/non-residential-property-additionaldetails/non-residential-property-additionaldetails.component";


import { PolicyCoverageComponent } from "./insurance/common/policy-coverage/policy-coverage.component";
import { PolicyTypeComponent } from "./insurance/common/policy-type/policy-type.component";
import { CurrntPolicyHolderComponent } from "./insurance/current-policy/currnt-policy-holder/currnt-policy-holder.component";
import { PaidUnpaidBillsDetailsComponent } from "./individual-details/paid-unpaid-medical-bills-details/paid-unpaid-medical-bills-details.component";
import { EmployerPolicyAdditionalDetailComponent } from "./insurance/employer-policy/employer-policy-additional-detail/employer-policy-additional-detail.component";
import { EmployerCoverageSelectionComponent } from "./insurance/employer-policy/employer-coverage-selection/employer-coverage-selection.component";
import { PriorPolicyHolderComponent } from "./insurance/prior-policy/prior-policy-holder/prior-policy-holder.component";
import { CurrentInsuranceComapnyComponent } from "./insurance/current-policy/current-insurance-comapny/current-insurance-comapny.component";
import { PolicyCoveredByComponent } from "./insurance/common/policy-covered-by/policy-covered-by.component";
import { LgbtqSurveyComponent } from "./review-and-submit/lgbtq-survey/lgbtq-survey.component";
import { RightAndResponsibilitiesComponent } from "./review-and-submit/right-and-responsibilities/right-and-responsibilities.component";
import {NgxSpinnerModule} from "ngx-spinner";
import { MaChipProviderComponent } from "./review-and-submit/ma-chip-provider/ma-chip-provider.component";
import { InsuranceAddressComponent } from "./insurance/common/insurance-address/insurance-address.component";
import { InsuranceSummaryComponent } from "./insurance/common/insurance-summary/insurance-summary.component";
import { InsuranceGatepostComponent } from "./insurance/gateposts/insurance-gatepost/insurance-gatepost.component";
import { CurrentPoilcyEndComponent } from "./insurance/current-policy/current-poilcy-end/current-poilcy-end.component";
import { CurrentPolicyEmployerComponent } from "./insurance/current-policy/current-policy-employer/current-policy-employer.component";
import { PriorInsuranceComapnyComponent } from "./insurance/prior-policy/prior-insurance-comapny/prior-insurance-comapny.component";
import { PriorPoilcyEndComponent } from "./insurance/prior-policy/prior-poilcy-end/prior-poilcy-end.component";
import { EmployerOfferedInsuranceGatepostComponent } from "./insurance/gateposts/employer-offered-insurance-gatepost/employer-offered-insurance-gatepost.component";
import { EmployerContactInformationComponent } from "./insurance/employer-policy/employer-contact-information/employer-contact-information.component";
import { EmployerOutOfHouseholdComponent } from "./insurance/employer-policy/employer-out-of-household/employer-out-of-household.component";
import { EmployerPolicyHolderComponent } from "./insurance/employer-policy/employer-policy-holder/employer-policy-holder.component";
import { EmployerPolicyProviderComponent } from "./insurance/employer-policy/employer-policy-provider/employer-policy-provider.component";
import { InsuranceMainSummaryComponent } from "./insurance/insurance-main-summary/insurance-main-summary.component";
import { OutOfHouseholdIformationComponent } from "./insurance/common/out-of-household-iformation/out-of-household-iformation.component";



export const metaReducers: MetaReducer[] = [hydrationMetaReducer];
@NgModule({
    declarations: [
        ApplyNowComponent,
        GettingStartedComponent,
        ImportantInformationComponent,
        GatepostComponent,
        CommunityPartnerPasswordComponent,
        NonProviderRegistrationComponent,
        ExistingAccountComponent,
        ProviderInformationComponent,
        CommunityOrganizationComponent,
        IndividualSponsorDetailsComponent,
        PrimaryCaretakerComponent,
        FosterCareDetailsComponent,
        AdultFosterCareDetailsComponent,
        DemographicSummaryComponent,
        NationalSchoolLunchProgramComponent,
        PublicSchoolDetailsComponent,
        CharterSchoolDetailsComponent,
        NSLPSummaryComponent,
        ChildCareServiceComponent,
        IndividualsGatepostComponent,
        CurrentStudentComponent,
        CurrentEducationDetailsComponent,
        CurrentEducationSummaryComponent,
        WhoTrainingComponent,
        TrainingDetailsComponent,
        TrainingSummaryComponent,
        MilataryMemberComponent,
        MilataryStatusComponent,
        IndividaulMilataryDetailsComponent,
        MilatarySummaryComponent,
        IndividaulVeteranRelativeDetailsComponent,
        WhoVeteranRelativesComponent,
        VeteranMilatarySummaryComponent,
        AdditionalContactComponent,
        AdditionalContactDetailsComponent,
        AdditionalContactMoreDetailsComponent,
        AdditionalContactSummaryComponent,
        PrePopulateApplicationComponent,
        FamilySafetyComponent,
        GettingStartedEndingComponent,
        HouseholdComponent,
        IndividualDetailsComponent,
        IndividualDividerComponent,
        BenefitsNotReceviedComponent,
        BenefitsNotReceviedDetailsComponent,
        BenefitsNotReceviedSummaryComponent,
        PregnancyScreenComponent,
        PregnancySummaryScreenComponent,
        PregnancyDetailsScreenComponent,
        FederalIncomeTaxReturnComponent,
        FederalIncomeTaxReturnSummaryComponent,
        FilingJointlyComponent,
        WhoWillBeTaxClaimedComponent,
        SummonsOrWarrantsComponent,
        FederalRecoganizedTribeComponent,
        FederalRecoganizedTribeInformationComponent,
        FederalRecoganizedTribeIncomeComponent,
        FederalRecoganizedTribeSummaryComponent,
        ClaimTaxDependentScreenComponent,
        TaxDependentsComponent,
        TaxDependentsDetailsComponent,
        TaxDependentsSummaryComponent,
        DomesticViolenceComponent,
        BenefitsAndHealthSituationComponent,
        CurrentSnapOrTanfBenefitsComponent,
        SnapOrTanfBenefitsComponent,
        SnapOrTanfBenefitsDetailsComponent,
        SnapOrTanfBenefitsSummaryComponent,
        PriorTanfOrCashAssistanceComponent,
        SocialSecurityDisabilityComponent,
        IndividualsLegalGatepostComponent,
        IndividualsMedicalGatepostComponent,
        CurrentlyInPrisonComponent,
        IncarcerationDetailsComponent,
        IncarcerationSummaryComponent,
        FamilyPlanningServicesComponent,
        HomelessComponent,
        MedicalConditionComponent,
        MedicalConditionDetailsComponent,
        MedicalConditionSummaryComponent,
        HealthSustainingMedicationComponent,
        PaidUnpaidMedicalBillsComponent,
        PaidUnpaidBillsDetailsComponent,
        MigrantOrSeasonalFarmWorkerComponent,
        IndividualsSummaryComponent,
        IndividualsEndingComponent,
        GeneralDetailsComponent,
        RaceComponent,
        IncomeComponent,
        HouseholdHeadComponent,
        HouseholdMemberSummaryComponent,
        HouseholdAnotherPersonComponent,
        HouseholdBenefitsComponent,
        HouseholdHeadSelectionComponent,
        HouseholdAddressComponent,
        HouseholdReviewAddressComponent,
        HouseholdPreviousAdderssComponent,
        HouseholdLivedComponent,
        HouseholdLivingSistuationComponent,
        HouseholdSituationComponent,
        HouseholContactInfoComponent,
        HouseholWaterComponent,
        HouseholdGatepostComponent,
        HouseholdBenefitsCoverageComponent,
        HouseholdUtilityAllowComponent,
        HouseholdCountryRecNoComponent,
        HouseholdAppliedBeforeComponent,
        HouseholdFoodStampsComponent,
        HouseholdCriminalHistoryComponent,
        HouseholdFineComponent,
        HouseholdFraudComponent,
        HouseholdIncarcerationComponent,
        HouseholdSummaryComponent,
        HouseholdFacilityScreenComponent,
        HouseholdEndingComponent,
        HouseholdSnapScreenComponent,
        HouseholdSnapDisabilityComponent,
        HouseholdChildCareCostComponent,
        HouseholdCashAssistanceComponent,
        HouseholdSchoolMealsComponent,
        HouseholdLongtermlivingServicesComponent,
        HouseholdMemberSituationGatepostComponent,
        HouseholdQuickSnapEndComponent,
        HouseholdOutsidePersonComponent,
        HouseholdLtcNursingComponent,
        HouseholdWhoApplyLtcComponent,
        NursingFacilityDetailsComponent,
        HouseholdElectricProviderComponent,
        HouseholdAbsentRelativeNonresidentialpropertyComponent,
        HouseholdAbsentRelativeChildsupportComponent,
        HouseholdAbsentRelativeChildsupportDetailsComponent,
        HouseholdAbsentRelativeSummaryComponent,
        AbsentRelativeDetailsComponent,
        AbsentRelativeRaceComponent,
        AbsentRelativeResponsibleForComponent,
        AbsentRelativeAddressComponent,
        AbsentRelativeEmployerDetailsComponent,
        SocialSecurityNumberComponent,
        VoterRegistrationComponent,
        DrivingLicenseComponent,
        CitizenshipComponent,
        OrgSponsorDetailsComponent,
        IncomeComponent,
        ResourcesComponent,
        ResourcesDividerComponent,
        ResourcesGatepostComponent,
        FinancialHoldingsComponent,
        FinancialHoldingsDetailsComponent,

        FinancialHoldingsSummaryComponent,
        ResourcesDetailsComponent,
        ResidentialPropertyComponent,
        ResidentialPropertyDetailsComponent,
        ResidentialPropertyOwnersComponent,
        ResidentialPropertySummaryComponent,
        NonResidentialPropertyOwnersComponent,
        NonResidentialPropertyDetailsComponent,
        NonResidentialPropertyAdditionaldetailsComponent,
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
        ReceivedLongTermServicesComponent,
        ReceivedLongTermServicesDetailsComponent,
        ReceivedLongTermServicesSummaryComponent,
        LifeInsurancePoliciesComponent,
        LifeInsurancePolicyDetailsComponent,
        CoveredIndividualsComponent,
        LifeInsurancePoliciesSummaryComponent,
        ClosedOrEmptiedAccountComponent,
        ResourcesSummaryComponent,
        ResourcesEndingComponent,
        InsuranceComponent,
        InsuranceDividerComponent,




        SomeoneElseComponent,
        NonMedicalAssisComponent,


        InsuranceEndingComponent,
        RsdvdDividerComponent,
        MaChipProviderComponent,
        RsadbAddBenefitsComponent,

        SupplementalSecurityDisabilityComponent,
        SupplementalSecurityIncomeDetailsComponent,
        SupplementalSecurityIncomeComponent,

        SomeoneElseComponent,
        NonMedicalAssisComponent,
        FamilyPlanningServiceReviewComponent,
        FamilyPlanningServiceAfraidComponent,

        IndividualOwnesFinesComponent,
        IndividualConvictedWelfareFraudComponent,
        IndividualCurrentlyOnProbationComponent,
        IndividualCurrentlyFleeingComponent,
        FamilyPlanningServiceSummaryComponent,
        SupplementalSecurityIncomeSummaryComponent,

        ExpensesLandingComponent,
        ExpensesHeatingAssistanceComponent,
        ExpensesMailingAddressComponent,
        ExpensesHouseholdMortgageRentComponent,
        ExpensesHouseholdPropertyInsuranceComponent,
        ChildSupExpDlsComponent,

        DrinkingWaterCompanyMailingComponent,
        WaterAssistanceApplicationComponent,
        ExpensesPropertyTaxDetailsComponent,

        VoterRegistrationGettingStartedComponent,
        NotEligibleComponent,
        RequirementQuestionsComponent,
        SituationGatepostComponent,
        PreviousRegistrationComponent,
        ChangeOfAddressComponent,
        ChangeOfNameComponent,
        VoterBasicDetailsComponent,
        VoterRaceComponent,
        ResidentialAddressComponent,
        VerifySsnComponent,
        VoterAddressReviewComponent,
        UploadSignatureComponent,
        UploadSignatureSummaryComponent,
        SelectIdentityVerifyMethodComponent,
        VerifyDriversLicenseComponent,
        PoliticalPartyComponent,
        RegistrationDeclarationsComponent,
        WhoFilledFormComponent,
        VoterRegistrationEndingComponent,
        CurrntPolicyHolderComponent,


        PolicyTypeComponent,
        EmployerPolicyAdditionalDetailComponent,
        EmployerCoverageSelectionComponent,
        PriorPolicyHolderComponent,
        CurrentInsuranceComapnyComponent,
        PolicyCoveredByComponent,
        LgbtqSurveyComponent,
        RightAndResponsibilitiesComponent,
        PolicyCoverageComponent,
        PolicyCoveredByComponent,
        InsuranceAddressComponent,
        InsuranceSummaryComponent,
        PolicyTypeComponent,
        CurrntPolicyHolderComponent,
        CurrentInsuranceComapnyComponent,

        CurrentPoilcyEndComponent,
        CurrentPolicyEmployerComponent,
        PriorInsuranceComapnyComponent,
        PriorPoilcyEndComponent,
        PriorPolicyHolderComponent,
        EmployerOfferedInsuranceGatepostComponent,
        InsuranceGatepostComponent,
        EmployerContactInformationComponent,
        EmployerCoverageSelectionComponent,
        EmployerOutOfHouseholdComponent,
        EmployerPolicyAdditionalDetailComponent,
        EmployerPolicyHolderComponent,
        EmployerPolicyProviderComponent,
        InsuranceMainSummaryComponent,
        OutOfHouseholdIformationComponent
    ],
    imports: [
        CommonModule,
        UiModule,
        TranslateModule,
        ApplyNowRoutingModule,
        ButtonNavigationModule,
        FormsModule,
        ReactiveFormsModule,
      NgxSpinnerModule,
        StoreModule.forFeature(
            RoutePath.APPLYNOW,
            fromApplyNow.applyNowReducer,
            { metaReducers }
        ),
        EffectsModule.forFeature([ApplyNowEffects]),
    ],
    providers: [GqlService],
})
export class ApplyNowModule { }
