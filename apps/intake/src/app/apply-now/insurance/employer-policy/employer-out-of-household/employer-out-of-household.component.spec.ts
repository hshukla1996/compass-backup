import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EmployerOutOfHouseholdComponent } from "./employer-out-of-household.component";

describe("EmployerOutOfHouseholdComponent", () => {
    let component: EmployerOutOfHouseholdComponent;
    let fixture: ComponentFixture<EmployerOutOfHouseholdComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmployerOutOfHouseholdComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EmployerOutOfHouseholdComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
