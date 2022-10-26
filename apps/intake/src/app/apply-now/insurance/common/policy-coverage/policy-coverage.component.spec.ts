import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PolicyCoverageComponent } from "./policy-coverage.component";

describe("PolicyCoverageComponent", () => {
    let component: PolicyCoverageComponent;
    let fixture: ComponentFixture<PolicyCoverageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PolicyCoverageComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PolicyCoverageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
