import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'compass-ui-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  isLangSwitch: any;
  @Input() isLang: any;

  constructor() {
  }

  ngOnInit(): void {
  }

}
