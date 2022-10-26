import { Component, HostListener, Input, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'compass-ui-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {
  ischatbotvisible: boolean = false;
  frameEnglishVisible: boolean = false;
  frameSpanishVisible: boolean = false;
  framePopUp: boolean = false;
  currentLang: string = "en"
  isShowDiv = false;
  @Input() isLangSwitch: any;
  constructor(
    public translate: TranslateService
  ) {


  }

  ngOnInit(): void {

  }

  LaunchChatBot() {

    this.ischatbotvisible = true;
    this.framePopUp = false;
    this.currentLang = this.translate.currentLang;

    if (this.currentLang == 'es')
      this.frameSpanishVisible = true;
    else {
      this.frameEnglishVisible = true;
      this.currentLang = 'en';
    }
  }

  MinimizeChat() {
    this.frameEnglishVisible = false;
    this.framePopUp = false;
    this.ischatbotvisible = false;
  }


  CloseChat() {
    this.ischatbotvisible = false;
    this.frameEnglishVisible = false;
    this.framePopUp = true;
    location.reload();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.isLangSwitch.previousValue!=undefined && (changes.isLangSwitch.currentValue != changes.isLangSwitch.previousValue)) {
      this.ischatbotvisible = false;
      this.frameEnglishVisible = false;
      this.framePopUp = true;
    }
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (scrollOffset >= 500) {
      document.querySelectorAll('.btn-chatbot').forEach((c) => {
        c.classList.add('scrolled');
      });
    } else {
      document.querySelectorAll('.btn-chatbot').forEach((c) => {
        c.classList.remove('scrolled');
      });
    }
  }

}