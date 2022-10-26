export class HouseholdHead {
    id: any;
    constructor(
        public firstName : string,
        public midName : string,
        public lastName : string,
        public suffix : any ='',
        public dateOfBirth : string,
        public gender : any[],
        public otherName : any[],
        public otherNameVal : string
    ) {
        this.gender = ['M'],
        this.otherName = ['N']
    }
}
