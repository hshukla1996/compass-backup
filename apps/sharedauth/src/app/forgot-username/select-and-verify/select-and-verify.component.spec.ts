import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SelectAndVerifyComponent } from "./select-and-verify.component";

describe("SelectAndVerifyComponent", () => {
    let component: SelectAndVerifyComponent;
    let fixture: ComponentFixture<SelectAndVerifyComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SelectAndVerifyComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectAndVerifyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
