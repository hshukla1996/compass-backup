import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
} from "@angular/core";
import { FormGroup} from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import {
    IGeneralDetails,
} from "../general-details/state/general-details-model";
import { IApplyNowState } from "../../+state/apply-now.models";
import { RoutePath } from "../../../shared/route-strategies";
import { ApplyNowRaceStrategy } from "../../../shared/route-strategies/apply-now/race";
import {IHouseHold, IHouseHoldDetails} from "../../household/household-model";
import { AppStoreService } from "../../../app-store-service";
import {UtilService} from "../../../shared/services/util.service";
import { INDIVIDUAL_PROGRAMS } from "../../../shared/constants/Individual_Programs_Constants";
import {EntryScreenQueueUtil} from "../individuals-entry-gatepost";
//import Validation from './utils/validation';
@Component({
    selector: "compass-ui-race",
    templateUrl: "./race.component.html",
    styleUrls: ["./race.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ApplyNowRaceStrategy],
})
export class RaceComponent implements OnInit {
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
    isCheckRequired?: boolean;
    isHispaticRequired?: boolean;
    raceFormValdation?: boolean;
    raceFormRadioBtnValdation?:boolean;
    raceChkBoxesData: any = {
        questionText: "",
        subHeading: "Select all that apply.",
        toolTip: "",
        requiredText: "Please select at least one",
        requiredRadioText: "Please select at least one",
        questionAnswers: [],
        isRequired: "",
    };
    raceRadioOptionsData = {
        legend: "Is Jane is of Hispatic or Latino origin?",
        questionAnswers: [
            {
                id: "Yes",
                label: "Yes",
                checked: false,
            },
            {
                id: "No",
                label: "No",
                checked: false,
            },
        ],
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
        private utilService: UtilService,
        private queueService:EntryScreenQueueUtil
    ) {}

    ngOnInit() {
        this.raceForm = this.fb.group({
            race: this.fb.array([], [Validators.required]),
            hispanic: [""],
        });
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        if (this.houseHoldDetails.houseHoldPersons) {
            this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
        }
        this.personsMap =
            {
                ...this.houseHoldDetails.pageAction?.personsMap,
            } || {};

        this.appService.getRaces().subscribe((r) => {
            this.races = r;
            this.races.forEach((raceItem: any, index: number) => {
                this.raceChkBoxesData.questionAnswers[index] = {
                    id: raceItem.id,
                    label: raceItem.displayValue,
                    isChecked: false,
                };
            });
            this.cd.detectChanges();
        });

        this.activedRoute.params.subscribe((p) => {
            if (Object.keys(p).length == 0) {
                this.currentUserIndex =
                    this.utilService.getCurrentUserIdOnNoParams(
                        this.personsMap
                    );
            } else {
                this.currentUserIndex = p.userId || "";
            }
            if (this.houseHoldPersons.length > 0) {
                this.currentUser =
                    this.service.extractUser(
                        this.houseHoldPersons,
                        this.currentUserIndex
                    ) || "";
                let indBenfits = this.service?.getAppliedBenefitsForIndividual(
                    this.currentUser
                ) as string[];
                const programs = [
                    INDIVIDUAL_PROGRAMS.CI,
                    INDIVIDUAL_PROGRAMS.CIR,
                ];
                const programsForHispatic = [
                    INDIVIDUAL_PROGRAMS.LH,
                    INDIVIDUAL_PROGRAMS.LHP,
                    INDIVIDUAL_PROGRAMS.LHCR,
                    INDIVIDUAL_PROGRAMS.LW
                ];
                this.isCheckRequired = this.service.areProgramsExist(
                    indBenfits,
                    programs
                );
                this.isHispaticRequired = this.service.areProgramsExist(
                    indBenfits,
                    programsForHispatic
                );
                this.raceChkBoxesData.questionText = `What is ${this.currentUser.firstName}'s race?`;
                this.raceRadioOptionsData.legend = `Is  ${this.currentUser.firstName} is of Hispatic or Latino origin?`;
                const storedRaces = this.currentUser.raceInformation || [];
                const storedHispatic = this.currentUser.hispanicOrigin
                    ? this.currentUser.hispanicOrigin === "Y"
                        ? "Yes"
                        : "No"
                    : "";

                this.alreadySelected = {
                    raceInformation: this.currentUser.raceInformation,
                    hispanicOrigin: this.currentUser.hispanicOrigin,
                };
                this.races.forEach((raceItem: any, index: number) => {
                    if (storedRaces.indexOf(raceItem.id) > -1) {
                        this.raceChkBoxesData.questionAnswers[index].isChecked =
                            true;
                    } else {
                        this.raceChkBoxesData.questionAnswers[index].isChecked =
                            false;
                    }
                });
                this.raceRadioOptionsData.questionAnswers.forEach(
                    (hispanic, i) => {
                        if (hispanic.id === storedHispatic) {
                            this.raceRadioOptionsData.questionAnswers[
                                i
                            ].checked = true;
                        } else {
                            hispanic.checked = false;
                        }
                    }
                );
                this.cd.detectChanges();
            }
        });
    }

    public showPreviousPage() {
       this.queueService.back();
    }

    showNextPage(selectedRaces: any) {
        if (
            this.isCheckRequired &&
            selectedRaces.selectedCheckboxes.length == 0
        ) {
            this.raceFormValdation = true;
            return;
        } else if (
            this.isHispaticRequired &&
            selectedRaces.selectedRadios.length == 0
        ) {
            this.raceFormRadioBtnValdation = true;
            return;
        } else {
            this.raceFormValdation = false;
            this.raceFormRadioBtnValdation = false;
            const storedHouseholdDetails = this.houseHoldDetails;
            const updatedHouseholdPersons = this.houseHoldPersons?.map(
                (person: IHouseHold) => {
                    if (
                        person.id?.toString() ===
                        this.currentUser.id?.toString()
                    ) {
                        const personToBeUpdated = { ...person };
                        personToBeUpdated.raceInformation =
                            selectedRaces.selectedCheckboxes;
                        personToBeUpdated.hispanicOrigin =
                            selectedRaces.selectedRadios.charAt(0);
                        return personToBeUpdated;
                    } else {
                        return person;
                    }
                }
            );

            if (storedHouseholdDetails) {
                this.service.updateHouseHoldDetails({
                    ...storedHouseholdDetails,
                    ...{ houseHoldPersons: updatedHouseholdPersons },
                });
            }
          this.queueService.next();
         //   this.router.navigate([
           //     this.routingStratagy.nextRoute(),
           //     { userId: this.currentUserIndex },
          //  ]);
        }
    }
}
