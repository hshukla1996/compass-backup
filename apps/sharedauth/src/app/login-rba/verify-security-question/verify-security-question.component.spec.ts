import { ComponentFixture, TestBed } from "@angular/core/testing";

import { VerifySecurityQuestionComponent } from "./verify-security-question.component";

describe("VerifySecurityQuestionComponent", () => {
    let component: VerifySecurityQuestionComponent;
    let fixture: ComponentFixture<VerifySecurityQuestionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VerifySecurityQuestionComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VerifySecurityQuestionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
