export class AbsentRelativeEmployer {
    constructor(
        public AddressLine1: string,
        public AddressLine2: string,
        public City: string,
        public State: any = "",
        public Zip: any,
        public EmployerPhoneNumber: string,
        public EmployerPhoneNumberExtension: string,
        public EmployerName: string
    ) {
    }
}