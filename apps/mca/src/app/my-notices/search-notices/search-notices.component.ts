import { Component, OnInit } from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RoutePath } from "../../shared/route-strategies";
import { getUserNoticesServices } from "../../shared/services/my-notices/my-notices-get-notices.service";

@Component({
    selector: "compass-ui-search-notices",
    templateUrl: "./search-notices.component.html",
    styleUrls: ["./search-notices.component.scss"],
})
export class SearchNoticesComponent implements OnInit {
    searchNoticesForm: FormGroup | any;
    maxDateRange: any;
    priorDate: any;
    serviceData!: any;
    goPaperlessYes = false;
    getEmail = "";
    confirm = "";
    searchResults: Array<any> = [];
    searchNotices:any;

    constructor(private fb: FormBuilder, 
        private route: Router,
        private getNoticesServices: getUserNoticesServices) {}

    ngOnInit(): void {
        this.getsearchResults()
        // this.searchNotices = this.getNoticesServices.getUserNoticesServices()
        console.log("---", this.searchNotices)
        this.searchNoticesForm = this.fb.group({
            startDate: [""],
            endDate: [""],
        });
        this.maxDateRange = new Date().toISOString().slice(0, 10);
        this.priorDate = new Date(
            new Date().setDate(new Date().getDate() - 180)
        )
            .toISOString()
            .slice(0, 10);
    }

    getsearchResults(){
        this.getNoticesServices.getUserNoticesServices().subscribe({
            next: result =>{
                console.log("fromservicefunc",result)
            }
        })
    }

    isFieldValid(field: string): boolean {
        const formField = this.searchNoticesForm.get(field);
        return (
            formField &&
            this.searchNoticesForm.get(field).status !== "VALID" &&
            this.searchNoticesForm.get(field).touched
        );
    }

    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }

        switch (field) {
            case "startDate":
                if (this.searchNoticesForm.get("startDate").errors.required) {
                    return "No start date is entered";
                } else if (this.searchNoticesForm.get("startDate") != "maxDateRange") {
                    return "Date more than 180 days in the past is entered";
                }
                if (this.searchNoticesForm.get("startDate").errors.duetInvalidDate) {
                    return "duetInvalidDate";
                }
                break;
            case "endDate":
                if (this.searchNoticesForm.get("endDate").errors.required) {
                    return "No end date is entered";
                } else if (this.searchNoticesForm.get("startDate") != "priorDate") {
                    return "Future date is entered";
                }
                if (this.searchNoticesForm.get("endDate").errors.duetInvalidDate) {
                    return "duetInvalidDate";
                }
                break;
            default:
                return "";
                break;
        }
        return "";
    }

    searchNotice(): boolean {
        if (this.searchNoticesForm.status.toLowerCase() === "valid") {
            alert("success");
           this.searchResults = []
            return true;
        } else {
            alert("Un - success");
            return false;
        }
    }
}
