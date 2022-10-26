import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IApplyNowState } from '../../+state/apply-now.models';
import { AppStoreService } from '../../../app-store-service';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowStoreService } from '../../apply-now-store-service';

@Component({
  selector: 'compass-ui-community-partner-password',
  templateUrl: './community-partner-password.component.html',
  styleUrls: ['./community-partner-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommunityPartnerPasswordComponent implements OnInit {
  communityPartnerPasswordForm: FormGroup | any;
  securityQuestions$: Observable<any> | undefined;
  securityQuestions: any;
  applyNowState: IApplyNowState | undefined;
  formID = "";
  mismatch: boolean = false;
  constructor(private route: Router,
    private fb: FormBuilder, private appService: AppStoreService, private service: ApplyNowStoreService, private cd: ChangeDetectorRef,) { }

  isFieldValid(field: string): boolean {
    // this.mismatch = this.communityPartnerPasswordForm.get("password").value != this.communityPartnerPasswordForm.get("reenterpassword").value
    // if ((field == "password" || field == "reenterpassword")) {
    //   return this.communityPartnerPasswordForm.get(field)?.touched;
    // }
    return !this.communityPartnerPasswordForm.get(field)?.valid && 
    this.communityPartnerPasswordForm.get(field)?.touched
  }

  errorMap(field: string): string {
  //   if (this.communityPartnerPasswordForm.get(field)?.valid) return "";
    switch (field) {
      case "password": {
        if (this.communityPartnerPasswordForm.get(field)?.errors?.required) {
          return "basidDetailRequiredMessage";
        }
        if (this.mismatch) {
          return "afsGSerrorMismatch"
        }
        break;
      }
      case "reenterpassword": {
        if (this.communityPartnerPasswordForm.get(field)?.errors?.required) {
          return "basidDetailRequiredMessage";
        }
        if (this.mismatch) {
          return "afsGSerrorMismatch"
        }
        break;
      }
    }
    return "";
  }

  ngOnInit() {
    this.communityPartnerPasswordForm = this.fb.group({
      securityQue1: ['', Validators.required],
      securityQue2: ['', Validators.required],
      securityQue3: ['', Validators.required],
      queans1: ['', Validators.required],
      queans2: ['', Validators.required],
      queans3: ['', Validators.required],
      password: ['', Validators.required],
      reenterpassword: ['', Validators.required],
    });

    this.securityQuestions$ = this.appService.getSecurityQuestions();
    this.securityQuestions$?.subscribe((s) => {
      this.securityQuestions = s;
      this.cd.detectChanges();
    });



    this.service.gettingStarted$.subscribe(res => {

      this.formID = res;
      this.cd.detectChanges();
    });
  }

  previous() {
    let userType = this.service.getproviderInfoFromState.gettingStarted?.userType;
    console.log(userType);
    if (userType == "NonMediAssis") {
      this.route.navigate([
        RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_GETTINGSTARTED_NONMEDICALASSIS
      ]);
    }
    else if (userType == "CommuOrg") {
      this.route.navigate([
        RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_GETTINGSTARTED_NONPROVIDERREGISTRATION
      ]);
    }
    else {
      this.route.navigate([
        RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_GETTINGSTARTED_GATEPOST
      ]);
    }
  }
  next() {
    this.mismatch = false
    this.communityPartnerPasswordForm.markAllAsTouched();
    if (!this.communityPartnerPasswordForm.valid) return
    if (this.communityPartnerPasswordForm.controls["password"].value != this.communityPartnerPasswordForm.controls["reenterpassword"].value) {
      this.mismatch = true
      this.cd.detectChanges()
      return
    }

      this.route.navigate([
        RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_GETTINGSTARTED_PREPOPULATEAPPLICATION
      ]);

  }
}
