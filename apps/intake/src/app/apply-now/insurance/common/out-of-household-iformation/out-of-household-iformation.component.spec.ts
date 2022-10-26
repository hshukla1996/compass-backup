import { ComponentFixture, TestBed } from "@angular/core/testing";

import { OutOfHouseholdIformationComponent } from "./out-of-household-iformation.component";

describe("OutOfHouseholdIformationComponent", () => {
    let component: OutOfHouseholdIformationComponent;
    let fixture: ComponentFixture<OutOfHouseholdIformationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OutOfHouseholdIformationComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OutOfHouseholdIformationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
