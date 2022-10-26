import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IApplyNowState } from '../../+state/apply-now.models';
import { ApplyNowResourcesBurialSpacesStrategy } from '../../../shared/route-strategies/apply-now/resources-burial-spaces';
import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IAnyoneOwnBurialSpaceORPlot, IBurialSpace, IHouseHold, IHouseHoldDetails, IResources } from '../../household/household-model';

@Component({
  selector: 'compass-ui-burial-spaces',
  templateUrl: './burial-spaces.component.html',
  styleUrls: ['./burial-spaces.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApplyNowResourcesBurialSpacesStrategy]
})
export class BurialSpacesComponent implements OnInit {
  burialSpacesForm: FormGroup | any;
  householdPersons: IHouseHold[] = [];
  applyNowState!: IApplyNowState;
  houseHoldDetails!: IHouseHoldDetails;
  displayError: boolean = false;
  fragment = "new";
  constructor(private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private routingStrategy: ApplyNowResourcesBurialSpacesStrategy,
    private router: Router,
    private screenQueueUtil: ScreenQueueUtil,
    private activatedRoute: ActivatedRoute,) { }

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
  get burialSpaceOwners(): FormArray {
    return <FormArray>this.burialSpacesForm.controls['burialSpaceOwners'];
  }

  private buildInitialForm(): void {
    this.burialSpacesForm = this.fb.group({
     burialSpaceOwners: this.fb.array([]),
      isSomeoneOutsideHousehold: [""],
      burialspacesssomeone: [""],
    })
  }

  private setupCheckboxFromState() {
    let burialResources = this.houseHoldDetails.resources?.anyoneOwnaBurialSpace?.burialSpacesCollection
    if (burialResources && burialResources.length > 0) {
      burialResources[parseInt(this.fragment)].owner?.forEach(owner => {
        this.burialSpaceOwners.push(new FormControl(owner))
      });
    }

  }
  getIndex(value: string): number {
    return this.burialSpaceOwners.controls.findIndex(ctrl => ctrl.value == value);
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
      this.burialSpacesForm.patchValue({
        'isSomeoneOutsideHousehold': 'true'
      })
    } else {
      this.burialSpacesForm.patchValue({
        'isSomeoneOutsideHousehold': 'false'
      })
    }
  }

  onCheckboxChange(personId: number, data: any) {
    if (data.checked) {
      this.burialSpaceOwners.push(new FormControl(personId));
    }
    else {
      let resourceIndex = this.getIndex(personId.toString())
      if (resourceIndex > -1) {
        this.burialSpaceOwners.removeAt(resourceIndex);
      }
    }
  }

  getBurialSpaceState(personId: number): boolean {
    let index = this.getIndex(personId.toString())
    if (index > -1) {
      return true;
    } else {
      return false;
    }
  }
 


  goBack() {
    this.screenQueueUtil.back();
  }

  goNext() {
    let fragmentToAddDetails = 0;
    const selectedUserIds: string[] = [];

    this.burialSpacesForm.value.burialSpaceOwners.forEach((person: any) => {
      selectedUserIds.push(person)
    });

    const burialResource = { ...this.houseHoldDetails.resources?.anyoneOwnaBurialSpace };

    let updatedBurialResource: IAnyoneOwnBurialSpaceORPlot;
    let updatedResources: IResources;


    if (this.fragment === "new") {

      const listOfBurialResources = [] as IBurialSpace[]
      let burialspace: IBurialSpace = {};
      burialspace = { ...burialspace, ...{ owner: [...selectedUserIds] } };

     /*  if (this.burialSpacesForm.value.isSomeoneOutsideHousehold) {
        burialspace.ownerName = this.burialSpacesForm.value.burialspacessomeone;
      } */
      listOfBurialResources.push(burialspace);
      updatedBurialResource = {
        ...burialResource,
        ...{ code: "Yes" },
        ...{ burialSpacesCollection: [...burialResource.burialSpacesCollection || [], ...listOfBurialResources] }
      };
      updatedResources = { ...this.houseHoldDetails.resources, ...{ anyoneOwnaBurialSpace: updatedBurialResource } };

      fragmentToAddDetails = updatedResources.anyoneOwnaBurialSpace?.burialSpacesCollection ?
        (updatedResources.anyoneOwnaBurialSpace.burialSpacesCollection.length) - 1 : 0

    } else {

      let existingResources = [] as IBurialSpace[];

      if (burialResource && burialResource.burialSpacesCollection && burialResource.burialSpacesCollection.length > 0) {
        existingResources = [...burialResource.burialSpacesCollection];

        burialResource.burialSpacesCollection.forEach((resource, i) => {
          if (i === parseInt(this.fragment)) {
            resource = { ...resource, ...{ owner: selectedUserIds } }
            if (this.burialSpacesForm.value.isSomeoneOutsideHousehold) {
              resource = { ...resource, ...{ ownerName: this.burialSpacesForm.value.burialspacessomeone } };
            }
            existingResources.splice(parseInt(this.fragment), 1, resource);
          }
        })

      }
      updatedBurialResource = { ...burialResource, ...{ burialSpacesCollection: [...existingResources] } };
      updatedResources = { ...this.houseHoldDetails.resources, ...{ anyoneOwnaBurialSpace: updatedBurialResource } };
      fragmentToAddDetails = parseInt(this.fragment);

    }

    if (this.houseHoldDetails) {
      this.service.updateHouseHoldDetails(
        { ...this.houseHoldDetails, ...{ resources: updatedResources } }
      )
    }

        this.router.navigate([this.routingStrategy.nextRoute()]);
      }
    }
  


