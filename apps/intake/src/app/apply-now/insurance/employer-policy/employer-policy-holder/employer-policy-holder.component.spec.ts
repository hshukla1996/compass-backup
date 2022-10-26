import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EmployerPolicyHolderComponent } from "./employer-policy-holder.component";

describe("EmployerPolicyHolderComponent", () => {
    let component: EmployerPolicyHolderComponent;
    let fixture: ComponentFixture<EmployerPolicyHolderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmployerPolicyHolderComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EmployerPolicyHolderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
