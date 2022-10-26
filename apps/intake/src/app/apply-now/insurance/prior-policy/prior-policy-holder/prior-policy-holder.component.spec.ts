import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PriorPolicyHolderComponent } from "./prior-policy-holder.component";

describe("PriorPolicyHolderComponent", () => {
    let component: PriorPolicyHolderComponent;
    let fixture: ComponentFixture<PriorPolicyHolderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PriorPolicyHolderComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PriorPolicyHolderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
