import { Injectable, } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State as AppState } from './+state';
import * as AppSelectors from './+state/app.selectors'
import { FormControl, FormGroup } from '@angular/forms';
import { AppPageActions } from './+state/actions';
import { HttpCacheService } from 'libs/shared/common/src/lib/services/http-cache.service';
@Injectable({
    providedIn: "root",
})
export class AppStoreService {
    constructor(private appstore: Store<AppState>,
        private cacheService: HttpCacheService) { }
    initData() {
        if (this.cacheService.hasStorageExpired()) this.cacheService.resetCache()
        this.appstore.dispatch(AppPageActions.getPACounties());
        this.appstore.dispatch(AppPageActions.getCountries());
        this.appstore.dispatch(AppPageActions.getCitizenship());
        this.appstore.dispatch(AppPageActions.getDocumentTypes());
        this.appstore.dispatch(AppPageActions.getImmunizations());
        this.appstore.dispatch(AppPageActions.getMaritalStatus());
        this.appstore.dispatch(AppPageActions.getEducations());
        this.appstore.dispatch(AppPageActions.getSchoolDistricts());
        this.appstore.dispatch(AppPageActions.getServiceBranches());
        this.appstore.dispatch(AppPageActions.getStates());
        this.appstore.dispatch(AppPageActions.getAmountPeriodForTribes());
        this.appstore.dispatch(AppPageActions.getContactRoles());
        this.appstore.dispatch(AppPageActions.getPays());
        this.appstore.dispatch(AppPageActions.getSchoolTypes());
        this.appstore.dispatch(AppPageActions.getNSLPSchoolTypes());
        this.appstore.dispatch(AppPageActions.getSchoolGrades());
        this.appstore.dispatch(AppPageActions.getRelationships());
        this.appstore.dispatch(AppPageActions.getElectricCompany());
        this.appstore.dispatch(AppPageActions.getSuffix());
        this.appstore.dispatch(AppPageActions.getTypeofFacility());
        this.appstore.dispatch(AppPageActions.getInsuranceNameType());
        this.appstore.dispatch(AppPageActions.getNumberOfExpectedBabies());
        this.appstore.dispatch(AppPageActions.getBenefitTypes$());
        this.appstore.dispatch(AppPageActions.getRaces());
        this.appstore.dispatch(AppPageActions.getTownShip());
        this.appstore.dispatch(AppPageActions.getLivSituation());
        this.appstore.dispatch(AppPageActions.getHouSituation());
        this.appstore.dispatch(AppPageActions.getMaleInvRelations());
        this.appstore.dispatch(AppPageActions.getFemaleInvRelations());
        this.appstore.dispatch(AppPageActions.getParentSpouseOrBoth());
        this.appstore.dispatch(AppPageActions.getReferralPhonenumbers());
        this.appstore.dispatch(AppPageActions.getCountyOfPlacement());
        this.appstore.dispatch(AppPageActions.getVeteranStatus());
        this.appstore.dispatch(AppPageActions.getDisabilityType());
        this.appstore.dispatch(AppPageActions.getDisabilitySsi());
        this.appstore.dispatch(AppPageActions.getChildDisability());
        this.appstore.dispatch(AppPageActions.getSecurityQuestions());
        this.appstore.dispatch(AppPageActions.getMedicalService());
        this.appstore.dispatch(AppPageActions.getYesNoValues());
        this.appstore.dispatch(AppPageActions.getChildCareDays());


        this.appstore.dispatch(AppPageActions.getHeatingSource());
        this.appstore.dispatch(AppPageActions.getProviderName());
        this.appstore.dispatch(AppPageActions.getMAProviderNumbers());
        this.appstore.dispatch(AppPageActions.getNonMAProviderNumbers());

        this.appstore.dispatch(AppPageActions.getMaleRelationship());
        this.appstore.dispatch(AppPageActions.getFemaleRelationship());
        this.appstore.dispatch(AppPageActions.getHouseHoldExpensesPaid());
        this.appstore.dispatch(AppPageActions.getReasonForEmploymentEnd());
        this.appstore.dispatch(AppPageActions.getUnitTypes());
        this.appstore.dispatch(AppPageActions.getPoliticalParties());
        this.appstore.dispatch(AppPageActions.getElectionDueDates());
        this.appstore.dispatch(AppPageActions.getSituations());
        this.appstore.dispatch(AppPageActions.getApplicationLanguage());
        this.appstore.dispatch(AppPageActions.getLGBTQQuestions());
        this.appstore.dispatch(AppPageActions.getLGBTQAnswers());
        this.appstore.dispatch(AppPageActions.getProgramServices());




    }

    getCounties() {
        return this.appstore.pipe(select(AppSelectors.getCounties));
    }
    getCountries() {
        return this.appstore.pipe(select(AppSelectors.getCountries));
    }
    getDocumentTypes() {
        return this.appstore.pipe(select(AppSelectors.getDocumentTypes));
    }
    getImmunizations() {
        return this.appstore.pipe(select(AppSelectors.getImmunizations));
    }
    getCitizenship() {
        return this.appstore.pipe(select(AppSelectors.getCitizenship));
    }
    getContactRoles() {
        return this.appstore.pipe(select(AppSelectors.getContactRoles));
    }
    getMaritalStatus() {
        return this.appstore.select(AppSelectors.getMaritalStatus);
    }

    getEducationData() {
        return this.appstore.select(AppSelectors.getEducationData);
    }

    getSchoolDistricts() {
        return this.appstore.pipe(select(AppSelectors.getSchoolDistricts));
    }

    getSchoolGrades() {
        return this.appstore.pipe(select(AppSelectors.getSchoolGrades));
    }
    getServiceBranches() {
        return this.appstore.pipe(select(AppSelectors.getServiceBranches));
    }
    getTownShip() {
        return this.appstore.pipe(select(AppSelectors.getTownShip));
    }

    getRelationships() {
        return this.appstore.pipe(select(AppSelectors.relationships));
    }

    getElectricCompany() {
        return this.appstore.pipe(select(AppSelectors.getElectricCompany));
    }

    getParentSpouseOrBoth() {
        return this.appstore.pipe(select(AppSelectors.getParentSpouseOrBoth));
    }

    getCountyOfPlacement() {
        return this.appstore.pipe(select(AppSelectors.getCountyOfPlacement));
    }

    getVeteranStatus() {
        return this.appstore.pipe(select(AppSelectors.getVeteranStatus));
    }

    getDisabilityType() {
        return this.appstore.pipe(select(AppSelectors.getDisabilityType));
    }

    getDisabilitySsi() {
        return this.appstore.pipe(select(AppSelectors.getDisabilitySsi));
    }

    getChildDisability() {
        return this.appstore.pipe(select(AppSelectors.getChildDisability));
    }

    getSuffix() {
        return this.appstore.pipe(select(AppSelectors.getSuffix));
    }

    getTypeofFacility() {
        return this.appstore.pipe(select(AppSelectors.getTypeofFacility));
    }

    getStates() {
        return this.appstore.pipe(select(AppSelectors.getStates));
    }

    getAmountPeriodForTribes() {
        return this.appstore.pipe(
            select(AppSelectors.getAmountPeriodForTribes)
        );
    }

    getPay() {
        return this.appstore.pipe(select(AppSelectors.getPay));
    }

    getLivSituation() {
        return this.appstore.pipe(select(AppSelectors.getLivSituation));
    }

    getHouSituation() {
        return this.appstore.pipe(select(AppSelectors.getHouSituation));
    }

    getInsuranceNameType() {
        return this.appstore.pipe(select(AppSelectors.getInsuranceNameType));
    }
    getSchoolTypes() {
        return this.appstore.select(AppSelectors.getSchoolTypes);
    }

    getNSLPSchoolTypes() {
        return this.appstore.select(AppSelectors.getNSLPSchoolTypes);
    }

    getNumberOfExpectedBabies() {
        return this.appstore.select(AppSelectors.getNumberOfExpectedBabies);
    }

    getBenefitTypes() {
        return this.appstore.select(AppSelectors.getBenefitTypes);
    }

    getRaces() {
        return this.appstore.select(AppSelectors.getRaces);
    }

    getMaleInvRelationships() {
        return this.appstore.select(AppSelectors.getMaleInvrelationships);
    }
    getFemaleInvRelationships() {
        return this.appstore.select(AppSelectors.getFemaleInvrelationships);
    }
    getReferralPhoneNumbers() {
        return this.appstore.select(AppSelectors.getReferralPhonenumbers);
    }
    getSecurityQuestions() {
        return this.appstore.select(AppSelectors.getSecurityQuestions);
    }
    getMedicalService() {
        return this.appstore.select(AppSelectors.getMedicalService);
    }
    getYesNoValues() {
        return this.appstore.select(AppSelectors.getYesNoValues);
    }
    getHeatingSource() {
        return this.appstore.pipe(select(AppSelectors.getHeatingSource));
    }
    getProviderName() {
        return this.appstore.pipe(select(AppSelectors.getProviderName));
    }
    getNeedElectricity() {
        return this.appstore.pipe(select(AppSelectors.getNeedElectricity));
    }
    getChildCareDays() {
        return this.appstore.pipe(select(AppSelectors.getChildCareDays));
    }
    getMAProviderNumbers() {
        return this.appstore.pipe(select(AppSelectors.getMAProviderNumbers));

    }
    getNonMAProvidernumbers() {
        return this.appstore.pipe(select(AppSelectors.getNonMAProviderNumbers));


    }
    getMaleRelationships() {
        return this.appstore.pipe(select(AppSelectors.getMaleRelationship));
    }
    getFemaleRelationships() {
        return this.appstore.pipe(select(AppSelectors.getFemaleRelationship));
    }
    getHouseHoldExpensesPaid() {
        return this.appstore.pipe(select(AppSelectors.getHouseHoldExpensesPaid));
    }
    getReasonForEmploymentEnd() {
        return this.appstore.pipe(select(AppSelectors.getReasonForEmploymentEnd));
    }
    getUnitTypes() {
        return this.appstore.pipe(select(AppSelectors.getUnitTypes));

    }
    getPoliticalParties() {
        return this.appstore.pipe(select(AppSelectors.getPolitcalParties));
    }
    getElectionDueDates() {
        return this.appstore.pipe(select(AppSelectors.getElectionDueDates));
    }
    getSituations() {
        return this.appstore.pipe(select(AppSelectors.getSituations));
    }
    dispatchComapnyNames() {
        this.appstore.dispatch(AppPageActions.getCompanyNames());

    }
    getComapanyNames() {
        return this.appstore.pipe(select(AppSelectors.getInsuranceCompanyNames));
    }
    dispatchPolicyTypes() {
        this.appstore.dispatch(AppPageActions.getPolicyTypes());

    }
    getPolicyTypes() {
        return this.appstore.pipe(select(AppSelectors.getPolicyTypes));
    }
    dispatchPolicyCoverage() {
        this.appstore.dispatch(AppPageActions.getPolicyCoverage());

    }
    getPolicyCoverage() {
        return this.appstore.pipe(select(AppSelectors.getPolicyCoverage));
    }
    dispatchEmployeePolicyCoverage() {
        this.appstore.dispatch(AppPageActions.getEmployerPolicyCoverage());
    }
    getApplicationLanguage() {
        return this.appstore.pipe(select(AppSelectors.getApplicationLanguage));
    }
    getPolicyEmployeeCoverage() {
        return this.appstore.pipe(select(AppSelectors.getPolicyCoverage));
    }
    dispatchEmployerPaidPremiumPolicy() {
        this.appstore.dispatch(AppPageActions.getEmployerPaidPremiumPolicy());

    }
    getEmployerPaidPremiumPolicy() {
        return this.appstore.pipe(select(AppSelectors.getEmployerPaidPremiumPolicy));
    }
    
    dispatchEmployerChangePolicy() {
        this.appstore.dispatch(AppPageActions.getEmployerChangePolicy());

    }
    getEmployerEmployerChangePolicy() {
        return this.appstore.pipe(select(AppSelectors.getEmployerChangePolicy));
    }
    dispatchPay() {
        this.appstore.dispatch(AppPageActions.getPays());

    }
    getPolicyEndCoverage() {
        return this.appstore.pipe(select(AppSelectors.getPolicyEndCoverage));
    }
    dispatchPolicyEndCoverage() {
        this.appstore.dispatch(AppPageActions.getPolicyEndCoverage());

    }
    getLGBTQSurveyAnswers() {
        return this.appstore.pipe(select(AppSelectors.getLGBTQSurveyAnswers));
    }
    getLGBTQSurveyQuestions() {
        return this.appstore.pipe(select(AppSelectors.getLGBTQSurveyQuestions));
    }
    dispatchBenefits() {
        this.appstore.dispatch(AppPageActions.getBenefits());

    }
    getBenefits() {
        return this.appstore.pipe(select(AppSelectors.getbenefits));
    } 
    getProgramServices() {
        return this.appstore.pipe(select(AppSelectors.getProgramServices));
    }
}

