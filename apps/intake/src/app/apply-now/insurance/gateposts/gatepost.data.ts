import { CURREENT_INSURANCE_GATEPOST_VALUE, EMPLOYER_CHILDREN_INSURANCE_GATEPOST_VALUE, EMPLOYER_INSURANCE_GATEPOST_VALUE, PRIOR_INSURANCE_GATEPOST_VALUE } from "../model/insurance-page-queue.util";

export const INSURANCE_GATEPOST_ONE = {
    questionText: "Does anyone in the household have any of these insurance situations?",
    toolTip: "",
    subHeading: "",
    requiredText: "Please select required options",
    questionAnswers: [
        {
        legend: "Have current health or medical insurance",
            toolTip: "This includes Medicare or Long- Term Living Services - Nursing Home and Related Facilities Insurance",
        accordionButton: "",
        accordionData: "This includes Medicare or Long- Term Living Services - Nursing Home and Related Facilities Insurance",
        show: true,
        isRequired: false,
        disable: false,
        isYesChecked: false,
        isNoChecked: false,
        value: CURREENT_INSURANCE_GATEPOST_VALUE,
        },
    {
        legend: "Have health or medical insurance that was lost this month or in the last 3 months",
        toolTip: "",
        accordionButton: "",
        accordionData:"",
        show: true,
        isRequired: false,
        disable: false,
        isYesChecked: false,
        isNoChecked: false,
        value: PRIOR_INSURANCE_GATEPOST_VALUE,
    },
       
        
    ],
};
export const INSURANCE_GATEPOST_TWO = {
    questionText: "Does anyone in the household have any of these insurance situations?",
    toolTip: "",
    subHeading: "select all that apply.",
    requiredText: "Please select required options",
    questionAnswers: [
        {
            legend: "Have or can get health insurance from their job",
            toolTip: "Select this even if this is someone else's' job, such as a parent or spouse.",
            accordionButton: "Why are we asking about this?",
            accordionData: "We're asking this to see if anyone applying has, or can get, health insurance from a current or past employer.This also applies to any household member who is not the employee but has or can get coverage through the employee's health plan.",
            show: true,
            isRequired: false,
            disable: false,
            isYesChecked: false,
            isNoChecked: false,
            value: EMPLOYER_INSURANCE_GATEPOST_VALUE,
        },
        {
            legend: "Have health or medical insurance that was lost this month or in the last 3 months",
            toolTip: "",
            accordionButton: "",
            accordionData:'',
            show: true,
            isRequired: false,
            disable: false,
            isYesChecked: false,
            isNoChecked: false,
            value: EMPLOYER_CHILDREN_INSURANCE_GATEPOST_VALUE,
        },


    ],
};