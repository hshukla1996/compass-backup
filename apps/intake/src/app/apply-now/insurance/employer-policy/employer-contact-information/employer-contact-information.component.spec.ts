import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EmployerContactInformationComponent } from "./employer-contact-information.component";

describe("EmployerContactInformationComponent", () => {
    let component: EmployerContactInformationComponent;
    let fixture: ComponentFixture<EmployerContactInformationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmployerContactInformationComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EmployerContactInformationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
