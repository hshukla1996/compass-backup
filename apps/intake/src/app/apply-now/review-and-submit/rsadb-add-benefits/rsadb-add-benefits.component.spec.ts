import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RsadbAddBenefitsComponent } from "./rsadb-add-benefits.component";

describe("RsadbAddBenefitsComponent", () => {
    let component: RsadbAddBenefitsComponent;
    let fixture: ComponentFixture<RsadbAddBenefitsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RsadbAddBenefitsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RsadbAddBenefitsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
