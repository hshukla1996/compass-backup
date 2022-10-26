import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EmployerCoverageSelectionComponent } from "./employer-coverage-selection.component";

describe("EmployerCoverageSelectionComponent", () => {
    let component: EmployerCoverageSelectionComponent;
    let fixture: ComponentFixture<EmployerCoverageSelectionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmployerCoverageSelectionComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(EmployerCoverageSelectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
