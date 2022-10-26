import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[formControlName][appZIPMask]',
})
export class ZIPMaskDirective {

    constructor(public ngControl: NgControl) { }

    @HostListener('ngModelChange', ['$event'])
    onModelChange(event: any) {
        this.onInputChange(event, false);
    }

    @HostListener('keydown.backspace', ['$event'])
    keydownBackspace(event: any) {
        this.onInputChange(event.target.value, true);
    }


    onInputChange(event: any, backspace: any) {
      if(!event){
        return;
      }
        let newVal = event.replace(/\D/g, '');
        console.log("vallength -" + newVal.length);
        if (backspace && newVal.length <= 6) {
            newVal = newVal.substring(0, newVal.length - 1);
        }
        if (newVal.length === 0) {
            newVal = '';
        } else if (newVal.length <= 5) {
            newVal = newVal.replace(/^(\d{0,5})/, '$1');
        } else if (newVal.length <= 9) {
            newVal = newVal.replace(/^(\d{0,5})(\d{0,4})/, '$1-$2');
        // } else if (newVal.length <= 9) {
        //     newVal = newVal.replace(/^(\d{0,3})(\d{0,2})(\d{0,4})/, '$1-$2-$3');
        } else {
            newVal = newVal.substring(0, 9);
            newVal = newVal.replace(/^(\d{0,5})(\d{0,4})/, '$1-$2');
        }
        this.ngControl.valueAccessor?.writeValue(newVal);
    }
}
