import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EmployerPolicyProviderComponent } from "./employer-policy-provider.component";

describe("EmployerPolicyProviderComponent", () => {
    let component: EmployerPolicyProviderComponent;
    let fixture: ComponentFixture<EmployerPolicyProviderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmployerPolicyProviderComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(EmployerPolicyProviderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
