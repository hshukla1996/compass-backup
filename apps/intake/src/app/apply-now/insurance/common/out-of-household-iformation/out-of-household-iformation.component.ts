import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { INDIVIDUAL_PROGRAMS } from "apps/intake/src/app/shared/constants/Individual_Programs_Constants";
import { RoutePath } from "apps/intake/src/app/shared/route-strategies";
import { PageQueueService } from "apps/intake/src/app/shared/services/page-queue.service";

import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from "apps/intake/src/app/shared/utilities/Utility";
import { PageQueueName } from "../../../+state/apply-now.models";
import { PageDirection } from "../../../household/household-model";
import { CURRENT_POLICY_OUTSIDE_HOUSEHOLD_COURT_ORDERED_PROGRAMS, CURRENT_POLICY_OUTSIDE_HOUSEHOLD_FIRSTNAME_PROGRAMS, CURRENT_POLICY_OUTSIDE_HOUSEHOLD_LASTNAME_PROGRAMS, PRIOR_POLICY_OUTSIDE_HOUSEHOLD_COURT_ORDERED_PROGRAMS, PRIOR_POLICY_OUTSIDE_HOUSEHOLD_FIRSTNAME_PROGRAMS, PRIOR_POLICY_OUTSIDE_HOUSEHOLD_LASTNAME_PROGRAMS } from "../../model/insurance-constants";
import { PageQueueOneConfig } from "../../model/insurance-page-queue.util";
import { InsuranceStoreService } from "../../model/insurance-store.service";
import { InsuranceType } from "../../model/insurance.model";


@Component({
    selector: "compass-ui-out-of-household-iformation",
    templateUrl: "./out-of-household-iformation.component.html",
    styleUrls: ["./out-of-household-iformation.component.scss"],
})
export class OutOfHouseholdIformationComponent implements OnInit {
    outofHouseholdOnformationForm: FormGroup | any;
    validationObj={} as any
    currentType='' as string
    keys={} as  any
    requiredFields=[] as any[]
    optionalFields=[] as any[]
    constructor(private fb: FormBuilder, private router: Router,private storeService: InsuranceStoreService,
      private pq:PageQueueService,
      ) {}

    ngOnInit(): void 
    {debugger

        this.outofHouseholdOnformationForm = this.fb.group({
            firstName: ['', ],
            lastName: ['', ],
            isThisPolicyCourtOrdered: ['', ],
        });
        const controls = this.outofHouseholdOnformationForm.controls
        this.keys  = Object.keys(controls);
        const person = this.storeService.getOutOfHouseHold() as any;
        this.pq.configQueue(PageQueueOneConfig )
       this._validateField();
        if(person!=null)
        {
          this.outofHouseholdOnformationForm.get('firstName').patchValue(person.firstName)
          this.outofHouseholdOnformationForm.get('lastName').patchValue(person.lastName)
          this.outofHouseholdOnformationForm.get('isThisPolicyCourtOrdered').patchValue(person.isThisPolicyCourtOrdered)
        }
      //  if(this.requiredFields.length==0 && this.optionalFields.length==0)
      //  {
      //   this.storeService.storeDirection(PageDirection.NEXT);
      //     this.pq.next();
      //     return;
      //  }
       
    }

    
    next()
    {
        this.outofHouseholdOnformationForm.markAllAsTouched();
        const isValid=this.outofHouseholdOnformationForm.valid;
       
        if(!isValid)
        {
            return;
        }
        let user=
        {
                firstName: '',
                lastName: '',
                isThisPolicyCourtOrdered: ''
        } as any
        this.keys.forEach((key:string) => 
        {
            user[key.toString()] = this.outofHouseholdOnformationForm.controls[key].value;

        });

        this.storeService.updateOutsideOfHouseHold(user);
        this.pq.next();

    }
    back()
    {
         const insurance=this.storeService.getInsurance();
         let path=''
         switch(insurance?.currentType){
             case InsuranceType.Current:
            path=`${RoutePath.APPLYNOW}/${RoutePath.APPLYNOW_INSURANCE}/${RoutePath.APPLYNOW_INSURANCE_CURRENTPOLICYHOLDER}`
            break;
            case InsuranceType.PRIOR:
              path=`${RoutePath.APPLYNOW}/${RoutePath.APPLYNOW_INSURANCE}/${RoutePath.APPLYNOW_INSURANCE_PRIORPOLICY_HOLDER}`
                break;
         }
       this.router.navigate([path]);
        //this.pq.back();
    }
    ngDestroy()
    {
        this.storeService.endSubscription();
    }
    private _validateField()
    {
    let householdBenefits = this.storeService.getBenefits() as string[];
    const fields = [{
      fieldName: 'firstName',
      optionalProgram: [] as string[],
      requiredProgram:(this.currentType==InsuranceType.Current)?(CURRENT_POLICY_OUTSIDE_HOUSEHOLD_FIRSTNAME_PROGRAMS as string[]):PRIOR_POLICY_OUTSIDE_HOUSEHOLD_FIRSTNAME_PROGRAMS

    }, {
      fieldName: 'lastName',
      optionalProgram: [] as string[],
      requiredProgram:(this.currentType==InsuranceType.Current)? CURRENT_POLICY_OUTSIDE_HOUSEHOLD_LASTNAME_PROGRAMS as string[]:PRIOR_POLICY_OUTSIDE_HOUSEHOLD_LASTNAME_PROGRAMS

    },
      {
        fieldName: 'isThisPolicyCourtOrdered',
        optionalProgram: [] as string[],
        requiredProgram: (this.currentType==InsuranceType.Current)? CURRENT_POLICY_OUTSIDE_HOUSEHOLD_COURT_ORDERED_PROGRAMS as string[]:PRIOR_POLICY_OUTSIDE_HOUSEHOLD_COURT_ORDERED_PROGRAMS

      },
      ] as FormValidatorField[]
    if (householdBenefits != null && householdBenefits.length > 0) {
      const requiredOrOptionalValidatorField =
        {

          selectedPrograms: householdBenefits,
          requiredFields: [],
          formGroup: this.outofHouseholdOnformationForm,
          fields: fields
        } as RequiredOrOptionalValidatorField
      Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
      this.outofHouseholdOnformationForm = requiredOrOptionalValidatorField.formGroup;
      this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
      this.optionalFields=[...requiredOrOptionalValidatorField.optionalFields] as any;
    }
    
    }
}
