import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CwLoaderComponent } from "./cw-loader.component";

describe("CwLoaderComponent", () => {
    let component: CwLoaderComponent;
    let fixture: ComponentFixture<CwLoaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CwLoaderComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CwLoaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
