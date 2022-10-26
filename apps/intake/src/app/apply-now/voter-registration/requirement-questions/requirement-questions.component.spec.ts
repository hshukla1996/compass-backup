import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RequirementQuestionsComponent } from "./requirement-questions.component";

describe("RequirementQuestionsComponent", () => {
    let component: RequirementQuestionsComponent;
    let fixture: ComponentFixture<RequirementQuestionsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RequirementQuestionsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RequirementQuestionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
