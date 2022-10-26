import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CwSimpletileTermsAndConditionsComponent } from "./cw-simpletile-terms-and-conditions.component";

describe("CwSimpletileTermsAndConditionsComponent", () => {
    let component: CwSimpletileTermsAndConditionsComponent;
    let fixture: ComponentFixture<CwSimpletileTermsAndConditionsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CwSimpletileTermsAndConditionsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(
            CwSimpletileTermsAndConditionsComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
