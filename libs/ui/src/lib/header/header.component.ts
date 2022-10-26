import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild
  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoutePath } from '../../../../../apps/intake/src/app/shared/route-strategies';
import { TokenService } from '../../../../shared/auth/src/lib/services/auth/token-service';
import { TranslateService } from '@ngx-translate/core';

const LANGUAGE_ID: string = 'chatbotLang';

@Component({
  selector: 'compass-ui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();
  @ViewChild('closeHeaderModal') closeModal!: ElementRef

  applynowPath = RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_GETTINGSTARTED;
  tokenDetectionHandler: any;
  headerForm: FormGroup | any;

  constructor(
    public translate: TranslateService,
    private fb: FormBuilder,
    private tokenService: TokenService
  ) {
    translate.addLangs(['en', 'es']);
    // translate.setDefaultLang('en');
  }

  switchLang(lang: any) {
    this.translate.use(lang.target.value);
    this.newItemEvent.emit(lang.target.value);
    localStorage.setItem(LANGUAGE_ID, lang.target.value);
    location.reload();
  }

  ngOnInit(): void {

    this.headerForm = this.fb.group({
      selectLang: ""
    })

    if (localStorage.getItem(LANGUAGE_ID)) {
      this.headerForm.get("selectLang").patchValue(localStorage.getItem(LANGUAGE_ID));
    }
    else {
      this.headerForm.get("selectLang").patchValue("en");
    }
  }

  clickedLogin() {
    this.tokenDetectionHandler = setInterval(() => {
      if (this.tokenService.getToken()) {
        this.closeModalPopUp();
        clearInterval(this.tokenDetectionHandler);
      }
    }, 500);
  }

  closeModalPopUp() {
    this.closeModal.nativeElement.click();
  }

}
