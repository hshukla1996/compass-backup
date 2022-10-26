import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[ssn]'
})
export class SsnDirective {
    @Input('ssn') ssn: string | undefined;
    constructor(private ele: ElementRef, private renderer: Renderer2) { }
    @HostListener('keyup') onMouseEnter() {
        this.renderer.setValue(this.ele.nativeElement, this.convertNumberToSsnFormate());
    }
    private convertNumberToSsnFormate(): string {
        var snn = (this.ele.nativeElement.value).replace(/\D/g, "");
        if (snn.length > 9) {
            snn = snn.replace(/^(\d\d\d)(\d{2})(\d{0,4}).*/, "$1-$2-$3");
            return snn;
        }
        else if (snn.length > 4) {
            snn = snn.replace(/^(\d\d\d)(\d{2})(\d{0,4}).*/, "$1-$2-$3");
        }
        else if (snn.length > 2) {
            snn = snn.replace(/^(\d\d\d)(\d{0,3})/, "$1-$2");
        }
        else {
            snn = snn.replace(/^(\d*)/, "$1");
        }
        return snn;
    }
}