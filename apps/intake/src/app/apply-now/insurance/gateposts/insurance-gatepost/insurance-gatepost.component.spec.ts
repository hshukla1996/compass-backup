import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InsuranceGatepostComponent } from "./insurance-gatepost.component";

describe("InsuranceGatepostComponent", () => {
    let component: InsuranceGatepostComponent;
    let fixture: ComponentFixture<InsuranceGatepostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InsuranceGatepostComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InsuranceGatepostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
