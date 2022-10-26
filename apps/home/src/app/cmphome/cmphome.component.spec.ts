import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CmphomeComponent } from "./cmphome.component";

describe("CmphomeComponent", () => {
    let component: CmphomeComponent;
    let fixture: ComponentFixture<CmphomeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CmphomeComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CmphomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
