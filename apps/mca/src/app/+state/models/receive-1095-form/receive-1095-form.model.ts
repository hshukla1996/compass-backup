export interface IReceive1095FormState {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  entryOption?: string;
  county?: string;
  caseRecord?: string;
  ssn?: string;
  chipIdUci?: string;
  mciMedEbt?: string;
  taxYear?: string;
}
export const initialState: IReceive1095FormState = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  entryOption: "",
  county: "",
  caseRecord: "",
  ssn: "",
  chipIdUci: "",
  mciMedEbt: "",
  taxYear: "",
}