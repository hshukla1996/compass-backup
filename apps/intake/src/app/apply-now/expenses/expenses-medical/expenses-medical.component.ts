import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RoutePath } from "../../../shared/route-strategies";

@Component({
    selector: "ui-compass-expenses-medical",
    templateUrl: "./expenses-medical.component.html",
    styleUrls: ["./expenses-medical.component.scss"],
})
export class ExpensesMedicalComponent implements OnInit {
    constructor(private fb: FormBuilder, private router: Router) {}

    ngOnInit(): void {}
}