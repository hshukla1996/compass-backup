import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PolicyCoveredByComponent } from "./policy-covered-by.component";

describe("PolicyCoveredByComponent", () => {
    let component: PolicyCoveredByComponent;
    let fixture: ComponentFixture<PolicyCoveredByComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PolicyCoveredByComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PolicyCoveredByComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
