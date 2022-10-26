import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, of } from 'rxjs';
import { IChangeReportState, IHouseHoldInformation } from '../../+state/models/change-report/change-report.model';
import { ChangeReportStoreService } from '../../+state/store-service/change-report-store.service';
import { RefDataStoreService } from '../../+state/store-service/ref-data-store.service';
import { RoutePath } from '../../shared/route-strategies';
import { ReportChangesService } from '../report-changes.service';
import { MCAGISValidationStrategy } from './address-validation-service';

@Component({
  selector: 'compass-ui-address-change',
  templateUrl: './address-change.component.html',
  styleUrls: ['./address-change.component.css']
})
export class AddressChangeComponent implements OnInit {
  changeReportState!: IChangeReportState;
  householdInformation!: IHouseHoldInformation | any;
  addressChangeForm: FormGroup | any;
  loadingUSPS = false;
  states: any;
  counties: any;
  schoolDistricts: any;
  townships: any[] = [];
  selectedTownshipName: any;
  selectedSchoolDistrictName: any;
  anotherAddressCon = false;
  isAddressGISValidated = false;
  changedApplicantAddress = false;
  changedMailingAddress = false;
  constructor(private fb: FormBuilder, private router: Router,
    private reportChangesService: ReportChangesService,  
    private storeService: ChangeReportStoreService,
    private cd: ChangeDetectorRef, private routingStratagy: MCAGISValidationStrategy,
    private refService: RefDataStoreService) { }

  ngOnInit(): void {
    this.addressChangeForm = this.fb.group({
      AddressLine1: ["", Validators.required],
      AddressLine2: [" "],
      City: ["", Validators.required],
      State: ["", Validators.required],
      Zip: ["", Validators.required],
      County: ["", Validators.required],
      school: ["", Validators.required],
      school1: ["", Validators.required],
      township: ["", Validators.required],
      township1: ["", Validators.required],
      anotherAdd: ["", Validators.required],
      anotherAddress: [""],
      anotherAddress2: [""],
      anotherCity: [""],
      anotherState: [""],
      anotherZip: [""]
    });
    this.refService.initStates().subscribe((states) => {
      this.states = states;
      this.cd.detectChanges();
    });
    
    this.refService.initCounties().subscribe((c) => {
      this.counties = c;
      this.cd.detectChanges();
    })
    this.refService.initSchoolDistricts().subscribe((c) => {
      this.schoolDistricts = c;
      this.cd.detectChanges();
    });

    this.refService.initTownships().subscribe((townShip) => {
      this.townships = townShip;
      this.cd.detectChanges();
    });

    this.addressChangeForm
      .get("township")
      .valueChanges.subscribe((selectedValue: string) => {
        this.selectedTownshipName = selectedValue;

        if (selectedValue === "99999") {
          this.addressChangeForm
            .get("township1")
            .setValidators(Validators.required);
          //this.addressChangeForm.controls['township1'] = "";
        } else {
          this.addressChangeForm
            .get("township1")
            .clearValidators();
        }
        this.addressChangeForm
          .get("township1")
          .updateValueAndValidity();
      });
    this.addressChangeForm
      .get("school")
      .valueChanges.subscribe((selectedValue: string) => {
        this.selectedSchoolDistrictName = selectedValue;
        if (selectedValue === "99999") {
          this.addressChangeForm
            .get("school1")
            .setValidators(Validators.required);
          // this.addressChangeForm.controls["school1"] = "";
        } else {
          this.addressChangeForm.get("school1").clearValidators();
        }
        this.addressChangeForm
          .get("school1")
          .updateValueAndValidity();
      });
    this.addressChangeForm.get('AddressLine1').valueChanges.subscribe((val: any) => {
      this.changedApplicantAddress = true;
    });
    this.addressChangeForm.get('AddressLine2').valueChanges.subscribe((val: any) => {
      this.changedApplicantAddress = true
    });
    this.addressChangeForm.get('City').valueChanges.subscribe((val: any) => {
      this.changedApplicantAddress = true;
    });
    this.addressChangeForm.get('Zip').valueChanges.subscribe((val: any) => {
      this.changedApplicantAddress = true
    });
    this.addressChangeForm.get('anotherAddress').valueChanges.subscribe((val: any) => {
      this.changedMailingAddress = true;
    });
    this.addressChangeForm.get('anotherAddress2').valueChanges.subscribe((val: any) => {
      this.changedMailingAddress = true;
    });
    this.addressChangeForm.get('anotherCity').valueChanges.subscribe((val: any) => {
      this.changedMailingAddress = true;
    });
    this.addressChangeForm.get('anotherZip').valueChanges.subscribe((val: any) => {
      this.changedMailingAddress = true;
    });
    this.storeService.getAppData().subscribe((d) => {
      this.changeReportState = { ...d };
      this.householdInformation = this.changeReportState.householdInformation;
      of(true)
        .pipe(delay(10))
        .subscribe(() => {
          this.addressChangeForm.patchValue({
            AddressLine1: this.householdInformation?.residentAddress?.streetAddressLine1,
            AddressLine2: this.householdInformation?.residentAddress?.streetAddressLine2,
            City: this.householdInformation?.residentAddress?.city,
            //State: this.detail?.state,
            State: this.householdInformation?.residentAddress?.state,
            Zip: this.householdInformation?.residentAddress?.zip,
            County: this.householdInformation?.residentAddress?.county,
            school: this.householdInformation?.residentAddress?.schoolDistrict,
            township: this.householdInformation?.residentAddress?.township,            
            anotherAddress:
              this.householdInformation?.mailingAddress?.streetAddressLine1,
            anotherAddress2:
              this.householdInformation?.mailingAddress?.streetAddressLine2,
            anotherCity:
              this.householdInformation?.mailingAddress?.city,
            // anotherState: this.applyNowState.houseHoldDetails.Household.mailingAddress?.state,
            anotherState: this.householdInformation?.mailingAddress?.state,
            anotherZip:
              this.householdInformation?.mailingAddress?.zip,            
            anotherAdd:
              this.householdInformation?.mailingAddress?.streetAddressLine1 ? 'Yes' : null
          });
          if (this.householdInformation?.mailingAddress?.streetAddressLine1) {
            this.anotherAddressCon = true;
          } else {
            this.anotherAddressCon = false;
          }
          this.cd.detectChanges();
        });
    });
  }

