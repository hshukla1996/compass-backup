import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PregnancyDetailsComponent } from "./pregnancy-details.component";

describe("PregnancyDetailsComponent", () => {
    let component: PregnancyDetailsComponent;
    let fixture: ComponentFixture<PregnancyDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PregnancyDetailsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PregnancyDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
