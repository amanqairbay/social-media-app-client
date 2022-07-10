import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { NotFoundComponent } from "./not-found/not-found.component";

@NgModule({
    declarations: [
        NavBarComponent,
        NotFoundComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ],
    exports: [
        NavBarComponent,
        NotFoundComponent
    ]
})

export class CoreModule{}