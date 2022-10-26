import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageErrorService {

  public static errorMessage = "Unknown"
  constructor() { }
}
