import { ComponentFixture, TestBed } from "@angular/core/testing";

import { VerifySsnComponent } from "./verify-ssn.component";

describe("VerifySsnComponent", () => {
    let component: VerifySsnComponent;
    let fixture: ComponentFixture<VerifySsnComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VerifySsnComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VerifySsnComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