  next() {
    this.reportChangesService.validateAllFormFields(this.addressChangeForm);
    if (!this.anotherAddressCon) {
      this.addressChangeForm.get("anotherAddress")?.setErrors(null);
      this.addressChangeForm.get("anotherCity")?.setErrors(null);
      this.addressChangeForm.get("anotherZip")?.setErrors(null);
      this.addressChangeForm.get("anotherState")?.setErrors(null);
      this.addressChangeForm.patchValue({
        anotherAddress: "",
        anotherCity: "",
        anotherZip: "",
        anotherState: "",
      });
      this.addressChangeForm.updateValueAndValidity();
    }

    if (this.addressChangeForm.valid) {
      this.loadingUSPS = true;
      const isApplicantAddressValidated = this.householdInformation?.residentAddress?.isAddressGISValidated || false;
      const isMailingAddressValidated = this.householdInformation?.mailingAddress?.isAddressGISValidated || false;
      const updatedApplicantAddress = {
        streetAddressLine1:
          this.addressChangeForm.get("AddressLine1").value,
        streetAddressLine2:
          this.addressChangeForm.get("AddressLine2").value,
        city: this.addressChangeForm.get("City").value,
        state: this.addressChangeForm.get("State").value,
        zip: this.addressChangeForm.get("Zip").value,
        county: this.addressChangeForm.get("County").value,
        schoolDistrict: this.addressChangeForm.get("school").value,
        township: this.addressChangeForm.get("township").value,
        isAddressGISValidated:this.changedApplicantAddress ? false : isApplicantAddressValidated,
        // sendMail: this.addressChangeForm.get("sendMail").value,
        // anotherAdd: this.addressChangeForm.get("anotherAdd").value.charAt(0),
        isMailingAddress: this.householdInformation?.residentAddress?.isMailingAddress,

        // isThisAddressEffectiveImmediately:
        //     this.addressChangeForm.get("sendMail").value.Yes,
        zipExt: "",


      };

      const updatedMailingAddress = {
        streetAddressLine1:
          this.addressChangeForm.get("anotherAddress").value,
        streetAddressLine2:
          this.addressChangeForm.get("anotherAddress2").value,
        city: this.addressChangeForm.get("anotherCity").value,
        state: this.addressChangeForm.get("anotherState").value,
        zip: this.addressChangeForm.get("anotherZip").value,
        isMailingAddress: this.householdInformation?.mailingAddress?.isMailingAddress,
        // isThisAddressEffectiveImmediately:
        //     this.addressChangeForm.get("sendMail").value.Yes,
        // addressEffectiveDate:
        //     this.addressChangeForm.get("sendMailStartDate").value,
        isAddressGISValidated:this.changedMailingAddress ? false : isMailingAddressValidated,
        zipExt: "",
      };
      this.storeService.updateResidentAddress({
        ...updatedApplicantAddress
      })
      this.storeService.updateMailingAddress({
        ...updatedMailingAddress
      });
      if (updatedApplicantAddress.isAddressGISValidated && updatedMailingAddress.isAddressGISValidated) {
        this.useAnyway();
        return;
      }
      else if (updatedApplicantAddress.isAddressGISValidated && !updatedMailingAddress.streetAddressLine1) {
        this.useAnyway()
        return;
      }
      this.routingStratagy
          .validateAddress(updatedApplicantAddress, updatedMailingAddress)
          .then((validated) => {
              this.loadingUSPS = false;
              if (validated) {
                this.router.navigate([RoutePath.ADDRESS_SELECT])
              } else {
                  this.isAddressGISValidated = true;
              }
          });
      
    }
  }

