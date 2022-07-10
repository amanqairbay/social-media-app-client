import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { PhotoEditorComponent } from "./photo-editor/photo-editor.component";
import { ProfileAboutComponent } from "./profile-about/profile-about.component";
import { ProfileActivityComponent } from "./profile-activity/profile-activity.component";
import { ProfileConnectionsComponent } from "./profile-connections/profile-connections.component";
import { ProfileDetailComponent } from "./profile-detail/profile-detail.component";
import { ProfileEventsComponent } from "./profile-events/profile-events.component";
import { ProfilePhotosComponent } from "./profile-photos/profile-photos.component";
import { ProfilePostComponent } from "./profile-post/profile-post.component";
import { ProfileVideosComponent } from "./profile-videos/profile-videos.component";

@NgModule({
    declarations: [
        ProfileDetailComponent,
        ProfilePostComponent,
        ProfileAboutComponent,
        ProfilePhotosComponent,
        ProfileConnectionsComponent,
        ProfileEventsComponent,
        ProfileActivityComponent,
        ProfileVideosComponent,
        PhotoEditorComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ],
    exports: [
        ProfileDetailComponent,
        ProfilePostComponent,
        ProfileAboutComponent,
        ProfilePhotosComponent,
        ProfileConnectionsComponent,
        ProfileEventsComponent,
        ProfileActivityComponent,
        ProfileVideosComponent,
        PhotoEditorComponent
    ]
})

export class ProfileModule{}