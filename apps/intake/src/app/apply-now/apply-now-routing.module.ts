import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent, UiModule } from "@compass-ui/ui";
import { RoutePath } from "../shared/route-strategies";
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
import { HouseholdAnotherPersonComponent } from "./household/household-another-person/household-another-person.component";
import { HouseholdCountryRecNoComponent } from "./household/household-country-rec-no/household-country-rec-no.component";
import { HouseholdCriminalHistoryComponent } from "./household/household-criminal-history/household-criminal-history.component";
import { HouseholdEndingComponent } from "./household/household-ending/household-ending.component";
import { HouseholdFineComponent } from "./household/household-fine/household-fine.component";
import { HouseholdFoodStampsComponent } from "./household/household-food-stamps/household-food-stamps.component";
import { HouseholdFraudComponent } from "./household/household-fraud/household-fraud.component";
import { HouseholdGatepostComponent } from "./household/household-gatepost/household-gatepost.component";
import { HouseholdHeadSelectionComponent } from "./household/household-head-selection/household-head-selection.component";
import { HouseholdHeadComponent } from "./household/household-head/household-head.component";
import { HouseholdIncarcerationComponent } from "./household/household-incarceration/household-incarceration.component";
import { HouseholdLivedComponent } from "./household/household-lived/household-lived.component";
import { HouseholdLivingSistuationComponent } from "./household/household-living-sistuation/household-living-sistuation.component";
import { HouseholdLtcNursingComponent } from "./household/household-ltc-nursing/household-ltc-nursing.component";
import { HouseholdMemberSummaryComponent } from "./household/household-member-summary/household-member-summary.component";
import { HouseholdMemberSituationGatepostComponent } from "./household/household-member-situation-gatepost/household-member-situation-gatepost.component";
import { HouseholdPreviousAdderssComponent } from "./household/household-previous-adderss/household-previous-adderss.component";
import { HouseholdReviewAddressComponent } from "./household/household-review-address/household-review-address.component";
import { HouseholdSummaryComponent } from "./household/household-summary/household-summary.component";
import { HouseholdOutsidePersonComponent } from "./household/household-outside-person/household-outside-person.component";
import { HouseholdSituationComponent } from "./household/household-situation/household-situation.component";
import { HouseholdUtilityAllowComponent } from "./household/household-utility-allow/household-utility-allow.component";
import { HouseholdWhoApplyLtcComponent } from "./household/household-who-apply-ltc/household-who-apply-ltc.component";
import { HouseholdComponent } from "./household/household.component";
import { NursingFacilityDetailsComponent } from "./household/nursing-facility-details/nursing-facility-details.component";
import { AbsentRelativeDetailsComponent } from "./household/absent-relative-details/absent-relative-details.component";
import { AbsentRelativeAddressComponent } from "./household/absent-relative-address/absent-relative-address.component";
import { AbsentRelativeRaceComponent } from "./household/absent-relative-race/absent-relative-race.component";
import { AbsentRelativeResponsibleForComponent } from "./household/absent-relative-responsible-for/absent-relative-responsible-for.component";
import { AbsentRelativeEmployerDetailsComponent } from "./household/absent-relative-employer-details/absent-relative-employer-details.component";
import { AbsentRelativeDetails } from "./household/models/absentRelativeDetails";
import { BenefitsNotReceviedDetailsComponent } from "./individual-details/benefits-not-received-details/benefits-not-received-details.component";
import { BenefitsNotReceviedSummaryComponent } from "./individual-details/benefits-not-received-summary/benefits-not-received-summary.component";
import { BenefitsNotReceviedComponent } from "./individual-details/benefits-not-received/benefits-not-received.component";
import { DomesticViolenceComponent } from "./individual-details/domestic-violence/domestic-violence.component";
import { FamilyPlanningServicesComponent } from "./individual-details/family-planning-services/family-planning-services.component";
import { FederalIncomeTaxReturnComponent } from "./individual-details/federal-income-tax-return/federal-income-tax-return.component";
import { ClaimTaxDependentScreenComponent } from "./individual-details/claim-tax-dependent-screen/claim-tax-dependent-screen.component";
import { WhoWillBeTaxClaimedComponent } from "./individual-details/who-will-be-tax-claimed/who-will-be-tax-claimed.component";
import { FederalIncomeTaxReturnSummaryComponent } from "./individual-details/federal-tax-return-summary/federal-tax-return-summary.component";
import { HomelessComponent } from "./individual-details/homelessness/homelessness.component";
import { IndividualDetailsComponent } from "./individual-details/individual-details.component";
import { IndividualDividerComponent } from "./individual-details/individual-divider/individual-divider.component";
import { IndividualsEndingComponent } from "./individual-details/individuals-ending/individuals-ending.component";
import { IndividualsSummaryComponent } from "./individual-details/individuals-summary/individuals-summary.component";
import { InsuranceDividerComponent } from "./insurance/insurance-divider/insurance-divider.component";


import { MigrantOrSeasonalFarmWorkerComponent } from "./individual-details/migrant-or-seasonal-farm-worker/migrant-or-seasonal-farm-worker.component";
import { PregnancyScreenComponent } from "./individual-details/pregnancy-screen/pregnancy-screen.component";
import { RsdvdDividerComponent } from "./review-and-submit/rsdvd-divider/rsdvd-divider.component";
import { RsadbAddBenefitsComponent } from "./review-and-submit/rsadb-add-benefits/rsadb-add-benefits.component";
import { BenefitsAndHealthSituationComponent } from "./individual-details/benefit-and-health-situations/benefit-and-health-situations.component";
import { CurrentSnapOrTanfBenefitsComponent } from "./individual-details/current-snap-or-tanf-benefits/current-snap-or-tanf-benefits.component";
import { SnapOrTanfBenefitsDetailsComponent } from "./individual-details/snap-or-tanf-benefits-details/snap-or-tanf-benefits-details.component";
import { SnapOrTanfBenefitsSummaryComponent } from "./individual-details/snap-or-tanf-benefits-summary/snap-or-tanf-benefits-summary.component";
import { SnapOrTanfBenefitsComponent } from "./individual-details/snap-or-tanf-benefits/snap-or-tanf-benefits.component";
import { PriorTanfOrCashAssistanceComponent } from "./individual-details/prior-tanf-or-cash-assistance/prior-tanf-or-cash-assistance.component";
import { TaxDependentsDetailsComponent } from "./individual-details/tax-dependents-details/tax-dependents-details.component";
import { TaxDependentsSummaryComponent } from "./individual-details/tax-dependents-summary/tax-dependents-summary.component";
import { TaxDependentsComponent } from "./individual-details/tax-dependents/tax-dependents.component";
import { BurialOrTrustAgreementDetailsComponent } from "./resources/burial-or-trust-agreement-details/burial-or-trust-agreement-details.component";
import { BurialOrTrustAgreementSummaryComponent } from "./resources/burial-or-trust-agreement-summary/burial-or-trust-agreement-summary.component";
import { BurialOrTrustAgreementComponent } from "./resources/burial-or-trust-agreement/burial-or-trust-agreement.component";
import { BurialSpaceDetailsComponent } from "./resources/burial-space-details/burial-space-details.component";
import { BurialSpacesSummaryComponent } from "./resources/burial-spaces-summary/burial-spaces-summary.component";
import { BurialSpacesComponent } from "./resources/burial-spaces/burial-spaces.component";
import { ClosedOrEmptiedAccountDetailsComponent } from "./resources/closed-or-emptied-account-details/closed-or-emptied-account-details.component";
import { ClosedOrEmptiedAccountSummaryComponent } from "./resources/closed-or-emptied-account-summary/closed-or-emptied-account-summary.component";
import { SoldOrTransferredResourceDetailsComponent } from "./resources/sold-or-transferred-resource-details/sold-or-transferred-resource-details.component";
import { SoldOrTransferredResourceSummaryComponent } from "./resources/sold-or-transferred-resource-summary/sold-or-transferred-resource-summary.component";
import { ReceivedLongTermServicesComponent } from "./resources/received-long-term-services/received-long-term-services.component";
import { ReceivedLongTermServicesDetailsComponent } from "./resources/received-long-term-services-details/received-long-term-services-details.component";
import { CoveredIndividualsComponent } from "./resources/covered-individuals/covered-individuals.component";
import { ExpectedMoneyStructureSummaryComponent } from "./resources/expected-money-structure-summary/expected-money-structure-summary.component";
import { ExpectedMoneyStructureComponent } from "./resources/expected-money-structure/expected-money-structure.component";
import { FinancialHoldingsSummaryComponent } from "./resources/financial-holdings-summary/financial-holdings-summary.component";
import { FinancialHoldingsComponent } from "./resources/financial-holdings/financial-holdings.component";
import { LifeInsurancePoliciesSummaryComponent } from "./resources/life-insurance-policies-summary/life-insurance-policies-summary.component";
import { LifeInsurancePoliciesComponent } from "./resources/life-insurance-policies/life-insurance-policies.component";
import { LifeInsurancePolicyDetailsComponent } from "./resources/life-insurance-policy-details/life-insurance-policy-details.component";
import { NonResidentialPropertyDetailsComponent } from "./resources/non-residential-property-details/non-residential-property-details.component";
import { NonResidentialPropertySummaryComponent } from "./resources/non-residential-property-summary/non-residential-property-summary.component";
import { NonResidentialPropertyOwnersComponent } from "./resources/non-residential-property-owners/non-residential-property-owners.component";
import { ResidentialPropertyDetailsComponent } from "./resources/residential-property-details/residential-property-details.component";
import { ResidentialPropertySummaryComponent } from "./resources/residential-property-summary/residential-property-summary.component";
import { ResidentialPropertyComponent } from "./resources/residential-property/residential-property.component";
import { ResourcesDetailsComponent } from "./resources/resources-details/resources-details.component";
import { ResourcesDividerComponent } from "./resources/resources-divider/resources-divider.component";
import { ResourcesEndingComponent } from "./resources/resources-ending/resources-ending.component";
import { ResourcesGatepostComponent } from "./resources/resources-gatepost/resources-gatepost.component";
import { ResourcesSummaryComponent } from "./resources/resources-summary/resources-summary.component";
import { ResourcesVehiclesComponent } from "./resources/resources-vehicles/resources-vehicles.component";
//Household
import { ResourcesComponent } from "./resources/resources.component";
import { VehicleDetailsComponent } from "./resources/vehicle-details/vehicle-details.component";
import { VehicleSummaryComponent } from "./resources/vehicle-summary/vehicle-summary.component";
import { HouseholdSnapScreenComponent } from "./household/household-snap-screen/household-snap-screen.component";
import { HouseholdCashAssistanceComponent } from "./household/household-cash-assistance/household-cash-assistance.component";
import { HouseholdChildCareCostComponent } from "./household/household-child-care-cost/household-child-care-cost.component";
import { HouseholdSchoolMealsComponent } from "./household/household-school-meals/household-school-meals.component";
import { HouseholdLongtermlivingServicesComponent } from "./household/household-longtermliving-services/household-longtermliving-services.component";
import { HouseholdSnapDisabilityComponent } from "./household/household-snap-disability/household-snap-disability.component";
import { HouseholdFacilityScreenComponent } from "./household/household-facility-screen/household-facility-screen.component";
import { HouseholdQuickSnapEndComponent } from "./household/household-quick-snap-end/household-quick-snap-end.component";
import { CitizenshipComponent } from "./individual-details/citizenship/citizenship.component";
import { FilingJointlyComponent } from "./individual-details/filing-jointly/filing-jointly-screen.component";
import { HouseholdElectricProviderComponent } from "./household/household-electric-provider/household-electric-provider.component";
import { HouseholdAbsentRelativeNonresidentialpropertyComponent } from "./household/household-absent-relative-nonresidentialproperty/household-absent-relative-nonresidentialproperty.component";
import { HouseholdAbsentRelativeChildsupportComponent } from "./household/household-absent-relative-childsupport/household-absent-relative-childsupport.component";
import { HouseholdAbsentRelativeChildsupportDetailsComponent } from "./household/household-absent-relative-childsupport-details/household-absent-relative-childsupport-details.component";
import { HouseholdAbsentRelativeSummaryComponent } from "./household/household-absent-relative-summary/household-absent-relative-summary.component";

