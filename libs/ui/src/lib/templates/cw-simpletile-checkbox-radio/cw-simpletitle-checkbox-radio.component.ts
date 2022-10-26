import {Component, OnInit, Input, Output, EventEmitter, Directive, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
    selector: "compass-ui-simpletitle-checkbox-radio",
    templateUrl: "./cw-simpletitle-checkbox-radio.component.html",
    styleUrls: ["./cw-simpletitle-checkbox-radio.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CwSimpletitleCheckboxRadioComponent implements OnInit {
    @Input() simpleTileCheckboxData: any;
    @Input() simpleTileButtongroupData: any;
    @Input() booleanShow: any;
    @Input() selectedItems: any;
    @Input() isCheckRequired?: boolean;
    @Input() isRadioRequired?: boolean;
    @Input() raceFormValdation?: boolean;
    @Input() raceFormRadioBtnValdation?: boolean;
    simpleTileCheckboxForm: FormBuilder | any;

    selectedUserids: any[] = [];
    selectedRadio = "";
    formSubmitAttempt = false;
    @Output() nextPage = new EventEmitter<any>();
    @Output() previousPage = new EventEmitter<boolean>();

    constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        setTimeout(() => {
            this.selectedUserids = this.selectedItems.raceInformation || [];
            this.selectedRadio = this.selectedItems.hispanicOrigin
                ? this.selectedItems.hispanicOrigin === "Y"
                    ? "Yes"
                    : "No"
                : "";
        }, 10);

        this.simpleTileCheckboxForm = this.fb.group({
            checkbox: this.fb.array([]),

            buttongroup: new FormControl(""),
        });
    }
    get f() {
        return this.simpleTileCheckboxForm.controls;
    }
    ngOnChanges(changes: any) {
        setTimeout(() => {
            this.cd.detectChanges();
        }, 100);
    }

    onCheckboxChange = (index: number, e: any) => {
        if (e.checked) {
            this.selectedUserids = Object.assign([], this.selectedUserids);
            this.selectedUserids.push(index);
        } else {
            this.selectedUserids = this.selectedUserids.filter(
                (id) => id.toString() != index.toString()
            );
        }
        console.log("selected checkboxes");
        console.log(this.selectedUserids);
        if (index.toString() === "8" && e.checked) {
            for (
                let k = 0;
                k < this.simpleTileCheckboxData["questionAnswers"].length - 1;
                k++
            ) {
                this.simpleTileCheckboxData["questionAnswers"][k] = {
                    ...this.simpleTileCheckboxData["questionAnswers"][k],
                    isChecked: false,
                    disabled: true,
                };
            }
        } else if (index.toString() === "8" && !e.checked) {
            for (
                let k = 0;
                k < this.simpleTileCheckboxData["questionAnswers"].length - 1;
                k++
            ) {
                this.simpleTileCheckboxData["questionAnswers"][k] = {
                    ...this.simpleTileCheckboxData["questionAnswers"][k],
                    disabled: false,
                };
            }
        }
    };
    GetValue(ind: any) {
        this.simpleTileButtongroupData["questionAnswers"][ind].checked = true;
        this.selectedRadio =
            this.simpleTileButtongroupData["questionAnswers"][ind].id;
    }

    back() {
        this.previousPage.emit();
    }

    next() {
        this.formSubmitAttempt = true;
        if (
            this.simpleTileCheckboxData["isRequired"] &&
            this.selectedUserids.length > 0
        ) {
            this.nextPage.emit({
                selectedCheckboxes: this.selectedUserids,
                selectedRadios: this.selectedRadio,
            });
        }
        if (
            !this.simpleTileCheckboxData["isRequired"] &&
            this.selectedUserids.length >= 0
        ) {
            this.nextPage.emit({
                selectedCheckboxes: this.selectedUserids,
                selectedRadios: this.selectedRadio,
            });
        }
    }
}
