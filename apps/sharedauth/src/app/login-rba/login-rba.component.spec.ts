import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginRbaComponent } from "./login-rba.component";

describe("LoginRbaComponent", () => {
    let component: LoginRbaComponent;
    let fixture: ComponentFixture<LoginRbaComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoginRbaComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginRbaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
