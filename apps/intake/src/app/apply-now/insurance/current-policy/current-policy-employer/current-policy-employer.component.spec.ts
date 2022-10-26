import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CurrentPolicyEmployerComponent } from "./current-policy-employer.component";

describe("CurrentPolicyEmployerComponent", () => {
    let component: CurrentPolicyEmployerComponent;
    let fixture: ComponentFixture<CurrentPolicyEmployerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CurrentPolicyEmployerComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CurrentPolicyEmployerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
