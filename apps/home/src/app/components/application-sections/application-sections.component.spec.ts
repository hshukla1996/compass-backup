import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ApplicationSectionsComponent } from "./application-sections.component";

describe("ApplicationSectionsComponent", () => {
    let component: ApplicationSectionsComponent;
    let fixture: ComponentFixture<ApplicationSectionsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ApplicationSectionsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ApplicationSectionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
