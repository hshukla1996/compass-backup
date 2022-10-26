import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { IApplyNowState } from "../../+state/apply-now.models";
import { AppStoreService } from "../../../app-store-service";
import { RoutePath } from "../../../shared/route-strategies";
import { ApplyNowRaceStrategy } from "../../../shared/route-strategies/apply-now/race";
import { UtilService } from "../../../shared/services/util.service";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { IHouseHold, IHouseHoldDetails } from "../../household/household-model";
import { IGeneralDetails } from "../../individual-details/general-details/state/general-details-model";

@Component({
    selector: "compass-ui-voter-race",
    templateUrl: "./voter-race.component.html",
    styleUrls: ["./voter-race.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ApplyNowRaceStrategy],
})
export class VoterRaceComponent implements OnInit {
    @ViewChild("raceFormEle") raceFormEle: any;
    raceForm: FormGroup | any;
    data: any;
    races: any;
    currentUserIndex!: string;
    currentUser: IHouseHold = {};
    personsMap!: any;
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    selectedUserids = [];
    formchckvalue: FormGroup | any;
    selectedRaces: string[] = [];
    generalDetails: IGeneralDetails | null = null;
    applyNowState: IApplyNowState | undefined;
    storedData: IGeneralDetails | undefined;
    routePath: typeof RoutePath = RoutePath;
    householdHead!: IHouseHold;
    alreadySelected: any;
    voterInfoFromState: any;
    situationSelectedData: any;
    raceChkBoxesData: any = {
        questionText: "What is your race? ",
        subHeading: "Select all that apply.",
        toolTip: "",
        requiredText: "Please select at least one",
        questionAnswers: [

        ],
    };
    raceRadioOptionsData = {
        // legend: "Is Jane is of Hispatic or Latino origin?",
        // questionAnswers: [
        //     {
        //         id: "Yes",
        //         label: "Yes",
        //         checked: false,
        //     },
        //     {
        //         id: "No",
        //         label: "No",
        //         checked: false
        //     },
        // ],
    };

    constructor(
        private fb: FormBuilder,
        private route: Router,
        private service: ApplyNowStoreService,
        private cd: ChangeDetectorRef,
        private appService: AppStoreService,
        private router: Router,
        private routingStratagy: ApplyNowRaceStrategy,
        private activedRoute: ActivatedRoute,
        private utilService: UtilService
    ) { }

    ngOnInit() {
        this.raceForm = this.fb.group({
            race: this.fb.array([], [Validators.required]),
          
        });
        // this.houseHoldDetails = this.service.getHouseHoldDetails;
        // if (this.houseHoldDetails.houseHoldPersons) {
        //     this.houseHoldPersons =
        //         this.houseHoldDetails.houseHoldPersons;
        // }
        // this.personsMap =
        //     {
        //         ...this.houseHoldDetails.pageAction
        //             ?.personsMap,
        //     } || {};

        this.voterInfoFromState = this.service.applyNow.voterRegistration;
        this.situationSelectedData = this.voterInfoFromState.votingApplicationType;
        console.log(this.voterInfoFromState, " this.voterInfoFromState")


        this.appService.getRaces().subscribe((r) => {
            this.races = r;
            this.races.forEach((raceItem: any, index: number) => {
                this.raceChkBoxesData.questionAnswers[index] = {
                    id: raceItem.id,
                    label: raceItem.displayValue,
                    isChecked: false,
                    
                };
            });
            // this.cd.detectChanges();
        });
        this.raceChkBoxesData.questionText = `What is your race?`;
        this.alreadySelected = {
            race: this.service.applyNow.voterRegistration?.voterIndividual?.race ,
            // hispanicOrigin: this.currentUser.hispanicOrigin,
        }
        if (this.alreadySelected.race && this.alreadySelected.race.length > 0) {
            this.raceChkBoxesData['questionAnswers'].forEach((element: { id: any; isChecked: boolean; }) => {
                if (this.alreadySelected.race.includes(element.id)) {
                    element.isChecked = true
                    console.log(this.alreadySelected, "element.id")

                }
            }); 
        }
        console.log(this.alreadySelected, ' this.alreadySelected')
        // this.activedRoute.params.subscribe((p) => {
        //     if (Object.keys(p).length == 0) {
        //         this.currentUserIndex =
        //             this.utilService.getCurrentUserIdOnNoParams(
        //                 this.personsMap
        //             );

        //     } else {
        //         this.currentUserIndex = p.userId || "";
        //     }
        //     if (this.houseHoldPersons.length > 0) {
        //         this.currentUser =
        //             this.service.extractUser(
        //                 this.houseHoldPersons,
        //                 this.currentUserIndex
        //             ) || "";
        //         // this.raceRadioOptionsData.legend = `Is  ${this.currentUser.firstName} is of Hispatic or Latino origin?`;

        //         //    setTimeout(() => {
        //         const storedRaces = this.currentUser.raceInformation || [];
        //         // const storedHispatic = this.currentUser.hispanicOrigin ? (this.currentUser.hispanicOrigin === "Y" ? "Yes" : "No") : "";

              
        //         this.races.forEach((raceItem: any, index: number) => {
        //             if (storedRaces.indexOf(raceItem.displayValue) > -1) {
        //                 this.raceChkBoxesData.questionAnswers[
        //                     index
        //                 ].isChecked = true;
        //             }
        //             else {
        //                 this.raceChkBoxesData.questionAnswers[
        //                     index
        //                 ].isChecked = false;
        //             }
        //         });
        //         // this.raceRadioOptionsData.questionAnswers.forEach(
        //         //     (hispanic, i) => {
        //         //         if (hispanic.id === storedHispatic) {
        //         //             this.raceRadioOptionsData.questionAnswers[i].checked =
        //         //                 true;
        //         //         }
        //         //         else {
        //         //             hispanic.checked = false;
        //         //         }
        //         //     }
        //         // );
        //         this.cd.detectChanges();
        //         // },500);
        //     }


        // });
    }

    // public showPreviousPage() {
    //     this.router.navigate([this.routingStratagy.previousRoute()]);
    //     //this.router.navigate([this.routingStratagy.previousRoute()]);
    // }

    showNextPage(selectedRaces: any) {
        const raceInfo ={
            race: selectedRaces
        }
        const storedVoterIndividual = this.service.applyNow.voterRegistration?.voterIndividual
        const updatedVoterInfo = { ...this.service.applyNow.voterRegistration, voterIndividual: { ...storedVoterIndividual, ...raceInfo} }; 
        console.log(updatedVoterInfo, 'updatedVoterInfo');
        this.service.updatedVoterRegistrationDetails(updatedVoterInfo) 

        this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_RESIDENTIALADDRESS]);

        // const storedHouseholdDetails = this.houseHoldDetails;
        // const updatedHouseholdPersons =
        //     this.houseHoldPersons?.map(
        //         (person: IHouseHold) => {
        //             if (person.id?.toString() === this.currentUser.id?.toString()) {
        //                 const personToBeUpdated = { ...person };
        //                 personToBeUpdated.raceInformation =
        //                     selectedRaces.selectedCheckboxes;
        //                 // personToBeUpdated.hispanicOrigin =
        //                 //     selectedRaces.selectedRadios.charAt(0);
        //                 return personToBeUpdated;
        //             } else {
        //                 return person;
        //             }
        //         }
        //     );

        // if (storedHouseholdDetails) {
        //     this.service.updateHouseHoldDetails({
        //         ...storedHouseholdDetails,
        //         ...{ houseHoldPersons: updatedHouseholdPersons },
        //     });
        // }

        // this.router.navigate([
        //     this.routingStratagy.nextRoute(),
        //     { userId: this.currentUserIndex },
        // ]);
    }
    // constructor(private fb: FormBuilder, private router: Router, private service: ApplyNowStoreService,) { }
    // voterRaceGroup!: FormGroup | any;
 

    // next() { 
    //     this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_RESIDENTIALADDRESS]);

    // }

    back() {
        this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_BASICDETAILS]);

     }
}
