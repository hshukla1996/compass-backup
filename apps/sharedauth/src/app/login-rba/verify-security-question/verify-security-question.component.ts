import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: "compass-ui-verify-security-question",
    templateUrl: "./verify-security-question.component.html",
    styleUrls: ["./verify-security-question.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerifySecurityQuestionComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private router: Router
    ) {}

    verifySecurityQuestionGroup!: FormGroup
    requiredQuestions!: any[]
    answerMaxL = 50;

    ngOnInit(): void {
        // load questions TODOAM3
        this.requiredQuestions = [
            { id: 0, displayValue: "test", isWrong: false },
            { id: 1, displayValue: "test2", isWrong: false }
        ]

        this.verifySecurityQuestionGroup = this.fb.group({})
        this.requiredQuestions.forEach((question, i) => {
            this.verifySecurityQuestionGroup.addControl(
                `answer${i}`, 
                new FormControl("", [Validators.required, Validators.maxLength(this.answerMaxL)]))
        })
    }

    resetCorrectness(index: number): void {
        this.requiredQuestions[index].isWrong = false
    }

    isFieldInvalid(field: string, index: number): boolean {
        let control = this.verifySecurityQuestionGroup.get(field)!
        if (this.requiredQuestions[index].isWrong) return control.touched
        return !control.valid && control.touched
    }

    errorMap(field: string, index: number): string {
        let control = this.verifySecurityQuestionGroup.get(field)!
        if (!control.valid) return "sa_ERRrequired"
        if (this.requiredQuestions[index].isWrong) return "sa_ERRfieldWrong"
        return ""
    }

    next(): void {
        // touch all fields
        this.verifySecurityQuestionGroup.markAllAsTouched()
        // check if valid
        if (!this.verifySecurityQuestionGroup.valid) return
        let isWrong = false;
        this.requiredQuestions.forEach(rq => {
            isWrong = isWrong || rq.isWrong
        })
        if (isWrong) return

        // check security question answers TODOAM3 
            // use the isWrong property of each requiredquestion to provide user error. When input changes, error dissapears.
        
        // submit data TODOAM3

        // navigate TODOAM3
    }

    tryAnotherVerifyMethod(): void {
        // navigate to verification method selection TODOAM3
    }
}
