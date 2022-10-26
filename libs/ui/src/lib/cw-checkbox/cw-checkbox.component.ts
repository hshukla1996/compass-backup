import { Component, EventEmitter, Input, Output,} from '@angular/core';
interface Ilink{
  href:string,
  label:string,
}
@Component({
  selector: 'compass-ui-cw-checkbox',
  templateUrl: './cw-checkbox.component.html',
  styleUrls: ['./cw-checkbox.component.scss']
})

export class CwCheckboxComponent {

  @Input() id: string = '';
  @Input() textStyle: string = '';
  @Input() labelClass: string = '';
  @Input() helpText: string = '';
  @Input() requiredText: string = '';
  @Input() checkboxClass: string = '';
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() hintClass: string = '';
  @Input() value: string = '';
  @Input() showFieldHelpText: boolean = true;
  @Input() isChecked: boolean = false;
  @Input() isHidden: boolean = false;
  @Input() showError = false;
  @Input() link:Ilink= {href:"",label:""};
  @Output() inputModelChange = new EventEmitter<any>();
  @Input() isSingle:boolean = false; 
  @Input()  formGroup = '' as any;
  onEventChange(changedEvent: any) {
      if (changedEvent.value) {
          const data = {
              name: changedEvent.name,
              checked: changedEvent.checked,
          };
          this.inputModelChange.emit(data);
      }
  }
}
