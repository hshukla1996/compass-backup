import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { IApplyNowState } from "../../+state/apply-now.models";
import { RoutePath } from "../../../shared/route-strategies";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { IAnyoneOwnAHome, IHouseHold, IHouseHoldDetails, IResources, IResourcesResidentialProperty } from "../../household/household-model";
import { ApplyNowResidentialPropertyOwnersStrategy } from "../residential-owners";
import { ScreenQueueUtil } from "../resources-gatepost/resources-gatepost.path";

@Component({
    selector: "compass-ui-residential-property-owners",
    templateUrl: "./residential-property-owners.component.html",
    styleUrls: ["./residential-property-owners.component.scss"],
    providers: [ApplyNowResidentialPropertyOwnersStrategy]
})
export class ResidentialPropertyOwnersComponent implements OnInit {
    residentialPropertyOwnersForm: FormGroup | any;
    
    householdPersons: IHouseHold[] = [];
    houseHoldDetails!: IHouseHoldDetails;
    applyNowState!: IApplyNowState;
    fragment = "new";
    displayError: boolean = false;

    constructor(private fb: FormBuilder,
        private service: ApplyNowStoreService,
        private cd: ChangeDetectorRef,
        private routingStrategy: ApplyNowResidentialPropertyOwnersStrategy,
        private router: Router,
        private screenQueueUtil: ScreenQueueUtil,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.buildInitialForm();

        this.service.getAppData().subscribe(d => {
            this.applyNowState = { ...d };
            this.houseHoldDetails = this.service.getHouseHoldDetails;
            this.householdPersons = this.applyNowState.houseHoldDetails?.houseHoldPersons || [];
            this.cd.detectChanges();
        });

        this.activatedRoute.fragment.subscribe((fragment) => {
            this.fragment = fragment || "new";
            if (this.fragment !== "new") {
                this.setupCheckboxFromState();
            }
        });
    }

    get residentialPropertyOwners(): FormArray {
        return <FormArray>this.residentialPropertyOwnersForm.controls['residentialPropertyOwners'];
    }
    private buildInitialForm(): void {
        this.residentialPropertyOwnersForm = this.fb.group({
            residentialPropertyOwners: this.fb.array([]),
            isSomeoneOutsideHousehold: [false],
            ownerName: [""],


        })
    }
    private setupCheckboxFromState() {
        let residentialProperties = this.houseHoldDetails.resources?.anyoneOwnAHome?.residentialPropertyCollection;
        if (residentialProperties && residentialProperties.length > 0) {
            residentialProperties[parseInt(this.fragment)].owner?.forEach(owner => {
                this.residentialPropertyOwners.push(new FormControl(owner))
            });
        }
    }

    getIndex(value: string): number {
        return this.residentialPropertyOwners.controls.findIndex(ctrl => ctrl.value == value);
    }

    getAge(dateString: any): any {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    outsideOfHousedholdChanged(data: any) {
        if (data.checked) {
            this.residentialPropertyOwnersForm.patchValue({
                "isSomeoneOutsideHousehold": true
            });
        } else {
            this.residentialPropertyOwnersForm.patchValue({
                "isSomeoneOutsideHousehold": false
            });
        }
    }
    onCheckboxChange(personId: number, data: any) {
        if (data.checked) {
            this.residentialPropertyOwners.push(new FormControl(personId));
        }
        else {
            let resourceIndex = this.getIndex(personId.toString())
            if (resourceIndex > -1) {
                this.residentialPropertyOwners.removeAt(resourceIndex);
            }
        }
    }
    getResidentialPropertyState(personId: number): boolean {
        let index = this.getIndex(personId.toString());
        if (index > -1) {
            return true;
        } else {
            return false;
        }
    }


    goNext() {
        this.service.validateAllFormFields(this.residentialPropertyOwnersForm);
        if (this.residentialPropertyOwnersForm.valid) {

            const selectedUserIds: string[] = [];
            const existingHouseHoldDetails = this.houseHoldDetails;
            const resources = { ...existingHouseHoldDetails.resources };
            let anyOneOwnHome= { ...resources.anyoneOwnAHome };
            let residentialpropertyDetails = anyOneOwnHome.residentialPropertyCollection || [];
            let recentResidentialPropertyResource: IResourcesResidentialProperty;
            let updatedResources;

            this.residentialPropertyOwnersForm.value.residentialPropertyOwners.forEach((person: any) => {
                selectedUserIds.push(person)
            });

            residentialpropertyDetails = residentialpropertyDetails.map((detail, i) => {
                if (i === parseInt(this.fragment)) {

                    recentResidentialPropertyResource = { ...detail };
                    recentResidentialPropertyResource.owner = [...selectedUserIds]

                    if (this.residentialPropertyOwnersForm.get("isSomeoneOutsideHousehold").value) {
                        recentResidentialPropertyResource.ownerName = this.residentialPropertyOwnersForm.get("ownerName").value;
                    } else {
                        recentResidentialPropertyResource.ownerName = "";
                    }
                    return { ...recentResidentialPropertyResource };
                } else {
                    return { ...detail }
                }
            });

            anyOneOwnHome = { ...anyOneOwnHome, ...{ residentialPropertyCollection: [...residentialpropertyDetails] } }
            updatedResources = { ...resources, ...{ anyoneOwnAHome: anyOneOwnHome } }

            if (existingHouseHoldDetails)
                this.service.updateHouseHoldDetails({
                    ...existingHouseHoldDetails,
                    ...{ resources: updatedResources },
                });

            this.router.navigate([this.routingStrategy.nextRoute()]);
            return true;
        }
        else {
            return false;
        }

        
    }
    goBack() {
        this.router.navigate([this.routingStrategy.previousRoute()], { fragment: this.fragment });
    }
}
