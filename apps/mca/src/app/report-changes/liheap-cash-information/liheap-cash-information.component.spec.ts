import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LiheapCashInformationComponent } from "./liheap-cash-information.component";

describe("LiheapCashInformationComponent", () => {
    let component: LiheapCashInformationComponent;
    let fixture: ComponentFixture<LiheapCashInformationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LiheapCashInformationComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LiheapCashInformationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
