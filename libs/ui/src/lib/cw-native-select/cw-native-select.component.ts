import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    QueryList,
    ViewChild,
} from "@angular/core";

import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
    selector: "cw-select-option",
    template: `<option *ngIf="value">{{ label }}</option>`
})
export class CWOptionComponent {
    @Input() value!: string;
    @Input() label!: string;
    printTitle() {
    }

}

@Component({
    selector: "compass-ui-cw-select",
    templateUrl: "./cw-native-select.component.html",
    styleUrls: ["./cw-native-select.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CWNativeSelectComponent implements AfterViewInit {
    //  @ContentChildren(CWOptionComponent) optList!: QueryList<CWOptionComponent> ;
    // @Output() OnSelectedChange = new EventEmitter<string>();
    //@Output() OnSelectedChange = new EventEmitter<string>()
    @Input() FormGroup: FormGroup | any;
    @Input() fieldLabel!: string;
    @Input() fieldId!: string;
    @Input() fieldHelpText!: string;
    @Input() errorMsg: string | undefined;
    @Input() displayError: boolean | undefined;
    @Input() requiredText!: any;
    @Input() placeHolderText!: string;
    @Input() disabled: boolean = false;
    @Input() options: any;
    @Input() isVisible:boolean = true;
    @Input() key: string | undefined;
    @Output() OnSelectedChange = new EventEmitter<{}>();
    @Input() requiredIndicator:boolean=false
    validValue: boolean = true;

    constructor() {}

    ngAfterViewInit() {}
    ngOnInit() {
        this.requiredText="lblrequired"
        this.FormGroup?.addControl(this.fieldId, new FormControl(""));
    }

    changeInput() {
        // alert(this.FormGroup.controls[this.fieldId].value)
        this.validValue =
            this.FormGroup.controls[this.fieldId].value != "" ? true : false;

        this.OnSelectedChange.emit(this.FormGroup.controls[this.fieldId].value);
    }
  ngOnDestroy(){
      if(this.FormGroup && this.FormGroup.controls[this.fieldId]) {
        this.FormGroup.controls[this.fieldId].clearValidators();
        this.FormGroup.controls[this.fieldId].updateValueAndValidity();
      }
  }
}


