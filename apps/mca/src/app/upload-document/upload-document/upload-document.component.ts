import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ReportChangesService } from "../../report-changes/report-changes.service";
import { RoutePath } from "../../shared/route-strategies";

@Component({
    selector: "compass-ui-upload-document",
    templateUrl: "./upload-document.component.html",
    styleUrls: ["./upload-document.component.scss"],
})
export class UploadDocumentComponent implements OnInit {
    selectedDocType!: string;
    errorText!: string;
    constructor(private service: ReportChangesService, private router: Router) { }

    ngOnInit(): void {
        if (this.service.selectedDocumentCategory === 'income' || this.service.selectedDocumentCategory === 'special-allowances') {
            this.selectedDocType = this.service.selectedDocumentCategory;
        } else {
            this.selectedDocType = this.service.selectedDocumentType;
        }
    }

    getFile(event: any) {
        if (event === 'wrongfiletype') {
            this.errorText = "Incorrect file format"
        }
    }

    onNext() {
        this.router.navigate([RoutePath.UPLOAD_SUMMARY]);
    }
    onBack() {
        if (this.service.selectedDocumentCategory === 'income' || this.service.selectedDocumentCategory === 'special-allowances') {
            this.router.navigate([RoutePath.UPLOAD_GATEPOST])
        } else {
            this.router.navigate([RoutePath.SELECT_DOCUMENT]);
        }
    }
}
