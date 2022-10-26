import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription } from "rxjs";
import { IApplyNowState } from "../../+state/apply-now.models";
import { INDIVIDUAL_PROGRAMS } from "../../../shared/constants/Individual_Programs_Constants";
import { RoutePath } from "../../../shared/route-strategies";
import { UtilService } from "../../../shared/services/util.service";
import { Utility} from "../../../shared/utilities/Utility";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import {IHouseHold, IHouseHoldDetails, PageDirection} from "../../household/household-model";
import {KeyValueModal} from "../../insurance/keyValueModal";
import { ScreenQueueUtil } from "../individuals-gatepost/individuals-gatepost.paths";
@Component({
    selector: "ui-compass-current-student",
    templateUrl: "./current-student.component.html",
    styleUrls: ["./current-student.component.css"],
})
export class CurrentStudentComponent {
    selectedData: string[] = [];
    studentsMap: any[] = [];
    fragment = "";
    applyNowState: IApplyNowState | undefined;
    houseHoldPersons: IHouseHold[] = [];
    houseHoldDetails!: IHouseHoldDetails;
    private eventsSubscription: Subscription | undefined;
    public studentJSON = {
        questionText:
            "You told us someone is currently a student. Tell us who.",
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
        private service: ApplyNowStoreService,
        private route: Router,
        private queueService: ScreenQueueUtil,
        private activedRoute: ActivatedRoute,
        private cd: ChangeDetectorRef
    ) {}
    ngOnInit() {
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        if (this.houseHoldDetails.houseHoldPersons) {
            this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
        }
        this.activedRoute.fragment.subscribe((fragment) => {
            this.fragment = fragment || "";
            if (this.fragment == "new") {
                this.selectedData = [];
            } else {
                this.selectedData = Object.keys(
                    this.houseHoldDetails.pageAction.studentsMap
                );
            }
        });
        this.studentJSON.questionAnswers = [];
        this.houseHoldPersons.forEach((person) => {
            let personalBenefits =
                this.service?.getAppliedBenefitsForIndividual(
                    person
                ) as string[];
            const isEligible = this.service.areProgramsExist(personalBenefits, [
                INDIVIDUAL_PROGRAMS.CA,
                INDIVIDUAL_PROGRAMS.CAR,
                INDIVIDUAL_PROGRAMS.FS,
                INDIVIDUAL_PROGRAMS.FSR,
                INDIVIDUAL_PROGRAMS.HA,
                INDIVIDUAL_PROGRAMS.MAR,
                INDIVIDUAL_PROGRAMS.CI,
                INDIVIDUAL_PROGRAMS.CIR,
                INDIVIDUAL_PROGRAMS.HC,
                INDIVIDUAL_PROGRAMS.MCR,
                INDIVIDUAL_PROGRAMS.CHR,
            ]);
            if (person.id && isEligible) {
                this.studentJSON.questionAnswers.push({
                    id: person.id as unknown as number,
                    isChecked:
                        this.selectedData.indexOf(person.id.toString()) > -1,
                    label: `${person.firstName as string} ${
                        person.lastName as string
                    } ${Utility.getAge(person.dateOfBirth)}`,
                });
            }
        });
    }

    showNextPage(selectedItems: any) {
        console.log("selectedItems");
        console.log(selectedItems);
        selectedItems.forEach((ind: any) => {
            this.studentsMap[ind] = false;
        });
        const updatedPageAction = {
            ...this.houseHoldDetails.pageAction,
            studentsMap: {
                ...this.houseHoldDetails.pageAction?.studentsMap,
                ...this.studentsMap,
            },

            studentDirection: PageDirection.NEXT,
        };
        if (this.houseHoldDetails) {
            this.service.updateHouseHoldDetails({
                ...this.houseHoldDetails,
                ...{ pageAction: updatedPageAction },
            });
        }
        this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_CURRENT_EDUCATON_DETAILS,
        ]);
    }
    showPreviousPage(): void {
        /*  this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUAL_GATEPOST,
        ]);*/
        this.queueService.back();
    }
    ngOnDestroy(): void {
        this.eventsSubscription?.unsubscribe();
    }
}
