import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EmployerPolicyAdditionalDetailComponent } from "./employer-policy-additional-detail.component";

describe("EmployerPolicyAdditionalDetailComponent", () => {
    let component: EmployerPolicyAdditionalDetailComponent;
    let fixture: ComponentFixture<EmployerPolicyAdditionalDetailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmployerPolicyAdditionalDetailComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(
            EmployerPolicyAdditionalDetailComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
