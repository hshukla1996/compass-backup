import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ResidentialPropertyOwnersComponent } from "./residential-property-owners.component";

describe("ResidentialPropertyOwnersComponent", () => {
    let component: ResidentialPropertyOwnersComponent;
    let fixture: ComponentFixture<ResidentialPropertyOwnersComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ResidentialPropertyOwnersComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ResidentialPropertyOwnersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
