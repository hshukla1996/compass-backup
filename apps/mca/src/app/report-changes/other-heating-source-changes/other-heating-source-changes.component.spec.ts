import { ComponentFixture, TestBed } from "@angular/core/testing";

import { OtherHeatingSourceChangesComponent } from "./other-heating-source-changes.component";

describe("OtherHeatingSourceChangesComponent", () => {
    let component: OtherHeatingSourceChangesComponent;
    let fixture: ComponentFixture<OtherHeatingSourceChangesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OtherHeatingSourceChangesComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OtherHeatingSourceChangesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
