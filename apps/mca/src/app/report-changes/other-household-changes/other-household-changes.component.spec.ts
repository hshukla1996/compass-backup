import { ComponentFixture, TestBed } from "@angular/core/testing";

import { OtherHouseholdChangesComponent } from "./other-household-changes.component";

describe("OtherHouseholdChangesComponent", () => {
    let component: OtherHouseholdChangesComponent;
    let fixture: ComponentFixture<OtherHouseholdChangesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OtherHouseholdChangesComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OtherHouseholdChangesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
