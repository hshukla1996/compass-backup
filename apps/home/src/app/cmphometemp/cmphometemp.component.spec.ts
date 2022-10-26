import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CmphometempComponent } from "./cmphometemp.component";

describe("CmphometempComponent", () => {
    let component: CmphometempComponent;
    let fixture: ComponentFixture<CmphometempComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CmphometempComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CmphometempComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
