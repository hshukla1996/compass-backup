import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesGatepostComponent } from './expenses-gatepost.component';

describe("ExpensesGatepostComponent", () => {
    let component: ExpensesGatepostComponent;
    let fixture: ComponentFixture<ExpensesGatepostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ExpensesGatepostComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ExpensesGatepostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
