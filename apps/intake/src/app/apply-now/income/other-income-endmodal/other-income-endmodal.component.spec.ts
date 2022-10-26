import { ComponentFixture, TestBed } from "@angular/core/testing";

import { OtherIncomeEndmodalComponent } from "./other-income-endmodal.component";

describe("OtherIncomeEndmodalComponent", () => {
    let component: OtherIncomeEndmodalComponent;
    let fixture: ComponentFixture<OtherIncomeEndmodalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OtherIncomeEndmodalComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OtherIncomeEndmodalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
