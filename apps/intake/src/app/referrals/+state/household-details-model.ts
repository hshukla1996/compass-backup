export interface IIndividual {
    // relationships?: IRelationships[];
    relationshipsToIndividual?:any;
    individualNumber?: any,
    firstName?: string,
    lastName?: string,
    dateOfBirth?: string,
    gender?: string,
    county?: any,
    schoolDistrict?: number,
    appliedReferrals?: string[],
    reasonForReferral?: string,
    // relationships?: string[],
    // relationshipToContactPerson?: string,
    // relationship?: string,
    isIntervention?: boolean,
    phoneNumber?: string,
    emailAddress?: string,
    contactPreference?: string,
    validState?: Boolean,
    address?: IAddress,
    isAddressGISValidated?: boolean

}

export interface IIndividualDetails {
    householdHead: IIndividual;
    houseHoldPersons?: IIndividual[],
    householdOutsidePersons: string[],
    selectedForCoverage: string[]
}

export interface IRelationships {
    individualLookupId?: any,
    relationshipType?: any
}

export const individualDetails = {
    householdHead: {},
    houseHoldPersons: [],
    householdOutsidePersons: [],
    selectedForCoverage: []
}
export interface IServicesSelected {
    sevicesselected?: []
}

export interface IAddress {
    state?: string,
    addressLine1?: string,
    addressLine2?: string,
    street1?: string,
    street2?: string,
    city?: string,
    zip?: string,
    zipExt?: number
}