import { OrgSponsorDetailsComponent } from "./individual-details/org-sponsor-details/org-sponsor-details.component";
import { IndividualSponsorDetailsComponent } from "./individual-details/individual-sponsor-details/individual-sponsor-details.component";
import { PrimaryCaretakerComponent } from "./individual-details/primary-caretaker/primary-caretaker.component";
import { FosterCareDetailsComponent } from "./individual-details/foster-care-details/foster-care-details.component";
import { AdultFosterCareDetailsComponent } from "./individual-details/adult-foster-care-details/adult-foster-care-details.component";
import { ChildCareServiceComponent } from "./individual-details/child-care-service/child-care-service.component";
import { CurrentStudentComponent } from "./individual-details/current-student/current-student.component";
import { CurrentEducationSummaryComponent } from "./individual-details/current-education-summary/current-education-summary.component";
import { TrainingSummaryComponent } from "./individual-details/training-summary/training-summary.component";
import { DemographicSummaryComponent } from "./individual-details/demographic-summary/demographic-summary.component";
import { IndividualsGatepostComponent } from "./individual-details/individuals-gatepost/individuals-gatepost.component";
import { CurrentEducationDetailsComponent } from "./individual-details/current-education-details/current-education-details.component";
import { WhoTrainingComponent } from "./individual-details/who-training/who-training.component";
import { TrainingDetailsComponent } from "./individual-details/training-details/training-details.component";
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
import { SocialSecurityDisabilityComponent } from "./individual-details/social-security-disability/social-security-disability.component";
import { IndividualsLegalGatepostComponent } from "./individual-details/individuals-legal-gatepost/individuals-legal-gatepost.component";
import { IndividualsMedicalGatepostComponent } from "./individual-details/individuals-medical-gatepost/individuals-medical-gatepost.component";
import { SupplementalSecurityIncomeComponent } from "./individual-details/supplemental-security-income/supplemental-security-income.component";
import { SupplementalSecurityIncomeDetailsComponent } from "./individual-details/supplemental-security-income-details/supplemental-security-income-details.component";
import { SupplementalSecurityDisabilityComponent } from "./individual-details/supplemental-security-disability/supplemental-security-disability.component";
import { NonProviderRegistrationComponent } from "./getting-started/non-provider-registration/non-provider-registration.component";
import { CommunityPartnerPasswordComponent } from "./getting-started/community-partner-password/community-partner-password.component";
import { SomeoneElseComponent } from "./getting-started/someone-else/someone-else.component";
import { NonMedicalAssisComponent } from "./getting-started/non-medical-assis/non-medical-assis.component";
import { CurrentlyInPrisonComponent } from "./individual-details/currently-in-prison/currently-in-prison.component";
import { IncarcerationDetailsComponent } from "./individual-details/incarceration-details/incarceration-details.component";
import { IncarcerationSummaryComponent } from "./individual-details/incarceration-summary/incarceration-summary.component";
import { FamilyPlanningServiceReviewComponent } from "./individual-details/family-planning-service-review/family-planning-service-review.component";
import { FamilyPlanningServiceAfraidComponent } from "./individual-details/family-planning-service-afraid/family-planning-service-afraid.component";

import { IndividualOwnesFinesComponent } from "./individual-details/individual-ownes-fines/individual-ownes-fines.component";

import { IncomeendingComponent } from "./income/incomeending/incomeending.component";
import { IncomesummaryComponent } from "./income/incomesummary/incomesummary.component";

import { IncomeFutureJob } from "./income/income-futurejob/income-futurejob.component";
import { IncomeGatepostComponent } from "./income/income-gatepost/income-gatepost.component";
import { IncomeJobDetailsComponent } from "./income/income-jobdetails/income-jobdetails.component";
import { IncomeJobMoreDetailsComponent } from "./income/income-jobmoredetails/income-jobmoredetails.component";
import { IncomeJobSummaryComponent } from "./income/income-jobsummary/income-jobsummary.component";
import { IncomePastJob } from "./income/income-pastjob/income-pastjob.component";
import { IncomePastJobDetailsComponent } from "./income/income-pastjobdetails/income-pastjobdetails.component";
import { OtherIncomeDetailsComponent } from "./income/other-income-details/other-income-details.component";
import { OtherIncomeComponent } from "./income/other-income/other-income.component";
import { OtherIncomeSummaryComponent } from "./income/other-income-summary/other-income-summary.component";
import { IncomePastJobMoreDetailsComponent } from "./income/income-pastjobmoredetails/income-pastjobmoredetails.component";
import { IncomePastJobSummaryComponent } from "./income/income-pastjobsummary/income-pastjobsummary.component";

import { IndividualConvictedWelfareFraudComponent } from "./individual-details/individual-convicted-welfare-fraud/individual-convicted-welfare-fraud.component";
import { IndividualCurrentlyOnProbationComponent } from "./individual-details/individual-currently-on-probation/individual-currently-on-probation.component";
import { IndividualCurrentlyFleeingComponent } from "./individual-details/individual-currently-fleeing/individual-currently-fleeing.component";
import { FederalRecoganizedTribeSummaryComponent } from "./individual-details/federal-recoganized-tribe-summary/federal-recoganized-tribe-summary.component";
import { MedicalConditionComponent } from "./individual-details/medical-condition-selection/medical-condition-selection.component";
import { PaidUnpaidMedicalBillsComponent } from "./individual-details/paid-unpaid-medical-bills/paid-unpaid-medical-bills.component";
import { HealthSustainingMedicationComponent } from "./individual-details/health-sustaining-mediciation/health-sustaining-mediciation.component";
import { PaidUnpaidBillsDetailsComponent } from "./individual-details/paid-unpaid-medical-bills-details/paid-unpaid-medical-bills-details.component";
import { ExpensesComponent } from "./expenses/expenses.component";
import { ExpensesLandingComponent } from "./expenses/expenses-enrollment/expenses-enrollment.component";
import { ExpensesLegalFeeComponent } from "./expenses/expenses-legal-fee/expenses-legal-fee.component";
import { ExpensesLegalFeeSummaryComponent } from "./expenses/expenses-legal-fee-summary/expenses-legal-fee-summary.component";
import { ExpensesGatepostComponent } from "./expenses/expenses-gatepost/expenses-gatepost.component";
import { MedicalConditionDetailsComponent } from "./individual-details/medical-condition-details/medical-condition-details.component";
import { FamilyPlanningServiceSummaryComponent } from "./individual-details/family-planning-service-summary/family-planning-service-summary.component";
import { SupplementalSecurityIncomeSummaryComponent } from "./individual-details/supplemental-security-income-summary/supplemental-security-income-summary.component";
import { MedicalConditionSummaryComponent } from "./individual-details/medical-condition-summary/medical-condition-summary.component";
import { PregnancySummaryScreenComponent } from "./individual-details/pregnancy-summary-screen/pregnancy-summary-screen.component";
import { PregnancyDetailsScreenComponent } from "./individual-details/pregnancy-details-screen/pregnancy-details-screen.component";
import { OtherIncomeAddressComponent } from "./income/other-income-address/other-income-address.component";
import { NoIncomeComponent } from "./income/no-income/no-income.component";
import { OtherIncomeEndmodalComponent } from "./income/other-income-endmodal/other-income-endmodal.component";
import { FinancialdisabilityIncomeComponent } from "./income/financialdisability-income/financialdisability-income.component";

import { ChildSupportExpensesComponent } from "./expenses/child-support-expenses/child-support-expenses.component";
import { ChildSupExpDlsComponent } from "./expenses/child-support-expenses-details/child-support-expenses-details.component";
import { ChildSupExpSumCmp } from "./expenses/child-support-expenses-summary/child-support-expenses-summary.component";
import { AlimonyExpensesComponent } from "./expenses/alimony-expenses/alimony-expenses.component";
import { AlmonyExpDlsComponent } from "./expenses/alimony-expenses-details/alimony-expenses-details.component";
import { AlimonyExpSumCmp } from "./expenses/alimony-expenses-summary/alimony-expenses-summary.component";
import { ChildOrAdultCareExpensesComponent } from "./expenses/child-or-adult-care-expenses/child-or-adult-care-expenses.component";
import { DrinkingWaterCompanyMailingComponent } from "./expenses/drinking-water-company-mailing/drinking-water-company-mailing.component";
import { WaterAssistanceApplicationComponent } from "./expenses/water-assistance-application/water-assistance-application.component";
import { WastewaterProviderComponent } from "./expenses/wastewater-provider/wastewater-provider.component";
import { WastewaterAddressComponent } from "./expenses/wastewater-address/wastewater-address.component";
import { WaterGatepostComponent } from "./expenses/water-gatepost/water-gatepost.component";

