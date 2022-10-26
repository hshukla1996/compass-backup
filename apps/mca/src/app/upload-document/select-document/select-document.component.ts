import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ReportChangesService } from "../../report-changes/report-changes.service";
import { RoutePath } from "../../shared/route-strategies";

@Component({
    selector: "compass-ui-select-document",
    templateUrl: "./select-document.component.html",
    styleUrls: ["./select-document.component.scss"],
})
export class SelectDocumentComponent implements OnInit {
    selectedOption!: string;
    error: string = "None of the options are selected";
    displayError: boolean = false;
    selectedDocCategory!: string;
    titleObj: any = {
        'personal-information':'personal information',
        'expenses': 'expenses',
        'resources': 'resources',
        'employment-and-training': 'employment and training',
        'legal-documents': 'legal documents',
        'miscellaneous' : 'miscellaneous'
        
    }
    documentTypes: any = {
        'personal-information' : [
            {
                id: 'criminal-history',
                title: 'Criminal History',
                accordianTitle: 'Examples of Criminal History Documents',
                accordianContent: ['Probation/Parole Record', 'Court dockets']
            },
            {
                id: 'id',
                title: 'ID',
                accordianTitle: 'Examples of ID Documents',
                accordianContent: ['Drivers License', 'Passport', 'Identification Card issued by a federal, state, or local government','Work or School Identification Car' ]
            },
            {
                id: 'medical-documents',
                title: 'Medical Documents',
                accordianTitle: 'Examples of Medical Documents',
                accordianContent: ['Form to verify participation in treatment program', 'Paid or unpaid medical bills','Verification of disability and / or need for medication']
            },
            {
                id: 'citizenship',
                title: 'Citizenship',
                accordianTitle: 'Examples of Citizenship Documents',
                accordianContent: ['Birth Certificate', 'Citizenship/ Immigration documents', 'U.S.Passport','Naturalization CertificateExamples']
            }
        ],
        'resources': [
            {
                id: 'bank-accounts',
                title: 'Bank Accounts',
                accordianTitle: 'Examples of Bank Account Documents',
                accordianContent: ['Credit union or bank statement', 'Statement from financial institution or investment company', 'Trust document','Deed']
            },
            {
                id: 'insurance',
                title: 'Insurance',
                accordianTitle: 'Examples of Insurance Documents',
                accordianContent: ['Insurance policy documents (including face value and current cash surrender value']
            },
            {
                id: 'vehicles',
                title: 'Vehicles',
                accordianTitle: 'Examples of Vehicle Documents',
                accordianContent: ['Vehicle title or registration papers', 'Statement from a car dealer', 'State Division of Motor Vehicles statement','Loan papers or sales receiptExamples']
            },
            {
                id: 'other-resources  ',
                title: 'Other Resources ',
                accordianTitle: 'Examples of Other Resources Documents',
                accordianContent: ['Retirement accounts', 'Non- residential properties', 'Burial agreements','Anything else not coveredExamples']
            }
        ],
        'expenses': [
            {
                id: 'dependent-care',
                title: 'Dependent Care',
                accordianTitle: 'Examples of Dependent Care Documents',
                accordianContent: ['Providers Statement showing cost of care', 'Current receipt','BillsExamples']	
            },
            {
                id: 'housing-costs',
                title: 'Housing Costs',
                accordianTitle: 'Examples of Housing Cost Documents',
                accordianContent: ['Lease/ rent receipt', 'Statement from landlord','Property tax records or mortgage statement']	
            },
            {
                id: 'medical-bills',
                title: 'Medical Bills',
                accordianTitle: 'Examples of Medical Bill Documents',
                accordianContent: ['Bills from health insurance providers', 'Health insurance policy', 'Statements or bills from physicians or pharmacistsExamples']	
            },
            {
                id: 'support-paid',
                title: 'Support Paid',
                accordianTitle: 'Examples of Support Paid Documents',
                accordianContent: ['Proof of payments made to or received from the child support agency', 'Court order']
            }
        ],
        'employment-and-training': [
            {
                id: 'contractor-referrals',
                title: 'Contractor Referrals',
                accordianTitle: 'Examples of Contractor Referral Documents',
                accordianContent: ['PA 1661 – Agreement of Mutual Responsibility(AMR)', 'PA 1531 – Employment Development Plan(EDP)', 'PA 1951 – Reverse Referral Form', , 'PA 590 – Community Service Weekly Participation Report', 'PA 1938 – SNAP Community Service Volunteer Verification Form', 'PA 1979 – Community Service Verification Form', 'PA 1895 – Employment and Training Activity Verification Form','AMR Vocational Education Addendums']	
            },
            {
                id: 'participation-record',
                title: 'Participation Record',
                accordianTitle: 'Examples of Hearings/Appeals Documents',
                accordianContent: ['Court- awarded settlement', 'Marriage license', 'Divorce papers','Written statement about absent parentExamples']
            }
        ],
        'legal-documents': [
            {
                id: 'client-letters',
                title: 'Client Letters',
                accordianTitle: 'Examples of Client Letters',
                accordianContent: ['Letter or documents from a lawyerExamples']
            },
            {
                id: 'hearings-appeals',
                title: 'Hearings/Appeals',
                accordianTitle: 'Examples of Hearings/Appeals Documents',
                accordianContent: ['Court- awarded settlement', 'Marriage license', 'Divorce papers', 'Written statement about absent parentExamples']	
            }
        ]             
    };
    constructor(private router: Router, private service: ReportChangesService) {}

    ngOnInit(): void {
        this.selectedDocCategory = this.service.selectedDocumentCategory;
    }

    onBack() {
        this.router.navigate([RoutePath.UPLOAD_GATEPOST])
    }
    onNext() {
        if (!this.selectedOption) {
            this.displayError = true;
            return
        }
        this.service.selectedDocumentType = this.selectedOption;
        this.router.navigate([RoutePath.UPLOAD_DOCUMENT]);
    }
}
