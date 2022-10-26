export class HouseholdAddress {
    constructor(
        public address: string,
        public address2: string,
        public city: string,
        public state: any = "",
        public zip: any,
        public county: any = "",
        public school: any = "",
        public township: any = "",

        public anotherAdd: any[],
        public anotherAddress: string,
        public anotherAddress2: string,
        public anotherCity: string,
        public anotherState: any = "",
        public anotherZip: string,
        public sendMail: any[],
        public sendMailStartDate: string,

        public years: string,
        public months: string
    ) {
        (this.anotherAdd = ["", "no"]), (this.sendMail = ["", "no"]);
    }
}