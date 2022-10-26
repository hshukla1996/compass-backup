export class HouseholdAnotherPerson {
    constructor(
        public firstName: string,
        public midName: string,
        public lastName: string,
        public suffix: any = '',
        public dateOfBirth: any,
        public gender: any[],
        public otherName: any[],
        public otherNameVal: string,
        public relationship: any = ''
    ) {
        this.gender = ['M'],
        this.otherName = ['N']
    }
}