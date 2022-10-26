import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AuthorizedEvent {

  private authorizedEvent$ = new BehaviorSubject<any>(false);

  constructor() {}

  authorizedEvent() {
    return this.authorizedEvent$;  
  }
}