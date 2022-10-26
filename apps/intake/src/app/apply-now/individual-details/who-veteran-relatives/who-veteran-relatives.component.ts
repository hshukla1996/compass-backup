import { ChangeDetectorRef, Component, OnInit  } from "@angular/core";
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription } from "rxjs";
import { IApplyNowState } from "../../+state/apply-now.models";
import { RoutePath } from "../../../shared/route-strategies";
import { Utility } from "../../../shared/utilities/Utility";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { IHouseHold, PageDirection } from "../../household/household-model";
import { KeyValueModal } from "../../insurance/keyValueModal";
import {ScreenQueueUtil} from "../individuals-gatepost/individuals-gatepost.paths";
@Component({
    selector: "ui-compass-who-veteran-relatives",
    templateUrl: "./who-veteran-relatives.component.html",
    styleUrls: ["./who-veteran-relatives.component.css"],
})
export class WhoVeteranRelativesComponent {
    whoVeteranRelativesForm: FormGroup | any;
    selectedData: string[] = [];
    veteran!: IHouseHold;
   currentUserIndex = "";
    whoVeteranRelativesData: KeyValueModal[] = [];
    vetrelativeMap: any[] = [];
    applyNowState: IApplyNowState | undefined;
    private houseHoldHeadPersons: IHouseHold[] = [];
    private eventsSubscription: Subscription | undefined;
    private householdMembers: any[] = [];
    public vetRelJSON = {
        questionText:
            "",
        subHeading: "Select all that apply.",
        toolTip: "",
        isRequired: true,
        requiredText: "Please select at least one",
        questionAnswers: [
            {
                id: 1,
                label: "Test",
                isChecked: false,
            },
        ],
    };

    constructor(
        private fb: FormBuilder,
        private service: ApplyNowStoreService,
        private activedRoute: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private router: Router,
        private queueService: ScreenQueueUtil
    ) {
        this.whoVeteranRelativesForm = this.fb.group({
            veteranRelatives: this.fb.array([], [Validators.required]),
        });
    }
    ngOnInit() {

        const getData$ = this.service.getAppData().subscribe((d) => {
            this.applyNowState = { ...d };
            this.houseHoldHeadPersons = this.applyNowState.houseHoldDetails
                .houseHoldPersons as IHouseHold[];
            this.householdMembers = this.houseHoldHeadPersons;

          this.vetRelJSON.questionAnswers = [];
          this.activedRoute.params.subscribe((p) => {

            this.currentUserIndex = p.userId || "";
            if(this.currentUserIndex === "999"){
              this.vetRelJSON.questionText = `Who is a spouse, widow(er), or minor child of  ${this.applyNowState?.houseHoldDetails?.otherVetPerson?.firstName}?`;
            }
            else {
              this.houseHoldHeadPersons.forEach((vet) => {
                if (vet.id?.toString() === this.currentUserIndex.toString())
                  this.vetRelJSON.questionText = `Who is a spouse, widow(er), or minor child of  ${vet.firstName}?`;
              })
            }


            this.householdMembers.forEach((person) => {
                if (
              person.id.toString() !== this.currentUserIndex
                ) {
                    this.veteran = person;

                    this.vetRelJSON.questionAnswers.push({
                        id: person.id as unknown as number,
                        isChecked:
                            this.selectedData.indexOf(person.id.toString()) > -1
                                ? true
                                : false,
                        label: `${person.firstName as string} ${
                            person.lastName as string
                        } ${Utility.getAge(person.dateOfBirth)}`,
                    });
                }
            });
          })
        });
        this.eventsSubscription?.add(getData$);
    }
    showNextPage(selectedItems: any) {
    selectedItems.forEach((ind: any) => {
           this.vetrelativeMap[ind] = false;
         });
        //console.log(selectedItems);
    const storedHouseholdDetails = this.applyNowState?.houseHoldDetails;
     const updatedPageAction = {
         ...storedHouseholdDetails?.pageAction,
         vetrelativeMap: {
             ...storedHouseholdDetails?.pageAction?.vetrelativeMap,
             ...this.vetrelativeMap,
         },

         trainingDirection: PageDirection.NEXT,
     };
    const updatedHouseholdPersons =
    this.applyNowState?.houseHoldDetails.houseHoldPersons?.map(
        (person: IHouseHold) => {
                        const personToBeUpdated = { ...person };

            if(person.veteranRelationInformation?.status == "Y") {
            personToBeUpdated.veteranRelationInformation = {
                ...personToBeUpdated.veteranRelationInformation,
                relatives: selectedItems,
            };
            }
            return personToBeUpdated;

        }
    );

        if (this.applyNowState?.houseHoldDetails) {
          if(this.currentUserIndex === "999"){
            const otherVet = {...this.applyNowState?.houseHoldDetails.otherVetPerson}
            if(otherVet) {
              otherVet.veteranRelationInformation = {
                ...otherVet?.veteranRelationInformation,
                relatives: selectedItems,
              };
              this.service.updateHouseHoldDetails({
                ...this.applyNowState?.houseHoldDetails,
                ...{otherVetPerson: otherVet},
              });
            }
          }
          else {

            this.service.updateHouseHoldDetails({
              ...this.applyNowState?.houseHoldDetails,
              ...{pageAction: updatedPageAction},
              ...{houseHoldPersons: updatedHouseholdPersons},
            });
          }
        }

        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_VETERAN_MILATARY_SUMMARY,
        ]);
    }

    showPreviousPage() {
      this.queueService.back();
    }
}