  checkAddress(check: any) {
    let charCode = check.charCode;
    return ((charCode > 47 && charCode < 58) || (charCode > 64 && charCode < 91)
      || (charCode > 96 && charCode < 123) || charCode == 39 || charCode == 35
      || charCode == 46 || charCode == 92 || charCode == 45 || charCode == 44
      || charCode == 38 || charCode == 40 || charCode == 41 || charCode == 47);
  }

  checkCity(check: any) {
    let charCode = check.charCode;
    return ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)
      || charCode == 39 || charCode == 92 || charCode == 45);
  }

  onlyNumberAllowed(event: { which: any; keyCode: any }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  back() {
    this.router.navigate([RoutePath.REPORT_CHANGES_GATEPOST]);
  }

  errorMap(field: string) {
    const form = this.addressChangeForm;
    if (!this.isFieldValid(field)) {
      return ''

    }
    switch (field) {
      case "Addressline1":
        if (form.get(field).errors?.required) {
          return "No address is entered";
        }
        else {
          return 'Enter only alphabets.';
        }
        break;
      case "City":
        if (form.get(field).errors?.required) {
          return "No city is entered";
        }
        break;
      case "State":
        if (form.get(field).errors?.required) {
          return "No state is selected from the dropdown";
        }
        break;
      case "Zip":
        if (form.get(field).errors?.required) {
          return "No zip code is entered";
        }
        break;
      case "County":
        if (form.get(field).errors?.required) {
          return "No county is selected from the dropdown";
        }
        break;
      case "school":
        if (form.get(field).errors?.required) {
          return "No school district is selected from the dropdown";
        }
        break;
      case "school1":
        if (form.get("school1").errors.required) {
          return "No school district is entered";
        }
        break;
      case "township":
        if (form.get("township").errors?.required) {
          return "No city/township/borough is selected from the dropdown";
        }
        break;
      case "township1":
        if (
          form.get("township1").errors.required
        ) {
          return "No township is entered";
        }
        break;
      case "anotherAdd":
        if (
          form.get("anotherAdd").errors.required
        ) {
          return "Please select if another address.";
        }
        break;
      case "anotherAddress":
        if (
          form.get("anotherAddress").errors
            .required
        ) {
          return "No residential street address is entered";
        }
        break;
      case "anotherCity":
        if (
          form.get("anotherCity").errors.required
        ) {
          return "No city is entered";
        }
        break;
      case "anotherState":
        if (
          form.get("anotherState").errors
            .required
        ) {
          return "No state is selected from the dropdown";
        }
        break;
      case "anotherZip":
        if (
          form.get("anotherZip").errors.required
        ) {
          return "No zip code is entered";
        }
        break;

      default:
        return "";
        break;
    }
    return "";
  }

  showAnotherAddress() {
    this.anotherAddressCon = true;
    this.addressChangeForm
      .get("anotherAddress")
      .setValidators(Validators.required);
    this.addressChangeForm
      .get("anotherCity")
      .setValidators(Validators.required);
    this.addressChangeForm
      .get("anotherState")
      .setValidators(Validators.required);
    this.addressChangeForm
      .get("anotherZip")
      .setValidators(Validators.required);
  }

  removeAnotherAddress() {
    this.anotherAddressCon = false;
    this.addressChangeForm.get("anotherAddress").clearValidators();
    this.addressChangeForm.get("anotherCity").clearValidators();
    this.addressChangeForm.get("anotherState").clearValidators();
    this.addressChangeForm.get("anotherZip").clearValidators();

    this.addressChangeForm.get("anotherAddress")?.setErrors(null);
    this.addressChangeForm.get("anotherZip")?.setErrors(null);
    this.addressChangeForm.get("anotherState")?.setErrors(null);
    this.addressChangeForm.get("anotherCity")?.setErrors(null);
  }

  isFieldValid(field: string): boolean {
    return (this.addressChangeForm.get(field).status !== 'VALID' && (this.addressChangeForm.get(field).dirty || this.addressChangeForm.get(field).touched))
  }

  useAnyway() {
    this.isAddressGISValidated = false;
    this.router.navigate([RoutePath.ADDRESS_SELECT])
  }
  editAddress() {
    this.isAddressGISValidated = false;
  }

}
