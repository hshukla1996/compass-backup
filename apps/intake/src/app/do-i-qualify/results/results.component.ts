import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BasicDetail, DoIQualifyAPIModel, DoIQualifyAPIRequestStatus, DoIQualifyAPIResponseStatus, DoIQualifyState, Household, Individual, Results } from '../+state/do-i-qualify.models';
import { DoIQualifyStoreService } from '../do-i-qualify-store-service';
import { DoIQualifyService } from '../../shared/services/do-i-qualify.service';
import { RoutePath } from '../../shared/route-strategies';
import { MenuItemState } from '../../shared/menu-item-state';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { AppStoreService } from '../../app-store-service';
import { MenuData } from '@compass-ui/data';

@Component({
  selector: 'compass-ui-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  options: AnimationOptions = {
    path: '../../../assets/img/loading.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  @Input() data!: Results | null;
  public expanded = true;
  private state!: DoIQualifyState
  public programs = {
    "CA": null,
    "HS": null,
    "FS": null,
    "BL": null,
    "LH": null,
    "CI": null,
    "HA": null
  } as any
  isLoading = true;
  loadingText = "Loading..."
  referenceNumber = null as any;
  benefitResult = [] as any
  yesnoValues!: any[]
  APIREQUEST_YES!: any;
  APIREQUEST_NO!: any;
  constructor(private service: DoIQualifyStoreService,
    private doIQualifyService: DoIQualifyService,
    private router: Router, private cd: ChangeDetectorRef,
    private appService: AppStoreService

  ) {

  }

  ngOnInit(): void {
    
    try {
    
      this.state = this.service.getState();
      let detail = this.state.basicDetails?.basicDetails;
      const yesNoValues = this.state.yesNoValues;
      if (yesNoValues != null) {
        this.APIREQUEST_YES = yesNoValues.YesValue;
        this.APIREQUEST_NO = yesNoValues.NoValue
      }
      const mappedObj = this.mapObject(detail as BasicDetail[])
      setTimeout(() => {
        this.doIQualifyService.postDoIQualify(mappedObj).subscribe(response => {
          const result = response as any;
          this.isLoading = false
          if (result.benefitResults != undefined && result.benefitResults.length > 0) {
            this.benefitResult = result.benefitResults;
          }
          let resultProgram = {} as any;
          this.benefitResult.forEach((detail: any) => {
            resultProgram[detail.id] = (detail.status == DoIQualifyAPIResponseStatus.NO) ? false : true;
          })
          this.programs = { ...resultProgram }
        });
        this.service.menuStateDisabled()

      });
      
    }
    catch (ex) {
      this.loadingText = "Something went wrong"
    }
  }

  getPrograms(programs: any) {
    return programs.map((prg: any) => prg.id)
  }
  expand() {
    this.expanded = !this.expanded;
  }
  applyNow() {
    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_GETTINGSTARTED]);
  }
  ngOnDestroy() {
    this.service.clearStore()
    sessionStorage.removeItem("state");
  }
  hasStatusNo() {
    return this.benefitResult.some((value: any) => {
      return value.status == DoIQualifyAPIResponseStatus.NO;
    });
  }
  hasNoProgramQualified() {
    return this.benefitResult.every((value: any) => {
      return value.status == DoIQualifyAPIResponseStatus.NO;
    }) && this.benefitResult.length == this.state.programSelection?.programs.length;

  }
  hasStatusYes() {
    return this.benefitResult.some((value: any) => {
      return value.status == DoIQualifyAPIResponseStatus.YES;
    });
  }
  getApprovedBenefits() {
    let defaultPath = ['HA','FS','CA','BL','LH','CI'];
    const result=this.benefitResult.filter((detail: any) => detail.status == DoIQualifyAPIResponseStatus.YES) as any[]
    if(result.length>0)
    {
      const mapCol=result.map((res)=>res.id);
      const results = defaultPath.filter((path) => {
        return mapCol.indexOf(path) > -1
      })
      return results;
    }
    
    return []

  }
  mapObject(detail: BasicDetail[]) {

    let details = detail.map(({ hasOtherIncome, headOfHouse, hasEnrolledInSchool, dob, ...keepAttrs }) => keepAttrs) as BasicDetail[]
    details = details.map((detail: any) => {
      return { ...detail, firstName: detail.firstName.replace(/ +/g, ' '), lastName: detail.lastName.replace(/ +/g, ' ') }
    })
    const individuals = [] as Individual[]

    details.forEach((detail: any) => {
      let individual = {} as any;
      Object.keys(detail as any).forEach((key: any) => {
        const val = detail[key] as any;
        if (typeof val == "boolean") {
          individual[key] = (val) ? this.APIREQUEST_YES : this.APIREQUEST_NO
        }

        else {
          individual[key] = val;
        }
      })
      individuals.push(individual);
    })

    let household = { ...this.state.otherHouseholdSituations } as any;
    household.totalValueOfResources = this.state.householdValue?.totalvalue;
    this.removePropertiesFromHousehold(["childOfUnitedStatesVeteran"], household)
    let _household = {} as any

    Object.keys(household as any).forEach((key: any) => {
      const val = household[key] as any
      if (typeof val == "boolean") {
        _household[key] = val == true ? this.APIREQUEST_YES : this.APIREQUEST_NO
      }
      else {
        _household[key] = val
      }
    })

    return { "individuals": individuals, "household": _household, "benefits": this.state.programSelection?.programs } as DoIQualifyAPIModel

  }
  gotoPage(id: number) {
    switch (id) {
      case 0: this.router.navigate([RoutePath.HOME])
        break;
      case 1: this.router.navigate([RoutePath.DOIQUALIFY + "/" + RoutePath.DOIQUALIFY_GETTINGSTARTED])
        break
      case 2:
        this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_GETTINGSTARTED]);
        break;
    }

  }
  removePropertiesFromHousehold(properties: string[], household: any) {
    properties.forEach((key: any) => {
      if (key in household) {
        delete household[key];
      }
    });

  }


}
