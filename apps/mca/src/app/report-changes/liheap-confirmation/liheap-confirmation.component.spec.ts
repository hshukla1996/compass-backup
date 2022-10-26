import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LiheapConfirmationComponent } from "./liheap-confirmation.component";

describe("LiheapConfirmationComponent", () => {
    let component: LiheapConfirmationComponent;
    let fixture: ComponentFixture<LiheapConfirmationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LiheapConfirmationComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LiheapConfirmationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
