import { Component, EventEmitter, Input, Output,} from '@angular/core';
import { ControlContainer, FormControl } from '@angular/forms';

@Component({
  selector: 'compass-ui-cw-radiobutton',
  templateUrl: './cw-radiobutton.component.html',
  styleUrls: ['./cw-radiobutton.component.scss']
})
export class CwRadiobuttonComponent {

  @Input() textStyle: string = '';
    @Input() public radioClass: string = '';
    @Input() radioLabel: string = '';
    @Input() radioButtonGroupName: string = '';
    @Input() disabled: boolean = false;
    @Input() public labelClass: string = '';
    @Input() public hintClass: string = '';
    @Input() required: boolean = false;
    @Input() public helpText: string = '';
    @Input() showFieldHelpText: boolean = true;
    @Input() public requiredText: string = '';
    @Input() isChecked: boolean = false;
    @Input() showError = false;
    @Input() formControlName: string = '';
    @Input() radioBtnValue:string=''
    @Input() radioBtnId:string=''
    @Output() inputModelChange = new EventEmitter<{}>();
    control!: FormControl;


  constructor(private controlContainer: ControlContainer) {

  }

  ngOnInit() {


    if (this.controlContainer && this.formControlName) {
      this.control = this.controlContainer.control!.get(this.formControlName) as FormControl;
    }

  }

    onChange(changedEvent: any) {
        if (changedEvent.value) {
            const data = {name: changedEvent.name, value: changedEvent.value};
            this.inputModelChange.emit(data);
        }
    }
}
