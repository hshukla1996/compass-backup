import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LiheapCrisisSummaryComponent } from "./liheap-crisis-summary.component";

describe("LiheapCrisisSummaryComponent", () => {
    let component: LiheapCrisisSummaryComponent;
    let fixture: ComponentFixture<LiheapCrisisSummaryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LiheapCrisisSummaryComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LiheapCrisisSummaryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
