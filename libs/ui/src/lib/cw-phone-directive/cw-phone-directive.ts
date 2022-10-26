import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';
@Directive({
  selector: '[phonenumber]'
})
export class CWPhoneDirective {
  @Input('phonenumber') phonenumber: string | undefined | null;
  constructor(private ele: ElementRef, private renderer: Renderer2) { }
  @HostListener('keyup', ['$event']) onMouseEnter(event: any) {
    this.renderer.setValue(this.ele.nativeElement, this.convertUsPhoneNumberFormate(event.keyCode));
  }
  private convertUsPhoneNumberFormate(keyCode: number): string {
    if(keyCode!=8) {
     var phoneNumber = (this.ele.nativeElement.value).replace(/\D/g,"");
  if (!phoneNumber) return phoneNumber;
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;

  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
    3,
    6
  )}-${phoneNumber.slice(6, 10)}`;
    }else {
      var phoneNumber = this.ele.nativeElement.value;
    }
    return phoneNumber;
  }
}