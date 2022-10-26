import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InsuranceEndingComponent } from "./insurance-ending.component";

describe("InsuranceEndingComponent", () => {
    let component: InsuranceEndingComponent;
    let fixture: ComponentFixture<InsuranceEndingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InsuranceEndingComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InsuranceEndingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
