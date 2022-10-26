import { ChangeDetectionStrategy, EventEmitter, Component, Input, Output, Directive, Renderer2, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from '@compass-ui/data';
import { Age, BasicDetail, Programs, ProgramSelection, TotalHouseHoldValue } from '../+state/do-i-qualify.models';
import { MenuItemState } from '../../shared/menu-item-state';
import { RoutePath } from '../../shared/route-strategies';
import { DoIQualifyProgramSelectionStrategy } from '../../shared/route-strategies/do-i-qualify/program-selection';
import { DoIQualifyService } from '../../shared/services/do-i-qualify.service';
import { PageActionDirection, PageActionUtil } from '../../shared/services/page-action-util.service';
import { UtilService } from '../../shared/services/util.service';
import { DoIQualifyStoreService } from '../do-i-qualify-store-service';

@Component({
  selector: 'compass-ui-program-selection',
  templateUrl: './program-selection.component.html',
  styleUrls: ['./program-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DoIQualifyProgramSelectionStrategy],
})

export class ProgramSelectionComponent {

  isValidated!: boolean;
  programSelectionGroup!: FormGroup | any;
  programList = [{
    id: Programs.HA,
    selected: false,
    name: "Health Care Coverage",
    program_id: "hsId",
    program_desc: "Includes Children's Health Insurance Program (CHIP), Medical Assistance, Medicaid for Former Foster Care Youth, Mental Health/Substance Abuse, Pennsylvania's Health Insurance Marketplace (Pennie).",
    program_link: "https://www.compass-t.state.pa.us/Compass.Web/Public/MoreInformation",
    program_link_desc: "More about Health Care Coverage "
  },
  {
    id: Programs.FS,
    selected: false,
    name: "Food Assistance",
    program_id: "fsId",
    program_desc: "Supplemental Nutrition Assistance Program (SNAP) formerly known as Food Stamps. ",
    program_link: "https://www.dhs.pa.gov/Services/Assistance/Pages/SNAP.aspx",
    program_link_desc: "More about Food Assistance "

  },
  {
    id: Programs.CA,
    selected: false,
    name: "Cash Assistance",
    program_id: "caId",
    program_desc: "Temporary Assistance for Needy Families (TANF), State Blind Pension, and Refugee Cash Assistance give cash help to people or families in need.",
    program_link: "https://www.dhs.pa.gov/Services/Assistance/Pages/Cash-Assistance.aspx",
    program_link_desc: "More about Cash Assistance"

  },
  {
    id: Programs.BL,
    selected: false,
    name: "Free or Reduced-Price School Meals ",
    program_id: "blId",
    program_desc: "The National School Lunch Program (NSLP) gives low-cost or free school meals to children who qualify.",
    program_link: "https://fns-prod.azureedge.us/sites/default/files/resource-files/NSLPFactSheet.pdf",
    program_link_desc: "More about Free or Reduced-Price School Meals"

  },
  {
    id: Programs.LH,
    selected: false,
    name: "Help With Paying Your Heating Bill",
    program_id: "liId",
    program_desc: "The Low-Income Home Energy Assistance Program (LIHEAP) helps pay your energy bills. ",
    program_link: "https://www.dhs.pa.gov/Services/Assistance/Pages/LIHEAP.aspx",
    program_link_desc: "More about LIHEAP"

  }
    ,
  {
    id: Programs.CI,
    selected: false,
    name: "Help With Paying for Child Care",
    program_id: "ciId",
    program_desc: "The Child Care Works program helps families pay for child care. ",
    program_link: "https://www.dhs.pa.gov/Services/Children/Pages/Child-Care-Works-Program.aspx",
    program_link_desc: "More about Help Paying for Child Care"

  }

  ];
  basicDetails!: BasicDetail[]
  constructor(private formBuilder: FormBuilder,
    private service: DoIQualifyStoreService,
    private doIQualifyService: DoIQualifyService,
    private cd: ChangeDetectorRef,
    private strategy: DoIQualifyProgramSelectionStrategy,
    private router: Router,
    private pageActionUtil: PageActionUtil,
    private utilService: UtilService) { }
  get programs(): FormArray {
    return <FormArray>this.programSelectionGroup.controls['program'];
  }
  private buildInitialForm(): void {
    this.programSelectionGroup = this.formBuilder.group({
      program: this.formBuilder.array([], [Validators.required])
    });
  }

  private setupCheckboxFromState() {

    let checkedList = [...this.service.getProgramSelection];

    let conditionBasedPrograms = [] as any;
    if (!this.isValidChildCareAge()) conditionBasedPrograms.push(Programs.CI);
    if (!this.isValidReducePriceSchoolMealAge()) conditionBasedPrograms.push(Programs.BL);
    checkedList = checkedList.filter((program) => conditionBasedPrograms.indexOf(program) == -1);
    checkedList.forEach((value: any) => {
      const index = this.programList.findIndex(val => val.id == value);
      if (index > -1) {
        this.programs.push(new FormControl(value));
        this.programList[index].selected = true;

      }
    });
  }

  private setCheckboxValue(value: any, isChecked: any): void {

    if (isChecked) {

      this.programs.push(new FormControl(value));
    }
    else {
      let programIndex = this.getIndex(value)
      if (programIndex > -1) {
        this.programs.removeAt(programIndex);
      }

    }

  }

  ngOnInit(): void {

    this.basicDetails = this.service.getBasicDetails() ?? [];
    this.buildInitialForm();
    this.setupCheckboxFromState();
    this.programSelectionGroup.valueChanges.subscribe((d: any) => {


    });
    this.doIQualifyService.triggerNextUpdated$.subscribe(next => {
      if (next) {

        this.programSelectionGroup.markAllAsTouched();
        this.cd.detectChanges();
      }
    });
    this.service.formStateUpdated(RoutePath.DOIQUALIFY_PROGRAMSELECTION, MenuItemState.INPROGRESS);
  }
  onCheckboxChange(value: string, index: number, e: any): void {
    this.setCheckboxValue(value, e.currentTarget.checked);

  }

  getIndex(value: string): number {
    return this.programs.controls.findIndex(ctrl => ctrl.value == value);
  }
  ngOnDestroy(): void {
    this.service.formStateUpdated(RoutePath.DOIQUALIFY_PROGRAMSELECTION, MenuItemState.COMPLETED);
  }
  isFieldValid(): boolean {
    return (this.programSelectionGroup.get('program').status !== 'VALID' && (this.programSelectionGroup.get('program').dirty || this.programSelectionGroup.get('program').touched))
  }
  checkboxChange(programId: string, data: any) {
    this.setCheckboxValue(programId, data.checked);
  }
  isDisabled(program_id: string) {

    let isDisabled = false;
    switch (program_id) {

      case Programs.CI:
        isDisabled = (this.isValidChildCareAge()) ? false : true;
        break;
      case Programs.BL:
        isDisabled = (this.isValidReducePriceSchoolMealAge()) ? false : true;
        break;
      default:
        isDisabled = false;
    }
    return isDisabled;


  }
  next() {

    this.programSelectionGroup.markAllAsTouched();
    if (!this.programSelectionGroup.valid) return;
    this.service.programSelectionUpdated({ programs: this.programSelectionGroup.value.program } as ProgramSelection)
    const values = this.programSelectionGroup.value.program as string[];
    const conditionalPrograms = [Programs.HA, Programs.BL] as string[]
    const hasHouseholdValue = conditionalPrograms.some((value: any) => {
      return values.indexOf(value) !== -1;
    });
    if (hasHouseholdValue) {
      this.router.navigate([this.strategy.nextRoute()]);
    }
    else {
      this.service.houseHoldValueUpdated({} as TotalHouseHoldValue);
      this.router.navigate([this.strategy.otherhouseholdSituationsPath()]);

    }

  }
  back() {



    if (this.hasGuardianOrParent()) {
      const minId = this.utilService.getMinId(this.basicDetails);
      const children = this.basicDetails.filter(
        (detail) => detail.age <= 18 && detail.id != minId
      );
  if(children.length==0){
    this.router.navigate([this.strategy.previousRoute()]);
    return;
  }
        if (children.length == 1) {
          const ind = this.basicDetails.findIndex((person) => person.id == minId);
          if (ind >= 0) {
            const age = this.basicDetails[ind].age;
            if (age < 11) {
              this.router.navigate([this.strategy.previousRoute()]);
              return;
            }
          }
        }
      this.pageActionUtil.initPageMap("guardianMap", "guardianPageDirection", false);
      this.pageActionUtil.updatePageActionDetail(PageActionDirection.BACK);
      this.router.navigate([this.strategy.guardianPath()])
    }
    else this.router.navigate([this.strategy.previousRoute()])
  }
 
 
  hasGuardianOrParent() {
    const individualLen = this.basicDetails.length;
    if (individualLen < 2) return false;
    const isAgeEighteenOrUnder = this.basicDetails.filter((person) => person.age <= 18).length > 0;
    if (isAgeEighteenOrUnder) {
      const isAgeElevenOrAbove = this.basicDetails.filter((person) => person.age >= 11).length > 0;
      return isAgeElevenOrAbove;
    }
    return false;
  }
  isValidChildCareAge() {
    return (this.basicDetails.filter((detail) => detail.age < Age.CIAGE).length > 0)
  }
  isValidReducePriceSchoolMealAge() {
    return (this.basicDetails.filter((detail) => detail.age < Age.BLAGE).length > 0)
  }



}
