import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LgbtqSurveyComponent } from "./lgbtq-survey.component";

describe("LgbtqSurveyComponent", () => {
    let component: LgbtqSurveyComponent;
    let fixture: ComponentFixture<LgbtqSurveyComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LgbtqSurveyComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(LgbtqSurveyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