import { ExpensesHeatingAssistanceComponent } from "./expenses/expenses-heating-assistance/expenses-heating-assistance.component";
import { ExpensesHeatingGatepostComponent } from "./expenses/expenses-heating-gatepost/expenses-heating-gatepost.component";
import { ExpensesMailingAddressComponent } from "./expenses/expenses-mailing-address/expenses-mailing-address.component";
import { ExpensesUtilityGatepostComponent } from "./expenses/expenses-utility-gatepost/expenses-utility-gatepost.component";
import { ExpensesHouseholdMortgageRentComponent } from "./expenses/expenses-household-mortgage-rent/expenses-household-mortgage-rent.component";
import { ExpensesHouseholdPropertyInsuranceComponent } from "./expenses/expenses-household-property-insurance/expenses-household-property-insurance.component";
import { ExpensesSummaryComponent } from "./expenses/expenses-summary/expenses-summary.component";
import { CldOradultExpDlsComponent } from "./expenses/child-or-adult-care-expenses-details/child-or-adult-care-expenses-details.component";
import { CldOradultExpSumCmp } from "./expenses/child-or-adult-care-expenses-summary/child-or-adult-care-expenses-summary.component";
import { TransportationExpensesComponent } from "./expenses/transportation-expenses/transportation-expenses.component";
import { TransportationExpDlsComponent } from "./expenses/transportation-expenses-details/transportation-expenses-details.component";
import { TransportationExpSumCmp } from "./expenses/transportation-expenses-summary/transportation-expenses-summary.component";
import { MedicalExpensesComponent } from "./expenses/medical-expenses/medical-expenses.component";
import { MedicalExpDlsComponent } from "./expenses/medical-expenses-details/medical-expenses-details.component";
import { MedicalExpSumCmp } from "./expenses/medical-expenses-summary/medical-expenses-summary.component";
import { TaxDeductibleExpensesComponent } from "./expenses/tax-deductible-expenses/tax-deductible-expenses.component";
import { TaxDeductibleExpDlsComponent } from "./expenses/tax-deductible-expenses-details/tax-deductible-expenses-details.component";
import { TaxDeductibleSumCmp } from "./expenses/tax-deductible-expenses-summary/tax-deductible-expenses-summary.component";
import { ExpLegalFeeDlsComponent } from "./expenses/expenses-legal-fee-details/expenses-legal-fee-details.component";
import { HousingAssistanceReceivedComponent } from "./expenses/housing-assistance-received/housing-assistance-received.component";
import { SharedExpensesComponent } from "./expenses/shared-expenses/shared-expenses.component";
import { SharedExpenseSummaryComponent } from "./expenses/shared-expense-summary/shared-expense-summary.component";
import { ExpensesEndingComponent } from "./expenses/expenses-ending/expenses-ending.component";
import { ExpensesPropertyTaxDetailsComponent } from "./expenses/expenses-property-tax-details/expenses-property-tax-details.component";
import { VoterRegistrationGettingStartedComponent } from "./voter-registration/voter-registration.component";
import { RequirementQuestionsComponent } from "./voter-registration/requirement-questions/requirement-questions.component";
import { NotEligibleComponent } from "./voter-registration/not-eligible/not-eligible.component";
import { SituationGatepostComponent } from "./voter-registration/situation-gatepost/situation-gatepost.component";
import { PreviousRegistrationComponent } from "./voter-registration/previous-registration/previous-registration.component";
import { ChangeOfAddressComponent } from "./voter-registration/change-of-address/change-of-address.component";
import { ChangeOfNameComponent } from "./voter-registration/change-of-name/change-of-name.component";
import { VoterBasicDetailsComponent } from "./voter-registration/voter-basic-details/voter-basic-details.component";
import { VoterRaceComponent } from "./voter-registration/voter-race/voter-race.component";
import { ResidentialAddressComponent } from "./voter-registration/residential-address/residential-address.component";
import { SelectIdentityVerifyMethodComponent } from "./voter-registration/select-identity-verify-method/select-identity-verify-method.component";
import { VerifyDriversLicenseComponent } from "./voter-registration/verify-drivers-license/verify-drivers-license.component";
import { VerifySsnComponent } from "./voter-registration/verify-ssn/verify-ssn.component";
import { UploadSignatureComponent } from "./voter-registration/upload-signature/upload-signature.component";
import { UploadSignatureSummaryComponent } from "./voter-registration/upload-signature-summary/upload-signature-summary.component";
import { PoliticalPartyComponent } from "./voter-registration/political-party/political-party.component";
import { RegistrationDeclarationsComponent } from "./voter-registration/registration-declarations/registration-declarations.component";
import { WhoFilledFormComponent } from "./voter-registration/who-filled-form/who-filled-form.component";
import { VoterRegistrationEndingComponent } from "./voter-registration/voter-registration-ending/voter-registration-ending.component";
import {DeacGuardService} from "../deac-gaurd.service";
import { ReceivedLongTermServicesSummaryComponent } from "./resources/received-long-term-services-summary/received-long-term-services-summary.component";
import { BurialOrTrustAgreementAdditionalDetailsComponent } from "./resources/burial-or-trust-agreement-additional-details/burial-or-trust-agreement-additional-details.component";
import { VoterAddressReviewComponent } from "./voter-registration/voter-address-review/voter-address-review.component";
import { IncomeJobEndModalComponent } from "./income/income-jobendmodal/income-jobendmodal.component";
import { FinancialHoldingsDetailsComponent } from "./resources/financial-holdings-details/financial-holdings-details.component";

import { ResidentialPropertyOwnersComponent } from "./resources/residential-property-owners/residential-property-owners.component";
import { NonResidentialPropertyAdditionaldetailsComponent } from "./resources/non-residential-property-additionaldetails/non-residential-property-additionaldetails.component";
import { ClosedOrEmptiedAccountComponent } from "./resources/closed-or-emptied-account/closed-or-emptied-account.component";
import { CurrntPolicyHolderComponent } from "./insurance/current-policy/currnt-policy-holder/currnt-policy-holder.component";

import { PolicyCoverageComponent } from "./insurance/common/policy-coverage/policy-coverage.component";
import { PolicyTypeComponent } from "./insurance/common/policy-type/policy-type.component";
import { EmployerPolicyAdditionalDetailComponent } from "./insurance/employer-policy/employer-policy-additional-detail/employer-policy-additional-detail.component";
import { EmployerCoverageSelectionComponent } from "./insurance/employer-policy/employer-coverage-selection/employer-coverage-selection.component";
import { CurrentInsuranceComapnyComponent } from "./insurance/current-policy/current-insurance-comapny/current-insurance-comapny.component";
import { PolicyCoveredByComponent } from "./insurance/common/policy-covered-by/policy-covered-by.component";
import { NotificationPreferencesComponent } from "./review-and-submit/notification-preferences/notification-preferences.component";
import { LgbtqSurveyComponent } from "./review-and-submit/lgbtq-survey/lgbtq-survey.component";
import { RightAndResponsibilitiesComponent } from "./review-and-submit/right-and-responsibilities/right-and-responsibilities.component";

import { MaChipProviderComponent } from "./review-and-submit/ma-chip-provider/ma-chip-provider.component";

import { InsuranceAddressComponent } from "./insurance/common/insurance-address/insurance-address.component";
import { InsuranceSummaryComponent } from "./insurance/common/insurance-summary/insurance-summary.component";
import { CurrentPoilcyEndComponent } from "./insurance/current-policy/current-poilcy-end/current-poilcy-end.component";
import { CurrentPolicyEmployerComponent } from "./insurance/current-policy/current-policy-employer/current-policy-employer.component";
import { PriorInsuranceComapnyComponent } from "./insurance/prior-policy/prior-insurance-comapny/prior-insurance-comapny.component";
import { PriorPoilcyEndComponent } from "./insurance/prior-policy/prior-poilcy-end/prior-poilcy-end.component";
import { PriorPolicyHolderComponent } from "./insurance/prior-policy/prior-policy-holder/prior-policy-holder.component";
import { EmployerOfferedInsuranceGatepostComponent } from "./insurance/gateposts/employer-offered-insurance-gatepost/employer-offered-insurance-gatepost.component";
import { EmployerContactInformationComponent } from "./insurance/employer-policy/employer-contact-information/employer-contact-information.component";
import { EmployerOutOfHouseholdComponent } from "./insurance/employer-policy/employer-out-of-household/employer-out-of-household.component";
import { EmployerPolicyHolderComponent } from "./insurance/employer-policy/employer-policy-holder/employer-policy-holder.component";
import { EmployerPolicyProviderComponent } from "./insurance/employer-policy/employer-policy-provider/employer-policy-provider.component";
import { InsuranceGatepostComponent } from "./insurance/gateposts/insurance-gatepost/insurance-gatepost.component";
import { OutOfHouseholdIformationComponent } from "./insurance/common/out-of-household-iformation/out-of-household-iformation.component";


