import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'compass-ui-cw-textarea',
  templateUrl: './cw-textarea.component.html',
  styleUrls: ['./cw-textarea.component.scss']
})
export class CwTextareaComponent {

  @Input() id: string = "";
  @Input() textClass: string = '';
  @Input() textareaClass: string = '';
  @Input() label: string = '';
  @Input() rows: string = '';
  @Input() text: string = '';
  @Input() maxLength: number = 0;
  @Input() disabled: boolean = false;
  @Input() requiredText: string = '';
  @Input() placeholder: string = '';
  @Input() labelClass: string = '';
  @Input() hintClass: string = '';
  @Input() required: boolean = false;
  @Input() helpText: string = '';
  @Input() showFieldHelpText: boolean = true;
  @Input() fieldTitle: string | undefined;
  @Input() showError = false;
  @Output() inputModelChange = new EventEmitter<string>();

  restrictInputLength: string = '';

  // textareaForm:FormGroup 

  ngOnInit() {
      this.restrictInputLength = this.maxLength.toString();
  }

  textChange(changedEvent: any) {
      if (changedEvent.value) {
          this.inputModelChange.emit(changedEvent.value);
      }
  }
} 

