export interface IHousehold {
    "relationships"?: string[],
    "household"?: string,
    "individualNumber"?: any,
    "contactPreference"?: string,
    "phoneNumber"?: string,
    "emailAddress"?: string, 
    "address"?: IAddress, 
    isAddressGISValidated?: Boolean, 
}

export interface IAddress {
    "state"?: string,
    "addressLine1"?: string,
    "addressLine2"?: string,
    "city"?: string,
    "zip"?: string,
    "zipExtension"?: number
}


export const InitialHousehold = {
    household: "",
    // "relationships": ["M", "D"],
    // "firstName": "mother",
    // "lastName": "child",
    // "individualNumber": 2,
    "contactPreference": "",
    "phoneNumber": "",
    "emailAddress": "",
    // "isAddressGISValidated": true,

    address: {
        // "state": "",
        // "addressLine1": "",
        // "addressLine2": "",
        // "city": "",
        // "zip": "",
        // "zipExtension": 
    }
}

 