const routes: Routes = [
  {
    path: "",
    component: ApplyNowComponent,
    canDeactivate: [DeacGuardService],
    children: [
      {
        path: RoutePath.APPLYNOW_GETTINGSTARTED,
        // redirectTo: '',
        // pathMatch: 'full'
        component: GettingStartedComponent,
      },
      {
        path: RoutePath.APPLYNOW_GETTINGSTARTED_IMPORTANTINFORMATION,
        component: ImportantInformationComponent,
      },
      {
        path: RoutePath.APPLYNOW_GETTINGSTARTED_SOMEONEELSE,
        component: SomeoneElseComponent,
      },
      {
        path: RoutePath.APPLYNOW_GETTINGSTARTED_NONMEDICALASSIS,
        component: NonMedicalAssisComponent,
      },
      {
        path: RoutePath.APPLYNOW_GETTINGSTARTED_GATEPOST,
        component: GatepostComponent,
      },
      {
        path: RoutePath.APPLYNOW_GETTINGSTARTED_EXISTINGACCOUNT,
        component: ExistingAccountComponent,
      },
      {
        path: RoutePath.APPLYNOW_GETTINGSTARTED_PROVIDERINFORMATION,
        component: ProviderInformationComponent,
      },
      {
        path: RoutePath.APPLYNOW_GETTINGSTARTED_COMMUNITYORGANIZATION,
        component: CommunityOrganizationComponent,
      },
      {
        path: RoutePath.APPLYNOW_GETTINGSTARTED_NONPROVIDERREGISTRATION,
        component: NonProviderRegistrationComponent,
      },
      {
        path: RoutePath.APPLYNOW_GETTINGSTARTED_COMMUNITYPARTNERPASSWORD,
        component: CommunityPartnerPasswordComponent,
      },
      {
        path: RoutePath.APPLYNOW_GETTINGSTARTED_PREPOPULATEAPPLICATION,
        component: PrePopulateApplicationComponent,
      },
      {
        path: RoutePath.APPLYNOW_GETTINGSTARTED_FAMILYSAFETY,
        component: FamilySafetyComponent,
      },
      {
        path: RoutePath.APPLYNOW_GETTINGSTARTED_GETTINGSTARTEDENDING,
        component: GettingStartedEndingComponent,
      },
      {
        path: RoutePath.APPLYNOW_INDIVIDUALDETAILS,
        component: IndividualDividerComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_BENEFITSNOTRECEIVED}`,
        component: BenefitsNotReceviedComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_BENEFITSNOTRECEIVEDDETAILS}`,
        component: BenefitsNotReceviedDetailsComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_BENEFITSNOTRECEIVEDSUMMARY}`,
        component: BenefitsNotReceviedSummaryComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_PREGNANCYSCREEN}`,
        component: PregnancyScreenComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_PREGNANCYSUMMARYSCREEN}`,
        component: PregnancySummaryScreenComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_PREGNANCYDETAILSSCREEN}`,
        component: PregnancyDetailsScreenComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALINCOMETAXRETURN}`,
        component: FederalIncomeTaxReturnComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_CLAIMTAXDEPENDENT}`,
        component: ClaimTaxDependentScreenComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_WHOWILLBETAXCLAIMED}`,
        component: WhoWillBeTaxClaimedComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_SUMMONSORWARRANT}`,
        component: SummonsOrWarrantsComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALRECOGANIZEDTRIBE}`,
        component: FederalRecoganizedTribeComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALRECOGANIZEDTRIBEINFORMATION}`,
        component: FederalRecoganizedTribeInformationComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALRECOGANIZEDTRIBEINCOME}`,
        component: FederalRecoganizedTribeIncomeComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALRECOGANIZEDTRIBESUMMARY}`,
        component: FederalRecoganizedTribeSummaryComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALINCOMETAXRETURNSUMMARY}`,
        component: FederalIncomeTaxReturnSummaryComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_FilingStatus}`,
        component: FilingJointlyComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_TAXDEPENDENTS}`,
        component: TaxDependentsComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_TAXDEPENDENTSDETAILS}`,
        component: TaxDependentsDetailsComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_TAXDEPENDENTSSUMMARY}`,
        component: TaxDependentsSummaryComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_DOMESTICVIOLENCE}`,
        component: DomesticViolenceComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_BENEFITANDHEALTHSITUATIONS}`,
        component: BenefitsAndHealthSituationComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_CURRENTSNAPORTANFBENEFITS}`,
        component: CurrentSnapOrTanfBenefitsComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_SNAPORTANFBENEFITS}`,
        component: SnapOrTanfBenefitsComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_SNAPORTANFBENEFITSDETAILS}`,
        component: SnapOrTanfBenefitsDetailsComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_SNAPORTANFBENEFITSSUMMARY}`,
        component: SnapOrTanfBenefitsSummaryComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_PRIORTANFORCASHASSISTANCE}`,
        component: PriorTanfOrCashAssistanceComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_SOCIALSECURITYDISABILITY}`,
        component: SocialSecurityDisabilityComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_INDIVIDUALSLEGALGATEPOST}`,
        component: IndividualsLegalGatepostComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_CONVICTEDWELFAREFRAUD}`,
        component: IndividualConvictedWelfareFraudComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_CURRENTLYONPROBATION}`,
        component: IndividualCurrentlyOnProbationComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_CURRENTLYFLEEING}`,
        component: IndividualCurrentlyFleeingComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_CURRENTLYINPRISON}`,
        component: CurrentlyInPrisonComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_INCARCERATIONDETAILS}`,
        component: IncarcerationDetailsComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_INCARCERATIONSUMMARY}`,
        component: IncarcerationSummaryComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_INDIVIDUALSMEDICALGATEPOST}`,
        component: IndividualsMedicalGatepostComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_FAMILYPLANNINGSERVICES}`,
        component: FamilyPlanningServicesComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_FAMILYPLANNINGREVIEWREVIEW}`,
        component: FamilyPlanningServiceReviewComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_FAMILYPLANNINGREVIEWREVIEWAFRAID}`,
        component: FamilyPlanningServiceAfraidComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_HOMELESSNESS}`,
        component: HomelessComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_MEDICALCONDITION}`,
        component: MedicalConditionComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_MEDICALCONDITIONDETAILS}`,
        component: MedicalConditionDetailsComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_MEDICALCONDITIONSUMMARY}`,
        component: MedicalConditionSummaryComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_SUSTAININGMEDICATION}`,
        component: HealthSustainingMedicationComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_MEDICALBILLS}`,
        component: PaidUnpaidMedicalBillsComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_MEDICALBILLSDETAILS}`,
        component: PaidUnpaidBillsDetailsComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_MIGRANTORSEASONALFARMWORKER}`,
        component: MigrantOrSeasonalFarmWorkerComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_INDIVIDUALSSUMMARY}`,
        component: IndividualsSummaryComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_INDIVIDUALSENDING}`,
        component: IndividualsEndingComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_FAMILYPLANNINGSUMMARY}`,
        component: FamilyPlanningServiceSummaryComponent,
      },

      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_FAMILYPLANNINGREVIEWREVIEWAFRAID}`,
        component: FamilyPlanningServiceAfraidComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_SUPPLEMENTALSECURITYINCOMESUMMARY}`,
        component: SupplementalSecurityIncomeSummaryComponent,
      },
      {
        path: RoutePath.APPLYNOW_INSURANCE,
        component: InsuranceDividerComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INSURANCE}/${RoutePath.APPLYNOW_INSURANCE_CURRENTPOLICYHOLDER
          }`,
        component: CurrntPolicyHolderComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INSURANCE}/${RoutePath.APPLYNOW_INSURANCE_OUTOFHOUSEPOLICYHOLDER
          }`,
        component: OutOfHouseholdIformationComponent,
      },

      {
        path: `${RoutePath.APPLYNOW_INSURANCE}/${RoutePath.APPLYNOW_INSURANCE_PCOVERAGE}`,
        component: PolicyCoverageComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INSURANCE}/${RoutePath.APPLYNOW_INSURANCE_COVERAGE}`,
        component: PolicyCoverageComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INSURANCE}/${RoutePath.APPLYNOW_INSURANCE_PRIOR_POLICYTYPES}`,
        component: PolicyTypeComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INSURANCE}/${RoutePath.APPLYNOW_INSURANCE_POLICYTYPES}`,
        component: PolicyTypeComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INSURANCE}/${RoutePath.APPLYNOW_INSURANCE_INSURANCEADDRESS}`,
        component: InsuranceAddressComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INSURANCE}/${RoutePath.APPLYNOW_INSURANCE_PRIOR_INSURANCEADDRESS}`,
        component: InsuranceAddressComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INSURANCE}/${RoutePath.APPLYNOW_INSURANCE_COVEREDBY}`,
        component: PolicyCoveredByComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INSURANCE}/${RoutePath.APPLYNOW_INSURANCE_PRIOR_COVEREDBY}`,
        component: PolicyCoveredByComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INSURANCE}/${RoutePath.APPLYNOW_INSURANCE_INSURANCESUMMARY}`,
        component: InsuranceSummaryComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INSURANCE}/${RoutePath.APPLYNOW_INSURANCE_PRIOR_INSURANCESUMMARY}`,
        component: InsuranceSummaryComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INSURANCE}/${RoutePath.APPLYNOW_INSURANCE_EMPLOYER_INSURANCECOMPANY}`,
        component: InsuranceSummaryComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INSURANCE}/${RoutePath.APPLYNOW_INSURANCE_INSURANCECOMPANY}`,
        component: CurrentInsuranceComapnyComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INSURANCE}/${RoutePath.APPLYNOW_INSURANCE_PRIORPOLICY_COMAPNY}`,
        component: CurrentInsuranceComapnyComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INSURANCE}/${RoutePath.APPLYNOW_INSURANCE_CURRENTPOLICY_END}`,
        component: CurrentPoilcyEndComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INSURANCE}/${RoutePath.APPLYNOW_INSURANCE_CURRENTPOLICY_EMPLOYMENT}`,
        component: CurrentPolicyEmployerComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INSURANCE}/${RoutePath.APPLYNOW_INSURANCE_PRIORPOLICY_COMAPNY}`,
        component: PriorInsuranceComapnyComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INSURANCE}/${RoutePath.APPLYNOW_INSURANCE_PRIORPOLICY_END}`,
        component: PriorPoilcyEndComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INSURANCE}/${RoutePath.APPLYNOW_INSURANCE_PRIORPOLICY_HOLDER}`,
        component: PriorPolicyHolderComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INSURANCE}/${RoutePath.APPLYNOW_INSURANCE_EMPLOYER_OFFEREDINSURANCE_GATEPOST}`,
        component: EmployerOfferedInsuranceGatepostComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INSURANCE}/${RoutePath.APPLYNOW_INSURANCE_INSURANCE_GATEPOST}`,
        component: InsuranceGatepostComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INSURANCE}/${RoutePath.APPLYNOW_INSURANCE_EMPLOYER_CONTACT}`,
        component: EmployerContactInformationComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INSURANCE}/${RoutePath.APPLYNOW_INSURANCE_EMPLOYER_COVERAGE_SELECTION}`,
        component: EmployerCoverageSelectionComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INSURANCE}/${RoutePath.APPLYNOW_INSURANCE_EMPLOYER_OUTOFHOUSEHOLD}`,
        component: EmployerOutOfHouseholdComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INSURANCE}/${RoutePath.APPLYNOW_INSURANCE_EMPLOYER_ADDTIONALDETAIL}`,
        component: EmployerPolicyAdditionalDetailComponent,
      },


      {
        path: `${RoutePath.APPLYNOW_INSURANCE}/${RoutePath.APPLYNOW_INSURANCE_EMPLOYER_POLICY_HOLDER}`,
        component: EmployerPolicyHolderComponent,
      },

      {
        path: `${RoutePath.APPLYNOW_INSURANCE}/${RoutePath.APPLYNOW_INSURANCE_EMPLOYER_POLICY_PROVIDER}`,
        component: EmployerPolicyProviderComponent,
      },


      {
        path: RoutePath.APPLYNOW_REVIEWANDSUBMIT,
        children: [
          {
            path: '',
            component: RsdvdDividerComponent
          },
          {
            path: RoutePath.APPLYNOW_REVIEWANDSUBMIT_RSADBADDBENEFITS,
            component: RsadbAddBenefitsComponent,
          },

          {
            path: RoutePath.APPLYNOW_REVIEWANDSUBMIT_LGBTQSURVEY,
            component: LgbtqSurveyComponent
          }
        ]
      },
      {
        path: `${RoutePath.APPLYNOW_REVIEWANDSUBMIT}/${RoutePath.APPLYNOW_REVIEWANDSUBMIT_NOTIFICATIONPREFERENCES}`,
        component: NotificationPreferencesComponent,
      },
       {
            path: `${RoutePath.APPLYNOW_REVIEWANDSUBMIT}/${RoutePath.APPLYNOW_REVIEWANDSUBMIT_MACHIPPROVIDER}`,
            component: MaChipProviderComponent,
          },
      {
        path: `${RoutePath.APPLYNOW_REVIEWANDSUBMIT}/${RoutePath.APPLYNOW_REVIEWANDSUBMIT_RIGHTSANDRESPONSIBILITIES}`,
        component: RightAndResponsibilitiesComponent,
      },
      {
        path: RoutePath.APPLYNOW_EXPENSES,
        children: [
          { path: "", component: ExpensesComponent },
          {
            path: RoutePath.APPLYNOW_EXPENSESENROLLMENT,
            component: ExpensesLandingComponent,
          },
          {
            path: RoutePath.APPLYNOW_EXPENSESLEGALFEE,
            component: ExpensesLegalFeeComponent,
          },
{
            path: RoutePath.APPLYNOW_EXPENSES_LEGALFEE_DETAILS,
            component: ExpLegalFeeDlsComponent,
          },

          {
            path: RoutePath.APPLYNOW_EXPENSESLEGALFEESUMMARY,
            component: ExpensesLegalFeeSummaryComponent,
          },

          {
            path: RoutePath.APPLYNOW_EXPENSES_GATEPOST,
            component: ExpensesGatepostComponent,
          },
          {
            path: RoutePath.APPLYNOW_CHILD_SUPPORT_EXPENSES,
            component: ChildSupportExpensesComponent,
          },
          {
            path: RoutePath.APPLYNOW_CHILD_SUPPORT_EXPENSESE_DETAILS,
            component: ChildSupExpDlsComponent,
          },
          {
            path: RoutePath.APPLYNOW_CHILD_SUPPORT_EXPENSESE_SUMMARY,
            component: ChildSupExpSumCmp,
          },
          {
            path: RoutePath.APPLYNOW_ALIMONY_EXPENSES,
            component: AlimonyExpensesComponent,
          },
          {
            path: RoutePath.APPLYNOW_ALIMONY_EXPENSES_DETAILS,
            component: AlmonyExpDlsComponent,
          },
          {
            path: RoutePath.APPLYNOW_ALIMONY_EXPENSES_SUMMARY,
            component: AlimonyExpSumCmp,
          },
          {
            path: RoutePath.APPLYNOW_CHILD_OR_ADULUT_CARE_EXPENSES,
            component: ChildOrAdultCareExpensesComponent,
          },
          {
            path: RoutePath.APPLYNOW_EXPENSESDRINKINGWATERCOMPANYMAILING,
            component: DrinkingWaterCompanyMailingComponent,
          },
          {
            path: RoutePath.APPLYNOW_EXPENSESWATERASSISTANCEAPPLICATION,
            component: WaterAssistanceApplicationComponent,
          },
          {
            path: RoutePath.APPLYNOW_EXPENSESWASTEWATERPROVIDER,
            component: WastewaterProviderComponent,
          },
          {
            path: RoutePath.APPLYNOW_EXPENSESWASTEWATERADDRESS,
            component: WastewaterAddressComponent,
          },
          {
            path: RoutePath.APPLYNOW_EXPENSESWATERGATEPOST,
            component: WaterGatepostComponent,
          },

          {
            path: RoutePath.APPLYNOW_CHILD_OR_ADULUT_CARE_EXPENSES_DETAILS,
            component: CldOradultExpDlsComponent,
          },
          {
            path: RoutePath.APPLYNOW_CHILD_OR_ADULUT_CARE_EXPENSES_SUMMARY,
            component: CldOradultExpSumCmp,
          },
          {
            path: RoutePath.APPLYNOW_TRANSPORTATION_EXPENSES,
            component: TransportationExpensesComponent,
          },
          {
            path: RoutePath.APPLYNOW_TRANSPORTATION_EXPENSES_DETAILS,
            component: TransportationExpDlsComponent,
          },
          {
            path: RoutePath.APPLYNOW_TRANSPORTATION_EXPENSES_SUMMARY,
            component: TransportationExpSumCmp,
          },
          {
            path: RoutePath.APPLYNOW_MEDICAL_EXPENSES,
            component: MedicalExpensesComponent,
          },

          {
            path: RoutePath.APPLYNOW_MEDICAL_EXPENSES_DETAILS,
            component: MedicalExpDlsComponent,
          },
          {
            path: RoutePath.APPLYNOW_MEDICAL_EXPENSES_SUMMARY,
            component: MedicalExpSumCmp
          },
          {
            path: RoutePath.APPLYNOW_TAX_DEDUCTIBLE_EXPENSES,
            component: TaxDeductibleExpensesComponent
          },

          {
            path: RoutePath.APPLYNOW_TAX_DEDUCTIBLE_EXPENSES_DETAILS,
            component: TaxDeductibleExpDlsComponent
          },

          {
            path: RoutePath.APPLYNOW_TAX_DEDUCTIBLE_EXPENSES_SUMMARY,
            component: TaxDeductibleSumCmp
          },

          {
            path: RoutePath.APPLYNOW_HOUSING_ASSISTANCE_RECEIVED,
            component: HousingAssistanceReceivedComponent
          },

          {
            path: RoutePath.APPLYNOW_EXPENSES_PROPERTYTAXDETAILS,
            component: ExpensesPropertyTaxDetailsComponent
          },
          {
            path: RoutePath.APPLYNOW_EXPENSES_PROPERTYINSURANCEDETAILS,
            component: ExpensesHouseholdPropertyInsuranceComponent
          },

          {
            path: RoutePath.APPLYNOW_SHARED_EXPENSES_DETAILS,
            component: SharedExpensesComponent
          },

          {
            path: RoutePath.APPLYNOW_SHARED_EXPENSES_SUMMARY,
            component: SharedExpenseSummaryComponent
          },

          {
            path: RoutePath.APPLYNOW_EXPENSESHEATINGASSISTANCE,
            component: ExpensesHeatingAssistanceComponent,
          },
          {
            path: RoutePath.APPLYNOW_EXPENSESHEATINGGATEPOST,
            component: ExpensesHeatingGatepostComponent,
          },
          {
            path: RoutePath.APPLYNOW_EXPENSESMAILINGADDRESS,
            component: ExpensesMailingAddressComponent,
          },
          {
            path: RoutePath.APPLYNOW_EXPENSESUTILITYGATEPOST,
            component: ExpensesUtilityGatepostComponent,
          },
          {
            path: RoutePath.APPLYNOW_EXPENSESHOUSEHOLDMORTGAGERENT,
            component: ExpensesHouseholdMortgageRentComponent,
          },
          {
            path: RoutePath.APPLYNOW_EXPENSESHOUSEHOLDPROPERTYINSURANCE,
            component: ExpensesHouseholdPropertyInsuranceComponent,
          },
          {
            path: RoutePath.APPLYNOW_EXPENSESSUMMARY,
            component: ExpensesSummaryComponent,
          },
          {
            path: RoutePath.APPLYNOW_TRANSPORTATION_EXPENSES_DETAILS,
            component: AlmonyExpDlsComponent,
          },

          {
            path: RoutePath.APPLYNOW_EXPENSESENDING,
            component: ExpensesEndingComponent
          }
        ],
      },
      {
        path: RoutePath.APPLYNOW_INCOME,
        loadChildren: () =>
          import("./income/income.module").then(
            (m) => m.IncomeModule
          ),
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_GENERAL_DETAILS}`,
        loadChildren: () =>
          import(
            "./individual-details/general-details/general-details.module"
          ).then((m) => m.GeneralDetailsModule),
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_RACE}`,
        loadChildren: () =>
          import("./individual-details/race/race.module").then(
            (m) => m.RaceModule
          ),
      },

      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_SOCAIL_SECURITY_NUMBER}`,
        loadChildren: () =>
          import(
            "./individual-details/social-security-number/social-security-number.module"
          ).then((m) => m.SocialSecurityNumberModule),
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_VOTER_REGISTRATION}`,
        loadChildren: () =>
          import(
            "./individual-details/voter-registration/voter-registration.module"
          ).then((m) => m.VoterRegistrationModule),
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_DRIVING_LICENSE}`,
        loadChildren: () =>
          import(
            "./individual-details/driving-license/driving-license.module"
          ).then((m) => m.DrivingLicenseModule),
      },

      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_CITIZENSHIP}`,
        component: CitizenshipComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_ORG_SPONSOR_DETAILS}`,
        component: OrgSponsorDetailsComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVDUAL_SPONSOR_DETAILS}`,
        component: IndividualSponsorDetailsComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_PRIMARY_CARETACKER}`,
        component: PrimaryCaretakerComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_FOSTER_CARE_DETAILS}`,
        component: FosterCareDetailsComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_CHILD_CARE_SERVICE}`,
        component: ChildCareServiceComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_DEMOGRAPHIC_SUMMARY}`,
        component: DemographicSummaryComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_NATIONAL_SCHOOL_LUNCH_PROGRAM}`,
        component: NationalSchoolLunchProgramComponent,
      },

      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_PUBLIC_SCHOOL_DETAILS}`,
        component: PublicSchoolDetailsComponent,
      },

      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_CHARTER_SCHOOL_DETAILS}`,
        component: CharterSchoolDetailsComponent,
      },

      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_NSLP_SUMMARY}`,
        component: NSLPSummaryComponent,
      },

      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUAL_GATEPOST}`,
        component: IndividualsGatepostComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_WHO_CURRENT_STUDENT}`,
        component: CurrentStudentComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_CURRENT_EDUCATON_DETAILS}`,
        component: CurrentEducationDetailsComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_CURRENT_EDUCATON_SUMMARY}`,
        component: CurrentEducationSummaryComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_ADULT_FOSTER_DETAILS}`,
        component: AdultFosterCareDetailsComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_WHO_TRAIN}`,
        component: WhoTrainingComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_TRAINING_DETAILS}`,
        component: TrainingDetailsComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_TRAINING_SUMMARY}`,
        component: TrainingSummaryComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_CURRENT_PAST_MILATARY_MEMEBER}`,
        component: MilataryMemberComponent,
      },

      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_MILATARY_STATUS}`,
        component: MilataryStatusComponent,
      },

      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUAL_MILATARY_DETAILS}`,
        component: IndividaulMilataryDetailsComponent,
      },

      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_MILATARY_SUMMARY}`,
        component: MilatarySummaryComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUAL_VETERAN_RELATIVE_DETAILS}`,
        component: IndividaulVeteranRelativeDetailsComponent,
      },

      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_WHO_VETERAN_RELATIVE}`,
        component: WhoVeteranRelativesComponent,
      },

      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_VETERAN_MILATARY_SUMMARY}`,
        component: VeteranMilatarySummaryComponent,
      },

      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_ADDITIONAL_CONTACT}`,
        component: AdditionalContactComponent,
      },

      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_ADDITIONAL_CONTACT_DETAILS}`,
        component: AdditionalContactDetailsComponent,
      },

      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_ADDITIONAL_CONTACT_MORE_DETAILS}`,
        component: AdditionalContactMoreDetailsComponent,
      },

      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_ADDITIONAL_CONTACT_SUMMARY}`,
        component: AdditionalContactSummaryComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_SUPPLEMENTALSECURITYINCOME}`,
        component: SupplementalSecurityIncomeComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_SUPPLEMENTALSECURITYDISABILITY}`,
        component: SupplementalSecurityDisabilityComponent,
      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_SUPPLEMENTALSECURITYINCOMEDETAIL}`,
        component: SupplementalSecurityIncomeDetailsComponent,
      },
      {
        path: RoutePath.APPLYNOW_INCOME,
        children: [
          {
            path: RoutePath.APPLYNOW_INCOME_INCOMEGATEPOST,
            component: IncomeGatepostComponent,
          },
          {
            path: RoutePath.APPLYNOW_INCOME_FUTUREJOB,
            component: IncomeFutureJob,
          },
          {
            path: RoutePath.APPLYNOW_INCOME_JOBDETAILS,
            component: IncomeJobDetailsComponent,
          },
          {
            path: RoutePath.APPLYNOW_INCOME_JOBMOREDETAILS,
            component: IncomeJobMoreDetailsComponent,
          },
          {
            path: RoutePath.APPLYNOW_INCOME_INCOMEJOBSUMMARY,
            component: IncomeJobSummaryComponent,
          },
          {
            path: RoutePath.APPLYNOW_INCOME_INCOMEJOBENDMODAL,
            component: IncomeJobEndModalComponent,
          },
          {
            path: RoutePath.APPLYNOW_INCOME_PASTJOB,
            component: IncomePastJob,
          },
          {
            path: RoutePath.APPLYNOW_INCOME_PASTJOBDETAILS,
            component: IncomePastJobDetailsComponent,
          },
          {
            path: RoutePath.APPLYNOW_INCOME_PASTJOBMOREDETAILS,
            component: IncomePastJobMoreDetailsComponent,
          },
          {
            path: RoutePath.APPLYNOW_INCOME_INCOMEPASTJOBSUMMARY,
            component: IncomePastJobSummaryComponent,
          },
          {
            path: RoutePath.APPLYNOW_INCOME_DISABILITYFINANCIALASSISTANCE,
            component: FinancialdisabilityIncomeComponent,
          },
          {
            path: RoutePath.APPLYNOW_INCOME_OTHERINCOME,
            component: OtherIncomeComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INCOME_OTHERINCOME}/${RoutePath.APPLYNOW_INCOME_OTHERINCOMEDETAILS}`,
            component: OtherIncomeDetailsComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INCOME_OTHERINCOME}/${RoutePath.APPLYNOW_INCOME_OTHERINCOME_ADDRESS}`,
            component: OtherIncomeAddressComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INCOME_OTHERINCOME}/${RoutePath.APPLYNOW_INCOME_OTHERINCOMESUMMARY}`,
            component: OtherIncomeSummaryComponent,
          },

          {
            path: `${RoutePath.APPLYNOW_INCOME_OTHERINCOME}/${RoutePath.APPLYNOW_INCOME_OTHERINCOMEENDMODAL}`,
            component: OtherIncomeEndmodalComponent,
          },

          { path: RoutePath.APPLYNOW_NO_INCOME, component: NoIncomeComponent },
          { path: RoutePath.APPLYNOW_INCOME_ENDING, component: IncomeendingComponent },
          { path: RoutePath.APPLYNOW_INCOME_SUMMARY, component: IncomesummaryComponent }

        ]

      },
      {
        path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_OWNESFINES}`,
        component: IndividualOwnesFinesComponent,
      },
      {
        path: RoutePath.APPLYNOW_HOUSEHOLD,
        children: [
          { path: "", component: HouseholdComponent },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDHEAD,
            component: HouseholdHeadComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDHEADSELECTION,
            component: HouseholdHeadSelectionComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDANOTHERPERSON,
            component: HouseholdAnotherPersonComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDMEMBERSUMMARY,
            component: HouseholdMemberSummaryComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDMEMBERSITUATIONGATEPOST,
            component: HouseholdMemberSituationGatepostComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDELECTRICPROVIDER,
            component: HouseholdElectricProviderComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDFACILITYSCREEN,
            component: HouseholdFacilityScreenComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDBENEFITS,
            component: HouseholdBenefitsComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDBENEFITSCOVERAGE,
            component: HouseholdBenefitsCoverageComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSNAPSCREEN,
            component: HouseholdSnapScreenComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSNAPDISABILITY,
            component: HouseholdSnapDisabilityComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDCASHASSISTANCE,
            component: HouseholdCashAssistanceComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDCHILDCARECOST,
            component: HouseholdChildCareCostComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSCHOOLMEALS,
            component: HouseholdSchoolMealsComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDLONGTERMLIVINGSERVICES,
            component: HouseholdLongtermlivingServicesComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDADDRESS,
            component: HouseholdAddressComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDREVIEWADDRESS,
            component: HouseholdReviewAddressComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDPREVIOUSADDRESS,
            component: HouseholdPreviousAdderssComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDLIVEDINPA,
            component: HouseholdLivedComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDCONTACTINFO,
            component: HouseholContactInfoComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDQUICKSNAPEND,
            component: HouseholdQuickSnapEndComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDLIVINGSIS,
            component: HouseholdLivingSistuationComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSITUATION,
            component: HouseholdSituationComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDWATERQUES,
            component: HouseholWaterComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDGATEPOST,
            component: HouseholdGatepostComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDUTILITYALLOW,
            component: HouseholdUtilityAllowComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDCOUNTRYRECORDNO,
            component: HouseholdCountryRecNoComponent,
          },

          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDAPPLIEDBEFORE,
            component: HouseholdAppliedBeforeComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDFOODSTAMPS,
            component: HouseholdFoodStampsComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVEDETAILS,
            component: AbsentRelativeDetailsComponent,
          },

          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVERACE,
            component: AbsentRelativeRaceComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_NURSINGFACILITYDETAILS,
            component: NursingFacilityDetailsComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVERESPONSIBLEFOR,
            component: AbsentRelativeResponsibleForComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVEADDRESS,
            component: AbsentRelativeAddressComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVEEMPLOYERDETAILS,
            component: AbsentRelativeEmployerDetailsComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDABSENTRELATIVENONRESIDENTIALPROPERTY,
            component:
              HouseholdAbsentRelativeNonresidentialpropertyComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDABSENTRELATIVECHILDSUPPORT,
            component: HouseholdAbsentRelativeChildsupportComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDABSENTRELATIVECHILDSUPPORTSCREEN,
            component:
              HouseholdAbsentRelativeChildsupportDetailsComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDABSENTRELATIVESUMMARY,
            component: HouseholdAbsentRelativeSummaryComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDCRIMEHISTORY,
            component: HouseholdCriminalHistoryComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDFINE,
            component: HouseholdFineComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDFRAUD,
            component: HouseholdFraudComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDINCAR,
            component: HouseholdIncarcerationComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSUMMARY,
            component: HouseholdSummaryComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDENDING,
            component: HouseholdEndingComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDOUTSIDEPERSON,
            component: HouseholdOutsidePersonComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDLTCNURSING,
            component: HouseholdLtcNursingComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDWHOAPPLYLTC,
            component: HouseholdWhoApplyLtcComponent,
          },
          {
            path: RoutePath.APPLYNOW_GETTINGSTARTED,
            // redirectTo: '',
            // pathMatch: 'full'
            component: GettingStartedComponent,
          },
          {
            path: RoutePath.APPLYNOW_GETTINGSTARTED_IMPORTANTINFORMATION,
            component: ImportantInformationComponent,
          },
          {
            path: RoutePath.APPLYNOW_GETTINGSTARTED_GATEPOST,
            component: GatepostComponent,
          },
          {
            path: RoutePath.APPLYNOW_GETTINGSTARTED_EXISTINGACCOUNT,
            component: ExistingAccountComponent,
          },
          {
            path: RoutePath.APPLYNOW_GETTINGSTARTED_PROVIDERINFORMATION,
            component: ProviderInformationComponent,
          },
          {
            path: RoutePath.APPLYNOW_GETTINGSTARTED_COMMUNITYORGANIZATION,
            component: CommunityOrganizationComponent,
          },
          {
            path: RoutePath.APPLYNOW_GETTINGSTARTED_PREPOPULATEAPPLICATION,
            component: PrePopulateApplicationComponent,
          },
          {
            path: RoutePath.APPLYNOW_GETTINGSTARTED_FAMILYSAFETY,
            component: FamilySafetyComponent,
          },
          {
            path: RoutePath.APPLYNOW_GETTINGSTARTED_GETTINGSTARTEDENDING,
            component: GettingStartedEndingComponent,
          },
          {
            path: RoutePath.APPLYNOW_INDIVIDUALDETAILS,
            component: IndividualDividerComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_BENEFITSNOTRECEIVED}`,
            component: BenefitsNotReceviedComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_BENEFITSNOTRECEIVEDDETAILS}`,
            component: BenefitsNotReceviedDetailsComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_BENEFITSNOTRECEIVEDSUMMARY}`,
            component: BenefitsNotReceviedSummaryComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_PREGNANCYSCREEN}`,
            component: PregnancyScreenComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_PREGNANCYSUMMARYSCREEN}`,
            component: PregnancySummaryScreenComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_PREGNANCYDETAILSSCREEN}`,
            component: PregnancyDetailsScreenComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALINCOMETAXRETURN}`,
            component: FederalIncomeTaxReturnComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_CLAIMTAXDEPENDENT}`,
            component: ClaimTaxDependentScreenComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_WHOWILLBETAXCLAIMED}`,
            component: WhoWillBeTaxClaimedComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_SUMMONSORWARRANT}`,
            component: SummonsOrWarrantsComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALRECOGANIZEDTRIBE}`,
            component: FederalRecoganizedTribeComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALRECOGANIZEDTRIBEINFORMATION}`,
            component: FederalRecoganizedTribeInformationComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALRECOGANIZEDTRIBEINCOME}`,
            component: FederalRecoganizedTribeIncomeComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALRECOGANIZEDTRIBESUMMARY}`,
            component: FederalRecoganizedTribeSummaryComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALINCOMETAXRETURNSUMMARY}`,
            component: FederalIncomeTaxReturnSummaryComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_FilingStatus}`,
            component: FilingJointlyComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_TAXDEPENDENTS}`,
            component: TaxDependentsComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_TAXDEPENDENTSDETAILS}`,
            component: TaxDependentsDetailsComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_TAXDEPENDENTSSUMMARY}`,
            component: TaxDependentsSummaryComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_DOMESTICVIOLENCE}`,
            component: DomesticViolenceComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_SNAPORTANFBENEFITS}`,
            component: SnapOrTanfBenefitsComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_SNAPORTANFBENEFITSDETAILS}`,
            component: SnapOrTanfBenefitsDetailsComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_SNAPORTANFBENEFITSSUMMARY}`,
            component: SnapOrTanfBenefitsSummaryComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_FAMILYPLANNINGSERVICES}`,
            component: FamilyPlanningServicesComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_HOMELESSNESS}`,
            component: HomelessComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_MEDICALCONDITION}`,
            component: MedicalConditionComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_SUSTAININGMEDICATION}`,
            component: HealthSustainingMedicationComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_MEDICALBILLS}`,
            component: PaidUnpaidMedicalBillsComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_MEDICALBILLSDETAILS}`,
            component: PaidUnpaidBillsDetailsComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_MIGRANTORSEASONALFARMWORKER}`,
            component: MigrantOrSeasonalFarmWorkerComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_INDIVIDUALSSUMMARY}`,
            component: IndividualsSummaryComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_INDIVIDUALDETAILS_INDIVIDUALSENDING}`,
            component: IndividualsEndingComponent,
          },


          {
            path: RoutePath.APPLYNOW_REVIEWANDSUBMIT,
            component: RsdvdDividerComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_REVIEWANDSUBMIT}/${RoutePath.APPLYNOW_REVIEWANDSUBMIT_RSADBADDBENEFITS}`,
            component: RsadbAddBenefitsComponent,
          },
          {
            path: RoutePath.APPLYNOW_EXPENSES,
            loadChildren: () =>
              import("./expenses/expenses.module").then(
                (m) => m.ExpensesModule
              ),
          },
          {
            path: RoutePath.APPLYNOW_INCOME,
            loadChildren: () =>
              import("./income/income.module").then(
                (m) => m.IncomeModule
              ),
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_GENERAL_DETAILS}`,
            loadChildren: () =>
              import(
                "./individual-details/general-details/general-details.module"
              ).then((m) => m.GeneralDetailsModule),
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_RACE}`,
            loadChildren: () =>
              import(
                "./individual-details/race/race.module"
              ).then((m) => m.RaceModule),
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_SOCAIL_SECURITY_NUMBER}`,
            loadChildren: () =>
              import(
                "./individual-details/social-security-number/social-security-number.module"
              ).then((m) => m.SocialSecurityNumberModule),
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_VOTER_REGISTRATION}`,
            loadChildren: () =>
              import(
                "./individual-details/voter-registration/voter-registration.module"
              ).then((m) => m.VoterRegistrationModule),
          },
          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_DRIVING_LICENSE}`,
            loadChildren: () =>
              import(
                "./individual-details/driving-license/driving-license.module"
              ).then((m) => m.DrivingLicenseModule),
          },

          {
            path: `${RoutePath.APPLYNOW_INDIVIDUALDETAILS}/${RoutePath.APPLYNOW_CITIZENSHIP}`,
            component: CitizenshipComponent,
          },
          {
            path: RoutePath.APPLYNOW_HOUSEHOLD,
            children: [
              { path: "", component: HouseholdComponent },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDHEAD,
                component: HouseholdHeadComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDHEADSELECTION,
                component: HouseholdHeadSelectionComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDANOTHERPERSON,
                component: HouseholdAnotherPersonComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDMEMBERSUMMARY,
                component: HouseholdMemberSummaryComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDMEMBERSITUATIONGATEPOST,
                component:
                  HouseholdMemberSituationGatepostComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDFACILITYSCREEN,
                component: HouseholdFacilityScreenComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDBENEFITS,
                component: HouseholdBenefitsComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDBENEFITSCOVERAGE,
                component: HouseholdBenefitsCoverageComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSNAPSCREEN,
                component: HouseholdSnapScreenComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSNAPDISABILITY,
                component: HouseholdSnapDisabilityComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDCASHASSISTANCE,
                component: HouseholdCashAssistanceComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDCHILDCARECOST,
                component: HouseholdChildCareCostComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSCHOOLMEALS,
                component: HouseholdSchoolMealsComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDLONGTERMLIVINGSERVICES,
                component:
                  HouseholdLongtermlivingServicesComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDADDRESS,
                component: HouseholdAddressComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDREVIEWADDRESS,
                component: HouseholdReviewAddressComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDPREVIOUSADDRESS,
                component: HouseholdPreviousAdderssComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDLIVEDINPA,
                component: HouseholdLivedComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDCONTACTINFO,
                component: HouseholContactInfoComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDQUICKSNAPEND,
                component: HouseholdQuickSnapEndComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDLIVINGSIS,
                component: HouseholdLivingSistuationComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSITUATION,
                component: HouseholdSituationComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDWATERQUES,
                component: HouseholWaterComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDGATEPOST,
                component: HouseholdGatepostComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDUTILITYALLOW,
                component: HouseholdUtilityAllowComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDCOUNTRYRECORDNO,
                component: HouseholdCountryRecNoComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDAPPLIEDBEFORE,
                component: HouseholdAppliedBeforeComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDFOODSTAMPS,
                component: HouseholdFoodStampsComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDCRIMEHISTORY,
                component: HouseholdCriminalHistoryComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDFINE,
                component: HouseholdFineComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDFRAUD,
                component: HouseholdFraudComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDINCAR,
                component: HouseholdIncarcerationComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSUMMARY,
                component: HouseholdSummaryComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDENDING,
                component: HouseholdEndingComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDOUTSIDEPERSON,
                component: HouseholdOutsidePersonComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDLTCNURSING,
                component: HouseholdLtcNursingComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDWHOAPPLYLTC,
                component: HouseholdWhoApplyLtcComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_NURSINGFACILITYDETAILS,
                component: NursingFacilityDetailsComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVEDETAILS,
                component: AbsentRelativeDetailsComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVERACE,
                component: AbsentRelativeRaceComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVERESPONSIBLEFOR,
                component:
                  AbsentRelativeResponsibleForComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVEADDRESS,
                component: AbsentRelativeAddressComponent,
              },
              {
                path: RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVEEMPLOYERDETAILS,
                component:
                  AbsentRelativeEmployerDetailsComponent,
              },
            ],
          },
          //Resources
          {
            path: RoutePath.APPLYNOW_RESOURCES,
            children: [
              { path: "", component: ResourcesComponent },
              // { path: RoutePath.APPLYNOW_RESOURCES_RESOURCESDIVIDER, component: ResourcesDividerComponent },
              {
                path: RoutePath.APPLYNOW_RESOURCES_RESOURCESGATEPOST,
                component: ResourcesGatepostComponent,
              },
              {
                path: RoutePath.APPLYNOW_RESOURCES_FINANCIALHOLDINGSDETAILS,
                component: FinancialHoldingsDetailsComponent,
              },
              {
                path: `${RoutePath.APPLYNOW_RESOURCES_FINANCIALHOLDINGS}`,
                component: FinancialHoldingsComponent,
              },
              {
                path: `${RoutePath.APPLYNOW_RESOURCES_FINANCIALHOLDINGSSUMMARY}`,
                component: FinancialHoldingsSummaryComponent,
              },
              {
                path: RoutePath.APPLYNOW_RESOURCES_RESIDENTIALPROPERTY,
                component: ResidentialPropertyComponent,
              },
              {
                path: RoutePath.APPLYNOW_RESOURCES_RESIDENTIALPROPERTYDETAILS,
                component: ResidentialPropertyDetailsComponent,
              },
              {
                path: RoutePath.APPLYNOW_RESOURCES_RESIDENTIALPROPERTYOWNERS,
                component: ResidentialPropertyOwnersComponent,
              },
              {
                path: RoutePath.APPLYNOW_RESOURCES_RESIDENTIALPROPERTYSUMMARY,
                component: ResidentialPropertySummaryComponent,
              },
              {
                path: RoutePath.APPLYNOW_RESOURCES_NONRESIDENTIALPROPERTYOWNERS,
                component: NonResidentialPropertyOwnersComponent,
              },
              {
                path: RoutePath.APPLYNOW_RESOURCES_NONRESIDENTIALPROPERTYDETAILS,
                component:
                  NonResidentialPropertyDetailsComponent,
              },
              {
                path: RoutePath.APPLYNOW_RESOURCES_NONRESIDENTIALPROPERTYSUMMARY,
                component:
                  NonResidentialPropertySummaryComponent,
              },
              {
                path: RoutePath.APPLYNOW_RESOURCES_EXPECTEDMONEYSTRUCTURE,
                component: ExpectedMoneyStructureComponent,
              },
              {
                path: RoutePath.APPLYNOW_RESOURCES_EXPECTEDMONEYSTRUCTURESUMMARY,
                component:
                  ExpectedMoneyStructureSummaryComponent,
              },
              {
                path: RoutePath.APPLYNOW_RESOURCES_RESOURCESVEHICLES,
                component: ResourcesVehiclesComponent,
              },
              {
                path: RoutePath.APPLYNOW_RESOURCES_VEHICLEDETAILS,
                component: VehicleDetailsComponent,
              },
              {
                path: RoutePath.APPLYNOW_RESOURCES_VEHICLESUMMARY,
                component: VehicleSummaryComponent,
              },
              {
                path: RoutePath.APPLYNOW_RESOURCES_BURIALSPACES,
                component: BurialSpacesComponent,
              },
              {
                path: RoutePath.APPLYNOW_RESOURCES_BURIALSPACEDETAILS,
                component: BurialSpaceDetailsComponent,
              },
              {
                path: RoutePath.APPLYNOW_RESOURCES_BURIALSPACESSUMMARY,
                component: BurialSpacesSummaryComponent,
              },
              {
                path: RoutePath.APPLYNOW_RESOURCES_BURIALORTRUSTAGREEMENT,
                component: BurialOrTrustAgreementComponent,
              },
              {
                path: RoutePath.APPLYNOW_RESOURCES_BURIALORTRUSTAGREEMENTDETAILS,
                component:
                  BurialOrTrustAgreementDetailsComponent,
              },
              {
                path: RoutePath.APPLYNOW_RESOURCES_BURIALORTRUSTAGREEMENTADDITIONALDETAILS,
                component:
                  BurialOrTrustAgreementAdditionalDetailsComponent,
              },
              {
                path: RoutePath.APPLYNOW_RESOURCES_BURIALORTRUSTAGREEMENTSUMMARY,
                component:
                  BurialOrTrustAgreementSummaryComponent,
              },

              {
                path: RoutePath.APPLYNOW_RESOURCES_CLOSEDOREMPTIEDACCOUNTDETAILS,
                component: ClosedOrEmptiedAccountDetailsComponent,
              },

              {
                path: RoutePath.APPLYNOW_RESOURCES_CLOSEDOREMPTIEDACCOUNTSUMMARY,
                component: ClosedOrEmptiedAccountSummaryComponent,
              },

              {
                path: RoutePath.APPLYNOW_RESOURCES_SOLDORTRANSFERREDRESOURCEDETAILS,
                component: SoldOrTransferredResourceDetailsComponent,
              },

              {
                path: RoutePath.APPLYNOW_RESOURCES_SOLDORTRANSFERREDRESOURCESUMMARY,
                component: SoldOrTransferredResourceSummaryComponent,
              },

              {
                path: RoutePath.APPLYNOW_RESOURCES_RECEIVEDLONGTERMSERVICES,
                component:
                  ReceivedLongTermServicesComponent,
              },

              {
                path: RoutePath.APPLYNOW_RESOURCES_RECEIVEDLONGTERMSERVICESDETAILS,
                component:
                  ReceivedLongTermServicesDetailsComponent,
              },
              {
                path: RoutePath.APPLYNOW_RESOURCES_RECEIVEDLONGTERMSERVICESSUMMARY,
                component:
                  ReceivedLongTermServicesSummaryComponent,
              },

              {
                path: RoutePath.APPLYNOW_RESOURCES_LIFEINSURANCEPOLICIES,
                component: LifeInsurancePoliciesComponent,
              },
              {
                path: RoutePath.APPLYNOW_RESOURCES_LIFEINSURANCEPOLICYDETAILS,
                component: LifeInsurancePolicyDetailsComponent,
              },
              {
                path: RoutePath.APPLYNOW_RESOURCES_COVEREDINDIVIDUALS,
                component: CoveredIndividualsComponent,
              },
              {
                path: RoutePath.APPLYNOW_RESOURCES_LIFEINSURANCEPOLICIESSUMMARY,
                component:
                  LifeInsurancePoliciesSummaryComponent,
              },
              {
                path: RoutePath.APPLYNOW_RESOURCES_CLOSEDOREMPTIEDACCOUNT,
                component:
                  ClosedOrEmptiedAccountComponent,
              },
              {
                path: RoutePath.APPLYNOW_RESOURCES_RESOURCESSUMMARY,
                component: ResourcesSummaryComponent,
              },
              {
                path: RoutePath.APPLYNOW_RESOURCES_RESOURCESENDING,
                component: ResourcesEndingComponent,
              },
            ],
          },
          {
            path: RoutePath.APPLYNOW_INSURANCE,
            loadChildren: () =>
              import("./insurance/insurance.module").then(
                (m) => m.InsuranceModule
              ),
          },
          {
            path: RoutePath.APPLYNOW_REVIEWANDSUBMIT,
            loadChildren: () =>
              import(
                "./review-and-submit/review-and-submit.module"
              ).then((m) => m.ReviewAndSubmitModule),
          },
        ],
      },
      {
        path: RoutePath.APPLYNOW_VOTERREGISTRATION,
        children: [
          {
            path: "",
            component: VoterRegistrationGettingStartedComponent
          },
          {
            path: RoutePath.APPLYNOW_VOTERREGISTRATION_REQUIREMENTQUESTIONS,
            component: RequirementQuestionsComponent
          },
          {
            path: RoutePath.APPLYNOW_VOTERREGISTRATION_NOTELIGIBLE,
            component: NotEligibleComponent
          },
          {
            path: RoutePath.APPLYNOW_VOTERREGISTRATION_SITUATIONGATEPOST,
            component: SituationGatepostComponent
          },
          {
            path: RoutePath.APPLYNOW_VOTERREGISTRATION_PREVIOUSREGISTRATION,
            component: PreviousRegistrationComponent
          },
          {
            path: RoutePath.APPLYNOW_VOTERREGISTRATION_CHANGEOFADDRESS,
            component: ChangeOfAddressComponent
          },
          {
            path: RoutePath.APPLYNOW_VOTERREGISTRATION_CHANGEOFNAME,
            component: ChangeOfNameComponent
          },
          {
            path: RoutePath.APPLYNOW_VOTERREGISTRATION_BASICDETAILS,
            component: VoterBasicDetailsComponent
          },
          {
            path: RoutePath.APPLYNOW_VOTERREGISTRATION_VOTERRACE,
            component: VoterRaceComponent
          },
          {
            path: RoutePath.APPLYNOW_VOTERREGISTRATION_RESIDENTIALADDRESS,
            component: ResidentialAddressComponent
          },
          {
            path: RoutePath.APPLYNOW_VOTERREGISTRATION_VALIDATEADDRESS,
            component: VoterAddressReviewComponent
          },
          {
            path: RoutePath.APPLYNOW_VOTERREGISTRATION_SELECTIDENTITYVERIFYMETHOD,
            component: SelectIdentityVerifyMethodComponent,
          },
          {
            path: RoutePath.APPLYNOW_VOTERREGISTRATION_VERIFYDRIVERSLICENSE,
            component: VerifyDriversLicenseComponent,
          },
          {
            path: RoutePath.APPLYNOW_VOTERREGISTRATION_VERIFYSSN,
            component: VerifySsnComponent
          },
          {
            path: RoutePath.APPLYNOW_VOTERREGISTRATION_UPLOADSIGNATURE,
            component: UploadSignatureComponent
          },
          {
            path: RoutePath.APPLYNOW_VOTERREGISTRATION_UPLOADSIGNATURESUMMARY,
            component: UploadSignatureSummaryComponent
          },
          {
            path: RoutePath.APPLYNOW_VOTERREGISTRATION_POLITICALPARTY,
            component: PoliticalPartyComponent
          },
          {
            path: RoutePath.APPLYNOW_VOTERREGISTRATION_REGISTRATIONDECLARATIONS,
            component: RegistrationDeclarationsComponent
          },
          {
            path: RoutePath.APPLYNOW_VOTERREGISTRATION_WHOFILLEDFORM,
            component: WhoFilledFormComponent
          },
          {
            path: RoutePath.APPLYNOW_VOTERREGISTRATION_VOTERREGISTRATIONENDING,
            component: VoterRegistrationEndingComponent
          }
        ]
      },
      //Resources
      {
        path: RoutePath.APPLYNOW_RESOURCES,
        children: [
          { path: "", component: ResourcesDividerComponent },
          // { path: RoutePath.APPLYNOW_RESOURCES_RESOURCESDIVIDER, component: ResourcesDividerComponent },
          {
            path: RoutePath.APPLYNOW_RESOURCES_RESOURCESGATEPOST,
            component: ResourcesGatepostComponent,
          },
          {
            path: RoutePath.APPLYNOW_RESOURCES_FINANCIALHOLDINGSDETAILS,
            component: FinancialHoldingsDetailsComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_RESOURCES_FINANCIALHOLDINGS}`,
            component: FinancialHoldingsComponent,
          },
          {
            path: `${RoutePath.APPLYNOW_RESOURCES_FINANCIALHOLDINGSSUMMARY}`,
            component: FinancialHoldingsSummaryComponent,
          },
          {
            path: RoutePath.APPLYNOW_RESOURCES_RESIDENTIALPROPERTY,
            component: ResidentialPropertyComponent,
          },
          {
            path: RoutePath.APPLYNOW_RESOURCES_RESIDENTIALPROPERTYOWNERS,
            component: ResidentialPropertyOwnersComponent,
          },
          {
            path: RoutePath.APPLYNOW_RESOURCES_RESIDENTIALPROPERTYDETAILS,
            component: ResidentialPropertyDetailsComponent,
          },
          {
            path: RoutePath.APPLYNOW_RESOURCES_RESIDENTIALPROPERTYSUMMARY,
            component: ResidentialPropertySummaryComponent,
          },
          {
            path: RoutePath.APPLYNOW_RESOURCES_NONRESIDENTIALPROPERTYOWNERS,
            component: NonResidentialPropertyOwnersComponent,
          },
          {
            path: RoutePath.APPLYNOW_RESOURCES_NONRESIDENTIALPROPERTYDETAILS,
            component: NonResidentialPropertyDetailsComponent,
          },
          {
            path: RoutePath.APPLYNOW_RESOURCES_NONRESIDENTIALPROPERTYADDITIONALDETAILS,
            component: NonResidentialPropertyAdditionaldetailsComponent,
          },
          {
            path: RoutePath.APPLYNOW_RESOURCES_NONRESIDENTIALPROPERTYSUMMARY,
            component: NonResidentialPropertySummaryComponent,
          },
          {
            path: RoutePath.APPLYNOW_RESOURCES_EXPECTEDMONEYSTRUCTURE,
            component: ExpectedMoneyStructureComponent,
          },
          {
            path: RoutePath.APPLYNOW_RESOURCES_EXPECTEDMONEYSTRUCTURESUMMARY,
            component: ExpectedMoneyStructureSummaryComponent,
          },
          {
            path: RoutePath.APPLYNOW_RESOURCES_RESOURCESVEHICLES,
            component: ResourcesVehiclesComponent,
          },
          {
            path: RoutePath.APPLYNOW_RESOURCES_VEHICLEDETAILS,
            component: VehicleDetailsComponent,
          },
          {
            path: RoutePath.APPLYNOW_RESOURCES_VEHICLESUMMARY,
            component: VehicleSummaryComponent,
          },
          {
            path: RoutePath.APPLYNOW_RESOURCES_BURIALSPACES,
            component: BurialSpacesComponent,
          },
          {
            path: RoutePath.APPLYNOW_RESOURCES_BURIALSPACEDETAILS,
            component: BurialSpaceDetailsComponent,
          },
          {
            path: RoutePath.APPLYNOW_RESOURCES_BURIALSPACESSUMMARY,
            component: BurialSpacesSummaryComponent,
          },
          {
            path: RoutePath.APPLYNOW_RESOURCES_BURIALORTRUSTAGREEMENT,
            component: BurialOrTrustAgreementComponent,
          },
          {
            path: RoutePath.APPLYNOW_RESOURCES_BURIALORTRUSTAGREEMENTDETAILS,
            component: BurialOrTrustAgreementDetailsComponent,
          },
          {
            path: RoutePath.APPLYNOW_RESOURCES_BURIALORTRUSTAGREEMENTADDITIONALDETAILS,
            component: BurialOrTrustAgreementAdditionalDetailsComponent,
          },
          {
            path: RoutePath.APPLYNOW_RESOURCES_BURIALORTRUSTAGREEMENTSUMMARY,
            component: BurialOrTrustAgreementSummaryComponent,
          },

          {
            path: RoutePath.APPLYNOW_RESOURCES_CLOSEDOREMPTIEDACCOUNTDETAILS,
            component: ClosedOrEmptiedAccountDetailsComponent,
          },

          {
            path: RoutePath.APPLYNOW_RESOURCES_CLOSEDOREMPTIEDACCOUNTSUMMARY,
            component: ClosedOrEmptiedAccountSummaryComponent,
          },

          {
            path: RoutePath.APPLYNOW_RESOURCES_SOLDORTRANSFERREDRESOURCEDETAILS,
            component: SoldOrTransferredResourceDetailsComponent,
          },

          {
            path: RoutePath.APPLYNOW_RESOURCES_SOLDORTRANSFERREDRESOURCESUMMARY,
            component: SoldOrTransferredResourceSummaryComponent,
          },

          {
            path: RoutePath.APPLYNOW_RESOURCES_RECEIVEDLONGTERMSERVICES,
            component: ReceivedLongTermServicesComponent,
          },

          {
            path: RoutePath.APPLYNOW_RESOURCES_RECEIVEDLONGTERMSERVICESDETAILS,
            component: ReceivedLongTermServicesDetailsComponent,
          },
          {
            path: RoutePath.APPLYNOW_RESOURCES_RECEIVEDLONGTERMSERVICESSUMMARY,
            component:
              ReceivedLongTermServicesSummaryComponent,
          },
          {
            path: RoutePath.APPLYNOW_RESOURCES_LIFEINSURANCEPOLICIES,
            component: LifeInsurancePoliciesComponent,
          },
          {
            path: RoutePath.APPLYNOW_RESOURCES_LIFEINSURANCEPOLICYDETAILS,
            component: LifeInsurancePolicyDetailsComponent,
          },

          {
            path: RoutePath.APPLYNOW_RESOURCES_CLOSEDOREMPTIEDACCOUNT,
            component: ClosedOrEmptiedAccountComponent,
          },

          {
            path: RoutePath.APPLYNOW_RESOURCES_COVEREDINDIVIDUALS,
            component: CoveredIndividualsComponent,
          },
          {
            path: RoutePath.APPLYNOW_RESOURCES_LIFEINSURANCEPOLICIESSUMMARY,
            component: LifeInsurancePoliciesSummaryComponent,
          },
          {
            path: RoutePath.APPLYNOW_RESOURCES_RESOURCESSUMMARY,
            component: ResourcesSummaryComponent,
          },
          {
            path: RoutePath.APPLYNOW_RESOURCES_RESOURCESENDING,
            component: ResourcesEndingComponent,
          },
        ],
      },

      {
        path: RoutePath.APPLYNOW_REVIEWANDSUBMIT,
        loadChildren: () =>
          import("./review-and-submit/review-and-submit.module").then(
            (m) => m.ReviewAndSubmitModule
          ),
      },
    ],
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [UiModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplyNowRoutingModule { }
