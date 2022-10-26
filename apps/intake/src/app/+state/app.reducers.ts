
import { initialState, State } from './app.state';

import { createReducer, on } from "@ngrx/store";
import * as StateActions from './actions';

export const filteredReducer = createReducer<State>(
    initialState,

    on(StateActions.AppApiActions.SetPACounties, (state, action): State => {
        return {
            ...state,
            ...{ counties: action.counties },
        };
    }),
    on(StateActions.AppApiActions.SetCountries, (state, action): State => {
        return {
            ...state,
            ...{ countries: action.countries },
        };
    }),
    on(StateActions.AppApiActions.loadHouseHoldExpensesPaid, (state, action): State => {
        return {
            ...state,
            ...{ houseHoldExpensesPaid: action.houseHoldExpenses },
        };
    }),
    on(StateActions.AppApiActions.setDocumentTypes, (state, action): State => {
        return {
            ...state,
            ...{ documentTypes: action.documentTypes },
        };
    }),
    on(StateActions.AppApiActions.setImmunizations, (state, action): State => {
        return {
            ...state,
            ...{ immunizations: action.immunizations },
        };
    }),
    on(
        StateActions.AppApiActions.setNumberOfExpectedBabies,
        (state, action): State => {
            return {
                ...state,
                ...{
                    numberOfExpectedBabies: action.numberOfExpectedBabies as [],
                },
            };
        }
    ),
    on(StateActions.AppApiActions.setBenefitTypes, (state, action): State => {
        return {
            ...state,
            ...{
                benefitTypes: action.benefitTypes,
                //benefitTypes: types
            },
        };
    }),
    on(StateActions.AppApiActions.setCitizenship, (state, action): State => {
        return {
            ...state,
            ...{ citizenship: action.citizenship },
        };
    }),

    on(StateActions.AppApiActions.setSchoolDistrict, (state, action): State => {
        return {
            ...state,

            schoolDistrict: action.schoolDistrict,
        };
    }),
    on(
        StateActions.AppApiActions.setServiceBranches,
        (state, action): State => {
            return {
                ...state,

                serviceBranches: action.serviceBranches,
            };
        }
    ),
    on(StateActions.AppApiActions.setContactRoles, (state, action): State => {
        return {
            ...state,
            contactRoles: action.contactRoles,
        };
    }),
    on(StateActions.AppApiActions.setSchoolGrades, (state, action): State => {
        return {
            ...state,
            schoolGrades: action.schoolGrades,
        };
    }),
    on(StateActions.AppApiActions.setStates, (state, action): State => {
        return {
            ...state,

            states: action.state,
        };
    }),

    on(StateActions.AppApiActions.setDrinkingWater, (state, action): State => {
        return {
            ...state,

            drinkingWater: action.drinkingWater,
        };
    }),

    on(StateActions.AppApiActions.setWasteWater, (state, action): State => {
        return {
            ...state,

            wasteWater: action.wasteWater,
        };
    }),

    on(
        StateActions.AppApiActions.setAmountPeriodForTribes,
        (state, action): State => {
            return {
                ...state,
                amountPeriods: action.amountPeriods,
            };
        }
    ),

    on(StateActions.AppApiActions.setPays, (state, action): State => {
        return {
            ...state,

            pays: action.pay,
        };
    }),

    on(StateActions.AppApiActions.setRelationships, (state, action): State => {
        return {
            ...state,
            relationships: action.relationships,
        };
    }),

    on(
        StateActions.AppApiActions.setElectricCompanies,
        (state, action): State => {
            return {
                ...state,
                electricCompaniesList: action.electricCompanies,
            };
        }
    ),
    on(
        StateActions.AppApiActions.setMaleInvRelations,
        (state, action): State => {
            return {
                ...state,
                maleInvRelationships: action.maleInvRelationships,
            };
        }
    ),
    on(
        StateActions.AppApiActions.setFemaleInvRelations,
        (state, action): State => {
            return {
                ...state,
                femaleInvRelationships: action.femaleInvRelationships,
            };
        }
    ),
    on(
        StateActions.AppApiActions.setInsuranceNameType,
        (state, action): State => {
            return {
                ...state,
                insuranceNameType: action.insuranceNameType,
            };
        }
    ),

    on(StateActions.AppApiActions.setSuffix, (state, action): State => {
        return {
            ...state,
            // ...{ suffix: action.suffix },
            suffix: action.suffix,
        };
    }),

    on(StateActions.AppApiActions.setFacilities, (state, action): State => {
        return {
            ...state,
            // ...{ suffix: action.suffix },
            facilities: action.facilities,
        };
    }),

    on(StateActions.AppApiActions.setSchoolTypes, (state, action): State => {
        return {
            ...state,
            schoolTypes: action.schoolTypes,
        };
    }),

    on(
        StateActions.AppApiActions.setNSLPSchoolTypes,
        (state, action): State => {
            return {
                ...state,
                nslpSchoolTypes: action.nslpSchoolTypes,
            };
        }
    ),

    on(StateActions.AppApiActions.setTownShip, (state, action): State => {
        return {
            ...state,
            townShip: action.townShip,
        };
    }),

    on(
        StateActions.AppApiActions.setApplicationLanguage,
        (state, action): State => {
            return {
                ...state,
                applicationLanguage: action.applicationLanguage,
            };
        }
    ),
    on(StateActions.AppApiActions.setMaritalStatus, (state, action): State => {
        return {
            ...state,
            maritalStatus: action.maritalStatusTypes,
        };
    }),
    on(StateActions.AppApiActions.setEducations, (state, action): State => {
        return {
            ...state,
            educations: action.educations,
        };
    }),
    on(StateActions.AppApiActions.setRaces, (state, action): State => {
        return {
            ...state,
            races: action.races,
        };
    }),
    on(StateActions.AppApiActions.setLivSituation, (state, action): State => {
        return {
            ...state,
            livSituation: action.livSituation,
        };
    }),

    on(
        StateActions.AppApiActions.setParentSpouseOrBoth,
        (state, action): State => {
            return {
                ...state,
                parentSpouseOrBoth: action.parentSpouseOrBoth,
            };
        }
    ),
    on(StateActions.AppApiActions.setHouSituation, (state, action): State => {
        return {
            ...state,
            houSituation: action.houSituation,
        };
    }),
    on(
        StateActions.AppApiActions.setReferralPhoneNumbers,
        (state, action): State => {
            return {
                ...state,
                referralPhoneNumbers: action.phoneNumber,
            };
        }
    ),
    on(
        StateActions.AppApiActions.setCountyOfPlacement,
        (state, action): State => {
            return {
                ...state,
                ...{ countyOfPlacement: action.countyOfPlacement },
            };
        }
    ),

    on(
        StateActions.AppApiActions.setVeteranStatus,
        (state, action): State => {
            return {
                ...state,
                ...{ veteranStatus: action.veteranStatus },
            };
        }
    ),

    on(StateActions.AppApiActions.setDisabilityType, (state, action): State => {
        return {
            ...state,
            ...{ disabilityType: action.disabilityType },
        };
    }),
    on(StateActions.AppApiActions.setDisabilitySsi, (state, action): State => {
        return {
            ...state,
            ...{ disabilitySsi: action.disabilitySsi },
        };
    }),
    on(StateActions.AppApiActions.setChildDisability, (state, action): State => {
        return {
            ...state,
            ...{ childDisability: action.childDisability },
        };
    }),
    on(StateActions.AppApiActions.setSecurityQuestions, (state, action): State => {
        return {
            ...state,
            ...{ securityQuestions: action.securityQuestion },
        };
    }
    ),
    on(StateActions.AppApiActions.setMedicalService, (state, action): State => {
        return {
            ...state,
            ...{ medicalService: action.medicalService },
        };
    }),
    on(StateActions.AppApiActions.loadYesNoValues, (state, action): State => {
        return {
            ...state,
            ...{ yesNoValues: action.yesNoValues },
        };
    }),
    on(StateActions.AppApiActions.setOtherIncomeTypes, (state, action): State => {
        return {
            ...state,
            ...{ otherIncomeTypes: action.otherIncomeTypes },
        };
    }),
    on(StateActions.AppApiActions.SetHeatingSource, (state, action): State => {
        return {
            ...state,
            ...{ heatingSource: action.heatingSource },
        };
    }),
    on(StateActions.AppApiActions.SetProviderName, (state, action): State => {
        return {
            ...state,
            ...{ providerName: action.providerName },
        };
    }),

    on(StateActions.AppApiActions.SetHeatingSourcesProvider, (state, action): State => {
        return {
            ...state,
            ...{ heatingSourcesProvider: action.heatingSourcesProvider },
        };
    }),

    on(StateActions.AppApiActions.SetNeedElectricity, (state, action): State => {
        return {
            ...state,
            ...{ providerName: action.needElectricity },
        };
    }),
    on(StateActions.AppApiActions.loadMedicalExpenses, (state, action): State => {
        return {
            ...state,
            ...{ medicalExpenses: action.medicalExpenses },
        };
    }),
    on(StateActions.AppApiActions.setDeductableSources, (state, action): State => {
        return {
            ...state,
            ...{ deductableSources: action.deductableSources },
        };
    }),
    on(StateActions.AppApiActions.setSharedExpenses, (state, action): State => {
        return {
            ...state,
            ...{ sharedExpenses: action.sharedExpenses },
        };
    }),
    on(StateActions.AppApiActions.setChildCareDays, (state, action): State => {
        return {
            ...state,
            ...{ childCareDays: action.childCareDays },
        };
    }),
    on(StateActions.AppApiActions.loadMAProviderNumbers, (state, action): State => {
        return {
            ...state,
            ...{ maproviderNumbers: action.maproviderNumbers },
        };
    }),
    on(StateActions.AppApiActions.loadNonMAProviderNumbers, (state, action): State => {
        return {
            ...state,
            ...{ nonMAproviderNumbers: action.nonMAproviderNumbers },
        };
    }),
    on(StateActions.AppApiActions.loadMaleRelationship, (state, action): State => {
        return {
            ...state,
            ...{ maleRelationship: action.maleRelationship },
        };
    }),
    on(StateActions.AppApiActions.loadFeMaleRelationship, (state, action): State => {

        return {
            ...state,
            ...{ femaleRelationship: action.femaleRelationship },
        };
    }),
    on(
        StateActions.AppApiActions.setReasonForEmploymentEnd,
        (state, action): State => {
            return {
                ...state,
                ...{ reasonForEmploymentEnd: action.reasonForEmploymentEnd },
            };
        }
    ),
    on(
        StateActions.AppApiActions.setUnitTypes,
        (state, action): State => {
            return {
                ...state,
                ...{ unitType: action.unitType },
            };
        }
    ),
    on(
        StateActions.AppApiActions.setPoliticalParties,
        (state, action): State => {
            return {
                ...state,
                ...{ politicalParties: action.politicalParties },
            };
        }
    ),
    on(
        StateActions.AppApiActions.setElectionDueDates,
        (state, action): State => {
            return {
                ...state,
                ...{ electionDueDates: action.electionDueDates },
            };
        }
    ),
    on(
        StateActions.AppApiActions.setSituations,
        (state, action): State => {
            return {
                ...state,
                ...{ situations: action.situations },
            };
        }
    ),
    on(
        StateActions.AppApiActions.setComapanyNames,
        (state, action): State => {
            return {
                ...state,
                ...{ insuranceCompnayNames: action.insuranceCompnayNames },
            };
        }
    ),
    on(
        StateActions.AppApiActions.setPolicyTypes,
        (state, action): State => {
            return {
                ...state,
                ...{ policyTypes: action.policyTypes },
            };
        }
    ),
    on(
        StateActions.AppApiActions.setPolicyCoverage,
        (state, action): State => {
            return {
                ...state,
                ...{ policyCoverage: action.policyCoverage },
            };
        }
    ),
    on(
        StateActions.AppApiActions.setEmployerChangePolicy,
        (state, action): State => {
            return {
                ...state,
                ...{ employerChangePolicy: action.employerChangePolicy },
            };
        }
    ),
    on(
        StateActions.AppApiActions.setEmployerPremiumPaidPolicy,
        (state, action): State => {
            return {
                ...state,
                ...{ employerPaidPremiumPolicy: action.employerPaidPremiumPolicy },
            };
        }
    ),
    on(
        StateActions.AppApiActions.setEmployerPolicyCoverage,
        (state, action): State => {
            return {
                ...state,
                ...{ policyCoverage: action.policyCoverage },
            };
        }
    )
    ,
    on(
        StateActions.AppApiActions.setPolicyEndCoverage,
        (state, action): State => {
            return {
                ...state,
                ...{ policyEndCoverage: action.policyEndCoverage },
            };
        }
    ),
    on (StateActions.AppApiActions.setLGBTQQuestions, (state, action): State => {
        return {
            ... state,
            lgbtqQuestions: action.questions,
        }
    }),
    on (StateActions.AppApiActions.setLGBTQAnswers, (state, action): State => {
        return {
            ... state,
            lgbtqAnswers: action.answers,
        }
    }),
    on(StateActions.AppApiActions.setBenefits, (state, action): State => {
        return {
            ...state,
            benefits: action.benefits,
        }
    }),
    on(StateActions.AppApiActions.setProgramServices, (state, action): State => {
        return {
            ...state,
            programServices: action.programServices,
        }
    }),
    
    on(
        StateActions.AppApiActions.setResourceTypes, (state, action): State => {
            return {
                ...state,
                ...{ resourceTypes: action.ResourceTypes },
            };
        }),
);
