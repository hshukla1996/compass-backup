import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Utility } from "../../shared/utility";

@Component({
    selector: "compass-ui-new-questions",
    templateUrl: "./new-questions.component.html",
    styleUrls: ["./new-questions.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewQuestionsComponent implements OnInit, OnDestroy {
    constructor(
        private fb: FormBuilder,
        private router: Router
    ) {}

    securityGroup!: FormGroup
    securityQuestions!: string[]
    answerMaxL = 50
    answer1MaxL = this.answerMaxL
    answer2MaxL = this.answerMaxL
    answer3MaxL = this.answerMaxL
    answerMinL = 4
    answer1MinL = this.answerMinL
    answer2MinL = this.answerMinL
    answer3MinL = this.answerMinL
    question1Sub!: Subscription
    question2Sub!: Subscription
    question3Sub!: Subscription

    ngOnInit(): void {
        this.securityGroup = this.fb.group({
            question1: ["", [Validators.required]],
            answer1: ["", [Validators.required, this.answerValidator("question1"), Validators.minLength(this.answer1MinL), Validators.maxLength(this.answer1MaxL)]], 
            question2: ["", [Validators.required]],
            answer2: ["", [Validators.required, this.answerValidator("question2"), Validators.minLength(this.answer2MinL), Validators.maxLength(this.answer2MaxL)]], 
            question3: ["", [Validators.required]],
            answer3: ["", [Validators.required, this.answerValidator("question3"), Validators.minLength(this.answer3MinL), Validators.maxLength(this.answer3MaxL)]], 
        })
        this.securityGroup.setValidators([
            Utility.duplicateValidator("answer1", "answer2", "answer3"),
            Utility.duplicateValidator("question1", "question2", "question3")
        ])
        this.question1Sub = this.securityGroup.get("question1")!.valueChanges.subscribe(change => {
            this.securityGroup.get("answer1")?.updateValueAndValidity()
        })
        this.question2Sub = this.securityGroup.get("question2")!.valueChanges.subscribe(change => {
            this.securityGroup.get("answer2")?.updateValueAndValidity()
        })
        this.question3Sub = this.securityGroup.get("question3")!.valueChanges.subscribe(change => {
            this.securityGroup.get("answer3")?.updateValueAndValidity()
        })

        // TODOAM4 load security questions
        this.securityQuestions = ["question A is cool", "question B is great", "question C is nice", 'question D is awesome']
    }

    ngOnDestroy(): void {
        this.question1Sub.unsubscribe()
        this.question2Sub.unsubscribe()
        this.question3Sub.unsubscribe()
    }

    answerValidator(questionControlName: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value) {
                // see if question phrase in answer
                let value: string = control.value;
                let valid = true
                let questionControl: AbstractControl = control.parent?.get(questionControlName)!

                let questionPhrase = questionControl.value
                let limit = 2
                let count = 0
                questionPhrase.split(' ').forEach((word:string) => {
                    if (value.includes(word)) count++
                    if (count > limit) valid = false
                })

                return (valid) ? null: {invalidAnswer: true}
            }
            return null;
        };
    }

    isFieldInvalid(field: string): boolean {
        let control = this.securityGroup.get(field)!;
        if (this.securityGroup.errors)
            return (!control.valid || !!this.securityGroup.errors[field]) && control.touched;
        else
            return !control.valid && control.touched;

    }

    errorMap(field: string): string {
        let control = this.securityGroup.get(field)!;
        switch (field) {
            case "question1": {
                if (control.errors?.required) {
                    return "sa_ERRrequiredQuestion"
                }
                if (this.securityGroup.errors?.question1) {
                    return "sa_ERRduplicateQuestion"
                }
                return ""
            }
            case "answer1": {
                if (control.errors?.required) {
                    return "sa_ERRrequiredAnswer"
                }
                if (control.errors?.invalidAnswer) {
                    return "sa_ERRinvalidAnswer"
                }
                if (control.errors?.minlength) {
                    return "sa_ERRminLength"
                }
                if (this.securityGroup.errors?.answer1) {
                    return "sa_ERRduplicateAnswer"
                }
                return ""
            }
            case "question2": {
                if (control.errors?.required) {
                    return "sa_ERRrequiredQuestion"
                }
                if (this.securityGroup.errors?.question2) {
                    return "sa_ERRduplicateQuestion"
                }
                return ""
            }
            case "answer2": {
                if (control.errors?.required) {
                    return "sa_ERRrequiredAnswer"
                }
                if (control.errors?.invalidAnswer) {
                    return "sa_ERRinvalidAnswer"
                }
                if (control.errors?.minlength) {
                    return "sa_ERRminLength"
                }
                if (this.securityGroup.errors?.answer2) {
                    return "sa_ERRduplicateAnswer"
                }
                return ""
            }
            case "question3": {
                if (control.errors?.required) {
                    return "sa_ERRrequiredQuestion"
                }
                if (this.securityGroup.errors?.question3) {
                    return "sa_ERRduplicateQuestion"
                }
                return ""
            }
            case "answer3": {
                if (control.errors?.required) {
                    return "sa_ERRrequiredAnswer"
                }
                if (control.errors?.invalidAnswer) {
                    return "sa_ERRinvalidAnswer"
                }
                if (control.errors?.minlength) {
                    return "sa_ERRminLength"
                }
                if (this.securityGroup.errors?.answer3) {
                    return "sa_ERRduplicateAnswer"
                }
                return ""
            }
            default: return "";
        }
    }

    cancel(): void {
        // navigate TODOAM4 cancel process, go back to MCA dashboard
    }

    submit(): void {
        // touch all fields
        this.securityGroup.markAllAsTouched();
        // check if valid
        if (!this.securityGroup.valid) return;
        // submit data TODOAM4

        // navigate TODOAM4 go to confirmation screen
    }
}
