import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CwSimpletileConfirmationComponent } from "./cw-simpletile-confirmation.component";

describe("CwSimpletileConfirmationComponent", () => {
    let component: CwSimpletileConfirmationComponent;
    let fixture: ComponentFixture<CwSimpletileConfirmationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CwSimpletileConfirmationComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CwSimpletileConfirmationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
