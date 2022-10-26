import { Component, ElementRef, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'cw-select',
    templateUrl: './cw-select.component.html',
    styleUrls: ['./cw-select.component.scss'],
    host: {
        '(document:keydown)': 'handleKeyboardEvents($event)'
    }
})
export class CwSelectComponent {

    @Input() options: any;
    @Input() key: string | undefined;
    @Input() title: string | undefined;
    @Output() currentValueChange = new EventEmitter();

    public currentValue: any;
    public dropdownOpen: boolean = false;
    public get dropdownElement(): Element { return this.elem.nativeElement.querySelector('.dropdown-list') }

    private currentIndex = -1;

    constructor(
        private elem: ElementRef
    ) { }


      ngOnInit(): void {
          console.log(this.options)
        this.currentValue = this.options[0];
    }
 handleKeyboardEvents($event: KeyboardEvent) {
        if (this.dropdownOpen) {
            $event.preventDefault();
        } else {
            return;
        }
        if ($event.code === 'ArrowUp') {
            if (this.currentIndex < 0) {
                this.currentIndex = 0;
            } else if (this.currentIndex > 0) {
                this.currentIndex--;
            }
            this.elem.nativeElement.querySelectorAll('li').item(this.currentIndex).focus();
        } else if ($event.code === 'ArrowDown') {
            if (this.currentIndex < 0) {
                this.currentIndex = 0;
            } else if (this.currentIndex < this.options.length - 1) {
                this.currentIndex++;
            }
            this.elem.nativeElement.querySelectorAll('li').item(this.currentIndex).focus();
        } else if (($event.code === 'Enter' || $event.code === 'NumpadEnter') && this.currentIndex >= 0) {
            this.selectByIndex(this.currentIndex);
        } else if ($event.code === 'Escape') {
            this.closeDropdown();
        }
    }

    closeDropdown() {
        this.dropdownElement.setAttribute('aria-expanded', "false");
        this.currentIndex = -1;
        this.dropdownOpen = false;
    }

    selectByIndex(i: number) {
        let value = this.options[i];
        this.select(value);
    }

    select(value:any) {
        this.currentValue = value;
        this.closeDropdown();
        this.currentValueChange.emit(this.currentValue);
    }

    toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
        this.dropdownElement.setAttribute('aria-expanded', this.dropdownOpen ? "true" : "false");
    }
}