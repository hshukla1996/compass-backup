export class NursingFacilityDetailsCon {
    constructor(
        public AddressLine1: string,
        public AddressLine2: string,
        public City: string,
        public State: any = "",
        public Zip: any,
        public FacilityName: string,
        public nursingFacilityStartDate: string,
        public nursingFacilityEndDate: string
    ) {
    }
}

