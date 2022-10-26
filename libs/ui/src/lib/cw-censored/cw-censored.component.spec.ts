import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CwCensoredComponent } from "./cw-censored.component";

describe("CwCensoredComponent", () => {
    let component: CwCensoredComponent;
    let fixture: ComponentFixture<CwCensoredComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CwCensoredComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CwCensoredComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
