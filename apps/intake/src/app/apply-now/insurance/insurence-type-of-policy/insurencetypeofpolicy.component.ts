import { Component, OnInit  } from "@angular/core";
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {Router} from '@angular/router';
import { KeyValueModal } from "../modals/keyvalue.modal";
@Component({
	selector: 'insurencetypeofpolicy',
	templateUrl: './insurencetypeofpolicy.component.html',
	styleUrls: ['./insurencetypeofpolicy.component.css']
})

export class InsurenceTypeOfPolicyComponent {
	InsurenceTypeOfPolicyForm: FormGroup | any;
	selectedInsurenceTypeOfPolicies: string[] = [];
    policyData:KeyValueModal[] = [];
  ngOnInit() {
	if(localStorage.getItem("checkboxes")) {
		this.selectedInsurenceTypeOfPolicies= JSON.parse(localStorage.getItem("checkboxes")!);
	}
  }
  constructor(private fb: FormBuilder, private route:Router) { 
	this.InsurenceTypeOfPolicyForm = this.fb.group({
		policyTypes: this.fb.array([], [Validators.required]),
	});
	this.policyData = this.getData().typeofpolicies;
	this.addInsurenceTypeToForm();
  }
  private addInsurenceTypeToForm() {
    this.policyData.forEach(() => this.isnurenceTypeOfPolicyFormArray.push(new FormControl(false)));
  }
   get isnurenceTypeOfPolicyFormArray() {
    return this.InsurenceTypeOfPolicyForm.controls.policyTypes as FormArray;
  }
  getData() {
	return {
		"typeofpolicies":[
			{
				"key":"employer",
				"value":"Employer Insurance"
			},
			{
				"key":"medicare",
				"value":"Medicare"
			},
			{
				"key":"tricare",
				"value":"TRICARE"
			},
			{
				"key":"peacecorps",
				"value":"Peace Corps"
			},
			{
				"key":"Causcasian",
				"value":"Individual Plan"
			},
			{
				"key":"other",
				"value":"Other"
			}
		]
	};
  }
  onCheckboxChange(e: any) {
	if (e.target.checked) {
		this.selectedInsurenceTypeOfPolicies.push(e.target.value);
	} else {
	  let i: number = 0;
	  this.selectedInsurenceTypeOfPolicies.forEach((item: any) => {
		if (item == e.target.value) {
			this.selectedInsurenceTypeOfPolicies.splice(i, 1);
		    return;
		}
		i++;
	  });
	}
  }
  submit() {
	localStorage.setItem("checkboxes", JSON.stringify(this.selectedInsurenceTypeOfPolicies));
	this.route.navigate(['/socialsecuritynumber']);
  }
}	