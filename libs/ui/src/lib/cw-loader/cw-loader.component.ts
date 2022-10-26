import { Component, OnInit } from "@angular/core";
import { AnimationItem } from "lottie-web";
import { AnimationOptions } from "ngx-lottie";
import { LoaderService } from '../../../../../apps/intake/src/app/shared/services/loader.service'
@Component({
    selector: "compass-ui-cw-loader",
    templateUrl: "./cw-loader.component.html",
    styleUrls: ["./cw-loader.component.scss"],
})
export class CwLoaderComponent implements OnInit {
    loading$ = this.loader.loading$;
    loadingText='Loading'
    constructor(private loader:LoaderService) {}

    ngOnInit(): void {

    }
    options: AnimationOptions = {
        path: '../../../assets/img/loading.json',
    };

    animationCreated(animationItem: AnimationItem): void {
        console.log(animationItem);
    }
}
