import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InsuranceDividerComponent } from "./insurance-divider.component";

describe("InsuranceDividerComponent", () => {
    let component: InsuranceDividerComponent;
    let fixture: ComponentFixture<InsuranceDividerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InsuranceDividerComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InsuranceDividerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
