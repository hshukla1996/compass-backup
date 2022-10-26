import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CwLoginModalComponent } from "./cw-login-modal.component";

describe("CwLoginModalComponent", () => {
    let component: CwLoginModalComponent;
    let fixture: ComponentFixture<CwLoginModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CwLoginModalComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CwLoginModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
