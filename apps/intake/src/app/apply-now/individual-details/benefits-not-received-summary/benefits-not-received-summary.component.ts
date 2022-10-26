import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IApplyNowState, IBenefits, IBenefitsNotReceviedData } from '../../+state/apply-now.models';
import { AppStoreService } from '../../../app-store-service';
import { IHousehold } from '../../../referrals/+state/contact-information-model';
import { RoutePath } from '../../../shared/route-strategies';
import { PageActionDirection, PageActionUtil } from '../../../shared/services/page-action-util.service';
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold } from '../../household/household-model';
import { ScreenQueueUtil } from '../individuals-medical-gatepost/individuals-medical-gatepost.path';

@Component({
  selector: 'compass-ui-benefits-not-received-summary',
  templateUrl: './benefits-not-received-summary.component.html',
  styleUrls: ['./benefits-not-received-summary.component.scss']
})

export class BenefitsNotReceviedSummaryComponent implements OnInit {
  @ViewChild("closeModal") closeModal!: ElementRef;
  householdPersons!:IHouseHold[]
  indexExpanded = -1 as any;
 benefitId!:any
 id!:number
  public benefitTypes: any = [];

  constructor(
    private service: ApplyNowStoreService,
    private router: Router, private pageActionUtil: PageActionUtil, private appService: AppStoreService, private queueService: ScreenQueueUtil) { 

    this.appService.getBenefitTypes().subscribe((types) => {
      this.benefitTypes = types;
    })
    }

  ngOnInit(): void {
    
    this.pageActionUtil.initPageMap("benefitNotRecievedMap", "benefitNotRecievedDirection", false);
    this.householdPersons = this.service.getHouseholdPersons() as IHouseHold[]
    let persons=[...this.householdPersons];
    persons = persons.map((item, ind) => ((item.benefitsNotReceivedInformation != null && item.benefitsNotReceivedInformation?.hasAppliedForBenefitButNotReceived == 'Y' && (item.benefitsNotReceivedInformation?.benefits??[]).length>0) ? {
      ...item,
      benefits: item.benefitsNotReceivedInformation?.benefits
    } : { ...item }));
    this.householdPersons=[...persons]
  }

  public addBeneiftsNotReceived(): void{
    
    const filteredPersons=this.householdPersons.filter((item)=>{
     const benefits= item.benefitsNotReceivedInformation?.benefits
      return benefits??[].length < this.benefitTypes.length
    });
    if (filteredPersons.length==0)return;
    this.service.updateFromSummary({ isFromAdd: true, benefitId: null })
    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_BENEFITSNOTRECEIVED]);
    
  }
  formateLabel(abrel:IHouseHold)
  {
   return `${abrel.firstName as string
      } ${abrel.lastName as string} ${Utility.getAge(abrel.dateOfBirth)}` || ''
  }
  navigateToEdit(id:any,benefitId:any){
    const index=this.householdPersons.findIndex((person)=>person.id==id);
    this.updateMap(index);
    this.service.updateFromSummary({ isFromAdd: false, benefitId: benefitId })
    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_BENEFITSNOTRECEIVEDDETAILS]);
  }
  updateMap(index: number) 
  {
    this.pageActionUtil.emptyMap();
    this.pageActionUtil.changeMapValue(index, false)
    this.pageActionUtil.updatePageActionDetail(PageActionDirection.NEXT, true)
  }
  getUniqueId(index:any,person:IHouseHold){
return (index+1)+''+person.id;
  }
  setdeleteUser(id:any,code:any){
    
    this.benefitId=code;
    this.id=id;
  }
  back(){
    const persons = [...this.getFilteredPersons()]
    if (persons.length == 0) {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_BENEFITSNOTRECEIVED]);
      return;
    }
    const len = persons.length;
    const id = persons[len - 1].id;
    const maxIndex = this.householdPersons.findIndex((person) => person.id == id);

    this.updateMap(maxIndex)
    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_BENEFITSNOTRECEIVEDDETAILS]);
    
  }
  next()
  {
this.queueService.next();
  }
  deleteUser()
  {
    
   let persons=[...this.householdPersons]; 
    let filteredPerson=this.householdPersons.filter((person:IHouseHold)=>{
      return person?.id===this.id && (person.benefitsNotReceivedInformation?.benefits??[].findIndex((benefit:any)=>benefit.code===this.benefitId) >-1)
    }) 
    if (filteredPerson.length>0)
    {
      let benefits=filteredPerson[0].benefitsNotReceivedInformation?.benefits??[];
      const index=this.householdPersons.findIndex((person)=>person.id===filteredPerson[0].id);
     
      benefits = (benefits?.length == 0)?[]:benefits.filter((benefit:IBenefits)=>{
        return benefit.code!==this.benefitId;
      })
      const hasNotRecievedBenefit=benefits.length==0?'N':'Y';
      persons = persons.map((item, ind) => ((ind == index) ? {

        ...item,
        benefits: benefits,
        benefitsNotReceivedInformation: { ...item.benefitsNotReceivedInformation, benefits: benefits,hasAppliedForBenefitButNotReceived:hasNotRecievedBenefit }
      } : { ...item, benefitsNotReceivedInformation: { ...item.benefitsNotReceivedInformation } }));
    }
    const storedHouseholdDetails = this.service.getHouseHoldDetails;
    this.service.updateHouseHoldDetails(
      { ...storedHouseholdDetails, houseHoldPersons: persons } as any
    )
    this.householdPersons=[...persons]
    setTimeout(() => {
      this.closeModal.nativeElement.click();
      
      
    }, 100);
    
  }
  formatDate(date: any) {
    if (date) {
      const [year, month, day] = date.split("-");

      const result = [month, day, year].join("/");
      return result;
    }
    return date;
  }
  getFilteredPersons() {
    const persons = this.householdPersons.filter((person: IHouseHold) => {
      return person.benefitsNotReceivedInformation?.hasAppliedForBenefitButNotReceived=='Y'

    })
    return persons;
  }
  getFilteredPersonWithBenefit(){
    
    const persons = this.householdPersons.filter((person: IHouseHold) => {
      
      const benefit=person?.benefitsNotReceivedInformation
      const benefits = benefit?.benefits ?? [];
      return (benefit !== null && JSON.stringify(benefit) != '{}' && benefits.length < this.benefitTypes.length)

    })
   
    return persons.length==0?false:true;
  }
  
}
