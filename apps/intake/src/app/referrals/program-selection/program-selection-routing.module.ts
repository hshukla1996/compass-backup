import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramSelectionComponent } from './program-selection.component';



const routes: Routes = [
    { path: '', component: ProgramSelectionComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProgramSelectionRoutingModule { }