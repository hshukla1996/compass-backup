import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { IChangeReportState } from '../+state/models/change-report/change-report.model';
import { TicketDetail } from '../+state/models/change-report/ticket.model';
import { ChangeReportStoreService } from '../+state/store-service/change-report-store.service';
import { getCaseInfoURL, getScannedDocURL, getTicketInfoURL, getTicketsURL, saveReportChangesURL } from '../shared/constants/Constants';
import { RoutePath } from '../shared/route-strategies';

@Injectable({
  providedIn: 'root'
})
export class ReportChangesService {

  public selectedChanges: string[] | any = [];
  public selectedIncomeChanges: string[] | any = [];
  public selectedHouseholdChanges: string[] | any = [];
  public selectedDocumentCategory!: string;
  public selectedDocumentType!: string;
  changeReportState!: IChangeReportState;
  private previousUrl!: string;
  private currentUrl!: string;

  constructor(private router: Router, private storeService: ChangeReportStoreService,
    private http: HttpClient) { 
    this.storeService.getAppData().subscribe((d) => {
      this.changeReportState = { ...d };
      this.selectedChanges = this.changeReportState.selectedChanges;
      this.selectedIncomeChanges = this.changeReportState.selectedIncomeChanges;
      this.selectedHouseholdChanges = this.changeReportState.selectedHouseholdChanges;
    });

    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }

  public getPreviousUrl() {
    return this.previousUrl;
  }

  getTickets(payload: any): Observable<TicketDetail[]> {
    return this.http
      .post(getTicketsURL, payload)
      .pipe(
        map((data: any) => {
          console.log(data, "data");
          return data;
        })
      );
  }

  getScannedDocuments(payload: any): Observable<any> {
    return this.http
      .post(getScannedDocURL, payload)
      .pipe(
        map((data: any) => {
          console.log(data, "data");
          return data;
        })
      );
  }

  getTicketDetail(payload: any): Observable<any> {
    return this.http
      .post(getTicketInfoURL, payload)
      .pipe(
        map((data: any) => {
          console.log(data, "data");
          return data;
        })
      );
  }

  saveReportChanges(payload: any): Observable<any> {
    return this.http
      .post(saveReportChangesURL, payload)
      .pipe(
        map((data: any) => {
          console.log(data, "data");
          return data;
        })
      );
  }

  getCaseInformation(): Observable<any> {
    return this.http
      .get(getCaseInfoURL)
      .pipe(
        map((data: any) => {
          console.log(data, "data");
          return data;
        })
      );
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      //{2}
      const control = formGroup.get(field); //{3}
      if (control instanceof FormControl) {
        // console.log(control);
        //	this.isFieldValid(field)
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        //{5}
        this.validateAllFormFields(control); //{6}
      }
    });
  }

  navigateToNextChange(currentRoute: string) {
    const index = this.selectedChanges.findIndex((c: string) => c === currentRoute);
    if (index !== this.selectedChanges.length - 1) {
      const route = this.selectedChanges[index + 1];
      // @ts-ignore
      this.router.navigate([RoutePath[route]]); 
    } else {
      this.router.navigate([RoutePath.REPORT_SUMMARY]);
    }
  }

  navigateToNextIncomeChange(currentRoute: string) {
    const index = this.selectedIncomeChanges.findIndex((c: string) => c === currentRoute);
    if (index !== this.selectedIncomeChanges.length - 1) {
      const route = this.selectedIncomeChanges[index + 1];
      // @ts-ignore
      this.router.navigate([RoutePath[route]]);
    } else {
      this.navigateToNextChange('INCOME_JOB_CHANGE');
    }
  }

  navigateToNextHouseholdChange(currentRoute: string) {
    const index = this.selectedHouseholdChanges.findIndex((c: string) => c === currentRoute);
    if (index !== this.selectedHouseholdChanges.length - 1) {
      const route = this.selectedHouseholdChanges[index + 1];
      // @ts-ignore
      this.router.navigate([RoutePath[route]]);
    } else {
      this.navigateToNextChange('PREGNANCY_OTHER_HOUSEHOLD');
    }
  }

}
