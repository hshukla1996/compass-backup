export class HouseholdContactInfo {
    constructor(
        public mainContact: string,
        public mainContactRad : any[],
        public secContact: string,
        public secContactRad : any[],
        public othContact: string,
        public othContactRad: any[],
        public email: string,
        public reEmail: string,
        public contact: any = ''
    ) {
        this.mainContactRad = ['N'],
        this.secContactRad = ['N'],
        this.othContactRad = ['N']
    }
}