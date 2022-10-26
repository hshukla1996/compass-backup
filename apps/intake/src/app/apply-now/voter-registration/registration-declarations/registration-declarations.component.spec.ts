import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RegistrationDeclarationsComponent } from "./registration-declarations.component";

describe("RegistrationDeclarationsComponent", () => {
    let component: RegistrationDeclarationsComponent;
    let fixture: ComponentFixture<RegistrationDeclarationsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RegistrationDeclarationsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RegistrationDeclarationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
