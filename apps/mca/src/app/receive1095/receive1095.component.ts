import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routerCancelAction } from '@ngrx/router-store';
import { TranslatePipe } from '@ngx-translate/core';
import { Utility } from '../shared/utilities/Utility';
import { Observable, Subscription } from 'rxjs';
import { AppState } from '../+state';
import { IReceive1095FormState } from '../+state/models/receive-1095-form/receive-1095-form.model';
import { Receive1095FormStoreService } from '../+state/store-service/receive-1095-form-store.service';
import { RoutePath } from '../shared/route-strategies';

@Component({
  selector: 'compass-ui-receive1095',
  templateUrl: './receive1095.component.html',
  styleUrls: ['./receive1095.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Receive1095Component implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private router: Router,
    private store: Receive1095FormStoreService,
  ) { }

  state!: IReceive1095FormState;
  stateSub!: Subscription
  basicDetailsGroup!: FormGroup;
  today = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
  firstNameMaxL = 30
  lastNameMaxL = 30
  dobMaxL = 10

  ngOnInit(): void {
    this.basicDetailsGroup = this.fb.group({
      "firstName": ['', [Validators.required, Validators.maxLength(this.firstNameMaxL)]],
      "lastName": ['', [Validators.required, Validators.maxLength(this.lastNameMaxL)]],
      "dateOfBirth": ['', [Validators.required, Validators.maxLength(this.dobMaxL), Utility.dateMaxValidator()]],
    });

    // TODORW preopulate state with case data
    
    // load data and current state
    this.stateSub = this.store.getReceive1095FormState().subscribe(state => {
      this.state = state
      this.basicDetailsGroup.get("firstName")?.patchValue(state.firstName)
      this.basicDetailsGroup.get("lastName")?.patchValue(state.lastName)
      this.basicDetailsGroup.get("dateOfBirth")?.patchValue(Utility.duetFormatDate(state.dateOfBirth))
    })
  }

  ngOnDestroy(): void {
    this.stateSub.unsubscribe;
  }

  isFieldInvalid(fieldName: string): boolean {
    let control = this.basicDetailsGroup.controls[fieldName]
    return !control.valid && control.touched;
  }

  errorMap(fieldName: string): string {
    if (!this.isFieldInvalid(fieldName)) {
        return "";
    }
    switch(fieldName) {
      case "firstName":
        if (this.basicDetailsGroup.get(fieldName)?.errors?.required) {
          return "1095fieldRequired"
        }
        break;
      case "lastName":
        if (this.basicDetailsGroup.get(fieldName)?.errors?.required) {
          return "1095fieldRequired"
        }
        break;
      case "dateOfBirth":
      case "dob":
        if (this.basicDetailsGroup.get(fieldName)?.errors?.required) {
          return "1095fieldRequired"
        }
        if (this.basicDetailsGroup.get(fieldName)?.errors?.invalidDate) {
          return "1095fieldDateInPast"
        }
        if (this.basicDetailsGroup.get(fieldName)?.errors?.duetInvalidDate) {
          return "duetInvalidDate"
        }
        break;
    }
    return ""
  }

  back(): void {
    // navigate back
    this.router.navigate([RoutePath.HOME]);
  }

  next(): void {
    // touch all fields
    this.basicDetailsGroup.markAllAsTouched()
    // validate input
    console.log(this.basicDetailsGroup)
    if (!this.basicDetailsGroup.valid) return
    
    // save data
    let updatedReceive1095FormState: IReceive1095FormState = {
      ...this.state,
      firstName: this.basicDetailsGroup.get("firstName")?.value,
      lastName: this.basicDetailsGroup.get("lastName")?.value,
      dateOfBirth: this.basicDetailsGroup.get("dateOfBirth")?.value,
    }
    this.store.updateReceive1095FormState(updatedReceive1095FormState)
    
    // navigate
    this.router.navigate([RoutePath.RECEIVE_1095,RoutePath.CASE_RECORD_ENTRY]);
  }

}
