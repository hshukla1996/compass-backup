import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ReportChangesService } from "../../report-changes/report-changes.service";
import { RoutePath } from "../../shared/route-strategies";

@Component({
    selector: "compass-ui-upload-gatepost",
    templateUrl: "./upload-gatepost.component.html",
    styleUrls: ["./upload-gatepost.component.scss"],
})
export class UploadGatepostComponent implements OnInit {
    error: string = "None of the options are selected";
    selectedOption!: string;
    displayError: boolean = false;
    documentCategories = [
        {
            id: 'personal-information',
            title: 'Personal Information',
            accordianTitle: 'Examples of Personal Information Documents',
            accordianContent: 'Documents like Photo ID, Social Security Card, or Citizenship/Immigration'
        },
        {
            id: 'income',
            title: 'Income',
            accordianTitle: 'Examples of Income Documents',
            accordianContent: 'Documents like paycheck statements, self-employment records, unemployment benefits, VA or SSA benefit statement, statement of voluntary child support, lottery or gambling winnings'
        },
        {
            id: 'resources',
            title: 'Resources',
            accordianTitle: 'Examples of Resource Documents',
            accordianContent: 'Documents like bank or credit union statement, life insurance paperwork, insurance card, vehicle title or registrationDocuments '
        } ,
        {
            id: 'expenses',
            title: 'Expenses',
            accordianTitle: 'Examples of Expense Documents',
            accordianContent: 'Documents like lease/rent receipt, utility billing statement, health or vehicle insurance policy, mortgage statement, medical expensesDocuments '
        },
        {
            id: 'special-allowances',
            title: 'Special Allowances',
            accordianTitle: 'Examples of Special Allowances Documents',
            accordianContent: 'Documents like receipts showing the item/service was purchased with a special allowance '
        },
        {
            id: 'employment-and-training',
            title: 'Employment and Training',
            accordianTitle: 'Examples of Employment and Training Documents',
            accordianContent: 'Documents like transcript or completion certificate from educational/training facility'
        },
        {
            id: 'legal-documents',
            title: 'Legal Documents',
            accordianTitle: 'Examples of Legal Documents Documents',
            accordianContent: 'Documents like marriage license, divorce papers or written statement about absent parent, court settlement'
        },
        {
            id: 'miscellaneous',
            title: 'Miscellaneous',
            accordianTitle: 'Examples of Miscellaneous Documents',
            accordianContent: 'Any other document not already listed.For Long- Term Care or Home and Community - Based Services, proof of financial accounts closed in the last 5 years must include:-Closing bank statement - Proof of money or property given away or transferred in the last 5 yearsDocuments '
        }
    ];
    constructor(private router: Router, private service: ReportChangesService) {}

    ngOnInit(): void {}

    onNext(){
        if(!this.selectedOption) {
            this.displayError = true;
            return
        }
        this.service.selectedDocumentCategory = this.selectedOption;
        if (this.selectedOption === 'income' || this.selectedOption === 'special-allowances' ) {
            this.router.navigate([RoutePath.UPLOAD_DOCUMENT]);
        } else {
            this.router.navigate([RoutePath.SELECT_DOCUMENT]);
        }
    }
    onBack() {
        this.router.navigate([RoutePath.REPORT_CHANGES])
    }
}
