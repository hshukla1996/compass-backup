import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: "cw-simpletile-gatepostbutton",
    templateUrl: "./cw-simpletile-gatepostbutton.component.html",
    styleUrls: ["./cw-simpletile-gatepostbutton.component.scss"],
})
export class CwSimpleTileGatepostButton implements OnInit {
    @Input() simpleTileGatepostButtonData: any;
    @Input() textBoxData: any;
    @Input() textBoxDataTO: any;
    @Input() othertextBoxData:any
    @Input() selectedItems: any;
    selectedValues: string[] = [];
    @Output() nextPage = new EventEmitter<any>();
    @Output() previousPage = new EventEmitter<any>();
    @Output() otherTextBox = new EventEmitter<any>();
    showRequired: boolean = false;
    moreInfo = "";
    otherInfo = "";
    showOtherTextBox = false;
    constructor(private cd: ChangeDetectorRef) {}
    ngOnInit(): void {
         this.moreInfo = this.simpleTileGatepostButtonData?.moreInfo;
      this.otherInfo = this.simpleTileGatepostButtonData?.otherInfo;
        // this.simpleTileGatepostButtonData = this.selectedItems;
      this.simpleTileGatepostButtonData["questionAnswers"].forEach((element:any)=> {
        if(element.value === "otherWaterSituation" && element["isYesChecked"]){
          this.showOtherTextBox=true;
        }

      });
    }
    ngOnChanges(changes: any) {
        setTimeout(() => {
            this.simpleTileGatepostButtonData =
                changes.simpleTileGatepostButtonData.currentValue;

            this.moreInfo = this.simpleTileGatepostButtonData?.moreInfo;
          this.otherInfo = this.simpleTileGatepostButtonData?.otherInfo;

                 this.cd.detectChanges();
        }, 500);
    }
    onRadioChecked(question: any, isChecked: boolean) {
        if (question["value"] === "noneOfAbove") {
            this.selectedValues = [];
            this.selectedValues.push(question["value"]);
            this.simpleTileGatepostButtonData["questionAnswers"].forEach(
                (element: any) => {
                    if (element["value"] !== "noneOfAbove") {
                        element["isYesChecked"] = false;
                        element["isNoChecked"] = false;
                    } else {
                        if (isChecked) {


                            element["isYesChecked"] = true;
                            element["isNoChecked"] = false;
                        } else {
                            element["isYesChecked"] = false;
                            element["isNoChecked"] = true;
                        }
                    }
                }
            );
        } else {
            this.simpleTileGatepostButtonData["questionAnswers"].forEach(
                (element: any) => {
                    if (element["value"] === "noneOfAbove") {
                        element["isYesChecked"] = false;
                        element["isNoChecked"] = false;
                        for (let i = 0; i < this.selectedValues.length; i++) {
                            if (this.selectedValues[i] === element["value"]) {
                                this.selectedValues.splice(i, 1);
                            }
                        }
                    }
                }
            );
            if (isChecked) {
                this.selectedValues.push(question["value"]);
                question["isYesChecked"] = true;
                question["isNoChecked"] = false;

              if(question.other){
                this.showOtherTextBox=true;
              }
            } else {
              if(question.other) {
                this.showOtherTextBox = false;
              }
                for (let i = 0; i < this.selectedValues.length; i++) {
                    if (this.selectedValues[i] === question["value"]) {
                        this.selectedValues.splice(i, 1);
                    }
                }
                question["isYesChecked"] = false;
                question["isNoChecked"] = true;

            }
        }
    }

    checkName(check: any) {
        let charCode = check.keyCode;
        console.log("--", check)
        return ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) 
            || charCode == 39 || charCode == 92 || charCode == 45 || charCode == 47 || (charCode > 47 && charCode < 58))
    }

    checkInput(inputVal:any){
        this.otherTextBox.emit(inputVal)
    }

    resetRadioButton(question: any) {
        question["isYesChecked"] = false;
        question["isNoChecked"] = false;
        this.showRequired = false;
    }

    next() {
        this.showRequired = false;
        this.simpleTileGatepostButtonData["questionAnswers"].forEach(
            (element: any) => {
                if (
                    element["value"] !== "noneOfAbove" &&
                    element["isRequired"] === true
                ) {
                    if (
                        element["isYesChecked"] === false &&
                        element["isNoChecked"] === false
                    ) {
                        this.showRequired = true;
                    }
                }
            }
        );
        this.simpleTileGatepostButtonData["moreInfo"] = this.moreInfo;
      this.simpleTileGatepostButtonData["otherInfo"] = this.otherInfo;
        if (!this.showRequired) {
            this.nextPage.emit(this.simpleTileGatepostButtonData);
        }
        // console.log(this.selectedValues, this.simpleTileGatepostButtonData)
    }
    back() {
        this.previousPage.emit();
    }
}
