import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CreateUserAndPasswordComponent } from "./create-user-and-password.component";

describe("CreateUserAndPasswordComponent", () => {
    let component: CreateUserAndPasswordComponent;
    let fixture: ComponentFixture<CreateUserAndPasswordComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreateUserAndPasswordComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateUserAndPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
