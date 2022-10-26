export class HouseholdPrevAddress {
    constructor(
        public address: string,
        public address2: string,
        public city: string,
        public state: any = '',
        public zip: any,
        public country: any = ''
    ) {}
}