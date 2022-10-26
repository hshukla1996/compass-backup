import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CurrntPolicyHolderComponent } from "./currnt-policy-holder.component";

describe("CurrntPolicyHolderComponent", () => {
    let component: CurrntPolicyHolderComponent;
    let fixture: ComponentFixture<CurrntPolicyHolderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CurrntPolicyHolderComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CurrntPolicyHolderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
