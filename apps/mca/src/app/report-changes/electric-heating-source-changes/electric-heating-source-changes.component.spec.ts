import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ElectricHeatingSourceChangesComponent } from "./electric-heating-source-changes.component";

describe("ElectricHeatingSourceChangesComponent", () => {
    let component: ElectricHeatingSourceChangesComponent;
    let fixture: ComponentFixture<ElectricHeatingSourceChangesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ElectricHeatingSourceChangesComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(
            ElectricHeatingSourceChangesComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
