import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AppStoreService } from "../../../app-store-service";
import { RoutePath } from "../../../shared/route-strategies";
import { ApplyNowStoreService } from "../../apply-now-store-service";

@Component({
    selector: "compass-ui-situation-gatepost",
    templateUrl: "./situation-gatepost.component.html",
    styleUrls: ["./situation-gatepost.component.scss"],
})
export class SituationGatepostComponent implements OnInit {
    situationGatepostGroup: FormGroup | any;
    situationSelected: any[] = [];
    displayError = false;
    errorMessage = "This field is required."
    voterInfoFromState: any
    situationSelectedData: any
    disablecheckboxes = false;
    situations$: Observable<any> | undefined;
    votersituations: any;
    test: any;
    map = {} as any;
    keys!: any[];
    constructor(private fb: FormBuilder, private cd: ChangeDetectorRef, private router: Router, private service: ApplyNowStoreService, private appService: AppStoreService,) { }



    ngOnInit() {
        this.situationGatepostGroup = this.fb.group({
            situationSelected: this.fb.array([], [Validators.required]),
        });
        this.voterInfoFromState = this.service.applyNow.voterRegistration
        this.situationSelectedData = this.voterInfoFromState.votingApplicationType;
        console.log("this.situationSelectedData", this.situationSelectedData)
        this.situations$ = this.appService.getSituations();

        this.situations$?.subscribe((s) => {
             
            this.votersituations = s; 
            // this.keys = Object.keys(this.votersituations.map((m: { id: any; }) => m.id)) 
            // this.keys = this.votersituations.map((m: any) => { return Object.keys(m) })

            // this.keys = this.keys.map((cl: any, index: any) => {

                
            //     return cl[0]
            // }) 
            this.keys = Object.values(this.votersituations.map((m: any) => m.id))





            // this.keys = Object.keys(this.votersituations)
            this.keys.forEach(key => {
                this.map[key] = false
            })
            this.testDate();

        });

    }
    testDate(){
        
        this.keys = Object.values(this.votersituations.map((m: any) => m.id))
        const lastKey = this.keys[this.keys.length - 1]
        const lastValue = this.map[lastKey]
        console.log(this.situationSelectedData)
        if (this.situationSelectedData?.length > 0){
        if (this.situationSelectedData?.indexOf('1') > -1) {
            this.keys.forEach(key => {
                this.map[key] = (key == '1') ? false : true

            })
        } else {
            
                this.keys.forEach(key => {
                    this.map[key] = false;
                    // this.map[key] = (key <= lastKey) ? false : true

                })

                this.map[this.keys[0]] = true

            
        }
        this.map[lastKey] = lastValue
        }
    }
    onCheckboxChange(value: string, status: boolean) {
        console.log(status, "status")
        const firstKey = this.keys[0]
        const lastKey = this.keys[this.keys.length - 1]
        const lastValue = this.map[lastKey]
        if (status) {
            
            this.situationSelected = this.situationSelected.concat([value]);
            console.log(this.situationSelected, "this.resd")
            if (this.situationSelected.indexOf('1') > -1  ) { 
                this.keys.forEach(key => {
                    this.map[key] = (key == '1' ) ? false : true
                   
                })
            } else  { 
                if (parseInt(value) !== parseInt(lastKey)) {
                this.keys.forEach(key => {
                    this.map[key] = false;  
                    // this.map[key] = (key <= lastKey) ? false : true

                })
              
                    this.map[this.keys[0]] = true 

                }
            }

        // this.map[lastKey] = lastValue
        } else {
            for (let i = 0; i < this.situationSelected.length; i++) {
                if (this.situationSelected[i] === value) {
                    this.situationSelected.splice(i, 1);
                }
            }
          
            if (this.situationSelected.indexOf(firstKey) == -1 && parseInt(value) == firstKey) {
                this.keys.forEach(key => {
                    this.map[key] = false 
                })
            } else { 
                
                
                const _isFirstDisable =  this.situationSelected.filter((val) => {
                    return parseInt(val) > parseInt(firstKey) && parseInt(val) < lastKey  
                }).length > 0;
                this.map[firstKey] = _isFirstDisable 
            } 
        }
        this.map[lastKey] = lastValue

    }


    checkboxChange(situationId: string, data: any) {
        this.setCheckboxValue(situationId, data.checked);
    }
    get situations(): FormArray {
        return <FormArray>this.situationGatepostGroup.controls['situationSelected'];
    }
    private setCheckboxValue(value: any, isChecked: any): void {

        if (isChecked) {

            this.situations.push(new FormControl(value));
        }
        else {
            let programIndex = this.getIndex(value)
            if (programIndex > -1) {
                this.situations.removeAt(programIndex);
            }

        }
        console.log(this.situations, "this.situations")

    }
    isDisabled(situation_id: string) {

        if (this.situationSelected.length == 0) {
            return false
        }

        if (this.situationSelected.indexOf(situation_id) > -1) {
            return true

        }
        // let isDisabled = false;

        // switch (situation_id) {

        //     // case Programs.CI:
        //     //     isDisabled = (this.isValidChildCareAge()) ? false : true;
        //     //     break;
        //     // case Programs.BL:
        //     //     isDisabled = (this.isValidReducePriceSchoolMealAge()) ? false : true;
        //     //     break;
        //     default:
        //         isDisabled = false;
        // }
        return false;


    }
    getIndex(value: string): number {
        return this.situations.controls.findIndex(ctrl => ctrl.value == value);
    }
    isFieldValid(): boolean {
        return (this.situationGatepostGroup.get('situationSelected').status !== 'VALID' && (this.situationGatepostGroup.get('situationSelected').dirty || this.situationGatepostGroup.get('situationSelected').touched))
    }
    ischecked(value: string) {
        return this.findIndex(value) >= 0
    }
    findIndex(value: any) {
        return this.situationSelected.findIndex(d => d === value)
    }
    next() {
        if (this.situationSelected.length == 0) {
            this.displayError = true;
            return
        } else {
            this.displayError = false;
        }
        const situationSelected = {
            votingApplicationType: this.situationSelected
        }
        const existingVoterInfo = { ...this.service.applyNow.voterRegistration, ...situationSelected };
        this.service.updatedVoterRegistrationDetails({ ...existingVoterInfo })
        if (this.situationSelected.indexOf('2') > -1 || this.situationSelected.indexOf('3') > -1 || this.situationSelected.indexOf('4') > -1) {
            this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_PREVIOUSREGISTRATION]);
        } else {
            this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_BASICDETAILS]);

        }
    }

    back() {
        this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_REQUIREMENTQUESTIONS]);

    }
}
