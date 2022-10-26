import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NoIncomeComponent } from "./no-income.component";

describe("NoIncomeComponent", () => {
    let component: NoIncomeComponent;
    let fixture: ComponentFixture<NoIncomeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NoIncomeComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NoIncomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
