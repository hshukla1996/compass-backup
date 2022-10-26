import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { combineLatest, concat, concatMap, map, Observable, Subscription } from "rxjs";
import { LgbtqSubmitRequest } from "../../+state/apply-now.models";
import { AppStoreService } from "../../../app-store-service";
import { GettingStartedService } from "../../../shared/services/getting-started.service";
import { LgbtqService } from "../../../shared/services/lgbtq.service";
import { ApplyNowStoreService } from "../../apply-now-store-service";

@Component({
    selector: "compass-ui-lgbtq-survey",
    templateUrl: "./lgbtq-survey.component.html",
    styleUrls: ["./lgbtq-survey.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LgbtqSurveyComponent implements OnInit {
    @ViewChild("modalButton") modalButton!: any
    
    constructor(
        private router: Router,
        private cd: ChangeDetectorRef,
        private fb: FormBuilder,
        private appService: AppStoreService,
        private lgbtqService: LgbtqService,
        private gettingStartedService: GettingStartedService,
        private applynowService: ApplyNowStoreService
    ) {}

    lgbtqGroup!: FormGroup
    questions!: any[]
    answers!: any[]
    surveySub?: Subscription
    applicationNumber: number = -1
    isLoading: boolean = true;
    loadingText = "Loading..."
    modalTitle = ""
    modalText = ""
    modalIcon = ""
    modalTextSuccess = "Your response has been submitted."
    modalTitleSuccess = "Survey submitted"
    modalIconSuccess = "fa-thumbs-up"
    modalIconFailure = "fa-triangle-exclamation danger"
    modalTextFailure = "Unable to submit survey, please try again."
    modalTitleFailure = "Submission failed"
    surveyInitiated = false

    ngOnInit(): void {
        this.lgbtqGroup = this.fb.group({})
        this.surveySub = combineLatest({ 
            formData: this.applynowService.getAppData(), 
            questions: this.appService.getLGBTQSurveyQuestions(),
            answers: this.appService.getLGBTQSurveyAnswers()
        }).subscribe(result => {
            // get data
            let data = result.formData
            let questions = result.questions
            let answers = result.answers
            this.applicationNumber = data.gettingStartedResponse?.id ?? 0

            // determine if user can take survey. if not, handle problem
                // OBSOLETE This should happen in confirmation screen
            this.lgbtqService.initiateSurvey({ applicationNumber: this.applicationNumber }).subscribe(response => {
                // console.log(response)
                this.surveyInitiated = true
                this.cd.detectChanges()
            })

            // if user can take survey, get questions and answers
            this.questions = questions
            if (!Object.keys(this.lgbtqGroup.controls).length) { // this is needed, as observable may emit again for some reason
                questions?.forEach(question => this.lgbtqGroup.addControl(question.id, new FormControl("", [Validators.required] )))
            }
            this.answers = answers

            this.isLoading = false;
            this.cd.detectChanges()
        })
    }

    ngOnDestroy(): void {
        this.surveySub?.unsubscribe()
    }

    getAnswers(questionCode: string): any[] {
        if (!this.answers) return []
        return this.answers.filter(answer => {
            let answerQuestionCode = Math.floor(answer.id / 100);
            return answerQuestionCode == parseInt(questionCode);
        })
    }

    isFieldInvalid(field: string): boolean {
        let control = this.lgbtqGroup.get(field);
        return (!control?.valid && control?.touched) ?? false;
    }

    cancel(): void {
        // TODORAS cancel survey submission, go to application confirmation
    }

    isvalidate(): boolean {
        // touch fields
        this.lgbtqGroup.markAllAsTouched()
        // validate
        if (!this.lgbtqGroup?.valid || this.applicationNumber == -1) return false
        return true
    }

    submit(): void {
        // validate
        if (!this.isvalidate()) return

        // get survey answer
        this.isLoading = true
        let surveyAnswer: LgbtqSubmitRequest = {
            applicationNumber: this.applicationNumber,
            surveyQuesAnsList: []
        }
        this.questions.forEach(question => {
            surveyAnswer.surveyQuesAnsList = [
                ...surveyAnswer.surveyQuesAnsList, 
                {
                    questionCode: question.id,
                    answerCode: this.lgbtqGroup.get(question.id)!.value
                }
            ]
        })
        // submit survey answer
        this.lgbtqService.submitSurvey(surveyAnswer).subscribe(response => {
            this.isLoading = false
            if (response?.surveystatus == 1) {
                this.modalIcon = this.modalIconSuccess
                this.modalText = this.modalTextSuccess
                this.modalTitle = this.modalTitleSuccess
                this.cd.detectChanges()
                this.modalButton.nativeElement.click()
            }
            else {
                this.modalIcon = this.modalIconFailure
                this.modalText = this.modalTextFailure
                this.modalTitle = this.modalTitleFailure
                this.cd.detectChanges()
                this.modalButton.nativeElement.click()
            }
        })
    }
}
