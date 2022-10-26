export class AbsentRelativeDetails {
    id: any;
    constructor(
        public firstName: string,
        public midName: string,
        public lastName: string,
        public suffix: any = '',
        public dateOfBirth: string,
        public gender: any,
        public deceased: any,
        public socialSecurityNumber: string,
        public isThisPersonSpouseParentOrBothOfTheHouseholdMember: any
    ) {
    }
}